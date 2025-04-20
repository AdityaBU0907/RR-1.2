import React, { useState } from 'react';
import { Package, Filter, Search, Plus, ArrowDown, ArrowUp, Calendar, Clock } from 'lucide-react';
import DeliveryListItem from '../components/deliveries/DeliveryListItem';
import { DeliveryStatus } from '../types/delivery';

// Mock delivery data
const mockDeliveries = [
  {
    id: 'DEL-1092',
    orderNumber: '1092',
    client: 'Amazon Fulfillment',
    origin: 'Chicago, IL',
    destination: 'Detroit, MI',
    status: 'inTransit' as DeliveryStatus,
    scheduledDate: 'Oct 10, 2025',
    estimatedArrival: '6:30 PM',
    distance: '280 miles',
    truck: 'T-101',
    driver: 'John Smith'
  },
  {
    id: 'DEL-1091',
    orderNumber: '1091',
    client: 'Walmart Distribution',
    origin: 'Dallas, TX',
    destination: 'Houston, TX',
    status: 'scheduled' as DeliveryStatus,
    scheduledDate: 'Oct 11, 2025',
    estimatedArrival: '2:15 PM',
    distance: '240 miles',
    truck: 'T-102',
    driver: 'Maria Rodriguez'
  },
  {
    id: 'DEL-1090',
    orderNumber: '1090',
    client: 'Home Depot Supply',
    origin: 'Seattle, WA',
    destination: 'Portland, OR',
    status: 'delivered' as DeliveryStatus,
    scheduledDate: 'Oct 9, 2025',
    estimatedArrival: '11:45 AM',
    distance: '175 miles',
    truck: 'T-103',
    driver: 'Robert Johnson'
  },
  {
    id: 'DEL-1089',
    orderNumber: '1089',
    client: 'Target Stores',
    origin: 'New York, NY',
    destination: 'Boston, MA',
    status: 'inTransit' as DeliveryStatus,
    scheduledDate: 'Oct 10, 2025',
    estimatedArrival: '4:30 PM',
    distance: '215 miles',
    truck: 'T-104',
    driver: 'Sarah Wilson'
  },
  {
    id: 'DEL-1088',
    orderNumber: '1088',
    client: 'Costco Wholesale',
    origin: 'Atlanta, GA',
    destination: 'Nashville, TN',
    status: 'delayed' as DeliveryStatus,
    scheduledDate: 'Oct 10, 2025',
    estimatedArrival: '8:45 PM',
    distance: '250 miles',
    truck: 'T-105',
    driver: 'Michael Brown'
  },
  {
    id: 'DEL-1087',
    orderNumber: '1087',
    client: 'Lowe\'s Home Improvement',
    origin: 'Los Angeles, CA',
    destination: 'San Diego, CA',
    status: 'delivered' as DeliveryStatus,
    scheduledDate: 'Oct 9, 2025',
    estimatedArrival: '1:30 PM',
    distance: '120 miles',
    truck: 'T-106',
    driver: 'Emily Davis'
  },
  {
    id: 'DEL-1086',
    orderNumber: '1086',
    client: 'Best Buy Electronics',
    origin: 'Denver, CO',
    destination: 'Salt Lake City, UT',
    status: 'cancelled' as DeliveryStatus,
    scheduledDate: 'Oct 8, 2025',
    estimatedArrival: '5:15 PM',
    distance: '520 miles',
    truck: 'T-107',
    driver: 'David Garcia'
  },
  {
    id: 'DEL-1085',
    orderNumber: '1085',
    client: 'FedEx Distribution',
    origin: 'Chicago, IL',
    destination: 'Indianapolis, IN',
    status: 'delivered' as DeliveryStatus,
    scheduledDate: 'Oct 8, 2025',
    estimatedArrival: '3:30 PM',
    distance: '180 miles',
    truck: 'T-108',
    driver: 'Lisa Martinez'
  }
];

