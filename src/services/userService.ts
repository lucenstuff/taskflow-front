import api from './apiConnection';
import type { UserDTO } from '@/types';

const BASE_PATH = '/api/v1/users';

export const userService = {
  getCurrentUser: async (): Promise<UserDTO> => {
    const response = await api.get<UserDTO>('/api/v1/auth/me');
    return response.data;
  },

  hello: async (): Promise<Record<string, string>> => {
    const response = await api.get<Record<string, string>>(`${BASE_PATH}/`);
    return response.data;
  },

  partialUpdateUser: async (id: number, userData: Partial<UserDTO>): Promise<UserDTO> => {
    const response = await api.patch<UserDTO>(`${BASE_PATH}/${id}`, userData);
    return response.data;
  }
}; 