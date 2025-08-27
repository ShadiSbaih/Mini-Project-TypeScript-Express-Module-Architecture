import { BaseEntity } from '../types/base.entity';

// Interface that defines the contract for repository operations
interface Repository<Type extends BaseEntity> {
  findAll(): Type[];
  findById(id: Type['id']): Type | null;
  findOneBy(predicate: (item: Type) => boolean): Type | null;
  create(payload: Omit<Type, 'id' | 'createdAt' | 'updatedAt'>): Type;
  update(id: Type['id'], payload: Partial<Omit<Type, 'id' | 'createdAt'>>): Type | null;
  deleteById(id: Type['id']): boolean;
}

// Base repository implementation
export class GenericRepository<T extends BaseEntity> implements Repository<T> {
  protected items: T[] = [];

  findAll(): T[] {
    return [...this.items];
  }

  findById(id: T['id']): T | null {
    const item = this.items.find((item) => item.id === id);
    return item ? { ...item } : null;
  }

  findOneBy(predicate: (item: T) => boolean): T | null {
    const item = this.items.find(predicate);
    return item ? { ...item } : null;
  }

  create(payload: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): T {
    const now = new Date();
    const newItem = {
      ...payload,
      id: this.generateId(),
      createdAt: now,
      updatedAt: now,
    } as T;

    this.items.push(newItem);
    return { ...newItem };
  }

  update(id: T['id'], payload: Partial<Omit<T, 'id' | 'createdAt'>>): T | null {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }

    const updatedItem = {
      ...this.items[index],
      ...payload,
      updatedAt: new Date(),
    } as T;

    this.items[index] = updatedItem;
    return { ...updatedItem };
  }

  deleteById(id: T['id']): boolean {
    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return false;
    }

    this.items.splice(index, 1);
    return true;
  }

  // Helper method to generate unique IDs
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }
}