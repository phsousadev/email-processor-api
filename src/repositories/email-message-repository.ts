import { EmailMessage, Prisma } from '@prisma/client'

export interface EmailMessageRepository {
  create(payload: Prisma.EmailMessageCreateInput): Promise<EmailMessage | null>
  findById(id: string): Promise<EmailMessage | null>
  listAll(): Promise<EmailMessage[] | []>
}
