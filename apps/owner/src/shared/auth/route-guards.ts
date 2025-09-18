// Route guards for protecting private routes with real backend integration

import { NextRequest, NextResponse } from "next/server";
import { getSession, checkPermissions, checkRole } from "./server-auth";
import { ServerCookieManager } from "@shared/utils/cookies";

export interface RouteGuardConfig {
  requireAuth?: boolean;
  requiredRoles?: string[];
  requiredPermissions?: string[];
  redirectTo?: string;
  allowUnauthenticated?: boolean;
}

/**
 * Route guard middleware factory
 */
export function createRouteGuard(config: RouteGuardConfig) {
  return async (request: NextRequest): Promise<NextResponse | null> => {
    const { pathname } = request.nextUrl;
    
    // Get user session
    const session = await getSession(request);
    const isAuthenticated = !!session?.user;

    // If authentication is required but user is not authenticated
    if (config.requireAuth && !isAuthenticated) {
      const loginUrl = new URL(config.redirectTo || "/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // If user is authenticated but route doesn't require auth
    if (!config.requireAuth && isAuthenticated && !config.allowUnauthenticated) {
      const redirectUrl = request.nextUrl.searchParams.get("redirect") || "/dashboard";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // If user is authenticated, check additional requirements
    if (isAuthenticated && session?.user) {
      const { user } = session;

      // Check role requirements
      if (config.requiredRoles && config.requiredRoles.length > 0) {
        if (!checkRole(user, config.requiredRoles)) {
          return NextResponse.json(
            { error: "Insufficient role permissions" },
            { status: 403 }
          );
        }
      }

      // Check permission requirements
      if (config.requiredPermissions && config.requiredPermissions.length > 0) {
        const hasPermissions = await checkPermissions(user, config.requiredPermissions);
        if (!hasPermissions) {
          return NextResponse.json(
            { error: "Insufficient permissions" },
            { status: 403 }
          );
        }
      }
    }

    // All checks passed, allow request to proceed
    return null;
  };
}

/**
 * Predefined route guards for common scenarios
 */
export const RouteGuards = {
  // Public routes (no authentication required)
  public: createRouteGuard({
    requireAuth: false,
    allowUnauthenticated: true,
  }),

  // Protected routes (authentication required)
  protected: createRouteGuard({
    requireAuth: true,
    redirectTo: "/login",
  }),

  // Admin only routes
  admin: createRouteGuard({
    requireAuth: true,
    requiredRoles: ["admin"],
    redirectTo: "/login",
  }),

  // Manager and admin routes
  management: createRouteGuard({
    requireAuth: true,
    requiredRoles: ["admin", "manager"],
    redirectTo: "/login",
  }),

  // Routes requiring specific permissions
  withPermissions: (permissions: string[]) => createRouteGuard({
    requireAuth: true,
    requiredPermissions: permissions,
    redirectTo: "/login",
  }),

  // Routes requiring specific roles
  withRoles: (roles: string[]) => createRouteGuard({
    requireAuth: true,
    requiredRoles: roles,
    redirectTo: "/login",
  }),
};

/**
 * Apply route guard to middleware
 */
export async function applyRouteGuard(
  request: NextRequest,
  guard: (req: NextRequest) => Promise<NextResponse | null>
): Promise<NextResponse | null> {
  return await guard(request);
}

/**
 * Check if user can access a specific route
 */
export async function canAccessRoute(
  request: NextRequest,
  config: RouteGuardConfig
): Promise<{ canAccess: boolean; reason?: string }> {
  const guard = createRouteGuard(config);
  const result = await guard(request);
  
  if (result) {
    return { canAccess: false, reason: "Access denied" };
  }
  
  return { canAccess: true };
}

/**
 * Get user's accessible routes based on their permissions
 */
export async function getAccessibleRoutes(userId: string): Promise<string[]> {
  // This would typically fetch from your backend
  // For now, return a mock list
  const baseRoutes = ["/dashboard", "/profile"];
  
  // Add role-based routes
  // This would be dynamic based on user's actual role and permissions
  return baseRoutes;
}
