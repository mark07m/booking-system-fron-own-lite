import { PageHeader } from "@/src/shared/components/PageHeader";
import { StatsCards } from "@/src/widgets/StatsCards";
import { RecentBookings } from "@/src/widgets/RecentBookings";
import { Button } from "@/src/shared/ui/Button";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Дашборд"
        description="Обзор системы бронирования и ключевые метрики"
        actions={
          <Button>
            <PlusIcon className="h-4 w-4 mr-2" />
            Новое бронирование
          </Button>
        }
      />
      
      <StatsCards />
      <RecentBookings />
    </div>
  );
}
