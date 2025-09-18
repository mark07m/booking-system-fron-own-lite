// Export API clients
export { authClient } from "./auth.client";
export { bookingsClient } from "./bookings.client";
export { resourcesClient } from "./resources.client";
export { clientsClient } from "./clients.client";
export { statsClient } from "./stats.client";

// Export axios instance
export { apiClient } from "./axios";

// Export endpoints
export { API_ENDPOINTS, buildQueryString, buildEndpoint } from "./endpoints";

// Re-export types
export type {
  ApiResponse,
  ApiError,
  PaginationParams,
  PaginatedResponse,
  BaseEntity,
  User,
  CreateUserRequest,
  UpdateUserRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  Booking,
  CreateBookingRequest,
  UpdateBookingRequest,
  BookingFilters,
  Resource,
  CreateResourceRequest,
  UpdateResourceRequest,
  ResourceAvailability,
  Client,
  CreateClientRequest,
  UpdateClientRequest,
  ClientAddress,
  ClientNote,
  DashboardStats,
  BookingStats,
  RevenueStats,
  FileUpload,
  FileUploadRequest,
  Notification,
  CreateNotificationRequest,
  AppSettings,
  SystemHealth,
  SystemVersion,
} from "../types/api.types";
