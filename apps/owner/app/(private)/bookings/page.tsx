import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/shared/ui/Button";
import { PlusIcon, FunnelIcon } from "@heroicons/react/24/outline";

export default function BookingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Бронирования"
        description="Управление всеми бронированиями системы"
        actions={
          <div className="flex space-x-3">
            <Button variant="outline">
              <FunnelIcon className="h-4 w-4 mr-2" />
              Фильтры
            </Button>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Новое бронирование
            </Button>
          </div>
        }
      />
      
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">Список бронирований будет здесь</p>
      </div>
    </div>
  );
}
