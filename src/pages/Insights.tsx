import React from 'react';
import { LineChart, TrendingUp, Users, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Chart from '../components/dashboard/Chart';

interface InsightCard {
  id: string;
  title: string;
  description: string;
  category: 'trend' | 'anomaly' | 'prediction';
  impact: 'positive' | 'negative' | 'neutral';
  value: string;
  change?: {
    value: number;
    trend: 'up' | 'down';
  };
  date: string;
}

const mockInsights: InsightCard[] = [
  {
    id: '1',
    title: 'Increased Customer Engagement',
    description: 'Email open rates have increased significantly across all campaigns',
    category: 'trend',
    impact: 'positive',
    value: '32%',
    change: {
      value: 8.5,
      trend: 'up'
    },
    date: '2025-03-18T14:30:00Z'
  },
  {
    id: '2',
    title: 'Conversion Rate Anomaly',
    description: 'Unusual spike in conversion rates from social media channels',
    category: 'anomaly',
    impact: 'positive',
    value: '12.8%',
    change: {
      value: 15.2,
      trend: 'up'
    },
    date: '2025-03-18T12:15:00Z'
  },
  {
    id: '3',
    title: 'Customer Churn Risk',
    description: 'Identified segment of customers showing decreased engagement',
    category: 'prediction',
    impact: 'negative',
    value: '145',
    change: {
      value: 23.4,
      trend: 'up'
    },
    date: '2025-03-18T10:45:00Z'
  },
  {
    id: '4',
    title: 'Sales Pipeline Forecast',
    description: 'Q2 sales pipeline predicted to exceed targets',
    category: 'prediction',
    impact: 'positive',
    value: '$2.4M',
    change: {
      value: 12.8,
      trend: 'up'
    },
    date: '2025-03-18T09:30:00Z'
  }
];

const Insights: React.FC = () => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Insights</h1>
          <p className="text-gray-500 dark:text-gray-400">AI-powered insights from your customer data</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            icon={<LineChart className="h-5 w-5" />}
          >
            Export Report
          </Button>
          <Button 
            variant="primary" 
            icon={<TrendingUp className="h-5 w-5" />}
          >
            Generate New Insights
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart title="Customer Engagement Trends" height={300} />
        <Chart title="Revenue Impact Analysis" height={300} />
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {mockInsights.map((insight) => (
          <Card key={insight.id} className="hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-200">
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      insight.category === 'trend' ? 'primary' : 
                      insight.category === 'anomaly' ? 'warning' : 
                      'info'
                    }
                  >
                    {insight.category.charAt(0).toUpperCase() + insight.category.slice(1)}
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(insight.date)}
                  </span>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                    {insight.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {insight.description}
                  </p>
                </div>
                
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Current Value</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">
                      {insight.value}
                    </p>
                  </div>
                  
                  {insight.change && (
                    <div className={`flex items-center gap-1 text-sm ${
                      insight.change.trend === 'up' 
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {insight.change.trend === 'up' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      {insight.change.value}%
                    </div>
                  )}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                icon={<Users className="h-4 w-4" />}
              >
                View Affected Users
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Insights;