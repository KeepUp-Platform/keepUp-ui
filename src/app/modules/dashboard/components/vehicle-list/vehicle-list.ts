import { Component, OnInit } from '@angular/core';
import { Vehicle } from '../../../../core/models/vehicle';
import { VehicleService } from '../../../dashboard/services/vehicle';
import { AlertService } from '../../../../core/services/alert.service';

@Component({
  selector: 'app-vehicle-list',
  standalone: false,
  templateUrl: './vehicle-list.html',
  styleUrl: './vehicle-list.scss',
})
export class VehicleList implements OnInit {
  
  vehicles: Vehicle[] = [];
  isLoading: boolean = true; // Para mostrar un spinner o mensaje

  constructor(private vehicleService: VehicleService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  loadVehicles() {
    this.isLoading = true;
    this.vehicleService.getVehicles().subscribe({
      next: (data) => {
        console.log('Vehículos recibidos', data);
        this.vehicles = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando vehículos', err);
        this.isLoading = false;
      }
    });
  }

 deleteVehicle(id: number) {
    // REEMPLAZO DEL CONFIRM NATIVO
    this.alertService.confirm({
      title: '¿Eliminar vehículo?',
      message: 'Esta acción no se puede deshacer. ¿Estás seguro?',
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar',
      onConfirm: () => {
        // Lógica de borrado
        this.isLoading = true;
        this.vehicleService.deleteVehicle(id).subscribe(() => {
          this.alertService.success('Vehículo eliminado correctamente'); // Toast éxito
          this.loadVehicles(); // Recargar lista
        });
      }
    });
  }
}