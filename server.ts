import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import { errorHandler, notFoundHandler } from './shared/middlewares/error.middleware';
import { createDefaultAdmin } from './shared/utils/seed.data';
import { ensureUploadsDirectory } from './shared/utils/file.utils';
import authRoutes from './module/auth/auth.routes';
import userRoutes from './module/users/user.routes';
import courseRoutes from './module/courses/course.routes';
import { getEnvOrThrow } from './shared/utils/Env';

const app = express();
const PORT = getEnvOrThrow('PORT');

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Express TypeScript API is running',
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
app.listen(parseInt(PORT), async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  
  // Ensure uploads directory exists
  await ensureUploadsDirectory();
  
  // Create default admin user
  createDefaultAdmin();
  console.log('👤 Default admin user created: admin@no.com / admin123');
});

export default app;