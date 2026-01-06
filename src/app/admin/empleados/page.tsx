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
  Users,
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Mail,
  Phone,
  Building2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

// Datos de ejemplo hardcodeados
const mockEmpleados = [
  {
    id: 1,
    nombre: 'Juan Carlos',
    apellido: 'Pérez González',
    email: 'juan.perez@americavirtual.com',
    telefono: '+54 11 4567-8901',
    departamento: 'Desarrollo',
    puesto: 'Senior Developer',
    fecha_ingreso: '2022-03-15',
    estado: 'activo',
  },
  {
    id: 2,
    nombre: 'María Laura',
    apellido: 'García López',
    email: 'maria.garcia@americavirtual.com',
    telefono: '+54 11 4567-8902',
    departamento: 'Diseño',
    puesto: 'UX Designer',
    fecha_ingreso: '2021-08-01',
    estado: 'activo',
  },
  {
    id: 3,
    nombre: 'Carlos Alberto',
    apellido: 'Rodríguez Martín',
    email: 'carlos.rodriguez@americavirtual.com',
    telefono: '+54 11 4567-8903',
    departamento: 'Marketing',
    puesto: 'Marketing Manager',
    fecha_ingreso: '2020-01-10',
    estado: 'activo',
  },
  {
    id: 4,
    nombre: 'Ana Sofía',
    apellido: 'Martínez Ruiz',
    email: 'ana.martinez@americavirtual.com',
    telefono: '+54 11 4567-8904',
    departamento: 'RRHH',
    puesto: 'HR Specialist',
    fecha_ingreso: '2023-02-20',
    estado: 'activo',
  },
  {
    id: 5,
    nombre: 'Pedro José',
    apellido: 'Sánchez Díaz',
    email: 'pedro.sanchez@americavirtual.com',
    telefono: '+54 11 4567-8905',
    departamento: 'Desarrollo',
    puesto: 'Tech Lead',
    fecha_ingreso: '2019-06-01',
    estado: 'activo',
  },
  {
    id: 6,
    nombre: 'Laura Elena',
    apellido: 'Fernández Torres',
    email: 'laura.fernandez@americavirtual.com',
    telefono: '+54 11 4567-8906',
    departamento: 'Finanzas',
    puesto: 'Contadora',
    fecha_ingreso: '2021-11-15',
    estado: 'licencia',
  },
  {
    id: 7,
    nombre: 'Diego Martín',
    apellido: 'López Vargas',
    email: 'diego.lopez@americavirtual.com',
    telefono: '+54 11 4567-8907',
    departamento: 'Desarrollo',
    puesto: 'Junior Developer',
    fecha_ingreso: '2024-01-08',
    estado: 'activo',
  },
  {
    id: 8,
    nombre: 'Valentina',
    apellido: 'Gómez Silva',
    email: 'valentina.gomez@americavirtual.com',
    telefono: '+54 11 4567-8908',
    departamento: 'Soporte',
    puesto: 'Support Engineer',
    fecha_ingreso: '2023-07-01',
    estado: 'activo',
  },
  {
    id: 9,
    nombre: 'Martín',
    apellido: 'Hernández Castro',
    email: 'martin.hernandez@americavirtual.com',
    telefono: '+54 11 4567-8909',
    departamento: 'Operaciones',
    puesto: 'Operations Manager',
    fecha_ingreso: '2020-05-20',
    estado: 'inactivo',
  },
  {
    id: 10,
    nombre: 'Camila',
    apellido: 'Ruiz Moreno',
    email: 'camila.ruiz@americavirtual.com',
    telefono: '+54 11 4567-8910',
    departamento: 'Diseño',
    puesto: 'Graphic Designer',
    fecha_ingreso: '2022-09-10',
    estado: 'activo',
  },
];

const departamentos = ['Todos', 'Desarrollo', 'Diseño', 'Marketing', 'RRHH', 'Finanzas', 'Soporte', 'Operaciones'];

const estadoConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  activo: { label: 'Activo', variant: 'default' },
  licencia: { label: 'En Licencia', variant: 'secondary' },
  inactivo: { label: 'Inactivo', variant: 'destructive' },
};

export default function EmpleadosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartamento, setFilterDepartamento] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredEmpleados = useMemo(() => {
    let result = [...mockEmpleados];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (emp) =>
          emp.nombre.toLowerCase().includes(term) ||
          emp.apellido.toLowerCase().includes(term) ||
          emp.email.toLowerCase().includes(term)
      );
    }

    if (filterDepartamento !== 'Todos') {
      result = result.filter((emp) => emp.departamento === filterDepartamento);
    }

    return result;
  }, [searchTerm, filterDepartamento]);

  const totalPages = Math.ceil(filteredEmpleados.length / itemsPerPage);
  const paginatedEmpleados = filteredEmpleados.slice(
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Empleados</h1>
          <p className="text-muted-foreground">Gestión del personal de la empresa</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Nuevo Empleado
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockEmpleados.length}</p>
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
                <p className="text-2xl font-bold">{mockEmpleados.filter(e => e.estado === 'activo').length}</p>
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
                <p className="text-2xl font-bold">{mockEmpleados.filter(e => e.estado === 'licencia').length}</p>
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
                <p className="text-2xl font-bold">{new Set(mockEmpleados.map(e => e.departamento)).size}</p>
                <p className="text-sm text-muted-foreground">Departamentos</p>
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
              value={filterDepartamento}
              onValueChange={(v) => {
                setFilterDepartamento(v);
                setCurrentPage(1);
              }}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Departamento" />
              </SelectTrigger>
              <SelectContent>
                {departamentos.map((dep) => (
                  <SelectItem key={dep} value={dep}>
                    {dep}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Empleado</TableHead>
                  <TableHead className="hidden md:table-cell">Contacto</TableHead>
                  <TableHead className="hidden sm:table-cell">Departamento</TableHead>
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
                            <p className="text-sm text-muted-foreground">{empleado.puesto}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="size-3 text-muted-foreground" />
                            {empleado.email}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="size-3" />
                            {empleado.telefono}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant="outline">{empleado.departamento}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {formatFecha(empleado.fecha_ingreso)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={estadoConfig[empleado.estado]?.variant || 'outline'}>
                          {estadoConfig[empleado.estado]?.label || empleado.estado}
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
