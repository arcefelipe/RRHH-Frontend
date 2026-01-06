'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Server,
  Database,
  HardDrive,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Settings,
  Shield,
  Zap,
  Globe,
  Bell,
  Mail,
} from 'lucide-react';

// Datos de ejemplo hardcodeados
const systemStatus = {
  server: { status: 'online', uptime: '15d 8h 32m', cpu: 23, memory: 67 },
  database: { status: 'online', connections: 12, maxConnections: 100, size: '2.4 GB' },
  storage: { used: 45.2, total: 100, unit: 'GB' },
  api: { status: 'online', responseTime: 145, requestsPerMin: 234 },
};

const recentJobs = [
  { id: 1, nombre: 'Backup diario', estado: 'completado', duracion: '2m 15s', hora: '03:00', fecha: '2026-01-05' },
  { id: 2, nombre: 'Sync empleados', estado: 'completado', duracion: '45s', hora: '08:00', fecha: '2026-01-05' },
  { id: 3, nombre: 'Email notificaciones', estado: 'completado', duracion: '1m 30s', hora: '09:00', fecha: '2026-01-05' },
  { id: 4, nombre: 'Limpieza logs', estado: 'completado', duracion: '3m 10s', hora: '02:00', fecha: '2026-01-05' },
  { id: 5, nombre: 'Reporte mensual', estado: 'fallido', duracion: '-', hora: '00:00', fecha: '2026-01-05' },
  { id: 6, nombre: 'Cache refresh', estado: 'en_progreso', duracion: '-', hora: '14:30', fecha: '2026-01-05' },
];

const systemConfig = [
  { id: 1, nombre: 'Modo mantenimiento', descripcion: 'Desactiva acceso a usuarios', activo: false, categoria: 'sistema' },
  { id: 2, nombre: 'Notificaciones email', descripcion: 'Enviar emails automaticos', activo: true, categoria: 'notificaciones' },
  { id: 3, nombre: 'Notificaciones push', descripcion: 'Notificaciones en navegador', activo: true, categoria: 'notificaciones' },
  { id: 4, nombre: 'Backup automatico', descripcion: 'Backup diario a las 3AM', activo: true, categoria: 'sistema' },
  { id: 5, nombre: 'Logs detallados', descripcion: 'Registrar todas las acciones', activo: false, categoria: 'seguridad' },
  { id: 6, nombre: 'Rate limiting', descripcion: 'Limitar requests por IP', activo: true, categoria: 'seguridad' },
];

const estadoConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof CheckCircle2 }> = {
  completado: { label: 'Completado', variant: 'default', icon: CheckCircle2 },
  en_progreso: { label: 'En progreso', variant: 'secondary', icon: RefreshCw },
  fallido: { label: 'Fallido', variant: 'destructive', icon: XCircle },
  pendiente: { label: 'Pendiente', variant: 'outline', icon: Clock },
};

const categoriaIcons: Record<string, typeof Settings> = {
  sistema: Settings,
  notificaciones: Bell,
  seguridad: Shield,
};

export default function PanelControlPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Panel de Control</h1>
          <p className="text-muted-foreground">Metricas y controles del sistema</p>
        </div>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="size-4" />
          Actualizar
        </Button>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Server className="size-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Servidor</p>
                  <p className="text-xs text-muted-foreground">Uptime: {systemStatus.server.uptime}</p>
                </div>
              </div>
              <Badge variant="default" className="gap-1">
                <CheckCircle2 className="size-3" />
                Online
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">CPU</span>
                <span>{systemStatus.server.cpu}%</span>
              </div>
              <Progress value={systemStatus.server.cpu} />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Memoria</span>
                <span>{systemStatus.server.memory}%</span>
              </div>
              <Progress value={systemStatus.server.memory} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Database className="size-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Base de Datos</p>
                  <p className="text-xs text-muted-foreground">PostgreSQL 17</p>
                </div>
              </div>
              <Badge variant="default" className="gap-1">
                <CheckCircle2 className="size-3" />
                Online
              </Badge>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Conexiones</span>
                <span>{systemStatus.database.connections}/{systemStatus.database.maxConnections}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tamano</span>
                <span>{systemStatus.database.size}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <HardDrive className="size-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">Almacenamiento</p>
                  <p className="text-xs text-muted-foreground">{systemStatus.storage.used} / {systemStatus.storage.total} GB</p>
                </div>
              </div>
              <Badge variant="secondary">
                {Math.round((systemStatus.storage.used / systemStatus.storage.total) * 100)}%
              </Badge>
            </div>
            <Progress value={(systemStatus.storage.used / systemStatus.storage.total) * 100} />
            <p className="text-xs text-muted-foreground mt-2">
              {(systemStatus.storage.total - systemStatus.storage.used).toFixed(1)} GB disponibles
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <Globe className="size-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-sm font-medium">API</p>
                  <p className="text-xs text-muted-foreground">REST API v1</p>
                </div>
              </div>
              <Badge variant="default" className="gap-1">
                <Zap className="size-3" />
                {systemStatus.api.responseTime}ms
              </Badge>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Requests/min</span>
                <span>{systemStatus.api.requestsPerMin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estado</span>
                <span className="text-green-500">Operativo</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="size-5" />
              Tareas Programadas
            </CardTitle>
            <CardDescription>
              Estado de los trabajos automaticos del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tarea</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="hidden sm:table-cell">Duracion</TableHead>
                    <TableHead className="text-right">Hora</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentJobs.map((job) => {
                    const estadoCfg = estadoConfig[job.estado];
                    const IconEstado = estadoCfg?.icon || Clock;

                    return (
                      <TableRow key={job.id}>
                        <TableCell className="font-medium">{job.nombre}</TableCell>
                        <TableCell>
                          <Badge variant={estadoCfg?.variant || 'outline'} className="gap-1">
                            <IconEstado className={`size-3 ${job.estado === 'en_progreso' ? 'animate-spin' : ''}`} />
                            {estadoCfg?.label || job.estado}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell text-muted-foreground">
                          {job.duracion}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {job.hora}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* System Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="size-5" />
              Configuracion del Sistema
            </CardTitle>
            <CardDescription>
              Ajustes y opciones del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemConfig.map((config) => {
                const IconCategoria = categoriaIcons[config.categoria] || Settings;

                return (
                  <div
                    key={config.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <IconCategoria className="size-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{config.nombre}</p>
                        <p className="text-xs text-muted-foreground">{config.descripcion}</p>
                      </div>
                    </div>
                    <Switch checked={config.activo} />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="size-5" />
            Acciones Rapidas
          </CardTitle>
          <CardDescription>
            Operaciones comunes del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <RefreshCw className="size-5" />
              <span className="text-sm">Limpiar Cache</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Database className="size-5" />
              <span className="text-sm">Backup Manual</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Mail className="size-5" />
              <span className="text-sm">Test Email</span>
            </Button>
            <Button variant="outline" className="h-auto py-4 flex-col gap-2">
              <Activity className="size-5" />
              <span className="text-sm">Ver Logs</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
