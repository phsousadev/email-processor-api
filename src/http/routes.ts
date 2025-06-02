import { FastifyInstance } from 'fastify'
import { sendEmail } from './controllers/emails/send-email.controller'
import { prometheusMetrics } from './controllers/prometheus/metrics.controller'
import { findEmailById } from './controllers/emails/find-email-by-id.controller'

export async function routes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    reply.send({ message: `Hello World` })
  })

  // Emails
  app.post('/email', sendEmail)
  app.get('/email/:emailId', findEmailById)

  // Prometheus
  app.get('/metrics', prometheusMetrics)
}
