"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/src/shared/api/auth.client";
import { useAuthStore } from "@/src/shared/state/auth.store";

export function useAuth() {
  const { user, isAuthenticated, setUser, setLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const initAuth = async () => {
      if (authClient.isAuthenticated() && !user) {
        setLoading(true);
        try {
          const currentUser = await authClient.getCurrentUser();
          setUser(currentUser);
        } catch (error) {
          console.error("Auth initialization error:", error);
          authClient.logout();
        } finally {
          setLoading(false);
        }
      }
    };

    initAuth();
  }, [user, setUser, setLoading]);

  const requireAuth = (redirectTo: string = "/login") => {
    if (!isAuthenticated) {
      router.push(redirectTo);
      return false;
    }
    return true;
  };

  const requireGuest = (redirectTo: string = "/dashboard") => {
    if (isAuthenticated) {
      router.push(redirectTo);
      return false;
    }
    return true;
  };

  return {
    user,
    isAuthenticated,
    requireAuth,
    requireGuest,
  };
}
