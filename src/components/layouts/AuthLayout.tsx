import React from 'react';
import { Truck } from 'lucide-react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center p-8 sm:p-12 lg:p-16">
        <div className="w-full max-w-md mx-auto">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-md bg-primary-600 flex items-center justify-center">
              <Truck size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-white">FleetVision</span>
          </div>
          
          {children}
        </div>
      </div>
      
      {/* Right Side - Image and Info */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg" 
            alt="Logistics" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center p-16">
          <div className="bg-slate-800/80 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
            <h2 className="text-3xl font-bold text-white mb-4">Intelligent Fleet Management</h2>
            <p className="text-slate-300 mb-6">
              Optimize your logistics operations with real-time tracking, advanced analytics, 
              and predictive insights. FleetVision gives you complete visibility and control 
              over your entire fleet.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-700/30 flex items-center justify-center shrink-0">
                  <MapPin size={20} className="text-primary-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Real-time Tracking</h3>
                  <p className="text-sm text-slate-400">Monitor your entire fleet with live GPS tracking and route visualization</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-700/30 flex items-center justify-center shrink-0">
                  <BarChart3 size={20} className="text-secondary-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Advanced Analytics</h3>
                  <p className="text-sm text-slate-400">Gain insights from comprehensive data analysis and performance metrics</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-accent-700/30 flex items-center justify-center shrink-0">
                  <Package size={20} className="text-accent-400" />
                </div>
                <div>
                  <h3 className="font-medium text-white">Load Optimization</h3>
                  <p className="text-sm text-slate-400">Maximize efficiency with smart load distribution and capacity management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;