"use client";

import { useState } from "react";
import { Button } from "@/src/shared/ui/Button";
import { Select } from "@/src/shared/ui/Select";

export function DashboardFilters() {
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState("");

  const handleApplyFilters = () => {
    // TODO: Implement filter logic
    console.log("Applying filters:", { status, dateRange });
  };

  const handleResetFilters = () => {
    setStatus("");
    setDateRange("");
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Статус
          </label>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            placeholder="Выберите статус"
          >
            <option value="">Все статусы</option>
            <option value="pending">Ожидает</option>
            <option value="confirmed">Подтверждено</option>
            <option value="cancelled">Отменено</option>
          </Select>
        </div>
        
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Период
          </label>
          <Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            placeholder="Выберите период"
          >
            <option value="">Все периоды</option>
            <option value="today">Сегодня</option>
            <option value="week">Эта неделя</option>
            <option value="month">Этот месяц</option>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleResetFilters}
          >
            Сбросить
          </Button>
          <Button onClick={handleApplyFilters}>
            Применить
          </Button>
        </div>
      </div>
    </div>
  );
}
