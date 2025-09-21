"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs as UIBreadcrumbs } from "@ui";

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

  // Convert to UI library format
  const uiItems = breadcrumbItems.map(item => ({
    label: item.name,
    href: item.href,
    current: item.current
  }));

  return <UIBreadcrumbs items={uiItems} className={className} />;
}
