import { userRepository } from '../../module/users/user.repository';
import { hashPassword } from './password';
export const createDefaultAdmin = async (): Promise<void> => {
  const adminEmail = 'admin@no.com';
  
  // Check if admin already exists
  const existingAdmin = userRepository.findByEmail(adminEmail);
  if (existingAdmin) {
    return;
  }

  // Create default admin
  const hashedPassword = await hashPassword('admin123');
  
  userRepository.create({
    name: 'System Administrator',
    email: adminEmail,
    password: hashedPassword,
    role: 'ADMIN',
  });
};