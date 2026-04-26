'use client';

import { usePathname } from 'next/navigation';
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AppContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Se estiver numa rota do portal ou login, não renderiza o Header e Sidebar globais
  const isExcludedRoute = pathname.startsWith('/portal') || pathname === '/login';

  if (isExcludedRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
