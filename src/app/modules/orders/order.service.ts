import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDb = async (payLoad: TOrder) => {
  const createOrder = await Order.create(payLoad);
  return createOrder;
};

export const orderService = {
  createOrderIntoDb,
};
