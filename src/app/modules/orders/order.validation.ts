import { z } from 'zod';

export const orderValidationSchema = z.object({
  body: z.object({
    user: z.string().nonempty('Customer ID is required'),
    product: z.string().nonempty('Product ID is required'),
    quantity: z.number().int().positive('Quantity must be a positive integer'),
    paymentMethod: z.enum(['Cash_On_Delivery', 'ShurjoPay']).optional(),
    paymentStatus: z
      .enum(['Paid', 'Cancelled', 'Failed', 'Pending'])
      .optional(),
    subTotal: z
      .number()
      .positive('Subtotal must be a positive number')
      .optional(),
    shippingTotal: z
      .number()
      .positive('Shipping total must be a positive number')
      .optional(),
    grandTotal: z
      .number()
      .positive('Grand total must be a positive number')
      .optional(),
  }),
});
