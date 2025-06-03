import { PrismaEmailMessageRepository } from '@/repositories/prisma/prisma-email-message-repository'
import { ReprocessEmailMessageUseCase } from '../reprocess-email-message'
import { app } from '@/app'

export function ReprocessEmailMessageFactoryUseCase() {
  const prismaEmailMessageRepository = new PrismaEmailMessageRepository()
  const reprocessEmailMessageUseCase = new ReprocessEmailMessageUseCase(
    prismaEmailMessageRepository,
    app.log,
  )

  return reprocessEmailMessageUseCase
}
