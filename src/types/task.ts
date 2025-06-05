import type { Tag, TagDTO } from './tag';
import type { User } from './user';

export enum TaskStatus {
  BLOCKED = 'BLOCKED',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  ON_HOLD = 'ON_HOLD'
}

export enum TaskPriority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW'
}

export interface TaskDTO {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  created_at?: string;
  updated_at?: string;
  finished_at?: string;
  userId?: number;
  tags?: TagDTO[];
}

export interface Task {
  id?: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  created_at: string;
  updated_at: string;
  finished_at?: string;
  tags: Tag[];
  user: User;
} 