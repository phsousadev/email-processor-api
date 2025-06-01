import { PrismaEmailMessageRepository } from '@/repositories/prisma/prisma-email-message-repository'
import { SendEmailMessageUseCase } from '../send-email-message'

export function EmailMessageFactoryUseCase() {
  const prismaEmailMessageRepository = new PrismaEmailMessageRepository()
  const sendEmailMessageUseCase = new SendEmailMessageUseCase(
    prismaEmailMessageRepository,
  )

  return sendEmailMessageUseCase
}
