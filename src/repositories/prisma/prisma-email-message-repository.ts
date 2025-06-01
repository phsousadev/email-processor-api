import { Prisma, EmailMessage } from '@prisma/client'
import { EmailMessageRepository } from '../email-message-repository'
import { prisma } from '@/lib/prisma'

export class PrismaEmailMessageRepository implements EmailMessageRepository {
  async create(
    payload: Prisma.EmailMessageCreateInput,
  ): Promise<EmailMessage | null> {
    return await prisma.emailMessage.create({
      data: payload,
    })
  }

  async findById(id: string): Promise<EmailMessage | null> {
    return await prisma.emailMessage.findUnique({
      where: {
        id,
      },
    })
  }

  async listAll(): Promise<EmailMessage[] | []> {
    return await prisma.emailMessage.findMany()
  }
}
