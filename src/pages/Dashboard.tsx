import React, { useState } from 'react';
import { Activity, Database, Clock, Server, Send } from 'lucide-react';
import StatusCard from '../components/dashboard/StatusCard';
import Chart from '../components/dashboard/Chart';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { type Model } from '../types';
import ModelCard from '../components/models/ModelCard';

// Mock data
const models: Model[] = [
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
  }
];

const Dashboard: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEditModel = (model: Model) => {
    console.log('Edit model:', model);
  };

  const handleToggleModelStatus = (model: Model) => {
    console.log('Toggle model status:', model);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setResponse('');

    try {
      const apiUrl = `${import.meta.env.SUPABASE_URL}/functions/v1/chat`;
      
      console.log('Making request to:', apiUrl);
      console.log('With prompt:', prompt.trim());
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error(errorData || 'Failed to get response from server');
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format from server');
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (!data.response) {
        throw new Error('No response received from the server');
      }

      setResponse(data.response);
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setResponse('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Overview of your MCP server status and performance.</p>
      </div>

      {/* ChatGPT Integration Test Area */}
      <Card title="ChatGPT Integration Test">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Test Prompt
            </label>
            <textarea
              id="prompt"
              rows={4}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              placeholder="Enter your test prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={!prompt.trim() || isLoading}
              icon={<Send className="h-4 w-4" />}
            >
              {isLoading ? 'Processing...' : 'Send Request'}
            </Button>
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
              {error}
            </div>
          )}

          {response && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Response
              </label>
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-gray-600 dark:text-gray-300 min-h-[100px] whitespace-pre-wrap">
                {response}
              </div>
            </div>
          )}
        </form>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Total Requests"
          value="12,543"
          change={{ value: 12.5, type: 'increase' }}
          subtitle="Last 24 hours"
          icon={<Activity className="h-5 w-5" />}
        />
        <StatusCard
          title="Context Size"
          value="2.4 GB"
          change={{ value: 4.3, type: 'increase' }}
          subtitle="Across all models"
          icon={<Database className="h-5 w-5" />}
        />
        <StatusCard
          title="Average Latency"
          value="142 ms"
          change={{ value: 8.1, type: 'decrease' }}
          subtitle="Improved performance"
          icon={<Clock className="h-5 w-5" />}
        />
        <StatusCard
          title="Active Models"
          value="6"
          change={{ value: 2, type: 'increase' }}
          subtitle="2 newly deployed"
          icon={<Server className="h-5 w-5" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart title="Request Volume (24h)" />
        <Chart title="Latency Distribution (ms)" />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Active Models</h2>
          <a href="/models" className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline">
            View all
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {models.map(model => (
            <ModelCard 
              key={model.id} 
              model={model} 
              onEdit={handleEditModel}
              onToggleStatus={handleToggleModelStatus}
            />
          ))}
        </div>
      </div>
      
      <Card title="Recent Activity">
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-start py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
              <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                <Activity className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-900 dark:text-white">
                  {index === 0 ? (
                    'Model "GPT-3.5 Turbo" has been updated to version 1.0.1'
                  ) : index === 1 ? (
                    'New context "Summer Sales Campaign" created for marketing model'
                  ) : (
                    'API key "Development" has reached 80% of its rate limit'
                  )}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {index === 0 ? '12 minutes ago' : index === 1 ? '2 hours ago' : '4 hours ago'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;