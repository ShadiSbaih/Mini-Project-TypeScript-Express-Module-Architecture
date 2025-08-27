import { Request, Response } from 'express';
import { authService } from './auth.service';
import { RegisterDTO, LoginDTO } from './auth.dto';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    
    const data: RegisterDTO = req.body;
    
    const result = await authService.register(data);
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  }

  async login(req: Request, res: Response): Promise<void> {
    const data: LoginDTO = req.body;
    
    const result = await authService.login(data);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result,
    });
  }
}

export const authController = new AuthController();