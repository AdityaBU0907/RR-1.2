import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Truck, 
  User, 
  Package, 
  Calendar,
  ArrowLeft,
  Settings,
  BarChart2,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Upload,
  Download 
} from 'lucide-react';
import MapView from '../components/maps/MapView';
import AnalyticsCard from '../components/analytics/AnalyticsCard';
import { useTruckDetail } from '../hooks/useTruckDetail';

const TruckDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { truck, isLoading, maintenanceHistory, fuelHistory } = useTruckDetail(id || '');
  const [activeTab, setActiveTab] = useState<'overview' | 'maintenance' | 'analytics'>('overview');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!truck) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <Truck size={48} className="text-slate-600 mb-4" />
        <h2 className="text-xl font-medium text-white mb-2">Truck not found</h2>
        <p className="text-slate-400 max-w-md">
          The truck you're looking for doesn't exist or has been removed.
        </p>
        <a 
          href="/dashboard/trucks" 
          className="mt-4 flex items-center text-primary-400 hover:text-primary-300"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to trucks</span>
        </a>
      </div>
    );
  }

  const fuelEfficiencyData = {
    labels: fuelHistory.map(entry => entry.date),
    datasets: [
      {
        label: 'MPG',
        data: fuelHistory.map(entry => entry.mpg),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const mileageData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Miles',
        data: [2300, 2450, 2700, 2200, 2600, 2800, 2750, 2900, 2500],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 4,
      }
    ],
  };

  const loadUtilizationData = {
    labels: ['0-25%', '26-50%', '51-75%', '76-90%', '91-100%'],
    datasets: [
      {
        data: [5, 15, 35, 30, 15],
        backgroundColor: [
          'rgba(209, 213, 219, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const loadPercentage = (truck.load / truck.capacity) * 100;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <a 
            href="/dashboard/trucks" 
            className="flex items-center hover:text-slate-300"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to trucks</span>
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-md bg-slate-800">
              <Truck size={24} className="text-primary-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">{truck.name}</h1>
              <p className="text-slate-400">License: {truck.license}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              truck.status === 'active' 
                ? 'bg-secondary-900 text-secondary-400' 
                : truck.status === 'maintenance' 
                  ? 'bg-danger-900 text-danger-400' 
                  : truck.status === 'loading' || truck.status === 'unloading'
                    ? 'bg-accent-900 text-accent-400'
                    : 'bg-slate-800 text-slate-400'
            }`}>
              {truck.status === 'active' 
                ? 'On Route' 
                : truck.status === 'maintenance' 
                  ? 'Maintenance'
                  : truck.status === 'loading'
                    ? 'Loading'
                    : truck.status === 'unloading'
                      ? 'Unloading'
                      : 'Inactive'
              }
            </div>
            <button className="btn-ghost">
              <Settings size={18} className="mr-2" />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-slate-800">
        <div className="flex space-x-8">
          <button
            className={`pb-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'overview' 
                ? 'border-primary-500 text-primary-400' 
                : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`pb-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'maintenance' 
                ? 'border-primary-500 text-primary-400' 
                : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-700'
            }`}
            onClick={() => setActiveTab('maintenance')}
          >
            Maintenance History
          </button>
          <button
            className={`pb-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'analytics' 
                ? 'border-primary-500 text-primary-400' 
                : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-700'
            }`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Location and Info */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="text-white">Current Location</h2>
              </div>
              <div style={{ height: '400px', width: '100%' }}>
                <MapView 
                  truckLocations={[{
                    id: truck.id,
                    name: truck.name,
                    driver: truck.driver,
                    status: truck.status,
                    coordinates: truck.coordinates,
                    location: truck.location,
                    load: truck.load,
                    capacity: truck.capacity,
                    lastUpdate: truck.lastUpdate,
                  }]} 
                  centerLocation={truck.coordinates}
                  height="400px"
                />
              </div>
            </div>
            
            {/* Truck Details */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-white">Truck Details</h2>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Specifications</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Make</span>
                        <span className="text-sm text-white">{truck.make}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Model</span>
                        <span className="text-sm text-white">{truck.model}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Year</span>
                        <span className="text-sm text-white">{truck.year}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Engine</span>
                        <span className="text-sm text-white">{truck.engine}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Max Capacity</span>
                        <span className="text-sm text-white">{truck.capacity} tons</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Status</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Mileage</span>
                        <span className="text-sm text-white">{truck.mileage.toLocaleString()} mi</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Fuel Level</span>
                        <span className="text-sm text-white">{truck.fuelLevel}%</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Last Service</span>
                        <span className="text-sm text-white">{truck.lastService}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Next Service</span>
                        <span className="text-sm text-white">{truck.nextService}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Health Status</span>
                        <span className={`text-sm ${
                          truck.healthStatus === 'Excellent' || truck.healthStatus === 'Good'
                            ? 'text-secondary-400'
                            : truck.healthStatus === 'Fair'
                              ? 'text-accent-400'
                              : 'text-danger-400'
                        }`}>{truck.healthStatus}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Current Assignment</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <User size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-300">Driver:</span>
                        <span className="text-sm text-white">{truck.driver}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Package size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-300">Current Load:</span>
                        <span className="text-sm text-white">{truck.load} tons</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-300">Destination:</span>
                        <span className="text-sm text-white">{truck.destination || 'N/A'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Calendar size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-300">ETA:</span>
                        <span className="text-sm text-white">{truck.eta || 'N/A'}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Clock size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-300">Last Update:</span>
                        <span className="text-sm text-white">{truck.lastUpdate}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Load and Stats */}
          <div>
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="text-white">Current Load</h2>
              </div>
              <div className="card-body">
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-sm text-slate-400">Load Capacity</p>
                      <p className="text-lg font-semibold text-white">
                        {truck.load}/{truck.capacity} tons
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Utilization</p>
                      <p className={`text-lg font-semibold ${
                        loadPercentage > 90 ? 'text-danger-400' : 
                        loadPercentage > 75 ? 'text-accent-400' : 
                        'text-secondary-400'
                      }`}>
                        {loadPercentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${
                        loadPercentage > 90 ? 'bg-danger-500' : 
                        loadPercentage > 75 ? 'bg-accent-500' : 
                        'bg-secondary-500'
                      }`}
                      style={{ width: `${loadPercentage}%` }}
                    />
                  </div>
                </div>
                
                {truck.cargo && (
                  <div>
                    <p className="text-sm font-medium text-slate-400 mb-2">Cargo Details</p>
                    <div className="space-y-2">
                      {truck.cargo.map((item, index) => (
                        <div 
                          key={index} 
                          className="bg-slate-800 px-3 py-2 rounded-md flex justify-between items-center"
                        >
                          <span className="text-sm text-white">{item.description}</span>
                          <span className="text-xs text-slate-300">{item.weight} tons</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {truck.status === 'active' && truck.destination && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-slate-400 mb-2">Route Information</p>
                    <div className="bg-slate-800 p-3 rounded-md">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="mt-1">
                          <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Origin</p>
                          <p className="text-sm text-white">{truck.origin || 'N/A'}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <div className="w-2 h-2 rounded-full bg-secondary-500"></div>
                        </div>
                        <div>
                          <p className="text-xs text-slate-400">Destination</p>
                          <p className="text-sm text-white">{truck.destination}</p>
                        </div>
                      </div>
                      
                      {truck.eta && (
                        <div className="mt-3 flex items-center justify-between text-sm">
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} className="text-slate-400" />
                            <span className="text-slate-300">ETA: {truck.eta}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} className="text-slate-400" />
                            <span className="text-slate-300">{truck.distance || '350'} miles</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="card">
              <div className="card-header flex items-center justify-between">
                <h2 className="text-white">Recent Activity</h2>
                <button className="text-xs text-primary-400 hover:text-primary-300">
                  View All
                </button>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-accent-900/50 flex items-center justify-center">
                      <Upload size={16} className="text-accent-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white">Cargo loaded at Chicago Warehouse</p>
                      <p className="text-xs text-slate-400">Oct 10, 2025 - 8:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary-900/50 flex items-center justify-center">
                      <MapPin size={16} className="text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white">Started journey to Detroit</p>
                      <p className="text-xs text-slate-400">Oct 10, 2025 - 9:15 AM</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-secondary-900/50 flex items-center justify-center">
                      <CheckCircle size={16} className="text-secondary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white">Passed checkpoint in Toledo</p>
                      <p className="text-xs text-slate-400">Oct 10, 2025 - 2:45 PM</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-danger-900/50 flex items-center justify-center">
                      <AlertTriangle size={16} className="text-danger-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white">Traffic delay reported on I-75</p>
                      <p className="text-xs text-slate-400">Oct 10, 2025 - 4:20 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'maintenance' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header flex items-center justify-between">
                <h2 className="text-white">Maintenance History</h2>
                <button className="btn-primary text-xs py-1.5">Schedule Service</button>
              </div>
              <div className="card-body">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Date</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Type</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Description</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Mileage</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {maintenanceHistory.map((record, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-slate-800 hover:bg-slate-800/50"
                        >
                          <td className="py-3 px-4 text-sm text-white">{record.date}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              record.type === 'Routine' 
                                ? 'bg-primary-900 text-primary-400' 
                                : record.type === 'Repair' 
                                  ? 'bg-danger-900 text-danger-400' 
                                  : 'bg-accent-900 text-accent-400'
                            }`}>
                              {record.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-sm text-slate-300">{record.description}</td>
                          <td className="py-3 px-4 text-sm text-slate-300">{record.mileage.toLocaleString()} mi</td>
                          <td className="py-3 px-4 text-sm text-slate-300">${record.cost.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="text-white">Maintenance Status</h2>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-400">Oil Change</p>
                      <p className="text-sm font-medium text-white">In 2,500 miles</p>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-secondary-500"
                        style={{ width: '70%' }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-400">Tire Rotation</p>
                      <p className="text-sm font-medium text-white">In 5,000 miles</p>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-secondary-500"
                        style={{ width: '60%' }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-400">Brake Inspection</p>
                      <p className="text-sm font-medium text-accent-400">In 1,000 miles</p>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-accent-500"
                        style={{ width: '85%' }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-400">Air Filter</p>
                      <p className="text-sm font-medium text-danger-400">Overdue by 500 miles</p>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-danger-500"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-slate-400 mb-3">Upcoming Maintenance</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-slate-800 rounded-md">
                      <div>
                        <p className="text-sm font-medium text-white">Air Filter Replacement</p>
                        <p className="text-xs text-slate-400">Scheduled: Oct 15, 2025</p>
                      </div>
                      <span className="badge-danger">Urgent</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800 rounded-md">
                      <div>
                        <p className="text-sm font-medium text-white">Brake Inspection</p>
                        <p className="text-xs text-slate-400">Scheduled: Oct 20, 2025</p>
                      </div>
                      <span className="badge-warning">Soon</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-800 rounded-md">
                      <div>
                        <p className="text-sm font-medium text-white">Full Service</p>
                        <p className="text-xs text-slate-400">Scheduled: Nov 05, 2025</p>
                      </div>
                      <span className="badge-info">Planned</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <AnalyticsCard
                title="Fuel Efficiency (MPG)"
                chartType="line"
                data={fuelEfficiencyData}
                height={300}
              />
              <AnalyticsCard
                title="Monthly Mileage"
                chartType="bar"
                data={mileageData}
                height={300}
              />
            </div>
            
            <div className="card">
              <div className="card-header">
                <h2 className="text-white">Performance Metrics</h2>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Avg. Fuel Economy</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-white mr-2">7.2</p>
                      <p className="text-sm text-slate-300">MPG</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs">
                      <div className="flex items-center text-secondary-500">
                        <ArrowUpRight size={12} className="mr-0.5" />
                        <span>5.8%</span>
                      </div>
                      <span className="ml-1 text-slate-400">vs last quarter</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Utilization Rate</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-white mr-2">83</p>
                      <p className="text-sm text-slate-300">%</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs">
                      <div className="flex items-center text-secondary-500">
                        <ArrowUpRight size={12} className="mr-0.5" />
                        <span>3.2%</span>
                      </div>
                      <span className="ml-1 text-slate-400">vs last quarter</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Downtime</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-white mr-2">2.3</p>
                      <p className="text-sm text-slate-300">days/month</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs">
                      <div className="flex items-center text-danger-500">
                        <ArrowUpRight size={12} className="mr-0.5" />
                        <span>1.5%</span>
                      </div>
                      <span className="ml-1 text-slate-400">vs last quarter</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-slate-800 pt-6">
                  <h3 className="text-sm font-medium text-slate-400 mb-3">Efficiency Metrics</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-slate-300">Idle Time</p>
                        <p className="text-sm text-white">8.5%</p>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full bg-secondary-500"
                          style={{ width: '8.5%' }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-slate-300">Empty Miles</p>
                        <p className="text-sm text-white">14.2%</p>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full bg-accent-500"
                          style={{ width: '14.2%' }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-slate-300">Over Speed Time</p>
                        <p className="text-sm text-white">3.1%</p>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full bg-primary-500"
                          style={{ width: '3.1%' }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-slate-300">Harsh Braking Events</p>
                        <p className="text-sm text-white">2.8 per 100 miles</p>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div 
                          className="h-1.5 rounded-full bg-danger-500"
                          style={{ width: '28%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="text-white">Load Utilization</h2>
              </div>
              <div className="card-body">
                <AnalyticsCard
                  title=""
                  chartType="doughnut"
                  data={loadUtilizationData}
                  height={200}
                />
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-slate-400 mb-3">Load Statistics</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="text-sm text-slate-300">Average Load</span>
                      <span className="text-sm text-white">16.8 tons</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-slate-300">Average Utilization</span>
                      <span className="text-sm text-white">76.4%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-slate-300">Full Load Trips</span>
                      <span className="text-sm text-white">48%</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-sm text-slate-300">Empty Trips</span>
                      <span className="text-sm text-white">12%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h2 className="text-white">Fuel Consumption</h2>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Monthly Average</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-white mr-2">1,250</p>
                      <p className="text-sm text-slate-300">gallons</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Cost per Mile</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-white mr-2">$0.58</p>
                      <p className="text-sm text-slate-300">per mile</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-800 pt-4">
                    <h3 className="text-sm font-medium text-slate-400 mb-3">Refueling Locations</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-slate-800 rounded-md">
                        <span className="text-sm text-white">Pilot Flying J</span>
                        <span className="text-sm text-slate-300">42%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-800 rounded-md">
                        <span className="text-sm text-white">Love's Travel Stop</span>
                        <span className="text-sm text-slate-300">30%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-800 rounded-md">
                        <span className="text-sm text-white">TA Travel Centers</span>
                        <span className="text-sm text-slate-300">18%</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-800 rounded-md">
                        <span className="text-sm text-white">Others</span>
                        <span className="text-sm text-slate-300">10%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TruckDetail;