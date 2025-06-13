export interface TagDTO {
  id?: number;
  name: string;
  color?: string;
  task_ids?: number[];
}

export interface Tag {
  id?: number;
  name: string;
  color?: string;
  createdAt: string;
  updatedAt: string;
  task_ids: number[];
}