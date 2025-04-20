import { useState, useEffect } from 'react';
import { Truck } from '../types/truck';

// Mock truck data
const mockTrucks: Truck[] = [
  {
    id: 'T-101',
    name: 'Truck T-101',
    license: 'IL-78542',
    driver: 'John Smith',
    make: 'Peterbilt',
    model: '579',
    year: 2023,
    engine: 'Cummins X15',
    status: 'active',
    coordinates: [-87.6298, 41.8781], // Chicago
    location: 'I-94, near Chicago, IL',
    origin: 'Chicago, IL',
    destination: 'Detroit, MI',
    eta: '6:30 PM',
    load: 18,
    capacity: 22,
    mileage: 45628,
    fuelLevel: 72,
    lastService: 'Sep 15, 2025',
    nextService: 'Oct 15, 2025',
    healthStatus: 'Good',
    lastUpdate: '5 min ago',
    cargo: [
      { description: 'Electronics', weight: 8 },
      { description: 'Furniture', weight: 10 }
    ]
  },
  {
    id: 'T-102',
    name: 'Truck T-102',
    license: 'TX-45321',
    driver: 'Maria Rodriguez',
    make: 'Kenworth',
    model: 'T680',
    year: 2022,
    engine: 'PACCAR MX-13',
    status: 'active',
    coordinates: [-96.7970, 32.7767], // Dallas
    location: 'I-45, south of Dallas, TX',
    origin: 'Dallas, TX',
    destination: 'Houston, TX',
    eta: '2:15 PM',
    load: 15,
    capacity: 22,
    mileage: 62145,
    fuelLevel: 45,
    lastService: 'Aug 22, 2025',
    nextService: 'Oct 22, 2025',
    healthStatus: 'Good',
    lastUpdate: '2 min ago',
    cargo: [
      { description: 'Auto Parts', weight: 15 }
    ]
  },
  {
    id: 'T-103',
    name: 'Truck T-103',
    license: 'WA-12843',
    driver: 'Robert Johnson',
    make: 'Freightliner',
    model: 'Cascadia',
    year: 2021,
    engine: 'Detroit DD15',
    status: 'maintenance',
    coordinates: [-122.3321, 47.6062], // Seattle
    location: 'Service Center, Seattle, WA',
    load: 0,
    capacity: 22,
    mileage: 78234,
    fuelLevel: 25,
    lastService: 'Jul 10, 2025',
    nextService: 'Oct 12, 2025',
    healthStatus: 'Poor',
    lastUpdate: '1 hour ago'
  },
  {
    id: 'T-104',
    name: 'Truck T-104',
    license: 'NY-98765',
    driver: 'Sarah Wilson',
    make: 'Volvo',
    model: 'VNL 860',
    year: 2023,
    engine: 'Volvo D13',
    status: 'active',
    coordinates: [-74.0060, 40.7128], // New York
    location: 'I-95, near Newark, NJ',
    origin: 'New York, NY',
    destination: 'Boston, MA',
    eta: '5:45 PM',
    load: 20,
    capacity: 22,
    mileage: 31587,
    fuelLevel: 80,
    lastService: 'Sep 28, 2025',
    nextService: 'Oct 28, 2025',
    healthStatus: 'Excellent',
    lastUpdate: '8 min ago',
    cargo: [
      { description: 'Packaged Food', weight: 12 },
      { description: 'Beverages', weight: 8 }
    ]
  },
  {
    id: 'T-105',
    name: 'Truck T-105',
    license: 'GA-34521',
    driver: 'Michael Brown',
    make: 'Mack',
    model: 'Anthem',
    year: 2022,
    engine: 'Mack MP8',
    status: 'loading',
    coordinates: [-84.3880, 33.7490], // Atlanta
    location: 'Distribution Center, Atlanta, GA',
    load: 10,
    capacity: 22,
    mileage: 52478,
    fuelLevel: 65,
    lastService: 'Aug 15, 2025',
    nextService: 'Oct 15, 2025',
    healthStatus: 'Good',
    lastUpdate: '15 min ago'
  },
  {
    id: 'T-106',
    name: 'Truck T-106',
    license: 'CA-87654',
    driver: 'Emily Davis',
    make: 'International',
    model: 'LT Series',
    year: 2021,
    engine: 'Cummins X15',
    status: 'unloading',
    coordinates: [-118.2437, 34.0522], // Los Angeles
    location: 'Customer Site, Los Angeles, CA',
    load: 22,
    capacity: 22,
    mileage: 67821,
    fuelLevel: 30,
    lastService: 'Sep 10, 2025',
    nextService: 'Oct 10, 2025',
    healthStatus: 'Fair',
    lastUpdate: '10 min ago',
    cargo: [
      { description: 'Building Materials', weight: 22 }
    ]
  },
  {
    id: 'T-107',
    name: 'Truck T-107',
    license: 'CO-23456',
    driver: 'David Garcia',
    make: 'Western Star',
    model: '5700XE',
    year: 2020,
    engine: 'Detroit DD15',
    status: 'inactive',
    coordinates: [-104.9903, 39.7392], // Denver
    location: 'Depot, Denver, CO',
    load: 0,
    capacity: 22,
    mileage: 89456,
    fuelLevel: 15,
    lastService: 'Jul 05, 2025',
    nextService: 'Oct 05, 2025',
    healthStatus: 'Fair',
    lastUpdate: '3 hours ago'
  },
  {
    id: 'T-108',
    name: 'Truck T-108',
    license: 'MO-65432',
    driver: 'Lisa Martinez',
    make: 'Peterbilt',
    model: '389',
    year: 2023,
    engine: 'PACCAR MX-13',
    status: 'active',
    coordinates: [-90.1994, 38.6270], // St. Louis
    location: 'I-70, west of St. Louis, MO',
    origin: 'Chicago, IL',
    destination: 'Kansas City, MO',
    eta: '8:15 PM',
    load: 16,
    capacity: 22,
    mileage: 28745,
    fuelLevel: 85,
    lastService: 'Sep 25, 2025',
    nextService: 'Oct 25, 2025',
    healthStatus: 'Excellent',
    lastUpdate: '7 min ago',
    cargo: [
      { description: 'Machinery Parts', weight: 16 }
    ]
  }
];

export const useTrucks = () => {
  const [trucks, setTrucks] = useState<Truck[]>(mockTrucks);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, this would fetch from an API
    const fetchTrucks = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setTrucks(mockTrucks);
        setError(null);
      } catch (err) {
        setError('Failed to fetch trucks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrucks();
  }, []);

  return { trucks, isLoading, error };
};