"use client";

import React from "react";
import { cn } from "../../utils/cn";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  side?: "left" | "right";
  width?: string;
  className?: string;
}

export function Drawer({ 
  open, 
  onClose, 
  title, 
  children, 
  side = "right",
  width = "420px",
  className 
}: DrawerProps) {
  return (
    <div className={cn("fixed inset-0 z-40", open ? "pointer-events-auto" : "pointer-events-none")}> 
      <div 
        className={cn(
          "absolute inset-0 bg-black/30 transition-opacity", 
          open ? "opacity-100" : "opacity-0"
        )} 
        onClick={onClose} 
      />
      <div 
        className={cn(
          "absolute top-0 h-full max-w-full transform bg-white shadow-xl transition-transform",
          side === "right" ? "right-0" : "left-0",
          side === "right" 
            ? (open ? "translate-x-0" : "translate-x-full")
            : (open ? "translate-x-0" : "-translate-x-full"),
          className
        )}
        style={{ width }}
      >
        <div className="p-5 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button 
            className="text-gray-500 hover:text-gray-700 transition-colors" 
            onClick={onClose}
            aria-label="Закрыть"
          >
            ✖
          </button>
        </div>
        <div className="p-5 overflow-auto h-[calc(100%-64px)]">{children}</div>
      </div>
    </div>
  );
}
