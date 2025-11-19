import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  
  // 1. Recuperar el token
  const token = localStorage.getItem('token');

  // 2. Si existe, clonamos la petición y le agregamos el header
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  // 3. Si no hay token, dejamos pasar la petición tal cual (ej. Login/Registro)
  return next(req);
};