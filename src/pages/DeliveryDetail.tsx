import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Package, 
  Truck, 
  User, 
  MapPin,
  ArrowLeft,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChevronRight,
  FileText,
  Image,
  BarChart
} from 'lucide-react';
import MapView from '../components/maps/MapView';
import { TruckLocation } from '../types/truck';

// Mock delivery data - in a real app, this would come from an API call
const mockDeliveryData = {
  id: 'DEL-1092',
  orderNumber: '1092',
  client: 'Amazon Fulfillment',
  clientContact: 'James Wilson - (313) 555-7890',
  origin: 'Chicago Distribution Center',
  originAddress: '123 Logistics Way, Chicago, IL 60290',
  destination: 'Detroit Warehouse',
  destinationAddress: '456 Industrial Pkwy, Detroit, MI 48127',
  status: 'inTransit',
  scheduledDate: 'Oct 10, 2025',
  scheduledTime: '8:30 AM',
  estimatedArrival: '6:30 PM',
  distance: '280 miles',
  truck: 'T-101',
  truckDetails: 'Peterbilt 579 - IL-78542',
  driver: 'John Smith',
  driverContact: '(312) 555-7890',
  cargo: [
    { description: 'Electronics', weight: 8, packages: 32 },
    { description: 'Furniture', weight: 10, packages: 15 }
  ],
  waypoints: [
    { name: 'Chicago Distribution Center', status: 'completed', time: '8:30 AM', notes: 'Departed on time' },
    { name: 'Gary Weigh Station', status: 'completed', time: '9:45 AM', notes: 'All compliant' },
    { name: 'Michigan City Rest Stop', status: 'completed', time: '11:15 AM', notes: 'Driver break - 30 min' },
    { name: 'Kalamazoo Checkpoint', status: 'completed', time: '1:30 PM', notes: 'Refueling stop' },
    { name: 'Ann Arbor', status: 'inProgress', time: '4:15 PM', notes: 'Traffic delay reported' },
    { name: 'Detroit Warehouse', status: 'pending', time: '6:30 PM', notes: '' }
  ],
  documents: [
    { name: 'Bill of Lading', type: 'PDF', date: 'Oct 10, 2025' },
    { name: 'Shipping Manifest', type: 'PDF', date: 'Oct 10, 2025' },
    { name: 'Inspection Report', type: 'PDF', date: 'Oct 10, 2025' }
  ],
  currentLocation: {
    id: 'T-101',
    name: 'Truck T-101',
    driver: 'John Smith',
    status: 'active',
    coordinates: [-83.7483, 42.2814], // Near Ann Arbor
    location: 'I-94, near Ann Arbor, MI',
    load: 18,
    capacity: 22,
    lastUpdate: '5 min ago',
  } as TruckLocation,
  notes: 'Customer requires delivery confirmation photo. Call ahead 30 minutes before arrival.'
};

const DeliveryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'analytics'>('overview');
  
  // In a real app, this would fetch data from an API
  const delivery = mockDeliveryData;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!delivery) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <Package size={48} className="text-slate-600 mb-4" />
        <h2 className="text-xl font-medium text-white mb-2">Delivery not found</h2>
        <p className="text-slate-400 max-w-md">
          The delivery you're looking for doesn't exist or has been removed.
        </p>
        <a 
          href="/dashboard/deliveries" 
          className="mt-4 flex items-center text-primary-400 hover:text-primary-300"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to deliveries</span>
        </a>
      </div>
    );
  }

  const statusColors = {
    scheduled: 'bg-primary-900 text-primary-400',
    inTransit: 'bg-accent-900 text-accent-400',
    delivered: 'bg-secondary-900 text-secondary-400',
    delayed: 'bg-danger-900 text-danger-400',
    cancelled: 'bg-slate-800 text-slate-400',
  };
  
  const statusText = {
    scheduled: 'Scheduled',
    inTransit: 'In Transit',
    delivered: 'Delivered',
    delayed: 'Delayed',
    cancelled: 'Cancelled',
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <a 
            href="/dashboard/deliveries" 
            className="flex items-center hover:text-slate-300"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to deliveries</span>
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-md bg-slate-800">
              <Package size={24} className="text-accent-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">Order #{delivery.orderNumber}</h1>
              <p className="text-slate-400">{delivery.client}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[delivery.status]}`}>
              {statusText[delivery.status]}
            </div>
            <button className="btn-primary text-sm">Track Order</button>
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
              activeTab === 'documents' 
                ? 'border-primary-500 text-primary-400' 
                : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-700'
            }`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
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
          {/* Map and Details */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="text-white">Delivery Route</h2>
              </div>
              <div style={{ height: '400px', width: '100%' }}>
                <MapView 
                  truckLocations={[delivery.currentLocation]} 
                  centerLocation={delivery.currentLocation.coordinates}
                  height="400px"
                />
              </div>
            </div>
            
            {/* Delivery Details */}
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="text-white">Delivery Details</h2>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-3">Origin</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-primary-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-white">{delivery.origin}</p>
                          <p className="text-xs text-slate-400">{delivery.originAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pl-6">
                        <Calendar size={14} className="text-slate-400" />
                        <p className="text-xs text-slate-300">{delivery.scheduledDate}</p>
                      </div>
                      <div className="flex items-center gap-2 pl-6">
                        <Clock size={14} className="text-slate-400" />
                        <p className="text-xs text-slate-300">{delivery.scheduledTime}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-3">Destination</h3>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-secondary-400 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-white">{delivery.destination}</p>
                          <p className="text-xs text-slate-400">{delivery.destinationAddress}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 pl-6">
                        <Calendar size={14} className="text-slate-400" />
                        <p className="text-xs text-slate-300">{delivery.scheduledDate}</p>
                      </div>
                      <div className="flex items-center gap-2 pl-6">
                        <Clock size={14} className="text-slate-400" />
                        <p className="text-xs text-slate-300">ETA: {delivery.estimatedArrival}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-sm font-medium text-slate-400 mb-3">Assigned Resources</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-2">
                          <Truck size={16} className="text-primary-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-white">Truck</p>
                            <p className="text-xs text-slate-300">{delivery.truckDetails}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <User size={16} className="text-primary-400 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-white">Driver</p>
                            <p className="text-xs text-slate-300">{delivery.driver}</p>
                            <p className="text-xs text-slate-400">{delivery.driverContact}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-slate-400 mb-3">Client Information</h3>
                      <div className="space-y-2">
                        <p className="text-sm text-white">{delivery.client}</p>
                        <p className="text-xs text-slate-300">{delivery.clientContact}</p>
                      </div>
                      
                      <h3 className="text-sm font-medium text-slate-400 mt-4 mb-3">Additional Notes</h3>
                      <p className="text-xs text-slate-300">{delivery.notes}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Cargo Details */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-white">Cargo Details</h2>
              </div>
              <div className="card-body">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Description</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Weight</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Packages</th>
                      </tr>
                    </thead>
                    <tbody>
                      {delivery.cargo.map((item, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-slate-800 hover:bg-slate-800/50"
                        >
                          <td className="py-3 px-4 text-sm text-white">{item.description}</td>
                          <td className="py-3 px-4 text-sm text-slate-300">{item.weight} tons</td>
                          <td className="py-3 px-4 text-sm text-slate-300">{item.packages} pkgs</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-slate-700">
                        <td className="py-3 px-4 text-sm font-medium text-white">Total</td>
                        <td className="py-3 px-4 text-sm font-medium text-white">
                          {delivery.cargo.reduce((total, item) => total + item.weight, 0)} tons
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-white">
                          {delivery.cargo.reduce((total, item) => total + item.packages, 0)} pkgs
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Progress */}
          <div>
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="text-white">Delivery Progress</h2>
              </div>
              <div className="card-body">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-3 top-1 h-full w-0.5 bg-slate-800"></div>
                  
                  {/* Waypoints */}
                  <div className="space-y-6">
                    {delivery.waypoints.map((waypoint, index) => (
                      <div key={index} className="relative flex gap-4">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full z-10 ${
                          waypoint.status === 'completed' ? 'bg-secondary-500' :
                          waypoint.status === 'inProgress' ? 'bg-accent-500 animate-pulse' :
                          'bg-slate-800'
                        } flex items-center justify-center`}>
                          {waypoint.status === 'completed' && (
                            <CheckCircle size={14} className="text-white" />
                          )}
                          {waypoint.status === 'inProgress' && (
                            <div className="w-2 h-2 rounded-full bg-white"></div>
                          )}
                        </div>
                        
                        <div className={`flex-1 ${
                          waypoint.status === 'completed' ? 'text-slate-300' :
                          waypoint.status === 'inProgress' ? 'text-white' :
                          'text-slate-500'
                        }`}>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="text-sm font-medium">{waypoint.name}</p>
                            <p className="text-xs">{waypoint.time}</p>
                          </div>
                          {waypoint.notes && (
                            <p className="text-xs mt-1 text-slate-400">{waypoint.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs text-slate-400">Delivery Progress</p>
                      <p className="text-xs text-white">65%</p>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-accent-500"
                        style={{ width: '65%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Delivery Actions */}
            <div className="card">
              <div className="card-header">
                <h2 className="text-white">Actions</h2>
              </div>
              <div className="card-body space-y-3">
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-md flex items-center justify-between transition-colors">
                  <span className="flex items-center gap-2">
                    <Package size={16} className="text-accent-400" />
                    <span>View Cargo Details</span>
                  </span>
                  <ChevronRight size={16} />
                </button>
                
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-md flex items-center justify-between transition-colors">
                  <span className="flex items-center gap-2">
                    <FileText size={16} className="text-primary-400" />
                    <span>View Bill of Lading</span>
                  </span>
                  <ChevronRight size={16} />
                </button>
                
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-md flex items-center justify-between transition-colors">
                  <span className="flex items-center gap-2">
                    <Image size={16} className="text-primary-400" />
                    <span>Upload Proof of Delivery</span>
                  </span>
                  <ChevronRight size={16} />
                </button>
                
                <button className="w-full bg-slate-800 hover:bg-slate-700 text-white py-2 px-4 rounded-md flex items-center justify-between transition-colors">
                  <span className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-danger-400" />
                    <span>Report Issue</span>
                  </span>
                  <ChevronRight size={16} />
                </button>
                
                <div className="pt-3 mt-4 border-t border-slate-800">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-md transition-colors">
                    Contact Driver
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'documents' && (
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="text-white">Delivery Documents</h2>
            <button className="btn-primary text-xs py-1.5">Upload Document</button>
          </div>
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Document</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Type</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Date</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {delivery.documents.map((doc, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-slate-800 hover:bg-slate-800/50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-md bg-slate-800">
                            <FileText size={16} className="text-primary-400" />
                          </div>
                          <span className="text-sm text-white">{doc.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-300">{doc.type}</td>
                      <td className="py-3 px-4 text-sm text-slate-300">{doc.date}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md">
                            <FileText size={16} />
                          </button>
                          <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md">
                            <Download size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Upload Area */}
            <div className="mt-6 border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
              <div className="flex flex-col items-center">
                <FileText size={48} className="text-slate-600 mb-4" />
                <p className="text-slate-300 font-medium mb-2">Drag & drop files here</p>
                <p className="text-slate-400 text-sm mb-4">or click to browse</p>
                <button className="btn-primary text-sm">Upload Document</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="card">
          <div className="card-header">
            <h2 className="text-white">Delivery Analytics</h2>
          </div>
          <div className="card-body">
            <div className="flex items-center justify-center p-10 text-center">
              <div className="flex flex-col items-center">
                <BarChart size={48} className="text-slate-600 mb-4" />
                <p className="text-slate-300 font-medium mb-2">Analytics not available for this delivery</p>
                <p className="text-slate-400 text-sm">Analytics will be available once the delivery is completed.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeliveryDetail;