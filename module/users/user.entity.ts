import { BaseEntity, UserRole } from '../../shared/types/base.entity';

export interface User extends BaseEntity {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

// export type CreateUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
// export type UpdateUser = Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'role'>>;
export type UserWithoutPassword = Omit<User, 'password'>;