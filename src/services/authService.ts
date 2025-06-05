import api from './apiConnection';
import type { AuthRequest, AuthResponse, RegisterRequest, UserDTO } from '@/types';

const BASE_PATH = '/api/v1/auth';

class AuthService {
  private static readonly TOKEN_KEY = 'auth_token';
  private static readonly USER_KEY = 'user';

  async login(credentials: AuthRequest): Promise<void> {
    try {
      const response = await api.post<AuthResponse>(`${BASE_PATH}/login`, credentials);
      const { token } = response.data;
      this.setToken(token);
      
      const user = await this.getCurrentUser();
      this.setUser(user);
    } catch (error) {
      throw error;
    }
  }

  async register(data: RegisterRequest): Promise<void> {
    try {
      const response = await api.post<AuthResponse>(`${BASE_PATH}/register`, data);
      const { token } = response.data;
      this.setToken(token);
      
      const user = await this.getCurrentUser();
      this.setUser(user);
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(): Promise<UserDTO> {
    const response = await api.get<UserDTO>(`${BASE_PATH}/me`);
    return response.data;
  }

  logout(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  private setToken(token: string): void {
    localStorage.setItem(AuthService.TOKEN_KEY, token);
  }

  private setUser(user: UserDTO): void {
    localStorage.setItem(AuthService.USER_KEY, JSON.stringify(user));
  }

  getUser(): UserDTO | null {
    const userStr = localStorage.getItem(AuthService.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = this.decodeToken(token);
      const expiry = payload.exp * 1000;
      return expiry > Date.now();
    } catch {
      return false;
    }
  }

  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService(); 