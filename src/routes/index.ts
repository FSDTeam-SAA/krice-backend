import { Router } from 'express';
import userRoutes from '../modules/user/user.routes';
import authRouter from '../modules/auth/auth.router';

const router = Router();

const moduleRoutes = [
      {
            path: '/users',
            route: userRoutes,
      },
      {
            path: '/auth',
            route: authRouter,
      },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
