import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  ArcElement,
  Tooltip, 
  Legend,
  Filler
);

interface AnalyticsCardProps {
  title: string;
  chartType: 'line' | 'bar' | 'doughnut';
  data: any;
  options?: any;
  height?: number;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ 
  title, 
  chartType, 
  data, 
  options = {}, 
  height = 200
}) => {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#94a3b8',
          usePointStyle: true,
          padding: 20,
          font: {
            size: 11,
          }
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#e2e8f0',
        bodyColor: '#cbd5e1',
        borderColor: '#334155',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 4,
        displayColors: true,
        usePointStyle: true,
        boxPadding: 6,
      }
    },
    scales: chartType !== 'doughnut' ? {
      x: {
        grid: {
          color: '#1e293b',
          display: true,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 10,
          }
        }
      },
      y: {
        grid: {
          color: '#1e293b',
          display: true,
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 10,
          }
        }
      }
    } : undefined,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <div className="card">
      <div className="card-header flex items-center justify-between">
        <h3 className="text-white">{title}</h3>
      </div>
      <div className="card-body" style={{ height }}>
        {chartType === 'line' && <Line data={data} options={mergedOptions} />}
        {chartType === 'bar' && <Bar data={data} options={mergedOptions} />}
        {chartType === 'doughnut' && <Doughnut data={data} options={mergedOptions} />}
      </div>
    </div>
  );
};

export default AnalyticsCard;