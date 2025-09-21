import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { generateCSRFToken, validateCSRFToken } from "@/shared/utils/cookies.server";

// Define public routes that don't require authentication
const publicRoutes = [
  "/login",
  "/register", 
  "/forgot-password",
  "/reset-password",
  "/verify-email",
];

// Define protected routes that require authentication
const protectedRoutes = [
  "/dashboard",
  "/bookings",
  "/clients", 
  "/resources",
  "/analytics",
  "/documents",
  "/notifications",
  "/help",
  "/settings",
  "/profile",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  
  // CSRF protection for state-changing requests
  if (["POST", "PUT", "PATCH", "DELETE"].includes(request.method)) {
    const csrfToken = request.headers.get("X-CSRF-Token");
    const expectedToken = request.cookies.get("csrf_token")?.value;
    
    if (!csrfToken || !expectedToken || !validateCSRFToken(csrfToken, expectedToken)) {
      return new NextResponse("CSRF token validation failed", { status: 403 });
    }
  }
  
  // Generate CSRF token for GET requests (if not exists)
  if (request.method === "GET" && !request.cookies.get("csrf_token")) {
    const csrfToken = generateCSRFToken();
    response.cookies.set("csrf_token", csrfToken, {
      maxAge: 60 * 60 * 24, // 24 hours
      httpOnly: false, // Client needs access for X-CSRF-Token header
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
  }
  
  // Rate limiting - only apply to API routes and dynamic pages
  const isApiRoute = pathname.startsWith('/api/');
  const isDynamicPage = !pathname.includes('.') && !pathname.startsWith('/_next/');
  
  if (isApiRoute || isDynamicPage) {
    const ip = request.ip || request.headers.get("x-forwarded-for") || "unknown";
    const rateLimitKey = `rate_limit_${ip}`;
    
    // Get current count and timestamp
    const rateLimitData = request.cookies.get(rateLimitKey)?.value;
    const now = Date.now();
    const windowMs = 15 * 60 * 1000; // 15 minutes
    const maxRequests = 50; // Reduced from 100 to 50 for API/dynamic routes only
    
    let count = 0;
    let windowStart = now;
    
    if (rateLimitData) {
      try {
        const [countStr, windowStartStr] = rateLimitData.split(':');
        count = parseInt(countStr, 10) || 0;
        windowStart = parseInt(windowStartStr, 10) || now;
        
        // Reset if window has expired
        if (now - windowStart > windowMs) {
          count = 0;
          windowStart = now;
        }
      } catch (error) {
        // Invalid data, reset
        count = 0;
        windowStart = now;
      }
    }
    
    if (count >= maxRequests) {
      const retryAfter = Math.ceil((windowMs - (now - windowStart)) / 1000);
      return new NextResponse("Rate limit exceeded", { 
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
          "X-RateLimit-Limit": maxRequests.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(windowStart + windowMs).toISOString(),
        },
      });
    }
    
    // Increment rate limit counter
    const newCount = count + 1;
    response.cookies.set(rateLimitKey, `${newCount}:${windowStart}`, {
      maxAge: Math.ceil(windowMs / 1000), // Convert to seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    
    // Add rate limit headers
    response.headers.set("X-RateLimit-Limit", maxRequests.toString());
    response.headers.set("X-RateLimit-Remaining", (maxRequests - newCount).toString());
    response.headers.set("X-RateLimit-Reset", new Date(windowStart + windowMs).toISOString());
  }
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Get auth token from httpOnly cookies
  const authToken = request.cookies.get("auth_token")?.value;
  const isAuthenticated = !!authToken;

  // If accessing a protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to login page
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If accessing a public route while authenticated
  if (isPublicRoute && isAuthenticated) {
    // Get redirect URL from query params or default to dashboard
    const redirectUrl = request.nextUrl.searchParams.get("redirect") || "/dashboard";
    return NextResponse.redirect(new URL(redirectUrl, request.url));
  }

  // If accessing root path, redirect to dashboard if authenticated, otherwise to login
  if (pathname === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Allow the request to proceed
  return response;
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
