import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../../../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // [Task-F-02] Método Register
  register(userData: User): Observable<boolean> {
    // Simulación de validación de backend
    if (userData.email === 'error@test.com') {
      return throwError(() => new Error('El correo ya está registrado'));
    }

    console.log('Registrando usuario en el servidor (Mock):', userData);
    
    // Simulamos éxito tras 1 segundo
    return of(true).pipe(delay(1000));
  }

  // Método Login (Placeholder para más adelante)
  login(credentials: any): Observable<any> {
    return of({ token: 'fake-jwt-token', user: { name: 'Samuel' } }).pipe(delay(800));
  }
}