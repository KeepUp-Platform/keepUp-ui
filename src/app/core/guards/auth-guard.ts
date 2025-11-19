import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  
  // 1. Buscamos el token en el almacenamiento local
  // (Más adelante esto debería ir en un AuthService.isAuthenticated(), pero así es directo)
  const token = localStorage.getItem('token');

  if (token) {
    // 2. Si hay token, ¡Pase adelante!
    return true;
  } else {
    // 3. Si NO hay token, redirigir al login
    console.warn('Acceso denegado: No hay sesión activa.');
    router.navigate(['/auth/login']);
    return false;
  }
};