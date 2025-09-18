import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { API_BASE_URL } from "@shared/config/constants";
import { ApiResponse, ApiError } from "@shared/types/api.types";
import { ClientCookieManager } from "@shared/utils/cookies";

// Create axios instance with base configuration
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true, // Include httpOnly cookies in requests
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Add CSRF token for state-changing requests
    if (typeof window !== "undefined" && ["POST", "PUT", "PATCH", "DELETE"].includes(config.method?.toUpperCase() || "")) {
      const csrfToken = ClientCookieManager.getCookie("csrf_token");
      if (csrfToken) {
        config.headers = {
          ...config.headers,
          "X-CSRF-Token": csrfToken,
        };
      }
    }
    
    // Add request ID for tracking
    config.headers = {
      ...config.headers,
      "X-Request-ID": generateRequestId(),
    };
    
    return config;
  },
  (error: AxiosError) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful requests in development
    if (process.env.NODE_ENV === "development") {
      console.log(`✅ ${response.config.method?.toUpperCase()} ${response.config.url} - ${response.status}`);
    }
    
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 Unauthorized - token refresh is now handled by httpOnly cookies
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token using httpOnly cookies
        const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
          withCredentials: true, // Include httpOnly cookies
        });
        
        // If refresh successful, retry original request
        if (refreshResponse.status === 200) {
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        console.error("Token refresh failed:", refreshError);
        handleAuthFailure();
        return Promise.reject(refreshError);
      }
    }
    
    // Handle 403 Forbidden - CSRF token might be invalid
    if (error.response?.status === 403) {
      console.error("CSRF token validation failed or insufficient permissions");
      // Could implement CSRF token refresh here
    }
    
    // Handle 429 Too Many Requests - Rate limiting
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers["retry-after"];
      console.warn(`Rate limited. Retry after ${retryAfter} seconds`);
    }
    
    // Handle 5xx Server Errors
    if (error.response?.status >= 500) {
      console.error("Server error:", error.response.status, error.response.data);
      
      // Log error details for monitoring
      if (process.env.NODE_ENV === "development") {
        console.error("Error details:", {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response.status,
          data: error.response.data,
        });
      }
    } else if (error.response?.status >= 400) {
      console.error("Client error:", error.response.status, error.response.data);
    }
    
    // Transform error to our ApiError format
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || "An error occurred",
      code: error.response?.data?.code || error.code,
      details: error.response?.data?.details || error.response?.data,
      status: error.response?.status,
    };
    
    return Promise.reject(apiError);
  }
);

// Helper function to generate request ID
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// Helper function to handle authentication failure
function handleAuthFailure(): void {
  if (typeof window !== "undefined") {
    // Clear any client-side auth data
    ClientCookieManager.deleteCookie("csrf_token");
    
    // Redirect to login
    window.location.href = "/login";
  }
}

// Export configured axios instance
export default apiClient;
