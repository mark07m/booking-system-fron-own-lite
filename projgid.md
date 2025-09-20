
## **Безопасные папки для UI/UX изменений**

### �� **1. Новые страницы - БЕЗОПАСНО**

#### **A. Защищенные страницы (требуют авторизации)**
```
apps/owner/app/(private)/
├── dashboard/page.tsx          ✅ Существует
├── bookings/page.tsx           ✅ Существует  
├── clients/page.tsx            ✅ Существует
├── resources/page.tsx          ✅ Существует
├── analytics/page.tsx          ✅ Существует
├── settings/page.tsx           ✅ Существует
├── reports/page.tsx            �� НОВАЯ СТРАНИЦА
├── calendar/page.tsx           �� НОВАЯ СТРАНИЦА
├── notifications/page.tsx      �� НОВАЯ СТРАНИЦА
├── profile/page.tsx            �� НОВАЯ СТРАНИЦА
└── help/page.tsx               �� НОВАЯ СТРАНИЦА
```

#### **B. Публичные страницы (без авторизации)**
```
apps/owner/app/(public)/
├── login/page.tsx              ✅ Существует
├── register/page.tsx           ✅ Существует
├── forgot-password/page.tsx    ✅ Существует
├── reset-password/page.tsx     ✅ Существует
├── about/page.tsx              �� НОВАЯ СТРАНИЦА
├── contact/page.tsx            �� НОВАЯ СТРАНИЦА
├── pricing/page.tsx            �� НОВАЯ СТРАНИЦА
└── privacy/page.tsx            🆕 НОВАЯ СТРАНИЦА
```

### **2. Модальные окна - БЕЗОПАСНО**

#### **A. В shared/components (универсальные модалки)**
```
apps/owner/src/shared/components/
├── Modal.tsx                   ✅ Существует
├── NotificationsModal.tsx      ✅ Существует
├── QuickActionsModal.tsx       ✅ Существует
├── ConfirmModal.tsx            �� НОВАЯ МОДАЛКА
├── ImageModal.tsx              �� НОВАЯ МОДАЛКА
├── FilterModal.tsx             �� НОВАЯ МОДАЛКА
├── SettingsModal.tsx           �� НОВАЯ МОДАЛКА
└── HelpModal.tsx               �� НОВАЯ МОДАЛКА
```

#### **B. В features (специфичные модалки)**
```
apps/owner/src/features/
├── auth/ui/
│   ├── LoginForm.tsx           ✅ Существует
│   ├── RegisterForm.tsx        ✅ Существует
│   ├── ForgotPasswordForm.tsx  ✅ Существует
│   ├── ChangePasswordModal.tsx �� НОВАЯ МОДАЛКА
│   └── ProfileModal.tsx        🆕 НОВАЯ МОДАЛКА
├── booking/ui/
│   ├── BookingForm.tsx         �� НОВАЯ МОДАЛКА
│   ├── BookingDetailsModal.tsx �� НОВАЯ МОДАЛКА
│   ├── BookingEditModal.tsx    �� НОВАЯ МОДАЛКА
│   └── BookingCancelModal.tsx  �� НОВАЯ МОДАЛКА
└── client/ui/
    ├── ClientForm.tsx          �� НОВАЯ МОДАЛКА
    ├── ClientDetailsModal.tsx  �� НОВАЯ МОДАЛКА
    └── ClientEditModal.tsx     �� НОВАЯ МОДАЛКА
```

### 🎨 **3. UI компоненты - БЕЗОПАСНО**

#### **A. В packages/ui (библиотека компонентов)**
```
packages/ui/src/components/
├── Button/                     ✅ Существует
├── Input/                      ✅ Существует
├── Card/                       �� НОВЫЙ КОМПОНЕНТ
├── Badge/                      �� НОВЫЙ КОМПОНЕНТ
├── Alert/                      �� НОВЫЙ КОМПОНЕНТ
├── Spinner/                    �� НОВЫЙ КОМПОНЕНТ
├── DataTable/                  �� НОВЫЙ КОМПОНЕНТ
├── DatePicker/                 �� НОВЫЙ КОМПОНЕНТ
├── Dropdown/                   �� НОВЫЙ КОМПОНЕНТ
├── Tabs/                       �� НОВЫЙ КОМПОНЕНТ
├── Accordion/                  �� НОВЫЙ КОМПОНЕНТ
├── Tooltip/                    �� НОВЫЙ КОМПОНЕНТ
├── Popover/                    �� НОВЫЙ КОМПОНЕНТ
├── Dialog/                     �� НОВЫЙ КОМПОНЕНТ
├── Sheet/                      �� НОВЫЙ КОМПОНЕНТ
├── Command/                    �� НОВЫЙ КОМПОНЕНТ
├── Calendar/                   �� НОВЫЙ КОМПОНЕНТ
├── TimePicker/                 �� НОВЫЙ КОМПОНЕНТ
├── FileUpload/                 �� НОВЫЙ КОМПОНЕНТ
├── ImageUpload/                �� НОВЫЙ КОМПОНЕНТ
├── RichTextEditor/             �� НОВЫЙ КОМПОНЕНТ
├── Chart/                      �� НОВЫЙ КОМПОНЕНТ
├── Progress/                   �� НОВЫЙ КОМПОНЕНТ
├── Skeleton/                   �� НОВЫЙ КОМПОНЕНТ
├── Toast/                      �� НОВЫЙ КОМПОНЕНТ
├── Notification/               �� НОВЫЙ КОМПОНЕНТ
└── Loading/                    🆕 НОВЫЙ КОМПОНЕНТ
```

