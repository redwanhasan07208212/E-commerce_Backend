import { z } from 'zod';

export const orderValidationSchema = z.object({
  body: z.object({
    customer: z.string().nonempty('Customer ID is required'),
    phone: z
      .string()
      .nonempty('Phone number is required')
      .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
    product: z.string().nonempty('Product ID is required'),
    quantity: z.number().int().positive('Quantity must be a positive integer'),
    deliveryAddress: z.string().nonempty('Delivery address is required'),
    paymentMethod: z.enum(['Cash_On_Delivery', 'Surjo_Pay']),
    paymentStatus: z.enum(['Paid', 'Cancelled', 'Failed', 'Pending']),
    transactionId: z.string().nonempty('Transaction ID is required'),
    subTotal: z.number().positive('Subtotal must be a positive number'),
    shippingTotal: z
      .number()
      .positive('Shipping total must be a positive number'),
    grandTotal: z.number().positive('Grand total must be a positive number'),
    isDeleted: z.boolean(),
  }),
});
