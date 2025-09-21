"use client";

import React from "react";
import { cn } from "../../utils/cn";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, subtitle, children, className }: SectionProps) {
  return (
    <section className={cn("mb-10", className)}>
      <div className="mb-4">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className="rounded-2xl border border-gray-200 p-4 bg-white shadow-sm">{children}</div>
    </section>
  );
}
