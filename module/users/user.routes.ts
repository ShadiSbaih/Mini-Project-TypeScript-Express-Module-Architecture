import { Router } from 'express';
import { userController } from './user.controller';
import { authenticate, authorize } from '../../shared/middlewares/auth.middleware';
import { validateBody } from '../../shared/middlewares/validation.middleware';
import { asyncHandler } from '../../shared/middlewares/error.middleware';
import { UpdateProfileSchema, CreateCoachSchema } from './user.dto';

const router = Router();

// Get current user profile
router.get(
  '/me',
  authenticate,
  asyncHandler(userController.getProfile.bind(userController))
);

// Update current user profile
router.put(
  '/me',
  authenticate,
  validateBody(UpdateProfileSchema),
  asyncHandler(userController.updateProfile.bind(userController))
);

// Create coach user (ADMIN only)
router.post(
  '/coach',
  authenticate,
  authorize('ADMIN'),
  validateBody(CreateCoachSchema),
  asyncHandler(userController.createCoach.bind(userController))
);

export default router;