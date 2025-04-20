import React, { useState } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  BarChart3,
  Truck,
  Users,
  Package,
  Bell,
  Menu,
  X,
  LogOut,
  Moon,
  Sun,
  ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NavItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(`${to}/`);

  return (
    <NavLink
      to={to}
      className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
        isActive
          ? 'bg-primary-900/50 text-primary-400'
          : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </NavLink>
  );
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, logout } = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  // Placeholder for notifications
  const notifications = [
    { id: 1, title: 'Truck T-103 approaching destination', time: '2 min ago', read: false },
    { id: 2, title: 'Driver Dave reported delay due to traffic', time: '15 min ago', read: false },
    { id: 3, title: 'Maintenance alert: Truck T-105 needs service', time: '1 hour ago', read: true },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleNotifications = () => setNotificationsOpen(!notificationsOpen);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="flex h-screen bg-slate-950">
      {/* Sidebar - Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 w-64 h-full bg-slate-900 border-r border-slate-800 transition-all duration-300 ease-in-out transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:static lg:z-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary-600 flex items-center justify-center">
                <Truck size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">FleetVision</span>
            </div>
            <button 
              className="p-1 rounded-md hover:bg-slate-800 lg:hidden"
              onClick={toggleSidebar}
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
            <NavItem to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavItem to="/dashboard/map" icon={MapPin} label="Fleet Map" />
            <NavItem to="/dashboard/analytics" icon={BarChart3} label="Analytics" />
            <NavItem to="/dashboard/trucks" icon={Truck} label="Trucks" />
            <NavItem to="/dashboard/drivers" icon={Users} label="Drivers" />
            <NavItem to="/dashboard/deliveries" icon={Package} label="Deliveries" />
          </nav>
          
          {/* User Profile */}
          <div className="p-4 border-t border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-700 flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name || 'Admin User'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email || 'admin@fleetvision.com'}</p>
              </div>
              <button 
                className="p-1.5 rounded-md text-slate-400 hover:bg-slate-800 hover:text-white"
                onClick={logout}
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <button 
              className="p-1.5 rounded-md hover:bg-slate-800 lg:hidden"
              onClick={toggleSidebar}
            >
              <Menu size={20} />
            </button>
            <h1 className="text-xl font-semibold text-white hidden sm:block">
              {location.pathname === '/dashboard' && 'Dashboard'}
              {location.pathname === '/dashboard/map' && 'Fleet Map'}
              {location.pathname === '/dashboard/analytics' && 'Analytics'}
              {location.pathname === '/dashboard/trucks' && 'Trucks'}
              {location.pathname === '/dashboard/drivers' && 'Drivers'}
              {location.pathname === '/dashboard/deliveries' && 'Deliveries'}
              {location.pathname.includes('/dashboard/trucks/') && 'Truck Details'}
              {location.pathname.includes('/dashboard/drivers/') && 'Driver Details'}
              {location.pathname.includes('/dashboard/deliveries/') && 'Delivery Details'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white relative"
                onClick={toggleNotifications}
              >
                <Bell size={20} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-danger-500 animate-ping-slow"></span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-800 rounded-md shadow-lg z-50">
                  <div className="p-3 border-b border-slate-800 flex items-center justify-between">
                    <h3 className="font-medium text-white">Notifications</h3>
                    <button className="text-xs text-primary-400 hover:text-primary-300">
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length > 0 ? (
                      <div>
                        {notifications.map(notification => (
                          <div
                            key={notification.id}
                            className={`p-3 border-b border-slate-800 hover:bg-slate-800/50 cursor-pointer ${
                              !notification.read ? 'bg-slate-800/20' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 ${!notification.read ? 'bg-primary-500' : 'bg-slate-700'}`} />
                              <div>
                                <p className="text-sm text-slate-200">{notification.title}</p>
                                <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-slate-400 text-sm">
                        No notifications
                      </div>
                    )}
                  </div>
                  <div className="p-2 border-t border-slate-800">
                    <button className="w-full text-center p-2 text-sm text-primary-400 hover:text-primary-300 hover:bg-slate-800/50 rounded-md">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-slate-950">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;