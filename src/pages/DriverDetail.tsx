import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  User, 
  Truck, 
  Calendar,
  MapPin, 
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  Settings,
  FileText,
  Award,
  TrendingUp
} from 'lucide-react';
import AnalyticsCard from '../components/analytics/AnalyticsCard';

// In a real app, this would be fetched from a dedicated API endpoint
// Using mock data for demonstration
const mockDriverData = {
  id: 'D-101',
  name: 'John Smith',
  email: 'john.smith@fleetvision.com',
  phone: '(312) 555-7890',
  location: 'Chicago, IL',
  address: '123 Fleet Street, Chicago, IL 60601',
  status: 'active',
  assignedTruck: 'T-101',
  experience: '5 years',
  licenseCDL: 'Class A - IL',
  licenseExpiration: 'Jul 15, 2026',
  rating: 4.8,
  joinDate: 'Mar 10, 2020',
  birthDate: 'May 22, 1988',
  emergencyContact: 'Sarah Smith - (312) 555-1234',
  about: 'Experienced truck driver with over 5 years of experience in long-haul logistics. Specializes in cross-country deliveries and has an excellent safety record.',
  certifications: [
    { name: 'Hazardous Materials', date: 'Oct 2023', expires: 'Oct 2025' },
    { name: 'Tanker Endorsement', date: 'Nov 2022', expires: 'Nov 2027' },
    { name: 'Doubles/Triples', date: 'Feb 2021', expires: 'Feb 2026' }
  ],
  recentDeliveries: [
    { id: 'DEL-1092', date: 'Oct 8, 2025', origin: 'Chicago, IL', destination: 'Detroit, MI', status: 'delivered', onTime: true },
    { id: 'DEL-1087', date: 'Oct 5, 2025', origin: 'Detroit, MI', destination: 'Indianapolis, IN', status: 'delivered', onTime: true },
    { id: 'DEL-1078', date: 'Oct 1, 2025', origin: 'Columbus, OH', destination: 'Chicago, IL', status: 'delivered', onTime: false },
    { id: 'DEL-1065', date: 'Sep 28, 2025', origin: 'Chicago, IL', destination: 'Columbus, OH', status: 'delivered', onTime: true },
  ],
  recentActivity: [
    { type: 'delivery_start', description: 'Started delivery to Detroit', time: 'Oct 10, 2025 - 8:30 AM' },
    { type: 'fuel_stop', description: 'Fuel stop at Flying J (Toledo)', time: 'Oct 10, 2025 - 1:15 PM' },
    { type: 'check_in', description: 'Checkpoint reached in Toledo', time: 'Oct 10, 2025 - 1:30 PM' },
    { type: 'delay', description: 'Traffic delay on I-75', time: 'Oct 10, 2025 - 3:45 PM' },
  ],
  performanceMetrics: {
    onTimeDelivery: 94,
    fuelEfficiency: 7.2,
    safetyScore: 98,
    customerSatisfaction: 4.7,
    hoursUtilization: 92
  }
};

const DriverDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'deliveries'>('overview');
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulate data fetch
  const driver = mockDriverData;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-6">
        <User size={48} className="text-slate-600 mb-4" />
        <h2 className="text-xl font-medium text-white mb-2">Driver not found</h2>
        <p className="text-slate-400 max-w-md">
          The driver you're looking for doesn't exist or has been removed.
        </p>
        <a 
          href="/dashboard/drivers" 
          className="mt-4 flex items-center text-primary-400 hover:text-primary-300"
        >
          <ArrowLeft size={16} className="mr-1" />
          <span>Back to drivers</span>
        </a>
      </div>
    );
  }

  // Mock data for charts
  const deliveryPerformanceData = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'On-Time Deliveries (%)',
        data: [90, 88, 92, 95, 93, 90, 94],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const fuelEfficiencyData = {
    labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'MPG',
        data: [7.0, 6.9, 7.1, 7.2, 7.0, 7.3, 7.2],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ],
  };

  const hoursLoggedData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Drive Hours',
        data: [8, 9, 8.5, 9, 7, 0, 0],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderRadius: 4,
      },
      {
        label: 'Rest Hours',
        data: [10, 9, 9.5, 9, 11, 24, 24],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
        borderRadius: 4,
      }
    ],
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-slate-400 mb-2">
          <a 
            href="/dashboard/drivers" 
            className="flex items-center hover:text-slate-300"
          >
            <ArrowLeft size={16} className="mr-1" />
            <span>Back to drivers</span>
          </a>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-md bg-slate-800">
              <User size={24} className="text-primary-400" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white">{driver.name}</h1>
              <p className="text-slate-400">Driver ID: {driver.id}</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-3 py-1 rounded-full text-sm font-medium bg-secondary-900 text-secondary-400">
              Active Driver
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
              activeTab === 'performance' 
                ? 'border-primary-500 text-primary-400' 
                : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-700'
            }`}
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </button>
          <button
            className={`pb-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === 'deliveries' 
                ? 'border-primary-500 text-primary-400' 
                : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-700'
            }`}
            onClick={() => setActiveTab('deliveries')}
          >
            Deliveries History
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Driver Info */}
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="text-white">Driver Information</h2>
              </div>
              <div className="card-body">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Personal Details</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Full Name</span>
                        <span className="text-sm text-white">{driver.name}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Birth Date</span>
                        <span className="text-sm text-white">{driver.birthDate}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Location</span>
                        <span className="text-sm text-white">{driver.location}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Join Date</span>
                        <span className="text-sm text-white">{driver.joinDate}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Experience</span>
                        <span className="text-sm text-white">{driver.experience}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">Contact Information</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <Phone size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-300">Phone:</span>
                        <span className="text-sm text-white">{driver.phone}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Mail size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-300">Email:</span>
                        <span className="text-sm text-white">{driver.email}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <MapPin size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-300">Address:</span>
                        <span className="text-sm text-white">{driver.address}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Phone size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-300">Emergency:</span>
                        <span className="text-sm text-white">{driver.emergencyContact}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-slate-400 mb-2">License Information</h3>
                    <ul className="space-y-2">
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">License Type</span>
                        <span className="text-sm text-white">{driver.licenseCDL}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-sm text-slate-300">Expiration</span>
                        <span className="text-sm text-white">{driver.licenseExpiration}</span>
                      </li>
                      <li className="flex items-center gap-2 mt-4">
                        <Truck size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-300">Assigned Truck:</span>
                        <span className="text-sm text-white">{driver.assignedTruck}</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Award size={14} className="text-slate-400" />
                        <span className="text-sm text-slate-300">Rating:</span>
                        <div className="flex items-center">
                          <span className="text-sm text-white mr-1">{driver.rating}</span>
                          <svg className="w-3.5 h-3.5 text-secondary-400 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <h3 className="text-sm font-medium text-slate-400 mb-2">About</h3>
                  <p className="text-sm text-slate-300">{driver.about}</p>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h2 className="text-white">Certifications & Endorsements</h2>
              </div>
              <div className="card-body">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-800">
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Certification</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Date Obtained</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Expiration</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {driver.certifications.map((cert, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-slate-800 hover:bg-slate-800/50"
                        >
                          <td className="py-3 px-4 text-sm text-white">{cert.name}</td>
                          <td className="py-3 px-4 text-sm text-slate-300">{cert.date}</td>
                          <td className="py-3 px-4 text-sm text-slate-300">{cert.expires}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-900 text-secondary-400">
                              Active
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Stats and Activity */}
          <div>
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="text-white">Performance Summary</h2>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-400">On-Time Delivery</p>
                      <p className="text-sm font-medium text-white">{driver.performanceMetrics.onTimeDelivery}%</p>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-secondary-500"
                        style={{ width: `${driver.performanceMetrics.onTimeDelivery}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-400">Fuel Efficiency</p>
                      <p className="text-sm font-medium text-white">{driver.performanceMetrics.fuelEfficiency} MPG</p>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-primary-500"
                        style={{ width: `${(driver.performanceMetrics.fuelEfficiency / 10) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-400">Safety Score</p>
                      <p className="text-sm font-medium text-white">{driver.performanceMetrics.safetyScore}/100</p>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-secondary-500"
                        style={{ width: `${driver.performanceMetrics.safetyScore}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-slate-400">Customer Satisfaction</p>
                      <p className="text-sm font-medium text-white">{driver.performanceMetrics.customerSatisfaction}/5.0</p>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-accent-500"
                        style={{ width: `${(driver.performanceMetrics.customerSatisfaction / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
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
                  {driver.recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                        activity.type === 'delivery_start' ? 'bg-primary-900/50' :
                        activity.type === 'fuel_stop' ? 'bg-accent-900/50' :
                        activity.type === 'check_in' ? 'bg-secondary-900/50' :
                        'bg-danger-900/50'
                      }`}>
                        {activity.type === 'delivery_start' && <Truck size={16} className="text-primary-400" />}
                        {activity.type === 'fuel_stop' && <TrendingUp size={16} className="text-accent-400" />}
                        {activity.type === 'check_in' && <CheckCircle size={16} className="text-secondary-400" />}
                        {activity.type === 'delay' && <AlertTriangle size={16} className="text-danger-400" />}
                      </div>
                      <div>
                        <p className="text-sm text-white">{activity.description}</p>
                        <p className="text-xs text-slate-400">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <AnalyticsCard
                title="On-Time Delivery Performance"
                chartType="line"
                data={deliveryPerformanceData}
                height={300}
              />
              <AnalyticsCard
                title="Fuel Efficiency Trends"
                chartType="line"
                data={fuelEfficiencyData}
                height={300}
              />
            </div>
            
            <div className="card">
              <div className="card-header">
                <h2 className="text-white">Weekly Hours Log</h2>
              </div>
              <div className="card-body">
                <AnalyticsCard
                  title=""
                  chartType="bar"
                  data={hoursLoggedData}
                  height={300}
                />
                
                <div className="mt-6 border-t border-slate-800 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Drive Time</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-white mr-2">41.5</p>
                      <p className="text-sm text-slate-300">hours/week</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs">
                      <div className="flex items-center text-secondary-500">
                        <TrendingUp size={12} className="mr-0.5" />
                        <span>3.2%</span>
                      </div>
                      <span className="ml-1 text-slate-400">vs last week</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Rest Time</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-white mr-2">72.5</p>
                      <p className="text-sm text-slate-300">hours/week</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs">
                      <div className="flex items-center text-secondary-500">
                        <TrendingUp size={12} className="mr-0.5" />
                        <span>5.1%</span>
                      </div>
                      <span className="ml-1 text-slate-400">vs last week</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 mb-1">Available Hours</p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-white mr-2">18</p>
                      <p className="text-sm text-slate-300">hours remaining</p>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">Weekly limit: 60 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="card mb-6">
              <div className="card-header">
                <h2 className="text-white">Performance Stats</h2>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-800 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-secondary-900/50">
                        <CheckCircle size={16} className="text-secondary-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">On-Time Rate</p>
                        <p className="text-xs text-slate-400">Last 3 months</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-white">94%</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-800 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary-900/50">
                        <Truck size={16} className="text-primary-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Avg. Distance</p>
                        <p className="text-xs text-slate-400">Per delivery</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-white">425 mi</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-800 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-accent-900/50">
                        <TrendingUp size={16} className="text-accent-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Fuel Efficiency</p>
                        <p className="text-xs text-slate-400">Average MPG</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-white">7.2</p>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-800 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-danger-900/50">
                        <AlertTriangle size={16} className="text-danger-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Safety Incidents</p>
                        <p className="text-xs text-slate-400">Last 12 months</p>
                      </div>
                    </div>
                    <p className="text-lg font-semibold text-white">0</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-header">
                <h2 className="text-white">Documentation</h2>
              </div>
              <div className="card-body">
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-slate-800 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-slate-700">
                        <FileText size={16} className="text-slate-400" />
                      </div>
                      <p className="text-sm text-white">Driver License Copy</p>
                    </div>
                    <button className="text-xs text-primary-400 hover:text-primary-300">
                      View
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-800 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-slate-700">
                        <FileText size={16} className="text-slate-400" />
                      </div>
                      <p className="text-sm text-white">Medical Certificate</p>
                    </div>
                    <button className="text-xs text-primary-400 hover:text-primary-300">
                      View
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-800 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-slate-700">
                        <FileText size={16} className="text-slate-400" />
                      </div>
                      <p className="text-sm text-white">Hazmat Certification</p>
                    </div>
                    <button className="text-xs text-primary-400 hover:text-primary-300">
                      View
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-slate-800 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-slate-700">
                        <FileText size={16} className="text-slate-400" />
                      </div>
                      <p className="text-sm text-white">Employment Documents</p>
                    </div>
                    <button className="text-xs text-primary-400 hover:text-primary-300">
                      View
                    </button>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <button className="btn-ghost text-xs py-1.5">
                    Upload New Document
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'deliveries' && (
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <h2 className="text-white">Delivery History</h2>
            <div className="flex items-center gap-2">
              <select className="bg-slate-800 border border-slate-700 rounded text-sm p-1.5 text-slate-300">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>All time</option>
              </select>
              <button className="btn-primary text-xs py-1.5">Export</button>
            </div>
          </div>
          <div className="card-body">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800">
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Origin</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Destination</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-slate-300">On Time</th>
                    <th className="text-right py-3 px-4 text-sm font-medium text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {driver.recentDeliveries.map((delivery, index) => (
                    <tr 
                      key={index} 
                      className="border-b border-slate-800 hover:bg-slate-800/50"
                    >
                      <td className="py-3 px-4 text-sm text-white">{delivery.id}</td>
                      <td className="py-3 px-4 text-sm text-slate-300">{delivery.date}</td>
                      <td className="py-3 px-4 text-sm text-slate-300">{delivery.origin}</td>
                      <td className="py-3 px-4 text-sm text-slate-300">{delivery.destination}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          delivery.status === 'delivered' 
                            ? 'bg-secondary-900 text-secondary-400' 
                            : delivery.status === 'inTransit'
                              ? 'bg-accent-900 text-accent-400'
                              : 'bg-primary-900 text-primary-400'
                        }`}>
                          {delivery.status === 'delivered' ? 'Delivered' : 
                           delivery.status === 'inTransit' ? 'In Transit' : 'Scheduled'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {delivery.onTime ? (
                          <span className="flex items-center text-secondary-400 text-sm">
                            <CheckCircle size={14} className="mr-1" />
                            Yes
                          </span>
                        ) : (
                          <span className="flex items-center text-danger-400 text-sm">
                            <AlertTriangle size={14} className="mr-1" />
                            No
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <a href={`/dashboard/deliveries/${delivery.id}`} className="text-primary-400 hover:text-primary-300 text-sm">
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-slate-400">
                Showing 4 of 42 deliveries
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700 text-sm">
                  Previous
                </button>
                <button className="px-3 py-1 bg-primary-600 text-white rounded text-sm">
                  1
                </button>
                <button className="px-3 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700 text-sm">
                  2
                </button>
                <button className="px-3 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700 text-sm">
                  3
                </button>
                <button className="px-3 py-1 bg-slate-800 text-slate-300 rounded border border-slate-700 text-sm">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverDetail;