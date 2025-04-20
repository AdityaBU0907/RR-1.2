import React, { useState } from 'react';
import { Layers, Filter, Map as MapIcon, List } from 'lucide-react';
import MapView from '../components/maps/MapView';
import { useTruckLocations } from '../hooks/useTruckLocations';
import { TruckStatus } from '../types/truck';

const FleetMap: React.FC = () => {
  const { truckLocations } = useTruckLocations();
  const [filterStatus, setFilterStatus] = useState<TruckStatus | 'all'>('all');
  const [view, setView] = useState<'map' | 'list'>('map');
  
  const filteredTrucks = filterStatus === 'all' 
    ? truckLocations 
    : truckLocations.filter(truck => truck.status === filterStatus);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-slate-900 border-b border-slate-800 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-semibold text-white">Fleet Map</h1>
            <p className="text-sm text-slate-400 mt-1">
              Showing {filteredTrucks.length} trucks
              {filterStatus !== 'all' && ` with status "${filterStatus}"`}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Filter Dropdown */}
            <div className="relative">
              <button 
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-md text-slate-300"
              >
                <Filter size={16} />
                <span>Filter</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg z-10 border border-slate-700">
                <div className="p-2">
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      filterStatus === 'all' ? 'bg-primary-900/50 text-primary-400' : 'hover:bg-slate-700'
                    }`}
                    onClick={() => setFilterStatus('all')}
                  >
                    All Trucks
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      filterStatus === 'active' ? 'bg-secondary-900/50 text-secondary-400' : 'hover:bg-slate-700'
                    }`}
                    onClick={() => setFilterStatus('active')}
                  >
                    Active
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      filterStatus === 'inactive' ? 'bg-slate-700 text-slate-300' : 'hover:bg-slate-700'
                    }`}
                    onClick={() => setFilterStatus('inactive')}
                  >
                    Inactive
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      filterStatus === 'maintenance' ? 'bg-danger-900/50 text-danger-400' : 'hover:bg-slate-700'
                    }`}
                    onClick={() => setFilterStatus('maintenance')}
                  >
                    Maintenance
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      filterStatus === 'loading' ? 'bg-accent-900/50 text-accent-400' : 'hover:bg-slate-700'
                    }`}
                    onClick={() => setFilterStatus('loading')}
                  >
                    Loading
                  </button>
                  <button 
                    className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                      filterStatus === 'unloading' ? 'bg-primary-900/50 text-primary-400' : 'hover:bg-slate-700'
                    }`}
                    onClick={() => setFilterStatus('unloading')}
                  >
                    Unloading
                  </button>
                </div>
              </div>
            </div>
            
            {/* View Toggle */}
            <div className="flex rounded-md overflow-hidden border border-slate-700">
              <button 
                className={`flex items-center gap-2 px-3 py-2 ${
                  view === 'map' 
                    ? 'bg-primary-900/50 text-primary-400' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                onClick={() => setView('map')}
              >
                <MapIcon size={16} />
                <span>Map</span>
              </button>
              <button 
                className={`flex items-center gap-2 px-3 py-2 ${
                  view === 'list' 
                    ? 'bg-primary-900/50 text-primary-400' 
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                onClick={() => setView('list')}
              >
                <List size={16} />
                <span>List</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {view === 'map' ? (
        <div className="flex-1">
          <MapView truckLocations={filteredTrucks} height="calc(100vh - 185px)" />
        </div>
      ) : (
        <div className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrucks.map(truck => (
              <div key={truck.id} className="card">
                <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-slate-800">
                      <Truck size={18} className="text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{truck.name}</h3>
                      <p className="text-xs text-slate-400">{truck.driver}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-0.5 rounded-full text-xs font-medium ${
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
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Current Location</p>
                      <p className="text-sm text-slate-300">{truck.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Last Updated</p>
                      <p className="text-sm text-slate-300">{truck.lastUpdate}</p>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs text-slate-400">Load Capacity</p>
                        <p className="text-xs text-slate-300">{truck.load}/{truck.capacity} tons</p>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            (truck.load / truck.capacity) > 0.9 
                              ? 'bg-danger-500' 
                              : (truck.load / truck.capacity) > 0.75 
                                ? 'bg-accent-500' 
                                : 'bg-secondary-500'
                          }`}
                          style={{ width: `${(truck.load / truck.capacity) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button className="btn-primary text-xs py-1.5">View Details</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FleetMap;