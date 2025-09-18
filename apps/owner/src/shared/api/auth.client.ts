import { apiClient } from "./axios";
import { API_ENDPOINTS } from "./endpoints";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  User,
  ApiResponse,
} from "@/src/shared/types/api.types";

export const authClient = {
  // Login
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data.data;
  },

  // Register
  async register(userData: RegisterRequest): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    return response.data.data;
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_data");
      }
    }
  },

  // Refresh token
  async refreshToken(): Promise<LoginResponse> {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );
    return response.data.data;
  },

  // Get current user
  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME);
    return response.data.data;
  },

  // Forgot password
  async forgotPassword(data: ForgotPasswordRequest): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data);
  },

  // Reset password
  async resetPassword(data: ResetPasswordRequest): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, data);
  },

  // Change password
  async changePassword(data: ChangePasswordRequest): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  },

  // Verify email
  async verifyEmail(token: string): Promise<void> {
    await apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token });
  },

  // Utility functions
  isAuthenticated(): boolean {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem("auth_token");
  },

  getToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("auth_token");
  },

  getRefreshToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("refresh_token");
  },

  // Store auth data
  storeAuthData(authData: LoginResponse): void {
    if (typeof window === "undefined") return;
    
    localStorage.setItem("auth_token", authData.token);
    localStorage.setItem("refresh_token", authData.refreshToken);
    localStorage.setItem("user_data", JSON.stringify(authData.user));
  },

  // Get stored user data
  getStoredUserData(): User | null {
    if (typeof window === "undefined") return null;
    
    const userData = localStorage.getItem("user_data");
    return userData ? JSON.parse(userData) : null;
  },

  // Clear all auth data
  clearAuthData(): void {
    if (typeof window === "undefined") return;
    
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");
  },

  // Check if token is expired
  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error("Error parsing token:", error);
      return true;
    }
  },

  // Get token expiration time
  getTokenExpiration(): Date | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return new Date(payload.exp * 1000);
    } catch (error) {
      console.error("Error parsing token expiration:", error);
      return null;
    }
  },
};
