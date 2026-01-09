"use client"

import * as React from "react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  /** Año inicial del rango (default: 1970) */
  fromYear?: number
  /** Año final del rango (default: año actual + 5) */
  toYear?: number
}

/**
 * Convierte un string de fecha (YYYY-MM-DD o ISO) a Date local sin problemas de timezone
 */
export function parseDateString(dateStr: string | null | undefined): Date | undefined {
  if (!dateStr) return undefined;
  // Si es formato ISO con time (2024-01-15T00:00:00), extraer solo la fecha
  const dateOnly = dateStr.split('T')[0];
  const [year, month, day] = dateOnly.split('-').map(Number);
  // Crear fecha usando componentes locales (no UTC)
  return new Date(year, month - 1, day);
}

/**
 * Convierte un Date a string YYYY-MM-DD sin problemas de timezone
 */
export function formatDateToISO(date: Date | undefined): string | null {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function DatePicker({
  value,
  onChange,
  placeholder = "dd/mm/aaaa",
  disabled,
  className,
  fromYear = 1970,
  toYear = new Date().getFullYear() + 5,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 size-4" />
          {value ? format(value, "dd/MM/yyyy", { locale: es }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          startMonth={new Date(fromYear, 0)}
          endMonth={new Date(toYear, 11)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
