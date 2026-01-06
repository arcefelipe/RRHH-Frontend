'use client';

import { useEffect, useState, useMemo } from 'react';
import { StatsCard } from './_components/stats-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Users,
  FolderKanban,
  CalendarDays,
  AlertTriangle,
  TrendingUp,
  Clock,
  Calendar,
  ChevronDown,
  UserPlus,
  WifiOff,
  RefreshCw,
  ServerCrash,
  Search,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type {
  DashboardStats,
  LicenciaProxima,
  AuditLog,
} from '@/types/admin';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/use-auth';
import Link from 'next/link';

type Period = '7' | '30' | '90';

const periodLabels: Record<Period, string> = {
  '7': 'Ultima semana',
  '30': 'Ultimo mes',
  '90': 'Ultimo trimestre',
};

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
    name: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border rounded-md p-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-2">{label}</p>
        <div className="grid gap-1">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-xs text-muted-foreground">{entry.name}:</span>
              <span className="text-xs font-medium">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
}

// Datos de ejemplo para el dashboard RRHH
const mockStats: DashboardStats = {
  totalEmpleados: 156,
  totalUsuarios: 42,
  totalProyectos: 18,
  proyectosActivos: 12,
  licenciasPendientes: 8,
  empleadosNuevosMes: 5,
};

const mockLicenciasProximas: LicenciaProxima[] = [
  {
    id: 1,
    empleado: { id: 1, nombre: 'Juan', apellido: 'Perez' },
    tipo: 'vacaciones',
    fecha_inicio: '2026-01-15',
    fecha_fin: '2026-01-22',
    estado: 'aprobada',
  },
  {
    id: 2,
    empleado: { id: 2, nombre: 'Maria', apellido: 'Garcia' },
    tipo: 'personal',
    fecha_inicio: '2026-01-10',
    fecha_fin: '2026-01-10',
    estado: 'pendiente',
  },
  {
    id: 3,
    empleado: { id: 3, nombre: 'Carlos', apellido: 'Lopez' },
    tipo: 'enfermedad',
    fecha_inicio: '2026-01-08',
    fecha_fin: '2026-01-12',
    estado: 'aprobada',
  },
  {
    id: 4,
    empleado: { id: 4, nombre: 'Ana', apellido: 'Martinez' },
    tipo: 'vacaciones',
    fecha_inicio: '2026-01-20',
    fecha_fin: '2026-02-03',
    estado: 'pendiente',
  },
  {
    id: 5,
    empleado: { id: 5, nombre: 'Pedro', apellido: 'Sanchez' },
    tipo: 'maternidad',
    fecha_inicio: '2026-02-01',
    fecha_fin: '2026-05-01',
    estado: 'aprobada',
  },
];

const mockEmpleadosPorDepartamento = [
  { departamento: 'Desarrollo', cantidad: 45 },
  { departamento: 'Diseno', cantidad: 18 },
  { departamento: 'Marketing', cantidad: 22 },
  { departamento: 'RRHH', cantidad: 12 },
  { departamento: 'Finanzas', cantidad: 15 },
  { departamento: 'Operaciones', cantidad: 28 },
  { departamento: 'Soporte', cantidad: 16 },
];

const mockUltimosCambios: AuditLog[] = [
  {
    id: '1',
    tabla: 'empleados',
    registro_id: '45',
    accion: 'CREATE',
    datos_antes: null,
    datos_despues: { nombre: 'Nuevo Empleado' },
    campos_modificados: null,
    usuario_email: 'admin@empresa.com',
    ip_address: '192.168.1.1',
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    tabla: 'licencias',
    registro_id: '12',
    accion: 'UPDATE',
    datos_antes: { estado: 'pendiente' },
    datos_despues: { estado: 'aprobada' },
    campos_modificados: ['estado'],
    usuario_email: 'rrhh@empresa.com',
    ip_address: '192.168.1.2',
    created_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '3',
    tabla: 'proyectos',
    registro_id: '8',
    accion: 'UPDATE',
    datos_antes: { estado: 'activo' },
    datos_despues: { estado: 'completado' },
    campos_modificados: ['estado'],
    usuario_email: 'pm@empresa.com',
    ip_address: '192.168.1.3',
    created_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: '4',
    tabla: 'empleados',
    registro_id: '23',
    accion: 'UPDATE',
    datos_antes: { puesto: 'Junior' },
    datos_despues: { puesto: 'Semi-Senior' },
    campos_modificados: ['puesto'],
    usuario_email: 'admin@empresa.com',
    ip_address: '192.168.1.1',
    created_at: new Date(Date.now() - 14400000).toISOString(),
  },
  {
    id: '5',
    tabla: 'tecnologias',
    registro_id: '15',
    accion: 'CREATE',
    datos_antes: null,
    datos_despues: { nombre: 'React 19' },
    campos_modificados: null,
    usuario_email: 'tech@empresa.com',
    ip_address: '192.168.1.4',
    created_at: new Date(Date.now() - 28800000).toISOString(),
  },
];

