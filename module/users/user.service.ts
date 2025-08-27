import { UserRepository } from './user.repository';
import { User,  UserWithoutPassword } from './user.entity';
import { ConflictError, NotFoundError } from '../../shared/Errors/custom-error';
import { hashPassword } from '../../shared/utils/password';
import { UpdateProfileDTO, CreateCoachDTO } from './user.dto';
import { removeFields } from '../../shared/utils/object.methods';

class UserService {
  constructor(public repository: UserRepository) {}

  async updateProfile(userId: string, data: UpdateProfileDTO): Promise<UserWithoutPassword> {
    const user = this.repository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Check if email is being updated and already exists
    if (data.email && data.email !== user.email) {
      const existingUser = this.repository.findByEmail(data.email);
      if (existingUser) {
        throw new ConflictError('Email already in use');
      }
    }

    const updateData: Partial<Omit<User, 'id' | 'createdAt'>> = {};
    if (data.name !== undefined) updateData.name = data.name;
    if (data.email !== undefined) updateData.email = data.email;

    const updatedUser = this.repository.update(userId, updateData);
    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }

    const userWithoutPassword = removeFields(updatedUser, ['password']);
    return userWithoutPassword;
  }

  async createCoach(data: CreateCoachDTO): Promise<UserWithoutPassword> {
    // Check if user already exists
    const existingUser = this.repository.findByEmail(data.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create coach user
    const user = this.repository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: 'COACH',
    });

    // Return user without password
    const userWithoutPassword = removeFields(user, ['password']);

    return userWithoutPassword;
  }

 async getUserById(id: string): Promise<UserWithoutPassword | null> {
    const user = this.repository.findById(id);
    if (!user) {
      return null;
    }

    const userWithoutPassword = removeFields(user, ['password']);
    return userWithoutPassword;
  }
}

import { userRepository } from './user.repository';

export const userService = new UserService(userRepository);