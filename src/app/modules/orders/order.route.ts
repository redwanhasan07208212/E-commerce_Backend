import express from 'express';
import validateRequest from '../../middlewares/validate';
import { orderValidationSchema } from './order.validation';
import { orderController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
const router = express.Router();

router.post(
  '/create-order',
  auth(USER_ROLE.user, USER_ROLE.admin),
  validateRequest(orderValidationSchema),
  orderController.createOrder,
);
router.get('/verify', auth(USER_ROLE.user), orderController.verifyPayment);
router.get('/', orderController.getAllOrder);
router.get(
  '/myOrders',
  auth(USER_ROLE.admin, USER_ROLE.user),
  orderController.getMyOrder,
);

router.patch(
  '/:orderId/status',
  auth(USER_ROLE.admin),
  orderController.changeOrderStatus,
);

router.delete('/:orderId', auth(USER_ROLE.admin), orderController.deleteOrder);

export const orderRoutes = router;
