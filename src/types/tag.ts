import type { Task } from './task';

export interface TagDTO {
  id?: number;
  name: string;
  color?: string;
  task_id?: number;
}

export interface Tag {
  id?: number;
  name: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
} 