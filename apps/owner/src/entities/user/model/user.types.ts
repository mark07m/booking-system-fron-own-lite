import { BaseEntity } from "@shared/types/api.types";

export interface User extends BaseEntity {
  email: string;
  name: string;
  role: "admin" | "manager" | "user";
  avatar?: string;
  isActive: boolean;
  lastLoginAt?: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role: "admin" | "manager" | "user";
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: "admin" | "manager" | "user";
  isActive?: boolean;
}

export interface UserFilters {
  role?: string;
  isActive?: boolean;
  search?: string;
}
