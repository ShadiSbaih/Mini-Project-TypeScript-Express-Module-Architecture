import { Router } from 'express';
import { courseController } from './course.controller';
import { authenticate, authorize } from '../../shared/middlewares/auth.middleware';
import { validateBody, validateParams } from '../../shared/middlewares/validation.middleware';
import { asyncHandler } from '../../shared/middlewares/error.middleware';
import { CreateCourseSchema, UpdateCourseSchema, CourseParamsSchema } from './course.dto';
import { uploadSingle } from '../../shared/utils/upload';

const router = Router();

// Create course (COACH and ADMIN only)
router.post(
  '/',
  authenticate,
  authorize('COACH', 'ADMIN'),
  uploadSingle('image'), // Handle image upload
  validateBody(CreateCourseSchema),
  asyncHandler(courseController.createCourse.bind(courseController))
);

// Get all courses (public)
router.get(
  '/',
  asyncHandler(courseController.getAllCourses.bind(courseController))
);

// Get course by ID (public)
router.get(
  '/:id',
  validateParams(CourseParamsSchema),
  asyncHandler(courseController.getCourseById.bind(courseController))
);

// Update course (creator or ADMIN only)
router.put(
  '/:id',
  authenticate,
  authorize('COACH', 'ADMIN'),
  uploadSingle('image'), // Handle image upload
  validateParams(CourseParamsSchema),
  validateBody(UpdateCourseSchema),
  asyncHandler(courseController.updateCourse.bind(courseController))
);

// Delete course (creator or ADMIN only)
router.delete(
  '/:id',
  authenticate,
  authorize('COACH', 'ADMIN'),
  validateParams(CourseParamsSchema),
  asyncHandler(courseController.deleteCourse.bind(courseController))
);

export default router;