// Colores para el ranking de empleados por departamento
const rankColors = [
  'border-yellow-400',
  'border-gray-400',
  'border-amber-600',
  'border-blue-400',
  'border-purple-400',
];

const rankBgColors = [
  'bg-yellow-400/10',
  'bg-gray-400/10',
  'bg-amber-600/10',
  'bg-blue-400/10',
  'bg-purple-400/10',
];

const tipoLicenciaConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  vacaciones: { label: 'Vacaciones', variant: 'default' },
  enfermedad: { label: 'Enfermedad', variant: 'secondary' },
  personal: { label: 'Personal', variant: 'outline' },
  maternidad: { label: 'Maternidad', variant: 'default' },
  paternidad: { label: 'Paternidad', variant: 'default' },
  otro: { label: 'Otro', variant: 'outline' },
};

export default function AdminDashboardPage() {
  const { fullName } = useAuth();
  const { theme } = useTheme();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [licenciasProximas, setLicenciasProximas] = useState<LicenciaProxima[]>([]);
  const [ultimosCambios, setUltimosCambios] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>('30');
  const [chartReady, setChartReady] = useState(false);

  // Table state
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<'empleado' | 'tipo' | 'fecha_inicio'>('fecha_inicio');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [filterTipo, setFilterTipo] = useState<string>('all');
  const itemsPerPage = 5;

  const axisColor = theme === 'dark' ? '#71717a' : '#868c98';
  const gridColor = theme === 'dark' ? '#3f3f46' : '#e2e4e9';

  // Delay chart render to avoid ResponsiveContainer warning
  useEffect(() => {
    const timer = setTimeout(() => setChartReady(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Simular carga de datos (en produccion serian llamadas a API)
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simular delay de red
        await new Promise(resolve => setTimeout(resolve, 500));

        setStats(mockStats);
        setLicenciasProximas(mockLicenciasProximas);
        setUltimosCambios(mockUltimosCambios);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar dashboard');
        console.error('Error fetching dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [period]);

  const formatFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
    });
  };

  const formatFechaHora = (fecha: string) => {
    return new Date(fecha).toLocaleString('es-AR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Filtered and sorted data for table
  const filteredLicencias = useMemo(() => {
    let result = [...licenciasProximas];

    // Filter by search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.empleado.nombre.toLowerCase().includes(term) ||
          item.empleado.apellido.toLowerCase().includes(term)
      );
    }

    // Filter by tipo
    if (filterTipo !== 'all') {
      result = result.filter((item) => item.tipo === filterTipo);
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'empleado':
          comparison = `${a.empleado.apellido} ${a.empleado.nombre}`.localeCompare(
            `${b.empleado.apellido} ${b.empleado.nombre}`
          );
          break;
        case 'tipo':
          comparison = a.tipo.localeCompare(b.tipo);
          break;
        case 'fecha_inicio':
          comparison = new Date(a.fecha_inicio).getTime() - new Date(b.fecha_inicio).getTime();
          break;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [licenciasProximas, searchTerm, filterTipo, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredLicencias.length / itemsPerPage);
  const paginatedLicencias = filteredLicencias.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: 'empleado' | 'tipo' | 'fecha_inicio') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const isNetworkError = error?.toLowerCase().includes('network') || error?.toLowerCase().includes('failed to fetch');
  const isServerError = error?.toLowerCase().includes('500') || error?.toLowerCase().includes('server');

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-muted rounded-full" />
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-lg font-medium">Cargando dashboard</p>
          <p className="text-sm text-muted-foreground">Obteniendo datos del sistema...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-6">
        <div className="rounded-full bg-muted p-6">
          {isNetworkError ? (
            <WifiOff className="h-12 w-12 text-muted-foreground" />
          ) : isServerError ? (
            <ServerCrash className="h-12 w-12 text-muted-foreground" />
          ) : (
            <AlertTriangle className="h-12 w-12 text-destructive" />
          )}
        </div>
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold mb-2">
            {isNetworkError
              ? 'Sin conexion al servidor'
              : isServerError
                ? 'Error del servidor'
                : 'Error al cargar'}
          </h2>
          <p className="text-muted-foreground mb-1">
            {isNetworkError
              ? 'No se pudo conectar con el servidor. Verifica que el backend este corriendo.'
              : isServerError
                ? 'El servidor encontro un error al procesar la solicitud.'
                : 'Ocurrio un error inesperado al cargar el dashboard.'}
          </p>
          <p className="text-xs text-muted-foreground/70 font-mono bg-muted px-3 py-1.5 rounded mt-3">
            {error}
          </p>
        </div>
        <Button onClick={handleRetry} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
            Bienvenido {fullName || 'Admin'}!
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Aqui tienes un resumen del sistema de RRHH
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 gap-1.5 bg-card hover:bg-card/80 border-border/50"
            asChild
          >
            <Link href="/admin/empleados">
              <UserPlus className="size-4" />
              <span className="hidden sm:inline">Nuevo Empleado</span>
            </Link>
          </Button>
          <Button className="h-9 gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white border border-border/50" asChild>
            <Link href="/admin/proyectos">
              <FolderKanban className="size-4" />
              <span className="hidden sm:inline">Nuevo Proyecto</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatsCard title="Empleados" value={stats?.totalEmpleados || 0} icon={Users} />
        <StatsCard title="Usuarios" value={stats?.totalUsuarios || 0} icon={Users} />
        <StatsCard title="Proyectos" value={stats?.totalProyectos || 0} icon={FolderKanban} />
        <StatsCard
          title="Activos"
          value={stats?.proyectosActivos || 0}
          icon={TrendingUp}
          extra="proyectos"
        />
        <StatsCard
          title="Nuevos"
          value={stats?.empleadosNuevosMes || 0}
          icon={UserPlus}
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Licencias"
          value={stats?.licenciasPendientes || 0}
          icon={CalendarDays}
          valueClassName={stats?.licenciasPendientes && stats.licenciasPendientes > 0 ? 'text-amber-500' : undefined}
          extra="pendientes"
        />
      </div>

      {/* Main Chart + Top Departamentos */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Bar Chart - 70% width */}
        <div className="bg-card text-card-foreground rounded-lg border flex-1 lg:flex-[2.5]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 border-b border-border/50">
            <div>
              <h3 className="font-semibold text-base sm:text-lg">Empleados por Departamento</h3>
              <p className="text-xs text-muted-foreground">Distribucion actual de personal</p>
            </div>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 gap-1.5">
                    <Calendar className="size-3.5" />
                    <span className="text-sm">{periodLabels[period]}</span>
                    <ChevronDown className="size-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {(Object.keys(periodLabels) as Period[]).map((p) => (
                    <DropdownMenuItem key={p} onClick={() => setPeriod(p)}>
                      {periodLabels[p]} {period === p && '✓'}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="p-4">
            <div className="h-72 sm:h-80 w-full">
              {chartReady ? (
                <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                  <BarChart
                    data={mockEmpleadosPorDepartamento}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
                    <XAxis
                      dataKey="departamento"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: axisColor }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 10, fill: axisColor }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="cantidad"
                      fill="#ff6859"
                      radius={[4, 4, 0, 0]}
                      name="Empleados"
                    />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Cargando grafico...</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Top Departamentos Panel - 30% width */}
        <div className="bg-card text-card-foreground rounded-lg border lg:w-80 xl:w-96">
          <div className="flex items-center justify-between p-4 border-b border-border/50">
            <div>
              <h3 className="font-semibold text-base">Top Departamentos</h3>
              <p className="text-xs text-muted-foreground">Por cantidad de empleados</p>
            </div>
            <Badge variant="secondary" className="text-xs">
              Top 5
            </Badge>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {[...mockEmpleadosPorDepartamento]
                .sort((a, b) => b.cantidad - a.cantidad)
                .slice(0, 5)
                .map((dept, index) => (
                  <div
                    key={dept.departamento}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 ${rankColors[index]} ${rankBgColors[index]} transition-all hover:scale-[1.02]`}
                  >
                    {/* Rank Badge */}
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                      index === 0 ? 'bg-yellow-400 text-yellow-900' :
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      index === 2 ? 'bg-amber-600 text-white' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>

                    {/* Department Avatar */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-semibold">
                      {dept.departamento.charAt(0).toUpperCase()}
                    </div>

                    {/* Department Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{dept.departamento}</p>
                      <p className="text-xs text-muted-foreground">Departamento</p>
                    </div>

                    {/* Count Badge */}
                    <Badge variant="default" className="shrink-0">
                      {dept.cantidad} emp
                    </Badge>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* Licencias Proximas Table */}
      <div className="bg-card text-card-foreground rounded-lg border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <CalendarDays className="size-5 text-amber-500" />
            <div>
              <h3 className="font-semibold text-base">Licencias Proximas</h3>
              <p className="text-xs text-muted-foreground">Licencias programadas para los proximos dias</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar empleado..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 h-9 w-full sm:w-50"
              />
            </div>

            {/* Filter */}
            <Select value={filterTipo} onValueChange={(v) => { setFilterTipo(v); setCurrentPage(1); }}>
              <SelectTrigger className="h-9 w-full sm:w-37.5">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="vacaciones">Vacaciones</SelectItem>
                <SelectItem value="enfermedad">Enfermedad</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="maternidad">Maternidad</SelectItem>
                <SelectItem value="paternidad">Paternidad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full" aria-label="Licencias proximas">
            <caption className="sr-only">
              Lista de licencias programadas para los proximos dias
            </caption>
            <thead>
              <tr className="border-b bg-muted/50">
                <th
                  scope="col"
                  className="text-left p-3 font-medium text-sm"
                  aria-sort={sortField === 'empleado' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <button
                    onClick={() => handleSort('empleado')}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    Empleado
                    <ArrowUpDown className="size-3" aria-hidden="true" />
                  </button>
                </th>
                <th
                  scope="col"
                  className="text-left p-3 font-medium text-sm hidden sm:table-cell"
                  aria-sort={sortField === 'tipo' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <button
                    onClick={() => handleSort('tipo')}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    Tipo
                    <ArrowUpDown className="size-3" aria-hidden="true" />
                  </button>
                </th>
                <th
                  scope="col"
                  className="text-left p-3 font-medium text-sm"
                  aria-sort={sortField === 'fecha_inicio' ? (sortDirection === 'asc' ? 'ascending' : 'descending') : 'none'}
                >
                  <button
                    onClick={() => handleSort('fecha_inicio')}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    Fecha
                    <ArrowUpDown className="size-3" aria-hidden="true" />
                  </button>
                </th>
                <th scope="col" className="text-right p-3 font-medium text-sm">Estado</th>
              </tr>
            </thead>
            <tbody>
              {paginatedLicencias.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8">
                    <CalendarDays className="size-10 mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">
                      {searchTerm || filterTipo !== 'all'
                        ? 'No se encontraron resultados'
                        : 'No hay licencias proximas'}
                    </p>
                  </td>
                </tr>
              ) : (
                paginatedLicencias.map((item, idx) => (
                  <tr
                    key={item.id}
                    className={`border-b last:border-0 hover:bg-muted/30 transition-colors ${
                      idx % 2 === 0 ? 'bg-transparent' : 'bg-muted/20'
                    }`}
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                          {item.empleado.nombre.charAt(0)}{item.empleado.apellido.charAt(0)}
                        </div>
                        <span className="font-medium text-sm">
                          {item.empleado.apellido}, {item.empleado.nombre}
                        </span>
                      </div>
                    </td>
                    <td className="p-3 hidden sm:table-cell">
                      <Badge variant={tipoLicenciaConfig[item.tipo]?.variant || 'outline'}>
                        {tipoLicenciaConfig[item.tipo]?.label || item.tipo}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {formatFecha(item.fecha_inicio)} - {formatFecha(item.fecha_fin)}
                    </td>
                    <td className="p-3 text-right">
                      <Badge variant={item.estado === 'aprobada' ? 'default' : item.estado === 'pendiente' ? 'secondary' : 'destructive'}>
                        {item.estado.charAt(0).toUpperCase() + item.estado.slice(1)}
                      </Badge>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t">
            <p className="text-sm text-muted-foreground">
              Mostrando {(currentPage - 1) * itemsPerPage + 1} a{' '}
              {Math.min(currentPage * itemsPerPage, filteredLicencias.length)} de{' '}
              {filteredLicencias.length} registros
            </p>
            <nav className="flex items-center gap-1" aria-label="Paginacion de tabla">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Ir a la pagina anterior"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(page)}
                  aria-label={`Ir a la pagina ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
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
                aria-label="Ir a la pagina siguiente"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </Button>
            </nav>
          </div>
        )}
      </div>

      {/* Recent Changes */}
      <div className="bg-card text-card-foreground rounded-lg border">
        <div className="flex items-center gap-2 p-4 border-b border-border/50">
          <Clock className="size-4 text-muted-foreground" />
          <h3 className="font-semibold text-base">Ultimos Cambios</h3>
        </div>
        <div className="p-4">
          {ultimosCambios.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">No hay cambios recientes</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {ultimosCambios.map((log) => (
                <div
                  key={log.id}
                  className="flex flex-col p-3 bg-muted/50 dark:bg-neutral-800/50 rounded-lg border"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant={
                        log.accion === 'CREATE'
                          ? 'default'
                          : log.accion === 'UPDATE'
                            ? 'secondary'
                            : 'destructive'
                      }
                      className="text-[10px] px-1.5"
                    >
                      {log.accion}
                    </Badge>
                    <span className="text-xs text-muted-foreground capitalize">{log.tabla}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {log.usuario_email || 'Sistema'}
                  </p>
                  <span className="text-[10px] text-muted-foreground/70 mt-1">
                    {formatFechaHora(log.created_at)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
