"use client";

import { 
  CalendarDaysIcon, 
  CurrencyDollarIcon, 
  UsersIcon, 
  ClockIcon 
} from "@heroicons/react/24/outline";

const stats = [
  {
    name: "Всего бронирований",
    value: "1,234",
    change: "+12%",
    changeType: "positive" as const,
    icon: CalendarDaysIcon,
  },
  {
    name: "Общая выручка",
    value: "₽2,456,789",
    change: "+8%",
    changeType: "positive" as const,
    icon: CurrencyDollarIcon,
  },
  {
    name: "Активные клиенты",
    value: "89",
    change: "+5%",
    changeType: "positive" as const,
    icon: UsersIcon,
  },
  {
    name: "Ожидающие подтверждения",
    value: "23",
    change: "-2%",
    changeType: "negative" as const,
    icon: ClockIcon,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
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
