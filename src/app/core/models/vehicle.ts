export type VehicleType = 'CAR' | 'MOTORCYCLE' | 'TRUCK' | 'PUBLIC_TRANSPORT' | 'OTHER';

export interface Vehicle {
  id?: number;
  make: string; 
  model: string;
  year: number;
  licensePlate: string; 
  color: string;
  vehicleType: VehicleType; 
  userId?: number;
}