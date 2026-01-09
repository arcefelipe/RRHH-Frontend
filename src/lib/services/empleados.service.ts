import { backendApi } from '../api-client';
import type {
  EmpleadoListadoDto,
  EmpleadoDetalleDto,
  CrearEmpleadoDto,
  EditarEmpleadoDto,
  EmpleadoLookups,
} from '@/types/empleados';

const BASE_PATH = '/api/v1/empleados';

export const empleadosService = {
  /**
   * Obtiene la lista de todos los empleados
   * @param incluirInactivos - Si true, incluye empleados inactivos
   */
  async getAll(incluirInactivos = false): Promise<EmpleadoListadoDto[]> {
    const { data } = await backendApi.get<EmpleadoListadoDto[]>(BASE_PATH, {
      params: { incluirInactivos },
    });
    return data;
  },

  /**
   * Obtiene el detalle de un empleado por su ID
   * @param id - ID del empleado
   */
  async getById(id: number): Promise<EmpleadoDetalleDto> {
    const { data } = await backendApi.get<EmpleadoDetalleDto>(`${BASE_PATH}/${id}`);
    return data;
  },

  /**
   * Crea un nuevo empleado
   * @param empleado - Datos del empleado a crear
   */
  async create(empleado: CrearEmpleadoDto): Promise<EmpleadoDetalleDto> {
    const { data } = await backendApi.post<EmpleadoDetalleDto>(BASE_PATH, empleado);
    return data;
  },

  /**
   * Actualiza un empleado existente
   * @param id - ID del empleado
   * @param empleado - Datos a actualizar
   */
  async update(id: number, empleado: EditarEmpleadoDto): Promise<void> {
    await backendApi.put(`${BASE_PATH}/${id}`, empleado);
  },

  /**
   * Desactiva un empleado
   * @param id - ID del empleado
   */
  async desactivar(id: number): Promise<void> {
    await backendApi.post(`${BASE_PATH}/${id}/desactivar`);
  },

  /**
   * Reactiva un empleado desactivado
   * @param id - ID del empleado
   */
  async reactivar(id: number): Promise<void> {
    await backendApi.post(`${BASE_PATH}/${id}/reactivar`);
  },

  /**
   * Obtiene los lookups para el formulario de empleados (puestos, proyectos, etc.)
   */
  async getLookups(): Promise<EmpleadoLookups> {
    const { data } = await backendApi.get<EmpleadoLookups>('/api/v1/lookups/empleados');
    return data;
  },
};

export default empleadosService;
