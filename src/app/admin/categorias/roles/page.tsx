'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  UserCog,
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Users,
  Eye,
  Settings,
  Lock,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';

// Datos de ejemplo hardcodeados
const mockRoles = [
  {
    id: 1,
    nombre: 'Super Admin',
    descripcion: 'Acceso total al sistema sin restricciones',
    nivel: 1,
    usuarios: 1,
    color: '#DC2626',
    permisos: {
      usuarios: { ver: true, crear: true, editar: true, eliminar: true },
      empleados: { ver: true, crear: true, editar: true, eliminar: true },
      proyectos: { ver: true, crear: true, editar: true, eliminar: true },
      licencias: { ver: true, crear: true, editar: true, eliminar: true },
      noticias: { ver: true, crear: true, editar: true, eliminar: true },
      auditoria: { ver: true, crear: false, editar: false, eliminar: false },
      configuracion: { ver: true, crear: true, editar: true, eliminar: true },
    },
  },
  {
    id: 2,
    nombre: 'Admin',
    descripcion: 'Administrador con permisos amplios',
    nivel: 2,
    usuarios: 3,
    color: '#2563EB',
    permisos: {
      usuarios: { ver: true, crear: true, editar: true, eliminar: false },
      empleados: { ver: true, crear: true, editar: true, eliminar: true },
      proyectos: { ver: true, crear: true, editar: true, eliminar: true },
      licencias: { ver: true, crear: true, editar: true, eliminar: true },
      noticias: { ver: true, crear: true, editar: true, eliminar: true },
      auditoria: { ver: true, crear: false, editar: false, eliminar: false },
      configuracion: { ver: true, crear: false, editar: true, eliminar: false },
    },
  },
  {
    id: 3,
    nombre: 'RRHH Manager',
    descripcion: 'Gestor de Recursos Humanos',
    nivel: 3,
    usuarios: 2,
    color: '#16A34A',
    permisos: {
      usuarios: { ver: true, crear: false, editar: false, eliminar: false },
      empleados: { ver: true, crear: true, editar: true, eliminar: false },
      proyectos: { ver: true, crear: false, editar: false, eliminar: false },
      licencias: { ver: true, crear: true, editar: true, eliminar: true },
      noticias: { ver: true, crear: true, editar: true, eliminar: false },
      auditoria: { ver: false, crear: false, editar: false, eliminar: false },
      configuracion: { ver: false, crear: false, editar: false, eliminar: false },
    },
  },
  {
    id: 4,
    nombre: 'Project Manager',
    descripcion: 'Gestor de proyectos y equipos',
    nivel: 3,
    usuarios: 4,
    color: '#9333EA',
    permisos: {
      usuarios: { ver: true, crear: false, editar: false, eliminar: false },
      empleados: { ver: true, crear: false, editar: false, eliminar: false },
      proyectos: { ver: true, crear: true, editar: true, eliminar: false },
      licencias: { ver: true, crear: false, editar: false, eliminar: false },
      noticias: { ver: true, crear: true, editar: true, eliminar: false },
      auditoria: { ver: false, crear: false, editar: false, eliminar: false },
      configuracion: { ver: false, crear: false, editar: false, eliminar: false },
    },
  },
  {
    id: 5,
    nombre: 'Empleado',
    descripcion: 'Usuario empleado con acceso basico',
    nivel: 4,
    usuarios: 35,
    color: '#64748B',
    permisos: {
      usuarios: { ver: false, crear: false, editar: false, eliminar: false },
      empleados: { ver: false, crear: false, editar: false, eliminar: false },
      proyectos: { ver: true, crear: false, editar: false, eliminar: false },
      licencias: { ver: true, crear: true, editar: false, eliminar: false },
      noticias: { ver: true, crear: false, editar: false, eliminar: false },
      auditoria: { ver: false, crear: false, editar: false, eliminar: false },
      configuracion: { ver: false, crear: false, editar: false, eliminar: false },
    },
  },
  {
    id: 6,
    nombre: 'Visitante',
    descripcion: 'Usuario de solo lectura',
    nivel: 5,
    usuarios: 8,
    color: '#94A3B8',
    permisos: {
      usuarios: { ver: false, crear: false, editar: false, eliminar: false },
      empleados: { ver: false, crear: false, editar: false, eliminar: false },
      proyectos: { ver: true, crear: false, editar: false, eliminar: false },
      licencias: { ver: false, crear: false, editar: false, eliminar: false },
      noticias: { ver: true, crear: false, editar: false, eliminar: false },
      auditoria: { ver: false, crear: false, editar: false, eliminar: false },
      configuracion: { ver: false, crear: false, editar: false, eliminar: false },
    },
  },
];

const moduloIcons: Record<string, typeof Users> = {
  usuarios: Users,
  empleados: Users,
  proyectos: Settings,
  licencias: Shield,
  noticias: Eye,
  auditoria: Lock,
  configuracion: Settings,
};

