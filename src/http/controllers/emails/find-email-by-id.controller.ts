import { FindEmailMessageByIdFactoryUseCase } from '@/http/use-cases/factories/find-email-message-by-id-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findEmailById(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findEmailByIdParamSchema = z.object({
    emailId: z.string(),
  })

  const { emailId } = findEmailByIdParamSchema.parse(request.params)

  const findEmailByIdUseCase = FindEmailMessageByIdFactoryUseCase()

  const email = await findEmailByIdUseCase.execute(emailId)

  return reply.status(200).send({
    email,
  })
}
