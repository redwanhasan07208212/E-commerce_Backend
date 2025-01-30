import { z } from 'zod';

const createValidationProduct = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),
    author: z.string({
      required_error: 'Author is required',
      invalid_type_error: 'Author must be a string',
    }),
    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
      })
      .positive('Price must be a positive number'),
    category: z.enum(
      ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
      {
        required_error: 'Category is required',
        invalid_type_error:
          'Category must be one of Fiction, Science, SelfDevelopment, Poetry, Religious',
      },
    ),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
      })
      .int('Quantity must be an integer')
      .nonnegative('Quantity cannot be negative'),
    inStock: z.boolean({
      required_error: 'In Stock is required',
      invalid_type_error: 'In Stock must be either true or false',
    }),
  }),
});

const createProductsValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),
    author: z.string({
      required_error: 'Author is required',
      invalid_type_error: 'Author must be a string',
    }),
    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
      })
      .positive('Price must be a positive number'),
    category: z.enum(
      ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
      {
        required_error: 'Category is required',
        invalid_type_error:
          'Category must be one of Fiction, Science, SelfDevelopment, Poetry, Religious',
      },
    ),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
      })
      .int('Quantity must be an integer')
      .nonnegative('Quantity cannot be negative'),
    inStock: z.boolean({
      required_error: 'In Stock is required',
      invalid_type_error: 'In Stock must be either true or false',
    }),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    }),
    author: z.string({
      required_error: 'Author is required',
      invalid_type_error: 'Author must be a string',
    }),
    price: z
      .number({
        required_error: 'Price is required',
        invalid_type_error: 'Price must be a number',
      })
      .positive('Price must be a positive number'),
    category: z.enum(
      ['Fiction', 'Science', 'SelfDevelopment', 'Poetry', 'Religious'],
      {
        required_error: 'Category is required',
        invalid_type_error:
          'Category must be one of Fiction, Science, SelfDevelopment, Poetry, Religious',
      },
    ),
    description: z.string({
      required_error: 'Description is required',
      invalid_type_error: 'Description must be a string',
    }),
    quantity: z
      .number({
        required_error: 'Quantity is required',
        invalid_type_error: 'Quantity must be a number',
      })
      .int('Quantity must be an integer')
      .nonnegative('Quantity cannot be negative'),
    inStock: z.boolean({
      required_error: 'In Stock is required',
      invalid_type_error: 'In Stock must be either true or false',
    }),
  }),
});
export const productValidation = {
  createValidationProduct,
  createProductsValidationSchema,
  updateProductValidationSchema,
};
