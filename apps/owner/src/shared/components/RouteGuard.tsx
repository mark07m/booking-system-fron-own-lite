"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/shared/state/auth.store";

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function RouteGuard({ 
  children, 
  requireAuth = true, 
  redirectTo = "/login" 
}: RouteGuardProps) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      // Wait for auth state to be determined
      if (isLoading) return;

      if (requireAuth && !isAuthenticated) {
        // User needs to be authenticated but isn't
        router.push(redirectTo);
        return;
      }

      if (!requireAuth && isAuthenticated) {
        // User shouldn't be authenticated but is (e.g., on login page)
        router.push("/dashboard");
        return;
      }

      // Auth state is correct, allow access
      setIsChecking(false);
    };

    checkAuth();
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  // Show loading while checking authentication
  if (isChecking || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-sm text-gray-600">Проверка доступа...</p>
        </div>
      </div>
    );
  }

  // If auth requirements are not met, don't render children
  if (requireAuth && !isAuthenticated) {
    return null;
  }

  if (!requireAuth && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
