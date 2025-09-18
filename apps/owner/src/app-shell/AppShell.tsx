"use client";

import { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { useUIStore } from "@/src/shared/state/ui.store";
import { NotificationContainer } from "@/src/shared/components/NotificationContainer";
import { NotificationsModal } from "@/src/shared/components/NotificationsModal";
import { QuickActionsModal } from "@/src/shared/components/QuickActionsModal";
import { cn } from "@/src/shared/utils/cn";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // On desktop, keep sidebar state
        return;
      } else {
        // On mobile, close sidebar
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setSidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main content area */}
      <div 
        className={cn(
          "flex flex-col min-h-screen transition-all duration-300 ease-in-out",
          sidebarOpen ? "lg:ml-64" : "ml-0"
        )}
      >
        {/* Topbar */}
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Main content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="container mx-auto px-4 py-6 lg:px-6">
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Notifications */}
      <NotificationContainer />
      
      {/* Modals */}
      <NotificationsModal />
      <QuickActionsModal />
      
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
