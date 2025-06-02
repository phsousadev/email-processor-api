import { emailQueue } from '@/infra/queues/bull-mq'

async function listJobs() {
  const [waiting, active, completed, failed, delayed] = await Promise.all([
    emailQueue.getWaiting(),
    emailQueue.getActive(),
    emailQueue.getCompleted(),
    emailQueue.getFailed(),
    emailQueue.getDelayed(),
  ])

  console.clear()
  console.table([
    { status: 'Waiting', count: waiting.length },
    { status: 'Active', count: active.length },
    { status: 'Completed', count: completed.length },
    { status: 'Failed', count: failed.length },
    { status: 'Delayed', count: delayed.length },
  ])
}

setInterval(() => {
  listJobs().catch(console.error)
}, 2000)
