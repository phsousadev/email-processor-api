import { FastifyInstance } from 'fastify'
import { sendEmail } from './controllers/emails/send-email.controller'

export async function routes(app: FastifyInstance) {
  app.get('/', async (request, reply) => {
    reply.send({ message: `Hello World` })
  })

  // Emails
  app.post('/email', sendEmail)
}
