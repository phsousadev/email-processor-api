import { Worker } from 'bullmq'
import { EmailJobProcessor } from '../jobs/email.job'
import { env } from '@/env'

const emailJobProcessor = new EmailJobProcessor()

export const worker = new Worker(
  'emailQueue',
  async (job) => {
    console.log(
      `[worker] Processing job ${job.id} in the queue ${job.queueName}`,
    )
    await emailJobProcessor.process(job)
  },
  {
    connection: { host: env.REDIS_HOST, port: env.REDIS_PORT },
  },
)
