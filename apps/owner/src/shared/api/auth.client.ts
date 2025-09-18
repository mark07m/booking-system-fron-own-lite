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
} from "@shared/types/api.types";

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

  // Refresh token - now handled by httpOnly cookies
  async refreshToken(): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.REFRESH,
      {} // No body needed, refresh token is in httpOnly cookie
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

  // Utility functions - simplified for httpOnly cookies approach
  isAuthenticated(): boolean {
    // Authentication state is now managed by the server via httpOnly cookies
    // This will be determined by the server response to /auth/me
    return false; // Will be updated by the auth store
  },

  // Store auth data - simplified for httpOnly cookies
  storeAuthData(authData: LoginResponse): void {
    // Only store user data, tokens are handled by httpOnly cookies
    if (typeof window === "undefined") return;
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
    localStorage.removeItem("user_data");
  },
};
