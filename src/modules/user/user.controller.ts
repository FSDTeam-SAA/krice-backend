import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { User } from './user.model';

export const getUsers = catchAsync(async (_req: Request, res: Response) => {
      const users = await User.find().select('-password');
      res.status(200).json({ success: true, data: users });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
      const allowedFields = [
            'firstName',
            'lastName',
            'email',
            'phoneNumber',
            'homeAddress',
            'city',
            'region',
            'companyName',
            'location',
            'avatar',
            'image',
            'selectedRole',
            'role_id',
      ];

      const updateData = allowedFields.reduce<Record<string, unknown>>((acc, key) => {
            if (req.body[key] !== undefined) {
                  acc[key] = req.body[key];
            }
            return acc;
      }, {});

      const user = await User.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true,
      }).select('-password');

      if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
      }

      res.status(200).json({ success: true, data: user });
});
