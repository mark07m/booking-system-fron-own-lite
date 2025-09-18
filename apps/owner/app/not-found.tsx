import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-200">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Страница не найдена
          </h2>
          <p className="text-gray-600">
            Извините, мы не смогли найти страницу, которую вы ищете.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild>
            <Link href="/dashboard">
              <HomeIcon className="h-4 w-4 mr-2" />
              На главную
            </Link>
          </Button>
          
          <div>
            <Button variant="outline" onClick={() => window.history.back()}>
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Назад
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
