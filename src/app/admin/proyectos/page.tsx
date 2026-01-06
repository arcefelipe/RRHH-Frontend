'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  FolderKanban,
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Users,
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

// Datos de ejemplo hardcodeados
const mockProyectos = [
  {
    id: 1,
    nombre: 'Portal de Clientes v2.0',
    descripcion: 'Rediseño completo del portal de clientes con nuevas funcionalidades',
    cliente: 'Banco Nacional',
    estado: 'activo',
    progreso: 75,
    fecha_inicio: '2025-06-01',
    fecha_fin_estimada: '2026-03-15',
    equipo: [
      { id: 1, nombre: 'Juan', apellido: 'Pérez' },
      { id: 2, nombre: 'María', apellido: 'García' },
      { id: 5, nombre: 'Pedro', apellido: 'Sánchez' },
    ],
    tecnologias: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    id: 2,
    nombre: 'App Mobile Empleados',
    descripcion: 'Aplicación móvil para gestión de empleados y solicitudes',
    cliente: 'Interno',
    estado: 'activo',
    progreso: 45,
    fecha_inicio: '2025-09-01',
    fecha_fin_estimada: '2026-04-30',
    equipo: [
      { id: 7, nombre: 'Diego', apellido: 'López' },
      { id: 2, nombre: 'María', apellido: 'García' },
    ],
    tecnologias: ['React Native', 'TypeScript', 'Firebase'],
  },
  {
    id: 3,
    nombre: 'Sistema de Inventario',
    descripcion: 'Sistema de control de inventario para almacenes',
    cliente: 'Logística Express',
    estado: 'activo',
    progreso: 90,
    fecha_inicio: '2025-03-15',
    fecha_fin_estimada: '2026-01-31',
    equipo: [
      { id: 5, nombre: 'Pedro', apellido: 'Sánchez' },
      { id: 1, nombre: 'Juan', apellido: 'Pérez' },
      { id: 8, nombre: 'Valentina', apellido: 'Gómez' },
    ],
    tecnologias: ['Next.js', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 4,
    nombre: 'Dashboard Analytics',
    descripcion: 'Panel de análisis de datos y reportes ejecutivos',
    cliente: 'TechCorp',
    estado: 'completado',
    progreso: 100,
    fecha_inicio: '2025-01-10',
    fecha_fin_estimada: '2025-08-30',
    equipo: [
      { id: 3, nombre: 'Carlos', apellido: 'Rodríguez' },
      { id: 10, nombre: 'Camila', apellido: 'Ruiz' },
    ],
    tecnologias: ['Vue.js', 'Python', 'MongoDB'],
  },
  {
    id: 5,
    nombre: 'E-commerce Platform',
    descripcion: 'Plataforma de comercio electrónico B2B',
    cliente: 'Distribuidora Norte',
    estado: 'pausado',
    progreso: 30,
    fecha_inicio: '2025-07-01',
    fecha_fin_estimada: '2026-06-30',
    equipo: [
      { id: 1, nombre: 'Juan', apellido: 'Pérez' },
      { id: 7, nombre: 'Diego', apellido: 'López' },
    ],
    tecnologias: ['Next.js', 'Stripe', 'PostgreSQL'],
  },
  {
    id: 6,
    nombre: 'CRM Interno',
    descripcion: 'Sistema de gestión de relaciones con clientes',
    cliente: 'Interno',
    estado: 'activo',
    progreso: 60,
    fecha_inicio: '2025-08-15',
    fecha_fin_estimada: '2026-05-15',
    equipo: [
      { id: 5, nombre: 'Pedro', apellido: 'Sánchez' },
      { id: 4, nombre: 'Ana', apellido: 'Martínez' },
      { id: 2, nombre: 'María', apellido: 'García' },
    ],
    tecnologias: ['React', 'NestJS', 'MySQL'],
  },
];

const estadoConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof CheckCircle2 }> = {
  activo: { label: 'Activo', variant: 'default', icon: TrendingUp },
  completado: { label: 'Completado', variant: 'secondary', icon: CheckCircle2 },
  pausado: { label: 'Pausado', variant: 'outline', icon: Clock },
  cancelado: { label: 'Cancelado', variant: 'destructive', icon: AlertCircle },
};

