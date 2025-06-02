import { PrismaEmailMessageRepository } from '@/repositories/prisma/prisma-email-message-repository'
import { FindEmailMessageByIdUseCase } from '../find-email-message-by-id'

export function FindEmailMessageByIdFactoryUseCase() {
  const prismaEmailMessageRepository = new PrismaEmailMessageRepository()
  const findEmailMessageByIdUseCase = new FindEmailMessageByIdUseCase(
    prismaEmailMessageRepository,
  )

  return findEmailMessageByIdUseCase
}
