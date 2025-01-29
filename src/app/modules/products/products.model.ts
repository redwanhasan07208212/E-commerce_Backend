/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { TProduct } from './products.interface';

const categoryEnum = [
  'Fiction',
  'Science',
  'SelfDevelopment',
  'Poetry',
  'Religious',
] as const;

const productSchema = new Schema<TProduct>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    category: {
      type: String,
      enum: {
        values: categoryEnum,
        message: '{VALUE} is not a valid category',
      },
      required: [true, 'Category is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre('save', function (next) {
  if (this.quantity === 0) {
    this.inStock = false;
  } else {
    this.inStock = true;
  }
  next();
});

productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as Record<string, any>;
  if (update.quantity !== undefined) {
    if (update.quantity === 0) {
      update.inStock = false;
    } else if (update.quantity > 0) {
      update.inStock = true;
    }
  }
  next();
});
productSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as Record<string, any>;

  if (update.price !== undefined && update.price < 0) {
    return next(new Error('Price must be a positive number'));
  }
  next();
});

export const Product = model('Product', productSchema);
