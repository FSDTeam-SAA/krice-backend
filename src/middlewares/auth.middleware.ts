import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import { User } from '../modules/user/user.model';

export const protect = async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) throw new AppError('Token not found', httpStatus.NOT_FOUND);

      try {
            const decoded = (await jwt.verify(token, process.env.JWT_ACCESS_SECRET!)) as JwtPayload;
            // console.log(decoded)
            const user = await User.findById(decoded._id);
            if (user) {
                  req.user = user;
            }
            next();
      } catch (err) {
            throw new AppError('Invalid token', 401);
      }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
      if (req.user?.role !== 'admin') {
            throw new AppError('Access denied. You are not an admin.', 403);
      }
      next();
};

export const isDriver = (req: Request, res: Response, next: NextFunction): void => {
      if (req.user?.role !== 'driver') {
            throw new AppError('Access denied. You are not an driver.', 403);
      }
      next();
};
