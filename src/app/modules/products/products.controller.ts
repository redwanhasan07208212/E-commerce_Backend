/* eslint-disable @typescript-eslint/no-explicit-any */

import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { productService } from './products.service';

const createProduct = catchAsync(async (req, res) => {
  const ProductData = req.body;
  const result = await productService.createProduct(ProductData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is Created Successfully',
    data: result,
  });
});
const getAllProduct = catchAsync(async (req, res) => {
  const result = await productService.getAllProductsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Product is retrieved Successfully',
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productService.getSpecificProduct(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is retrieved Successfully',
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productService.updateProduct(productId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is updated Successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await productService.deleteProduct(productId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Product is updated Successfully',
    data: result,
  });
});

export const productsController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
