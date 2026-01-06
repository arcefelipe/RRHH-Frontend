'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Newspaper,
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  Calendar,
  FileText,
  Send,
  Clock,
} from 'lucide-react';

// Datos de ejemplo hardcodeados
const mockNoticias = [
  {
    id: 1,
    titulo: 'Cierre de oficinas por fiestas',
    contenido: 'Informamos que las oficinas permanecerán cerradas del 23 de diciembre al 2 de enero inclusive. Les deseamos felices fiestas.',
    autor: { nombre: 'Ana', apellido: 'Martínez' },
    fecha_publicacion: '2025-12-15',
    estado: 'publicado',
    categoria: 'anuncio',
    destacado: true,
  },
  {
    id: 2,
    titulo: 'Nuevo sistema de gestión de licencias',
    contenido: 'A partir del 1 de febrero estará disponible el nuevo sistema para solicitar licencias de forma online. Capacitaciones disponibles.',
    autor: { nombre: 'Pedro', apellido: 'Sánchez' },
    fecha_publicacion: '2026-01-05',
    estado: 'publicado',
    categoria: 'sistema',
    destacado: true,
  },
  {
    id: 3,
    titulo: 'Bienvenida a nuevos empleados',
    contenido: 'Damos la bienvenida a los 5 nuevos integrantes que se suman a nuestro equipo en el área de Desarrollo.',
    autor: { nombre: 'María', apellido: 'García' },
    fecha_publicacion: '2026-01-08',
    estado: 'publicado',
    categoria: 'rrhh',
    destacado: false,
  },
  {
    id: 4,
    titulo: 'Actualización de políticas de home office',
    contenido: 'Se han actualizado las políticas de trabajo remoto. Por favor revisar el documento adjunto y firmar conformidad.',
    autor: { nombre: 'Carlos', apellido: 'Rodríguez' },
    fecha_publicacion: null,
    estado: 'borrador',
    categoria: 'politicas',
    destacado: false,
  },
  {
    id: 5,
    titulo: 'Evento de fin de año',
    contenido: 'Los invitamos a la fiesta de fin de año que se realizará el viernes 20 de diciembre a las 19hs en el salón principal.',
    autor: { nombre: 'Ana', apellido: 'Martínez' },
    fecha_publicacion: '2025-12-10',
    estado: 'publicado',
    categoria: 'evento',
    destacado: false,
  },
  {
    id: 6,
    titulo: 'Mantenimiento programado de sistemas',
    contenido: 'El sábado 15 de enero se realizará mantenimiento de los sistemas entre las 22hs y las 6hs. Algunos servicios podrían no estar disponibles.',
    autor: { nombre: 'Pedro', apellido: 'Sánchez' },
    fecha_publicacion: null,
    estado: 'programado',
    categoria: 'sistema',
    destacado: false,
  },
];

const categoriaConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  anuncio: { label: 'Anuncio', variant: 'default' },
  sistema: { label: 'Sistema', variant: 'secondary' },
  rrhh: { label: 'RRHH', variant: 'outline' },
  politicas: { label: 'Políticas', variant: 'outline' },
  evento: { label: 'Evento', variant: 'default' },
};

const estadoConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: typeof Send }> = {
  publicado: { label: 'Publicado', variant: 'default', icon: Send },
  borrador: { label: 'Borrador', variant: 'outline', icon: FileText },
  programado: { label: 'Programado', variant: 'secondary', icon: Clock },
};

export default function NoticiasPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNoticias = mockNoticias.filter((noticia) => {
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      noticia.titulo.toLowerCase().includes(term) ||
      noticia.contenido.toLowerCase().includes(term)
    );
  });

  const formatFecha = (fecha: string | null) => {
    if (!fecha) return 'Sin publicar';
    return new Date(fecha).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getInitials = (nombre: string, apellido: string) => {
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  // Stats
  const totalPublicados = mockNoticias.filter(n => n.estado === 'publicado').length;
  const totalBorradores = mockNoticias.filter(n => n.estado === 'borrador').length;
  const totalProgramados = mockNoticias.filter(n => n.estado === 'programado').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Noticias</h1>
          <p className="text-muted-foreground">Comunicados y novedades de la empresa</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Nueva Noticia
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Newspaper className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockNoticias.length}</p>
                <p className="text-sm text-muted-foreground">Total Noticias</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Send className="size-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalPublicados}</p>
                <p className="text-sm text-muted-foreground">Publicadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-lg">
                <FileText className="size-6 text-amber-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalBorradores}</p>
                <p className="text-sm text-muted-foreground">Borradores</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Clock className="size-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">{totalProgramados}</p>
                <p className="text-sm text-muted-foreground">Programadas</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
          placeholder="Buscar noticias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredNoticias.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Newspaper className="size-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron noticias</p>
            </CardContent>
          </Card>
        ) : (
          filteredNoticias.map((noticia) => {
            const estadoCfg = estadoConfig[noticia.estado];
            const IconEstado = estadoCfg?.icon || Newspaper;

            return (
              <Card key={noticia.id} className={`overflow-hidden ${noticia.destacado ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {noticia.destacado && (
                          <Badge variant="default" className="text-xs">Destacado</Badge>
                        )}
                        <Badge variant={categoriaConfig[noticia.categoria]?.variant || 'outline'}>
                          {categoriaConfig[noticia.categoria]?.label || noticia.categoria}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{noticia.titulo}</CardTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="size-4 mr-2" />
                          Ver
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Pencil className="size-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="size-4 mr-2" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="line-clamp-3">
                    {noticia.contenido}
                  </CardDescription>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-6">
                        <AvatarFallback className="text-xs">
                          {getInitials(noticia.autor.nombre, noticia.autor.apellido)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        {noticia.autor.nombre} {noticia.autor.apellido}
                      </span>
                    </div>
                    <Badge variant={estadoCfg?.variant || 'outline'} className="gap-1">
                      <IconEstado className="size-3" />
                      {estadoCfg?.label || noticia.estado}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="size-3" />
                    {formatFecha(noticia.fecha_publicacion)}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