#### **B. В shared/ui (обертки и утилиты)**
```
apps/owner/src/shared/ui/
├── Button.tsx                  ✅ Существует (заглушка)
├── Input.tsx                   ✅ Существует (заглушка)
├── Label.tsx                   ✅ Существует (заглушка)
├── Select.tsx                  ✅ Существует (заглушка)
├── index.ts                    �� НОВЫЙ ФАЙЛ (экспорты)
├── Card.tsx                    �� НОВЫЙ КОМПОНЕНТ
├── Badge.tsx                   �� НОВЫЙ КОМПОНЕНТ
├── Alert.tsx                   �� НОВЫЙ КОМПОНЕНТ
├── Spinner.tsx                 �� НОВЫЙ КОМПОНЕНТ
├── DataTable.tsx               �� НОВЫЙ КОМПОНЕНТ
├── DatePicker.tsx              �� НОВЫЙ КОМПОНЕНТ
├── Dropdown.tsx                �� НОВЫЙ КОМПОНЕНТ
├── Tabs.tsx                    �� НОВЫЙ КОМПОНЕНТ
├── Accordion.tsx               �� НОВЫЙ КОМПОНЕНТ
├── Tooltip.tsx                 �� НОВЫЙ КОМПОНЕНТ
├── Popover.tsx                 �� НОВЫЙ КОМПОНЕНТ
├── Dialog.tsx                  �� НОВЫЙ КОМПОНЕНТ
├── Sheet.tsx                   �� НОВЫЙ КОМПОНЕНТ
├── Command.tsx                 �� НОВЫЙ КОМПОНЕНТ
├── Calendar.tsx                �� НОВЫЙ КОМПОНЕНТ
├── TimePicker.tsx              �� НОВЫЙ КОМПОНЕНТ
├── FileUpload.tsx              �� НОВЫЙ КОМПОНЕНТ
├── ImageUpload.tsx             �� НОВЫЙ КОМПОНЕНТ
├── RichTextEditor.tsx          �� НОВЫЙ КОМПОНЕНТ
├── Chart.tsx                   �� НОВЫЙ КОМПОНЕНТ
├── Progress.tsx                �� НОВЫЙ КОМПОНЕНТ
├── Skeleton.tsx                �� НОВЫЙ КОМПОНЕНТ
├── Toast.tsx                   �� НОВЫЙ КОМПОНЕНТ
├── Notification.tsx            �� НОВЫЙ КОМПОНЕНТ
└── Loading.tsx                 🆕 НОВЫЙ КОМПОНЕНТ
```

### ��️ **4. Виджеты - БЕЗОПАСНО**

#### **A. В widgets (сложные UI блоки)**
```
apps/owner/src/widgets/
├── DashboardHeader.tsx         ✅ Существует
├── StatsCards.tsx              ✅ Существует
├── RecentBookings.tsx          ✅ Существует
├── ServerStats.tsx             ✅ Существует
├── BookingCalendar.tsx         �� НОВЫЙ ВИДЖЕТ
├── ClientList.tsx              �� НОВЫЙ ВИДЖЕТ
├── ResourceGrid.tsx            �� НОВЫЙ ВИДЖЕТ
├── AnalyticsChart.tsx          �� НОВЫЙ ВИДЖЕТ
├── NotificationCenter.tsx      �� НОВЫЙ ВИДЖЕТ
├── QuickActions.tsx            �� НОВЫЙ ВИДЖЕТ
├── SearchBar.tsx               �� НОВЫЙ ВИДЖЕТ
├── FilterPanel.tsx             �� НОВЫЙ ВИДЖЕТ
├── DataTable.tsx               �� НОВЫЙ ВИДЖЕТ
├── Pagination.tsx              �� НОВЫЙ ВИДЖЕТ
├── Breadcrumbs.tsx             �� НОВЫЙ ВИДЖЕТ
├── Sidebar.tsx                 �� НОВЫЙ ВИДЖЕТ
├── Topbar.tsx                  �� НОВЫЙ ВИДЖЕТ
├── Footer.tsx                  �� НОВЫЙ ВИДЖЕТ
└── index.ts                    �� НОВЫЙ ФАЙЛ (экспорты)
```

