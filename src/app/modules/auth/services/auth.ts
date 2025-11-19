import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Cliente HTTP real
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment.development'; // Tu URL
import { User } from '../../../core/models/user';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`; // http://localhost:8080/api/auth

  constructor(private http: HttpClient) { }

  // Método Register
  register(userData: User): Observable<boolean> {
    const requestPayload = {
      name: userData.fullName, // Backend espera 'name'
      email: userData.email,
      password: userData.password
    };

    // 2. Petición HTTP POST
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, requestPayload)
      .pipe(
        map(response => {
          // Si el backend responde con token, el registro fue exitoso
          if (response && response.token) {
            console.log('Registro exitoso, token recibido:', response.token);
            return true;
          }
          return false;
        })
      );
  }

  // Dejamos el login mockeado hasta que el backend lo termine
  login(credentials: any): Observable<any> {
    console.warn('⚠️ Login aún en modo MOCK. Esperando endpoint del backend.');
    // ... tu código mock anterior ...
    return new Observable(observer => {
        setTimeout(() => {
            observer.next({ token: 'fake-jwt' });
            observer.complete();
        }, 1000);
    });
  }
}