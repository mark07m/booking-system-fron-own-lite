import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/shared/ui/Button";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Клиенты"
        description="Управление базой клиентов"
        actions={
          <div className="flex space-x-3">
            <Button variant="outline">
              <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
              Поиск
            </Button>
            <Button>
              <PlusIcon className="h-4 w-4 mr-2" />
              Добавить клиента
            </Button>
          </div>
        }
      />
      
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">Список клиентов будет здесь</p>
      </div>
    </div>
  );
}
