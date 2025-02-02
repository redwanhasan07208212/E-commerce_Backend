import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await orderService.createOrderIntoDb(req.body, user, req.ip!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is Created Successfully',
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await orderService.verifyPayment(req.query.order_id as string);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is Created Successfully',
    data: order,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const result = await orderService.getAllOrdersFromDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is retrieved Successfully',
    data: result,
  });
});

const getMyOrder = catchAsync(async (req, res) => {
  const result = await orderService.getMyOrdersFromDb(req.user, req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is retrieved Successfully',
    data: result,
  });
});

const changeOrderStatus = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const result = await orderService.changeOrderStatus(orderId, status);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order status updated successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await orderService.deleteOrderFromDb(orderId);

  sendResponse(res, {
    statusCode: httpStatus.NO_CONTENT,
    success: true,
    message: 'Order deleted successfully',
    data: result,
  });
});

export const orderController = {
  createOrder,
  verifyPayment,
  getAllOrder,
  getMyOrder,
  changeOrderStatus,
  deleteOrder,
};
