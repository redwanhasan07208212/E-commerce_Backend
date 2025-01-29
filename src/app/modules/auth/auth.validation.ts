import { z } from 'zod';

const LoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is Required' }),
    password: z.string({ required_error: 'Password is Required' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({
      required_error: 'New password is required',
    }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refreshToken Token is Required',
    }),
  }),
});

export const AuthValidation = {
  LoginValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
};
