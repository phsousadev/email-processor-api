import { Worker } from 'bullmq'
import { EmailJobProcessor } from '../jobs/email.job'
import { env } from '@/env'
import { app } from '@/app'

const emailJobProcessor = new EmailJobProcessor(app.log)

export const worker = new Worker(
  'emailQueue',
  async (job) => {
    app.log.info(
      { jobId: job.id, queue: job.queueName },
      '[WORKER]: Processing job',
    )

    try {
      await emailJobProcessor.process(job)
      app.log.info(
        { jobId: job.id, queue: job.queueName },
        '[WORKER]: Job processed successfully',
      )
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      app.log.error(
        { jobId: job.id, queue: job.queueName, error: errorMessage },
        '[WORKER]: Job processing failed',
      )
    }
  },
  {
    connection: { host: env.REDIS_HOST, port: env.REDIS_PORT },
  },
)

app.log.info('[WORKER]: Email worker is running and waiting for jobs...')
