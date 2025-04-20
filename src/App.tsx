import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import DashboardLayout from './components/layouts/DashboardLayout';
import AuthLayout from './components/layouts/AuthLayout';

// Pages
import Dashboard from './pages/Dashboard';
import FleetMap from './pages/FleetMap';
import Analytics from './pages/Analytics';
import Trucks from './pages/Trucks';
import Drivers from './pages/Drivers';
import Deliveries from './pages/Deliveries';
import Login from './pages/Login';
import TruckDetail from './pages/TruckDetail';
import DriverDetail from './pages/DriverDetail';
import DeliveryDetail from './pages/DeliveryDetail';

// Providers
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="map" element={<FleetMap />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="trucks" element={<Trucks />} />
            <Route path="trucks/:id" element={<TruckDetail />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="drivers/:id" element={<DriverDetail />} />
            <Route path="deliveries" element={<Deliveries />} />
            <Route path="deliveries/:id" element={<DeliveryDetail />} />
          </Route>

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;