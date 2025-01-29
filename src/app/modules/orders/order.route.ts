import express from 'express';
import validateRequest from '../../middlewares/validate';
import { orderValidationSchema } from './order.validation';
import { orderController } from './order.controller';
const router = express.Router();

router.post(
  '/create-order',
  validateRequest(orderValidationSchema),
  orderController.createOrder,
);
router.get('/', orderController.getAllOrder);
router.get('/:orderId', orderController.getSingleOrder);
router.patch('/:orderId', orderController.updateOrder);
router.delete('/:orderId', orderController.deleteOrder);

export const orderRoutes = router;
