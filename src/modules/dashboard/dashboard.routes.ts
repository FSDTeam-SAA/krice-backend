import { Router } from 'express';
import { getDashboardStats, getMonthlyQuotations } from './dashboard.controller';

const router = Router();

router.get('/stats', getDashboardStats);
router.get('/monthly-quotations', getMonthlyQuotations);

export default router;
