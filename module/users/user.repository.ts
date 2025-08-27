import { GenericRepository } from '../../shared/repository/generic.repository';
import { User } from './user.entity';

export class UserRepository extends GenericRepository<User> {
  constructor() {
    super();
  }

  // User-specific methods can be added here
  findByEmail(email: string): User | null {
    return this.findOneBy((user) => user.email === email);
  }

  findByRole(role: string): User[] {
    return this.items.filter((user) => user.role === role);
  }
}

// Export a singleton instance
export const userRepository = new UserRepository();
