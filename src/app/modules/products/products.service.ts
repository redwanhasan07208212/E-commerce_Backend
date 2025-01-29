import QueryBuilder from '../../builder/queryBuilder';
import { productSearch } from './products.constant';
import { TProduct } from './products.interface';
import { Product } from './products.model';

const createProduct = async (loadProduct: TProduct) => {
  const result = await Product.create(loadProduct);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Product.find(), query)
    .search(productSearch)
    .filter()
    .sort()
    .paginate()
    .fields();
  const getAllOrder = await orderQuery.modelQuery;
  return getAllOrder;
};
const getSpecificProduct = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};
const updateProduct = async (id: string, data: Partial<TProduct>) => {
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
  const result = await Product.findByIdAndDelete(id);
  return result;
};
export const productService = {
  createProduct,
  getAllProductsFromDB,
  getSpecificProduct,
  updateProduct,
  deleteProduct,
};
