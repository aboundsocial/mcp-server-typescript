import React, { useState } from 'react';
import { Search, History, ArrowRight, Loader2, Download } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { type Query } from '../types';

// Mock data for query history
const mockQueries: Query[] = [
  {
    id: '1',
    text: 'Show me customer engagement trends over the last 30 days',
    timestamp: '2025-03-18T14:30:00Z',
    status: 'completed',
    result: {
      type: 'chart',
      data: 'Chart data would go here'
    }
  },
  {
    id: '2',
    text: 'What is the average response time for support tickets?',
    timestamp: '2025-03-18T13:15:00Z',
    status: 'completed',
    result: {
      type: 'metric',
      value: '2.5 hours'
    }
  },
  {
    id: '3',
    text: 'List top 10 customers by revenue this quarter',
    timestamp: '2025-03-18T12:00:00Z',
    status: 'completed',
    result: {
      type: 'table',
      data: 'Table data would go here'
    }
  }
];

const QueryPage: React.FC = () => {
  const [queryInput, setQueryInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [queries, setQueries] = useState<Query[]>(mockQueries);

  const handleSubmitQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!queryInput.trim()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newQuery: Query = {
        id: Date.now().toString(),
        text: queryInput,
        timestamp: new Date().toISOString(),
        status: 'completed',
        result: {
          type: 'text',
          data: 'This is a simulated response to your query.'
        }
      };
      
      setQueries([newQuery, ...queries]);
      setQueryInput('');
      setIsLoading(false);
    }, 1500);
  };

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
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Natural Query</h1>
        <p className="text-gray-500 dark:text-gray-400">Ask questions about your data in plain English</p>
      </div>

      <Card>
        <form onSubmit={handleSubmitQuery} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Ask a question about your data..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQueryInput('Show me customer engagement trends')}
              >
                Customer Engagement
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setQueryInput('What is our revenue this month?')}
              >
                Revenue Analysis
              </Button>
            </div>
            
            <Button
              type="submit"
              variant="primary"
              disabled={!queryInput.trim() || isLoading}
              icon={isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
            >
              {isLoading ? 'Processing...' : 'Ask Question'}
            </Button>
          </div>
        </form>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Queries</h2>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          icon={<Download className="h-4 w-4" />}
        >
          Export History
        </Button>
      </div>

      <div className="space-y-4">
        {queries.map((query) => (
          <Card key={query.id} className="hover:border-blue-200 dark:hover:border-blue-800 transition-colors duration-200">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={query.status === 'completed' ? 'success' : 'secondary'}>
                    {query.status.charAt(0).toUpperCase() + query.status.slice(1)}
                  </Badge>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(query.timestamp)}
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQueryInput(query.text)}
                >
                  Run Again
                </Button>
              </div>
              
              <p className="text-gray-900 dark:text-white font-medium">
                {query.text}
              </p>
              
              {query.result && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 text-gray-600 dark:text-gray-300">
                  {typeof query.result === 'string' ? (
                    query.result
                  ) : (
                    <pre className="whitespace-pre-wrap">
                      {JSON.stringify(query.result, null, 2)}
                    </pre>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QueryPage;