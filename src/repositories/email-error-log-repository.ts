import { EmailErrorLog } from '@prisma/client'

export interface EmailErrorLogRepository {
  create(data: {
    emailMessageId: string
    errorMessage: string
  }): Promise<EmailErrorLog>
}
