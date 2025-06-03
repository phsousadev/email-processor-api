import { emailQueue } from '../queues/bull-mq'

export async function emailProcessingQueue(
  emailId: string,
  reprocess?: boolean,
) {
  if (reprocess) console.log(`[APP]: reprocessing email manually: ${emailId}`)

  await emailQueue.add(
    'sendEmail',
    { emailId },
    {
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
    },
  )
}
