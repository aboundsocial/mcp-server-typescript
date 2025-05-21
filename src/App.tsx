import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Journeys from './pages/Journeys';
import Sources from './pages/Sources';
import Insights from './pages/Insights';
import Query from './pages/Query';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="journeys" element={<Journeys />} />
          <Route path="sources" element={<Sources />} />
          <Route path="insights" element={<Insights />} />
          <Route path="query" element={<Query />} />
          <Route path="settings" element={<ComingSoon title="Settings" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

const ComingSoon: React.FC<{ title: string }> = ({ title }) => (
  <div className="h-full flex flex-col items-center justify-center p-6">
    <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{title}</h1>
    <p className="text-gray-500 dark:text-gray-400 text-center mb-6">
      This feature is coming soon. We're working hard to bring you a great experience.
    </p>
    <div className="h-2 w-48 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
      <div className="h-full bg-blue-500 w-3/4 rounded-full"></div>
    </div>
    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Development in progress</p>
  </div>
);

export default App;