### **5. Новые features - БЕЗОПАСНО**

#### **A. В features (функциональные модули)**
```
apps/owner/src/features/
├── auth/                       ✅ Существует
├── booking/                    🆕 НОВЫЙ FEATURE
│   ├── ui/
│   │   ├── BookingForm.tsx
│   │   ├── BookingList.tsx
│   │   ├── BookingCard.tsx
│   │   └── BookingModal.tsx
│   ├── model/
│   │   ├── booking.types.ts
│   │   ├── booking.schemas.ts
│   │   └── useBooking.ts
│   └── index.ts
├── client/                     �� НОВЫЙ FEATURE
│   ├── ui/
│   │   ├── ClientForm.tsx
│   │   ├── ClientList.tsx
│   │   ├── ClientCard.tsx
│   │   └── ClientModal.tsx
│   ├── model/
│   │   ├── client.types.ts
│   │   ├── client.schemas.ts
│   │   └── useClient.ts
│   └── index.ts
├── resource/                   🆕 НОВЫЙ FEATURE
├── analytics/                  🆕 НОВЫЙ FEATURE
├── notification/               🆕 НОВЫЙ FEATURE
├── settings/                   🆕 НОВЫЙ FEATURE
└── help/                       🆕 НОВЫЙ FEATURE
```

### ⚠️ **6. Что НЕ трогать (критически важно)**

#### **❌ НЕ изменяйте:**
```
apps/owner/
├── middleware.ts               ❌ СИСТЕМНЫЙ ФАЙЛ
├── next.config.ts              ❌ КОНФИГУРАЦИЯ
├── tsconfig.json               ❌ КОНФИГУРАЦИЯ
├── package.json                ❌ КОНФИГУРАЦИЯ
├── app/layout.tsx              ❌ КОРНЕВОЙ LAYOUT
├── app/template.tsx            ❌ СИСТЕМНЫЙ ФАЙЛ
├── app/error.tsx               ❌ СИСТЕМНЫЙ ФАЙЛ
├── app/not-found.tsx           ❌ СИСТЕМНЫЙ ФАЙЛ
└── src/app-shell/              ❌ КРИТИЧЕСКИ ВАЖНО
    ├── AppShell.tsx
    ├── Sidebar.tsx
    └── Topbar.tsx
```

### 🚀 **7. Рекомендуемый порядок разработки**

#### **Фаза 1: Базовые компоненты (1-2 недели)**
1. Создайте `packages/ui/src/components/Card/`
2. Создайте `packages/ui/src/components/Badge/`
3. Создайте `packages/ui/src/components/Alert/`
4. Обновите `apps/owner/src/shared/ui/index.ts`

#### **Фаза 2: Формы и модалки (2-3 недели)**
1. Создайте `packages/ui/src/components/DataTable/`
2. Создайте `packages/ui/src/components/DatePicker/`
3. Создайте `apps/owner/src/shared/components/ConfirmModal.tsx`
4. Создайте `apps/owner/src/features/booking/`

#### **Фаза 3: Сложные виджеты (3-4 недели)**
1. Создайте `apps/owner/src/widgets/BookingCalendar.tsx`
2. Создайте `apps/owner/src/widgets/AnalyticsChart.tsx`
3. Создайте `apps/owner/src/widgets/NotificationCenter.tsx`

#### **Фаза 4: Новые страницы (2-3 недели)**
1. Создайте `apps/owner/app/(private)/reports/page.tsx`
2. Создайте `apps/owner/app/(private)/calendar/page.tsx`
3. Создайте `apps/owner/app/(private)/notifications/page.tsx`

### **8. Структура файлов для новых компонентов**

#### **Пример: Card компонент**
```
packages/ui/src/components/Card/
├── Card.tsx                    # Основной компонент
├── CardHeader.tsx              # Заголовок
├── CardContent.tsx             # Контент
├── CardFooter.tsx              # Подвал
├── CardTitle.tsx               # Заголовок
├── CardDescription.tsx         # Описание
├── index.ts                    # Экспорты
└── Card.stories.tsx            # Storybook (опционально)
```

#### **Пример: BookingModal**
```
apps/owner/src/features/booking/ui/
├── BookingModal.tsx            # Основная модалка
├── BookingForm.tsx             # Форма бронирования
├── BookingDetails.tsx          # Детали бронирования
├── BookingActions.tsx          # Действия
└── index.ts                    # Экспорты
```

### **Итоговая стратегия**

1. **Начните с packages/ui** - создавайте базовые компоненты
2. **Добавляйте в shared/ui** - создавайте обертки
3. **Создавайте features** - функциональные модули
4. **Добавляйте widgets** - сложные UI блоки
5. **Создавайте страницы** - новые маршруты
6. **Тестируйте каждый шаг** - не ломайте существующее

Этот подход гарантирует, что вы сможете **масштабно изменить UI/UX**, не сломав существующую архитектуру! 🚀