export default function ProyectosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('Todos');

  const filteredProyectos = useMemo(() => {
    let result = [...mockProyectos];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(term) ||
          p.cliente.toLowerCase().includes(term) ||
          p.descripcion.toLowerCase().includes(term)
      );
    }

    if (filterEstado !== 'Todos') {
      result = result.filter((p) => p.estado === filterEstado.toLowerCase());
    }

    return result;
  }, [searchTerm, filterEstado]);

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Proyectos</h1>
          <p className="text-muted-foreground">Gestión de proyectos de la empresa</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Nuevo Proyecto
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FolderKanban className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockProyectos.length}</p>
                <p className="text-sm text-muted-foreground">Total Proyectos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <TrendingUp className="size-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockProyectos.filter(p => p.estado === 'activo').length}</p>
                <p className="text-sm text-muted-foreground">Activos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <CheckCircle2 className="size-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockProyectos.filter(p => p.estado === 'completado').length}</p>
                <p className="text-sm text-muted-foreground">Completados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <Users className="size-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {new Set(mockProyectos.flatMap(p => p.equipo.map(e => e.id))).size}
                </p>
                <p className="text-sm text-muted-foreground">Personas Asignadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Buscar proyecto o cliente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterEstado} onValueChange={setFilterEstado}>
          <SelectTrigger className="w-full sm:w-45">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Todos">Todos</SelectItem>
            <SelectItem value="Activo">Activos</SelectItem>
            <SelectItem value="Completado">Completados</SelectItem>
            <SelectItem value="Pausado">Pausados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredProyectos.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FolderKanban className="size-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron proyectos</p>
            </CardContent>
          </Card>
        ) : (
          filteredProyectos.map((proyecto) => {
            const config = estadoConfig[proyecto.estado];
            const IconEstado = config?.icon || FolderKanban;

            return (
              <Card key={proyecto.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 flex-1 min-w-0">
                      <CardTitle className="text-lg truncate">{proyecto.nombre}</CardTitle>
                      <CardDescription className="line-clamp-2">{proyecto.descripcion}</CardDescription>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="size-4 mr-2" />
                          Ver detalle
                        </DropdownMenuItem>
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
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Estado y Cliente */}
                  <div className="flex items-center justify-between">
                    <Badge variant={config?.variant || 'outline'} className="gap-1">
                      <IconEstado className="size-3" />
                      {config?.label || proyecto.estado}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{proyecto.cliente}</span>
                  </div>

                  {/* Progreso */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progreso</span>
                      <span className="font-medium">{proyecto.progreso}%</span>
                    </div>
                    <Progress value={proyecto.progreso} className="h-2" />
                  </div>

                  {/* Fechas */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="size-3" />
                      <span>{formatFecha(proyecto.fecha_inicio)}</span>
                    </div>
                    <span>→</span>
                    <span>{formatFecha(proyecto.fecha_fin_estimada)}</span>
                  </div>

                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-1">
                    {proyecto.tecnologias.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Equipo */}
                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex -space-x-2">
                      {proyecto.equipo.slice(0, 4).map((miembro) => (
                        <Avatar key={miembro.id} className="size-8 border-2 border-background">
                          <AvatarFallback className="text-xs">
                            {getInitials(miembro.nombre, miembro.apellido)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {proyecto.equipo.length > 4 && (
                        <div className="flex items-center justify-center size-8 rounded-full bg-muted border-2 border-background text-xs font-medium">
                          +{proyecto.equipo.length - 4}
                        </div>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {proyecto.equipo.length} miembro{proyecto.equipo.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
