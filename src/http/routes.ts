import { FastifyInstance } from 'fastify'
import { sendEmail } from './controllers/emails/send-email.controller'
import { prometheusMetrics } from './controllers/prometheus/metrics.controller'
import { findEmailById } from './controllers/emails/find-email-by-id.controller'
import { reprocessEmail } from './controllers/emails/reprocess-email-message.controller'
import { updateEmailMessage } from './controllers/emails/update-email.controller'

export async function routes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    reply.send({ message: `Hello World` })
  })

  // Emails
  app.post('/emails', sendEmail)
  app.get('/emails/:emailId', findEmailById)
  app.get('/emails/:emailId/reprocess', reprocessEmail)
  app.put('/emails/:emailId', updateEmailMessage)

  // Prometheus
  app.get('/metrics', prometheusMetrics)
}
