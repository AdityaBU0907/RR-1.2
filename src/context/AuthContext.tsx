import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation, NavigateFunction } from 'react-router-dom';

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => useContext(AuthContext);

// Custom hook to safely access navigation
const useSafeNavigate = (): NavigateFunction | undefined => {
  try {
    // This will throw an error if not in a Router context
    return useNavigate();
  } catch (error) {
    // Return undefined if not in a Router context
    return undefined;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useSafeNavigate();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('fleetUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (userData: User) => {
    // In a real app, this would make an API call
    setUser(userData);
    localStorage.setItem('fleetUser', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fleetUser');
    if (navigate) {
      navigate('/login');
    }
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};