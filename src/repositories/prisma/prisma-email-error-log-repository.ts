import { EmailErrorLog } from '@prisma/client'
import { EmailErrorLogRepository } from '../email-error-log-repository'
import { prisma } from '@/lib/prisma'

export class PrismaEmailErrorLogRepository implements EmailErrorLogRepository {
  async create(data: {
    emailMessageId: string
    errorMessage: string
  }): Promise<EmailErrorLog> {
    const { emailMessageId, errorMessage } = data

    return await prisma.emailErrorLog.create({
      data: {
        emailMessage: { connect: { id: emailMessageId } },
        errorMessage,
      },
    })
  }
}
