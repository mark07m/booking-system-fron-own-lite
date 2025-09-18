"use client";

import { useEffect, useState } from "react";

interface EnvErrorBoundaryProps {
  children: React.ReactNode;
}

export function EnvErrorBoundary({ children }: EnvErrorBoundaryProps) {
  const [envError, setEnvError] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === "undefined") return;

    // Check for missing public environment variables
    const requiredPublicVars = [
      "NEXT_PUBLIC_API_BASE_URL",
      "NEXT_PUBLIC_APP_NAME",
      "NEXT_PUBLIC_APP_URL",
    ];

    const missingVars = requiredPublicVars.filter((varName) => {
      const value = process.env[varName];
      return !value || value.trim() === "";
    });

    if (missingVars.length > 0) {
      setEnvError(
        `Missing required environment variables: ${missingVars.join(", ")}`
      );
    }
  }, []);

  if (envError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg
                className="h-8 w-8 text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-red-800">
                Environment Configuration Error
              </h3>
            </div>
          </div>
          
          <div className="text-sm text-red-700 mb-4">
            <p className="mb-2">
              The application cannot start due to missing or invalid environment variables.
            </p>
            <p className="font-medium">{envError}</p>
          </div>
          
          <div className="bg-red-100 rounded-md p-3">
            <h4 className="text-sm font-medium text-red-800 mb-2">
              To fix this issue:
            </h4>
            <ol className="text-sm text-red-700 list-decimal list-inside space-y-1">
              <li>Copy <code className="bg-red-200 px-1 rounded">.env.example</code> to <code className="bg-red-200 px-1 rounded">.env.local</code></li>
              <li>Fill in all required variables in <code className="bg-red-200 px-1 rounded">.env.local</code></li>
              <li>Restart the development server</li>
            </ol>
          </div>
          
          <div className="mt-4">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
