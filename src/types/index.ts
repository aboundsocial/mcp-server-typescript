export interface CustomerJourney {
  id: string;
  customerId: string;
  name: string;
  email: string;
  company: string;
  stage: 'awareness' | 'consideration' | 'decision' | 'retention';
  lastInteraction: string;
  score: number;
  sources: {
    crm: boolean;
    analytics: boolean;
    email: boolean;
  };
  metrics: {
    visits: number;
    emailOpens: number;
    meetings: number;
    purchases: number;
  };
}

export interface DataSource {
  id: string;
  name: string;
  type: 'crm' | 'analytics' | 'email' | 'custom';
  status: 'connected' | 'disconnected' | 'error';
  lastSync: string;
  metrics: {
    dataPoints: number;
    refreshRate: string;
    errorRate: number;
  };
}

export interface Alert {
  id: string;
  type: 'insight' | 'warning' | 'opportunity';
  title: string;
  description: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  read: boolean;
}

export interface Query {
  id: string;
  text: string;
  timestamp: string;
  status: 'completed' | 'running' | 'error';
  result?: any;
}

export interface SystemMetrics {
  queryLatency: number;
  activeUsers: number;
  dataProcessed: number;
  uptime: number;
}