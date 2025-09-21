"use client";

import React from "react";
import { cn } from "../../utils/cn";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Switch({ checked, onChange, label, disabled = false, className }: SwitchProps) {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={cn(
        "inline-flex items-center rounded-full p-1 transition",
        checked ? "bg-blue-600" : "bg-gray-300",
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        className
      )}
      aria-pressed={checked}
    >
      <span 
        className={cn(
          "h-5 w-5 rounded-full bg-white shadow transition", 
          checked ? "translate-x-5" : "translate-x-0"
        )} 
      />
      {label && <span className="ml-3 text-sm text-gray-700">{label}</span>}
    </button>
  );
}
