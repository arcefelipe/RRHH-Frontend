'use client';

import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface GoogleLoginButtonProps {
  onError?: (error: string) => void;
}

// Verificar si Google OAuth está configurado (fuera del componente para evitar re-renders)
const isGoogleConfigured = !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

export function GoogleLoginButton({ onError }: GoogleLoginButtonProps) {
  const router = useRouter();
  const loginWithGoogle = useAuthStore((state) => state.loginWithGoogle);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) {
      onError?.('No se recibio credencial de Google');
      return;
    }

    setIsLoading(true);
    try {
      await loginWithGoogle(response.credential);
      router.push('/');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al iniciar sesion con Google';
      onError?.(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = () => {
    onError?.('Error al iniciar sesion con Google');
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-2">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
      </div>
    );
  }

  // Si Google OAuth no está configurado, mostrar botón deshabilitado
  if (!isGoogleConfigured) {
    return (
      <div className="w-full flex flex-col items-center gap-2">
        <Button variant="outline" disabled className="w-full max-w-[320px]">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google no configurado
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          Configura NEXT_PUBLIC_GOOGLE_CLIENT_ID para habilitar
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        theme="outline"
        size="large"
        text="continue_with"
        shape="rectangular"
        width={320}
        locale="es"
      />
    </div>
  );
}
