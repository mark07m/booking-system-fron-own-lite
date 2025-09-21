"use client";

import React, { useEffect } from "react";
import { cn } from "../../utils/cn";

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
  duration?: number;
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  className?: string;
}

export function Toast({ 
  open, 
  message, 
  onClose, 
  duration = 2200,
  position = "bottom-right",
  className 
}: ToastProps) {
  useEffect(() => {
    if (!open) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  const positionClasses = {
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6", 
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
  };

  return (
    <div className={cn(
      "fixed z-[60] transition", 
      positionClasses[position],
      open ? "opacity-100" : "opacity-0 pointer-events-none",
      className
    )}> 
      <div className="rounded-xl bg-gray-900 text-white px-4 py-3 shadow-lg">
        {message}
      </div>
    </div>
  );
}
