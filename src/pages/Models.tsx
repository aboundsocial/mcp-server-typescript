import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ModelCard from '../components/models/ModelCard';
import { type Model } from '../types';

// Mock data
const mockModels: Model[] = [
  {
    id: '1',
    name: 'GPT-3.5 Turbo',
    description: 'General purpose language model optimized for chat.',
    version: '1.0.0',
    status: 'active',
    lastUpdated: '2025-03-15T12:00:00Z',
    metrics: {
      requestsPerMinute: 342,
      averageLatency: 120,
      errorRate: 0.2
    }
  },
  {
    id: '2',
    name: 'Llama 3',
    description: 'Open-source language model with 70B parameters.',
    version: '3.1.0',
    status: 'active',
    lastUpdated: '2025-03-10T12:00:00Z',
    metrics: {
      requestsPerMinute: 156,
      averageLatency: 180,
      errorRate: 0.5
    }
  },
  {
    id: '3',
    name: 'Code Interpreter',
    description: 'Specialized model for code generation and explanation.',
    version: '0.9.2',
    status: 'inactive',
    lastUpdated: '2025-02-28T12:00:00Z',
    metrics: {
      requestsPerMinute: 0,
      averageLatency: 0,
      errorRate: 0
    }
  },
  {
    id: '4',
    name: 'Embedding Model',
    description: 'Vector embedding model for text representation.',
    version: '2.1.0',
    status: 'active',
    lastUpdated: '2025-03-05T12:00:00Z',
    metrics: {
      requestsPerMinute: 521,
      averageLatency: 45,
      errorRate: 0.1
    }
  },
  {
    id: '5',
    name: 'Mixtral 8x7B',
    description: 'Mixture of experts model for general language tasks.',
    version: '1.2.0',
    status: 'active',
    lastUpdated: '2025-03-12T12:00:00Z',
    metrics: {
      requestsPerMinute: 98,
      averageLatency: 210,
      errorRate: 0.3
    }
  },
  {
    id: '6',
    name: 'Image Generator',
    description: 'AI model for generating images from text prompts.',
    version: '0.8.5',
    status: 'error',
    lastUpdated: '2025-03-01T12:00:00Z',
    metrics: {
      requestsPerMinute: 15,
      averageLatency: 1200,
      errorRate: 8.4
    }
  },
];

const Models: React.FC = () => {
  const [models, setModels] = useState<Model[]>(mockModels);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Model['status'] | 'all'>('all');
  
  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         model.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || model.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEditModel = (model: Model) => {
    console.log('Edit model:', model);
    // This would open a modal or navigate to edit page
  };

  const handleToggleModelStatus = (model: Model) => {
    // Toggle model status between active and inactive
    setModels(models.map(m => {
      if (m.id === model.id) {
        const newStatus = m.status === 'active' ? 'inactive' : 'active';
        return {
          ...m,
          status: newStatus,
          metrics: newStatus === 'inactive' ? {
            requestsPerMinute: 0,
            averageLatency: 0,
            errorRate: 0
          } : m.metrics
        };
      }
      return m;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Models</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and monitor your AI models</p>
        </div>
        
        <Button variant="primary" icon={<Plus className="h-5 w-5" />}>
          Add New Model
        </Button>
      </div>
      
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search models..."
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <select
              className="pl-3 pr-8 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Model['status'] | 'all')}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>
      </Card>
      
      {filteredModels.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No models match your search criteria.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModels.map(model => (
            <ModelCard 
              key={model.id} 
              model={model} 
              onEdit={handleEditModel}
              onToggleStatus={handleToggleModelStatus}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Models;