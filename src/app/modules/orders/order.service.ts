import { JwtPayload } from 'jsonwebtoken';
import QueryBuilder from '../../builder/queryBuilder';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Product } from '../products/products.model';
import mongoose from 'mongoose';
import { orderUtils } from './order.utils';

const createOrderIntoDb = async (
  payLoad: TOrder,
  user: JwtPayload,
  client_ip: string,
) => {
  console.log(user);

  // Validate if the user is creating an order for themselves
  if (payLoad.user.toString() !== user.id) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You can’t create an order for another customer',
    );
  }

  // Start a session for the transaction
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the product
    const product = await Product.findOne({
      _id: payLoad.product,
      isDeleted: false,
    }).session(session);

    if (!product) {
      throw new AppError(httpStatus.NOT_FOUND, 'Product Not Found');
    }

    // Check product stock
    if (product.quantity < payLoad.quantity) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Stock Out');
    }

    // Deduct stock
    product.quantity -= payLoad.quantity;
    await product.save({ session });

    // Calculate price details
    const subTotal = product.price * payLoad.quantity;
    const shippingTotal = 70;
    const grandTotal = subTotal + shippingTotal;

    // Create order
    const order = await Order.create(
      [
        {
          ...payLoad,
          subTotal,
          shippingTotal,
          grandTotal,
          transactionId: {
            id: `TRX-${Date.now()}`, // Ensure transactionId.id is set
          },
          paymentStatus: 'Pending',
        },
      ],
      { session },
    );

    // Handle Surjo_Pay payment
    if (payLoad.paymentMethod === 'ShurjoPay') {
      const shurjopayPayload = {
        amount: grandTotal,
        order_id: order[0]._id,
        currency: 'BDT',
        customer_name: user.name,
        customer_address: user.address,
        customer_email: user.email,
        customer_phone: String(user.phone),
        customer_city: 'N/A',
        client_ip,
      };

      // console.log(
      //   'ShurjoPay Payload:',
      //   JSON.stringify(shurjopayPayload, null, 2),
      // ); // Log the payload

      const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

      if (!payment?.transactionStatus) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Payment Failed');
      }

      // Update order with payment details
      order[0].transactionId = {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      };
      order[0].paymentStatus = 'Paid';
      await order[0].save({ session });

      await session.commitTransaction();
      session.endSession();

      // Return the checkout_url
      return { checkout_url: payment.checkout_url };
    }

    // Commit transaction for non-Surjo_Pay orders
    await session.commitTransaction();
    session.endSession();

    return order[0];
  } catch (error) {
    // Abort transaction on error
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};
const getMyOrdersFromDb = async (
  user: JwtPayload,
  query: Record<string, unknown>,
) => {
  if (!user?.id) {
    throw new AppError(401, 'User authentication required');
  }

  const queryBuilder = new QueryBuilder(
    Order.find({ user: user.id, isDeleted: false }),
    query,
  );

  const orders = await queryBuilder
    .search(['transactionId'])
    .filter()
    .sort()
    .paginate()
    .fields()
    .modelQuery.populate([
      {
        path: 'product',
        select: 'name price image brand category product_model',
      },
      {
        path: 'user',
        select: 'name email',
      },
    ])
    .select('-isDeleted -updatedAt')
    .lean();

  const total = await queryBuilder.getCountQuery();

  return {
    meta: {
      total,
      ...queryBuilder.getPaginationInfo(),
    },
    data: orders,
  };
};

/**
 * Get all orders with admin-level access, with filtering, sorting, and pagination.
 */
const getAllOrdersFromDb = async (query: Record<string, unknown>) => {
  const queryBuilder = new QueryBuilder(
    Order.find({ isDeleted: false }),
    query,
  );

  const orders = await queryBuilder
    .search(['transactionId'])
    .filter()
    .sort()
    .paginate()
    .fields()
    .modelQuery.populate([
      {
        path: 'product',
        select: 'name price image brand category product_model',
      },
      {
        path: 'user',
        select: 'name email',
      },
    ])
    .select('-isDeleted -updatedAt')
    .lean();

  const total = await queryBuilder.getCountQuery();

  return {
    meta: {
      total,
      ...queryBuilder.getPaginationInfo(),
    },
    data: orders,
  };
};

/**
 * Change order status with validation.
 */
const changeOrderStatus = async (orderId: string, status: string) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError(400, 'Invalid order ID');
  }

  const validStatuses = ['Paid', 'Cancelled', 'Failed', 'Pending'];
  if (!validStatuses.includes(status)) {
    throw new AppError(
      400,
      `Invalid status. Allowed statuses: ${validStatuses.join(', ')}`,
    );
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    { paymentStatus: status },
    { new: true, runValidators: true },
  );

  if (!order) {
    throw new AppError(404, 'Order not found');
  }

  return order;
};

/**
 * Soft delete an order by setting `isDeleted` to `true`.
 */
const deleteOrderFromDb = async (orderId: string) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new AppError(400, 'Invalid order ID');
  }

  const order = await Order.findByIdAndUpdate(
    orderId,
    { isDeleted: true },
    { new: true },
  );

  if (!order) {
    throw new AppError(404, 'Order not found');
  }

  return { message: 'Order deleted successfully', order };
};

export const orderService = {
  createOrderIntoDb,
  verifyPayment,
  getMyOrdersFromDb,
  getAllOrdersFromDb,
  changeOrderStatus,
  deleteOrderFromDb,
};
