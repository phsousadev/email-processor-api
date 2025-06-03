import { PrismaEmailErrorLogRepository } from '@/repositories/prisma/prisma-email-error-log-repository'
import { SaveEmailMessageErrorLogUseCase } from '../save-email-message-error-log'

export function SaveEmailMessageLogErrorFactory() {
  const prismaEmailErrorLogRepository = new PrismaEmailErrorLogRepository()
  const saveEmailMessageErrorLogUseCase = new SaveEmailMessageErrorLogUseCase(
    prismaEmailErrorLogRepository,
  )

  return saveEmailMessageErrorLogUseCase
}
