import { emailQueue } from '../queues/bull-mq'
import { FastifyBaseLogger } from 'fastify'

export async function emailProcessingQueue(
  emailId: string,
  logger: FastifyBaseLogger,
  reprocess = false,
) {
  if (reprocess) {
    logger.info({ emailId, reprocess }, '[APP]: Reprocessing email manually')
  } else {
    logger.info({ emailId }, '[APP]: Enqueuing email for processing')
  }

  await emailQueue.add(
    'sendEmail',
    { emailId },
    {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
    },
  )

  logger.info({ emailId, reprocess }, '[APP]: Email successfully enqueued')
}
