import contactUsRoutes from '../modules/contactUs/contactUs.routes';
import { Router } from 'express';

import userRoutes from '../modules/user/user.routes';
import authRouter from '../modules/auth/auth.router';
import pastProjectRoutes from '../modules/pastProject/pastProject.routes';
import serviceRoutes from '../modules/services/service.routes';
import memberRoutes from '../modules/members/member.routes';
import quotationRoutes from '../modules/quotation/quotation.routes';
import dashboardRoutes from '../modules/dashboard/dashboard.routes';

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
      {
            path: '/past-projects',
            route: pastProjectRoutes,
      },
      {
            path: '/services',
            route: serviceRoutes,
      },
      {
            path: '/members',
            route: memberRoutes,
      },
      {
            path: '/contact-us',
            route: contactUsRoutes,
      },
      {
            path: '/quotations',
            route: quotationRoutes,
      },
      {
            path: '/dashboard',
            route: dashboardRoutes,
      },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
