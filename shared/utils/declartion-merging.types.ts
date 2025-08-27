
export type MyEnvs = {
  PORT: string;
  NODE_ENV: 'development' | 'production';
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  SALT_ROUNDS: string;
};

declare global {
  namespace NodeJS {
    interface ProcessEnv extends MyEnvs {}
  }
}

// Extend Express Request interface for file uploads
declare global {
  namespace Express {
    interface Request {
      file?: Multer.File;
    }
  }
}
