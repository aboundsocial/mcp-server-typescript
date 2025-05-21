import React from 'react';
import { type Context } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { Edit, Trash2, Copy } from 'lucide-react';

interface ContextCardProps {
  context: Context;
  onEdit: (context: Context) => void;
  onDelete: (contextId: string) => void;
}

const ContextCard: React.FC<ContextCardProps> = ({ 
  context, 
  onEdit, 
  onDelete 
}) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{context.name}</h3>
        <Badge size="sm" variant="secondary">{formatBytes(context.size)}</Badge>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 rounded p-3 mb-4 overflow-hidden text-sm font-mono text-gray-700 dark:text-gray-300 h-32">
        <div className="line-clamp-5">{truncateContext(context.content)}</div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <p className="text-gray-500 dark:text-gray-400">Created</p>
          <p className="font-medium text-gray-900 dark:text-white">{formatDate(context.createdAt)}</p>
        </div>
        <div>
          <p className="text-gray-500 dark:text-gray-400">Last Used</p>
          <p className="font-medium text-gray-900 dark:text-white">{formatDate(context.lastUsed)}</p>
        </div>
      </div>
      
      <div className="mt-auto flex gap-2 pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          icon={<Copy className="h-4 w-4" />}
          onClick={() => {
            navigator.clipboard.writeText(context.content);
          }}
        >
          Copy
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          icon={<Edit className="h-4 w-4" />}
          onClick={() => onEdit(context)}
        >
          Edit
        </Button>
        <Button 
          variant="danger" 
          size="sm" 
          icon={<Trash2 className="h-4 w-4" />}
          onClick={() => onDelete(context.id)}
        >
          Delete
        </Button>
      </div>
    </Card>
  );
};

// Helper functions
const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

const truncateContext = (text: string): string => {
  return text.length > 200 ? `${text.slice(0, 200)}...` : text;
};

const Badge: React.FC<{ children: React.ReactNode, variant?: string, size?: string }> = ({ 
  children,
  variant = 'primary',
  size = 'md'
}) => {
  const classes = {
    primary: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
  };
  
  return (
    <span className={`inline-flex items-center font-medium rounded-full ${classes[variant as keyof typeof classes]} ${sizeClasses[size as keyof typeof sizeClasses]}`}>
      {children}
    </span>
  );
};

export default ContextCard;