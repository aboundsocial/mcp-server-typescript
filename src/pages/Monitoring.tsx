import React from 'react';
import Card from '../components/ui/Card';
import Chart from '../components/dashboard/Chart';
import { type SystemMetrics } from '../types';
import { CpuIcon, MemoryStick as Memory, Network, Clock } from 'lucide-react';

// Mock data
const systemMetrics: SystemMetrics = {
  cpuUsage: 42,
  memoryUsage: 68,
  requestsPerSecond: 23.5,
  activeConnections: 156,
  uptime: 1209600 // 14 days in seconds
};

// Helper function to format uptime
const formatUptime = (seconds: number): string => {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  
  return `${days}d ${hours}h ${minutes}m`;
};

const Monitoring: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-1">System Monitoring</h1>
        <p className="text-gray-500 dark:text-gray-400">Real-time metrics and performance monitoring</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="CPU Usage" 
          value={`${systemMetrics.cpuUsage}%`} 
          icon={<CpuIcon className="h-5 w-5" />}
          color="blue"
          percentage={systemMetrics.cpuUsage}
        />
        <MetricCard 
          title="Memory Usage" 
          value={`${systemMetrics.memoryUsage}%`} 
          icon={<Memory className="h-5 w-5" />}
          color="purple"
          percentage={systemMetrics.memoryUsage}
        />
        <MetricCard 
          title="Requests/Second" 
          value={systemMetrics.requestsPerSecond.toFixed(1)} 
          icon={<Network className="h-5 w-5" />}
          color="green"
          percentage={Math.min(systemMetrics.requestsPerSecond / 50 * 100, 100)}
        />
        <MetricCard 
          title="Uptime" 
          value={formatUptime(systemMetrics.uptime)} 
          icon={<Clock className="h-5 w-5" />}
          color="teal"
          percentage={100}
          showBar={false}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart title="CPU & Memory History (24h)" height={250} />
        <Chart title="Request Volume (24h)" height={250} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Chart title="Error Rate (%) (24h)" height={250} />
        <Chart title="Latency (ms) (24h)" height={250} />
      </div>
      
      <Card title="Active Connections">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Model</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Duration</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              {[...Array(5)].map((_, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">192.168.1.{100 + index}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">user{index + 1}@example.com</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {index % 2 === 0 ? 'GPT-3.5 Turbo' : 'Llama 3'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {Math.floor(Math.random() * 10) + 1}m {Math.floor(Math.random() * 50) + 10}s
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      <Card title="System Logs">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md overflow-auto h-64 font-mono text-sm text-gray-800 dark:text-gray-200">
          <div className="space-y-2">
            <LogEntry time="14:52:33" level="INFO" message="Request processed successfully. Model: GPT-3.5, Latency: 125ms" />
            <LogEntry time="14:51:18" level="INFO" message="New connection established from 192.168.1.105" />
            <LogEntry time="14:50:42" level="WARN" message="High memory usage detected (78%)" />
            <LogEntry time="14:48:15" level="ERROR" message="Failed to load context 'marketing-assistant'. Error: Context file not found." />
            <LogEntry time="14:45:32" level="INFO" message="Model 'Llama 3' completed request in 217ms" />
            <LogEntry time="14:44:10" level="INFO" message="User admin@example.com created new API key" />
            <LogEntry time="14:42:55" level="INFO" message="System backup completed successfully" />
            <LogEntry time="14:39:22" level="WARN" message="API rate limit reached for key 'dev-test-1'" />
            <LogEntry time="14:36:47" level="INFO" message="New model version 'GPT-3.5 Turbo v1.0.1' deployed successfully" />
            <LogEntry time="14:32:15" level="ERROR" message="Database connection timeout after 30s. Retrying..." />
          </div>
        </div>
      </Card>
    </div>
  );
};

const MetricCard: React.FC<{
  title: string;
  value: string;
  icon: React.ReactNode;
  color: 'blue' | 'purple' | 'green' | 'teal';
  percentage: number;
  showBar?: boolean;
}> = ({ title, value, icon, color, percentage, showBar = true }) => {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-100 dark:bg-blue-900/20',
      text: 'text-blue-600 dark:text-blue-400',
      bar: 'bg-blue-500 dark:bg-blue-400'
    },
    purple: {
      bg: 'bg-purple-100 dark:bg-purple-900/20',
      text: 'text-purple-600 dark:text-purple-400',
      bar: 'bg-purple-500 dark:bg-purple-400'
    },
    green: {
      bg: 'bg-green-100 dark:bg-green-900/20',
      text: 'text-green-600 dark:text-green-400',
      bar: 'bg-green-500 dark:bg-green-400'
    },
    teal: {
      bg: 'bg-teal-100 dark:bg-teal-900/20',
      text: 'text-teal-600 dark:text-teal-400',
      bar: 'bg-teal-500 dark:bg-teal-400'
    }
  };

  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">{value}</p>
        </div>
        <div className={`p-2 rounded-lg ${colorClasses[color].bg} ${colorClasses[color].text}`}>
          {icon}
        </div>
      </div>
      
      {showBar && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full ${colorClasses[color].bar}`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      )}
    </Card>
  );
};

const LogEntry: React.FC<{
  time: string;
  level: 'INFO' | 'WARN' | 'ERROR';
  message: string;
}> = ({ time, level, message }) => {
  const levelClasses = {
    INFO: 'text-blue-600 dark:text-blue-400',
    WARN: 'text-yellow-600 dark:text-yellow-400',
    ERROR: 'text-red-600 dark:text-red-400'
  };

  return (
    <div className="flex">
      <span className="text-gray-500 dark:text-gray-400 mr-2">[{time}]</span>
      <span className={`font-semibold mr-2 ${levelClasses[level]}`}>{level}</span>
      <span>{message}</span>
    </div>
  );
};

export default Monitoring;