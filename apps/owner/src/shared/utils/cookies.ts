import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// Cookie configuration
export const COOKIE_CONFIG = {
  AUTH_TOKEN: "auth_token",
  REFRESH_TOKEN: "refresh_token",
  MAX_AGE: 60 * 60 * 24 * 7, // 7 days
  REFRESH_MAX_AGE: 60 * 60 * 24 * 30, // 30 days
  SECURE: process.env.NODE_ENV === "production",
  SAME_SITE: "strict" as const,
  HTTP_ONLY: true,
  PATH: "/",
} as const;

// Server-side cookie utilities
export class ServerCookieManager {
  static setAuthToken(token: string, response: NextResponse): void {
    response.cookies.set(COOKIE_CONFIG.AUTH_TOKEN, token, {
      maxAge: COOKIE_CONFIG.MAX_AGE,
      httpOnly: COOKIE_CONFIG.HTTP_ONLY,
      secure: COOKIE_CONFIG.SECURE,
      sameSite: COOKIE_CONFIG.SAME_SITE,
      path: COOKIE_CONFIG.PATH,
    });
  }

  static setRefreshToken(token: string, response: NextResponse): void {
    response.cookies.set(COOKIE_CONFIG.REFRESH_TOKEN, token, {
      maxAge: COOKIE_CONFIG.REFRESH_MAX_AGE,
      httpOnly: COOKIE_CONFIG.HTTP_ONLY,
      secure: COOKIE_CONFIG.SECURE,
      sameSite: COOKIE_CONFIG.SAME_SITE,
      path: COOKIE_CONFIG.PATH,
    });
  }

  static getAuthToken(request: NextRequest): string | null {
    return request.cookies.get(COOKIE_CONFIG.AUTH_TOKEN)?.value || null;
  }

  static getRefreshToken(request: NextRequest): string | null {
    return request.cookies.get(COOKIE_CONFIG.REFRESH_TOKEN)?.value || null;
  }

  static clearAuthTokens(response: NextResponse): void {
    response.cookies.set(COOKIE_CONFIG.AUTH_TOKEN, "", {
      maxAge: 0,
      httpOnly: COOKIE_CONFIG.HTTP_ONLY,
      secure: COOKIE_CONFIG.SECURE,
      sameSite: COOKIE_CONFIG.SAME_SITE,
      path: COOKIE_CONFIG.PATH,
    });

    response.cookies.set(COOKIE_CONFIG.REFRESH_TOKEN, "", {
      maxAge: 0,
      httpOnly: COOKIE_CONFIG.HTTP_ONLY,
      secure: COOKIE_CONFIG.SECURE,
      sameSite: COOKIE_CONFIG.SAME_SITE,
      path: COOKIE_CONFIG.PATH,
    });
  }

  // For App Router server components
  static async getAuthTokenFromCookies(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_CONFIG.AUTH_TOKEN)?.value || null;
  }

  static async getRefreshTokenFromCookies(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(COOKIE_CONFIG.REFRESH_TOKEN)?.value || null;
  }
}

// Client-side utilities for non-sensitive data
export class ClientCookieManager {
  static setCookie(name: string, value: string, days: number = 7): void {
    if (typeof window === "undefined") return;

    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;samesite=strict${
      process.env.NODE_ENV === "production" ? ";secure" : ""
    }`;
  }

  static getCookie(name: string): string | null {
    if (typeof window === "undefined") return null;

    const nameEQ = name + "=";
    const ca = document.cookie.split(";");

    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }

    return null;
  }

  static deleteCookie(name: string): void {
    if (typeof window === "undefined") return;

    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;samesite=strict${
      process.env.NODE_ENV === "production" ? ";secure" : ""
    }`;
  }
}

// Cookie validation utilities
export function validateCookieValue(value: string): boolean {
  // Basic validation for cookie values
  return value.length > 0 && value.length < 4096 && !/[;,\s]/.test(value);
}

// CSRF protection utilities
export function generateCSRFToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function validateCSRFToken(token: string, expectedToken: string): boolean {
  return token === expectedToken && token.length === 64;
}
