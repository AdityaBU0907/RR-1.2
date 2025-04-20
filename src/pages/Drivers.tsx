import React, { useState } from 'react';
import { User, Filter, Search, Plus, ArrowDown, ArrowUp, MapPin, Phone, Mail } from 'lucide-react';
import { useTrucks } from '../hooks/useTrucks';
import { Link } from 'react-router-dom';

// This would normally come from a dedicated hook like useDrivers
// Using mock data for now similar to the pattern in other pages
const mockDrivers = [
  {
    id: 'D-101',
    name: 'John Smith',
    email: 'john.smith@fleetvision.com',
    phone: '(312) 555-7890',
    location: 'Chicago, IL',
    status: 'active',
    assignedTruck: 'T-101',
    experience: '5 years',
    licenseCDL: 'Class A - IL',
    rating: 4.8,
    lastActive: '5 min ago'
  },
  {
    id: 'D-102',
    name: 'Maria Rodriguez',
    email: 'maria.rodriguez@fleetvision.com',
    phone: '(214) 555-1234',
    location: 'Dallas, TX',
    status: 'active',
    assignedTruck: 'T-102',
    experience: '7 years',
    licenseCDL: 'Class A - TX',
    rating: 4.9,
    lastActive: '2 min ago'
  },
  {
    id: 'D-103',
    name: 'Robert Johnson',
    email: 'robert.johnson@fleetvision.com',
    phone: '(206) 555-9876',
    location: 'Seattle, WA',
    status: 'inactive',
    assignedTruck: 'T-103',
    experience: '3 years',
    licenseCDL: 'Class A - WA',
    rating: 4.5,
    lastActive: '1 hour ago'
  },
  {
    id: 'D-104',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@fleetvision.com',
    phone: '(917) 555-4321',
    location: 'New York, NY',
    status: 'active',
    assignedTruck: 'T-104',
    experience: '6 years',
    licenseCDL: 'Class A - NY',
    rating: 4.7,
    lastActive: '8 min ago'
  },
  {
    id: 'D-105',
    name: 'Michael Brown',
    email: 'michael.brown@fleetvision.com',
    phone: '(404) 555-5678',
    location: 'Atlanta, GA',
    status: 'active',
    assignedTruck: 'T-105',
    experience: '4 years',
    licenseCDL: 'Class A - GA',
    rating: 4.6,
    lastActive: '15 min ago'
  },
  {
    id: 'D-106',
    name: 'Emily Davis',
    email: 'emily.davis@fleetvision.com',
    phone: '(323) 555-8765',
    location: 'Los Angeles, CA',
    status: 'active',
    assignedTruck: 'T-106',
    experience: '8 years',
    licenseCDL: 'Class A - CA',
    rating: 4.9,
    lastActive: '10 min ago'
  },
  {
    id: 'D-107',
    name: 'David Garcia',
    email: 'david.garcia@fleetvision.com',
    phone: '(720) 555-2345',
    location: 'Denver, CO',
    status: 'on_leave',
    assignedTruck: 'T-107',
    experience: '5 years',
    licenseCDL: 'Class A - CO',
    rating: 4.4,
    lastActive: '3 hours ago'
  },
  {
    id: 'D-108',
    name: 'Lisa Martinez',
    email: 'lisa.martinez@fleetvision.com',
    phone: '(314) 555-6543',
    location: 'St. Louis, MO',
    status: 'active',
    assignedTruck: 'T-108',
    experience: '4 years',
    licenseCDL: 'Class A - MO',
    rating: 4.7,
    lastActive: '7 min ago'
  }
];

type DriverStatus = 'active' | 'inactive' | 'on_leave';

const Drivers: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<DriverStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'name' | 'status' | 'rating'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: 'name' | 'status' | 'rating') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort drivers
  const filteredDrivers = mockDrivers
    .filter(driver => {
      const matchesStatus = filterStatus === 'all' || driver.status === filterStatus;
      const matchesSearch = driver.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           driver.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           driver.email.toLowerCase().includes(searchQuery.toLowerCase());
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
      } else if (sortField === 'rating') {
        return sortDirection === 'asc'
          ? a.rating - b.rating
          : b.rating - a.rating;
      }
      return 0;
    });

  const statusColors = {
    active: 'bg-secondary-900 text-secondary-400',
    inactive: 'bg-slate-800 text-slate-400',
    on_leave: 'bg-accent-900 text-accent-400'
  };
  
  const statusText = {
    active: 'Active',
    inactive: 'Inactive',
    on_leave: 'On Leave'
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Drivers</h1>
          <p className="text-slate-400 mt-1">Manage and monitor your fleet drivers</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          <span>Add Driver</span>
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
              placeholder="Search drivers..."
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
                  All Drivers
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
                    filterStatus === 'on_leave' ? 'bg-accent-900/50 text-accent-400' : 'hover:bg-slate-700'
                  }`}
                  onClick={() => setFilterStatus('on_leave')}
                >
                  On Leave
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
                sortField === 'rating' ? 'bg-primary-900/50 text-primary-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              onClick={() => handleSort('rating')}
            >
              Rating
              {sortField === 'rating' && (
                sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Driver List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDrivers.length > 0 ? (
          filteredDrivers.map(driver => (
            <div key={driver.id} className="group bg-slate-900 border border-slate-800 rounded-lg p-4 transition-all hover:bg-slate-800/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-md bg-slate-800">
                    <User size={20} className="text-primary-400" />
                  </div>
                  <div>
                    <Link 
                      to={`/dashboard/drivers/${driver.id}`}
                      className="font-medium text-white hover:text-primary-400 transition-colors group-hover:text-primary-400"
                    >
                      {driver.name}
                    </Link>
                    <p className="text-sm text-slate-400">Truck {driver.assignedTruck}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[driver.status]}`}>
                    {statusText[driver.status]}
                  </div>
                  <div className="flex items-center gap-1 text-secondary-400">
                    <span className="text-sm font-medium">{driver.rating}</span>
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin size={14} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Location</p>
                    <p className="text-sm text-slate-300 truncate">{driver.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={14} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Phone</p>
                    <p className="text-sm text-slate-300">{driver.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail size={14} className="text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Email</p>
                    <p className="text-sm text-slate-300 truncate">{driver.email}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">License</p>
                  <p className="text-sm text-slate-300">{driver.licenseCDL}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Experience</p>
                  <p className="text-sm text-slate-300">{driver.experience}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Last Active</p>
                  <p className="text-sm text-slate-300">{driver.lastActive}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-16 text-center">
            <User size={48} className="text-slate-600 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No drivers found</h3>
            <p className="text-slate-400 max-w-md">
              {searchQuery
                ? `No drivers matching "${searchQuery}" with the selected filters.`
                : 'No drivers match the selected filters.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Drivers;