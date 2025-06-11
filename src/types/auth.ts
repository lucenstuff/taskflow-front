export interface AuthRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends AuthRequest {
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  token: string;
  message?: string;
}
