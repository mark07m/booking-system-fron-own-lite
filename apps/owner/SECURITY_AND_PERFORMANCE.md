# Безопасность и производительность

## 🔒 Безопасность

### 1. ENV валидация на старте
- ✅ **Zod схемы** для валидации переменных окружения
- ✅ **Четкие ошибки** с детальными сообщениями
- ✅ **Разделение** на public/server переменные
- ✅ **Скрипт проверки** `scripts/check-env.js`

```typescript
// src/shared/config/env.ts
const envSchema = publicEnvSchema.merge(serverEnvSchema);
export const env = validateEnv(); // Валидация на старте
```

### 2. HttpOnly Cookies для токенов
- ✅ **ServerCookieManager** для серверной работы с cookies
- ✅ **ClientCookieManager** для клиентских данных
- ✅ **CSRF защита** с токенами
- ✅ **Безопасные настройки** (secure, sameSite, httpOnly)

```typescript
// src/shared/utils/cookies.ts
export class ServerCookieManager {
  static setAuthToken(token: string, response: NextResponse): void {
    response.cookies.set(COOKIE_CONFIG.AUTH_TOKEN, token, {
      maxAge: COOKIE_CONFIG.MAX_AGE,
      httpOnly: COOKIE_CONFIG.HTTP_ONLY,
      secure: COOKIE_CONFIG.SECURE,
      sameSite: COOKIE_CONFIG.SAME_SITE,
    });
  }
}
```

### 3. Axios интерцепторы
- ✅ **401/5xx обработка** с автоматическим refresh
- ✅ **CSRF токены** для state-changing запросов
- ✅ **Rate limiting** обработка (429)
- ✅ **Детальное логирование** в development

```typescript
// src/shared/api/axios.ts
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // 401 - автоматический refresh через httpOnly cookies
    // 403 - CSRF validation failed
    // 429 - Rate limiting
    // 5xx - Server errors с детальным логированием
  }
);
```

### 4. Middleware безопасность
- ✅ **Security headers** (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ **CSRF защита** для POST/PUT/PATCH/DELETE
- ✅ **Rate limiting** (100 запросов за 15 минут)
- ✅ **Аутентификация** через httpOnly cookies

```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  
  // CSRF protection
  if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
    // Validate CSRF token
  }
  
  // Rate limiting
  // Authentication checks
}
```

## ⚡ Производительность

### 1. Алиасы импортов
- ✅ **Детерминированные зависимости** через tsconfig.json
- ✅ **Короткие пути** (@shared, @features, @entities, etc.)
- ✅ **Tree shaking** оптимизация

```typescript
// tsconfig.json
"paths": {
  "@shared/*": ["src/shared/*"],
  "@features/*": ["src/features/*"],
  "@entities/*": ["src/entities/*"],
  "@widgets/*": ["src/widgets/*"]
}
```

### 2. SSR/SSG оптимизация
- ✅ **Правильное использование** "use client" директив
- ✅ **App Router** по умолчанию SSR-дружелюбен
- ✅ **Утилиты для SSR** (serverFetch, HydrationManager)
- ✅ **Error boundaries** для SSR

```typescript
// src/shared/utils/ssr.ts
export const serverFetch = cache(async <T>(url: string) => {
  // Server-side data fetching with caching
});

export class HydrationManager {
  static onHydrated(callback: () => void): void {
    // Client-side hydration utilities
  }
}
```

### 3. Next.js конфигурация
- ✅ **Security headers** в next.config.ts
- ✅ **Package imports optimization**
- ✅ **Image optimization** (WebP, AVIF)
- ✅ **Compression** включена

```typescript
// next.config.ts
const nextConfig: NextConfig = {
  async headers() {
    return [{ /* Security headers */ }];
  },
  experimental: {
    optimizePackageImports: ["@tanstack/react-query", "zustand"],
  },
  images: {
    formats: ["image/webp", "image/avif"],
  },
  compress: true,
};
```

### 4. Performance утилиты
- ✅ **PerformanceMonitor** для метрик
- ✅ **BundleOptimizer** для lazy loading
- ✅ **MemoryManager** для управления памятью
- ✅ **CacheManager** для кэширования

```typescript
// src/shared/utils/performance.ts
export class PerformanceMonitor {
  static measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    // Performance measurement
  }
}

export class BundleOptimizer {
  static createLazyLoader(callback: () => void): IntersectionObserver {
    // Lazy loading with intersection observer
  }
}
```

## 📊 Мониторинг

### Web Vitals
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)  
- **CLS** (Cumulative Layout Shift)

### Performance Metrics
- Request timing
- Bundle size optimization
- Memory usage tracking
- Cache hit rates

## 🛡️ Безопасность в продакшене

### Рекомендации
1. **HTTPS только** в production
2. **CSP headers** для XSS защиты
3. **Rate limiting** через Redis
4. **Monitoring** ошибок и производительности
5. **Regular security audits**

### Environment Variables
```bash
# Required
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=Booking System
AUTH_SECRET=your-32-char-secret-key
DATABASE_URL=postgresql://...

# Optional
REDIS_URL=redis://...
STRIPE_SECRET_KEY=sk_...
SMTP_HOST=smtp.example.com
```

## 🚀 Оптимизация производительности

### Рекомендации
1. **Lazy loading** компонентов
2. **Image optimization** (WebP, AVIF)
3. **Bundle splitting** по маршрутам
4. **Caching strategies** (SWR, React Query)
5. **CDN** для статических ресурсов

### Monitoring
- Performance metrics в development
- Web Vitals tracking
- Bundle size analysis
- Memory leak detection
