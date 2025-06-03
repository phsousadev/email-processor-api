import { ReprocessEmailMessageFactoryUseCase } from '@/http/use-cases/factories/reprocess-email-message-factory'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function reprocessEmail(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const findEmailByIdParamSchema = z.object({
    emailId: z.string(),
  })

  const { emailId } = findEmailByIdParamSchema.parse(request.params)

  const reprocessemailUseCase = ReprocessEmailMessageFactoryUseCase()

  await reprocessemailUseCase.execute(emailId)

  return reply.status(200).send()
}
