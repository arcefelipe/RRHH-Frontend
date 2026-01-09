'use client';

import { AdminSidebar } from './_components/admin-sidebar';
import { AdminHeader } from './_components/admin-header';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Por ahora sin protección de autenticación
  return (
    <SidebarProvider className="bg-[#ff6859] dark:bg-[#2d3748] h-svh! max-h-svh! min-h-0! overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-col h-full w-full lg:p-2 overflow-hidden">
        <div className="lg:rounded-md flex flex-col flex-1 min-h-0 bg-background overflow-hidden">
          <AdminHeader />
          <main className="flex-1 overflow-auto p-4 sm:p-6 w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
