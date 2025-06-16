import { Role } from "./role.enum";
export interface IUser {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  createdAt:string;
  updatedAt:string;
  role: Role;
}



  
  