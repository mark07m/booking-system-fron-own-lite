import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { API_BASE_URL } from "@/src/shared/config/constants";
import { ApiResponse, ApiError } from "@/src/shared/types/api.types";

// Create axios instance with base configuration
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: true, // Include cookies in requests
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Add auth token if available (for client-side requests)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
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
    
    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Attempt to refresh token
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });
          
          const { token, refreshToken: newRefreshToken } = refreshResponse.data;
          
          // Update tokens
          localStorage.setItem("auth_token", token);
          localStorage.setItem("refresh_token", newRefreshToken);
          
          // Retry original request with new token
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          };
          
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        console.error("Token refresh failed:", refreshError);
        handleAuthFailure();
        return Promise.reject(refreshError);
      }
    }
    
    // Handle other errors
    if (error.response?.status >= 500) {
      console.error("Server error:", error.response.status, error.response.data);
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
    // Clear auth data
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    
    // Redirect to login
    window.location.href = "/login";
  }
}

// Export configured axios instance
export default apiClient;
