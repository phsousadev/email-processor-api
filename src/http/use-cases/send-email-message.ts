import { emailProcessingQueue } from '@/infra/producers/email-producer'
import { EmailMessageRepository } from '@/repositories/email-message-repository'
import { FastifyBaseLogger } from 'fastify'

interface ISendEmailMessageRequest {
  to: string
  subject: string
  body: string
}

export class SendEmailMessageUseCase {
  constructor(
    private emailMessageRepository: EmailMessageRepository,
    private readonly logger: FastifyBaseLogger,
  ) {}

  async execute({ to, subject, body }: ISendEmailMessageRequest) {
    const email = await this.emailMessageRepository.create({
      to,
      subject,
      body,
      status: 'PENDING',
    })

    if (email?.id) await emailProcessingQueue(email.id, this.logger)

    return {
      email,
    }
  }
}
