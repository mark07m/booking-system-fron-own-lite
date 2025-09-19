"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/shared/ui/Button";
import { useAuthStore } from "@/shared/state/auth.store";
import { useUIStore } from "@/shared/state/ui.store";
import { 
  Bars3Icon, 
  BellIcon, 
  MagnifyingGlassIcon,
  XMarkIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from "@heroicons/react/24/outline";
import { cn } from "@/shared/utils/cn";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { notifications, openModal } = useUIStore();

  const unreadNotifications = notifications.filter(n => !n.readAt).length;

  const getPageTitle = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return "Дашборд";
    
    const titles: Record<string, string> = {
      dashboard: "Дашборд",
      bookings: "Бронирования",
      clients: "Клиенты",
      resources: "Ресурсы",
      analytics: "Аналитика",
      documents: "Документы",
      notifications: "Уведомления",
      help: "Помощь",
      settings: "Настройки"
    };
    
    return titles[segments[0]] || "Страница";
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Left section */}
        <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onMenuClick}
              className="mr-2 lg:hidden overflow-hidden"
            >
              <Bars3Icon className="h-4 w-4 max-w-full max-h-full" />
            </Button>
          
          {/* Page title */}
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold text-gray-900">
              {getPageTitle()}
            </h1>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="flex-1 max-w-lg mx-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 max-w-full max-h-full text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Поиск бронирований, клиентов..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
        
        {/* Right section */}
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => openModal("notifications")}
              className="relative overflow-hidden"
            >
              <BellIcon className="h-4 w-4 max-w-full max-h-full" />
              {unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadNotifications > 9 ? "9+" : unreadNotifications}
                </span>
              )}
            </Button>
          </div>

          {/* Quick actions */}
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => openModal("quick-actions")}
            className="hidden sm:flex overflow-hidden"
          >
            <Cog6ToothIcon className="h-4 w-4 max-w-full max-h-full" />
          </Button>
          
          {/* User profile dropdown */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center space-x-2"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  A
                </span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name || "Администратор"}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.role || "admin"}
                </p>
              </div>
              <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            </Button>

            {/* Profile dropdown */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || "Администратор"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.email || "admin@example.com"}
                  </p>
                </div>
                <a
                  href="/profile"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <UserCircleIcon className="h-4 w-4 mr-3" />
                  Профиль
                </a>
                <a
                  href="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Cog6ToothIcon className="h-4 w-4 mr-3" />
                  Настройки
                </a>
                <div className="border-t border-gray-100">
                  <button
                    onClick={() => {
                      // Handle logout
                      setProfileOpen(false);
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="lg:hidden border-t border-gray-200 p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-4 w-4 max-w-full max-h-full text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Поиск..."
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <XMarkIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close profile dropdown */}
      {profileOpen && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setProfileOpen(false)}
        />
      )}
    </header>
  );
}
