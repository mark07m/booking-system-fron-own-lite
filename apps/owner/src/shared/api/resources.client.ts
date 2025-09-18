import { apiClient } from "./axios";
import { API_ENDPOINTS, buildEndpoint } from "./endpoints";
import {
  Resource,
  CreateResourceRequest,
  UpdateResourceRequest,
  ResourceAvailability,
  PaginatedResponse,
  ApiResponse,
  PaginationParams,
} from "@shared/types/api.types";

export const resourcesClient = {
  // Get resources list
  async getResources(filters?: PaginationParams): Promise<PaginatedResponse<Resource>> {
    const endpoint = buildEndpoint(API_ENDPOINTS.RESOURCES.LIST, filters);
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Resource>>>(endpoint);
    return response.data.data;
  },

  // Get single resource
  async getResource(id: string): Promise<Resource> {
    const response = await apiClient.get<ApiResponse<Resource>>(API_ENDPOINTS.RESOURCES.GET(id));
    return response.data.data;
  },

  // Create resource
  async createResource(data: CreateResourceRequest): Promise<Resource> {
    const response = await apiClient.post<ApiResponse<Resource>>(
      API_ENDPOINTS.RESOURCES.CREATE,
      data
    );
    return response.data.data;
  },

  // Update resource
  async updateResource(id: string, data: UpdateResourceRequest): Promise<Resource> {
    const response = await apiClient.put<ApiResponse<Resource>>(
      API_ENDPOINTS.RESOURCES.UPDATE(id),
      data
    );
    return response.data.data;
  },

  // Delete resource
  async deleteResource(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.RESOURCES.DELETE(id));
  },

  // Get resource availability
  async getResourceAvailability(id: string, startDate?: string, endDate?: string): Promise<ResourceAvailability[]> {
    const params = { startDate, endDate };
    const endpoint = buildEndpoint(API_ENDPOINTS.RESOURCES.AVAILABILITY(id), params);
    const response = await apiClient.get<ApiResponse<ResourceAvailability[]>>(endpoint);
    return response.data.data;
  },

  // Update resource availability
  async updateResourceAvailability(id: string, availability: Omit<ResourceAvailability, "id" | "resourceId">[]): Promise<ResourceAvailability[]> {
    const response = await apiClient.put<ApiResponse<ResourceAvailability[]>>(
      API_ENDPOINTS.RESOURCES.AVAILABILITY(id),
      { availability }
    );
    return response.data.data;
  },

  // Get resource pricing
  async getResourcePricing(id: string): Promise<{ basePrice: number; pricingRules: any[] }> {
    const response = await apiClient.get<ApiResponse<{ basePrice: number; pricingRules: any[] }>>(
      API_ENDPOINTS.RESOURCES.PRICING(id)
    );
    return response.data.data;
  },

  // Update resource pricing
  async updateResourcePricing(id: string, pricing: { basePrice: number; pricingRules: any[] }): Promise<void> {
    await apiClient.put(API_ENDPOINTS.RESOURCES.PRICING(id), pricing);
  },

  // Get resource images
  async getResourceImages(id: string): Promise<string[]> {
    const response = await apiClient.get<ApiResponse<string[]>>(API_ENDPOINTS.RESOURCES.IMAGES(id));
    return response.data.data;
  },

  // Upload resource image
  async uploadResourceImage(id: string, file: File): Promise<string> {
    const formData = new FormData();
    formData.append("image", file);

    const response = await apiClient.post<ApiResponse<{ url: string }>>(
      API_ENDPOINTS.RESOURCES.UPLOAD_IMAGE(id),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data.url;
  },

  // Delete resource image
  async deleteResourceImage(id: string, imageId: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.RESOURCES.DELETE_IMAGE(id, imageId));
  },

  // Get resource categories
  async getResourceCategories(): Promise<string[]> {
    const response = await apiClient.get<ApiResponse<string[]>>(API_ENDPOINTS.RESOURCES.CATEGORIES);
    return response.data.data;
  },
};
