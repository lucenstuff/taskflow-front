export interface GrantedAuthority {
  authority: string;
}

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'USER' | 'ADMIN';
  authorities: GrantedAuthority[];
  username: string;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  enabled: boolean;
}

export interface UserDTO {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
} 