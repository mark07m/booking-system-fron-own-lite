// TODO: Move to packages/ui/ after theme tokens are finalized
// This is a temporary placeholder to prevent import errors

import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export function Label({ 
  className = "", 
  children, 
  ...props 
}: LabelProps) {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}