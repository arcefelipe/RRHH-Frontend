// Tipos para Empleados - Basados en los DTOs del backend

export enum EstadoEmpleado {
  Activo = 0,
  Licencia = 1,
  Inactivo = 2,
}

export const estadoEmpleadoLabels: Record<EstadoEmpleado, string> = {
  [EstadoEmpleado.Activo]: 'Activo',
  [EstadoEmpleado.Licencia]: 'En Licencia',
  [EstadoEmpleado.Inactivo]: 'Inactivo',
};

export const estadoEmpleadoVariants: Record<EstadoEmpleado, 'default' | 'secondary' | 'destructive'> = {
  [EstadoEmpleado.Activo]: 'default',
  [EstadoEmpleado.Licencia]: 'secondary',
  [EstadoEmpleado.Inactivo]: 'destructive',
};

// DTO para listado de empleados (respuesta del GET /api/v1/empleados)
export interface EmpleadoListadoDto {
  id: number;
  apellido: string;
  nombre: string;
  email: string | null;
  fechaIngreso: string;
  estado: EstadoEmpleado;
  activo: boolean;
  puesto: string | null;
  proyecto: string | null;
}

// DTO para detalle de empleado (respuesta del GET /api/v1/empleados/{id})
export interface EmpleadoDetalleDto {
  id: number;
  apellido: string;
  nombre: string;
  email: string | null;
  fechaIngreso: string;
  estado: EstadoEmpleado;
  activo: boolean;
  // Puesto - el backend puede devolver puestoId/puestoNombre o puesto (string)
  puestoId: number | null;
  puestoNombre: string | null;
  puesto: string | null;
  cupoVacacionesPersonalizado: number | null;
  cupoEstudioAnual: number;
  // Proyecto - el backend puede devolver proyectoId/proyectoNombre o proyecto (string)
  proyectoId: number | null;
  proyectoNombre: string | null;
  proyecto: string | null;
  // Estado Civil
  estadoCivilId: number | null;
  estadoCivilNombre: string | null;
  estadoCivil: string | null;
  // Datos personales
  dni: string | null;
  cuil: string | null;
  fechaNacimiento: string | null;
  celular: string | null;
  telefonoEmergencia: string | null;
  direccion: string | null;
  codigoPostal: string | null;
  barrio: string | null;
  zona: string | null;
  obraSocial: string | null;
  estudiosMax: string | null;
  carrera: string | null;
  universidad: string | null;
  conyugeNombre: string | null;
  cantidadHijos: number | null;
  nombresHijos: string | null;
  emailPersonal: string | null;
  emailCorporativo: string | null;
}

// DTO para crear empleado (POST /api/v1/empleados)
export interface CrearEmpleadoDto {
  // Obligatorios
  apellido: string;
  nombre: string;
  fechaIngreso: string;
  puestoId: number;
  // Opcionales
  email?: string | null;
  estado?: EstadoEmpleado;
  cupoVacacionesPersonalizado?: number | null;
  cupoEstudioAnual?: number;
  proyectoId?: number | null;
  estadoCivilId?: number | null;
  dni?: string | null;
  cuil?: string | null;
  fechaNacimiento?: string | null;
  celular?: string | null;
  telefonoEmergencia?: string | null;
  direccion?: string | null;
  codigoPostal?: string | null;
  barrio?: string | null;
  zona?: string | null;
  obraSocial?: string | null;
  estudiosMax?: string | null;
  carrera?: string | null;
  universidad?: string | null;
  conyugeNombre?: string | null;
  cantidadHijos?: number | null;
  nombresHijos?: string | null;
  emailPersonal?: string | null;
  emailCorporativo?: string | null;
}

// DTO para editar empleado (PUT /api/v1/empleados/{id})
export interface EditarEmpleadoDto {
  apellido?: string | null;
  nombre?: string | null;
  email?: string | null;
  fechaIngreso?: string;
  estado?: EstadoEmpleado;
  puestoId?: number;
  cupoVacacionesPersonalizado?: number | null;
  cupoEstudioAnual?: number;
  proyectoId?: number | null;
  estadoCivilId?: number | null;
  dni?: string | null;
  cuil?: string | null;
  fechaNacimiento?: string | null;
  celular?: string | null;
  telefonoEmergencia?: string | null;
  direccion?: string | null;
  codigoPostal?: string | null;
  barrio?: string | null;
  zona?: string | null;
  obraSocial?: string | null;
  estudiosMax?: string | null;
  carrera?: string | null;
  universidad?: string | null;
  conyugeNombre?: string | null;
  cantidadHijos?: number | null;
  nombresHijos?: string | null;
  emailPersonal?: string | null;
  emailCorporativo?: string | null;
}

// Lookups para empleados (respuesta del GET /api/v1/lookups/empleados)
export interface EmpleadoLookups {
  puestos: LookupItem[];
  proyectos: LookupItem[];
  estadosCiviles: LookupItem[];
}

export interface LookupItem {
  id: number;
  nombre: string;
}
