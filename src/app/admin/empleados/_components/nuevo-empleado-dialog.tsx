'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker, formatDateToISO } from '@/components/ui/date-picker';
import { User, MapPin, Briefcase, Loader2, GraduationCap, Heart } from 'lucide-react';
import { empleadosService } from '@/lib/services/empleados.service';
import type { CrearEmpleadoDto, EmpleadoLookups } from '@/types/empleados';
import { EstadoEmpleado } from '@/types/empleados';
import { toast } from 'sonner';

interface NuevoEmpleadoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

interface EmpleadoFormData {
  // Datos Personales (Obligatorios: apellido, nombre)
  apellido: string;
  nombre: string;
  dni: string;
  cuil: string;
  fechaNacimiento: Date | undefined;
  estadoCivilId: string;
  emailPersonal: string;
  obraSocial: string;
  celular: string;
  telefonoEmergencia: string;
  // Domicilio
  direccion: string;
  codigoPostal: string;
  barrio: string;
  zona: string;
  // Datos Laborales (Obligatorios: fechaIngreso, puestoId)
  email: string;
  emailCorporativo: string;
  fechaIngreso: Date | undefined;
  puestoId: string;
  proyectoId: string;
  estado: string;
  cupoEstudioAnual: string;
  cupoVacacionesPersonalizado: string;
  // Estudios
  estudiosMax: string;
  carrera: string;
  universidad: string;
  // Familia
  conyugeNombre: string;
  cantidadHijos: string;
  nombresHijos: string;
}

const initialFormData: EmpleadoFormData = {
  apellido: '',
  nombre: '',
  dni: '',
  cuil: '',
  fechaNacimiento: undefined,
  estadoCivilId: '',
  emailPersonal: '',
  obraSocial: '',
  celular: '',
  telefonoEmergencia: '',
  direccion: '',
  codigoPostal: '',
  barrio: '',
  zona: '',
  email: '',
  emailCorporativo: '',
  fechaIngreso: new Date(), // Default: hoy
  puestoId: '',
  proyectoId: '',
  estado: String(EstadoEmpleado.Activo),
  cupoEstudioAnual: '',
  cupoVacacionesPersonalizado: '',
  estudiosMax: '',
  carrera: '',
  universidad: '',
  conyugeNombre: '',
  cantidadHijos: '',
  nombresHijos: '',
};

