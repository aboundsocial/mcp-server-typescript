import React, { useState, useEffect } from 'react';
import { Bell, Sun, Moon, Menu } from 'lucide-react';
import { userProfile } from '../../data/user';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('darkMode');
      if (stored !== null) {
        return stored === 'true';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="h-16 px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between transition-colors duration-300 ease-in-out">
      <div className="flex items-center gap-4">
        <button 
          className="md:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-colors duration-200">
          <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <button 
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          onClick={toggleDarkMode}
        >
          {darkMode ? (
            <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          ) : (
            <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          )}
        </button>

        <div className="flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-gray-700">
          <img
            src={userProfile.avatarUrl}
            alt={userProfile.name}
            className="h-8 w-8 rounded-full object-cover"
          />
          <div className="hidden md:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{userProfile.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{userProfile.title}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;