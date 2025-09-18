"use client";

import { useAuth } from "@/features/auth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { requireGuest } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to dashboard
    if (requireGuest()) {
      // User is authenticated, redirect to dashboard
      router.push("/dashboard");
    }
  }, [requireGuest, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
