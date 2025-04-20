import React, { useState } from 'react';
import { 
  Calendar, 
  RefreshCcw, 
  Download, 
  TrendingUp, 
  TrendingDown,
  Truck, 
  Package, 
  DollarSign, 
  Fuel, 
  Clock
} from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import AnalyticsCard from '../components/analytics/AnalyticsCard';

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  // Mock data for analytics - in a real app, this would come from an API
  const deliveryTrends = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Completed Deliveries',
        data: [420, 390, 450, 480, 460, 520, 500, 480, 510],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };
  
  const fuelEfficiency = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'MPG Average',
        data: [6.8, 6.7, 6.9, 7.1, 7.2, 7.3, 7.4, 7.3, 7.5],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };
  
  const maintenanceCosts = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Maintenance Costs',
        data: [18500, 12300, 21000, 14500, 16000, 19200, 15000, 13800, 17500],
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
        borderRadius: 4,
      }
    ],
  };
  
  const deliveryStatusData = {
    labels: ['On Time', 'Delayed', 'Cancelled'],
    datasets: [
      {
        data: [82, 15, 3],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderWidth: 0,
      },
    ],
  };

  const loadDistributionData = {
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

  const routeOptimizationData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'Planned Distance',
        data: [12500, 12700, 12600, 12200, 11900, 11700, 11500, 11300, 11100],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'transparent',
        borderDash: [],
        tension: 0.4,
      },
      {
        label: 'Actual Distance',
        data: [13200, 13100, 12900, 12500, 12100, 11800, 11600, 11400, 11200],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'transparent',
        tension: 0.4,
      }
    ],
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-white">Analytics Dashboard</h1>
          <p className="text-slate-400 mt-1">Track and analyze your fleet performance</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex bg-slate-900 border border-slate-800 rounded-md overflow-hidden">
            <button 
              className={`px-3 py-1.5 text-sm ${timeRange === 'week' ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
              onClick={() => setTimeRange('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1.5 text-sm ${timeRange === 'month' ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
              onClick={() => setTimeRange('month')}
            >
              Month
            </button>
            <button 
              className={`px-3 py-1.5 text-sm ${timeRange === 'quarter' ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
              onClick={() => setTimeRange('quarter')}
            >
              Quarter
            </button>
            <button 
              className={`px-3 py-1.5 text-sm ${timeRange === 'year' ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800'}`}
              onClick={() => setTimeRange('year')}
            >
              Year
            </button>
          </div>
          <button className="px-3 py-1.5 text-sm bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md flex items-center gap-1">
            <Calendar size={16} />
            <span>Custom</span>
          </button>
          <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md">
            <RefreshCcw size={16} />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-md">
            <Download size={16} />
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Delivery Efficiency" 
          value="92.4%" 
          change={3.8} 
          icon={<Package size={24} />} 
          color="primary" 
        />
        <StatCard 
          title="Fuel Economy" 
          value="7.5 mpg" 
          change={2.1} 
          icon={<Fuel size={24} />} 
          color="secondary" 
        />
        <StatCard 
          title="Maintenance Cost" 
          value="$17,500" 
          change={-5.2} 
          icon={<DollarSign size={24} />} 
          color="accent" 
        />
        <StatCard 
          title="Avg. Delivery Time" 
          value="2.4 days" 
          change={-8.3} 
          icon={<Clock size={24} />} 
          color="danger" 
        />
      </div>

      {/* Charts - First Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AnalyticsCard
          title="Delivery Trends"
          chartType="line"
          data={deliveryTrends}
          height={300}
        />
        <AnalyticsCard
          title="Fuel Efficiency (MPG)"
          chartType="line"
          data={fuelEfficiency}
          height={300}
        />
      </div>

      {/* Charts - Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <AnalyticsCard
          title="Maintenance Costs"
          chartType="bar"
          data={maintenanceCosts}
          height={300}
        />
        <AnalyticsCard
          title="Delivery Status"
          chartType="doughnut"
          data={deliveryStatusData}
          height={300}
        />
        <AnalyticsCard
          title="Load Distribution"
          chartType="doughnut"
          data={loadDistributionData}
          height={300}
        />
      </div>

      {/* Charts - Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <AnalyticsCard
          title="Route Optimization Analysis"
          chartType="line"
          data={routeOptimizationData}
          height={300}
        />
      </div>
    </div>
  );
};

export default Analytics;