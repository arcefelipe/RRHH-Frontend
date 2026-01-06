'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers } from 'lucide-react';

export default function RecursosProyectoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Recursos Por Proyecto</h1>
        <p className="text-muted-foreground">Asignacion de recursos a proyectos</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="size-5" />
            Recursos Asignados
          </CardTitle>
          <CardDescription>
            Administra la asignacion de empleados a proyectos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Layers className="size-16 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              Proximamente podras asignar recursos a proyectos aqui.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
