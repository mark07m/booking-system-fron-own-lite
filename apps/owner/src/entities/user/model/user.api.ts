import { apiClient } from "@shared/api/axios";
import { API_ENDPOINTS } from "@shared/api/endpoints";
import { PaginatedResponse, PaginationParams } from "@shared/types/api.types";
import { User, CreateUserRequest, UpdateUserRequest, UserFilters } from "./user.types";

export const userApi = {
  async getUsers(
    params: PaginationParams & UserFilters = {}
  ): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get<PaginatedResponse<User>>(
      API_ENDPOINTS.USERS.LIST,
      { params }
    );
    return response.data;
  },

  async getUser(id: string): Promise<User> {
    const response = await apiClient.get<User>(API_ENDPOINTS.USERS.GET(id));
    return response.data;
  },

  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await apiClient.post<User>(API_ENDPOINTS.USERS.CREATE, data);
    return response.data;
  },

  async updateUser(id: string, data: UpdateUserRequest): Promise<User> {
    const response = await apiClient.put<User>(API_ENDPOINTS.USERS.UPDATE(id), data);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
  },
};
