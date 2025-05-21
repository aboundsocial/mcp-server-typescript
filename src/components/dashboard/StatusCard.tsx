import React from 'react';
import Card from '../ui/Card';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatusCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  subtitle?: string;
  className?: string;
}

const StatusCard: React.FC<StatusCardProps> = ({
  title,
  value,
  icon,
  change,
  subtitle,
  className = '',
}) => {
  return (
    <Card className={`${className}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
          <div className="mt-1 flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">{value}</p>
            
            {change && (
              <span className={`ml-2 text-xs font-medium flex items-center ${
                change.type === 'increase' 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {change.type === 'increase' ? (
                  <ArrowUp className="h-3 w-3 mr-0.5" />
                ) : (
                  <ArrowDown className="h-3 w-3 mr-0.5" />
                )}
                {Math.abs(change.value)}%
              </span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
        
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export default StatusCard;