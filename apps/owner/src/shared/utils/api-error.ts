import { ApiError } from "@shared/types/api.types";

/**
 * Utility functions for handling API errors
 */

export class APIError extends Error {
  public readonly code?: string;
  public readonly status?: number;
  public readonly details?: Record<string, any>;
  public readonly timestamp?: string;
  public readonly path?: string;

  constructor(error: ApiError) {
    super(error.message);
    this.name = "APIError";
    this.code = error.code;
    this.status = error.status;
    this.details = error.details;
    this.timestamp = error.timestamp;
    this.path = error.path;
  }

  // Check if error is a specific type
  isValidationError(): boolean {
    return this.status === 400 || this.code === "VALIDATION_ERROR";
  }

  isUnauthorizedError(): boolean {
    return this.status === 401 || this.code === "UNAUTHORIZED";
  }

  isForbiddenError(): boolean {
    return this.status === 403 || this.code === "FORBIDDEN";
  }

  isNotFoundError(): boolean {
    return this.status === 404 || this.code === "NOT_FOUND";
  }

  isConflictError(): boolean {
    return this.status === 409 || this.code === "CONFLICT";
  }

  isServerError(): boolean {
    return this.status ? this.status >= 500 : false;
  }

  // Get user-friendly error message
  getUserMessage(): string {
    if (this.isValidationError()) {
      return "Проверьте введенные данные и попробуйте снова";
    }

    if (this.isUnauthorizedError()) {
      return "Необходимо войти в систему";
    }

    if (this.isForbiddenError()) {
      return "У вас нет прав для выполнения этого действия";
    }

    if (this.isNotFoundError()) {
      return "Запрашиваемый ресурс не найден";
    }

    if (this.isConflictError()) {
      return "Конфликт данных. Возможно, ресурс уже был изменен";
    }

    if (this.isServerError()) {
      return "Внутренняя ошибка сервера. Попробуйте позже";
    }

    return this.message || "Произошла неизвестная ошибка";
  }

  // Get validation errors for form fields
  getValidationErrors(): Record<string, string[]> {
    if (!this.isValidationError() || !this.details) {
      return {};
    }

    const errors: Record<string, string[]> = {};
    
    if (this.details.errors && Array.isArray(this.details.errors)) {
      this.details.errors.forEach((error: any) => {
        if (error.field && error.message) {
          if (!errors[error.field]) {
            errors[error.field] = [];
          }
          errors[error.field].push(error.message);
        }
      });
    }

    return errors;
  }

  // Log error for debugging
  logError(): void {
    console.error("API Error:", {
      message: this.message,
      code: this.code,
      status: this.status,
      details: this.details,
      timestamp: this.timestamp,
      path: this.path,
    });
  }
}

// Helper function to create API error from any error
export function createAPIError(error: any): APIError {
  if (error instanceof APIError) {
    return error;
  }

  if (error.response?.data) {
    return new APIError({
      message: error.response.data.message || error.message || "An error occurred",
      code: error.response.data.code,
      status: error.response.status,
      details: error.response.data.details || error.response.data,
      timestamp: error.response.data.timestamp,
      path: error.response.data.path,
    });
  }

  if (error.message) {
    return new APIError({
      message: error.message,
      code: error.code,
      status: error.status,
    });
  }

  return new APIError({
    message: "An unknown error occurred",
    code: "UNKNOWN_ERROR",
  });
}

// Helper function to check if error is retryable
export function isRetryableError(error: APIError): boolean {
  // Retry on server errors (5xx) or network errors
  return error.isServerError() || !error.status;
}

// Helper function to get retry delay
export function getRetryDelay(attempt: number, baseDelay: number = 1000): number {
  // Exponential backoff with jitter
  const delay = baseDelay * Math.pow(2, attempt - 1);
  const jitter = Math.random() * 0.1 * delay;
  return Math.min(delay + jitter, 10000); // Max 10 seconds
}
