import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importar Reactive Forms
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  
  loginForm: FormGroup; // Declarar el grupo del formulario
  isLoading = false;

  constructor(
    private fb: FormBuilder, // Inyectar el constructor de formularios
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {
    // 4. Inicializar el formulario con validaciones
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // Helper para acceder fácil a los controles en el HTML (opcional pero recomendado)
  get f() { return this.loginForm.controls; }

  onSubmit() {
    // 5. Validar el formulario antes de enviar
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Muestra los errores rojos en los inputs
      this.alertService.error('Por favor verifica los datos ingresados');
      return;
    }

    this.isLoading = true;
    
    // 6. Obtener los valores limpiamente
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (success) => {
        this.isLoading = false;
        if (success) {
          this.alertService.success('¡Bienvenido a KeepUp!');
          this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 401 || err.status === 403) {
          this.alertService.error('Credenciales incorrectas');
        } else {
          this.alertService.error('Error de conexión con el servidor');
        }
      }
    });
  }
}