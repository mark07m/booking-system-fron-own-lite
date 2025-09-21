"use client";

// @ts-nocheck
import React, { useMemo, useState } from "react";
import { 
  Button, 
  Badge, 
  Card, 
  Input, 
  Textarea, 
  Select, 
  Switch, 
  Modal, 
  Drawer, 
  Tabs, 
  Toast, 
  Breadcrumbs, 
  Table, 
  Section, 
  CalendarGrid, 
  StatusBadge,
  usePagination 
} from "@/shared/ui";

// Demo data helpers
const demoBookings = Array.from({ length: 22 }).map((_, i) => ({
  id: `BKG-${1000 + i}`,
  service: ["Столик на двоих", "Банкет", "Комната VIP"][i % 3],
  resource: ["Стол 1", "Стол 2", "VIP 1"][i % 3],
  datetime: new Date(Date.now() + i * 36e5).toISOString(),
  status: (['pending','confirmed','cancelled','completed'] as const)[i % 4],
}));

type Booking = typeof demoBookings[0];

function CalendarGridDemo() {
  // Build simple slots: today 09:00-18:00 each hour
  const start = new Date();
  start.setHours(9, 0, 0, 0);
  const slots = Array.from({ length: 10 }).map((_, i) => {
    const s = new Date(start.getTime() + i * 60 * 60 * 1000);
    const e = new Date(s.getTime() + 60 * 60 * 1000);
    return { id: `S${i}`, start: s, end: e, available: i % 3 !== 0 };
  });
  const [selected, setSelected] = useState<string | null>(null);
  
  return (
    <CalendarGrid 
      slots={slots}
      selectedSlot={selected}
      onSlotSelect={setSelected}
    />
  );
}

