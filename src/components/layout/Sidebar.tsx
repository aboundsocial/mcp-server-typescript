import React from 'react';
import { LineChart, Database, Users, Lightbulb, Search, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { userProfile } from '../../data/user';

const navItems = [
  { icon: LineChart, label: 'Dashboard', path: '/' },
  { icon: Users, label: 'Customer Journeys', path: '/journeys' },
  { icon: Database, label: 'Data Sources', path: '/sources' },
  { icon: Lightbulb, label: 'Insights', path: '/insights' },
  { icon: Search, label: 'Natural Query', path: '/query' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all duration-300 ease-in-out">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <LineChart className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">Willow AI</h1>
        </div>
      </div>
      
      <nav className="flex-1 px-4 pb-6">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{userProfile.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;