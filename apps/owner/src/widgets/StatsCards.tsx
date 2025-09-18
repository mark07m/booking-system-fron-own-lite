"use client";

import { 
  CalendarDaysIcon, 
  CurrencyDollarIcon, 
  UsersIcon, 
  ClockIcon 
} from "@heroicons/react/24/outline";
import { useDashboardStats } from "@/src/shared/hooks/useStats";
import { formatCurrency } from "@/src/shared/utils/formatters";

export function StatsCards() {
  const { data: stats, isLoading, error } = useDashboardStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white overflow-hidden shadow rounded-lg animate-pulse">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-6 w-6 bg-gray-200 rounded"></div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Ошибка загрузки статистики</p>
      </div>
    );
  }

  const statsData = [
    {
      name: "Всего бронирований",
      value: stats?.totalBookings?.toLocaleString() || "0",
      change: stats?.bookingsGrowth ? `+${stats.bookingsGrowth}%` : "0%",
      changeType: (stats?.bookingsGrowth || 0) >= 0 ? "positive" as const : "negative" as const,
      icon: CalendarDaysIcon,
    },
    {
      name: "Общая выручка",
      value: stats?.totalRevenue ? formatCurrency(stats.totalRevenue) : "₽0",
      change: stats?.revenueGrowth ? `+${stats.revenueGrowth}%` : "0%",
      changeType: (stats?.revenueGrowth || 0) >= 0 ? "positive" as const : "negative" as const,
      icon: CurrencyDollarIcon,
    },
    {
      name: "Активные клиенты",
      value: stats?.activeUsers?.toLocaleString() || "0",
      change: "+5%", // This would come from a separate API call
      changeType: "positive" as const,
      icon: UsersIcon,
    },
    {
      name: "Ожидающие подтверждения",
      value: stats?.pendingBookings?.toLocaleString() || "0",
      change: "-2%", // This would come from a separate API call
      changeType: "negative" as const,
      icon: ClockIcon,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => (
        <div
          key={stat.name}
          className="bg-white overflow-hidden shadow rounded-lg"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <stat.icon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {stat.name}
                  </dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">
                      {stat.value}
                    </div>
                    <div
                      className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.changeType === "positive"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
