import { JwtPayload } from 'jsonwebtoken';

type AuthPayload = JwtPayload & {
      email?: string;
      role?: string;
      id?: string;
      userId?: string;
};

declare global {
      namespace Express {
            interface Request {
                  user?: AuthPayload;
            }
      }
}
