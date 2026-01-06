'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  CalendarDays,
  Search,
  Plus,
  MoreHorizontal,
  Check,
  X,
  Eye,
  Clock,
  CheckCircle2,
  XCircle,
  CalendarRange,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Datos de ejemplo hardcodeados
const mockLicencias = [
  {
    id: 1,
    empleado: { id: 1, nombre: 'Juan Carlos', apellido: 'Pérez González' },
    tipo: 'vacaciones',
    fecha_inicio: '2026-01-15',
    fecha_fin: '2026-01-22',
    dias: 6,
    motivo: 'Vacaciones de verano',
    estado: 'aprobada',
    fecha_solicitud: '2025-12-20',
  },
  {
    id: 2,
    empleado: { id: 2, nombre: 'María Laura', apellido: 'García López' },
    tipo: 'personal',
    fecha_inicio: '2026-01-10',
    fecha_fin: '2026-01-10',
    dias: 1,
    motivo: 'Trámite personal',
    estado: 'pendiente',
    fecha_solicitud: '2026-01-05',
  },
  {
    id: 3,
    empleado: { id: 3, nombre: 'Carlos Alberto', apellido: 'Rodríguez Martín' },
    tipo: 'enfermedad',
    fecha_inicio: '2026-01-08',
    fecha_fin: '2026-01-12',
    dias: 5,
    motivo: 'Reposo médico',
    estado: 'aprobada',
    fecha_solicitud: '2026-01-07',
  },
  {
    id: 4,
    empleado: { id: 4, nombre: 'Ana Sofía', apellido: 'Martínez Ruiz' },
    tipo: 'vacaciones',
    fecha_inicio: '2026-01-20',
    fecha_fin: '2026-02-03',
    dias: 11,
    motivo: 'Viaje familiar',
    estado: 'pendiente',
    fecha_solicitud: '2026-01-02',
  },
  {
    id: 5,
    empleado: { id: 6, nombre: 'Laura Elena', apellido: 'Fernández Torres' },
    tipo: 'maternidad',
    fecha_inicio: '2026-02-01',
    fecha_fin: '2026-05-01',
    dias: 90,
    motivo: 'Licencia por maternidad',
    estado: 'aprobada',
    fecha_solicitud: '2025-11-15',
  },
  {
    id: 6,
    empleado: { id: 5, nombre: 'Pedro José', apellido: 'Sánchez Díaz' },
    tipo: 'personal',
    fecha_inicio: '2026-01-25',
    fecha_fin: '2026-01-25',
    dias: 1,
    motivo: 'Mudanza',
    estado: 'pendiente',
    fecha_solicitud: '2026-01-04',
  },
  {
    id: 7,
    empleado: { id: 7, nombre: 'Diego Martín', apellido: 'López Vargas' },
    tipo: 'estudio',
    fecha_inicio: '2026-02-10',
    fecha_fin: '2026-02-14',
    dias: 5,
    motivo: 'Exámenes universitarios',
    estado: 'rechazada',
    fecha_solicitud: '2026-01-03',
  },
  {
    id: 8,
    empleado: { id: 8, nombre: 'Valentina', apellido: 'Gómez Silva' },
    tipo: 'vacaciones',
    fecha_inicio: '2026-03-01',
    fecha_fin: '2026-03-15',
    dias: 11,
    motivo: 'Vacaciones de marzo',
    estado: 'aprobada',
    fecha_solicitud: '2025-12-28',
  },
];

const tipoConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  vacaciones: { label: 'Vacaciones', variant: 'default' },
  enfermedad: { label: 'Enfermedad', variant: 'secondary' },
  personal: { label: 'Personal', variant: 'outline' },
  maternidad: { label: 'Maternidad', variant: 'default' },
  paternidad: { label: 'Paternidad', variant: 'default' },
  estudio: { label: 'Estudio', variant: 'secondary' },
  otro: { label: 'Otro', variant: 'outline' },
};

const estadoConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof Clock }> = {
  pendiente: { label: 'Pendiente', variant: 'secondary', icon: Clock },
  aprobada: { label: 'Aprobada', variant: 'default', icon: CheckCircle2 },
  rechazada: { label: 'Rechazada', variant: 'destructive', icon: XCircle },
};

