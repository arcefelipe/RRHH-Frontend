'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, MapPin, Mail } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

export function Footer() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  // No mostrar Footer en rutas de admin
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Building2 className="h-6 w-6" />
              <span className="font-bold text-xl">América Virtual RRHH</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Sistema de gestion de Recursos Humanos.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Sistema</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/admin/empleados" className="hover:text-primary">
                  Empleados
                </Link>
              </li>
              <li>
                <Link href="/admin/proyectos" className="hover:text-primary">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/admin/licencias" className="hover:text-primary">
                  Licencias
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-semibold mb-4">Mi Cuenta</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {!isAuthenticated && (
                <>
                  <li>
                    <Link href="/login" className="hover:text-primary">
                      Ingresar
                    </Link>
                  </li>
                  <li>
                    <Link href="/registro" className="hover:text-primary">
                      Registrarse
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link href="/perfil" className="hover:text-primary">
                  Mi Perfil
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>
                  Buenos Aires<br />
                  Argentina
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0" />
                <span>contacto@americavirtual.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} América Virtual RRHH. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
