"use client";

import React from "react";
import { Badge } from "../Badge/Badge";

interface StatusBadgeProps {
  status: string;
  statusMap?: Record<string, { tone: "neutral" | "success" | "warning" | "danger" | "info"; label: string }>;
  className?: string;
}

const defaultStatusMap: Record<string, { tone: "neutral" | "success" | "warning" | "danger" | "info"; label: string }> = {
  pending: { tone: "warning", label: "Ожидает" },
  confirmed: { tone: "success", label: "Подтверждено" },
  cancelled: { tone: "danger", label: "Отменено" },
  completed: { tone: "neutral", label: "Завершено" },
  active: { tone: "success", label: "Активно" },
  inactive: { tone: "neutral", label: "Неактивно" },
  error: { tone: "danger", label: "Ошибка" },
  info: { tone: "info", label: "Информация" },
};

export function StatusBadge({ 
  status, 
  statusMap = defaultStatusMap,
  className 
}: StatusBadgeProps) {
  const statusConfig = statusMap[status] || { tone: "neutral" as const, label: status };
  
  return (
    <Badge tone={statusConfig.tone} className={className}>
      {statusConfig.label}
    </Badge>
  );
}
