// @ts-nocheck
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/shared/ui";
import { ArrowDownTrayIcon, CalendarIcon } from "@heroicons/react/24/outline";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Аналитика"
        description="Отчеты и статистика по бронированиям"
        actions={
          <div className="flex space-x-3">
            {/* @ts-ignore */}
            <Button variant="outline">
              <CalendarIcon className="h-4 w-4 mr-2" />
              Период
            </Button>
            {/* @ts-ignore */}
            <Button>
              <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
          </div>
        }
      />
      
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">Аналитика и отчеты будут здесь</p>
      </div>
    </div>
  );
}