export default function UIShowcase() {
  const [tab, setTab] = useState("atoms");
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [toast, setToast] = useState<{ open: boolean; message: string }>({ open: false, message: "" });
  const [filters, setFilters] = useState({ status: "all", q: "" });

  const filtered = useMemo(() => {
    return demoBookings.filter((b) => {
      const okStatus = filters.status === "all" || b.status === (filters.status as any);
      const q = filters.q.trim().toLowerCase();
      const okQ = !q || [b.id, b.service, b.resource].some((v) => v.toLowerCase().includes(q));
      return okStatus && okQ;
    });
  }, [filters]);
  
  const { data, page, pages, setPage, total } = usePagination<Booking>(filtered, 6);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div>
            <Breadcrumbs items={[{ label: "Владелец" }, { label: "UI Kit" }]} />
            <h1 className="mt-1 text-2xl font-bold">Компоненты интерфейса</h1>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone="info">Текущая компания: My Restaurant</Badge>
            <Button variant="ghost" onClick={() => setOpenDrawer(true)}>Фильтры</Button>
            <Button onClick={() => setOpenModal(true)}>Открыть модалку</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <Tabs
          items={[
            { key: "atoms", label: "Примитивы" },
            { key: "forms", label: "Формы" },
            { key: "tables", label: "Таблицы" },
            { key: "calendar", label: "Календарь" },
          ]}
          value={tab}
          onChange={setTab}
        />

        {tab === "atoms" && (
          <>
            <Section title="Кнопки">
              <div className="flex flex-wrap gap-3">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button loading>Loading</Button>
                <Button size="sm">Small</Button>
                <Button size="lg">Large</Button>
              </div>
            </Section>

            <Section title="Бейджи/Статусы">
              <div className="flex flex-wrap items-center gap-3">
                <Badge>Neutral</Badge>
                <Badge tone="info">Info</Badge>
                <Badge tone="success">Success</Badge>
                <Badge tone="warning">Warning</Badge>
                <Badge tone="danger">Danger</Badge>
              </div>
            </Section>

            <Section title="Карточки статистики">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[{ t: "Бронирования", v: 128 }, { t: "Выручка, ₽", v: 245000 }, { t: "Отмены", v: 5 }, { t: "Рейтинг", v: 4.7 }].map((s, i) => (
                  <Card key={i} className="p-5">
                    <div className="text-sm text-gray-500">{s.t}</div>
                    <div className="mt-1 text-2xl font-bold">{s.v}</div>
                    <div className="mt-2 text-xs text-emerald-600">▲ за неделю</div>
                  </Card>
                ))}
              </div>
            </Section>
          </>
        )}

        {tab === "forms" && (
          <>
            <Section title="Элементы формы" subtitle="Инпуты, селекты, переключатели, дата/время">
              <div className="grid gap-4 md:grid-cols-2">
                <Input label="Название услуги" placeholder="Столик на двоих" />
                <Input label="Цена" type="number" placeholder="2500" />
                <Select label="Валюта" options={[{ label: "RUB", value: "RUB" }, { label: "USD", value: "USD" }, { label: "EUR", value: "EUR" }]} />
                <Input label="Длительность (мин)" type="number" placeholder="60" />
                <Textarea label="Описание" placeholder="Короткое описание услуги" className="md:col-span-2" />
                <div className="flex items-center gap-4 md:col-span-2">
                  <Switch checked={true} onChange={() => {}} label="Активна" />
                  <Switch checked={false} onChange={() => {}} label="Нужно одобрение" />
                </div>
                <Input label="Дата" type="date" />
                <Input label="Время" type="time" />
                <Input label="Дата и время" type="datetime-local" className="md:col-span-2" />
                <div className="md:col-span-2 flex gap-3">
                  <Button onClick={() => setToast({ open: true, message: "Сохранено" })}>Сохранить</Button>
                  <Button variant="secondary">Отмена</Button>
                </div>
              </div>
            </Section>
          </>
        )}

        {tab === "tables" && (
          <>
            <Section title="Фильтры таблицы">
              <div className="flex flex-wrap items-end gap-3">
                <Input label="Поиск" placeholder="ID, сервис, ресурс" value={filters.q} onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))} />
                <Select
                  label="Статус"
                  value={filters.status}
                  onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
                  options={[
                    { label: "Все", value: "all" },
                    { label: "Ожидает", value: "pending" },
                    { label: "Подтверждено", value: "confirmed" },
                    { label: "Отменено", value: "cancelled" },
                    { label: "Завершено", value: "completed" },
                  ]}
                />
                <Button onClick={() => setFilters({ status: "all", q: "" })} variant="ghost">Сбросить</Button>
              </div>
            </Section>

            <Section title="Таблица бронирований" subtitle={`Найдено: ${total}`}>
              <Table<Booking>
                columns={[
                  { key: "id", header: "ID" },
                  { key: "service", header: "Услуга" },
                  { key: "resource", header: "Ресурс" },
                  {
                    key: "datetime",
                    header: "Дата/Время",
                    render: (v) => new Date(v).toLocaleString(),
                  },
                  {
                    key: "status",
                    header: "Статус",
                    render: (v) => <StatusBadge status={v} />,
                  },
                ]}
                rows={data}
                rowKey={(r) => r.id}
              />
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-500">Стр. {page} из {pages}</div>
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => setPage(Math.max(1, page - 1))}>Назад</Button>
                  <Button onClick={() => setPage(Math.min(pages, page + 1))}>Вперёд</Button>
                </div>
              </div>
            </Section>
          </>
        )}

        {tab === "calendar" && (
          <>
            <Section title="Сетка слотов (день)">
              <CalendarGridDemo />
            </Section>
          </>
        )}
      </main>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Модальное окно"
        footer={
          <>
            <Button variant="secondary" onClick={() => setOpenModal(false)}>Отмена</Button>
            <Button onClick={() => { setOpenModal(false); setToast({ open: true, message: "Действие выполнено" }); }}>Сохранить</Button>
          </>
        }
      >
        <p className="text-sm text-gray-700">Это пример модального окна. Разместите здесь формы или подтверждения действий.</p>
      </Modal>

      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} title="Фильтры">
        <div className="space-y-4">
          <Input label="Поиск" placeholder="ID, сервис, ресурс" value={filters.q} onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))} />
          <Select
            label="Статус"
            value={filters.status}
            onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
            options={[
              { label: "Все", value: "all" },
              { label: "Ожидает", value: "pending" },
              { label: "Подтверждено", value: "confirmed" },
              { label: "Отменено", value: "cancelled" },
              { label: "Завершено", value: "completed" },
            ]}
          />
          <div className="flex gap-3">
            <Button onClick={() => setOpenDrawer(false)}>Применить</Button>
            <Button variant="secondary" onClick={() => setFilters({ status: "all", q: "" })}>Сбросить</Button>
          </div>
        </div>
      </Drawer>

      <Toast open={toast.open} message={toast.message} onClose={() => setToast((t) => ({ ...t, open: false }))} />
    </div>
  );
}
