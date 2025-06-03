import { PrismaEmailMessageRepository } from '@/repositories/prisma/prisma-email-message-repository'
import { ReprocessEmailMessageUseCase } from '../reprocess-email-message'

export function ReprocessEmailMessageFactoryUseCase() {
  const prismaEmailMessageRepository = new PrismaEmailMessageRepository()
  const reprocessEmailMessageUseCase = new ReprocessEmailMessageUseCase(
    prismaEmailMessageRepository,
  )

  return reprocessEmailMessageUseCase
}
