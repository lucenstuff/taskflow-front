import api from './apiConnection';
import type { TaskDTO } from '@/types';

const BASE_PATH = '/api/v1/tasks';

export const taskService = {
  getAllTasks: async (): Promise<TaskDTO[]> => {
    const response = await api.get<TaskDTO[]>(BASE_PATH);
    return response.data;
  },

  getTaskById: async (id: number): Promise<TaskDTO> => {
    const response = await api.get<TaskDTO>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  createTask: async (task: TaskDTO): Promise<TaskDTO> => {
    const response = await api.post<TaskDTO>(BASE_PATH, task);
    return response.data;
  },

  updateTask: async (id: number, task: TaskDTO): Promise<TaskDTO> => {
    const response = await api.put<TaskDTO>(`${BASE_PATH}/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`${BASE_PATH}/${id}`);
  },

  hello: async (): Promise<Record<string, string>> => {
    const response = await api.get<Record<string, string>>(`${BASE_PATH}/`);
    return response.data;
  }
}; 