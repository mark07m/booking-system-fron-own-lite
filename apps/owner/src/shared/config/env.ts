import { z } from "zod";

// Public environment variables (available on client-side)
const publicEnvSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url("NEXT_PUBLIC_API_BASE_URL must be a valid URL"),
  NEXT_PUBLIC_APP_NAME: z.string().min(1, "NEXT_PUBLIC_APP_NAME is required"),
  NEXT_PUBLIC_APP_URL: z.string().url("NEXT_PUBLIC_APP_URL must be a valid URL"),
  NEXT_PUBLIC_APP_VERSION: z.string().optional().default("1.0.0"),
  NEXT_PUBLIC_ENVIRONMENT: z.enum(["development", "staging", "production"]).default("development"),
});

// Server-only environment variables (not available on client-side)
const serverEnvSchema = z.object({
  // Database
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid database URL"),
  
  // Authentication
  AUTH_COOKIE_NAME: z.string().min(1, "AUTH_COOKIE_NAME is required"),
  AUTH_SECRET: z.string().min(32, "AUTH_SECRET must be at least 32 characters"),
  AUTH_URL: z.string().url("AUTH_URL must be a valid URL"),
  
  // External Services
  STRIPE_PUBLIC_KEY: z.string().optional(),
  STRIPE_SECRET_KEY: z.string().optional(),
  STRIPE_WEBHOOK_SECRET: z.string().optional(),
  
  // Email
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.string().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  
  // Redis
  REDIS_URL: z.string().url().optional(),
  
  // File Storage
  UPLOAD_DIR: z.string().optional().default("./uploads"),
  MAX_FILE_SIZE: z.string().optional().default("10485760"), // 10MB
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: z.string().optional().default("900000"), // 15 minutes
  RATE_LIMIT_MAX_REQUESTS: z.string().optional().default("100"),
});

// Combined schema for validation
const envSchema = publicEnvSchema.merge(serverEnvSchema);

// Parse and validate environment variables
function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors
        .filter((err) => err.code === "invalid_type" && err.received === "undefined")
        .map((err) => err.path.join("."));
      
      const invalidVars = error.errors
        .filter((err) => err.code !== "invalid_type" || err.received !== "undefined")
        .map((err) => `${err.path.join(".")}: ${err.message}`);
      
      console.error("❌ Environment validation failed:");
      
      if (missingVars.length > 0) {
        console.error("Missing required variables:");
        missingVars.forEach((varName) => {
          console.error(`  - ${varName}`);
        });
      }
      
      if (invalidVars.length > 0) {
        console.error("Invalid variables:");
        invalidVars.forEach((varError) => {
          console.error(`  - ${varError}`);
        });
      }
      
      console.error("\n💡 Make sure to:");
      console.error("  1. Copy .env.example to .env.local");
      console.error("  2. Fill in all required variables");
      console.error("  3. Check variable formats (URLs, lengths, etc.)");
      
      process.exit(1);
    }
    throw error;
  }
}

// Export validated environment variables
export const env = validateEnv();

// Export public variables separately for client-side use
export const publicEnv = publicEnvSchema.parse(process.env);

// Export types
export type Env = z.infer<typeof envSchema>;
export type PublicEnv = z.infer<typeof publicEnvSchema>;
export type ServerEnv = z.infer<typeof serverEnvSchema>;