export function NuevoEmpleadoDialog({ open, onOpenChange, onSuccess }: NuevoEmpleadoDialogProps) {
  const [formData, setFormData] = useState<EmpleadoFormData>(initialFormData);
  const [lookups, setLookups] = useState<EmpleadoLookups | null>(null);
  const [loadingLookups, setLoadingLookups] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadLookups = async () => {
      try {
        setLoadingLookups(true);
        const data = await empleadosService.getLookups();
        setLookups(data);
      } catch (err) {
        console.error('Error al cargar lookups:', err);
        toast.error('Error al cargar los datos del formulario');
      } finally {
        setLoadingLookups(false);
      }
    };

    if (open) {
      loadLookups();
    }
  }, [open]);

  const updateField = <K extends keyof EmpleadoFormData>(
    field: K,
    value: EmpleadoFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    // Validaciones - solo campos obligatorios
    if (!formData.apellido.trim()) {
      toast.error('El apellido es requerido');
      return;
    }
    if (!formData.nombre.trim()) {
      toast.error('El nombre es requerido');
      return;
    }
    if (!formData.fechaIngreso) {
      toast.error('La fecha de ingreso es requerida');
      return;
    }
    if (!formData.puestoId || parseInt(formData.puestoId) === 0) {
      toast.error('Seleccioná un puesto válido');
      return;
    }

    try {
      setSaving(true);

      const puestoId = parseInt(formData.puestoId);
      if (isNaN(puestoId) || puestoId < 1) {
        toast.error('El puesto seleccionado no es válido');
        setSaving(false);
        return;
      }

      const empleadoDto: CrearEmpleadoDto = {
        // Obligatorios
        apellido: formData.apellido.trim(),
        nombre: formData.nombre.trim(),
        fechaIngreso: formatDateToISO(formData.fechaIngreso)!,
        puestoId: puestoId,
        // Opcionales
        email: formData.email?.trim() || null,
        estado: parseInt(formData.estado) as EstadoEmpleado,
        cupoEstudioAnual: formData.cupoEstudioAnual ? parseInt(formData.cupoEstudioAnual) : 0,
        cupoVacacionesPersonalizado: formData.cupoVacacionesPersonalizado
          ? parseInt(formData.cupoVacacionesPersonalizado)
          : null,
        proyectoId: formData.proyectoId ? parseInt(formData.proyectoId) : null,
        estadoCivilId: formData.estadoCivilId ? parseInt(formData.estadoCivilId) : null,
        dni: formData.dni?.trim() || null,
        cuil: formData.cuil?.trim() || null,
        fechaNacimiento: formatDateToISO(formData.fechaNacimiento),
        celular: formData.celular?.trim() || null,
        telefonoEmergencia: formData.telefonoEmergencia?.trim() || null,
        direccion: formData.direccion?.trim() || null,
        codigoPostal: formData.codigoPostal?.trim() || null,
        barrio: formData.barrio?.trim() || null,
        zona: formData.zona?.trim() || null,
        obraSocial: formData.obraSocial?.trim() || null,
        emailPersonal: formData.emailPersonal?.trim() || null,
        emailCorporativo: formData.emailCorporativo?.trim() || null,
        estudiosMax: formData.estudiosMax?.trim() || null,
        carrera: formData.carrera?.trim() || null,
        universidad: formData.universidad?.trim() || null,
        conyugeNombre: formData.conyugeNombre?.trim() || null,
        cantidadHijos: formData.cantidadHijos ? parseInt(formData.cantidadHijos) : null,
        nombresHijos: formData.nombresHijos?.trim() || null,
      };

      await empleadosService.create(empleadoDto);
      toast.success('Empleado creado correctamente');
      setFormData(initialFormData);
      onOpenChange(false);
      onSuccess?.();
    } catch (err: unknown) {
      console.error('Error al crear empleado:', err);
      const axiosError = err as { response?: { data?: { detail?: string; title?: string } } };
      const errorMessage = axiosError.response?.data?.detail
        || axiosError.response?.data?.title
        || 'Error al crear el empleado';
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="lg:min-w-200 max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader className="pb-2">
          <DialogTitle className="flex items-center gap-2">
            <User className="size-5" />
            Nuevo Empleado
          </DialogTitle>
          <DialogDescription>
            Completa los datos para registrar un nuevo empleado. Los campos con * son obligatorios.
          </DialogDescription>
        </DialogHeader>

        {loadingLookups ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="size-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Cargando formulario...</span>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Datos Personales */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                <User className="size-4" />
                Datos Personales
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
                <div className="space-y-2">
                  <Label htmlFor="apellido">Apellido *</Label>
                  <Input
                    id="apellido"
                    placeholder="Apellido"
                    value={formData.apellido}
                    onChange={(e) => updateField('apellido', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre *</Label>
                  <Input
                    id="nombre"
                    placeholder="Nombre"
                    value={formData.nombre}
                    onChange={(e) => updateField('nombre', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dni">DNI</Label>
                  <Input
                    id="dni"
                    placeholder="12345678"
                    value={formData.dni}
                    onChange={(e) => updateField('dni', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cuil">CUIL</Label>
                  <Input
                    id="cuil"
                    placeholder="20-12345678-9"
                    value={formData.cuil}
                    onChange={(e) => updateField('cuil', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fecha Nacimiento</Label>
                  <DatePicker
                    value={formData.fechaNacimiento}
                    onChange={(date) => updateField('fechaNacimiento', date)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Estado Civil</Label>
                  <Select
                    value={formData.estadoCivilId}
                    onValueChange={(v) => updateField('estadoCivilId', v)}
                  >
                    <SelectTrigger aria-label="Seleccionar estado civil">
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      {lookups?.estadosCiviles.map((estado) => (
                        <SelectItem key={estado.id} value={String(estado.id)}>
                          {estado.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailPersonal">Email Personal</Label>
                  <Input
                    id="emailPersonal"
                    type="email"
                    placeholder="email@ejemplo.com"
                    value={formData.emailPersonal}
                    onChange={(e) => updateField('emailPersonal', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="obraSocial">Obra Social</Label>
                  <Input
                    id="obraSocial"
                    placeholder="OSDE, Swiss Medical, etc."
                    value={formData.obraSocial}
                    onChange={(e) => updateField('obraSocial', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="celular">Celular</Label>
                  <Input
                    id="celular"
                    placeholder="+54 11 1234-5678"
                    value={formData.celular}
                    onChange={(e) => updateField('celular', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefonoEmergencia">Tel. Emergencia</Label>
                  <Input
                    id="telefonoEmergencia"
                    placeholder="+54 11 1234-5678"
                    value={formData.telefonoEmergencia}
                    onChange={(e) => updateField('telefonoEmergencia', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Domicilio */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                <MapPin className="size-4" />
                Domicilio
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
                <div className="space-y-2 lg:col-span-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    placeholder="Calle 123, Piso 1, Depto A"
                    value={formData.direccion}
                    onChange={(e) => updateField('direccion', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="barrio">Barrio</Label>
                  <Input
                    id="barrio"
                    placeholder="Nombre del barrio"
                    value={formData.barrio}
                    onChange={(e) => updateField('barrio', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zona">Zona</Label>
                  <Input
                    id="zona"
                    placeholder="Zona Norte, Sur, etc."
                    value={formData.zona}
                    onChange={(e) => updateField('zona', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codigoPostal">Código Postal</Label>
                  <Input
                    id="codigoPostal"
                    placeholder="1234"
                    value={formData.codigoPostal}
                    onChange={(e) => updateField('codigoPostal', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Datos Laborales */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Briefcase className="size-4" />
                Datos Laborales
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-3">
                <div className="space-y-2">
                  <Label>Fecha Ingreso *</Label>
                  <DatePicker
                    value={formData.fechaIngreso}
                    onChange={(date) => updateField('fechaIngreso', date)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Puesto *</Label>
                  <Select
                    value={formData.puestoId}
                    onValueChange={(v) => updateField('puestoId', v)}
                  >
                    <SelectTrigger aria-label="Seleccionar puesto">
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      {lookups?.puestos.map((puesto) => (
                        <SelectItem key={puesto.id} value={String(puesto.id)}>
                          {puesto.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Proyecto</Label>
                  <Select
                    value={formData.proyectoId}
                    onValueChange={(v) => updateField('proyectoId', v)}
                  >
                    <SelectTrigger aria-label="Seleccionar proyecto">
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      {lookups?.proyectos.map((proyecto) => (
                        <SelectItem key={proyecto.id} value={String(proyecto.id)}>
                          {proyecto.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Estado</Label>
                  <Select
                    value={formData.estado}
                    onValueChange={(v) => updateField('estado', v)}
                  >
                    <SelectTrigger aria-label="Seleccionar estado">
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={String(EstadoEmpleado.Activo)}>Activo</SelectItem>
                      <SelectItem value={String(EstadoEmpleado.Licencia)}>Inactivo</SelectItem>
                      <SelectItem value={String(EstadoEmpleado.Inactivo)}>De Baja</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Laboral</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="empleado@empresa.com"
                    value={formData.email}
                    onChange={(e) => updateField('email', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailCorporativo">Email Corporativo</Label>
                  <Input
                    id="emailCorporativo"
                    type="email"
                    placeholder="empleado@corp.com"
                    value={formData.emailCorporativo}
                    onChange={(e) => updateField('emailCorporativo', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cupoEstudioAnual">Cupo Estudio Anual</Label>
                  <Input
                    id="cupoEstudioAnual"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.cupoEstudioAnual}
                    onChange={(e) => {
                      const value = e.target.value === '' ? '' : String(Math.max(0, parseInt(e.target.value) || 0));
                      updateField('cupoEstudioAnual', value);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cupoVacacionesPersonalizado">Cupo Vacaciones</Label>
                  <Input
                    id="cupoVacacionesPersonalizado"
                    type="number"
                    min="0"
                    placeholder="Por defecto"
                    value={formData.cupoVacacionesPersonalizado}
                    onChange={(e) => {
                      const value = e.target.value === '' ? '' : String(Math.max(0, parseInt(e.target.value) || 0));
                      updateField('cupoVacacionesPersonalizado', value);
                    }}
                  />
                </div>
              </div>
            </section>

            {/* Estudios */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                <GraduationCap className="size-4" />
                Estudios
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
                <div className="space-y-2">
                  <Label htmlFor="estudiosMax">Nivel Máximo de Estudios</Label>
                  <Input
                    id="estudiosMax"
                    placeholder="Universitario, Secundario, etc."
                    value={formData.estudiosMax}
                    onChange={(e) => updateField('estudiosMax', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carrera">Carrera</Label>
                  <Input
                    id="carrera"
                    placeholder="Ingeniería en Sistemas, etc."
                    value={formData.carrera}
                    onChange={(e) => updateField('carrera', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="universidad">Universidad / Institución</Label>
                  <Input
                    id="universidad"
                    placeholder="UBA, UTN, etc."
                    value={formData.universidad}
                    onChange={(e) => updateField('universidad', e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* Familia */}
            <section>
              <h3 className="flex items-center gap-2 text-sm font-semibold mb-3">
                <Heart className="size-4" />
                Familia
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
                <div className="space-y-2">
                  <Label htmlFor="conyugeNombre">Nombre del Cónyuge</Label>
                  <Input
                    id="conyugeNombre"
                    placeholder="Nombre completo"
                    value={formData.conyugeNombre}
                    onChange={(e) => updateField('conyugeNombre', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cantidadHijos">Cantidad de Hijos</Label>
                  <Input
                    id="cantidadHijos"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={formData.cantidadHijos}
                    onChange={(e) => {
                      const value = e.target.value === '' ? '' : String(Math.max(0, parseInt(e.target.value) || 0));
                      updateField('cantidadHijos', value);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nombresHijos">Nombres de Hijos</Label>
                  <Input
                    id="nombresHijos"
                    placeholder="Juan, María, etc."
                    value={formData.nombresHijos}
                    onChange={(e) => updateField('nombresHijos', e.target.value)}
                  />
                </div>
              </div>
            </section>
          </div>
        )}

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={handleCancel} disabled={saving}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving || loadingLookups}>
            {saving ? (
              <>
                <Loader2 className="size-4 mr-2 animate-spin" />
                Guardando...
              </>
            ) : (
              'Guardar Empleado'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
