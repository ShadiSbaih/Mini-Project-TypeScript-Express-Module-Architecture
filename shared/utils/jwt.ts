import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken';
import { getEnvOrThrow } from './Env';

type JWT_PAYLOAD = object | string | Buffer;

export const generateToken = (payload: JWT_PAYLOAD, options?: SignOptions): string => {
  const JWT_EXPIRES_IN = getEnvOrThrow('JWT_EXPIRES_IN');
  const JWT_SECRET = getEnvOrThrow('JWT_SECRET');
  
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as any,
    ...options,
  });
};

export const verifyToken = (token: string, options?: VerifyOptions): JWT_PAYLOAD => {
  const JWT_SECRET = getEnvOrThrow('JWT_SECRET');
  return jwt.verify(token, JWT_SECRET, options) as JWT_PAYLOAD;
};