"use client";

import { useQuery } from "@tanstack/react-query";
import { statsClient } from "@/src/shared/api/stats.client";
import { DashboardStats, BookingStats, RevenueStats } from "@/src/shared/types/api.types";

// Query keys
export const statsKeys = {
  all: ["stats"] as const,
  dashboard: () => [...statsKeys.all, "dashboard"] as const,
  bookings: () => [...statsKeys.all, "bookings"] as const,
  revenue: () => [...statsKeys.all, "revenue"] as const,
};

// Get dashboard stats
export function useDashboardStats() {
  return useQuery({
    queryKey: statsKeys.dashboard(),
    queryFn: () => statsClient.getDashboardStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 5 * 60 * 1000, // Refetch every 5 minutes
  });
}

// Get booking stats
export function useBookingStats() {
  return useQuery({
    queryKey: statsKeys.bookings(),
    queryFn: () => statsClient.getBookingStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

// Get revenue stats
export function useRevenueStats() {
  return useQuery({
    queryKey: statsKeys.revenue(),
    queryFn: () => statsClient.getRevenueStats(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}
