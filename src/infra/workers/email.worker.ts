import { Worker } from 'bullmq'
import { EmailJobProcessor } from '../jobs/email.job'
import { env } from '@/env'

const emailJobProcessor = new EmailJobProcessor()

export const worker = new Worker(
  'emailQueue',
  async (job) => {
    console.log(
      `[WORKER] Processing job ${job.id} in the queue ${job.queueName}`,
    )
    await emailJobProcessor.process(job)
  },
  {
    connection: { host: env.REDIS_HOST, port: env.REDIS_PORT },
  },
)

console.log('[WORKER] Email worker is running and waiting for jobs...')
