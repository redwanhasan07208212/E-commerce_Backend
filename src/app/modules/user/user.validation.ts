import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z
      .string()
      .nonempty('Phone number is required')
      .regex(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'),
    address: z.string().nonempty('Delivery address is required'),
    isBlocked: z.boolean().optional(),
  }),
});
export const createUserRegisterValidation = {
  createUserValidationSchema,
};
