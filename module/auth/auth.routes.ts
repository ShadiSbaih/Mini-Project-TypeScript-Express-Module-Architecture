import { Router } from 'express';
import { authController } from './auth.controller';
import { validateBody } from '../../shared/middlewares/validation.middleware';
import { asyncHandler } from '../../shared/middlewares/error.middleware';
import { RegisterSchema, LoginSchema } from './auth.dto';

const router = Router();

router.post(
  '/register',
  validateBody(RegisterSchema),
  asyncHandler(authController.register.bind(authController))
);

router.post(
  '/login',
  validateBody(LoginSchema),
  asyncHandler(authController.login.bind(authController))
);

export default router;