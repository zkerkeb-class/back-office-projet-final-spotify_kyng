"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Switch } from '@/components/ui/switch';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Activity, BarChart, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MetricsDashboard = ({ metrics, initialConfig }) => {
    const { toast } = useToast()
  // État pour les préférences utilisateur
  const [selectedKPIs, setSelectedKPIs] = useState(initialConfig?.kpis || [
    'cpu', 'memory', 'bandwidth', 'redis', 'requests', 'media'
  ]);
  
  const [thresholds, setThresholds] = useState(initialConfig?.thresholds || {
    cpu: 80,
    memory: metrics.memoryUsage.totalMemory,
    redis: 100,
    requests: 95
  });
  
  const [vizTypes, setVizTypes] = useState(initialConfig?.vizTypes || {
    cpu: 'gauge',
    memory: 'value',
    bandwidth: 'chart',
    redis: 'value',
    requests: 'gauge',
    media: 'chart'
  });

  // Données historiques pour les graphiques
  const [history, setHistory] = useState({});
  
  useEffect(() => {
    // Mise à jour de l'historique des données
    setHistory(prev => {
      const newHistory = { ...prev };
      const timestamp = new Date().toISOString();
      
      Object.keys(metrics).forEach(key => {
        if (!newHistory[key]) newHistory[key] = [];
        newHistory[key].push({ 
          timestamp,
          value: typeof metrics[key] === 'object' ? metrics[key].usedMemory : metrics[key]
        });
        // Garder seulement les 20 dernières valeurs
        if (newHistory[key].length > 20) newHistory[key].shift();
      });
      
      return newHistory;
    });
  }, [metrics]);

  // Formattage des données
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatPercentage = (value) => `${(value * 100).toFixed(1)}%`;

  // Composant pour une métrique
  const MetricCard = ({ title, value, thresholdValue, type, historyData }) => {
    const isOverThreshold = value > thresholdValue;
    
    const renderVisualization = () => {
      switch (type) {
        case 'gauge':
          return (
            <div className="w-full mt-2">
              <div className="bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${isOverThreshold ? 'bg-red-600' : 'bg-blue-600'}`}
                  style={{ width: `${Math.min(100, value * 100)}%` }}
                />
              </div>
              <div className="mt-1 text-sm text-gray-500">
                Threshold: {thresholdValue}%
              </div>
            </div>
          );
        case 'chart':
          return (
            <div className="h-32 mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="timestamp"
                    tick={false}
                  />
                  <YAxis />
                  <Tooltip 
                    labelFormatter={(label) => new Date(label).toLocaleTimeString()}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563eb"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          );
        default:
          return (
            <div className="text-2xl font-bold mt-2">
              {typeof value === 'number' ? formatPercentage(value) : value}
            </div>
          );
      }
    };

    return (
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {title}
            {isOverThreshold && (
              <AlertCircle className="inline-block ml-2 h-4 w-4 text-red-500" />
            )}
          </CardTitle>
          <Activity className="h-4 w-4 text-gray-500" />
        </CardHeader>
        <CardContent>
          {renderVisualization()}
        </CardContent>
      </Card>
    );
  };

  // Configuration des métriques
  const metricConfigs = {
    cpu: {
      title: "CPU Usage",
      getValue: () => metrics.cpuUsage[0] / 100,
    },
    memory: {
      title: "Memory Usage",
      getValue: () => metrics.memoryUsage.usedMemory / metrics.memoryUsage.totalMemory,
    },
    bandwidth: {
      title: "Bandwidth",
      getValue: () => formatBytes(metrics.bandePassante),
    },
    redis: {
      title: "Redis Latency",
      getValue: () => `${metrics.redisLatency}ms`,
    },
    requests: {
      title: "Request Success Rate",
      getValue: () => metrics.successCount / (metrics.successCount + metrics.failureCount),
    },
    media: {
      title: "Media Processing Time",
      getValue: () => `${metrics.mediaProcessingTime}ms`,
    },
  };

  // Gestion des notifications
  useEffect(() => {
    const checkThresholds = () => {
      Object.entries(thresholds).forEach(([metric, threshold]) => {
        const value = metricConfigs[metric].getValue();
        if (typeof value === 'number' && (value * 100) > threshold) {
            toast({
                title: `${metricConfigs[metric].title} is over threshold: ${formatPercentage(value)} > ${threshold}%`,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
      });
    };

    checkThresholds();
  }, [metrics, thresholds]);

return (
    <div className="p-4 space-y-4">
        {/* Panneau de configuration */}
        <Card className="mb-4">
            <CardHeader>
                <CardTitle>Configuration du tableau de bord</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(metricConfigs).map(([key, config]) => (
                        <div key={key} className="flex items-center justify-between">
                            <div>
                                <Switch
                                    checked={selectedKPIs.includes(key)}
                                    onCheckedChange={(checked) => {
                                        setSelectedKPIs(prev => 
                                            checked ? [...prev, key] : prev.filter(k => k !== key)
                                        );
                                    }}
                                />
                                <span className="ml-2">{config.title}</span>
                            </div>
                            <select
                                className="ml-2 p-1 border rounded"
                                value={vizTypes[key]}
                                onChange={(e) => setVizTypes(prev => ({
                                    ...prev,
                                    [key]: e.target.value
                                }))}
                            >
                                <option value="value">Valeur</option>
                                <option value="gauge">Jauge</option>
                                <option value="chart">Graphique</option>
                            </select>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        {/* Grille des métriques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedKPIs.map((kpiId) => {
                const config = metricConfigs[kpiId];
                const value = config.getValue();
                return (
                    <MetricCard
                        key={kpiId}
                        title={config.title}
                        value={value}
                        thresholdValue={thresholds[kpiId] || 100}
                        type={vizTypes[kpiId]}
                        historyData={history[kpiId]}
                    />
                );
            })}
        </div>

        {/* Alertes */}
        {Object.entries(thresholds).map(([metric, threshold]) => {
            const value = metricConfigs[metric].getValue();
            if (typeof value === 'number' && (value * 100) > threshold) {
                return (
                    <Alert key={metric} variant="destructive">
                        <AlertDescription>
                            {metricConfigs[metric].title} dépasse le seuil : {formatPercentage(value)} {'>'} {threshold}%
                        </AlertDescription>
                    </Alert>
                );
            }
            return null;
        })}
    </div>
);
};

export default MetricsDashboard;