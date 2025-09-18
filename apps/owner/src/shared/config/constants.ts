import { publicEnv } from "./env";

export const API_BASE_URL = publicEnv.NEXT_PUBLIC_API_BASE_URL;

export const APP_CONFIG = {
  name: publicEnv.NEXT_PUBLIC_APP_NAME,
  version: publicEnv.NEXT_PUBLIC_APP_VERSION,
  url: publicEnv.NEXT_PUBLIC_APP_URL,
  environment: publicEnv.NEXT_PUBLIC_ENVIRONMENT,
  description: "Система управления бронированием",
} as const;

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const;

export const DATE_FORMATS = {
  SHORT: "dd.MM.yyyy",
  LONG: "dd MMMM yyyy",
  DATETIME: "dd.MM.yyyy HH:mm",
  TIME: "HH:mm",
} as const;

export const BOOKING_STATUS = {
  PENDING: "pending",
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
} as const;

export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  BOOKINGS: "/bookings",
  CLIENTS: "/clients",
  SETTINGS: "/settings",
} as const;
