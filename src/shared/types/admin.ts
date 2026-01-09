// Tipos para el módulo Admin - RRHH

// ============================================
// Entidades base RRHH
// ============================================

export interface Empleado {
  id: number
  nombre: string
  apellido: string
  email: string
  telefono: string | null
  fecha_ingreso: string
  puesto_id: number | null
  departamento: string | null
  is_active: boolean
  created_at: string
  puesto?: Puesto
}

export interface Puesto {
  id: number
  nombre: string
  descripcion: string | null
  is_active: boolean
  created_at: string
}

export interface Proyecto {
  id: number
  nombre: string
  descripcion: string | null
  fecha_inicio: string
  fecha_fin: string | null
  estado: 'activo' | 'pausado' | 'completado' | 'cancelado'
  is_active: boolean
  created_at: string
}

export interface Licencia {
  id: number
  empleado_id: number
  tipo: 'vacaciones' | 'enfermedad' | 'personal' | 'maternidad' | 'paternidad' | 'otro'
  fecha_inicio: string
  fecha_fin: string
  estado: 'pendiente' | 'aprobada' | 'rechazada'
  motivo: string | null
  is_active: boolean
  created_at: string
  empleado?: Empleado
}

export interface Rol {
  id: number
  nombre: string
  descripcion: string | null
  permisos: string[]
  is_active: boolean
  created_at: string
}

export interface Usuario {
  id: number
  email: string
  nombre: string | null
  apellido: string | null
  rol: 'user' | 'empleado' | 'admin' | 'superadmin'
  provider: string
  is_active: boolean
  created_at: string
}

// ============================================
// Dashboard RRHH
// ============================================

export interface DashboardStats {
  totalEmpleados: number;
  totalUsuarios: number;
  totalProyectos: number;
  proyectosActivos: number;
  licenciasPendientes: number;
  empleadosNuevosMes: number;
}

export interface LicenciasPorMes {
  fecha: string;
  total: number;
  vacaciones: number;
  enfermedad: number;
  personal: number;
  otros: number;
}

export interface EmpleadosPorDepartamento {
  departamento: string;
  totalEmpleados: number;
  activos: number;
}

export interface ProyectosAgregadosPorMes {
  fecha: string;
  total: number;
}

export interface EmpleadoLegend {
  nombre: string;
  color: string;
}

export interface HorasAsignadasPorProyecto {
  fecha: string;
  [proyectoNombre: string]: string | number;
}

export interface HorasPorProyectoResponse {
  data: HorasAsignadasPorProyecto[];
  proyectos: EmpleadoLegend[];
}

export interface AuditLog {
  id: string;
  tabla: string;
  registro_id: string;
  accion: string;
  datos_antes: Record<string, unknown> | null;
  datos_despues: Record<string, unknown> | null;
  campos_modificados: string[] | null;
  usuario_id?: number | null;
  usuario_email: string | null;
  ip_address: string | null;
  user_agent?: string | null;
  created_at: string;
}

export interface LicenciaProxima {
  id: number;
  empleado: {
    id: number;
    nombre: string;
    apellido: string;
  };
  tipo: string;
  fecha_inicio: string;
  fecha_fin: string;
  estado: string;
}

// Navegación del sidebar
export interface NavItem {
  title: string;
  href: string;
  icon: string;
  permission?: string;
  children?: NavItem[];
}

export const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: 'LayoutDashboard',
    permission: 'dashboard.ver',
  },
  {
    title: 'Proyectos',
    href: '/admin/proyectos',
    icon: 'FolderKanban',
    permission: 'proyectos.ver',
  },
  {
    title: 'Empleados',
    href: '/admin/empleados',
    icon: 'Users',
    permission: 'empleados.ver',
  },
  {
    title: 'Licencias',
    href: '/admin/licencias',
    icon: 'CalendarDays',
    permission: 'licencias.ver',
  },
  {
    title: 'Noticias',
    href: '/admin/noticias',
    icon: 'Newspaper',
    permission: 'noticias.ver',
  },
  {
    title: 'Categorias',
    href: '/admin/categorias',
    icon: 'Tags',
    permission: 'categorias.ver',
    children: [
      {
        title: 'Puestos',
        href: '/admin/categorias/puestos',
        icon: 'Briefcase',
        permission: 'categorias.ver',
      },
      {
        title: 'Rol',
        href: '/admin/categorias/roles',
        icon: 'UserCog',
        permission: 'categorias.ver',
      },
    ],
  },
  {
    title: 'Usuarios',
    href: '/admin/usuarios',
    icon: 'Users',
    permission: 'usuarios.ver',
  },
  {
    title: 'Auditoria',
    href: '/admin/auditoria',
    icon: 'History',
    permission: 'auditoria.ver',
  },
];
