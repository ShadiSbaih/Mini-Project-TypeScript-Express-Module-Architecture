import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../Errors/custom-error';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Default error response
  let error = {
    message: 'Internal Server Error',
    statusCode: 500,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  };

  // Custom error
  if (err instanceof CustomError) {
    error.message = err.message;
    error.statusCode = err.statusCode;
  }

  // Zod validation error
  if (err instanceof ZodError) {
    error.message = 'Validation Error';
    error.statusCode = 400;
    const zodErrors = err.issues.map((e: any) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
    error = {
      ...error,
      errors: zodErrors,
    } as any;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error.message = 'Invalid token';
    error.statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    error.message = 'Token expired';
    error.statusCode = 401;
  }

  console.error('Error:', err);

  res.status(error.statusCode).json({
    success: false,
    error: error.message,

  });
};

export const notFoundHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    error: `Route ${req.method} ${req.originalUrl} not found`,
  });
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};