import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

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
  
  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  );
  
  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Get auth token from cookies
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
  return NextResponse.next();
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
