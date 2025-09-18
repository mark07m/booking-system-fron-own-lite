import { apiClient } from "./axios";
import { API_ENDPOINTS, buildEndpoint } from "./endpoints";
import {
  Booking,
  CreateBookingRequest,
  UpdateBookingRequest,
  BookingFilters,
  PaginatedResponse,
  ApiResponse,
} from "@/src/shared/types/api.types";

export const bookingsClient = {
  // Get bookings list
  async getBookings(filters?: BookingFilters): Promise<PaginatedResponse<Booking>> {
    const endpoint = buildEndpoint(API_ENDPOINTS.BOOKINGS.LIST, filters);
    const response = await apiClient.get<ApiResponse<PaginatedResponse<Booking>>>(endpoint);
    return response.data.data;
  },

  // Get single booking
  async getBooking(id: string): Promise<Booking> {
    const response = await apiClient.get<ApiResponse<Booking>>(API_ENDPOINTS.BOOKINGS.GET(id));
    return response.data.data;
  },

  // Create booking
  async createBooking(data: CreateBookingRequest): Promise<Booking> {
    const response = await apiClient.post<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKINGS.CREATE,
      data
    );
    return response.data.data;
  },

  // Update booking
  async updateBooking(id: string, data: UpdateBookingRequest): Promise<Booking> {
    const response = await apiClient.put<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKINGS.UPDATE(id),
      data
    );
    return response.data.data;
  },

  // Delete booking
  async deleteBooking(id: string): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.BOOKINGS.DELETE(id));
  },

  // Confirm booking
  async confirmBooking(id: string): Promise<Booking> {
    const response = await apiClient.post<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKINGS.CONFIRM(id)
    );
    return response.data.data;
  },

  // Cancel booking
  async cancelBooking(id: string, reason?: string): Promise<Booking> {
    const response = await apiClient.post<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKINGS.CANCEL(id),
      { reason }
    );
    return response.data.data;
  },

  // Complete booking
  async completeBooking(id: string): Promise<Booking> {
    const response = await apiClient.post<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKINGS.COMPLETE(id)
    );
    return response.data.data;
  },

  // Reschedule booking
  async rescheduleBooking(id: string, newStartDate: string, newEndDate: string): Promise<Booking> {
    const response = await apiClient.post<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKINGS.RESCHEDULE(id),
      { newStartDate, newEndDate }
    );
    return response.data.data;
  },

  // Process payment
  async processPayment(id: string, paymentData: {
    method: string;
    amount: number;
    paymentId?: string;
  }): Promise<Booking> {
    const response = await apiClient.post<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKINGS.PAYMENT(id),
      paymentData
    );
    return response.data.data;
  },

  // Process refund
  async processRefund(id: string, refundData: {
    amount: number;
    reason: string;
  }): Promise<Booking> {
    const response = await apiClient.post<ApiResponse<Booking>>(
      API_ENDPOINTS.BOOKINGS.REFUND(id),
      refundData
    );
    return response.data.data;
  },

  // Export bookings
  async exportBookings(filters?: BookingFilters): Promise<Blob> {
    const endpoint = buildEndpoint(API_ENDPOINTS.BOOKINGS.EXPORT, filters);
    const response = await apiClient.get(endpoint, {
      responseType: "blob",
    });
    return response.data;
  },

  // Bulk update bookings
  async bulkUpdateBookings(bookingIds: string[], updates: Partial<UpdateBookingRequest>): Promise<Booking[]> {
    const response = await apiClient.post<ApiResponse<Booking[]>>(
      API_ENDPOINTS.BOOKINGS.BULK_UPDATE,
      { bookingIds, updates }
    );
    return response.data.data;
  },
};
