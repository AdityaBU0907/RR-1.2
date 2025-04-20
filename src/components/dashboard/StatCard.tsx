import React from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'accent' | 'danger';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon, color }) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary-900/30',
      text: 'text-primary-500',
      icon: 'text-primary-400',
    },
    secondary: {
      bg: 'bg-secondary-900/30',
      text: 'text-secondary-500',
      icon: 'text-secondary-400',
    },
    accent: {
      bg: 'bg-accent-900/30',
      text: 'text-accent-500',
      icon: 'text-accent-400',
    },
    danger: {
      bg: 'bg-danger-900/30',
      text: 'text-danger-500',
      icon: 'text-danger-400',
    },
  };

  return (
    <div className="card">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-sm font-medium text-slate-400">{title}</h3>
            <p className="text-2xl font-semibold text-white mt-2">{value}</p>
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color].bg}`}>
            <div className={colorClasses[color].icon}>{icon}</div>
          </div>
        </div>
        <div className="mt-4 flex items-center">
          {change > 0 ? (
            <div className="flex items-center text-secondary-500">
              <ArrowUpRight size={16} />
              <span className="text-xs font-medium ml-1">+{change}%</span>
            </div>
          ) : (
            <div className="flex items-center text-danger-500">
              <ArrowDownRight size={16} />
              <span className="text-xs font-medium ml-1">{change}%</span>
            </div>
          )}
          <span className="ml-2 text-xs text-slate-400">vs. last period</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;