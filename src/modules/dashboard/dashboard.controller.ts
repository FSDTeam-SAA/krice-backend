import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { getTotalCounts, getMonthlyQuotationCount } from './dashboard.service';

// Get total counts for dashboard
export const getDashboardStats = catchAsync(async (req: Request, res: Response) => {
      const stats = await getTotalCounts();
      res.status(200).json({
            success: true,
            data: stats,
      });
});

// Get monthly quotation count for line plot
export const getMonthlyQuotations = catchAsync(async (req: Request, res: Response) => {
      const monthlyData = await getMonthlyQuotationCount();
      res.status(200).json({
            success: true,
            data: monthlyData,
      });
});
