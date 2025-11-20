import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { Vehicle } from '../../../core/models/vehicle';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {

  // URL del backend: http://localhost:8080/api/v1/vehicles
  private apiUrl = `${environment.apiUrl}/v1/vehicles`;

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

  getVehicleById(id: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.apiUrl}/${id}`);
  }

  createVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const payload = { ...vehicle, userId: 1 }; 
    return this.http.post<Vehicle>(this.apiUrl, payload);
  }

  updateVehicle(vehicle: Vehicle): Observable<Vehicle> {
    const payload = { ...vehicle, userId: 1 };
    return this.http.put<Vehicle>(`${this.apiUrl}/${vehicle.id}`, payload);
  }

  deleteVehicle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}