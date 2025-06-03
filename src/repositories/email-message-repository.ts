import { EmailMessage, EmailStatus, Prisma } from '@prisma/client'

export interface EmailMessageRepository {
  create(payload: Prisma.EmailMessageCreateInput): Promise<EmailMessage | null>
  findById(emailId: string): Promise<EmailMessage | null>
  listAll(): Promise<EmailMessage[] | []>
  updateStatus(
    emailId: string,
    status: EmailStatus,
    attempts?: number,
  ): Promise<EmailMessage | null>
  updateEmail(
    emailId: string,
    payload: Prisma.EmailMessageUpdateInput,
  ): Promise<EmailMessage | null>
}
