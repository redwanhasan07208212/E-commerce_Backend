/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TProduct } from './products.interface';
import { Product } from './products.model';
import { SortOrder } from 'mongoose';

const createProduct = async (productData: TProduct) => {
  try {
    const existingProduct = await Product.findOne({ name: productData.title });
    if (existingProduct) {
      throw new Error('Product with this name already exists');
    }
    const product = await Product.create(productData);
    return product.toObject();
  } catch (error) {
    throw new Error('Failed to create product');
  }
};
const createProducts = async (productsData: TProduct[]) => {
  if (!Array.isArray(productsData) || productsData.length === 0) {
    throw new Error('Products data must be a non-empty array');
  }
  const createdProducts = await Product.insertMany(productsData);
  return createdProducts;
};
const getAllProducts = async (query: Record<string, unknown>) => {
  const {
    search,
    priceRange,
    author,
    category,
    inStock,
    sortBy,
    sortOrder,
    page = 1,
    limit = 10,
  } = query;

  const filters: Record<string, unknown> = {};

  if (search) {
    filters.$or = [
      { title: { $regex: search, $options: 'i' } },
      { author: { $regex: search, $options: 'i' } },
      { category: { $regex: search, $options: 'i' } },
    ];
  }

  if (priceRange) {
    const [minPrice, maxPrice] = (priceRange as string).split('-').map(Number);
    filters.price = { $gte: minPrice, $lte: maxPrice };
  }

  if (author) {
    filters.author = { $regex: author, $options: 'i' };
  }

  if (category) {
    filters.category = category;
  }

  if (inStock !== undefined) {
    filters.inStock = inStock === 'true';
  }

  filters.isDeleted = false;

  const skip = (Number(page) - 1) * Number(limit);

  // Fix for sorting
  const sortCondition: Record<string, SortOrder> = {};
  if (sortBy) {
    sortCondition[String(sortBy)] = sortOrder === 'asc' ? 1 : -1;
  } else {
    sortCondition.createdAt = -1;
  }

  const fieldsToSelect = 'title author price category description inStock';

  const [products, total] = await Promise.all([
    Product.find(filters)
      .sort(sortCondition)
      .skip(skip)
      .limit(Number(limit))
      .select(fieldsToSelect),
    Product.countDocuments(filters),
  ]);

  return {
    meta: { total, page: Number(page), limit: Number(limit) },
    data: products,
  };
};

const getSpecificProduct = async (id: string) => {
  const result = await Product.findById(id)
    .select('-__v -createdAt -updatedAt -isDeleted')
    .lean();

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'The Book is not found');
  }
  return result;
};
const updateProduct = async (id: string, data: Partial<TProduct>) => {
  const isProductExits = await Product.findById(id);
  if (!isProductExits || isProductExits.isDeleted) {
    throw new AppError(httpStatus.NOT_FOUND, 'The Book is Not found');
  }
  if (data.price !== undefined && data.price < 0) {
    throw new Error('Price must be a positive number');
  }
  if (data.quantity !== undefined && data.quantity < 0) {
    throw new Error('quantity must be a positive number');
  }
  const result = await Product.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProduct = async (id: string) => {
  const result = await Product.findByIdAndUpdate(id, { isDeleted: true });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'The book is not found');
  }
  return result;
};
export const productService = {
  createProduct,
  createProducts,
  getAllProducts,
  getSpecificProduct,
  updateProduct,
  deleteProduct,
};
