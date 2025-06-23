import { Role } from "./role.enum";
export interface UserResponse {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatarUrl?: string;
  bio?: string;
  email: string;
  role:Role;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string | Date;
  userResponse: UserResponse;
}