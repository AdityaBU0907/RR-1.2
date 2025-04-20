export type TruckStatus = 'active' | 'inactive' | 'maintenance' | 'loading' | 'unloading';

export interface TruckLocation {
  id: string;
  name: string;
  driver: string;
  status: TruckStatus;
  coordinates: [number, number]; // [longitude, latitude]
  location: string;
  load: number;
  capacity: number;
  lastUpdate: string;
}

export interface Truck extends TruckLocation {
  license: string;
  make: string;
  model: string;
  year: number;
  engine: string;
  mileage: number;
  fuelLevel: number;
  lastService: string;
  nextService: string;
  healthStatus: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  origin?: string;
  destination?: string;
  eta?: string;
  distance?: string;
  cargo?: {
    description: string;
    weight: number;
  }[];
}

export interface MaintenanceRecord {
  date: string;
  type: 'Routine' | 'Repair' | 'Inspection';
  description: string;
  mileage: number;
  cost: number;
}

export interface FuelRecord {
  date: string;
  gallons: number;
  cost: number;
  mpg: number;
  location: string;
}