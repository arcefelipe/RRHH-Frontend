'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Layers, Cpu, UserCog } from 'lucide-react';
import Link from 'next/link';

const categorias = [
  {
    title: 'Puestos',
    description: 'Gestiona los puestos de trabajo',
    href: '/admin/categorias/puestos',
    icon: Briefcase,
  },
  {
    title: 'Recursos Por Proyecto',
    description: 'Asignacion de recursos a proyectos',
    href: '/admin/categorias/recursos-proyecto',
    icon: Layers,
  },
  {
    title: 'Tecnologias',
    description: 'Stack tecnologico de la empresa',
    href: '/admin/categorias/tecnologias',
    icon: Cpu,
  },
  {
    title: 'Roles',
    description: 'Roles y permisos del sistema',
    href: '/admin/categorias/roles',
    icon: UserCog,
  },
];

export default function CategoriasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Categorias</h1>
        <p className="text-muted-foreground">Administra las categorias del sistema</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {categorias.map((cat) => (
          <Link key={cat.href} href={cat.href}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <cat.icon className="size-5" />
                  {cat.title}
                </CardTitle>
                <CardDescription>{cat.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
