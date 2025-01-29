import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { orderService } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await orderService.createOrderIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is Created Successfully',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req, res) => {
  const result = await orderService.getAllOrderIntoDb(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is retrieved Successfully',
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await orderService.getSingleOrderIntoDb(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is retrieved Successfully',
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await orderService.updateOrderIntoDb(orderId, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is updated Successfully',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const result = await orderService.deleteOrderIntoDb(orderId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order is deleted Successfully',
    data: result,
  });
});

export const orderController = {
  createOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};
