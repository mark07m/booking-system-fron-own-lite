"use client";

import React from "react";
import { cn } from "../../utils/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({ label, hint, error, className, ...props }: InputProps) {
  return (
    <label className="block">
      {label && <div className="mb-1 text-sm font-medium text-gray-700">{label}</div>}
      <input
        {...props}
        className={cn(
          "w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
          error && "border-red-500 focus:border-red-500 focus:ring-red-200",
          className
        )}
      />
      {hint && <div className="mt-1 text-xs text-gray-500">{hint}</div>}
      {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
    </label>
  );
}
