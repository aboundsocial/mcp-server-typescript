import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ContextCard from '../components/contexts/ContextCard';
import { type Context } from '../types';

// Mock data
const mockContexts: Context[] = [
  {
    id: '1',
    name: 'Customer Service Guidelines',
    modelId: '1',
    content: 'You are a helpful customer service assistant. Be polite, empathetic, and aim to resolve the customer\'s issue efficiently. If you don\'t know the answer, don\'t make things up and suggest escalating to a human agent.',
    size: 1024 * 250, // 250 KB
    lastUsed: '2025-03-18T14:23:00Z',
    createdAt: '2025-02-15T10:00:00Z',
    updatedAt: '2025-03-15T11:30:00Z'
  },
  {
    id: '2',
    name: 'Legal Document Analysis',
    modelId: '2',
    content: 'You are a legal document analyzer. Extract key information from legal documents including parties involved, obligations, deadlines, and potential risks. Present the information in a structured format.',
    size: 1024 * 512, // 512 KB
    lastUsed: '2025-03-17T09:45:00Z',
    createdAt: '2025-01-20T15:00:00Z',
    updatedAt: '2025-03-10T16:20:00Z'
  },
  {
    id: '3',
    name: 'Product Recommendations',
    modelId: '1',
    content: 'You are a product recommendation assistant for our e-commerce platform. Based on customer preferences and past purchases, suggest relevant products. Highlight key features that match their preferences. Always disclose when a recommendation is sponsored.',
    size: 1024 * 320, // 320 KB
    lastUsed: '2025-03-18T11:30:00Z',
    createdAt: '2025-03-01T14:00:00Z',
    updatedAt: '2025-03-15T09:15:00Z'
  },
  {
    id: '4',
    name: 'Code Review Assistant',
    modelId: '3',
    content: 'You are a code review assistant. Analyze code snippets to identify bugs, security vulnerabilities, performance issues, and style inconsistencies. Provide constructive feedback and suggest improvements following best practices.',
    size: 1024 * 650, // 650 KB
    lastUsed: '2025-03-16T16:45:00Z',
    createdAt: '2025-02-25T11:30:00Z',
    updatedAt: '2025-03-12T10:00:00Z'
  },
  {
    id: '5',
    name: 'Health Information',
    modelId: '2',
    content: 'You are a health information assistant. Provide general health information and wellness tips. ALWAYS include a disclaimer that you are not providing medical advice and users should consult healthcare professionals for medical concerns. NEVER diagnose conditions or suggest treatments.',
    size: 1024 * 420, // 420 KB
    lastUsed: '2025-03-17T13:20:00Z',
    createdAt: '2025-01-15T09:00:00Z',
    updatedAt: '2025-03-10T14:30:00Z'
  },
  {
    id: '6',
    name: 'Social Media Content Creator',
    modelId: '5',
    content: 'You are a social media content creation assistant. Generate engaging content ideas for various platforms including Twitter, Instagram, LinkedIn, and TikTok. Adapt tone and style to match platform-specific best practices. Focus on driving engagement while maintaining brand voice.',
    size: 1024 * 380, // 380 KB
    lastUsed: '2025-03-18T10:15:00Z',
    createdAt: '2025-02-10T13:45:00Z',
    updatedAt: '2025-03-15T15:30:00Z'
  }
];

const Contexts: React.FC = () => {
  const [contexts, setContexts] = useState<Context[]>(mockContexts);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredContexts = contexts.filter(context => 
    context.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    context.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEditContext = (context: Context) => {
    console.log('Edit context:', context);
    // This would open a modal or navigate to edit page
  };

  const handleDeleteContext = (contextId: string) => {
    if (window.confirm('Are you sure you want to delete this context?')) {
      setContexts(contexts.filter(context => context.id !== contextId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">Contexts</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage model contexts and prompts</p>
        </div>
        
        <Button variant="primary" icon={<Plus className="h-5 w-5" />}>
          Create Context
        </Button>
      </div>
      
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search contexts..."
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <select
              className="pl-3 pr-8 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
            >
              <option value="all">All Models</option>
              <option value="1">GPT-3.5 Turbo</option>
              <option value="2">Llama 3</option>
              <option value="3">Code Interpreter</option>
            </select>
          </div>
        </div>
      </Card>
      
      {filteredContexts.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-gray-500 dark:text-gray-400">No contexts match your search criteria.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContexts.map(context => (
            <ContextCard 
              key={context.id} 
              context={context} 
              onEdit={handleEditContext}
              onDelete={handleDeleteContext}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Contexts;