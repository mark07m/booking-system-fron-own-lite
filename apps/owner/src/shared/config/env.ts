import { z } from "zod";

/** Public ENV (клиент) */
const publicEnvSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url().optional().default("http://localhost:3001/api"),
  NEXT_PUBLIC_APP_NAME: z.string().min(1).optional().default("Booking System Owner"),
  NEXT_PUBLIC_APP_URL: z.string().url().optional().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_VERSION: z.string().optional().default("1.0.0"),
  NEXT_PUBLIC_ENVIRONMENT: z.enum(["development", "staging", "production"]).default("development"),
});

/** Server-only ENV (парсим ТОЛЬКО по запросу на сервере) */
const serverEnvSchema = z.object({
  DATABASE_URL: z.string().url().optional().default("postgresql://user:password@localhost:5432/booking_system"),
  AUTH_COOKIE_NAME: z.string().min(1).optional().default("booking-auth"),
  AUTH_SECRET: z.string().min(32).optional().default("your-super-secret-key-that-is-at-least-32-characters-long"),
  AUTH_URL: z.string().url().optional().default("http://localhost:3000"),
  STRIPE_PUBLIC_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  REDIS_URL: z.string().url().optional(),
  UPLOAD_DIR: z.string().optional().default("./uploads"),
  MAX_FILE_SIZE: z.string().optional().default("10485760"),
  RATE_LIMIT_WINDOW_MS: z.string().optional().default("900000"),
  RATE_LIMIT_MAX_REQUESTS: z.string().optional().default("100"),
});

// Safe parsing with fallback to defaults
let publicEnv: z.infer<typeof publicEnvSchema>;
try {
  publicEnv = publicEnvSchema.parse(process.env);
} catch (error) {
  console.warn("Failed to parse environment variables, using defaults:", error);
  publicEnv = publicEnvSchema.parse({});
}

export { publicEnv };

/** ВАЖНО: серверные env парсим только при явном вызове на сервере */
export function getServerEnv() {
  return serverEnvSchema.parse(process.env);
}

export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;