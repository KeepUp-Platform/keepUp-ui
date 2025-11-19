import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Herramientas de formulario
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../services/vehicle'; // Importa tu servicio
import { AlertService } from '../../../../core/services/alert.service';

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

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    // 1. Inicializar el formulario con validaciones
    this.vehicleForm = this.fb.group({
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: [new Date().getFullYear(), [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear() + 1)]],
      plate: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9-]+$')]], // Solo mayúsculas y números
      color: [''],
      type: ['CAR', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // 2. Detectar si estamos editando
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.isEditing = true;
      this.currentId = +idParam;
      this.loadVehicleData(this.currentId);
    }
  }

  loadVehicleData(id: number) {
    this.isLoading = true;
    this.vehicleService.getVehicleById(id).subscribe(vehicle => {
      if (vehicle) {
        // Rellenar el formulario automáticamente
        this.vehicleForm.patchValue(vehicle);
      } else {
        // Si no existe, volver a la lista
        this.router.navigate(['/dashboard/vehicles']);
      }
      this.isLoading = false;
    });
  }

  onSubmit() {
    if (this.vehicleForm.invalid) {
      this.vehicleForm.markAllAsTouched();
      this.alertService.error('Por favor, completa los campos obligatorios'); // Toast error
      return;
    }

    this.isLoading = true;
    const formData = this.vehicleForm.value;

    if (this.isEditing && this.currentId) {
    const updatedVehicle = { ...formData, id: this.currentId };
    this.vehicleService.updateVehicle(updatedVehicle).subscribe(() => {
      this.isLoading = false;
      this.alertService.success('¡Vehículo actualizado correctamente!');
      this.router.navigate(['/dashboard/vehicles']);
    });
  } else {
    this.vehicleService.createVehicle(formData).subscribe(() => {
      this.isLoading = false;
      this.alertService.success('¡Vehículo registrado con éxito!');
      this.router.navigate(['/dashboard/vehicles']);
    });
  }
}
}