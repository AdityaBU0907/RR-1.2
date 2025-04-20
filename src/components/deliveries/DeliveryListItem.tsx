import React from 'react';
import { Link } from 'react-router-dom';
import { Package, MapPin, Calendar, Clock, TruckIcon } from 'lucide-react';
import { DeliveryStatus } from '../../types/delivery';

interface DeliveryListItemProps {
  delivery: {
    id: string;
    orderNumber: string;
    client: string;
    origin: string;
    destination: string;
    status: DeliveryStatus;
    scheduledDate: string;
    estimatedArrival: string;
    distance: string;
    truck: string;
    driver: string;
  };
}

const DeliveryListItem: React.FC<DeliveryListItemProps> = ({ delivery }) => {
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
    <div className="group bg-slate-900 border border-slate-800 rounded-lg p-4 transition-all hover:bg-slate-800/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-md bg-slate-800">
            <Package size={20} className="text-accent-400" />
          </div>
          <div>
            <Link 
              to={`/dashboard/deliveries/${delivery.id}`}
              className="font-medium text-white hover:text-accent-400 transition-colors group-hover:text-accent-400"
            >
              Order #{delivery.orderNumber}
            </Link>
            <p className="text-sm text-slate-400">{delivery.client}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[delivery.status]}`}>
            {statusText[delivery.status]}
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <MapPin size={14} className="text-primary-400" />
          <div>
            <p className="text-xs text-slate-400">Origin</p>
            <p className="text-sm text-slate-300 truncate">{delivery.origin}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin size={14} className="text-secondary-400" />
          <div>
            <p className="text-xs text-slate-400">Destination</p>
            <p className="text-sm text-slate-300 truncate">{delivery.destination}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="flex items-center space-x-2">
          <Calendar size={14} className="text-slate-400" />
          <div>
            <p className="text-xs text-slate-400">Date</p>
            <p className="text-sm text-slate-300">{delivery.scheduledDate}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Clock size={14} className="text-slate-400" />
          <div>
            <p className="text-xs text-slate-400">ETA</p>
            <p className="text-sm text-slate-300">{delivery.estimatedArrival}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <TruckIcon size={14} className="text-slate-400" />
          <div>
            <p className="text-xs text-slate-400">Truck</p>
            <p className="text-sm text-slate-300">{delivery.truck}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryListItem;