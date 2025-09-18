"use client";

import { Button } from "@/src/shared/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Дашборд</h1>
        <p className="text-gray-600">Обзор системы бронирования</p>
      </div>
      
      <div className="flex space-x-3">
        <Button variant="outline">
          Экспорт данных
        </Button>
        <Button>
          <PlusIcon className="h-4 w-4 mr-2" />
          Новое бронирование
        </Button>
      </div>
    </div>
  );
}
