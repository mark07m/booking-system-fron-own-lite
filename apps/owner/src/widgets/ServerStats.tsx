// Server-side rendered stats component
import { serverFetch } from "@shared/utils/ssr";
import { ServerCookieManager } from "@shared/utils/cookies.server";
import { StatsCards } from "./StatsCards";

interface StatsData {
  totalBookings: number;
  totalRevenue: number;
  activeClients: number;
  monthlyGrowth: number;
}

// Server component - no "use client" directive
export async function ServerStats() {
  try {
    // Server-side data fetching with caching
    const stats = await serverFetch<StatsData>("/api/stats");
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCards stats={stats} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    
    // Fallback UI for server errors
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500">Total Bookings</div>
          <div className="text-2xl font-bold text-gray-900">--</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500">Total Revenue</div>
          <div className="text-2xl font-bold text-gray-900">--</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500">Active Clients</div>
          <div className="text-2xl font-bold text-gray-900">--</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="text-sm font-medium text-gray-500">Monthly Growth</div>
          <div className="text-2xl font-bold text-gray-900">--</div>
        </div>
      </div>
    );
  }
}

// Server action for revalidation
export async function revalidateStats() {
  "use server";
  
  const { revalidatePath } = await import("next/cache");
  revalidatePath("/dashboard");
}
