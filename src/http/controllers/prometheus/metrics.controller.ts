import { register } from '@/lib/metrics'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function prometheusMetrics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply
    .header('Content-Type', register.contentType)
    .status(200)
    .send(await register.metrics())
}
