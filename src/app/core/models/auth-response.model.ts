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
  accesstoken: string;
  refreshToken: string;
  tokenExpires: string | Date;
  userResponse: UserResponse;
}