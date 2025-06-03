import { EmailMessageRepository } from '@/repositories/email-message-repository'

interface IUpdateEmailMessageRequest {
  emailId: string
  to: string
  subject: string
  body: string
}

export class UpdateEmailMessageUseCase {
  constructor(private emailMessageRepository: EmailMessageRepository) {}

  async execute({ emailId, to, subject, body }: IUpdateEmailMessageRequest) {
    const email = await this.emailMessageRepository.findById(emailId)

    if (email?.status && email.status !== 'FAILED') return null

    const emailUpdated = await this.emailMessageRepository.updateEmail(
      emailId,
      {
        to,
        subject,
        body,
      },
    )

    return {
      emailUpdated,
    }
  }
}
