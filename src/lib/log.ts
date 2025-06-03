import { FastifyBaseLogger } from 'fastify'

export function logJobEvent(
  logger: FastifyBaseLogger,
  jobId: string,
  event: string,
  status: string,
  attempt?: number,
  error?: string,
) {
  logger.info(
    {
      jobId,
      event,
      status,
      attempt,
      error,
    },
    `Job Event: ${event}`,
  )
}
