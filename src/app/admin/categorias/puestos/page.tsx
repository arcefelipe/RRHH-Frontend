'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Briefcase,
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Users,
} from 'lucide-react';

// Datos de ejemplo hardcodeados
const mockPuestos = [
  { id: 1, nombre: 'CEO', descripcion: 'Director Ejecutivo', departamento: 'Dirección', nivel: 'Ejecutivo', empleados: 1 },
  { id: 2, nombre: 'CTO', descripcion: 'Director de Tecnología', departamento: 'Dirección', nivel: 'Ejecutivo', empleados: 1 },
  { id: 3, nombre: 'Tech Lead', descripcion: 'Líder Técnico de equipo', departamento: 'Desarrollo', nivel: 'Senior', empleados: 2 },
  { id: 4, nombre: 'Senior Developer', descripcion: 'Desarrollador con experiencia', departamento: 'Desarrollo', nivel: 'Senior', empleados: 8 },
  { id: 5, nombre: 'Junior Developer', descripcion: 'Desarrollador en formación', departamento: 'Desarrollo', nivel: 'Junior', empleados: 12 },
  { id: 6, nombre: 'UX Designer', descripcion: 'Diseñador de experiencia de usuario', departamento: 'Diseño', nivel: 'Mid', empleados: 4 },
  { id: 7, nombre: 'Graphic Designer', descripcion: 'Diseñador gráfico', departamento: 'Diseño', nivel: 'Mid', empleados: 3 },
  { id: 8, nombre: 'HR Specialist', descripcion: 'Especialista en Recursos Humanos', departamento: 'RRHH', nivel: 'Mid', empleados: 2 },
  { id: 9, nombre: 'Marketing Manager', descripcion: 'Gerente de Marketing', departamento: 'Marketing', nivel: 'Senior', empleados: 1 },
  { id: 10, nombre: 'Support Engineer', descripcion: 'Ingeniero de Soporte', departamento: 'Soporte', nivel: 'Mid', empleados: 5 },
];

const nivelConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  Ejecutivo: { label: 'Ejecutivo', variant: 'destructive' },
  Senior: { label: 'Senior', variant: 'default' },
  Mid: { label: 'Mid', variant: 'secondary' },
  Junior: { label: 'Junior', variant: 'outline' },
};

export default function PuestosPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPuestos = mockPuestos.filter((puesto) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      puesto.nombre.toLowerCase().includes(term) ||
      puesto.descripcion.toLowerCase().includes(term) ||
      puesto.departamento.toLowerCase().includes(term)
    );
  });

  const totalEmpleados = mockPuestos.reduce((acc, p) => acc + p.empleados, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Puestos</h1>
          <p className="text-muted-foreground">Gestión de puestos de trabajo</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Nuevo Puesto
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Briefcase className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockPuestos.length}</p>
                <p className="text-sm text-muted-foreground">Total Puestos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Users className="size-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalEmpleados}</p>
                <p className="text-sm text-muted-foreground">Empleados Asignados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Briefcase className="size-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{new Set(mockPuestos.map(p => p.departamento)).size}</p>
                <p className="text-sm text-muted-foreground">Departamentos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Briefcase className="size-5" />
            Lista de Puestos
          </CardTitle>
          <CardDescription>
            Administra los puestos de trabajo de la empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar puesto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Puesto</TableHead>
                  <TableHead className="hidden sm:table-cell">Departamento</TableHead>
                  <TableHead>Nivel</TableHead>
                  <TableHead className="hidden md:table-cell">Empleados</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPuestos.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <Briefcase className="size-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No se encontraron puestos</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPuestos.map((puesto) => (
                    <TableRow key={puesto.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{puesto.nombre}</p>
                          <p className="text-sm text-muted-foreground">{puesto.descripcion}</p>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline">{puesto.departamento}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={nivelConfig[puesto.nivel]?.variant || 'outline'}>
                          {nivelConfig[puesto.nivel]?.label || puesto.nivel}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-1">
                          <Users className="size-4 text-muted-foreground" />
                          <span>{puesto.empleados}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="size-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Pencil className="size-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="size-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
