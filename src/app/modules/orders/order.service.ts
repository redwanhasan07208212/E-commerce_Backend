import QueryBuilder from '../../builder/queryBuilder';
import { orderSearch } from './order.constant';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDb = async (payLoad: TOrder) => {
  const createOrder = await Order.create(payLoad);
  return createOrder;
};

const getAllOrderIntoDb = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Order.find(), query)
    .search(orderSearch)
    .filter()
    .sort()
    .paginate()
    .fields();
  const getAllOrder = await orderQuery.modelQuery;
  return getAllOrder;
};

const getSingleOrderIntoDb = async (id: string) => {
  const getSingleOrder = await Order.findById(id);
  return getSingleOrder;
};

const updateOrderIntoDb = async (id: string, payLoad: Partial<TOrder>) => {
  const updateOrder = await Order.findByIdAndUpdate({ _id: id }, payLoad, {
    new: true,
    runValidators: true,
  });
  return updateOrder;
};
const deleteOrderIntoDb = async (id: string) => {
  const deleteOrder = await Order.findByIdAndUpdate(id, {
    isDeleted: true,
    new: true,
  });
  return deleteOrder;
};
export const orderService = {
  createOrderIntoDb,
  getAllOrderIntoDb,
  getSingleOrderIntoDb,
  updateOrderIntoDb,
  deleteOrderIntoDb,
};
