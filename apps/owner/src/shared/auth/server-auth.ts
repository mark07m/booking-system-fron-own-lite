// Server-side authentication utilities for real backend integration

import { NextRequest } from "next/server";
import { ServerCookieManager } from "@shared/utils/cookies.server";
import { publicEnv } from "@shared/config/env";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user" | "manager";
  permissions: string[];
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  user: User;
  token: string;
  expiresAt: Date;
  refreshToken: string;
}

/**
 * Server-side authentication service
 * This will integrate with your real backend API
 */
export class ServerAuthService {
  private static readonly API_BASE_URL = publicEnv.NEXT_PUBLIC_API_BASE_URL;

  /**
   * Verify JWT token with backend
   */
  static async verifyToken(token: string): Promise<User | null> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/auth/verify`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error("Token verification failed:", error);
      return null;
    }
  }

  /**
   * Refresh authentication token
   */
  static async refreshToken(refreshToken: string): Promise<AuthSession | null> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.session;
    } catch (error) {
      console.error("Token refresh failed:", error);
      return null;
    }
  }

  /**
   * Get user permissions
   */
  static async getUserPermissions(userId: string): Promise<string[]> {
    try {
      const response = await fetch(`${this.API_BASE_URL}/users/${userId}/permissions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      return data.permissions;
    } catch (error) {
      console.error("Failed to fetch user permissions:", error);
      return [];
    }
  }

  /**
   * Check if user has specific permission
   */
  static async hasPermission(userId: string, permission: string): Promise<boolean> {
    const permissions = await this.getUserPermissions(userId);
    return permissions.includes(permission);
  }

  /**
   * Check if user has any of the specified roles
   */
  static hasRole(user: User, roles: string[]): boolean {
    return roles.includes(user.role);
  }
}

/**
 * Get authenticated user from request
 */
export async function getAuthenticatedUser(request: NextRequest): Promise<User | null> {
  const token = ServerCookieManager.getAuthToken(request);
  
  if (!token) {
    return null;
  }

  return await ServerAuthService.verifyToken(token);
}

/**
 * Check if user has required permissions
 */
export async function checkPermissions(
  user: User,
  requiredPermissions: string[]
): Promise<boolean> {
  const userPermissions = await ServerAuthService.getUserPermissions(user.id);
  
  return requiredPermissions.every(permission => 
    userPermissions.includes(permission)
  );
}

/**
 * Check if user has required role
 */
export function checkRole(user: User, requiredRoles: string[]): boolean {
  return ServerAuthService.hasRole(user, requiredRoles);
}

/**
 * Get user session with refresh logic
 */
export async function getSession(request: NextRequest): Promise<AuthSession | null> {
  const token = ServerCookieManager.getAuthToken(request);
  const refreshToken = ServerCookieManager.getRefreshToken(request);

  if (!token) {
    return null;
  }

  // Try to verify current token
  const user = await ServerAuthService.verifyToken(token);
  
  if (user) {
    return {
      user,
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      refreshToken: refreshToken || "",
    };
  }

  // If token is invalid, try to refresh
  if (refreshToken) {
    const newSession = await ServerAuthService.refreshToken(refreshToken);
    return newSession;
  }

  return null;
}
