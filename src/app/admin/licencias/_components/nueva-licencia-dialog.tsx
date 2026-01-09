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
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/date-picker';
import { differenceInDays } from 'date-fns';

interface NuevaLicenciaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (data: LicenciaFormData) => void;
}

interface LicenciaFormData {
  empleadoId: string;
  tipoLicencia: string;
  fechaDesde: Date | undefined;
  fechaHasta: Date | undefined;
  dias: number;
  estado: string;
  comentario: string;
  requiereCertificado: boolean;
  certificadoEntregado: boolean;
}

const initialFormData: LicenciaFormData = {
  empleadoId: '',
  tipoLicencia: '',
  fechaDesde: undefined,
  fechaHasta: undefined,
  dias: 0,
  estado: 'pendiente',
  comentario: '',
  requiereCertificado: false,
  certificadoEntregado: false,
};

// Datos mock
const empleados = [
  { id: '1', nombre: 'Juan Carlos Pérez González' },
  { id: '2', nombre: 'María Laura García López' },
  { id: '3', nombre: 'Carlos Alberto Rodríguez Martín' },
  { id: '4', nombre: 'Ana Sofía Martínez Ruiz' },
  { id: '5', nombre: 'Pedro José Sánchez Díaz' },
  { id: '6', nombre: 'Laura Elena Fernández Torres' },
];

const tiposLicencia = [
  'Vacaciones',
  'Enfermedad',
  'Personal',
  'Maternidad',
  'Paternidad',
  'Estudio',
  'Otro',
];

const estados = ['Pendiente', 'Aprobada', 'Rechazada'];

export function NuevaLicenciaDialog({
  open,
  onOpenChange,
  onSave,
}: NuevaLicenciaDialogProps) {
  const [formData, setFormData] = useState<LicenciaFormData>(initialFormData);

  // Calcular dias automaticamente
  useEffect(() => {
    if (formData.fechaDesde && formData.fechaHasta) {
      const dias = differenceInDays(formData.fechaHasta, formData.fechaDesde) + 1;
      setFormData((prev) => ({ ...prev, dias: dias > 0 ? dias : 0 }));
    } else {
      setFormData((prev) => ({ ...prev, dias: 0 }));
    }
  }, [formData.fechaDesde, formData.fechaHasta]);

  const updateField = <K extends keyof LicenciaFormData>(
    field: K,
    value: LicenciaFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave?.(formData);
    setFormData(initialFormData);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setFormData(initialFormData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nueva Licencia</DialogTitle>
          <DialogDescription>
            Completa los datos para registrar una nueva licencia
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Fila 1: Empleado, Tipo de Licencia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Empleado</Label>
              <Select
                value={formData.empleadoId}
                onValueChange={(v) => updateField('empleadoId', v)}
              >
                <SelectTrigger className="w-full" aria-label="Seleccionar empleado">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  {empleados.map((emp) => (
                    <SelectItem key={emp.id} value={emp.id}>
                      {emp.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo de Licencia</Label>
              <Select
                value={formData.tipoLicencia}
                onValueChange={(v) => updateField('tipoLicencia', v)}
              >
                <SelectTrigger className="w-full" aria-label="Seleccionar tipo de licencia">
                  <SelectValue placeholder="Seleccionar..." />
                </SelectTrigger>
                <SelectContent>
                  {tiposLicencia.map((tipo) => (
                    <SelectItem key={tipo} value={tipo.toLowerCase()}>
                      {tipo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Fila 2: Fecha Desde, Fecha Hasta, Dias */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Fecha Desde</Label>
              <DatePicker
                value={formData.fechaDesde}
                onChange={(date) => updateField('fechaDesde', date)}
              />
            </div>
            <div className="space-y-2">
              <Label>Fecha Hasta</Label>
              <DatePicker
                value={formData.fechaHasta}
                onChange={(date) => updateField('fechaHasta', date)}
              />
            </div>
            <div className="space-y-2 col-span-2 sm:col-span-1">
              <Label>Dias</Label>
              <Input
                type="number"
                value={formData.dias}
                readOnly
                className="bg-muted"
              />
            </div>
          </div>

          {/* Fila 3: Estado */}
          <div className="space-y-2">
            <Label>Estado</Label>
            <Select
              value={formData.estado}
              onValueChange={(v) => updateField('estado', v)}
            >
              <SelectTrigger className="w-full sm:w-50" aria-label="Seleccionar estado">
                <SelectValue placeholder="Seleccionar..." />
              </SelectTrigger>
              <SelectContent>
                {estados.map((estado) => (
                  <SelectItem key={estado} value={estado.toLowerCase()}>
                    {estado}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fila 4: Comentario */}
          <div className="space-y-2">
            <Label>Comentario</Label>
            <Textarea
              placeholder="Observaciones..."
              value={formData.comentario}
              onChange={(e) => updateField('comentario', e.target.value)}
              rows={3}
            />
          </div>

          {/* Fila 5: Checkboxes */}
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="requiereCertificado"
                checked={formData.requiereCertificado}
                onCheckedChange={(checked) =>
                  updateField('requiereCertificado', checked === true)
                }
              />
              <Label htmlFor="requiereCertificado" className="font-normal">
                Requiere Certificado
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="certificadoEntregado"
                checked={formData.certificadoEntregado}
                onCheckedChange={(checked) =>
                  updateField('certificadoEntregado', checked === true)
                }
              />
              <Label htmlFor="certificadoEntregado" className="font-normal">
                Certificado Entregado
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
