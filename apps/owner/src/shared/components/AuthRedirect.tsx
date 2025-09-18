"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@shared/state/auth.store";

interface AuthRedirectProps {
  children: React.ReactNode;
}

export function AuthRedirect({ children }: AuthRedirectProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    // Don't redirect while loading
    if (isLoading) return;

    const redirectUrl = searchParams.get("redirect");
    
    if (isAuthenticated && redirectUrl) {
      // User is authenticated and has a redirect URL, navigate to it
      router.replace(redirectUrl);
    } else if (isAuthenticated && !redirectUrl) {
      // User is authenticated but no redirect URL, go to dashboard
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, searchParams, router]);

  return <>{children}</>;
}