const nivelConfig: Record<number, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof Shield }> = {
  1: { label: 'Nivel 1', variant: 'destructive', icon: ShieldAlert },
  2: { label: 'Nivel 2', variant: 'default', icon: ShieldCheck },
  3: { label: 'Nivel 3', variant: 'secondary', icon: Shield },
  4: { label: 'Nivel 4', variant: 'outline', icon: Shield },
  5: { label: 'Nivel 5', variant: 'outline', icon: Shield },
};

export default function RolesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedRoles, setExpandedRoles] = useState<Set<number>>(new Set());

  const filteredRoles = mockRoles.filter((rol) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      rol.nombre.toLowerCase().includes(term) ||
      rol.descripcion.toLowerCase().includes(term)
    );
  });

  const totalUsuarios = mockRoles.reduce((acc, r) => acc + r.usuarios, 0);

  const countPermisos = (permisos: Record<string, Record<string, boolean>>) => {
    let count = 0;
    Object.values(permisos).forEach((modulo) => {
      Object.values(modulo).forEach((valor) => {
        if (valor) count++;
      });
    });
    return count;
  };

  const toggleExpanded = (rolId: number) => {
    setExpandedRoles((prev) => {
      const next = new Set(prev);
      if (next.has(rolId)) {
        next.delete(rolId);
      } else {
        next.add(rolId);
      }
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Roles y Permisos</h1>
          <p className="text-muted-foreground">Gestion de roles y control de acceso</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Nuevo Rol
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <UserCog className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockRoles.length}</p>
                <p className="text-sm text-muted-foreground">Total Roles</p>
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
                <p className="text-2xl font-bold">{totalUsuarios}</p>
                <p className="text-sm text-muted-foreground">Usuarios Asignados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <ShieldAlert className="size-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockRoles.filter((r) => r.nivel <= 2).length}
                </p>
                <p className="text-sm text-muted-foreground">Roles Admin</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Shield className="size-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">7</p>
                <p className="text-sm text-muted-foreground">Modulos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCog className="size-5" />
            Lista de Roles
          </CardTitle>
          <CardDescription>
            Administra los roles y sus permisos asociados
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
              placeholder="Buscar rol..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Roles List */}
          {filteredRoles.length === 0 ? (
            <div className="text-center py-12">
              <UserCog className="size-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron roles</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredRoles.map((rol) => {
                const nivelCfg = nivelConfig[rol.nivel];
                const IconNivel = nivelCfg?.icon || Shield;
                const isExpanded = expandedRoles.has(rol.id);

                return (
                  <Collapsible
                    key={rol.id}
                    open={isExpanded}
                    onOpenChange={() => toggleExpanded(rol.id)}
                  >
                    <div className="border rounded-lg">
                      <CollapsibleTrigger asChild>
                        <button className="w-full px-4 py-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                          <div
                            className="size-10 rounded-lg flex items-center justify-center text-white shrink-0"
                            style={{ backgroundColor: rol.color }}
                          >
                            <IconNivel className="size-5" />
                          </div>
                          <div className="text-left flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-medium">{rol.nombre}</span>
                              <Badge variant={nivelCfg?.variant || 'outline'}>
                                {nivelCfg?.label || `Nivel ${rol.nivel}`}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{rol.descripcion}</p>
                          </div>
                          <div className="flex items-center gap-4 shrink-0">
                            <div className="text-right hidden sm:block">
                              <p className="text-sm font-medium">{rol.usuarios} usuarios</p>
                              <p className="text-xs text-muted-foreground">
                                {countPermisos(rol.permisos)} permisos
                              </p>
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="size-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Pencil className="size-4 mr-2" />
                                  Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-destructive"
                                  disabled={rol.nivel <= 2}
                                >
                                  <Trash2 className="size-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                            {isExpanded ? (
                              <ChevronDown className="size-4 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="size-4 text-muted-foreground" />
                            )}
                          </div>
                        </button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="px-4 pb-4 border-t">
                          <h4 className="text-sm font-medium my-4">Matriz de Permisos</h4>
                          <div className="rounded-md border overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="w-[150px]">Modulo</TableHead>
                                  <TableHead className="text-center">Ver</TableHead>
                                  <TableHead className="text-center">Crear</TableHead>
                                  <TableHead className="text-center">Editar</TableHead>
                                  <TableHead className="text-center">Eliminar</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {Object.entries(rol.permisos).map(([modulo, permisos]) => {
                                  const IconModulo = moduloIcons[modulo] || Settings;
                                  return (
                                    <TableRow key={modulo}>
                                      <TableCell className="font-medium capitalize">
                                        <div className="flex items-center gap-2">
                                          <IconModulo className="size-4 text-muted-foreground" />
                                          {modulo}
                                        </div>
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <Switch checked={permisos.ver} disabled />
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <Switch checked={permisos.crear} disabled />
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <Switch checked={permisos.editar} disabled />
                                      </TableCell>
                                      <TableCell className="text-center">
                                        <Switch checked={permisos.eliminar} disabled />
                                      </TableCell>
                                    </TableRow>
                                  );
                                })}
                              </TableBody>
                            </Table>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
