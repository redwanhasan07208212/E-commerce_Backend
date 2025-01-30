import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { userController } from './user.controller';

const router = express.Router();
router.get(
  '/profile',
  auth(USER_ROLE.admin, USER_ROLE.user),
  userController.getMyProfile,
);
router.get('/', auth(USER_ROLE.admin), userController.getAllUser);
router.patch('/:id/block', auth(USER_ROLE.admin), userController.blockUser);
export const userRoute = router;
