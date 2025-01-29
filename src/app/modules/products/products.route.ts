import { Router } from 'express';
import { productsController } from './products.controller';
import validateRequest from '../../middlewares/validate';
import createValidation_Product from './products.validation';

const router = Router();
router.post(
  '/',
  validateRequest(createValidation_Product),
  productsController.createProduct,
);
router.get('/', productsController.getAllProduct);
router.get('/:productId', productsController.getSingleProduct);
router.put('/:productId', productsController.updateProduct);
router.delete('/:productId', productsController.deleteProduct);

export const productsRoutes = router;
