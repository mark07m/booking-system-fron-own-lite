"use client";

import React from "react";
import { cn } from "../../utils/cn";

interface TabItem {
  key: string;
  label: string;
  disabled?: boolean;
}

interface TabsProps {
  items: TabItem[];
  value: string;
  onChange: (key: string) => void;
  className?: string;
}

export function Tabs({ items, value, onChange, className }: TabsProps) {
  return (
    <div className={cn("", className)}>
      <div className="flex gap-2 border-b">
        {items.map((item) => (
          <button
            key={item.key}
            disabled={item.disabled}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-t-xl transition-colors",
              value === item.key 
                ? "bg-white border border-b-white border-gray-200 text-gray-900" 
                : "text-gray-600 hover:text-gray-900",
              item.disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={() => !item.disabled && onChange(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
