"use client";

import React, { useState } from "react";
import { cn } from "../../utils/cn";

interface TimeSlot {
  id: string;
  start: Date;
  end: Date;
  available: boolean;
}

interface CalendarGridProps {
  slots: TimeSlot[];
  selectedSlot?: string | null;
  onSlotSelect?: (slotId: string) => void;
  className?: string;
  columns?: number;
}

export function CalendarGrid({ 
  slots, 
  selectedSlot, 
  onSlotSelect,
  className,
  columns = 5 
}: CalendarGridProps) {
  return (
    <div className={cn(
      "grid gap-3",
      `grid-cols-2 md:grid-cols-${columns}`,
      className
    )}>
      {slots.map((slot) => (
        <button
          key={slot.id}
          disabled={!slot.available}
          onClick={() => slot.available && onSlotSelect?.(slot.id)}
          className={cn(
            "rounded-xl border p-3 text-left shadow-sm transition",
            slot.available 
              ? "bg-white hover:border-blue-400" 
              : "bg-gray-50 text-gray-400",
            selectedSlot === slot.id && "ring-2 ring-blue-300 border-blue-500"
          )}
          title={slot.available ? "Доступно" : "Недоступно"}
        >
          <div className="text-xs text-gray-500">
            {slot.start.toLocaleDateString()}
          </div>
          <div className="mt-1 font-medium">
            {slot.start.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}–{slot.end.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <div className="mt-1 text-xs">
            {slot.available ? "Доступно" : "Занято"}
          </div>
        </button>
      ))}
    </div>
  );
}
