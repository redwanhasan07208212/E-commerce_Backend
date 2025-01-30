import { Router } from 'express';
import { productsController } from './products.controller';
import validateRequest from '../../middlewares/validate';
import { productValidation } from './products.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = Router();
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(productValidation.createValidationProduct),
  productsController.createProduct,
);
router.post('/bulk', auth(USER_ROLE.admin), productsController.createProducts);
router.get(
  '/',
  validateRequest(productValidation.createProductsValidationSchema),
  productsController.getAllProduct,
);
router.get('/:productId', productsController.getSingleProduct);
router.patch(
  '/:productId',
  auth(USER_ROLE.admin),
  validateRequest(productValidation.updateProductValidationSchema),
  productsController.updateProduct,
);
router.delete(
  '/:productId',
  auth(USER_ROLE.admin),
  productsController.deleteProduct,
);

export const productsRoutes = router;
