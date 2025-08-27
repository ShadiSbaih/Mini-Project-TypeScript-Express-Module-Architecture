import bcrypt from 'bcryptjs';
import { getEnvOrThrow } from './Env';

export const hashPassword = async (password: string): Promise<string> => {
  const SALT_ROUNDS = getEnvOrThrow('SALT_ROUNDS');
  return await bcrypt.hash(password, Number(SALT_ROUNDS));
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};