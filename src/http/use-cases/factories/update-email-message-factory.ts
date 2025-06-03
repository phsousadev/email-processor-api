import { PrismaEmailMessageRepository } from '@/repositories/prisma/prisma-email-message-repository'
import { UpdateEmailMessageUseCase } from '../update-email-message'

export function UpdateEmailMessageFactoryUseCase() {
  const prismaEmailMessageRepository = new PrismaEmailMessageRepository()
  const updateEmailmessageFactory = new UpdateEmailMessageUseCase(
    prismaEmailMessageRepository,
  )

  return updateEmailmessageFactory
}
