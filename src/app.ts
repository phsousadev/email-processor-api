import fastify from 'fastify'
import { routes } from './http/routes'

export const app = fastify({
  logger: {
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  },
})

app.register(routes)
