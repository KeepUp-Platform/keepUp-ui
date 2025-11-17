import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // IMPORTANTE: Necesario para que funcione routerLink en el Navbar

// Componentes
import { Navbar } from './shared/components/navbar/navbar';
import { AlertBell } from './shared/components/alert-bell/alert-bell';
import { Modal } from './shared/components/modal/modal';
import { ToastComponent } from './shared/components/toast/toast';


@NgModule({
  declarations: [
    Navbar,
    AlertBell,
    Modal,
    ToastComponent
  ],
  imports: [
    CommonModule,
    RouterModule // <--- Agrega esto para que <a routerLink="..."> funcione en el Navbar
  ],
  exports: [
    Navbar,
    AlertBell,
    Modal,
    ToastComponent,
    CommonModule,
    RouterModule // Exportamos RouterModule para que quien importe SharedModule también tenga routing
  ]
})
export class SharedModule { }