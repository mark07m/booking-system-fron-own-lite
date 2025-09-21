"use client";

import React from "react";
import { cn } from "../../utils/cn";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  hint?: string;
  error?: string;
  options: SelectOption[];
}

export function Select({ label, hint, error, options, className, ...props }: SelectProps) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-sm font-medium text-gray-700">{label}</div>}
      <select
        {...props}
        className={cn(
          "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
          error && "border-red-500 focus:border-red-500 focus:ring-red-200",
          className
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint && <div className="mt-1 text-xs text-gray-500">{hint}</div>}
      {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
    </label>
  );
}
