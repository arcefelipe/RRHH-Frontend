'use client';

import { Header, Footer } from "@/components/layout";
import { useRequireAuth } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isHydrated } = useRequireAuth();

  if (!isHydrated || !isAuthenticated) {
    return (
      <div className="min-h-svh flex flex-col">
        <Header />
        <main id="main-content" className="flex-1 flex items-center justify-center" tabIndex={-1}>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-svh flex flex-col">
      <Header />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
