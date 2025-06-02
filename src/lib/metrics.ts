import client from 'prom-client'

const register = new client.Registry()

client.collectDefaultMetrics({
  register,
  prefix: 'nodejs_',
})

export const jobProcessed = new client.Counter({
  name: 'bullmq_jobs_processed_total',
  help: 'Total jobs processed',
  labelNames: ['status'],
})

export const jobDuration = new client.Histogram({
  name: 'bullmq_job_duration_seconds',
  help: 'Job duration in seconds',
  labelNames: ['status'],
})

register.registerMetric(jobProcessed)
register.registerMetric(jobDuration)

export { register }
