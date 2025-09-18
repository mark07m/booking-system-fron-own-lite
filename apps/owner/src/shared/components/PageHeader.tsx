"use client";

import { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Button } from "@shared/ui/Button";
import { cn } from "@shared/utils/cn";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: boolean;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ 
  title, 
  description, 
  breadcrumbs = true, 
  actions,
  className 
}: PageHeaderProps) {
  return (
    <div className={cn("mb-6", className)}>
      {breadcrumbs && (
        <div className="mb-4">
          <Breadcrumbs />
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              {description}
            </p>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center space-x-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
