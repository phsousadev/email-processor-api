import { emailProcessingQueue } from '@/infra/producers/email-producer'
import { EmailMessageRepository } from '@/repositories/email-message-repository'
import { FastifyBaseLogger } from 'fastify'

export class ReprocessEmailMessageUseCase {
  constructor(
    private emailMessageRepository: EmailMessageRepository,
    private readonly logger: FastifyBaseLogger,
  ) {}

  async execute(emailId: string) {
    const email = await this.emailMessageRepository.findById(emailId)

    if (!email) return null

    await emailProcessingQueue(email.id, this.logger, true)

    const attemps = email.attempts + 1

    this.emailMessageRepository.updateStatus(emailId, 'PROCESSING', attemps)

    return {
      email,
    }
  }
}
