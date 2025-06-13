import { authService } from '@/services/authService';
import axios from 'axios'; 

interface TaskDTO {
  id?: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  created_at?: Date;
  updated_at?: Date;
  finished_at?: Date;
  userId?: number;
  tags: TagDTO[];
}

/* interfaz de task.ts
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
}*/

interface TagDTO {
  id: number;
  name: string;
}

const authServices = authService;

const api = axios.create({
  baseURL: 'http://localhost:8080',
   headers: {
    Authorization: `Bearer ${authServices.getToken()}`,
  },
});

const getTasks = async () => {
  const response = await api.get('/api/v1/tasks');
  return response.data;
};

const getTaskById = async (id: number) => {
  const response = await api.get(`/api/v1/tasks/${id}`);
  return response.data;
};

const createTask = async (taskDTO: TaskDTO) => {
  const response = await api.post('/api/v1/tasks', taskDTO);
  return response.data;
};

const updateTask = async (id: number, taskDTO: TaskDTO) => {
  const response = await api.put(`/api/v1/tasks/${id}`, taskDTO);
  return response.data;
};

const deleteTask = async (id: number) => {
  const response = await api.delete(`/api/v1/tasks/${id}`);
  return response.data;
};


export { getTasks, getTaskById, createTask, updateTask, deleteTask };