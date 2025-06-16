import { Role } from "./role.enum";

export interface IAdminUserUpdate {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
    role: Role;  // Role as a string (Customer, Admin, etc.)
    isActive: boolean;
    emailVerified?: boolean;
  }