'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import {
  Users,
  Search,
  MoreHorizontal,
  Shield,
  UserCog,
  Mail,
  Calendar,
  Chrome,
  Key,
  ShieldCheck,
  ShieldAlert,
  UserCheck,
  UserX,
} from 'lucide-react';

// Datos de ejemplo hardcodeados
const mockUsuarios = [
  {
    id: 1,
    nombre: 'Carlos',
    apellido: 'Administrador',
    email: 'admin@americavirtual.com',
    rol: 'superadmin',
    provider: 'local',
    is_active: true,
    avatar: null,
    created_at: '2024-01-15T10:00:00Z',
    last_login: '2026-01-05T08:30:00Z',
  },
  {
    id: 2,
    nombre: 'María',
    apellido: 'García',
    email: 'maria.garcia@americavirtual.com',
    rol: 'admin',
    provider: 'google',
    is_active: true,
    avatar: null,
    created_at: '2024-03-20T14:30:00Z',
    last_login: '2026-01-04T16:45:00Z',
  },
  {
    id: 3,
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.perez@americavirtual.com',
    rol: 'admin',
    provider: 'google',
    is_active: true,
    avatar: null,
    created_at: '2024-04-10T09:15:00Z',
    last_login: '2026-01-05T07:00:00Z',
  },
  {
    id: 4,
    nombre: 'Ana',
    apellido: 'Martínez',
    email: 'ana.martinez@americavirtual.com',
    rol: 'empleado',
    provider: 'google',
    is_active: true,
    avatar: null,
    created_at: '2024-05-05T11:00:00Z',
    last_login: '2026-01-03T14:20:00Z',
  },
  {
    id: 5,
    nombre: 'Pedro',
    apellido: 'Sánchez',
    email: 'pedro.sanchez@americavirtual.com',
    rol: 'empleado',
    provider: 'local',
    is_active: true,
    avatar: null,
    created_at: '2024-06-12T16:45:00Z',
    last_login: '2026-01-04T09:10:00Z',
  },
  {
    id: 6,
    nombre: 'Laura',
    apellido: 'López',
    email: 'laura.lopez@americavirtual.com',
    rol: 'empleado',
    provider: 'google',
    is_active: true,
    avatar: null,
    created_at: '2024-07-01T08:30:00Z',
    last_login: '2026-01-05T10:00:00Z',
  },
  {
    id: 7,
    nombre: 'Diego',
    apellido: 'Fernández',
    email: 'diego.fernandez@americavirtual.com',
    rol: 'empleado',
    provider: 'google',
    is_active: true,
    avatar: null,
    created_at: '2024-08-15T13:20:00Z',
    last_login: '2026-01-02T11:30:00Z',
  },
  {
    id: 8,
    nombre: 'Sofía',
    apellido: 'Ramírez',
    email: 'sofia.ramirez@americavirtual.com',
    rol: 'user',
    provider: 'local',
    is_active: true,
    avatar: null,
    created_at: '2024-09-20T10:00:00Z',
    last_login: '2025-12-28T15:45:00Z',
  },
  {
    id: 9,
    nombre: 'Miguel',
    apellido: 'Torres',
    email: 'miguel.torres@americavirtual.com',
    rol: 'user',
    provider: 'google',
    is_active: false,
    avatar: null,
    created_at: '2024-10-05T14:15:00Z',
    last_login: '2025-11-15T09:00:00Z',
  },
  {
    id: 10,
    nombre: 'Valentina',
    apellido: 'Herrera',
    email: 'valentina.herrera@americavirtual.com',
    rol: 'empleado',
    provider: 'google',
    is_active: true,
    avatar: null,
    created_at: '2024-11-10T11:30:00Z',
    last_login: '2026-01-04T17:20:00Z',
  },
  {
    id: 11,
    nombre: 'Andrés',
    apellido: 'Morales',
    email: 'andres.morales@americavirtual.com',
    rol: 'user',
    provider: 'local',
    is_active: true,
    avatar: null,
    created_at: '2024-12-01T09:45:00Z',
    last_login: '2026-01-03T08:15:00Z',
  },
  {
    id: 12,
    nombre: 'Camila',
    apellido: 'Vega',
    email: 'camila.vega@americavirtual.com',
    rol: 'empleado',
    provider: 'google',
    is_active: true,
    avatar: null,
    created_at: '2025-01-08T15:00:00Z',
    last_login: '2026-01-05T12:00:00Z',
  },
];

const rolConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof Shield }> = {
  superadmin: { label: 'Super Admin', variant: 'destructive', icon: ShieldAlert },
  admin: { label: 'Admin', variant: 'default', icon: ShieldCheck },
  empleado: { label: 'Empleado', variant: 'secondary', icon: UserCheck },
  user: { label: 'Usuario', variant: 'outline', icon: Users },
};

