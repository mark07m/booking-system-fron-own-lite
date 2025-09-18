"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import { cn } from "@/src/shared/utils/cn";

interface BreadcrumbItem {
  name: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname if not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { name: "Главная", href: "/dashboard" }
    ];

    let currentPath = '';
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === segments.length - 1;
      
      const name = getSegmentName(segment);
      breadcrumbs.push({
        name,
        href: isLast ? undefined : currentPath,
        current: isLast
      });
    });

    return breadcrumbs;
  };

  const getSegmentName = (segment: string): string => {
    const names: Record<string, string> = {
      dashboard: "Дашборд",
      bookings: "Бронирования",
      clients: "Клиенты",
      resources: "Ресурсы",
      analytics: "Аналитика",
      documents: "Документы",
      notifications: "Уведомления",
      help: "Помощь",
      settings: "Настройки",
      new: "Создать",
      edit: "Редактировать",
      profile: "Профиль"
    };

    return names[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className={cn("flex", className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={item.name} className="flex items-center">
            {index > 0 && (
              <ChevronRightIcon className="h-4 w-4 text-gray-400 mx-2" />
            )}
            
            {index === 0 && (
              <HomeIcon className="h-4 w-4 text-gray-400 mr-1" />
            )}

            {item.current ? (
              <span className="text-sm font-medium text-gray-900">
                {item.name}
              </span>
            ) : (
              <Link
                href={item.href || '#'}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
