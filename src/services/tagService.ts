import api from './apiConnection';
import type { Tag, TagDTO } from '@/types';

const BASE_PATH = '/api/v1/tags';

export const tagService = {
  getTagById: async (id: number): Promise<Tag> => {
    const response = await api.get<Tag>(`${BASE_PATH}/${id}`);
    return response.data;
  },

  createTag: async (tag: TagDTO): Promise<Tag> => {
    const response = await api.post<Tag>(BASE_PATH, tag);
    return response.data;
  },

  updateTag: async (id: number, tag: TagDTO): Promise<Tag> => {
    const response = await api.put<Tag>(`${BASE_PATH}/${id}`, tag);
    return response.data;
  },

  deleteTag: async (id: number): Promise<void> => {
    await api.delete(`${BASE_PATH}/${id}`);
  }
}; 