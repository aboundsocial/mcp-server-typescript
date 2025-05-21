import React from 'react';
import { type Model } from '../../types';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { ExternalLink, Edit, Power } from 'lucide-react';

interface ModelCardProps {
  model: Model;
  onEdit: (model: Model) => void;
  onToggleStatus: (model: Model) => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onEdit, onToggleStatus }) => {
  const getStatusBadge = (status: Model['status']) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Active</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      case 'error':
        return <Badge variant="error">Error</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{model.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">v{model.version}</p>
        </div>
        {getStatusBadge(model.status)}
      </div>
      
      <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">{model.description}</p>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Requests/min</p>
          <p className="font-medium text-gray-900 dark:text-white">{model.metrics.requestsPerMinute}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Latency</p>
          <p className="font-medium text-gray-900 dark:text-white">{model.metrics.averageLatency}ms</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">Error Rate</p>
          <p className="font-medium text-gray-900 dark:text-white">{model.metrics.errorRate}%</p>
        </div>
      </div>
      
      <div className="mt-auto flex gap-2 pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          icon={<ExternalLink className="h-4 w-4" />}
        >
          View Details
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          icon={<Edit className="h-4 w-4" />}
          onClick={() => onEdit(model)}
        >
          Edit
        </Button>
        <Button 
          variant={model.status === 'active' ? 'secondary' : 'primary'} 
          size="sm" 
          icon={<Power className="h-4 w-4" />}
          onClick={() => onToggleStatus(model)}
        >
          {model.status === 'active' ? 'Deactivate' : 'Activate'}
        </Button>
      </div>
    </Card>
  );
};

export default ModelCard;