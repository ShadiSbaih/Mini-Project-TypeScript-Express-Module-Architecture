import { GenericRepository } from '../../shared/repository/generic.repository';
import { Course } from './course.entity';

export class CourseRepository extends GenericRepository<Course> {
  constructor() {
    super();
  }

  // Course-specific methods can be added here
  findByCreatorId(creatorId: string): Course[] {
    return this.items.filter((course) => course.creatorId === creatorId);
  }

  findByTitle(title: string): Course | null {
    return this.findOneBy((course) => course.title.toLowerCase().includes(title.toLowerCase()));
  }

  searchCourses(searchTerm: string): Course[] {
    const term = searchTerm.toLowerCase();
    return this.items.filter((course) => 
      course.title.toLowerCase().includes(term) || 
      course.description.toLowerCase().includes(term)
    );
  }
}

// Export a singleton instance
export const courseRepository = new CourseRepository();
