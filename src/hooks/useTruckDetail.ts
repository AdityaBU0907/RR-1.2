import { useState, useEffect } from 'react';
import { Truck, MaintenanceRecord, FuelRecord } from '../types/truck';
import { useTrucks } from './useTrucks';

export const useTruckDetail = (truckId: string) => {
  const { trucks } = useTrucks();
  const [truck, setTruck] = useState<Truck | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [maintenanceHistory, setMaintenanceHistory] = useState<MaintenanceRecord[]>([]);
  const [fuelHistory, setFuelHistory] = useState<FuelRecord[]>([]);

  useEffect(() => {
    const fetchTruckDetails = async () => {
      setIsLoading(true);
      try {
        // Find truck from the trucks list
        const foundTruck = trucks.find(t => t.id === truckId);
        
        if (foundTruck) {
          setTruck(foundTruck);
          
          // Generate mock maintenance history
          const mockMaintenanceHistory: MaintenanceRecord[] = [
            {
              date: 'Sep 15, 2025',
              type: 'Routine',
              description: 'Oil change and filter replacement',
              mileage: 45200,
              cost: 350
            },
            {
              date: 'Aug 10, 2025',
              type: 'Inspection',
              description: 'DOT inspection and certification',
              mileage: 42800,
              cost: 200
            },
            {
              date: 'Jul 25, 2025',
              type: 'Repair',
              description: 'Replace worn brake pads',
              mileage: 41500,
              cost: 800
            },
            {
              date: 'Jun 18, 2025',
              type: 'Routine',
              description: 'Air filter replacement',
              mileage: 39200,
              cost: 120
            },
            {
              date: 'May 30, 2025',
              type: 'Repair',
              description: 'Fix electrical system issue',
              mileage: 38100,
              cost: 450
            },
            {
              date: 'Apr 22, 2025',
              type: 'Routine',
              description: 'Full service maintenance',
              mileage: 36000,
              cost: 1200
            }
          ];
          
          // Generate mock fuel history
          const mockFuelHistory: FuelRecord[] = [
            {
              date: 'Sep 28',
              gallons: 150,
              cost: 600,
              mpg: 7.5,
              location: 'Flying J - Chicago, IL'
            },
            {
              date: 'Sep 20',
              gallons: 140,
              cost: 560,
              mpg: 7.3,
              location: 'TA Travel Center - Cleveland, OH'
            },
            {
              date: 'Sep 12',
              gallons: 155,
              cost: 620,
              mpg: 7.2,
              location: 'Pilot - Indianapolis, IN'
            },
            {
              date: 'Sep 04',
              gallons: 145,
              cost: 580,
              mpg: 7.0,
              location: 'Love\'s - Columbus, OH'
            },
            {
              date: 'Aug 27',
              gallons: 160,
              cost: 640,
              mpg: 6.9,
              location: 'Flying J - Detroit, MI'
            },
            {
              date: 'Aug 19',
              gallons: 150,
              cost: 600,
              mpg: 7.1,
              location: 'Pilot - Toledo, OH'
            },
            {
              date: 'Aug 11',
              gallons: 145,
              cost: 580,
              mpg: 6.8,
              location: 'TA Travel Center - Chicago, IL'
            }
          ];
          
          setMaintenanceHistory(mockMaintenanceHistory);
          setFuelHistory(mockFuelHistory);
          setError(null);
        } else {
          setTruck(null);
          setError('Truck not found');
        }
      } catch (err) {
        setError('Failed to fetch truck details');
      } finally {
        setIsLoading(false);
      }
    };

    if (trucks.length > 0) {
      fetchTruckDetails();
    }
  }, [truckId, trucks]);

  return { truck, isLoading, error, maintenanceHistory, fuelHistory };
};