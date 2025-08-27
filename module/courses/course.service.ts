import { CourseRepository } from './course.repository';
import { Course } from './course.entity';
import { NotFoundError, ForbiddenError } from '../../shared/Errors/custom-error';
import { CreateCourseDTO, UpdateCourseDTO } from './course.dto';
import { deleteUploadedAsset } from '../../shared/utils/file.utils';

class CourseService {
  constructor(public repository: CourseRepository) {}

  createCourse(creatorId: string, data: CreateCourseDTO, imageFile?: Express.Multer.File): Course {
    const courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'> = {
      title: data.title,
      description: data.description,
      creatorId,
    };
    
    // Add image path if file was uploaded
    if (imageFile) {
      courseData.image = `/uploads/${imageFile.filename}`;
    }
    
    return this.repository.create(courseData);
  }

  getAllCourses(): Course[] {
    return this.repository.findAll();
  }

  getCourseById(id: string): Course | null {
    return this.repository.findById(id);
  }

  updateCourse(courseId: string, userId: string, userRole: string, data: UpdateCourseDTO, imageFile?: Express.Multer.File): Course {
    const course = this.repository.findById(courseId);
    if (!course) {
      throw new NotFoundError('Course not found');
    }

    // Check permissions: only creator or admin can update
    if (course.creatorId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenError('You can only update your own courses');
    }

    const updateData: Partial<Omit<Course, 'id' | 'createdAt'>> = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (imageFile) updateData.image = `/uploads/${imageFile.filename}`;

    const updatedCourse = this.repository.update(courseId, updateData);
    if (!updatedCourse) {
      throw new NotFoundError('Course not found');
    }

    return updatedCourse;
  }

  deleteCourse(courseId: string, userId: string, userRole: string): void {
    const course = this.repository.findById(courseId);
    if (!course) {
      throw new NotFoundError('Course not found');
    }

    // Check permissions: only creator or admin can delete
    if (course.creatorId !== userId && userRole !== 'ADMIN') {
      throw new ForbiddenError('You can only delete your own courses');
    }

    // Delete associated image file if exists
    if (course.image) {
      const fileName = course.image.replace('/uploads/', '');
      deleteUploadedAsset(fileName).catch(console.error);
    }

    const deleted = this.repository.deleteById(courseId);
    if (!deleted) {
      throw new NotFoundError('Course not found');
    }
  }

  getCoursesByCreator(creatorId: string): Course[] {
    return this.repository.findByCreatorId(creatorId);
  }
}

import { courseRepository } from './course.repository';

export const courseService = new CourseService(courseRepository);