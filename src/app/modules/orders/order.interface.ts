import { Types } from 'mongoose';

export type TOrder = {
  user: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  paymentMethod: 'Cash_On_Delivery' | 'ShurjoPay';
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentStatus: 'Paid' | 'Cancelled' | 'Failed' | 'Pending';
  transactionId: {
    id: string;
    transactionStatus: string;
    bank_status?: string;
    sp_code?: string;
    sp_message?: string;
    method?: string;
    date_time?: string;
  };
  subTotal: number;
  shippingTotal: number;
  grandTotal: number;
  isDeleted: boolean;
};
