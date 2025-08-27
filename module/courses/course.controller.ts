import { Request, Response } from 'express';
import { courseService } from './course.service';
import { NotFoundError } from '../../shared/Errors/custom-error';
import { CreateCourseDTO, UpdateCourseDTO, CourseParamsDTO } from './course.dto';

export class CourseController {
  async createCourse(req: Request, res: Response): Promise<void> {
    const creatorId = req.user!.id;
    const data: CreateCourseDTO = req.body;
    const imageFile = req.file;

    const course = await courseService.createCourse(creatorId, data, imageFile);

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course,
    });
  }

  async getAllCourses(req: Request, res: Response): Promise<void> {
    const courses = courseService.getAllCourses();
    
    res.status(200).json({
      success: true,
      data: courses,
    });
  }

  async getCourseById(req: Request, res: Response): Promise<void> {
    const { id }: CourseParamsDTO = req.params as CourseParamsDTO;
    
    const course = courseService.getCourseById(id);
    if (!course) {
      throw new NotFoundError('Course not found');
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  }

  async updateCourse(req: Request, res: Response): Promise<void> {
    const { id }: CourseParamsDTO = req.params as CourseParamsDTO;
    const userId = req.user!.id;
    const userRole = req.user!.role;
    const data: UpdateCourseDTO = req.body;
    const imageFile = req.file;
    
    const updatedCourse = courseService.updateCourse(id, userId, userRole, data, imageFile);
    
    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: updatedCourse,
    });
  }

  async deleteCourse(req: Request, res: Response): Promise<void> {
    const { id }: CourseParamsDTO = req.params as CourseParamsDTO;
    const userId = req.user!.id;
    const userRole = req.user!.role;
    
    courseService.deleteCourse(id, userId, userRole);
    
    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  }
}

export const courseController = new CourseController();