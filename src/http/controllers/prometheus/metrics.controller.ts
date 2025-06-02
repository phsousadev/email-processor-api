import { register } from '@/lib/metrics'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function prometheusMetrics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.header('Content-Type', register.contentType).status(201).send()
}
