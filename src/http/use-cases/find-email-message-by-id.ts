import { EmailMessageRepository } from '@/repositories/email-message-repository'

export class FindEmailMessageByIdUseCase {
  constructor(private emailMessageRepository: EmailMessageRepository) {}

  async execute(emailId: string) {
    const email = await this.emailMessageRepository.findById(emailId)

    return {
      email,
    }
  }
}