const Deliveries: React.FC = () => {
  const [filterStatus, setFilterStatus] = useState<DeliveryStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<'date' | 'status' | 'client'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: 'date' | 'status' | 'client') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  // Filter and sort deliveries
  const filteredDeliveries = mockDeliveries
    .filter(delivery => {
      const matchesStatus = filterStatus === 'all' || delivery.status === filterStatus;
      const matchesSearch = 
        delivery.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
        delivery.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
        delivery.driver.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortField === 'date') {
        // Using string comparison for dates (in a real app, you'd parse these to actual Date objects)
        return sortDirection === 'asc' 
          ? a.scheduledDate.localeCompare(b.scheduledDate)
          : b.scheduledDate.localeCompare(a.scheduledDate);
      } else if (sortField === 'status') {
        return sortDirection === 'asc'
          ? a.status.localeCompare(b.status) 
          : b.status.localeCompare(a.status);
      } else if (sortField === 'client') {
        return sortDirection === 'asc'
          ? a.client.localeCompare(b.client)
          : b.client.localeCompare(a.client);
      }
      return 0;
    });

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Deliveries</h1>
          <p className="text-slate-400 mt-1">Track and manage your delivery orders</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          <span>New Delivery</span>
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
              placeholder="Search deliveries..."
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
                  All Deliveries
                </button>
                <button 
                  className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                    filterStatus === 'scheduled' ? 'bg-primary-900/50 text-primary-400' : 'hover:bg-slate-700'
                  }`}
                  onClick={() => setFilterStatus('scheduled')}
                >
                  Scheduled
                </button>
                <button 
                  className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                    filterStatus === 'inTransit' ? 'bg-accent-900/50 text-accent-400' : 'hover:bg-slate-700'
                  }`}
                  onClick={() => setFilterStatus('inTransit')}
                >
                  In Transit
                </button>
                <button 
                  className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                    filterStatus === 'delivered' ? 'bg-secondary-900/50 text-secondary-400' : 'hover:bg-slate-700'
                  }`}
                  onClick={() => setFilterStatus('delivered')}
                >
                  Delivered
                </button>
                <button 
                  className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                    filterStatus === 'delayed' ? 'bg-danger-900/50 text-danger-400' : 'hover:bg-slate-700'
                  }`}
                  onClick={() => setFilterStatus('delayed')}
                >
                  Delayed
                </button>
                <button 
                  className={`w-full text-left px-3 py-2 text-sm rounded-md ${
                    filterStatus === 'cancelled' ? 'bg-slate-700 text-slate-300' : 'hover:bg-slate-700'
                  }`}
                  onClick={() => setFilterStatus('cancelled')}
                >
                  Cancelled
                </button>
              </div>
            </div>
          </div>
          
          {/* Sort buttons */}
          <div className="flex border border-slate-700 rounded-md overflow-hidden">
            <button 
              className={`px-3 py-2 flex items-center gap-1 text-sm ${
                sortField === 'date' ? 'bg-primary-900/50 text-primary-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              onClick={() => handleSort('date')}
            >
              Date
              {sortField === 'date' && (
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
                sortField === 'client' ? 'bg-primary-900/50 text-primary-400' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
              onClick={() => handleSort('client')}
            >
              Client
              {sortField === 'client' && (
                sortDirection === 'asc' ? <ArrowUp size={14} /> : <ArrowDown size={14} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Delivery List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredDeliveries.length > 0 ? (
          filteredDeliveries.map(delivery => (
            <DeliveryListItem key={delivery.id} delivery={delivery} />
          ))
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-16 text-center">
            <Package size={48} className="text-slate-600 mb-4" />
            <h3 className="text-xl font-medium text-white mb-2">No deliveries found</h3>
            <p className="text-slate-400 max-w-md">
              {searchQuery
                ? `No deliveries matching "${searchQuery}" with the selected filters.`
                : 'No deliveries match the selected filters.'}
            </p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {filteredDeliveries.length > 0 && (
        <div className="mt-8 flex justify-center">
          <div className="flex shadow-sm">
            <button className="px-3 py-1 bg-slate-800 text-slate-300 rounded-l border border-slate-700 text-sm">
              Previous
            </button>
            <button className="px-3 py-1 bg-primary-600 text-white border-y border-primary-600 text-sm">
              1
            </button>
            <button className="px-3 py-1 bg-slate-800 text-slate-300 border-y border-slate-700 text-sm">
              2
            </button>
            <button className="px-3 py-1 bg-slate-800 text-slate-300 border-y border-slate-700 text-sm">
              3
            </button>
            <button className="px-3 py-1 bg-slate-800 text-slate-300 rounded-r border border-slate-700 text-sm">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deliveries;