'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { DatePicker, parseDateString, formatDateToISO } from '@/components/ui/date-picker';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  User,
  Mail,
  MapPin,
  Building2,
  Briefcase,
  GraduationCap,
  Heart,
  Loader2,
  AlertCircle,
  Pencil,
  X,
  Save,
} from 'lucide-react';
import { empleadosService } from '@/lib/services/empleados.service';
import type { EmpleadoDetalleDto, EditarEmpleadoDto, EmpleadoLookups } from '@/types/empleados';
import { EstadoEmpleado, estadoEmpleadoLabels, estadoEmpleadoVariants } from '@/types/empleados';
import { toast } from 'sonner';

interface DetalleEmpleadoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  empleadoId: number | null;
  onUpdate?: () => void;
}

export function DetalleEmpleadoDialog({
  open,
  onOpenChange,
  empleadoId,
  onUpdate,
}: DetalleEmpleadoDialogProps) {
  const [empleado, setEmpleado] = useState<EmpleadoDetalleDto | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lookups, setLookups] = useState<EmpleadoLookups | null>(null);
  const [formData, setFormData] = useState<EditarEmpleadoDto>({});

  useEffect(() => {
    const fetchEmpleado = async () => {
      if (!empleadoId) return;

      try {
        setLoading(true);
        setError(null);
        const [data, lookupsData] = await Promise.all([
          empleadosService.getById(empleadoId),
          empleadosService.getLookups(),
        ]);
        console.log('Empleado cargado:', data);
        console.log('Lookups cargados:', lookupsData);
        setEmpleado(data);
        setLookups(lookupsData);
        // Inicializar formData con los datos del empleado
        setFormData(mapEmpleadoToForm(data));
      } catch (err) {
        console.error('Error al cargar empleado:', err);
        setError('No se pudo cargar la información del empleado');
      } finally {
        setLoading(false);
      }
    };

    if (open && empleadoId) {
      fetchEmpleado();
      setIsEditing(false);
    }
  }, [open, empleadoId]);

  const mapEmpleadoToForm = (emp: EmpleadoDetalleDto): EditarEmpleadoDto => ({
    apellido: emp.apellido,
    nombre: emp.nombre,
    email: emp.email,
    fechaIngreso: emp.fechaIngreso,
    estado: emp.estado,
    puestoId: emp.puestoId ?? undefined,
    cupoVacacionesPersonalizado: emp.cupoVacacionesPersonalizado,
    cupoEstudioAnual: emp.cupoEstudioAnual,
    proyectoId: emp.proyectoId,
    estadoCivilId: emp.estadoCivilId,
    dni: emp.dni,
    cuil: emp.cuil,
    fechaNacimiento: emp.fechaNacimiento,
    celular: emp.celular,
    telefonoEmergencia: emp.telefonoEmergencia,
    direccion: emp.direccion,
    codigoPostal: emp.codigoPostal,
    barrio: emp.barrio,
    zona: emp.zona,
    obraSocial: emp.obraSocial,
    estudiosMax: emp.estudiosMax,
    carrera: emp.carrera,
    universidad: emp.universidad,
    conyugeNombre: emp.conyugeNombre,
    cantidadHijos: emp.cantidadHijos,
    nombresHijos: emp.nombresHijos,
    emailPersonal: emp.emailPersonal,
    emailCorporativo: emp.emailCorporativo,
  });

  const handleSave = async () => {
    if (!empleadoId || !empleado) return;

    try {
      setSaving(true);
      console.log('Enviando PUT con formData:', formData);
      await empleadosService.update(empleadoId, formData);
      toast.success('Empleado actualizado correctamente');
      // Recargar datos
      const updated = await empleadosService.getById(empleadoId);
      console.log('GET después del PUT - empleado actualizado:', updated);
      setEmpleado(updated);
      setFormData(mapEmpleadoToForm(updated));
      setIsEditing(false);
      onUpdate?.();
    } catch (err) {
      console.error('Error al actualizar empleado:', err);
      const axiosError = err as { response?: { data?: { detail?: string; title?: string } } };
      const errorMessage = axiosError.response?.data?.detail
        || axiosError.response?.data?.title
        || 'Error al actualizar el empleado';
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (empleado) {
      setFormData(mapEmpleadoToForm(empleado));
    }
    setIsEditing(false);
  };

  const updateField = <K extends keyof EditarEmpleadoDto>(
    field: K,
    value: EditarEmpleadoDto[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const formatFecha = (fecha: string | null) => {
    if (!fecha) return '-';
    return new Date(fecha).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  const calcularEdad = (fechaNacimiento: string | null) => {
    if (!fechaNacimiento) return null;
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  };

  const calcularAntiguedad = (fechaIngreso: string) => {
    const hoy = new Date();
    const ingreso = new Date(fechaIngreso);
    const diff = hoy.getTime() - ingreso.getTime();
    const años = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));
    const meses = Math.floor((diff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));

    if (años > 0) {
      return `${años} año${años > 1 ? 's' : ''}${meses > 0 ? ` y ${meses} mes${meses > 1 ? 'es' : ''}` : ''}`;
    }
    return `${meses} mes${meses !== 1 ? 'es' : ''}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>{isEditing ? 'Editar Empleado' : 'Detalle del Empleado'}</DialogTitle>
            {empleado && !loading && !isEditing && (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="gap-2">
                <Pencil className="size-4" />
                Editar
              </Button>
            )}
          </div>
        </DialogHeader>

        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="size-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="size-12 text-destructive mb-2" />
            <p className="text-destructive">{error}</p>
          </div>
        )}

        {empleado && !loading && !isEditing && (
          <div className="space-y-6">
            {/* Header con info principal */}
            <div className="flex items-start gap-4">
              <Avatar className="size-20">
                <AvatarFallback className="text-2xl">
                  {getInitials(empleado.nombre, empleado.apellido)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-bold">
                    {empleado.nombre} {empleado.apellido}
                  </h2>
                  <Badge variant={estadoEmpleadoVariants[empleado.estado]}>
                    {estadoEmpleadoLabels[empleado.estado]}
                  </Badge>
                </div>
                <p className="text-lg text-muted-foreground">
                  {empleado.puesto || empleado.puestoNombre || 'Sin puesto asignado'}
                </p>
                {(empleado.proyecto || empleado.proyectoNombre) && (
                  <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                    <Building2 className="size-4" />
                    {empleado.proyecto || empleado.proyectoNombre}
                  </div>
                )}
                <p className="text-sm text-muted-foreground mt-1">
                  Antigüedad: {calcularAntiguedad(empleado.fechaIngreso)}
                </p>
              </div>
            </div>

            <Separator />

            {/* Información Personal */}
            <Section icon={User} title="Información Personal">
              <InfoGrid>
                <InfoItem label="DNI" value={empleado.dni} />
                <InfoItem label="CUIL" value={empleado.cuil} />
                <InfoItem
                  label="Fecha de Nacimiento"
                  value={
                    empleado.fechaNacimiento
                      ? `${formatFecha(empleado.fechaNacimiento)} (${calcularEdad(empleado.fechaNacimiento)} años)`
                      : null
                  }
                />
                <InfoItem label="Estado Civil" value={empleado.estadoCivil || empleado.estadoCivilNombre} />
              </InfoGrid>
            </Section>

            <Separator />

            {/* Contacto */}
            <Section icon={Mail} title="Información de Contacto">
              <InfoGrid>
                <InfoItem label="Email Corporativo" value={empleado.emailCorporativo || empleado.email} />
                <InfoItem label="Email Personal" value={empleado.emailPersonal} />
                <InfoItem label="Celular" value={empleado.celular} />
                <InfoItem label="Teléfono de Emergencia" value={empleado.telefonoEmergencia} />
              </InfoGrid>
            </Section>

            <Separator />

            {/* Dirección */}
            <Section icon={MapPin} title="Dirección">
              <InfoGrid>
                <InfoItem label="Dirección" value={empleado.direccion} className="col-span-2" />
                <InfoItem label="Barrio" value={empleado.barrio} />
                <InfoItem label="Zona" value={empleado.zona} />
                <InfoItem label="Código Postal" value={empleado.codigoPostal} />
              </InfoGrid>
            </Section>

            <Separator />

            {/* Laboral */}
            <Section icon={Briefcase} title="Información Laboral">
              <InfoGrid>
                <InfoItem label="Puesto" value={empleado.puesto || empleado.puestoNombre} />
                <InfoItem label="Proyecto" value={empleado.proyecto || empleado.proyectoNombre} />
                <InfoItem label="Fecha de Ingreso" value={formatFecha(empleado.fechaIngreso)} />
                <InfoItem label="Obra Social" value={empleado.obraSocial} />
                <InfoItem
                  label="Cupo Vacaciones"
                  value={
                    empleado.cupoVacacionesPersonalizado != null
                      ? `${empleado.cupoVacacionesPersonalizado} días (personalizado)`
                      : 'Por defecto'
                  }
                />
                <InfoItem
                  label="Cupo Estudio Anual"
                  value={empleado.cupoEstudioAnual != null ? `${empleado.cupoEstudioAnual} días` : '-'}
                />
              </InfoGrid>
            </Section>

            <Separator />

            {/* Estudios */}
            <Section icon={GraduationCap} title="Formación Académica">
              <InfoGrid>
                <InfoItem label="Nivel de Estudios" value={empleado.estudiosMax} />
                <InfoItem label="Carrera" value={empleado.carrera} />
                <InfoItem label="Universidad/Instituto" value={empleado.universidad} className="col-span-2" />
              </InfoGrid>
            </Section>

            <Separator />

            {/* Familia */}
            <Section icon={Heart} title="Información Familiar">
              <InfoGrid>
                <InfoItem label="Cónyuge" value={empleado.conyugeNombre} />
                <InfoItem
                  label="Hijos"
                  value={
                    empleado.cantidadHijos != null
                      ? `${empleado.cantidadHijos} hijo${empleado.cantidadHijos !== 1 ? 's' : ''}`
                      : null
                  }
                />
                <InfoItem label="Nombres de Hijos" value={empleado.nombresHijos} className="col-span-2" />
              </InfoGrid>
            </Section>
          </div>
        )}

        {/* Modo Edición */}
        {empleado && !loading && isEditing && (
          <div className="space-y-6">
            {/* Información Personal */}
            <Section icon={User} title="Información Personal">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Apellido *</Label>
                  <Input
                    value={formData.apellido || ''}
                    onChange={(e) => updateField('apellido', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Nombre *</Label>
                  <Input
                    value={formData.nombre || ''}
                    onChange={(e) => updateField('nombre', e.target.value)}
                  />
                </div>
                <div>
                  <Label>DNI</Label>
                  <Input
                    value={formData.dni || ''}
                    onChange={(e) => updateField('dni', e.target.value)}
                  />
                </div>
                <div>
                  <Label>CUIL</Label>
                  <Input
                    value={formData.cuil || ''}
                    onChange={(e) => updateField('cuil', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Fecha de Nacimiento</Label>
                  <DatePicker
                    value={parseDateString(formData.fechaNacimiento)}
                    onChange={(date) => updateField('fechaNacimiento', formatDateToISO(date))}
                    fromYear={1950}
                    toYear={new Date().getFullYear()}
                  />
                </div>
                <div>
                  <Label>Estado Civil</Label>
                  <Select
                    value={formData.estadoCivilId?.toString() || ''}
                    onValueChange={(v) => updateField('estadoCivilId', v ? parseInt(v) : null)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      {lookups?.estadosCiviles.map((ec) => (
                        <SelectItem key={ec.id} value={ec.id.toString()}>
                          {ec.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Section>

            <Separator />

            {/* Contacto */}
            <Section icon={Mail} title="Información de Contacto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Email Corporativo</Label>
                  <Input
                    type="email"
                    value={formData.emailCorporativo || ''}
                    onChange={(e) => updateField('emailCorporativo', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Email Personal</Label>
                  <Input
                    type="email"
                    value={formData.emailPersonal || ''}
                    onChange={(e) => updateField('emailPersonal', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Celular</Label>
                  <Input
                    value={formData.celular || ''}
                    onChange={(e) => updateField('celular', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Teléfono de Emergencia</Label>
                  <Input
                    value={formData.telefonoEmergencia || ''}
                    onChange={(e) => updateField('telefonoEmergencia', e.target.value)}
                  />
                </div>
              </div>
            </Section>

            <Separator />

            {/* Dirección */}
            <Section icon={MapPin} title="Dirección">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Dirección</Label>
                  <Input
                    value={formData.direccion || ''}
                    onChange={(e) => updateField('direccion', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Barrio</Label>
                  <Input
                    value={formData.barrio || ''}
                    onChange={(e) => updateField('barrio', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Zona</Label>
                  <Input
                    value={formData.zona || ''}
                    onChange={(e) => updateField('zona', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Código Postal</Label>
                  <Input
                    value={formData.codigoPostal || ''}
                    onChange={(e) => updateField('codigoPostal', e.target.value)}
                  />
                </div>
              </div>
            </Section>

            <Separator />

            {/* Laboral */}
            <Section icon={Briefcase} title="Información Laboral">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Estado</Label>
                  <Select
                    value={formData.estado?.toString() || ''}
                    onValueChange={(v) => updateField('estado', parseInt(v) as EstadoEmpleado)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={String(EstadoEmpleado.Activo)}>Activo</SelectItem>
                      <SelectItem value={String(EstadoEmpleado.Licencia)}>En Licencia</SelectItem>
                      <SelectItem value={String(EstadoEmpleado.Inactivo)}>Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Puesto *</Label>
                  <Select
                    value={formData.puestoId?.toString() || ''}
                    onValueChange={(v) => updateField('puestoId', parseInt(v))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar..." />
                    </SelectTrigger>
                    <SelectContent>
                      {lookups?.puestos.map((p) => (
                        <SelectItem key={p.id} value={p.id.toString()}>
                          {p.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Proyecto</Label>
                  <Select
                    value={formData.proyectoId?.toString() || 'sin-asignar'}
                    onValueChange={(v) => updateField('proyectoId', v === 'sin-asignar' ? null : parseInt(v))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sin asignar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sin-asignar">Sin asignar</SelectItem>
                      {lookups?.proyectos.map((p) => (
                        <SelectItem key={p.id} value={p.id.toString()}>
                          {p.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Fecha de Ingreso *</Label>
                  <DatePicker
                    value={parseDateString(formData.fechaIngreso)}
                    onChange={(date) => updateField('fechaIngreso', formatDateToISO(date) || undefined)}
                    fromYear={2000}
                  />
                </div>
                <div>
                  <Label>Obra Social</Label>
                  <Input
                    value={formData.obraSocial || ''}
                    onChange={(e) => updateField('obraSocial', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Cupo Vacaciones (días)</Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Por defecto"
                    value={formData.cupoVacacionesPersonalizado ?? ''}
                    onChange={(e) =>
                      updateField(
                        'cupoVacacionesPersonalizado',
                        e.target.value ? parseInt(e.target.value) : null
                      )
                    }
                  />
                </div>
                <div>
                  <Label>Cupo Estudio Anual (días)</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.cupoEstudioAnual ?? ''}
                    onChange={(e) =>
                      updateField('cupoEstudioAnual', e.target.value ? parseInt(e.target.value) : undefined)
                    }
                  />
                </div>
              </div>
            </Section>

            <Separator />

            {/* Estudios */}
            <Section icon={GraduationCap} title="Formación Académica">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Nivel de Estudios</Label>
                  <Input
                    value={formData.estudiosMax || ''}
                    onChange={(e) => updateField('estudiosMax', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Carrera</Label>
                  <Input
                    value={formData.carrera || ''}
                    onChange={(e) => updateField('carrera', e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Universidad/Instituto</Label>
                  <Input
                    value={formData.universidad || ''}
                    onChange={(e) => updateField('universidad', e.target.value)}
                  />
                </div>
              </div>
            </Section>

            <Separator />

            {/* Familia */}
            <Section icon={Heart} title="Información Familiar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Cónyuge</Label>
                  <Input
                    value={formData.conyugeNombre || ''}
                    onChange={(e) => updateField('conyugeNombre', e.target.value)}
                  />
                </div>
                <div>
                  <Label>Cantidad de Hijos</Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.cantidadHijos ?? ''}
                    onChange={(e) =>
                      updateField('cantidadHijos', e.target.value ? parseInt(e.target.value) : null)
                    }
                  />
                </div>
                <div className="col-span-2">
                  <Label>Nombres de Hijos</Label>
                  <Input
                    value={formData.nombresHijos || ''}
                    onChange={(e) => updateField('nombresHijos', e.target.value)}
                  />
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* Footer con botones de edición */}
        {isEditing && (
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={handleCancel} disabled={saving}>
              <X className="size-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <Loader2 className="size-4 mr-2 animate-spin" />
              ) : (
                <Save className="size-4 mr-2" />
              )}
              Guardar
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Componentes auxiliares
function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="flex items-center gap-2 font-semibold mb-3">
        <Icon className="size-5 text-primary" />
        {title}
      </h3>
      {children}
    </div>
  );
}

function InfoGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>;
}

function InfoItem({
  label,
  value,
  className = '',
}: {
  label: string;
  value: string | number | null | undefined;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value ?? '-'}</p>
    </div>
  );
}
