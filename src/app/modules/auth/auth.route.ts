import express from 'express';
import validateRequest from '../../middlewares/validate';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { createUserRegisterValidation } from '../user/user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.LoginValidationSchema),
  AuthControllers.loginUser,
);
router.post(
  '/register',
  validateRequest(createUserRegisterValidation.createUserValidationSchema),
  AuthControllers.registerUser,
);
router.post('/logout', AuthControllers.logOut);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);
router.patch(
  '/change-password',
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
);
export const AuthRoute = router;
