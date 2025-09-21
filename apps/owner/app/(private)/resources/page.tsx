// @ts-nocheck
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/shared/ui/Button";
import { PlusIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ресурсы"
        description="Управление ресурсами для бронирования"
        actions={
          <div className="flex space-x-3">
            <Button variant="outline">
              <Cog6ToothIcon className="h-4 w-4 mr-2" />
              Настройки
            </Button>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Добавить ресурс
            </Button>
          </div>
        }
      />
      
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">Список ресурсов будет здесь</p>
      </div>
    </div>
  );
}
