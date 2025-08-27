import { Request, Response } from 'express';
import { userService } from './user.service';
import { NotFoundError } from '../../shared/Errors/custom-error';
import { UpdateProfileDTO, CreateCoachDTO } from './user.dto';

export class UserController {
  async getProfile(req: Request, res: Response): Promise<void> {
    const userId = req.user!.id;
    
    const user = userService.getUserById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  }

  async updateProfile(req: Request, res: Response): Promise<void> {
    const userId = req.user!.id;
    const data: UpdateProfileDTO = req.body;
    
    const updatedUser = await userService.updateProfile(userId, data);
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updatedUser,
    });
  }

  async createCoach(req: Request, res: Response): Promise<void> {
    const data: CreateCoachDTO = req.body;
    
    const coach = await userService.createCoach(data);
    
    res.status(201).json({
      success: true,
      message: 'Coach created successfully',
      data: coach,
    });
  }
}

export const userController = new UserController();