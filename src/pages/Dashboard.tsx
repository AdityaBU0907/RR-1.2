import React from 'react';
import { Truck, Package, Calendar, MapPin, TrendingUp, Users, BarChart2 } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import MapView from '../components/maps/MapView';
import TruckListItem from '../components/dashboard/TruckListItem';
import AnalyticsCard from '../components/analytics/AnalyticsCard';
import { useTruckLocations } from '../hooks/useTruckLocations';

const Dashboard: React.FC = () => {
  const { truckLocations } = useTruckLocations();

  // For demonstration - this would normally come from a real backend
  const activeDeliveries = [
    {
      id: 'del-1',
      orderNumber: 'ORD-1234',
      client: 'Amazon Fulfillment',
      origin: 'Chicago, IL',
      destination: 'Detroit, MI',
      status: 'inTransit',
      scheduledDate: 'Oct 10, 2025',
      estimatedArrival: '6:30 PM',
      distance: '280 miles',
      truck: 'T-101',
      driver: 'John Smith',
    },
    {
      id: 'del-2',
      orderNumber: 'ORD-1235',
      client: 'Walmart Distribution',
      origin: 'Dallas, TX',
      destination: 'Houston, TX',
      status: 'scheduled',
      scheduledDate: 'Oct 11, 2025',
      estimatedArrival: '2:15 PM',
      distance: '240 miles',
      truck: 'T-102',
      driver: 'Maria Rodriguez',
    },
  ];

  // Mock data for charts
  const deliveryPerformanceData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'On-Time',
        data: [92, 89, 94, 87, 91, 95, 93],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
      },
      {
        label: 'Delayed',
        data: [8, 11, 6, 13, 9, 5, 7],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.3,
      },
    ],
  };

  const fuelConsumptionData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Gallons',
        data: [350, 410, 380, 420, 390, 300, 320],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 4,
      },
    ],
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white mb-2">Welcome back, Admin</h1>
        <p className="text-slate-400">Here's what's happening with your fleet today.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Active Trucks" 
          value="18/24" 
          change={8} 
          icon={<Truck size={24} />} 
          color="primary" 
        />
        <StatCard 
          title="Active Deliveries" 
          value="42" 
          change={12} 
          icon={<Package size={24} />} 
          color="accent" 
        />
        <StatCard 
          title="On-Time Deliveries" 
          value="92%" 
          change={-3} 
          icon={<Calendar size={24} />} 
          color="secondary" 
        />
        <StatCard 
          title="Total Distance" 
          value="14,382 mi" 
          change={6} 
          icon={<MapPin size={24} />} 
          color="danger" 
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Fleet Map */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h2 className="text-white">Live Fleet Map</h2>
            </div>
            <div style={{ height: '400px', width: '100%' }}>
              <MapView truckLocations={truckLocations} height="400px" />
            </div>
          </div>
        </div>

        {/* Active Trucks */}
        <div>
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 className="text-white">Active Trucks</h2>
              <a href="/dashboard/trucks" className="text-xs text-primary-400 hover:text-primary-300">
                View All
              </a>
            </div>
            <div className="card-body space-y-4 max-h-[400px] overflow-y-auto">
              {truckLocations.slice(0, 3).map(truck => (
                <TruckListItem
                  key={truck.id}
                  truck={{
                    id: truck.id,
                    name: truck.name,
                    driver: truck.driver,
                    status: truck.status,
                    location: truck.location,
                    load: truck.load,
                    capacity: truck.capacity,
                    lastUpdate: truck.lastUpdate,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Analytics and Deliveries */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Delivery Analytics */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnalyticsCard 
            title="Delivery Performance (%)" 
            chartType="line" 
            data={deliveryPerformanceData} 
            height={300}
          />
          <AnalyticsCard 
            title="Fuel Consumption" 
            chartType="bar" 
            data={fuelConsumptionData} 
            height={300}
          />
        </div>

        {/* Active Deliveries */}
        <div>
          <div className="card">
            <div className="card-header flex justify-between items-center">
              <h2 className="text-white">Active Deliveries</h2>
              <a href="/dashboard/deliveries" className="text-xs text-primary-400 hover:text-primary-300">
                View All
              </a>
            </div>
            <div className="card-body space-y-4">
              {activeDeliveries.map(delivery => (
                <div key={delivery.id} className="p-3 border border-slate-800 rounded-lg hover:bg-slate-800/30">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-white">{delivery.orderNumber}</h3>
                      <p className="text-sm text-slate-400">{delivery.client}</p>
                    </div>
                    <div className={`px-2 py-1 text-xs rounded-full ${
                      delivery.status === 'inTransit' 
                        ? 'bg-accent-900 text-accent-400' 
                        : 'bg-primary-900 text-primary-400'
                    }`}>
                      {delivery.status === 'inTransit' ? 'In Transit' : 'Scheduled'}
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} className="text-slate-400" />
                      <span className="text-slate-300">{delivery.origin}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={12} className="text-slate-400" />
                      <span className="text-slate-300">{delivery.destination}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-slate-400" />
                      <span className="text-slate-300">{delivery.scheduledDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Truck size={12} className="text-slate-400" />
                      <span className="text-slate-300">{delivery.truck}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;