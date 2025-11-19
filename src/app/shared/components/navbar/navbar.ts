import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../modules/auth/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: false, 
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar {
  
  constructor(
    private router: Router,
    private authService: AuthService // Inyectar AuthService
  ) {}

  logout(): void {
    this.authService.logout(); // Borra el token
    this.router.navigate(['/auth/login']); // Manda al login
  }
}