import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User } from '../../../core/models/user';

// Interfaces para tipado estricto
interface AuthResponse {
  token: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) { }

  register(userData: User): Observable<boolean> {
    const requestPayload = {
      name: userData.fullName,
      email: userData.email,
      password: userData.password
    };

    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, requestPayload)
      .pipe(
        map(response => {
          if (response && response.token) {
            // Opcional: Auto-login al registrarse
            // localStorage.setItem('token', response.token);
            return true;
          }
          return false;
        })
      );
  }

  login(credentials: LoginRequest): Observable<boolean> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        map(response => {
          // Si el backend devuelve un token, el login es exitoso
          if (response && response.token) {
            console.log('Login exitoso. Guardando token...');
            // [CLAVE] Guardamos el token. Esto activa el AuthGuard y el Interceptor automáticamente
            localStorage.setItem('token', response.token);
            return true;
          }
          return false;
        }),
        catchError(error => {
          console.error('Error en login:', error);
          throw error;
        })
      );
  }

  // 3. Logout
  logout(): void {
    localStorage.removeItem('token');
    // Aquí podrías redirigir al login si inyectaras el Router, 
    // pero es mejor hacerlo desde el componente que llama a logout.
  }
  
  // Helper para saber si está logueado (útil para ocultar/mostrar menús)
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}