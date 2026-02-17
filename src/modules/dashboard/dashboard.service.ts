import { Quotation } from '../quotation/quotation.model';
import { User } from '../user/user.model';
import { ContactUs } from '../contactUs/contactUs.model';

// Get total counts of quotations, users, and contact messages
export const getTotalCounts = async () => {
      const [totalQuotations, totalUsers, totalContactMessages] = await Promise.all([
            Quotation.countDocuments(),
            User.countDocuments(),
            ContactUs.countDocuments(),
      ]);

      return {
            totalQuotations,
            totalUsers,
            totalContactMessages,
      };
};

// Get monthly quotation count for line plot
export const getMonthlyQuotationCount = async () => {
      const monthlyData = await Quotation.aggregate([
            {
                  $group: {
                        _id: {
                              year: { $year: '$createdAt' },
                              month: { $month: '$createdAt' },
                        },
                        count: { $sum: 1 },
                  },
            },
            {
                  $sort: {
                        '_id.year': 1,
                        '_id.month': 1,
                  },
            },
            {
                  $project: {
                        _id: 0,
                        year: '$_id.year',
                        month: '$_id.month',
                        count: 1,
                  },
            },
      ]);

      return monthlyData;
};
