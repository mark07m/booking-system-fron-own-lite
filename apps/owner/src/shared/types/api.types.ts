// Common API response wrapper
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error response
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

// Common entity fields
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// User types
export interface User extends BaseEntity {
  email: string;
  name: string;
  role: "admin" | "manager" | "user";
  avatar?: string;
  isActive: boolean;
}

// Booking types
export interface Booking extends BaseEntity {
  userId: string;
  resourceId: string;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  totalPrice: number;
  notes?: string;
  user?: User;
  resource?: Resource;
}

// Resource types
export interface Resource extends BaseEntity {
  name: string;
  description?: string;
  type: "room" | "equipment" | "service";
  price: number;
  capacity?: number;
  isActive: boolean;
  images?: string[];
}

// Statistics types
export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  pendingBookings: number;
  revenueGrowth: number;
  bookingsGrowth: number;
}

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
  revenue: number;
}
