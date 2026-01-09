'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  CalendarDays,
  Tags,
  Briefcase,
  UserCog,
  Newspaper,
  History,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  Settings,
  Moon,
  Sun,
} from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const navItems = [
  {
    title: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    permission: 'dashboard.ver',
  },
  {
    title: 'Proyectos',
    href: '/admin/proyectos',
    icon: FolderKanban,
    permission: 'proyectos.ver',
  },
  {
    title: 'Empleados',
    href: '/admin/empleados',
    icon: Users,
    permission: 'empleados.ver',
  },
  {
    title: 'Licencias',
    href: '/admin/licencias',
    icon: CalendarDays,
    permission: 'licencias.ver',
  },
  {
    title: 'Noticias',
    href: '/admin/noticias',
    icon: Newspaper,
    permission: 'noticias.ver',
  },
];

const categorias = [
  {
    id: 'puestos',
    title: 'Puestos',
    href: '/admin/categorias/puestos',
    icon: Briefcase,
    permission: 'categorias.ver',
  },
  {
    id: 'roles',
    title: 'Rol',
    href: '/admin/categorias/roles',
    icon: UserCog,
    permission: 'categorias.ver',
  },
];

const adminItems = [
  {
    title: 'Usuarios',
    href: '/admin/usuarios',
    icon: Users,
    permission: 'usuarios.ver',
  },
  {
    title: 'Auditoria',
    href: '/admin/auditoria',
    icon: History,
    permission: 'auditoria.ver',
  },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [categoriasExpanded, setCategoriasExpanded] = React.useState(false);

  // Set initial expanded state after hydration to avoid mismatch
  const initialPathRef = React.useRef(pathname);
  React.useEffect(() => {
    if (initialPathRef.current.startsWith('/admin/categorias')) {
      setCategoriasExpanded(true);
    }
  }, []);

  // Por ahora todos los items están accesibles
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const canAccess = (_permission: string): boolean => true;

  const isActive = (href: string): boolean => {
    if (href === '/admin') {
      return pathname === '/admin';
    }
    return pathname.startsWith(href);
  };

  return (
    <Sidebar collapsible="icon" className="border-r-0! border-none" {...props}>
      <SidebarHeader className="bg-[#ff6859] dark:bg-transparent px-4 pt-4 pb-3 group-data-[collapsible=icon]:px-2 group-data-[collapsible=icon]:pt-3 group-data-[collapsible=icon]:pb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2.5 w-full hover:bg-white/10 rounded-md p-1 -m-1 transition-colors shrink-0">
              <div className="flex size-8 items-center justify-center rounded-lg overflow-hidden shrink-0">
                <Image src="/logo.png" alt="America Virtual" width={32} height={32} className="object-contain" style={{ width: 'auto', height: 'auto' }} />
              </div>
              <div className="flex items-center gap-1.5 group-data-[collapsible=icon]:hidden min-w-0">
                <span className="text-base font-bold text-white dark:text-sidebar-foreground leading-tight whitespace-nowrap">América Virtual RRHH</span>
                <ChevronsUpDown className="size-3.5 text-white/70 dark:text-sidebar-foreground/70 shrink-0" />
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem asChild>
              <Link href="/admin/configuracion">
                <Settings className="size-4" />
                <span>Configuracion</span>
              </Link>
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
      </SidebarHeader>

      <div className="flex flex-col flex-1 bg-white dark:bg-sidebar rounded-xl mt-2 mx-2 mb-2 group-data-[collapsible=icon]:mx-0.5 group-data-[collapsible=icon]:mb-0.5 group-data-[collapsible=icon]:rounded-lg overflow-hidden">
      <SidebarContent className="px-2.5 pt-3 group-data-[collapsible=icon]:px-1">
        {/* Navegacion principal */}
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                if (!canAccess(item.permission)) return null;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      className="h-8"
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Categorias */}
        {canAccess('categorias.ver') && (
          <SidebarGroup className="p-0 mt-2">
            <SidebarGroupLabel className="flex items-center justify-between px-0 h-6">
              <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
                Categorias
              </span>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Collapsible
                    open={categoriasExpanded}
                    onOpenChange={setCategoriasExpanded}
                  >
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="h-8" tooltip="Categorias">
                        <Tags className="size-4" />
                        <span className="flex-1 text-sm">Categorias</span>
                        {categoriasExpanded ? (
                          <ChevronDown className="size-3" />
                        ) : (
                          <ChevronRight className="size-3" />
                        )}
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {categorias.map((cat) => {
                          if (!canAccess(cat.permission)) return null;
                          return (
                            <SidebarMenuSubItem key={cat.id}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={isActive(cat.href)}
                              >
                                <Link href={cat.href}>
                                  <cat.icon className="size-3.5" />
                                  <span>{cat.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          );
                        })}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Administracion */}
        <SidebarGroup className="p-0 mt-2">
          <SidebarGroupLabel className="flex items-center justify-between px-0 h-6">
            <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
              Administracion
            </span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => {
                if (!canAccess(item.permission)) return null;
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive(item.href)}
                      className="h-8"
                      tooltip={item.title}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-4" />
                        <span className="text-sm">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-2.5 pb-3 group-data-[collapsible=icon]:hidden">
        <div className="flex items-center justify-between gap-3 rounded-lg border p-3 bg-gray-50 dark:bg-sidebar-accent">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
              <span className="text-sm font-medium">A</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">Admin</span>
              <span className="text-xs text-muted-foreground truncate">
                Administrador
              </span>
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className="flex size-8 items-center justify-center rounded-md hover:bg-gray-200 dark:hover:bg-sidebar-border transition-colors shrink-0 cursor-pointer"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Cambiar tema</span>
          </button>
        </div>
      </SidebarFooter>
      </div>
    </Sidebar>
  );
}
