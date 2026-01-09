'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { NuevoEmpleadoDialog, DetalleEmpleadoDialog } from './_components';
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Users,
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Eye,
  Mail,
  Building2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertCircle,
  RefreshCw,
  UserX,
  UserCheck,
} from 'lucide-react';
import { empleadosService } from '@/lib/services/empleados.service';
import type { EmpleadoListadoDto } from '@/types/empleados';
import { EstadoEmpleado, estadoEmpleadoLabels, estadoEmpleadoVariants } from '@/types/empleados';
import { toast } from 'sonner';

export default function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<EmpleadoListadoDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState<string>('todos');
  const [incluirInactivos, setIncluirInactivos] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detalleDialogOpen, setDetalleDialogOpen] = useState(false);
  const [selectedEmpleadoId, setSelectedEmpleadoId] = useState<number | null>(null);
  const itemsPerPage = 5;

  const fetchEmpleados = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await empleadosService.getAll(incluirInactivos);
      setEmpleados(data);
    } catch (err) {
      console.error('Error al cargar empleados:', err);
      setError('No se pudieron cargar los empleados. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  }, [incluirInactivos]);

  useEffect(() => {
    fetchEmpleados();
  }, [fetchEmpleados]);

  const filteredEmpleados = useMemo(() => {
    let result = [...empleados];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (emp) =>
          emp.nombre?.toLowerCase().includes(term) ||
          emp.apellido?.toLowerCase().includes(term) ||
          emp.email?.toLowerCase().includes(term)
      );
    }

    if (filterEstado !== 'todos') {
      const estadoNum = parseInt(filterEstado);
      result = result.filter((emp) => emp.estado === estadoNum);
    }

    return result;
  }, [empleados, searchTerm, filterEstado]);

  const totalPages = Math.ceil(filteredEmpleados.length / itemsPerPage);
  const paginatedEmpleados = filteredEmpleados.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Stats
  const stats = useMemo(() => ({
    total: empleados.length,
    activos: empleados.filter(e => e.estado === EstadoEmpleado.Activo).length,
    enLicencia: empleados.filter(e => e.estado === EstadoEmpleado.Licencia).length,
    proyectos: new Set(empleados.filter(e => e.proyecto).map(e => e.proyecto)).size,
  }), [empleados]);

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

  const handleDesactivar = async (id: number) => {
    try {
      await empleadosService.desactivar(id);
      toast.success('Empleado desactivado correctamente');
      fetchEmpleados();
    } catch (err) {
      console.error('Error al desactivar empleado:', err);
      toast.error('Error al desactivar el empleado');
    }
  };

  const handleReactivar = async (id: number) => {
    try {
      await empleadosService.reactivar(id);
      toast.success('Empleado reactivado correctamente');
      fetchEmpleados();
    } catch (err) {
      console.error('Error al reactivar empleado:', err);
      toast.error('Error al reactivar el empleado');
    }
  };

  const handleEmpleadoCreado = () => {
    fetchEmpleados();
    setDialogOpen(false);
  };

  const handleVerDetalle = (id: number) => {
    setSelectedEmpleadoId(id);
    setDetalleDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Cargando empleados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="size-12 text-destructive" />
          <div>
            <p className="font-medium text-destructive">Error al cargar empleados</p>
            <p className="text-sm text-muted-foreground mt-1">{error}</p>
          </div>
          <Button onClick={fetchEmpleados} variant="outline" className="gap-2">
            <RefreshCw className="size-4" />
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Empleados</h1>
          <p className="text-muted-foreground">Gestión del personal de la empresa</p>
        </div>
        <Button className="gap-2" onClick={() => setDialogOpen(true)}>
          <Plus className="size-4" />
          Nuevo Empleado
        </Button>
      </div>

      <NuevoEmpleadoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSuccess={handleEmpleadoCreado}
      />

      <DetalleEmpleadoDialog
        open={detalleDialogOpen}
        onOpenChange={setDetalleDialogOpen}
        empleadoId={selectedEmpleadoId}
        onUpdate={fetchEmpleados}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Empleados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Users className="size-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.activos}</p>
                <p className="text-sm text-muted-foreground">Activos</p>
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
                <p className="text-2xl font-bold">{stats.enLicencia}</p>
                <p className="text-sm text-muted-foreground">En Licencia</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Building2 className="size-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.proyectos}</p>
                <p className="text-sm text-muted-foreground">Proyectos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="size-5" />
            Lista de Empleados
          </CardTitle>
          <CardDescription>
            Administra la información de los empleados de la empresa
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
            </div>
            <Select
              value={filterEstado}
              onValueChange={(v) => {
                setFilterEstado(v);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-40" aria-label="Filtrar por estado">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value={String(EstadoEmpleado.Activo)}>Activos</SelectItem>
                <SelectItem value={String(EstadoEmpleado.Licencia)}>En Licencia</SelectItem>
                <SelectItem value={String(EstadoEmpleado.Inactivo)}>Inactivos</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant={incluirInactivos ? 'default' : 'outline'}
              onClick={() => setIncluirInactivos(!incluirInactivos)}
              className="gap-2"
            >
              {incluirInactivos ? <UserCheck className="size-4" /> : <UserX className="size-4" />}
              {incluirInactivos ? 'Mostrando inactivos' : 'Mostrar inactivos'}
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empleado</TableHead>
                  <TableHead className="hidden md:table-cell">Contacto</TableHead>
                  <TableHead className="hidden sm:table-cell">Proyecto</TableHead>
                  <TableHead className="hidden lg:table-cell">Ingreso</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedEmpleados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <Users className="size-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No se encontraron empleados</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedEmpleados.map((empleado) => (
                    <TableRow key={empleado.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{getInitials(empleado.nombre, empleado.apellido)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{empleado.nombre} {empleado.apellido}</p>
                            <p className="text-sm text-muted-foreground">{empleado.puesto || 'Sin puesto'}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="size-3 text-muted-foreground" />
                          {empleado.email || '-'}
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline">{empleado.proyecto || 'Sin asignar'}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {formatFecha(empleado.fechaIngreso)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={estadoEmpleadoVariants[empleado.estado]}>
                          {estadoEmpleadoLabels[empleado.estado]}
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
                            <DropdownMenuItem onClick={() => handleVerDetalle(empleado.id)}>
                              <Eye className="size-4 mr-2" />
                              Ver detalle
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Pencil className="size-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            {empleado.estado === EstadoEmpleado.Inactivo ? (
                              <DropdownMenuItem onClick={() => handleReactivar(empleado.id)}>
                                <UserCheck className="size-4 mr-2" />
                                Reactivar
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem
                                onClick={() => handleDesactivar(empleado.id)}
                                className="text-destructive"
                              >
                                <UserX className="size-4 mr-2" />
                                Desactivar
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
                {Math.min(currentPage * itemsPerPage, filteredEmpleados.length)} de{' '}
                {filteredEmpleados.length} empleados
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
                {(() => {
                  const pages: (number | string)[] = [];
                  const maxVisible = 5;

                  if (totalPages <= maxVisible + 2) {
                    // Mostrar todas las páginas si son pocas
                    for (let i = 1; i <= totalPages; i++) pages.push(i);
                  } else {
                    // Siempre mostrar primera página
                    pages.push(1);

                    // Calcular rango alrededor de la página actual
                    let start = Math.max(2, currentPage - 1);
                    let end = Math.min(totalPages - 1, currentPage + 1);

                    // Ajustar para mantener al menos 3 páginas en el medio
                    if (currentPage <= 3) {
                      end = Math.min(totalPages - 1, 4);
                    } else if (currentPage >= totalPages - 2) {
                      start = Math.max(2, totalPages - 3);
                    }

                    // Agregar elipsis antes si es necesario
                    if (start > 2) pages.push('...');

                    // Agregar páginas del medio
                    for (let i = start; i <= end; i++) pages.push(i);

                    // Agregar elipsis después si es necesario
                    if (end < totalPages - 1) pages.push('...');

                    // Siempre mostrar última página
                    pages.push(totalPages);
                  }

                  return pages.map((page, idx) => (
                    typeof page === 'string' ? (
                      <span key={`ellipsis-${idx}`} className="px-2 text-muted-foreground">...</span>
                    ) : (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    )
                  ));
                })()}
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
