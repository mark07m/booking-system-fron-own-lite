"use client";

import { useQuery } from "@tanstack/react-query";
import { statsClient } from "@shared/api/stats.client";
import { DashboardStats, BookingStats, RevenueStats } from "@shared/types/api.types";

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
    staleTime: 5 * 60 * 1000, // 5 minutes - increased from 2 minutes
    refetchInterval: 10 * 60 * 1000, // Refetch every 10 minutes - increased from 5 minutes
    refetchIntervalInBackground: false, // Don't refetch when tab is not active
  });
}

// Get booking stats
export function useBookingStats() {
  return useQuery({
    queryKey: statsKeys.bookings(),
    queryFn: () => statsClient.getBookingStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes - increased from 2 minutes
    refetchIntervalInBackground: false, // Don't refetch when tab is not active
  });
}

// Get revenue stats
export function useRevenueStats() {
  return useQuery({
    queryKey: statsKeys.revenue(),
    queryFn: () => statsClient.getRevenueStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes - increased from 2 minutes
    refetchIntervalInBackground: false, // Don't refetch when tab is not active
  });
}
