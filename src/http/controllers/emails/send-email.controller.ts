import { SendEmailMessageFactoryUseCase } from '@/http/use-cases/factories/send-email-message-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function sendEmail(request: FastifyRequest, reply: FastifyReply) {
  const sendEmailBodySchema = z.object({
    to: z
      .string()
      .email({ message: 'Destinatário deve ser um e-mail válido' })
      .max(320, { message: 'E-mail muito longo' }),

    subject: z
      .string()
      .min(1, { message: 'Assunto é obrigatório' })
      .max(255, { message: 'Assunto deve ter no máximo 255 caracteres' }),

    body: z
      .string()
      .min(1, { message: 'Corpo da mensagem é obrigatório' })
      .max(5000, { message: 'Corpo da mensagem muito longo' }),
  })

  const { to, subject, body } = sendEmailBodySchema.parse(request.body)

  const sendEmailUseCase = SendEmailMessageFactoryUseCase()

  await sendEmailUseCase.execute({
    to,
    subject,
    body,
  })

  return reply.status(201).send()
}
