import { EmailMessageRepository } from '@/repositories/email-message-repository'
import { EmailStatus } from '@prisma/client'

interface IUpdateEmailMessageStatusRequest {
  emailId: string
  status: EmailStatus
}

export class UpdateEmailMessageStatusUseCase {
  constructor(private emailMessageRepository: EmailMessageRepository) {}

  async execute({ emailId, status }: IUpdateEmailMessageStatusRequest) {
    const email = await this.emailMessageRepository.updateStatus(
      emailId,
      status,
    )

    return {
      email,
    }
  }
}
