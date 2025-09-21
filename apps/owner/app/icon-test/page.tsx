"use client";

import { 
  HomeIcon, 
  CalendarIcon, 
  UsersIcon, 
  CogIcon,
  BellIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  PlusIcon,
  UserPlusIcon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  CheckCircleIcon,
  ExclaimationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline";

export default function IconTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Тест иконок - исправление проблемы с растягиванием</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Small icons */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Маленькие иконки (h-4 w-4)</h2>
            <div className="flex flex-wrap gap-4">
              <HomeIcon className="h-4 w-4 text-blue-600" />
              <CalendarIcon className="h-4 w-4 text-green-600" />
              <UsersIcon className="h-4 w-4 text-purple-600" />
              <CogIcon className="h-4 w-4 text-gray-600" />
              <BellIcon className="h-4 w-4 text-red-600" />
            </div>
          </div>

          {/* Medium icons */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Средние иконки (h-6 w-6)</h2>
            <div className="flex flex-wrap gap-4">
              <MagnifyingGlassIcon className="h-6 w-6 text-blue-600" />
              <XMarkIcon className="h-6 w-6 text-red-600" />
              <UserCircleIcon className="h-6 w-6 text-green-600" />
              <Cog6ToothIcon className="h-6 w-6 text-gray-600" />
              <ArrowRightOnRectangleIcon className="h-6 w-6 text-orange-600" />
            </div>
          </div>

          {/* Large icons */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Большие иконки (h-8 w-8)</h2>
            <div className="flex flex-wrap gap-4">
              <PlusIcon className="h-8 w-8 text-blue-600" />
              <UserPlusIcon className="h-8 w-8 text-green-600" />
              <BuildingOfficeIcon className="h-8 w-8 text-purple-600" />
              <DocumentTextIcon className="h-8 w-8 text-indigo-600" />
              <ChevronDownIcon className="h-8 w-8 text-gray-600" />
            </div>
          </div>

          {/* Icons in buttons */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Иконки в кнопках</h2>
            <div className="space-y-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <PlusIcon className="h-4 w-4" />
                Добавить
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                <CogIcon className="h-4 w-4" />
                Настройки
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                <XMarkIcon className="h-4 w-4" />
                Удалить
              </button>
            </div>
          </div>

          {/* Icons in flex containers */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Иконки в flex контейнерах</h2>
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-5 w-5 text-green-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">Успешное выполнение</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex-shrink-0">
                <ExclaimationTriangleIcon className="h-5 w-5 text-yellow-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">Предупреждение</p>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-5 w-5 text-red-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-700">Ошибка</p>
              </div>
            </div>
          </div>

          {/* Icons without size classes */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Иконки без размеров (должны быть 1em)</h2>
            <div className="flex flex-wrap gap-4">
              <InformationCircleIcon className="text-blue-600" />
              <CheckCircleIcon className="text-green-600" />
              <ExclaimationTriangleIcon className="text-yellow-600" />
              <XCircleIcon className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Тест на растягивание</h2>
          <div className="w-full h-32 bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Иконка не должна растягиваться на весь контейнер:</p>
              <HomeIcon className="h-8 w-8 text-blue-600 mx-auto" />
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Тест в разных контейнерах</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border border-gray-200 rounded">
              <h3 className="font-medium mb-2">Обычный контейнер</h3>
              <div className="flex items-center gap-2">
                <HomeIcon className="h-4 w-4 text-blue-600" />
                <span>Домашняя страница</span>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded shadow">
              <h3 className="font-medium mb-2">Контейнер с тенью</h3>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-green-600" />
                <span>Календарь</span>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg overflow-hidden">
              <h3 className="font-medium mb-2">Контейнер с overflow</h3>
              <div className="flex items-center gap-2">
                <UsersIcon className="h-4 w-4 text-purple-600" />
                <span>Пользователи</span>
              </div>
            </div>
            <div className="p-4 border border-gray-200 rounded-xl shadow-lg">
              <h3 className="font-medium mb-2">Контейнер с rounded-xl</h3>
              <div className="flex items-center gap-2">
                <CogIcon className="h-4 w-4 text-gray-600" />
                <span>Настройки</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
