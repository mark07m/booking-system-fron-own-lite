"use client";

import React from "react";
import { cn } from "../../utils/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizeClasses = {
  sm: "max-w-md",
  md: "max-w-lg", 
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({ 
  open, 
  onClose, 
  title, 
  children, 
  footer, 
  size = "md",
  className 
}: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={cn(
        "relative z-10 w-full rounded-2xl bg-white p-6 shadow-2xl",
        sizeClasses[size],
        className
      )}>
        {title && <h3 className="mb-4 text-lg font-semibold">{title}</h3>}
        <div className="max-h-[60vh] overflow-auto">{children}</div>
        {footer && <div className="mt-6 flex justify-end gap-3">{footer}</div>}
      </div>
    </div>
  );
}
