import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { fadeAnimation } from '../../core/animations/route-animations';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  animations: [fadeAnimation]
})
export class Dashboard {

  // 2. Inyectar el servicio en el constructor
  constructor(private contexts: ChildrenOutletContexts) {}

  // 3. Crear este método getter seguro
  getRouteAnimationData() {
    // Busca el contexto 'primary' (el router-outlet principal) y extrae los datos
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
}