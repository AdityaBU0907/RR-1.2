import { useState, useEffect } from 'react';
import { TruckLocation } from '../types/truck';

// Mock truck location data
const mockTruckLocations: TruckLocation[] = [
  {
    id: 'T-101',
    name: 'Truck T-101',
    driver: 'John Smith',
    status: 'active',
    coordinates: [-87.6298, 41.8781], // Chicago
    location: 'I-94, near Chicago, IL',
    load: 18,
    capacity: 22,
    lastUpdate: '5 min ago',
  },
  {
    id: 'T-102',
    name: 'Truck T-102',
    driver: 'Maria Rodriguez',
    status: 'active',
    coordinates: [-96.7970, 32.7767], // Dallas
    location: 'I-45, south of Dallas, TX',
    load: 15,
    capacity: 22,
    lastUpdate: '2 min ago',
  },
  {
    id: 'T-103',
    name: 'Truck T-103',
    driver: 'Robert Johnson',
    status: 'maintenance',
    coordinates: [-122.3321, 47.6062], // Seattle
    location: 'Service Center, Seattle, WA',
    load: 0,
    capacity: 22,
    lastUpdate: '1 hour ago',
  },
  {
    id: 'T-104',
    name: 'Truck T-104',
    driver: 'Sarah Wilson',
    status: 'active',
    coordinates: [-74.0060, 40.7128], // New York
    location: 'I-95, near Newark, NJ',
    load: 20,
    capacity: 22,
    lastUpdate: '8 min ago',
  },
  {
    id: 'T-105',
    name: 'Truck T-105',
    driver: 'Michael Brown',
    status: 'loading',
    coordinates: [-84.3880, 33.7490], // Atlanta
    location: 'Distribution Center, Atlanta, GA',
    load: 10,
    capacity: 22,
    lastUpdate: '15 min ago',
  },
  {
    id: 'T-106',
    name: 'Truck T-106',
    driver: 'Emily Davis',
    status: 'unloading',
    coordinates: [-118.2437, 34.0522], // Los Angeles
    location: 'Customer Site, Los Angeles, CA',
    load: 22,
    capacity: 22,
    lastUpdate: '10 min ago',
  },
  {
    id: 'T-107',
    name: 'Truck T-107',
    driver: 'David Garcia',
    status: 'inactive',
    coordinates: [-104.9903, 39.7392], // Denver
    location: 'Depot, Denver, CO',
    load: 0,
    capacity: 22,
    lastUpdate: '3 hours ago',
  },
  {
    id: 'T-108',
    name: 'Truck T-108',
    driver: 'Lisa Martinez',
    status: 'active',
    coordinates: [-90.1994, 38.6270], // St. Louis
    location: 'I-70, west of St. Louis, MO',
    load: 16,
    capacity: 22,
    lastUpdate: '7 min ago',
  },
];

export const useTruckLocations = () => {
  const [truckLocations, setTruckLocations] = useState<TruckLocation[]>(mockTruckLocations);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchTruckLocations = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setTruckLocations(mockTruckLocations);
        setError(null);
      } catch (err) {
        setError('Failed to fetch truck locations');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTruckLocations();

    // Optional: setup real-time updates
    const interval = setInterval(() => {
      // This would be a websocket connection in a real app
      // For now, let's just randomly move some trucks
      setTruckLocations(prevLocations => 
        prevLocations.map(truck => {
          if (truck.status === 'active' && Math.random() > 0.7) {
            return {
              ...truck,
              coordinates: [
                truck.coordinates[0] + (Math.random() - 0.5) * 0.01,
                truck.coordinates[1] + (Math.random() - 0.5) * 0.01
              ],
              lastUpdate: 'Just now'
            };
          }
          return truck;
        })
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return { truckLocations, isLoading, error };
};