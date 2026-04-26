'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import PortalSidebar from "@/components/PortalSidebar";
import { PortalProvider } from "@/context/PortalContext";

export default function PortalLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <PortalProvider>
      <div className="flex h-screen bg-slate-50 overflow-hidden">
        {/* Sidebar exclusiva para o Portal */}
        <PortalSidebar />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 bg-slate-50">
            <div className="max-w-7xl mx-auto">
               {children}
            </div>
          </main>
        </div>
      </div>
    </PortalProvider>
  );
}
