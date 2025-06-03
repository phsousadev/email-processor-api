import { Prisma, EmailMessage, EmailStatus } from '@prisma/client'
import { EmailMessageRepository } from '../email-message-repository'
import { prisma } from '@/lib/prisma'

export class PrismaEmailMessageRepository implements EmailMessageRepository {
  async create(
    payload: Prisma.EmailMessageCreateInput,
  ): Promise<EmailMessage | null> {
    return await prisma.emailMessage.create({
      data: {
        attempts: 1,
        ...payload,
      },
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
    attempts?: number,
  ): Promise<EmailMessage | null> {
    try {
      return await prisma.emailMessage.update({
        where: { id: emailId },
        data: { status, attempts },
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

  async updateEmail(
    emailId: string,
    payload: Prisma.EmailMessageUpdateInput,
  ): Promise<EmailMessage | null> {
    return await prisma.emailMessage.update({
      where: {
        id: emailId,
      },
      data: payload,
    })
  }
}
