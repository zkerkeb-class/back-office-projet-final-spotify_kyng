import MetricsDashboard from '@/components/partials/MetricDashboard';

export default function Home() {
  const metrics = {
    dataTransferred: 500,
    cpuUsage: [0.68, 0.42, 0.26],
    freeMemory: 2000,
    usedMemory: 3000,
    totalMemory: 5000,
    dbQueryExecutionTime: 120,
    diskUsage: '80',
    successCount: 150,
    failureCount: 5,
    redisLatency: 15,
    mediaProcessingTime: 45,
  };

  const metricsfromAPI = {
    bandePassante: metrics.dataTransferred,
    cpuUsage: metrics.cpuUsage,
    memoryUsage: {
      freeMemory: metrics.freeMemory,
      usedMemory: metrics.usedMemory,
      totalMemory: metrics.totalMemory,
    },
    dbQueryExecutionTime: metrics.dbQueryExecutionTime,
    diskUsage: metrics.diskUsage,
    successCount: metrics.successCount,
    failureCount: metrics.failureCount,
    redisLatency: metrics.redisLatency,
    mediaProcessingTime: metrics.mediaProcessingTime,
    responseTime: 300,
  };
  console.log(metricsfromAPI);

  return (
    <div>
      <h1 className="text-3xl font-bold">Bienvenue sur le portail Spotify</h1>
      <p className="mt-4 text-gray-600">Gérez vos artistes, titres et médias facilement.</p>
      <MetricsDashboard metrics={metricsfromAPI} />
    </div>
  );
}
