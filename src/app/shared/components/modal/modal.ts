import { Component } from '@angular/core';
import { AlertService } from '../../../core/services/alert.service';

@Component({
  selector: 'app-modal',
  standalone: false,
  templateUrl: './modal.html',
  styleUrl: './modal.scss'
})
export class Modal {
  // Declara la variable pero no la inicialices aquí con 'this'
  data$; 

  constructor(public alertService: AlertService) {
    // Inicialízala aquí, cuando el servicio ya está inyectado
    this.data$ = this.alertService.confirmState$;
  }

  close() {
    this.alertService.closeConfirm();
  }

  confirm(data: any) {
    data.onConfirm();
    this.close();
  }
}