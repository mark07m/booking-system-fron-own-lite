"use client";

import { useEffect } from "react";
import { Button } from "@/shared/ui/Button";
import { ExclamationTriangleIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Что-то пошло не так
          </h1>
          <p className="text-gray-600 mb-4">
            Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз.
          </p>
          {process.env.NODE_ENV === "development" && (
            <details className="text-left bg-gray-100 p-4 rounded-lg">
              <summary className="cursor-pointer font-medium text-gray-700">
                Детали ошибки
              </summary>
              <pre className="mt-2 text-xs text-gray-600 whitespace-pre-wrap">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </details>
          )}
        </div>
        
        <div className="space-y-4">
          <Button onClick={reset}>
            <ArrowPathIcon className="h-4 w-4 mr-2" />
            Попробовать снова
          </Button>
          
          <div>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/dashboard"}
            >
              На главную
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
