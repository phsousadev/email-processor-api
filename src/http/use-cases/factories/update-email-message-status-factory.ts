import { PrismaEmailMessageRepository } from '@/repositories/prisma/prisma-email-message-repository'
import { UpdateEmailMessageStatusUseCase } from '../update-email-message-status'

export function UpdateEmailMessageStatusFactoryUseCase() {
  const prismaEmailMessageRepository = new PrismaEmailMessageRepository()
  const sendEmailMessageUseCase = new UpdateEmailMessageStatusUseCase(
    prismaEmailMessageRepository,
  )

  return sendEmailMessageUseCase
}
