"use client";

import React from "react";
import { cn } from "../../utils/cn";

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: string;
}

export function Breadcrumbs({ items, className, separator = "/" }: BreadcrumbsProps) {
  return (
    <nav className={cn("text-sm text-gray-500", className)} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={index} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 text-gray-400">{separator}</span>
          )}
          
          {item.current ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : (
            <a 
              href={item.href || '#'} 
              className="hover:underline transition-colors"
            >
              {item.label}
            </a>
          )}
        </span>
      ))}
    </nav>
  );
}
