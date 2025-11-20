import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle';
import { AlertService } from '../../../../core/services/alert.service';
import { Vehicle, VehicleType } from '../../../../core/models/vehicle';

@Component({
  selector: 'app-vehicle-form',
  standalone: false,
  templateUrl: './vehicle-form.html',
  styleUrl: './vehicle-form.scss',
})
export class VehicleForm implements OnInit {
  
  vehicleForm: FormGroup;
  isEditing: boolean = false;
  isLoading: boolean = false;
  currentId: number | null = null;

  vehicleOptions: { value: VehicleType, label: string, icon: string }[] = [
    { value: 'CAR', label: 'Carro', icon: '🚗' },
    { value: 'MOTORCYCLE', label: 'Moto', icon: '🏍️' },
    { value: 'TRUCK', label: 'Carga', icon: '🚚' },
    { value: 'PUBLIC_TRANSPORT', label: 'Público', icon: '🚕' },
    { value: 'OTHER', label: 'Otro', icon: '🚜' }
  ];

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    this.vehicleForm = this.fb.group({
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: [new Date().getFullYear(), [Validators.required]],
      licensePlate: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]],
      color: [''],
      // El backend espera 'vehicleType'
      vehicleType: ['CAR', [Validators.required]] 
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditing = true;
      this.currentId = +idParam;
      this.loadVehicleData(this.currentId);
    }
  }

  loadVehicleData(id: number) {
    this.isLoading = true;
    this.vehicleService.getVehicleById(id).subscribe({
      next: (vehicle) => {
        if (vehicle) {
          this.vehicleForm.patchValue(vehicle);
        } else {
          this.router.navigate(['/dashboard/vehicles']);
        }
        this.isLoading = false;
      },
      error: () => {
        this.alertService.error('Error cargando el vehículo');
        this.router.navigate(['/dashboard/vehicles']);
      }
    });
  }

  onSubmit() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      this.alertService.error('Por favor, completa los campos obligatorios');
      return;
    }
    
    this.isLoading = true;
    const rawData = this.vehicleForm.value;

    const vehicleData: Vehicle = {
      make: rawData.make,
      model: rawData.model,
      year: rawData.year,
      color: rawData.color,
      vehicleType: rawData.vehicleType,
      licensePlate: rawData.licensePlate.toUpperCase()
    };

    const request = (this.isEditing && this.currentId)
      ? this.vehicleService.updateVehicle({ ...vehicleData, id: this.currentId })
      : this.vehicleService.createVehicle(vehicleData);

    request.subscribe({
      next: () => {
        this.isLoading = false;
        this.alertService.success(this.isEditing ? '¡Vehículo actualizado!' : '¡Vehículo registrado!');
        this.router.navigate(['/dashboard/vehicles']);
      },
      error: (err) => {
        this.isLoading = false;
        const msg = err.error?.message || 'Ocurrió un error al guardar';
        this.alertService.error(msg);
      }
    });
  }
}