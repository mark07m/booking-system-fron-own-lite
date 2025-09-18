import { apiClient } from "./axios";
import { API_ENDPOINTS, buildEndpoint } from "./endpoints";
import {
  Client,
  CreateClientRequest,
  UpdateClientRequest,
  ClientNote,
  Booking,
  PaginatedResponse,
  ApiResponse,
  PaginationParams,
} from "@shared/types/api.types";

export const clientsClient = {
  // Get clients list
  async getClients(filters?: PaginationParams): Promise<PaginatedResponse<Client>> {
    const endpoint = buildEndpoint(API_ENDPOINTS.CLIENTS.LIST, filters);
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Client>>>(endpoint);
    return response.data.data;
  },

  // Get single client
  async getClient(id: string): Promise<Client> {
    const response = await apiClient.get<ApiResponse<Client>>(API_ENDPOINTS.CLIENTS.GET(id));
    return response.data.data;
  },

  // Create client
  async createClient(data: CreateClientRequest): Promise<Client> {
    const response = await apiClient.post<ApiResponse<Client>>(
      API_ENDPOINTS.CLIENTS.CREATE,
      data
    );
    return response.data.data;
  },

  // Update client
  async updateClient(id: string, data: UpdateClientRequest): Promise<Client> {
    const response = await apiClient.put<ApiResponse<Client>>(
      API_ENDPOINTS.CLIENTS.UPDATE(id),
      data
    );
    return response.data.data;
  },

  // Delete client
  async deleteClient(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.CLIENTS.DELETE(id));
  },

  // Get client bookings
  async getClientBookings(id: string, filters?: PaginationParams): Promise<PaginatedResponse<Booking>> {
    const endpoint = buildEndpoint(API_ENDPOINTS.CLIENTS.BOOKINGS(id), filters);
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Booking>>>(endpoint);
    return response.data.data;
  },

  // Get client history
  async getClientHistory(id: string, filters?: PaginationParams): Promise<PaginatedResponse<any>> {
    const endpoint = buildEndpoint(API_ENDPOINTS.CLIENTS.HISTORY(id), filters);
    const response = await apiClient.get<ApiResponse<PaginatedResponse<any>>>(endpoint);
    return response.data.data;
  },

  // Get client notes
  async getClientNotes(id: string, filters?: PaginationParams): Promise<PaginatedResponse<ClientNote>> {
    const endpoint = buildEndpoint(API_ENDPOINTS.CLIENTS.NOTES(id), filters);
    const response = await apiClient.get<ApiResponse<PaginatedResponse<ClientNote>>>(endpoint);
    return response.data.data;
  },

  // Add client note
  async addClientNote(id: string, content: string): Promise<ClientNote> {
    const response = await apiClient.post<ApiResponse<ClientNote>>(
      API_ENDPOINTS.CLIENTS.ADD_NOTE(id),
      { content }
    );
    return response.data.data;
  },

  // Update client note
  async updateClientNote(id: string, noteId: string, content: string): Promise<ClientNote> {
    const response = await apiClient.put<ApiResponse<ClientNote>>(
      API_ENDPOINTS.CLIENTS.UPDATE_NOTE(id, noteId),
      { content }
    );
    return response.data.data;
  },

  // Delete client note
  async deleteClientNote(id: string, noteId: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.CLIENTS.DELETE_NOTE(id, noteId));
  },
};
