// Client-side cookie utilities

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


