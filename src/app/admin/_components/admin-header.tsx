'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Home, User, LayoutDashboard, Bell, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function AdminHeader() {
  const { theme, setTheme } = useTheme();

  // Datos hardcodeados mientras no hay autenticación
  const fullName = 'Admin';
  const initials = 'A';

  return (
    <header className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3 border-b bg-card sticky top-0 z-10 w-full">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="-ml-2" />
        <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
          <LayoutDashboard className="size-4" />
          <span className="text-sm font-medium">Panel de Administración</span>
        </div>
        <Badge variant="default" className="hidden md:inline-flex">
          Admin
        </Badge>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="hidden sm:flex">
          <Link href="/">
            <Home className="size-5" />
            <span className="sr-only">Ir al sitio</span>
          </Link>
        </Button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="size-5" />
          <span className="sr-only">Notificaciones</span>
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className="relative cursor-pointer"
        >
          <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Cambiar tema</span>
        </Button>

        <div className="h-5 w-px bg-border mx-2 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{fullName}</p>
                <p className="text-xs leading-none text-muted-foreground">admin@americavirtual.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/perfil" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Mi perfil
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
