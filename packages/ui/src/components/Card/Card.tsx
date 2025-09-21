"use client";

import React from "react";
import { cn } from "../../utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("rounded-2xl border border-gray-200 bg-white shadow-sm", className)}>
      {children}
    </div>
  );
}
