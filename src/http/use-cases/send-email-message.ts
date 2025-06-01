import { emailProcessingQueue } from '@/infra/producers/email-producer'
import { EmailMessageRepository } from '@/repositories/email-message-repository'

interface ISendEmailMessageRequest {
  to: string
  subject: string
  body: string
}

export class SendEmailMessageUseCase {
  constructor(private emailMessageRepository: EmailMessageRepository) {}

  async execute({ to, subject, body }: ISendEmailMessageRequest) {
    const email = await this.emailMessageRepository.create({
      to,
      subject,
      body,
      status: 'SENT',
    })

    if (email?.id) await emailProcessingQueue(email.id)

    return {
      email,
    }
  }
}
