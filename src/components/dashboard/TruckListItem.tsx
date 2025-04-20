import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, MoreVertical, Info } from 'lucide-react';
import { TruckStatus } from '../../types/truck';

interface TruckListItemProps {
  truck: {
    id: string;
    name: string;
    driver: string;
    status: TruckStatus;
    location: string;
    load: number;
    capacity: number;
    lastUpdate: string;
  };
}

const TruckListItem: React.FC<TruckListItemProps> = ({ truck }) => {
  const statusColors = {
    active: 'bg-secondary-900 text-secondary-400',
    inactive: 'bg-slate-800 text-slate-400',
    maintenance: 'bg-danger-900 text-danger-400',
    loading: 'bg-accent-900 text-accent-400',
    unloading: 'bg-primary-900 text-primary-400',
  };

  const statusText = {
    active: 'On Route',
    inactive: 'Inactive',
    maintenance: 'Maintenance',
    loading: 'Loading',
    unloading: 'Unloading',
  };

  const loadPercentage = (truck.load / truck.capacity) * 100;

  return (
    <div className="group bg-slate-900 border border-slate-800 rounded-lg p-4 transition-all hover:bg-slate-800/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-md bg-slate-800">
            <Truck size={20} className="text-primary-400" />
          </div>
          <div>
            <Link 
              to={`/dashboard/trucks/${truck.id}`}
              className="font-medium text-white hover:text-primary-400 transition-colors group-hover:text-primary-400"
            >
              {truck.name}
            </Link>
            <p className="text-sm text-slate-400">{truck.driver}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[truck.status]}`}>
            {statusText[truck.status]}
          </div>
          <button className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-slate-700">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-xs text-slate-400 mb-1">Location</p>
          <p className="text-sm text-slate-300 truncate">{truck.location}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400 mb-1">Last Update</p>
          <p className="text-sm text-slate-300">{truck.lastUpdate}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between mb-1">
          <p className="text-xs text-slate-400">Load Capacity</p>
          <p className="text-xs text-slate-300">{truck.load}/{truck.capacity} tons</p>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              loadPercentage > 90 ? 'bg-danger-500' : 
              loadPercentage > 75 ? 'bg-accent-500' : 
              'bg-secondary-500'
            }`}
            style={{ width: `${loadPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default TruckListItem;