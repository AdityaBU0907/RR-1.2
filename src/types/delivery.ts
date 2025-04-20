export type DeliveryStatus = 'scheduled' | 'inTransit' | 'delivered' | 'delayed' | 'cancelled';

export interface Delivery {
  id: string;
  orderNumber: string;
  client: string;
  origin: string;
  destination: string;
  status: DeliveryStatus;
  scheduledDate: string;
  estimatedArrival: string;
  actualArrival?: string;
  distance: string;
  truck: string;
  driver: string;
  cargo: {
    description: string;
    weight: number;
  }[];
}