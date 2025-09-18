"use client";

import { Button } from "@/src/shared/ui/Button";
import { formatDateTime, formatCurrency } from "@/src/shared/utils/formatters";
import { useBookings } from "@/src/shared/hooks/useBookings";
import { useUIStore } from "@/src/shared/state/ui.store";
import { Modal } from "@/src/shared/components/Modal";

const statusLabels = {
  pending: "Ожидает",
  confirmed: "Подтверждено",
  cancelled: "Отменено",
  completed: "Завершено",
  no_show: "Не явился",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
  completed: "bg-blue-100 text-blue-800",
  no_show: "bg-gray-100 text-gray-800",
};

export function RecentBookings() {
  const { data: bookingsData, isLoading, error } = useBookings({ 
    limit: 5,
    sort: "createdAt",
    order: "desc"
  });
  const { openModal } = useUIStore();

  const recentBookings = bookingsData?.data || [];

  const handleViewDetails = (bookingId: string) => {
    openModal(`booking-details-${bookingId}`);
  };

  if (isLoading) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Ошибка загрузки бронирований</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Последние бронирования
          </h3>
          <Button variant="outline" size="sm">
            Показать все
          </Button>
        </div>
        
        {recentBookings.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Нет бронирований</p>
          </div>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Клиент
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ресурс
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Время
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сумма
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {booking.client?.name || booking.user?.name || "Неизвестно"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.resource?.name || "Неизвестно"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDateTime(booking.startDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[booking.status]}`}
                      >
                        {statusLabels[booking.status]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(booking.totalPrice)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleViewDetails(booking.id)}
                      >
                        Подробнее
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Booking Details Modals */}
      {recentBookings.map((booking) => (
        <Modal
          key={`booking-details-${booking.id}`}
          id={`booking-details-${booking.id}`}
          title={`Детали бронирования #${booking.id}`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Клиент</label>
                <p className="text-sm text-gray-900">
                  {booking.client?.name || booking.user?.name || "Неизвестно"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Ресурс</label>
                <p className="text-sm text-gray-900">
                  {booking.resource?.name || "Неизвестно"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Начало</label>
                <p className="text-sm text-gray-900">
                  {formatDateTime(booking.startDate)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Окончание</label>
                <p className="text-sm text-gray-900">
                  {formatDateTime(booking.endDate)}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Статус</label>
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[booking.status]}`}
                >
                  {statusLabels[booking.status]}
                </span>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Сумма</label>
                <p className="text-sm text-gray-900">
                  {formatCurrency(booking.totalPrice)}
                </p>
              </div>
            </div>
            
            {booking.notes && (
              <div>
                <label className="text-sm font-medium text-gray-500">Заметки</label>
                <p className="text-sm text-gray-900 mt-1">{booking.notes}</p>
              </div>
            )}
            
            {booking.specialRequests && (
              <div>
                <label className="text-sm font-medium text-gray-500">Особые пожелания</label>
                <p className="text-sm text-gray-900 mt-1">{booking.specialRequests}</p>
              </div>
            )}
          </div>
        </Modal>
      ))}
    </div>
  );
}
