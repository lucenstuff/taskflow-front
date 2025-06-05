import axios from 'axios';
import type { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { authService } from './authService';

interface APIErrorResponse {
  message: string;
  code?: string;
  data?: unknown;
}

export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export interface APIResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
}

const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(new APIError(error.message));
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<APIErrorResponse>) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && originalRequest) {
      authService.logout();
    }

    const apiError = new APIError(
      error.response?.data?.message || error.message,
      error.response?.status,
      error.response?.data?.code,
      error.response?.data
    );

    return Promise.reject(apiError);
  }
);

export default api;