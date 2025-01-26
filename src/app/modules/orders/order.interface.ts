import { Types } from 'mongoose';

export type TOrder = {
  customer: Types.ObjectId;
  phone: string;
  product: Types.ObjectId;
  quantity: number;
  deliveryAddress: string;
  paymentMethod: 'Cash_On_Delivery' | 'Surjo_Pay';
  paymentStatus: 'Paid' | 'Cancelled' | 'Failed' | 'Pending';
  transactionId: string;
  subTotal: number;
  shippingTotal: number;
  grandTotal: number;
  isDeleted: boolean;
};
