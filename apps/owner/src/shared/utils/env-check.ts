import { env, publicEnv } from "@/src/shared/config/env";

/**
 * Utility functions for environment variable validation and checking
 */

// Check if we're running in development
export const isDevelopment = publicEnv.NEXT_PUBLIC_ENVIRONMENT === "development";

// Check if we're running in production
export const isProduction = publicEnv.NEXT_PUBLIC_ENVIRONMENT === "production";

// Check if we're running in staging
export const isStaging = publicEnv.NEXT_PUBLIC_ENVIRONMENT === "staging";

// Get environment-specific configuration
export const getEnvironmentConfig = () => {
  const baseConfig = {
    appName: publicEnv.NEXT_PUBLIC_APP_NAME,
    appVersion: publicEnv.NEXT_PUBLIC_APP_VERSION,
    apiBaseUrl: publicEnv.NEXT_PUBLIC_API_BASE_URL,
    appUrl: publicEnv.NEXT_PUBLIC_APP_URL,
  };

  if (isDevelopment) {
    return {
      ...baseConfig,
      debug: true,
      logLevel: "debug" as const,
    };
  }

  if (isStaging) {
    return {
      ...baseConfig,
      debug: false,
      logLevel: "info" as const,
    };
  }

  if (isProduction) {
    return {
      ...baseConfig,
      debug: false,
      logLevel: "error" as const,
    };
  }

  return baseConfig;
};

// Validate required environment variables at runtime
export const validateRequiredEnv = () => {
  const requiredVars = [
    "NEXT_PUBLIC_API_BASE_URL",
    "NEXT_PUBLIC_APP_NAME",
    "NEXT_PUBLIC_APP_URL",
    "DATABASE_URL",
    "AUTH_COOKIE_NAME",
    "AUTH_SECRET",
    "AUTH_URL",
  ];

  const missingVars = requiredVars.filter((varName) => {
    const value = process.env[varName];
    return !value || value.trim() === "";
  });

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
};

// Get database configuration
export const getDatabaseConfig = () => {
  return {
    url: env.DATABASE_URL,
    // Parse additional database options from URL if needed
    ssl: env.DATABASE_URL.includes("sslmode=require"),
  };
};

// Get authentication configuration
export const getAuthConfig = () => {
  return {
    cookieName: env.AUTH_COOKIE_NAME,
    secret: env.AUTH_SECRET,
    url: env.AUTH_URL,
  };
};

// Get external services configuration
export const getExternalServicesConfig = () => {
  return {
    stripe: {
      publicKey: env.STRIPE_PUBLIC_KEY,
      secretKey: env.STRIPE_SECRET_KEY,
      webhookSecret: env.STRIPE_WEBHOOK_SECRET,
    },
    email: {
      host: env.SMTP_HOST,
      port: env.SMTP_PORT ? parseInt(env.SMTP_PORT) : undefined,
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    redis: {
      url: env.REDIS_URL,
    },
  };
};

// Get file storage configuration
export const getFileStorageConfig = () => {
  return {
    uploadDir: env.UPLOAD_DIR,
    maxFileSize: parseInt(env.MAX_FILE_SIZE),
  };
};

// Get rate limiting configuration
export const getRateLimitConfig = () => {
  return {
    windowMs: parseInt(env.RATE_LIMIT_WINDOW_MS),
    maxRequests: parseInt(env.RATE_LIMIT_MAX_REQUESTS),
  };
};
