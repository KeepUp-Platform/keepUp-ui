export interface Vehicle {
  id: number;
  brand: string;      // Marca (ej. Toyota)
  model: string;      // Modelo (ej. Corolla)
  year: number;       // Año
  plate: string;      // Placa / Patente
  color: string;      // Color
  type: 'CAR' | 'MOTORCYCLE' | 'TRUCK'; // Tipo restringido
  imageUrl?: string;  // Opcional: URL de la foto
}