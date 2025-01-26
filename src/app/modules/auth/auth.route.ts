import express from 'express';
import validateRequest from '../../middlewares/validate';
import { createUserRgisterValidation } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.LoginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/register',
  validateRequest(createUserRgisterValidation.createUserValidationSchema),
  AuthControllers.registerUser,
);
export const AuthRoute = router;
