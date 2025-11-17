import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false, 
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
})
export class Navbar {
  
  constructor(private router: Router) {}

  logout(): void {
    console.log('Cerrando sesión...');
    this.router.navigate(['/auth/login']);
  }
}