export default function AdminUsuariosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [rolFilter, setRolFilter] = useState<string>('all');
  const [providerFilter, setProviderFilter] = useState<string>('all');

  // Modal states
  const [modalOpen, setModalOpen] = useState(false);
  const [usuarioEditar, setUsuarioEditar] = useState<typeof mockUsuarios[0] | null>(null);
  const [nuevoRol, setNuevoRol] = useState<string>('user');

  const filteredUsuarios = mockUsuarios.filter((usuario) => {
    const matchesSearch =
      !searchTerm ||
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.apellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRol = rolFilter === 'all' || usuario.rol === rolFilter;
    const matchesProvider = providerFilter === 'all' || usuario.provider === providerFilter;
    return matchesSearch && matchesRol && matchesProvider;
  });

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

  const abrirModalEditar = (usuario: typeof mockUsuarios[0]) => {
    setUsuarioEditar(usuario);
    setNuevoRol(usuario.rol);
    setModalOpen(true);
  };

  // Stats
  const totalAdmins = mockUsuarios.filter((u) => u.rol === 'admin' || u.rol === 'superadmin').length;
  const totalEmpleados = mockUsuarios.filter((u) => u.rol === 'empleado').length;
  const totalActivos = mockUsuarios.filter((u) => u.is_active).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Gestion de Usuarios</h1>
          <p className="text-muted-foreground">Administra los usuarios y sus roles</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Users className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockUsuarios.length}</p>
                <p className="text-sm text-muted-foreground">Total Usuarios</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <ShieldCheck className="size-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalAdmins}</p>
                <p className="text-sm text-muted-foreground">Administradores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <UserCheck className="size-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalEmpleados}</p>
                <p className="text-sm text-muted-foreground">Empleados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <UserX className="size-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockUsuarios.length - totalActivos}</p>
                <p className="text-sm text-muted-foreground">Inactivos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla */}
      <Card>
        <CardHeader>
          <CardTitle>Usuarios</CardTitle>
          <CardDescription>Lista de usuarios registrados en el sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={rolFilter} onValueChange={setRolFilter}>
              <SelectTrigger className="w-45" aria-label="Filtrar por rol">
                <SelectValue placeholder="Filtrar por rol" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los roles</SelectItem>
                <SelectItem value="superadmin">Super Admin</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="empleado">Empleado</SelectItem>
                <SelectItem value="user">Usuario</SelectItem>
              </SelectContent>
            </Select>
            <Select value={providerFilter} onValueChange={setProviderFilter}>
              <SelectTrigger className="w-45" aria-label="Filtrar por proveedor">
                <SelectValue placeholder="Proveedor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="google">Google</SelectItem>
                <SelectItem value="local">Local</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead>Rol</TableHead>
                  <TableHead className="hidden sm:table-cell">Proveedor</TableHead>
                  <TableHead className="hidden lg:table-cell">Ultimo acceso</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsuarios.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <Users className="size-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No se encontraron usuarios</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsuarios.map((usuario) => {
                    const rolCfg = rolConfig[usuario.rol];
                    const IconRol = rolCfg?.icon || Users;

                    return (
                      <TableRow key={usuario.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={usuario.avatar || undefined} />
                              <AvatarFallback>
                                {getInitials(usuario.nombre, usuario.apellido)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">
                                {usuario.nombre} {usuario.apellido}
                              </p>
                              <p className="text-sm text-muted-foreground md:hidden">
                                {usuario.email}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex items-center gap-2">
                            <Mail className="size-4 text-muted-foreground" />
                            <span className="text-sm">{usuario.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={rolCfg?.variant || 'outline'} className="gap-1">
                            <IconRol className="size-3" />
                            {rolCfg?.label || usuario.rol}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <Badge variant="outline" className="gap-1">
                            {usuario.provider === 'google' ? (
                              <Chrome className="size-3" />
                            ) : (
                              <Key className="size-3" />
                            )}
                            {usuario.provider === 'google' ? 'Google' : 'Local'}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="size-3" />
                            {formatFecha(usuario.last_login)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={usuario.is_active ? 'default' : 'secondary'}>
                            {usuario.is_active ? 'Activo' : 'Inactivo'}
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
                              <DropdownMenuItem onClick={() => abrirModalEditar(usuario)}>
                                <UserCog className="size-4 mr-2" />
                                Cambiar rol
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                {usuario.is_active ? (
                                  <>
                                    <UserX className="size-4 mr-2" />
                                    Desactivar
                                  </>
                                ) : (
                                  <>
                                    <UserCheck className="size-4 mr-2" />
                                    Activar
                                  </>
                                )}
                              </DropdownMenuItem>
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
        </CardContent>
      </Card>

      {/* Modal Cambiar Rol */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Cambiar Rol
            </DialogTitle>
            <DialogDescription>
              Cambia el rol de {usuarioEditar?.nombre} {usuarioEditar?.apellido}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rol actual</Label>
              <Badge variant={rolConfig[usuarioEditar?.rol || 'user'].variant}>
                {rolConfig[usuarioEditar?.rol || 'user'].label}
              </Badge>
            </div>
            <div className="space-y-2">
              <Label htmlFor="nuevoRol">Nuevo rol</Label>
              <Select value={nuevoRol} onValueChange={setNuevoRol}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Usuario</SelectItem>
                  <SelectItem value="empleado">Empleado</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button disabled={nuevoRol === usuarioEditar?.rol}>
              Guardar cambios
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
