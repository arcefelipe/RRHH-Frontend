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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  History,
  Search,
  Eye,
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
  User,
  Calendar,
  Globe,
  FileText,
  Database,
} from 'lucide-react';

// Datos de ejemplo hardcodeados
const mockLogs = [
  {
    id: 1,
    tabla: 'empleados',
    registro_id: 15,
    accion: 'CREATE',
    usuario_email: 'admin@americavirtual.com',
    usuario_nombre: 'Carlos Administrador',
    ip_address: '192.168.1.100',
    created_at: '2026-01-05T14:30:00Z',
    campos_modificados: ['nombre', 'apellido', 'email', 'puesto_id', 'departamento'],
    datos_antes: null,
    datos_despues: {
      nombre: 'Roberto',
      apellido: 'Méndez',
      email: 'roberto.mendez@americavirtual.com',
      puesto: 'Senior Developer',
      departamento: 'Desarrollo',
    },
  },
  {
    id: 2,
    tabla: 'licencias',
    registro_id: 42,
    accion: 'UPDATE',
    usuario_email: 'maria.garcia@americavirtual.com',
    usuario_nombre: 'María García',
    ip_address: '192.168.1.105',
    created_at: '2026-01-05T12:15:00Z',
    campos_modificados: ['estado'],
    datos_antes: { estado: 'pendiente' },
    datos_despues: { estado: 'aprobada' },
  },
  {
    id: 3,
    tabla: 'proyectos',
    registro_id: 8,
    accion: 'UPDATE',
    usuario_email: 'juan.perez@americavirtual.com',
    usuario_nombre: 'Juan Pérez',
    ip_address: '192.168.1.110',
    created_at: '2026-01-05T10:45:00Z',
    campos_modificados: ['estado', 'progreso'],
    datos_antes: { estado: 'en_progreso', progreso: 65 },
    datos_despues: { estado: 'en_progreso', progreso: 75 },
  },
  {
    id: 4,
    tabla: 'usuarios',
    registro_id: 9,
    accion: 'UPDATE',
    usuario_email: 'admin@americavirtual.com',
    usuario_nombre: 'Carlos Administrador',
    ip_address: '192.168.1.100',
    created_at: '2026-01-04T16:20:00Z',
    campos_modificados: ['rol'],
    datos_antes: { rol: 'user' },
    datos_despues: { rol: 'empleado' },
  },
  {
    id: 5,
    tabla: 'noticias',
    registro_id: 12,
    accion: 'CREATE',
    usuario_email: 'ana.martinez@americavirtual.com',
    usuario_nombre: 'Ana Martínez',
    ip_address: '192.168.1.115',
    created_at: '2026-01-04T14:00:00Z',
    campos_modificados: ['titulo', 'contenido', 'categoria', 'estado'],
    datos_antes: null,
    datos_despues: {
      titulo: 'Nuevo sistema de gestión de licencias',
      categoria: 'sistema',
      estado: 'publicado',
    },
  },
  {
    id: 6,
    tabla: 'empleados',
    registro_id: 7,
    accion: 'DELETE',
    usuario_email: 'admin@americavirtual.com',
    usuario_nombre: 'Carlos Administrador',
    ip_address: '192.168.1.100',
    created_at: '2026-01-04T11:30:00Z',
    campos_modificados: ['is_active', 'deleted_at'],
    datos_antes: { is_active: true, nombre: 'Empleado Baja', deleted_at: null },
    datos_despues: { is_active: false, deleted_at: '2026-01-04T11:30:00Z' },
  },
  {
    id: 7,
    tabla: 'puestos',
    registro_id: 5,
    accion: 'UPDATE',
    usuario_email: 'maria.garcia@americavirtual.com',
    usuario_nombre: 'María García',
    ip_address: '192.168.1.105',
    created_at: '2026-01-03T15:45:00Z',
    campos_modificados: ['descripcion', 'nivel'],
    datos_antes: { descripcion: 'Desarrollador con experiencia', nivel: 'Mid' },
    datos_despues: { descripcion: 'Desarrollador con amplia experiencia', nivel: 'Senior' },
  },
  {
    id: 8,
    tabla: 'tecnologias',
    registro_id: 3,
    accion: 'CREATE',
    usuario_email: 'juan.perez@americavirtual.com',
    usuario_nombre: 'Juan Pérez',
    ip_address: '192.168.1.110',
    created_at: '2026-01-03T10:00:00Z',
    campos_modificados: ['nombre', 'categoria', 'version'],
    datos_antes: null,
    datos_despues: { nombre: 'Vue.js', categoria: 'Frontend', version: '3.4' },
  },
  {
    id: 9,
    tabla: 'licencias',
    registro_id: 38,
    accion: 'UPDATE',
    usuario_email: 'maria.garcia@americavirtual.com',
    usuario_nombre: 'María García',
    ip_address: '192.168.1.105',
    created_at: '2026-01-02T14:20:00Z',
    campos_modificados: ['estado', 'observaciones'],
    datos_antes: { estado: 'pendiente', observaciones: null },
    datos_despues: { estado: 'rechazada', observaciones: 'Sin días disponibles' },
  },
  {
    id: 10,
    tabla: 'proyectos',
    registro_id: 6,
    accion: 'RESTORE',
    usuario_email: 'admin@americavirtual.com',
    usuario_nombre: 'Carlos Administrador',
    ip_address: '192.168.1.100',
    created_at: '2026-01-02T09:15:00Z',
    campos_modificados: ['is_active', 'deleted_at'],
    datos_antes: { is_active: false, deleted_at: '2025-12-28T10:00:00Z' },
    datos_despues: { is_active: true, deleted_at: null },
  },
  {
    id: 11,
    tabla: 'empleados',
    registro_id: 14,
    accion: 'UPDATE',
    usuario_email: 'ana.martinez@americavirtual.com',
    usuario_nombre: 'Ana Martínez',
    ip_address: '192.168.1.115',
    created_at: '2026-01-01T16:30:00Z',
    campos_modificados: ['salario', 'puesto_id'],
    datos_antes: { salario: 85000, puesto: 'Junior Developer' },
    datos_despues: { salario: 105000, puesto: 'Senior Developer' },
  },
  {
    id: 12,
    tabla: 'usuarios',
    registro_id: 12,
    accion: 'CREATE',
    usuario_email: 'Sistema',
    usuario_nombre: 'Sistema',
    ip_address: null,
    created_at: '2025-12-30T08:00:00Z',
    campos_modificados: ['nombre', 'email', 'rol', 'provider'],
    datos_antes: null,
    datos_despues: {
      nombre: 'Camila Vega',
      email: 'camila.vega@americavirtual.com',
      rol: 'empleado',
      provider: 'google',
    },
  },
];

const accionConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof Plus }> = {
  CREATE: { label: 'Crear', variant: 'default', icon: Plus },
  UPDATE: { label: 'Actualizar', variant: 'secondary', icon: Pencil },
  DELETE: { label: 'Eliminar', variant: 'destructive', icon: Trash2 },
  RESTORE: { label: 'Restaurar', variant: 'outline', icon: RotateCcw },
};

const tablaConfig: Record<string, { label: string; icon: typeof Database }> = {
  usuarios: { label: 'Usuarios', icon: User },
  empleados: { label: 'Empleados', icon: User },
  proyectos: { label: 'Proyectos', icon: FileText },
  licencias: { label: 'Licencias', icon: FileText },
  noticias: { label: 'Noticias', icon: FileText },
  puestos: { label: 'Puestos', icon: Database },
  tecnologias: { label: 'Tecnologias', icon: Database },
};

export default function AdminAuditoriaPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [tablaFilter, setTablaFilter] = useState<string>('all');
  const [accionFilter, setAccionFilter] = useState<string>('all');

  // Modal para ver detalles
  const [detalleModalOpen, setDetalleModalOpen] = useState(false);
  const [logSeleccionado, setLogSeleccionado] = useState<typeof mockLogs[0] | null>(null);

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch =
      !searchTerm ||
      log.tabla.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.usuario_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(log.registro_id).includes(searchTerm);
    const matchesTabla = tablaFilter === 'all' || log.tabla === tablaFilter;
    const matchesAccion = accionFilter === 'all' || log.accion === accionFilter;
    return matchesSearch && matchesTabla && matchesAccion;
  });

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const verDetalle = (log: typeof mockLogs[0]) => {
    setLogSeleccionado(log);
    setDetalleModalOpen(true);
  };

  // Stats
  const totalCreaciones = mockLogs.filter((l) => l.accion === 'CREATE').length;
  const totalActualizaciones = mockLogs.filter((l) => l.accion === 'UPDATE').length;
  const totalEliminaciones = mockLogs.filter((l) => l.accion === 'DELETE').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Auditoria del Sistema</h1>
          <p className="text-muted-foreground">Historial de cambios y acciones</p>
        </div>
        <Badge variant="outline" className="text-sm">
          {mockLogs.length} registros
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <History className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockLogs.length}</p>
                <p className="text-sm text-muted-foreground">Total Registros</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Plus className="size-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalCreaciones}</p>
                <p className="text-sm text-muted-foreground">Creaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Pencil className="size-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalActualizaciones}</p>
                <p className="text-sm text-muted-foreground">Actualizaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-red-500/10 rounded-lg">
                <Trash2 className="size-6 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalEliminaciones}</p>
                <p className="text-sm text-muted-foreground">Eliminaciones</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla */}
      <Card>
        <CardHeader>
          <CardTitle>Logs de Auditoria</CardTitle>
          <CardDescription>
            Registro de todas las acciones realizadas en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por tabla, ID o usuario..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={tablaFilter} onValueChange={setTablaFilter}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Filtrar por tabla" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las tablas</SelectItem>
                <SelectItem value="usuarios">Usuarios</SelectItem>
                <SelectItem value="empleados">Empleados</SelectItem>
                <SelectItem value="proyectos">Proyectos</SelectItem>
                <SelectItem value="licencias">Licencias</SelectItem>
                <SelectItem value="noticias">Noticias</SelectItem>
                <SelectItem value="puestos">Puestos</SelectItem>
                <SelectItem value="tecnologias">Tecnologias</SelectItem>
              </SelectContent>
            </Select>
            <Select value={accionFilter} onValueChange={setAccionFilter}>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Filtrar por accion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las acciones</SelectItem>
                <SelectItem value="CREATE">Crear</SelectItem>
                <SelectItem value="UPDATE">Actualizar</SelectItem>
                <SelectItem value="DELETE">Eliminar</SelectItem>
                <SelectItem value="RESTORE">Restaurar</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Tabla</TableHead>
                  <TableHead className="hidden sm:table-cell">ID</TableHead>
                  <TableHead>Accion</TableHead>
                  <TableHead className="hidden md:table-cell">Usuario</TableHead>
                  <TableHead className="hidden lg:table-cell">IP</TableHead>
                  <TableHead className="text-right">Detalle</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <History className="size-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No se encontraron registros</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => {
                    const accionCfg = accionConfig[log.accion];
                    const IconAccion = accionCfg?.icon || History;
                    const tablaCfg = tablaConfig[log.tabla];

                    return (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Calendar className="size-3 text-muted-foreground" />
                            <span>{formatFecha(log.created_at)}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {tablaCfg?.label || log.tabla}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <code className="text-sm bg-muted px-2 py-1 rounded">
                            #{log.registro_id}
                          </code>
                        </TableCell>
                        <TableCell>
                          <Badge variant={accionCfg?.variant || 'outline'} className="gap-1">
                            <IconAccion className="size-3" />
                            {accionCfg?.label || log.accion}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <User className="size-4 text-muted-foreground" />
                            <span className="text-sm">{log.usuario_nombre || log.usuario_email}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {log.ip_address ? (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Globe className="size-3" />
                              <code>{log.ip_address}</code>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => verDetalle(log)}
                          >
                            <Eye className="size-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Modal Detalle */}
      <Dialog open={detalleModalOpen} onOpenChange={setDetalleModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalle del Registro</DialogTitle>
            <DialogDescription>
              {logSeleccionado && (
                <>
                  {accionConfig[logSeleccionado.accion]?.label || logSeleccionado.accion} en{' '}
                  <code>{logSeleccionado.tabla}</code> #{logSeleccionado.registro_id}
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          {logSeleccionado && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Fecha</p>
                  <p className="font-medium">{formatFecha(logSeleccionado.created_at)}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Usuario</p>
                  <p className="font-medium">{logSeleccionado.usuario_nombre || logSeleccionado.usuario_email}</p>
                </div>
                {logSeleccionado.ip_address && (
                  <div>
                    <p className="text-muted-foreground">IP</p>
                    <p className="font-mono text-xs">{logSeleccionado.ip_address}</p>
                  </div>
                )}
              </div>

              {logSeleccionado.campos_modificados && logSeleccionado.campos_modificados.length > 0 && (
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Campos modificados</p>
                  <div className="flex flex-wrap gap-1">
                    {logSeleccionado.campos_modificados.map((campo) => (
                      <Badge key={campo} variant="outline" className="text-xs">
                        {campo}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {logSeleccionado.datos_antes && (
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Datos anteriores</p>
                  <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                    {JSON.stringify(logSeleccionado.datos_antes, null, 2)}
                  </pre>
                </div>
              )}

              {logSeleccionado.datos_despues && (
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Datos nuevos</p>
                  <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                    {JSON.stringify(logSeleccionado.datos_despues, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
