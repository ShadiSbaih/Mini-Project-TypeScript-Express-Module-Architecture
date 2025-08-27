import { ConflictError, UnauthorizedError } from '../../shared/Errors/custom-error';
import { generateToken } from '../../shared/utils/jwt';
import { hashPassword, comparePassword } from '../../shared/utils/password';
import { RegisterDTO, LoginDTO } from './auth.dto';
import { AuthResponse } from './auth.entity';
import { userRepository } from '../users/user.repository';
import { removeFields } from "../../shared/utils/object.methods"


export class AuthService {
  async register(data: RegisterDTO): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user with STUDENT role by default
    const user = userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: 'STUDENT',
    });

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Remove password field
    const userWithoutPassword = removeFields(user, ['password']);

    return {
      user: userWithoutPassword,
      token,
    };
  }

  async login(data: LoginDTO): Promise<AuthResponse> {
    // Find user by email
    const user = userRepository.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Generate JWT token
    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Return user without password
    const userWithoutPassword = removeFields(user, ['password']);

    return {
      user: userWithoutPassword,
      token,
    };
  }

}

export const authService = new AuthService();