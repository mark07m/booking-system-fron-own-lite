"use client";

import React from "react";
import { cn } from "../../utils/cn";

interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  className?: string;
  striped?: boolean;
  hover?: boolean;
}

export function Table<T>({ 
  columns, 
  rows, 
  rowKey, 
  className,
  striped = true,
  hover = true 
}: TableProps<T>) {
  return (
    <div className={cn("overflow-auto rounded-xl border border-gray-200", className)}>
      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            {columns.map((column) => (
              <th 
                key={String(column.key)} 
                className={cn(
                  "px-3 py-2 text-left font-semibold whitespace-nowrap",
                  column.className
                )}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr 
              key={rowKey(row)} 
              className={cn(
                striped && "odd:bg-white even:bg-gray-50",
                hover && "hover:bg-gray-100 transition-colors"
              )}
            >
              {columns.map((column) => (
                <td 
                  key={String(column.key)} 
                  className={cn(
                    "px-3 py-2 whitespace-nowrap",
                    column.className
                  )}
                >
                  {column.render 
                    ? column.render((row as any)[column.key], row) 
                    : String((row as any)[column.key])
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
