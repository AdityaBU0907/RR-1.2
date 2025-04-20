import React, { useState } from 'react';
import { Truck, Filter, Search, Plus, ArrowDown, ArrowUp } from 'lucide-react';
import TruckListItem from '../components/dashboard/TruckListItem';
import { useTrucks } from '../hooks/useTrucks';
import { TruckStatus } from '../types/truck';

const Trucks: React.FC = () => {
  const { trucks } = useTrucks();
  const [filterStatus, setFilterStatus] = useState<TruckStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | 'status' | 'load'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: 'name' | 'status' | 'load') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort trucks
  const filteredTrucks = trucks
    .filter(truck => {
      const matchesStatus = filterStatus === 'all' || truck.status === filterStatus;
      const matchesSearch = truck.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           truck.driver.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           truck.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortField === 'name') {
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === 'status') {
        return sortDirection === 'asc'
          ? a.status.localeCompare(b.status) 
          : b.status.localeCompare(a.status);
      } else if (sortField === 'load') {
        const loadPercentA = a.load / a.capacity;
        const loadPercentB = b.load / b.capacity;
        return sortDirection === 'asc'
          ? loadPercentA - loadPercentB
          : loadPercentB - loadPercentA;
      }
      return 0;
    });

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Trucks</h1>
          <p className="text-slate-400 mt-1">Manage and monitor your fleet</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          <span>Add Truck</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-slate-500" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Search trucks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-md text-white">
              <Filter size={18} />
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
          
          {/* Sort buttons */}
          <div className="flex border border-slate-700 rounded-md overflow-hidden">
            <button 
              className={`px-3 py-2 flex items-center gap-1 text-sm ${
                sortField === 'name' ? 'bg-primary-900/50 text-primary-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              onClick={() => handleSort('name')}
            >
              Name
              {sortField === 'name' && (
                sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
              )}
            </button>
            <button 
              className={`px-3 py-2 flex items-center gap-1 text-sm ${
                sortField === 'status' ? 'bg-primary-900/50 text-primary-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              onClick={() => handleSort('status')}
            >
              Status
              {sortField === 'status' && (
                sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
              )}
            </button>
            <button 
              className={`px-3 py-2 flex items-center gap-1 text-sm ${
                sortField === 'load' ? 'bg-primary-900/50 text-primary-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              onClick={() => handleSort('load')}
            >
              Load
              {sortField === 'load' && (
                sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Truck List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTrucks.length > 0 ? (
          filteredTrucks.map(truck => (
            <TruckListItem key={truck.id} truck={truck} />
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-16 text-center">
            <Truck size={48} className="text-slate-600 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No trucks found</h3>
            <p className="text-slate-400 max-w-md">
              {searchQuery
                ? `No trucks matching "${searchQuery}" with the selected filters.`
                : 'No trucks match the selected filters.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trucks;