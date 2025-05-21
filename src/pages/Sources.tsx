import React, { useState } from 'react';
import { Plus, Search, RefreshCw, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { type DataSource } from '../types';

// Mock data
const mockSources: DataSource[] = [
  {
    id: '1',
    name: 'Salesforce CRM',
    type: 'crm',
    status: 'connected',
    lastSync: '2025-03-18T14:30:00Z',
    metrics: {
      dataPoints: 125000,
      refreshRate: '15 minutes',
      errorRate: 0.02
    }
  },
  {
    id: '2',
    name: 'Google Analytics 4',
    type: 'analytics',
    status: 'connected',
    lastSync: '2025-03-18T14:25:00Z',
    metrics: {
      dataPoints: 890000,
      refreshRate: '5 minutes',
      errorRate: 0.01
    }
  },
  {
    id: '3',
    name: 'Mailchimp',
    type: 'email',
    status: 'error',
    lastSync: '2025-03-18T12:15:00Z',
    metrics: {
      dataPoints: 45000,
      refreshRate: '30 minutes',
      errorRate: 5.2
    }
  },
  {
    id: '4',
    name: 'Custom API Integration',
    type: 'custom',
    status: 'disconnected',
    lastSync: '2025-03-17T23:45:00Z',
    metrics: {
      dataPoints: 0,
      refreshRate: 'N/A',
      errorRate: 0
    }
  }
];

const Sources: React.FC = () => {
  const [sources, setSources] = useState<DataSource[]>(mockSources);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSources = sources.filter(source =>
    source.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefreshSource = (sourceId: string) => {
    console.log('Refreshing source:', sourceId);
    // This would trigger a re-sync with the data source
  };

  const handleConfigureSource = (source: DataSource) => {
    console.log('Configure source:', source);
    // This would open a configuration modal
  };

  const getStatusIcon = (status: DataSource['status']) => {
    switch (status) {
      case 'connected':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'disconnected':
        return <XCircle className="h-5 w-5 text-gray-400" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusBadge = (status: DataSource['status']) => {
    switch (status) {
      case 'connected':
        return <Badge variant="success">Connected</Badge>;
      case 'disconnected':
        return <Badge variant="secondary">Disconnected</Badge>;
      case 'error':
        return <Badge variant="error">Error</Badge>;
    }
  };

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(num);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Data Sources</h1>
          <p className="text-gray-500 dark:text-gray-400">Connect and manage your data integrations</p>
        </div>
        
        <Button variant="primary" icon={<Plus className="h-5 w-5" />}>
          Add New Source
        </Button>
      </div>
      
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search sources..."
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSources.map(source => (
          <Card key={source.id} className="flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                {getStatusIcon(source.status)}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{source.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{source.type}</p>
                </div>
              </div>
              {getStatusBadge(source.status)}
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Data Points</p>
                <p className="font-medium text-gray-900 dark:text-white">{formatNumber(source.metrics.dataPoints)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Refresh Rate</p>
                <p className="font-medium text-gray-900 dark:text-white">{source.metrics.refreshRate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Error Rate</p>
                <p className="font-medium text-gray-900 dark:text-white">{source.metrics.errorRate}%</p>
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-800 flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                icon={<RefreshCw className="h-4 w-4" />}
                onClick={() => handleRefreshSource(source.id)}
              >
                Refresh
              </Button>
              <Button 
                variant={source.status === 'connected' ? 'secondary' : 'primary'}
                size="sm"
                onClick={() => handleConfigureSource(source)}
              >
                {source.status === 'connected' ? 'Configure' : 'Connect'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Sources;