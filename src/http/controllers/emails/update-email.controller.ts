import { UpdateEmailMessageFactoryUseCase } from '@/http/use-cases/factories/update-email-message-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function updateEmailMessage(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const updateEmailMessageBodySchema = z.object({
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

  const findEmailByIdParamSchema = z.object({
    emailId: z.string(),
  })

  const { to, subject, body } = updateEmailMessageBodySchema.parse(request.body)
  const { emailId } = findEmailByIdParamSchema.parse(request.params)

  const updateEmailUseCase = UpdateEmailMessageFactoryUseCase()

  const emailUpdated = await updateEmailUseCase.execute({
    emailId,
    to,
    subject,
    body,
  })

  if (!emailUpdated)
    return reply.status(403).send({
      message:
        'You cannot update an email that has already been processed or is in process.',
    })

  return reply.status(200).send()
}
