// Performance monitoring and optimization utilities

// Performance metrics collection
export class PerformanceMonitor {
  private static metrics: Map<string, number> = new Map();
  private static observers: PerformanceObserver[] = [];

  static startTiming(label: string): void {
    if (typeof window === "undefined") return;
    this.metrics.set(label, performance.now());
  }

  static endTiming(label: string): number | null {
    if (typeof window === "undefined") return null;
    
    const startTime = this.metrics.get(label);
    if (!startTime) return null;
    
    const duration = performance.now() - startTime;
    this.metrics.delete(label);
    
    // Log in development
    if (process.env.NODE_ENV === "development") {
      console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }

  static measureAsync<T>(
    label: string,
    fn: () => Promise<T>
  ): Promise<T> {
    this.startTiming(label);
    return fn().finally(() => this.endTiming(label));
  }

  static measureSync<T>(
    label: string,
    fn: () => T
  ): T {
    this.startTiming(label);
    const result = fn();
    this.endTiming(label);
    return result;
  }

  // Web Vitals monitoring
  static initWebVitals(): void {
    if (typeof window === "undefined") return;

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log("LCP:", lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
    this.observers.push(lcpObserver);

    // First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        console.log("FID:", entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ["first-input"] });
    this.observers.push(fidObserver);

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((list) => {
      let clsValue = 0;
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      });
      console.log("CLS:", clsValue);
    });
    clsObserver.observe({ entryTypes: ["layout-shift"] });
    this.observers.push(clsObserver);
  }

  static cleanup(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
  }
}

// Bundle size optimization utilities
export class BundleOptimizer {
  // Dynamic imports with error handling
  static async dynamicImport<T>(
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

  // Lazy loading with intersection observer
  static createLazyLoader(
    callback: () => void,
    options: IntersectionObserverInit = {}
  ): IntersectionObserver {
    const defaultOptions: IntersectionObserverInit = {
      rootMargin: "50px",
      threshold: 0.1,
      ...options,
    };

    return new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    }, defaultOptions);
  }

  // Preload critical resources
  static preloadResource(
    href: string,
    as: "script" | "style" | "image" | "font" | "fetch"
  ): void {
    if (typeof window === "undefined") return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;
    
    if (as === "font") {
      link.crossOrigin = "anonymous";
    }
    
    document.head.appendChild(link);
  }

  // Prefetch resources for next page
  static prefetchResource(href: string): void {
    if (typeof window === "undefined") return;

    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = href;
    document.head.appendChild(link);
  }
}

// Memory management utilities
export class MemoryManager {
  private static cleanupFunctions: Set<() => void> = new Set();

  static registerCleanup(cleanupFn: () => void): void {
    this.cleanupFunctions.add(cleanupFn);
  }

  static unregisterCleanup(cleanupFn: () => void): void {
    this.cleanupFunctions.delete(cleanupFn);
  }

  static cleanup(): void {
    this.cleanupFunctions.forEach(cleanupFn => {
      try {
        cleanupFn();
      } catch (error) {
        console.error("Cleanup function failed:", error);
      }
    });
    this.cleanupFunctions.clear();
  }

  // Debounce function calls
  static debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }

  // Throttle function calls
  static throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
  ): (...args: Parameters<T>) => void {
    let inThrottle: boolean;
    
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }
}

// Image optimization utilities
export class ImageOptimizer {
  static generateSrcSet(
    baseUrl: string,
    sizes: number[] = [320, 640, 768, 1024, 1280, 1536]
  ): string {
    return sizes
      .map(size => `${baseUrl}?w=${size}&q=75 ${size}w`)
      .join(", ");
  }

  static getOptimizedImageUrl(
    url: string,
    width: number,
    quality: number = 75
  ): string {
    // This would integrate with your image optimization service
    return `${url}?w=${width}&q=${quality}&f=webp`;
  }

  static createLazyImage(
    src: string,
    alt: string,
    className?: string
  ): HTMLImageElement {
    const img = new Image();
    img.src = src;
    img.alt = alt;
    if (className) img.className = className;
    img.loading = "lazy";
    return img;
  }
}

// Cache management
export class CacheManager {
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>();

  static set(key: string, data: any, ttl: number = 300000): void { // 5 minutes default
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  static get(key: string): any | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > item.ttl) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  static clear(): void {
    this.cache.clear();
  }

  static clearExpired(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl) {
        this.cache.delete(key);
      }
    }
  }
}

// Initialize performance monitoring
if (typeof window !== "undefined") {
  PerformanceMonitor.initWebVitals();
  
  // Cleanup on page unload
  window.addEventListener("beforeunload", () => {
    PerformanceMonitor.cleanup();
    MemoryManager.cleanup();
    CacheManager.clearExpired();
  });
}
