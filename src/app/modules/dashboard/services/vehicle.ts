import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Vehicle } from '../../../core/models/vehicle'; // Asegúrate que esta ruta sea correcta

@Injectable({
  providedIn: 'root',
})
export class VehicleService { // <--- ¡IMPORTANTE: El nombre debe ser VehicleService!

  // Datos simulados (MOCK DATA)
  private mockVehicles: Vehicle[] = [
    {
      id: 1,
      brand: 'Tesla',
      model: 'Model Y',
      year: 2023,
      plate: 'ABC-123',
      color: 'Blanco Perla',
      type: 'CAR',
      imageUrl: 'https://placehold.co/100x60'
    },
    {
      id: 2,
      brand: 'Yamaha',
      model: 'MT-07',
      year: 2021,
      plate: 'MOTO-99',
      color: 'Negro Mate',
      type: 'MOTORCYCLE',
      imageUrl: 'https://placehold.co/100x60'
    },
    {
      id: 3,
      brand: 'Ford',
      model: 'Raptor F-150',
      year: 2024,
      plate: 'TRK-555',
      color: 'Azul Eléctrico',
      type: 'TRUCK',
      imageUrl: 'https://placehold.co/100x60'
    }
  ];

  constructor() { }

  // Método para obtener los datos
  getVehicles(): Observable<Vehicle[]> {
    // Simula una espera de 0.8 segundos como si viniera de internet
    return of(this.mockVehicles).pipe(delay(800));
  }

  deleteVehicle(id: number): Observable<boolean> {
    return of(true).pipe(delay(500));
  }

  getVehicleById(id: number): Observable<Vehicle | undefined> {
    const vehicle = this.mockVehicles.find(v => v.id === id);
    return of(vehicle).pipe(delay(600)); // Simula latencia
  }

  // Crear nuevo
  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    // Generamos un ID falso
    const newId = this.mockVehicles.length > 0 ? Math.max(...this.mockVehicles.map(v => v.id)) + 1 : 1;
    const newVehicle = { ...vehicle, id: newId };
    this.mockVehicles.push(newVehicle);
    return of(newVehicle).pipe(delay(800));
  }

  // Actualizar existente
  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const index = this.mockVehicles.findIndex(v => v.id === vehicle.id);
    if (index !== -1) {
      this.mockVehicles[index] = vehicle;
    }
    return of(vehicle).pipe(delay(800));
  }
}