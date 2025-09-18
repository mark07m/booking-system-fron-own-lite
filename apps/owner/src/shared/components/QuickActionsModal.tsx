"use client";

import { Modal } from "./Modal";
import { Button } from "@shared/ui/Button";
import { useUIStore } from "@shared/state/ui.store";
import { 
  PlusIcon,
  CalendarIcon,
  UserPlusIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";

const quickActions = [
  {
    name: "Новое бронирование",
    description: "Создать новое бронирование",
    icon: PlusIcon,
    href: "/bookings/new",
    color: "bg-blue-500 hover:bg-blue-600"
  },
  {
    name: "Добавить клиента",
    description: "Зарегистрировать нового клиента",
    icon: UserPlusIcon,
    href: "/clients/new",
    color: "bg-green-500 hover:bg-green-600"
  },
  {
    name: "Создать ресурс",
    description: "Добавить новый ресурс для бронирования",
    icon: BuildingOfficeIcon,
    href: "/resources/new",
    color: "bg-purple-500 hover:bg-purple-600"
  },
  {
    name: "Календарь",
    description: "Просмотр календаря бронирований",
    icon: CalendarIcon,
    href: "/calendar",
    color: "bg-orange-500 hover:bg-orange-600"
  },
  {
    name: "Отчеты",
    description: "Создать отчет по бронированиям",
    icon: DocumentTextIcon,
    href: "/reports",
    color: "bg-indigo-500 hover:bg-indigo-600"
  },
  {
    name: "Настройки",
    description: "Настройки системы",
    icon: Cog6ToothIcon,
    href: "/settings",
    color: "bg-gray-500 hover:bg-gray-600"
  }
];

export function QuickActionsModal() {
  const { closeModal } = useUIStore();

  const handleAction = (href: string) => {
    closeModal("quick-actions");
    // In a real app, this would navigate to the href
    window.location.href = href;
  };

  return (
    <Modal
      id="quick-actions"
      title="Быстрые действия"
      size="lg"
    >
      <div className="space-y-4">
        <p className="text-sm text-gray-500">
          Выберите действие для быстрого доступа
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <button
              key={action.name}
              onClick={() => handleAction(action.href)}
              className="group relative p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 text-left"
            >
              <div className="flex items-start">
                <div className={`flex-shrink-0 p-2 rounded-lg ${action.color} text-white`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                    {action.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {action.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-500">
              Используйте клавишу <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Ctrl</kbd> + <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">K</kbd> для быстрого поиска
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
