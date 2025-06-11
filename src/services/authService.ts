import api from "./apiConnection";
import type {
  AuthRequest,
  AuthResponse,
  RegisterRequest,
  UserDTO,
} from "@/types";

const BASE_PATH = "/api/v1/auth";

class AuthService {
  private static readonly TOKEN_KEY = "auth_token";
  private static readonly USER_KEY = "user";

  async login(credentials: AuthRequest): Promise<void> {
    const token = await this.authenticate(`${BASE_PATH}/login`, credentials);
    this.setToken(token);
    await this.loadAndStoreUser();
  }

  async register(data: RegisterRequest): Promise<void> {
    const token = await this.authenticate(`${BASE_PATH}/register`, data);
    this.setToken(token);
    await this.loadAndStoreUser();
  }

  logout(): void {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.USER_KEY);
    delete api.defaults.headers.common["Authorization"];
  }

  getUser(): UserDTO | null {
    const userStr = localStorage.getItem(AuthService.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const payload = this.decodeToken(token);
    return payload?.exp !== undefined && payload.exp * 1000 > Date.now();
  }

  async refreshUser(): Promise<UserDTO | null> {
    try {
      const { data: user } = await api.get<UserDTO>(`${BASE_PATH}/me`);
      this.setUser(user);
      return user;
    } catch {
      return null;
    }
  }

  private async authenticate(
    endpoint: string,
    data: AuthRequest | RegisterRequest
  ): Promise<string> {
    const { data: res } = await api.post<AuthResponse>(endpoint, data);
    if (!res.token) throw new Error("Authentication token is missing.");
    return res.token;
  }

  private async loadAndStoreUser(): Promise<void> {
    const user = await this.refreshUser();
    if (!user) throw new Error("Failed to load user after authentication.");
  }

  private setToken(token: string): void {
    localStorage.setItem(AuthService.TOKEN_KEY, token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  private setUser(user: UserDTO): void {
    localStorage.setItem(AuthService.USER_KEY, JSON.stringify(user));
  }

  private decodeToken(token: string): { exp: number } | null {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch {
      return null;
    }
  }
}

export const authService = new AuthService();
