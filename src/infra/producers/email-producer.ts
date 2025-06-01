import { emailQueue } from '../queues/bull-mq'

export async function emailProcessingQueue(emailId: string) {
  await emailQueue.add(
    'sendEmail',
    { emailId },
    {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
    },
  )
}
