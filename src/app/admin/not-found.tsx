'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion, Home, ArrowLeft } from 'lucide-react';

export default function AdminNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
      <div className="rounded-full bg-muted p-6">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
      </div>
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-2">Pagina no encontrada</h2>
        <p className="text-muted-foreground">
          La pagina que buscas no existe o ha sido movida.
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/admin">
            <Home className="size-4 mr-2" />
            Ir al Dashboard
          </Link>
        </Button>
        <Button onClick={() => window.history.back()}>
          <ArrowLeft className="size-4 mr-2" />
          Volver atras
        </Button>
      </div>
    </div>
  );
}
