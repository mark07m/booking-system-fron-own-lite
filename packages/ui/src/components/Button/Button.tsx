"use client";

import React from "react";
import { cn } from "../../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  asChild?: boolean;
}

function Button({ 
  children, 
  variant = "primary", 
  size = "md", 
  loading = false,
  className,
  disabled,
  type = "button",
  asChild = false,
  ...props 
}: ButtonProps): React.ReactElement {
    const base = "inline-flex items-center justify-center rounded-xl font-medium transition active:scale-[.98] focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm", 
      lg: "h-12 px-5 text-base",
    } as const;
    
    const variants = {
      primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
      secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300",
      ghost: "bg-transparent text-gray-800 hover:bg-gray-100 border border-gray-200",
      outline: "bg-transparent text-gray-800 hover:bg-gray-100 border border-gray-200",
      danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
    } as const;

    if (asChild) {
      return React.createElement(
        "span",
        {
          className: cn(
            base, 
            sizes[size], 
            variants[variant], 
            loading && "opacity-80 cursor-wait",
            className
          ),
          ...props
        },
        loading && React.createElement("span", { className: "mr-2 animate-spin" }, "⏳"),
        children
      );
    }

    return React.createElement(
      "button",
      {
        type,
        disabled: disabled || loading,
        className: cn(
          base, 
          sizes[size], 
          variants[variant], 
          loading && "opacity-80 cursor-wait",
          className
        ),
        ...props
      },
      loading && React.createElement("span", { className: "mr-2 animate-spin" }, "⏳"),
      children
    );
}

Button.displayName = "Button";

export { Button };
