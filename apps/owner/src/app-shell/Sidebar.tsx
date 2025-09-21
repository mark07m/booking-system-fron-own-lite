"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/shared/utils/cn";
import { Button } from "@/shared/ui/Button";
import { useAuthStore } from "@/shared/state/auth.store";
import { 
  HomeIcon, 
  CalendarIcon, 
  UsersIcon, 
  CogIcon,
  XMarkIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  DocumentTextIcon,
  BellIcon,
  QuestionMarkCircleIcon
} from "@heroicons/react/24/outline";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  { 
    name: "Дашборд", 
    href: "/dashboard", 
    icon: HomeIcon,
    description: "Обзор системы"
  },
  { 
    name: "Бронирования", 
    href: "/bookings", 
    icon: CalendarIcon,
    description: "Управление бронированиями"
  },
  { 
    name: "Клиенты", 
    href: "/clients", 
    icon: UsersIcon,
    description: "База клиентов"
  },
  { 
    name: "Ресурсы", 
    href: "/resources", 
    icon: BuildingOfficeIcon,
    description: "Управление ресурсами"
  },
  { 
    name: "Аналитика", 
    href: "/analytics", 
    icon: ChartBarIcon,
    description: "Отчеты и статистика"
  },
  { 
    name: "Документы", 
    href: "/documents", 
    icon: DocumentTextIcon,
    description: "Шаблоны и документы"
  },
];

const secondaryNavigation = [
  { 
    name: "Уведомления", 
    href: "/notifications", 
    icon: BellIcon,
    count: 3
  },
  { 
    name: "Помощь", 
    href: "/help", 
    icon: QuestionMarkCircleIcon
  },
  { 
    name: "Настройки", 
    href: "/settings", 
    icon: CogIcon
  },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  return (
    <>
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out",
          "lg:fixed lg:translate-x-0 lg:z-40",
          // Mobile: show/hide based on isOpen
          // Desktop: always visible
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">BS</span>
                </div>
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-semibold text-gray-900">
                  Booking System
                </h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="lg:hidden"
            >
              <XMarkIcon className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Main Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1">
            <div className="space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    )}
                    onClick={() => {
                      // Close sidebar on mobile after navigation
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                  >
                    <div className="flex-shrink-0 overflow-hidden">
                      <item.icon 
                        className={cn(
                          "h-4 w-4",
                          isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500"
                        )} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="truncate">{item.name}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </nav>
          
          {/* Secondary Navigation */}
          <div className="px-2 py-2 border-t border-gray-200">
            <div className="space-y-1">
              {secondaryNavigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                    onClick={() => {
                      if (window.innerWidth < 1024) {
                        onClose();
                      }
                    }}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 overflow-hidden mr-3">
                        <item.icon 
                          className={cn(
                            "h-3.5 w-3.5",
                            isActive ? "text-blue-700" : "text-gray-400 group-hover:text-gray-500"
                          )} 
                        />
                      </div>
                      {item.name}
                    </div>
                    {item.count && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {item.count}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
          
          {/* User Profile */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  A
                </span>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.name || "Администратор"}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || "admin@example.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
