import { Prisma, EmailMessage, EmailStatus } from '@prisma/client'
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

  async updateStatus(
    emailId: string,
    status: EmailStatus,
  ): Promise<EmailMessage | null> {
    try {
      return await prisma.emailMessage.update({
        where: { id: emailId },
        data: { status },
      })
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        return null
      }
      throw error
    }
  }
}
