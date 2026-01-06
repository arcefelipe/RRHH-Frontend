'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Cpu,
  Search,
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  Code2,
  Database,
  Cloud,
  Smartphone,
  Globe,
  Server,
} from 'lucide-react';

// Datos de ejemplo hardcodeados
const mockTecnologias = [
  { id: 1, nombre: 'React', categoria: 'Frontend', version: '18.2', proyectos: 8, color: '#61DAFB' },
  { id: 2, nombre: 'Next.js', categoria: 'Frontend', version: '15.0', proyectos: 6, color: '#000000' },
  { id: 3, nombre: 'TypeScript', categoria: 'Lenguaje', version: '5.3', proyectos: 12, color: '#3178C6' },
  { id: 4, nombre: 'Node.js', categoria: 'Backend', version: '20 LTS', proyectos: 10, color: '#339933' },
  { id: 5, nombre: 'NestJS', categoria: 'Backend', version: '11.0', proyectos: 5, color: '#E0234E' },
  { id: 6, nombre: 'PostgreSQL', categoria: 'Base de Datos', version: '17', proyectos: 8, color: '#4169E1' },
  { id: 7, nombre: 'MongoDB', categoria: 'Base de Datos', version: '7.0', proyectos: 3, color: '#47A248' },
  { id: 8, nombre: 'Docker', categoria: 'DevOps', version: '24.0', proyectos: 9, color: '#2496ED' },
  { id: 9, nombre: 'AWS', categoria: 'Cloud', version: '-', proyectos: 6, color: '#FF9900' },
  { id: 10, nombre: 'Tailwind CSS', categoria: 'Frontend', version: '4.0', proyectos: 7, color: '#06B6D4' },
  { id: 11, nombre: 'Prisma', categoria: 'ORM', version: '6.0', proyectos: 5, color: '#2D3748' },
  { id: 12, nombre: 'Redis', categoria: 'Base de Datos', version: '7.2', proyectos: 4, color: '#DC382D' },
  { id: 13, nombre: 'GraphQL', categoria: 'API', version: '-', proyectos: 2, color: '#E10098' },
  { id: 14, nombre: 'Flutter', categoria: 'Mobile', version: '3.16', proyectos: 2, color: '#02569B' },
  { id: 15, nombre: 'Python', categoria: 'Lenguaje', version: '3.12', proyectos: 3, color: '#3776AB' },
];

const categoriaConfig: Record<string, { icon: typeof Code2; color: string }> = {
  Frontend: { icon: Globe, color: 'bg-blue-500/10 text-blue-500' },
  Backend: { icon: Server, color: 'bg-green-500/10 text-green-500' },
  'Base de Datos': { icon: Database, color: 'bg-purple-500/10 text-purple-500' },
  Lenguaje: { icon: Code2, color: 'bg-amber-500/10 text-amber-500' },
  DevOps: { icon: Cloud, color: 'bg-cyan-500/10 text-cyan-500' },
  Cloud: { icon: Cloud, color: 'bg-orange-500/10 text-orange-500' },
  ORM: { icon: Database, color: 'bg-slate-500/10 text-slate-500' },
  API: { icon: Globe, color: 'bg-pink-500/10 text-pink-500' },
  Mobile: { icon: Smartphone, color: 'bg-indigo-500/10 text-indigo-500' },
};

export default function TecnologiasPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoriaFilter, setCategoriaFilter] = useState<string>('all');

  const categorias = [...new Set(mockTecnologias.map((t) => t.categoria))];

  const filteredTecnologias = mockTecnologias.filter((tech) => {
    const matchesSearch =
      !searchTerm ||
      tech.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tech.categoria.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = categoriaFilter === 'all' || tech.categoria === categoriaFilter;
    return matchesSearch && matchesCategoria;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Tecnologias</h1>
          <p className="text-muted-foreground">Stack tecnologico de la empresa</p>
        </div>
        <Button className="gap-2">
          <Plus className="size-4" />
          Nueva Tecnologia
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Cpu className="size-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockTecnologias.length}</p>
                <p className="text-sm text-muted-foreground">Total Tecnologias</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Globe className="size-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockTecnologias.filter((t) => t.categoria === 'Frontend').length}
                </p>
                <p className="text-sm text-muted-foreground">Frontend</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Server className="size-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockTecnologias.filter((t) => t.categoria === 'Backend').length}
                </p>
                <p className="text-sm text-muted-foreground">Backend</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Database className="size-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockTecnologias.filter((t) => t.categoria === 'Base de Datos').length}
                </p>
                <p className="text-sm text-muted-foreground">Bases de Datos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="size-5" />
            Stack Tecnologico
          </CardTitle>
          <CardDescription>
            Administra las tecnologias utilizadas en los proyectos
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Buscar tecnologia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={categoriaFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCategoriaFilter('all')}
              >
                Todas
              </Button>
              {categorias.map((cat) => (
                <Button
                  key={cat}
                  variant={categoriaFilter === cat ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCategoriaFilter(cat)}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tecnologia</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead className="hidden sm:table-cell">Version</TableHead>
                  <TableHead className="hidden md:table-cell">Proyectos</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTecnologias.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <Cpu className="size-12 mx-auto text-muted-foreground mb-2" />
                      <p className="text-muted-foreground">No se encontraron tecnologias</p>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTecnologias.map((tech) => {
                    const catConfig = categoriaConfig[tech.categoria];
                    const IconCategoria = catConfig?.icon || Cpu;

                    return (
                      <TableRow key={tech.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div
                              className="size-8 rounded-lg flex items-center justify-center text-white text-xs font-bold"
                              style={{ backgroundColor: tech.color }}
                            >
                              {tech.nombre.substring(0, 2).toUpperCase()}
                            </div>
                            <span className="font-medium">{tech.nombre}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`gap-1 ${catConfig?.color || ''}`}>
                            <IconCategoria className="size-3" />
                            {tech.categoria}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          <code className="text-sm bg-muted px-2 py-1 rounded">{tech.version}</code>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="secondary">{tech.proyectos} proyectos</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
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
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
