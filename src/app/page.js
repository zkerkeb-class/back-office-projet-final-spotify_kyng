'use client';
import MetricsDashboard from '@/components/partials/MetricDashboard';
import { getServerMetrics } from '@/services/metric.service';
import { useEffect, useState } from 'react';

export default function Home() {
  const [metrics, setMetrics] = useState(undefined);
  // Données historiques pour les graphiques
  const [history, setHistory] = useState(localStorage.getItem('history') ? JSON.parse(localStorage.getItem('history')) : {});


  function extractPercentage(serverOutput) {
    // Check if the output is "N/A"
    if (serverOutput === "N/A") {
      return null; // or you could return "N/A" or throw an error, depending on your needs
    }
  
    // Try to match the percentage
    const match = serverOutput.match(/(\d+)%/);
    
    // Return the percentage if found, otherwise return null
    return match ? match[1] : null;
  }
  const fetchMetrics = async () => {
    const metricsfromAPI = await getServerMetrics();
    console.log({ metricsfromAPI });
    const diskUsage = extractPercentage(metricsfromAPI.diskUsage);
    setMetrics({...metricsfromAPI, diskUsage});
  };
  useEffect(() => {
    fetchMetrics();
  }, []);

  useEffect(() => {
    // Mise à jour de l'historique des données
    if (!metrics) return;
    setHistory((prev) => {
      const newHistory = { ...prev };
      const timestamp = new Date().toISOString();

      Object.keys(metrics).forEach((key) => {
        if (!newHistory[key]) newHistory[key] = [];
        newHistory[key].push({
          timestamp,
          value: typeof metrics[key] === 'object' ? metrics[key].usedMemory : metrics[key],
        });
        // Garder seulement les 20 dernières valeurs
        if (newHistory[key].length > 20) newHistory[key].shift();
      });
console.log({newHistory});

      localStorage.setItem('history', JSON.stringify(newHistory));

      return newHistory;
    });
  }, [metrics]);

  if (!metrics) {
    return <div>Loading...</div>;
  }
 

  // const metrics = {
  //   dataTransferred: 500,
  //   cpuUsage: [0.68, 0.42, 0.26],
  //   freeMemory: 2000,
  //   usedMemory: 3000,
  //   totalMemory: 5000,
  //   dbQueryExecutionTime: 120,
  //   diskUsage: '80',
  //   successCount: 150,
  //   failureCount: 5,
  //   redisLatency: 15,
  //   mediaProcessingTime: 45,
  // };

  // const metricsfromAPI = {
  //   bandePassante: metrics.dataTransferred,
  //   cpuUsage: metrics.cpuUsage,
  //   memoryUsage: {
  //     freeMemory: metrics.freeMemory,
  //     usedMemory: metrics.usedMemory,
  //     totalMemory: metrics.totalMemory,
  //   },
  //   dbQueryExecutionTime: metrics.dbQueryExecutionTime,
  //   diskUsage: metrics.diskUsage,
  //   successCount: metrics.successCount,
  //   failureCount: metrics.failureCount,
  //   redisLatency: metrics.redisLatency,
  //   mediaProcessingTime: metrics.mediaProcessingTime,
  //   responseTime: 300,
  // };

  return (
    <div>
      <h1 className="text-3xl font-bold">Bienvenue sur le portail Spotify</h1>
      <p className="mt-4 text-gray-600">Gérez vos artistes, titres et médias facilement.</p>
      <MetricsDashboard metrics={metrics} history={history} />
    </div>
  );
}
