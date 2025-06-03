import { describe, it, expect, vi, beforeEach } from 'vitest'
import { EmailMessageRepository } from '@/repositories/email-message-repository'
import { FindEmailMessageByIdUseCase } from './find-email-message-by-id'

describe('Find Email Message By Id Use Case', () => {
  let emailMessageRepository: EmailMessageRepository
  let findEmailMessageByIdUseCase: FindEmailMessageByIdUseCase

  beforeEach(() => {
    emailMessageRepository = {
      findById: vi.fn().mockResolvedValue({
        id: 'email-1',
        to: 'recipient@example.com',
        subject: 'Test Subject',
        body: 'Test Body',
        status: 'SENT',
      }),
    } as unknown as EmailMessageRepository

    findEmailMessageByIdUseCase = new FindEmailMessageByIdUseCase(
      emailMessageRepository,
    )
  })

  it('should find an email message by id', async () => {
    const result = await findEmailMessageByIdUseCase.execute('email-1')

    expect(emailMessageRepository.findById).toHaveBeenCalledWith('email-1')
    expect(result.email).toEqual({
      id: 'email-1',
      to: 'recipient@example.com',
      subject: 'Test Subject',
      body: 'Test Body',
      status: 'SENT',
    })
  })
})
