import React from 'react';

const Journeys: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">User Journeys</h1>
      <div className="grid gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <p className="text-gray-500 dark:text-gray-400">
            Track and analyze user journeys across your application.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Journeys;