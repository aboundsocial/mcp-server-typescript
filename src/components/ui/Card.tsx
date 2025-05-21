import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children, className = '', footer }) => {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-200 ${className}`}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-800">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;