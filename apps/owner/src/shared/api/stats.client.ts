import { apiClient } from "./axios";
import { API_ENDPOINTS, buildEndpoint } from "./endpoints";
import {
  DashboardStats,
  BookingStats,
  RevenueStats,
  ApiResponse,
  PaginationParams,
} from "@/src/shared/types/api.types";

export const statsClient = {
  // Get dashboard stats
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await apiClient.get<ApiResponse<DashboardStats>>(API_ENDPOINTS.STATS.DASHBOARD);
    return response.data.data;
  },

  // Get booking stats
  async getBookingStats(filters?: { startDate?: string; endDate?: string }): Promise<BookingStats> {
    const endpoint = buildEndpoint(API_ENDPOINTS.STATS.BOOKINGS, filters);
    const response = await apiClient.get<ApiResponse<BookingStats>>(endpoint);
    return response.data.data;
  },

  // Get revenue stats
  async getRevenueStats(filters?: { startDate?: string; endDate?: string }): Promise<RevenueStats> {
    const endpoint = buildEndpoint(API_ENDPOINTS.STATS.REVENUE, filters);
    const response = await apiClient.get<ApiResponse<RevenueStats>>(endpoint);
    return response.data.data;
  },

  // Get client stats
  async getClientStats(filters?: { startDate?: string; endDate?: string }): Promise<{
    total: number;
    active: number;
    new: number;
    growth: number;
  }> {
    const endpoint = buildEndpoint(API_ENDPOINTS.STATS.CLIENTS, filters);
    const response = await apiClient.get<ApiResponse<{
      total: number;
      active: number;
      new: number;
      growth: number;
    }>>(endpoint);
    return response.data.data;
  },

  // Get resource stats
  async getResourceStats(filters?: { startDate?: string; endDate?: string }): Promise<{
    total: number;
    active: number;
    popular: Array<{
      id: string;
      name: string;
      bookings: number;
      revenue: number;
    }>;
  }> {
    const endpoint = buildEndpoint(API_ENDPOINTS.STATS.RESOURCES, filters);
    const response = await apiClient.get<ApiResponse<{
      total: number;
      active: number;
      popular: Array<{
        id: string;
        name: string;
        bookings: number;
        revenue: number;
      }>;
    }>>(endpoint);
    return response.data.data;
  },

  // Export stats
  async exportStats(format: "csv" | "xlsx" | "pdf", filters?: { startDate?: string; endDate?: string }): Promise<Blob> {
    const params = { format, ...filters };
    const endpoint = buildEndpoint(API_ENDPOINTS.STATS.EXPORT, params);
    const response = await apiClient.get(endpoint, {
      responseType: "blob",
    });
    return response.data;
  },

  // Get reports
  async getReports(filters?: PaginationParams): Promise<{
    data: Array<{
      id: string;
      name: string;
      type: string;
      createdAt: string;
      url: string;
    }>;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  }> {
    const endpoint = buildEndpoint(API_ENDPOINTS.STATS.REPORTS, filters);
    const response = await apiClient.get<ApiResponse<{
      data: Array<{
        id: string;
        name: string;
        type: string;
        createdAt: string;
        url: string;
      }>;
      pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
    }>>(endpoint);
    return response.data.data;
  },
};
