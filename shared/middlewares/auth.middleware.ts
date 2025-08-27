import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError, ForbiddenError } from '../Errors/custom-error';
import { JWTPayload, UserRole, AuthUser } from '../types/base.entity';
import { userRepository } from '../../module/users/user.repository';
import { getEnvOrThrow } from '../utils/Env';

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedError('Access token required');
    }

    const decoded = jwt.verify(token, getEnvOrThrow('JWT_SECRET')) as JWTPayload;

    // Verify user still exists
    const user = userRepository.findById(decoded.userId);
    
    if (!user) {
      throw new UnauthorizedError('User no longer exists');
    }

    req.user = {
      id: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const authorize = (...roles: UserRole[]) => {

  return (req: Request, res: Response, next: NextFunction): void => {
    
    if (!req.user) {
      throw new UnauthorizedError('Authentication required');
    }

    if (!roles.includes(req.user.role as UserRole)) {
      throw new ForbiddenError('Insufficient permissions');
    }

    next();
  };
};