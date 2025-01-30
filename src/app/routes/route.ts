import { Router } from 'express';
import { AuthRoute } from '../modules/auth/auth.route';
import { orderRoutes } from '../modules/orders/order.route';
import { productsRoutes } from '../modules/products/products.route';
import { userRoute } from '../modules/user/user.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/order',
    route: orderRoutes,
  },
  {
    path: '/products',
    route: productsRoutes,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
