// Common API response wrapper
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  meta?: {
    requestId?: string;
    timestamp?: string;
    version?: string;
  };
}

// Pagination
export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Error response
export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, any>;
  status?: number;
  timestamp?: string;
  path?: string;
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
  lastLoginAt?: string;
  emailVerified: boolean;
  phone?: string;
  timezone?: string;
  language?: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  role: "admin" | "manager" | "user";
  phone?: string;
  timezone?: string;
  language?: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: "admin" | "manager" | "user";
  isActive?: boolean;
  phone?: string;
  timezone?: string;
  language?: string;
}

// Authentication types
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

export interface RegisterRequest {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  timezone?: string;
  language?: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Booking types
export interface Booking extends BaseEntity {
  userId: string;
  resourceId: string;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "cancelled" | "completed" | "no_show";
  totalPrice: number;
  notes?: string;
  specialRequests?: string;
  paymentStatus: "pending" | "paid" | "refunded" | "failed";
  paymentMethod?: string;
  paymentId?: string;
  user?: User;
  resource?: Resource;
  client?: Client;
}

export interface CreateBookingRequest {
  resourceId: string;
  startDate: string;
  endDate: string;
  notes?: string;
  specialRequests?: string;
  clientId?: string;
}

export interface UpdateBookingRequest {
  startDate?: string;
  endDate?: string;
  status?: Booking["status"];
  notes?: string;
  specialRequests?: string;
}

export interface BookingFilters extends PaginationParams {
  status?: Booking["status"];
  resourceId?: string;
  userId?: string;
  clientId?: string;
  startDate?: string;
  endDate?: string;
  paymentStatus?: Booking["paymentStatus"];
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
  category?: string;
  features?: string[];
  location?: string;
  rules?: string[];
  availability?: ResourceAvailability[];
}

export interface ResourceAvailability {
  id: string;
  resourceId: string;
  startTime: string;
  endTime: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  isAvailable: boolean;
  price?: number;
}

export interface CreateResourceRequest {
  name: string;
  description?: string;
  type: Resource["type"];
  price: number;
  capacity?: number;
  category?: string;
  features?: string[];
  location?: string;
  rules?: string[];
}

export interface UpdateResourceRequest {
  name?: string;
  description?: string;
  type?: Resource["type"];
  price?: number;
  capacity?: number;
  isActive?: boolean;
  category?: string;
  features?: string[];
  location?: string;
  rules?: string[];
}

// Client types
export interface Client extends BaseEntity {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  isActive: boolean;
  totalBookings: number;
  totalSpent: number;
  lastBookingAt?: string;
  tags?: string[];
  address?: ClientAddress;
}

export interface ClientAddress {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

export interface CreateClientRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  tags?: string[];
  address?: ClientAddress;
}

export interface UpdateClientRequest {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  notes?: string;
  isActive?: boolean;
  tags?: string[];
  address?: ClientAddress;
}

export interface ClientNote extends BaseEntity {
  clientId: string;
  content: string;
  authorId: string;
  author?: User;
}

// Statistics types
export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
  pendingBookings: number;
  revenueGrowth: number;
  bookingsGrowth: number;
  averageBookingValue: number;
  occupancyRate: number;
  topResources: Array<{
    id: string;
    name: string;
    bookings: number;
    revenue: number;
  }>;
  recentBookings: Booking[];
}

export interface BookingStats {
  total: number;
  pending: number;
  confirmed: number;
  cancelled: number;
  completed: number;
  no_show: number;
  revenue: number;
  averageValue: number;
  growth: {
    bookings: number;
    revenue: number;
  };
}

export interface RevenueStats {
  total: number;
  monthly: Array<{
    month: string;
    revenue: number;
    bookings: number;
  }>;
  growth: number;
  averagePerBooking: number;
}

// File types
export interface FileUpload {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedAt: string;
  uploadedBy: string;
}

export interface FileUploadRequest {
  file: File;
  category?: string;
  description?: string;
}

// Notification types
export interface Notification extends BaseEntity {
  userId: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  isRead: boolean;
  readAt?: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

export interface CreateNotificationRequest {
  userId: string;
  title: string;
  message: string;
  type: Notification["type"];
  actionUrl?: string;
  metadata?: Record<string, any>;
}

// Settings types
export interface AppSettings {
  general: {
    appName: string;
    appUrl: string;
    timezone: string;
    language: string;
    currency: string;
  };
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
    bookingConfirmations: boolean;
    bookingReminders: boolean;
    paymentNotifications: boolean;
  };
  payments: {
    stripePublicKey?: string;
    stripeSecretKey?: string;
    stripeWebhookSecret?: string;
    currency: string;
    taxRate: number;
  };
  integrations: {
    googleCalendar: boolean;
    outlookCalendar: boolean;
    slack: boolean;
    webhooks: string[];
  };
}

// System types
export interface SystemHealth {
  status: "healthy" | "degraded" | "unhealthy";
  timestamp: string;
  services: {
    database: "up" | "down";
    redis: "up" | "down";
    email: "up" | "down";
    storage: "up" | "down";
  };
  metrics: {
    uptime: number;
    memoryUsage: number;
    cpuUsage: number;
    diskUsage: number;
  };
}

export interface SystemVersion {
  version: string;
  build: string;
  commit: string;
  environment: string;
  nodeVersion: string;
  dependencies: Record<string, string>;
}
