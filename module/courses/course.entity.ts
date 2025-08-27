import { BaseEntity } from '../../shared/types/base.entity';

export interface Course extends BaseEntity {
  title: string;
  description: string;
  image?: string;
  creatorId: string;
}

// export type CreateCourse = Omit<Course, 'id' | 'createdAt' | 'updatedAt'>;
// export type UpdateCourse = Partial<Omit<Course, 'id' | 'createdAt' | 'updatedAt' | 'creatorId'>>;