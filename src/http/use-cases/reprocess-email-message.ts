import { emailProcessingQueue } from '@/infra/producers/email-producer'
import { EmailMessageRepository } from '@/repositories/email-message-repository'

export class ReprocessEmailMessageUseCase {
  constructor(private emailMessageRepository: EmailMessageRepository) {}

  async execute(emailId: string) {
    const email = await this.emailMessageRepository.findById(emailId)

    if (!email) return null

    await emailProcessingQueue(email.id, true)

    const attemps = email.attempts + 1

    this.emailMessageRepository.updateStatus(emailId, 'PROCESSING', attemps)

    return {
      email,
    }
  }
}
