"use client";

import { Modal } from "./Modal";
import { useUIStore } from "@/shared/state/ui.store";
import { formatDateTime } from "@/shared/utils/formatters";
import { 
  CheckCircleIcon, 
  ExclaimationTriangleIcon, 
  InformationCircleIcon, 
  XCircleIcon 
} from "@heroicons/react/24/outline";

const iconMap = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclaimationTriangleIcon,
  info: InformationCircleIcon,
};

export function NotificationsModal() {
  const { notifications, removeNotification, closeModal } = useUIStore();

  const markAsRead = (id: string) => {
    // In a real app, this would make an API call
    removeNotification(id);
  };

  const markAllAsRead = () => {
    notifications.forEach(notification => {
      if (!notification.readAt) {
        removeNotification(notification.id);
      }
    });
  };

  return (
    <Modal
      id="notifications"
      title="Уведомления"
      size="lg"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {notifications.length} уведомлений
          </p>
          {notifications.some(n => !n.readAt) && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Отметить все как прочитанные
            </button>
          )}
        </div>

        {/* Notifications list */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <InformationCircleIcon className="h-12 w-12" />
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Нет уведомлений
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Здесь будут отображаться важные уведомления
              </p>
            </div>
          ) : (
            notifications.map((notification) => {
              const Icon = iconMap[notification.type];
              const isRead = !!notification.readAt;
              
              return (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    isRead 
                      ? "bg-gray-50 border-gray-200" 
                      : "bg-white border-blue-200 shadow-sm"
                  }`}
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Icon
                        className={`h-5 w-5 ${
                          notification.type === "success"
                            ? "text-green-500"
                            : notification.type === "error"
                            ? "text-red-500"
                            : notification.type === "warning"
                            ? "text-yellow-500"
                            : "text-blue-500"
                        }`}
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className={`text-sm font-medium ${
                          isRead ? "text-gray-700" : "text-gray-900"
                        }`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">
                            {formatDateTime(notification.id)} {/* Using ID as timestamp for demo */}
                          </span>
                          {!isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-xs text-blue-600 hover:text-blue-700"
                            >
                              Отметить как прочитанное
                            </button>
                          )}
                        </div>
                      </div>
                      <p className={`mt-1 text-sm ${
                        isRead ? "text-gray-500" : "text-gray-700"
                      }`}>
                        {notification.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </Modal>
  );
}
