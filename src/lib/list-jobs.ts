import { emailQueue } from '@/infra/queues/bull-mq'

async function listJobs() {
  const waiting = await emailQueue.getWaiting()
  const active = await emailQueue.getActive()
  const completed = await emailQueue.getCompleted()
  const failed = await emailQueue.getFailed()
  const delayed = await emailQueue.getDelayed()

  console.log('Waiting jobs:', waiting.length)
  console.log('Active jobs:', active.length)
  console.log('Completed jobs:', completed.length)
  console.log('Failed jobs:', failed.length)
  console.log('Delayed jobs:', delayed.length)
}

listJobs()
