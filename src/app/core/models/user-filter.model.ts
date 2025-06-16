import { Role } from "./role.enum";

export interface IUserFilter {
    searchTerm: string;
    roleFilter?: string; // yoki Role enum
    isActiveFilter?: boolean;
    pageNumber: number;
    pageSize: number;
  }