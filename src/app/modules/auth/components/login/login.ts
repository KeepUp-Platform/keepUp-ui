import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false, // Recordatorio: Mantenemos esto false por nuestra arquitectura modular
  templateUrl: './login.html',
  styleUrl: './login.scss' // Recuerda: styleUrls si usas Angular < 17
})
export class Login {

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Intentando iniciar sesión...');
    // Aquí iría la llamada al AuthService real
    
    // Simulamos éxito y redirigimos
    this.router.navigate(['/dashboard']);
  }
}