import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ['Cash_On_Delivery', 'Surjo_Pay'],
      default: 'Cash_On_Delivery',
    },
    paymentStatus: {
      type: String,
      enum: ['Paid', 'Cancelled', 'Failed', 'Pending'],
      default: 'Pending',
    },
    transactionId: {
      type: String,
      unique: true,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    shippingTotal: {
      type: Number,
      required: true,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<TOrder>('Order', orderSchema);
