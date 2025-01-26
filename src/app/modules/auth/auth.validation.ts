import { z } from 'zod';

const LoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
  }),
});

export const AuthValidation = {
  LoginValidationSchema,
};
