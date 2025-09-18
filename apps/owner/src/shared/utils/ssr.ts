// SSR/SSG optimization utilities

import { cache } from "react";

// Server-side data fetching with caching
export const serverFetch = cache(async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json();
});

// Client-side hydration utilities
export class HydrationManager {
  private static isHydrated = false;
  private static hydrationCallbacks: Set<() => void> = new Set();

  static onHydrated(callback: () => void): void {
    if (this.isHydrated) {
      callback();
    } else {
      this.hydrationCallbacks.add(callback);
    }
  }

  static setHydrated(): void {
    this.isHydrated = true;
    this.hydrationCallbacks.forEach(callback => callback());
    this.hydrationCallbacks.clear();
  }

  static isClientHydrated(): boolean {
    return this.isHydrated;
  }
}

// Safe client-side only execution
export function clientOnly<T>(fn: () => T, fallback?: T): T | undefined {
  if (typeof window === "undefined") {
    return fallback;
  }
  return fn();
}

// Safe server-side only execution
export function serverOnly<T>(fn: () => T, fallback?: T): T | undefined {
  if (typeof window !== "undefined") {
    return fallback;
  }
  return fn();
}

// Environment-aware execution
export function envAware<T>(
  clientFn: () => T,
  serverFn: () => T
): T {
  if (typeof window === "undefined") {
    return serverFn();
  }
  return clientFn();
}

// Component hydration utilities
export function useHydration() {
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    setIsHydrated(true);
    HydrationManager.setHydrated();
  }, []);

  return isHydrated;
}

// Safe localStorage access
export function safeLocalStorage() {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }

  return {
    getItem: (key: string) => {
      try {
        return localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    setItem: (key: string, value: string) => {
      try {
        localStorage.setItem(key, value);
      } catch {
        // Ignore localStorage errors
      }
    },
    removeItem: (key: string) => {
      try {
        localStorage.removeItem(key);
      } catch {
        // Ignore localStorage errors
      }
    },
  };
}

// Safe sessionStorage access
export function safeSessionStorage() {
  if (typeof window === "undefined") {
    return {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }

  return {
    getItem: (key: string) => {
      try {
        return sessionStorage.getItem(key);
      } catch {
        return null;
      }
    },
    setItem: (key: string, value: string) => {
      try {
        sessionStorage.setItem(key, value);
      } catch {
        // Ignore sessionStorage errors
      }
    },
    removeItem: (key: string) => {
      try {
        sessionStorage.removeItem(key);
      } catch {
        // Ignore sessionStorage errors
      }
    },
  };
}

// Dynamic imports with SSR support
export async function dynamicImport<T>(
  importFn: () => Promise<T>,
  fallback?: T
): Promise<T | null> {
  try {
    return await importFn();
  } catch (error) {
    console.error("Dynamic import failed:", error);
    return fallback || null;
  }
}

// Lazy component loading
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) {
  return React.lazy(importFn);
}

// Server-side rendering utilities
export class SSRRenderer {
  static async renderToString(component: React.ReactElement): Promise<string> {
    if (typeof window !== "undefined") {
      throw new Error("renderToString should only be called on the server");
    }

    // This would use React's renderToString in a real implementation
    // For now, return a placeholder
    return "<div>Server rendered content</div>";
  }

  static async renderToStaticMarkup(component: React.ReactElement): Promise<string> {
    if (typeof window !== "undefined") {
      throw new Error("renderToStaticMarkup should only be called on the server");
    }

    // This would use React's renderToStaticMarkup in a real implementation
    // For now, return a placeholder
    return "<div>Static content</div>";
  }
}

// Static generation utilities
export class StaticGenerator {
  static async generateStaticParams<T>(
    fetchFn: () => Promise<T[]>,
    paramExtractor: (item: T) => Record<string, string>
  ): Promise<Record<string, string>[]> {
    try {
      const data = await fetchFn();
      return data.map(paramExtractor);
    } catch (error) {
      console.error("Failed to generate static params:", error);
      return [];
    }
  }

  static async generateMetadata<T>(
    fetchFn: () => Promise<T>,
    metadataExtractor: (data: T) => {
      title?: string;
      description?: string;
      [key: string]: any;
    }
  ): Promise<{
    title?: string;
    description?: string;
    [key: string]: any;
  }> {
    try {
      const data = await fetchFn();
      return metadataExtractor(data);
    } catch (error) {
      console.error("Failed to generate metadata:", error);
      return {};
    }
  }
}

// Revalidation utilities
export class Revalidator {
  static async revalidatePath(path: string): Promise<void> {
    // This would integrate with Next.js revalidatePath
    console.log(`Revalidating path: ${path}`);
  }

  static async revalidateTag(tag: string): Promise<void> {
    // This would integrate with Next.js revalidateTag
    console.log(`Revalidating tag: ${tag}`);
  }
}

// Error boundaries for SSR
export class SSRErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("SSR Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong during server-side rendering.</div>;
    }

    return this.props.children;
  }
}

// Import React for type definitions
import React from "react";
