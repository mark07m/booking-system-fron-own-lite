export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    REGISTER: "/auth/register",
    FORGOT_PASSWORD: "/auth/forgot-password",
    RESET_PASSWORD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
    CHANGE_PASSWORD: "/auth/change-password",
  },
  
  // Users
  USERS: {
    LIST: "/users",
    CREATE: "/users",
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    PROFILE: "/users/profile",
    UPDATE_PROFILE: "/users/profile",
    UPLOAD_AVATAR: "/users/avatar",
    CHANGE_ROLE: (id: string) => `/users/${id}/role`,
    ACTIVATE: (id: string) => `/users/${id}/activate`,
    DEACTIVATE: (id: string) => `/users/${id}/deactivate`,
  },
  
  // Bookings
  BOOKINGS: {
    LIST: "/bookings",
    CREATE: "/bookings",
    GET: (id: string) => `/bookings/${id}`,
    UPDATE: (id: string) => `/bookings/${id}`,
    DELETE: (id: string) => `/bookings/${id}`,
    CONFIRM: (id: string) => `/bookings/${id}/confirm`,
    CANCEL: (id: string) => `/bookings/${id}/cancel`,
    COMPLETE: (id: string) => `/bookings/${id}/complete`,
    RESCHEDULE: (id: string) => `/bookings/${id}/reschedule`,
    PAYMENT: (id: string) => `/bookings/${id}/payment`,
    REFUND: (id: string) => `/bookings/${id}/refund`,
    EXPORT: "/bookings/export",
    BULK_UPDATE: "/bookings/bulk-update",
  },
  
  // Resources
  RESOURCES: {
    LIST: "/resources",
    CREATE: "/resources",
    GET: (id: string) => `/resources/${id}`,
    UPDATE: (id: string) => `/resources/${id}`,
    DELETE: (id: string) => `/resources/${id}`,
    AVAILABILITY: (id: string) => `/resources/${id}/availability`,
    PRICING: (id: string) => `/resources/${id}/pricing`,
    IMAGES: (id: string) => `/resources/${id}/images`,
    UPLOAD_IMAGE: (id: string) => `/resources/${id}/images`,
    DELETE_IMAGE: (id: string, imageId: string) => `/resources/${id}/images/${imageId}`,
    CATEGORIES: "/resources/categories",
  },
  
  // Clients
  CLIENTS: {
    LIST: "/clients",
    CREATE: "/clients",
    GET: (id: string) => `/clients/${id}`,
    UPDATE: (id: string) => `/clients/${id}`,
    DELETE: (id: string) => `/clients/${id}`,
    BOOKINGS: (id: string) => `/clients/${id}/bookings`,
    HISTORY: (id: string) => `/clients/${id}/history`,
    NOTES: (id: string) => `/clients/${id}/notes`,
    ADD_NOTE: (id: string) => `/clients/${id}/notes`,
    UPDATE_NOTE: (id: string, noteId: string) => `/clients/${id}/notes/${noteId}`,
    DELETE_NOTE: (id: string, noteId: string) => `/clients/${id}/notes/${noteId}`,
  },
  
  // Statistics & Analytics
  STATS: {
    DASHBOARD: "/stats/dashboard",
    BOOKINGS: "/stats/bookings",
    REVENUE: "/stats/revenue",
    CLIENTS: "/stats/clients",
    RESOURCES: "/stats/resources",
    EXPORT: "/stats/export",
    REPORTS: "/stats/reports",
  },
  
  // Settings
  SETTINGS: {
    GENERAL: "/settings/general",
    NOTIFICATIONS: "/settings/notifications",
    PAYMENTS: "/settings/payments",
    INTEGRATIONS: "/settings/integrations",
    SECURITY: "/settings/security",
    BACKUP: "/settings/backup",
  },
  
  // Files & Media
  FILES: {
    UPLOAD: "/files/upload",
    DELETE: (id: string) => `/files/${id}`,
    GET: (id: string) => `/files/${id}`,
    LIST: "/files",
    DOWNLOAD: (id: string) => `/files/${id}/download`,
  },
  
  // Notifications
  NOTIFICATIONS: {
    LIST: "/notifications",
    GET: (id: string) => `/notifications/${id}`,
    MARK_READ: (id: string) => `/notifications/${id}/read`,
    MARK_ALL_READ: "/notifications/read-all",
    DELETE: (id: string) => `/notifications/${id}`,
    PREFERENCES: "/notifications/preferences",
  },
  
  // System
  SYSTEM: {
    HEALTH: "/health",
    VERSION: "/version",
    CONFIG: "/config",
    LOGS: "/logs",
    METRICS: "/metrics",
  },
} as const;

// Helper function to build query string
export function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      if (Array.isArray(value)) {
        value.forEach((item) => searchParams.append(key, String(item)));
      } else {
        searchParams.append(key, String(value));
      }
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : "";
}

// Helper function to build endpoint with query params
export function buildEndpoint(
  endpoint: string,
  params?: Record<string, any>
): string {
  return params ? `${endpoint}${buildQueryString(params)}` : endpoint;
}
