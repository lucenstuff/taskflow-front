import type { Task } from './task';

export interface TagDTO {
  id?: number;
  name: string;
  task_id?: number;
}

export interface Tag {
  id?: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
} 