export default function LicenciasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTipo, setFilterTipo] = useState('Todos');
  const [filterEstado, setFilterEstado] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredLicencias = useMemo(() => {
    let result = [...mockLicencias];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (l) =>
          l.empleado.nombre.toLowerCase().includes(term) ||
          l.empleado.apellido.toLowerCase().includes(term) ||
          l.motivo.toLowerCase().includes(term)
      );
    }

    if (filterTipo !== 'Todos') {
      result = result.filter((l) => l.tipo === filterTipo.toLowerCase());
    }

    if (filterEstado !== 'Todos') {
      result = result.filter((l) => l.estado === filterEstado.toLowerCase());
    }

    return result;
  }, [searchTerm, filterTipo, filterEstado]);

  const totalPages = Math.ceil(filteredLicencias.length / itemsPerPage);
  const paginatedLicencias = filteredLicencias.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  // Stats
  const totalPendientes = mockLicencias.filter(l => l.estado === 'pendiente').length;
  const totalAprobadas = mockLicencias.filter(l => l.estado === 'aprobada').length;
  const diasTotalesAprobados = mockLicencias
    .filter(l => l.estado === 'aprobada')
    .reduce((acc, l) => acc + l.dias, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Licencias</h1>
          <p className="text-muted-foreground">Gestión de licencias y permisos</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Nueva Solicitud
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <CalendarDays className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockLicencias.length}</p>
                <p className="text-sm text-muted-foreground">Total Solicitudes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <Clock className="size-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalPendientes}</p>
                <p className="text-sm text-muted-foreground">Pendientes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <CheckCircle2 className="size-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalAprobadas}</p>
                <p className="text-sm text-muted-foreground">Aprobadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <CalendarRange className="size-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{diasTotalesAprobados}</p>
                <p className="text-sm text-muted-foreground">Días Aprobados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="size-5" />
            Solicitudes de Licencia
          </CardTitle>
          <CardDescription>
            Administra las solicitudes de licencia del personal
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por empleado o motivo..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <Select
              value={filterTipo}
              onValueChange={(v) => {
                setFilterTipo(v);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos los tipos</SelectItem>
                <SelectItem value="Vacaciones">Vacaciones</SelectItem>
                <SelectItem value="Enfermedad">Enfermedad</SelectItem>
                <SelectItem value="Personal">Personal</SelectItem>
                <SelectItem value="Maternidad">Maternidad</SelectItem>
                <SelectItem value="Estudio">Estudio</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filterEstado}
              onValueChange={(v) => {
                setFilterEstado(v);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[160px]">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="Pendiente">Pendientes</SelectItem>
                <SelectItem value="Aprobada">Aprobadas</SelectItem>
                <SelectItem value="Rechazada">Rechazadas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empleado</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="hidden md:table-cell">Período</TableHead>
                  <TableHead className="hidden sm:table-cell">Días</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLicencias.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <CalendarDays className="size-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No se encontraron solicitudes</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedLicencias.map((licencia) => {
                    const estadoCfg = estadoConfig[licencia.estado];
                    const IconEstado = estadoCfg?.icon || Clock;

                    return (
                      <TableRow key={licencia.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {getInitials(licencia.empleado.nombre, licencia.empleado.apellido)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {licencia.empleado.nombre} {licencia.empleado.apellido}
                              </p>
                              <p className="text-sm text-muted-foreground line-clamp-1">
                                {licencia.motivo}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={tipoConfig[licencia.tipo]?.variant || 'outline'}>
                            {tipoConfig[licencia.tipo]?.label || licencia.tipo}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell text-muted-foreground">
                          {formatFecha(licencia.fecha_inicio)} - {formatFecha(licencia.fecha_fin)}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <span className="font-medium">{licencia.dias}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={estadoCfg?.variant || 'outline'} className="gap-1">
                            <IconEstado className="size-3" />
                            {estadoCfg?.label || licencia.estado}
                          </Badge>
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
                                <Eye className="size-4 mr-2" />
                                Ver detalle
                              </DropdownMenuItem>
                              {licencia.estado === 'pendiente' && (
                                <>
                                  <DropdownMenuItem className="text-green-600">
                                    <Check className="size-4 mr-2" />
                                    Aprobar
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-destructive">
                                    <X className="size-4 mr-2" />
                                    Rechazar
                                  </DropdownMenuItem>
                                </>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
                {Math.min(currentPage * itemsPerPage, filteredLicencias.length)} de{' '}
                {filteredLicencias.length} solicitudes
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
