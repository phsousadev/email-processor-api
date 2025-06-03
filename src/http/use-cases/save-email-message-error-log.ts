import { EmailErrorLogRepository } from '@/repositories/email-error-log-repository'

interface IEmailMessageErrorLog {
  emailMessageId: string
  errorMessage: string
}

export class SaveEmailMessageErrorLogUseCase {
  constructor(private emailErrorLogRepository: EmailErrorLogRepository) {}

  async execute(data: IEmailMessageErrorLog) {
    const { emailMessageId, errorMessage } = data

    await this.emailErrorLogRepository.create({
      emailMessageId,
      errorMessage,
    })
  }
}
