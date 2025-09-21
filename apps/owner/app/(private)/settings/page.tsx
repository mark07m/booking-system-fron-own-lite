// @ts-nocheck
import { PageHeader } from "@/shared/components/PageHeader";
import { Button } from "@/shared/ui/Button";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Настройки"
        description="Конфигурация системы и профиля"
        actions={
          <Button>
            <CheckIcon className="h-4 w-4 mr-2" />
            Сохранить изменения
          </Button>
        }
      />
      
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">Настройки системы будут здесь</p>
      </div>
    </div>
  );
}
