export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },
  
  // Users
  USERS: {
    LIST: "/users",
    CREATE: "/users",
    GET: (id: string) => `/users/${id}`,
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
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
  },
  
  // Resources
  RESOURCES: {
    LIST: "/resources",
    CREATE: "/resources",
    GET: (id: string) => `/resources/${id}`,
    UPDATE: (id: string) => `/resources/${id}`,
    DELETE: (id: string) => `/resources/${id}`,
  },
  
  // Statistics
  STATS: {
    DASHBOARD: "/stats/dashboard",
    BOOKINGS: "/stats/bookings",
    REVENUE: "/stats/revenue",
  },
} as const;
