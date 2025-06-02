import { FindEmailMessageByIdFactoryUseCase } from '@/http/use-cases/factories/find-email-message-by-id-factory'
import { UpdateEmailMessageStatusFactoryUseCase } from '@/http/use-cases/factories/update-email-message-status-factory'
import { jobDuration, jobProcessed } from '@/lib/metrics'
import { Job } from 'bullmq'

export class EmailJobProcessor {
  constructor() {}

  async process(job: Job): Promise<void> {
    const { emailId } = job.data

    const end = jobDuration.startTimer()

    const updateEmailMessageStatusUseCase =
      UpdateEmailMessageStatusFactoryUseCase()
    const findEmailMessageById = FindEmailMessageByIdFactoryUseCase()

    try {
      const { email } = await findEmailMessageById.execute(emailId)

      if (!email) {
        throw new Error(`[job]: email ${emailId} not found`)
      }

      console.log(
        `[job]: simulating sending email to: ${email.to} id: ${email.id}`,
      )

      const success = Math.random() < 0.8

      if (!success) {
        throw new Error('[job]: simulated failure to send')
      }

      await updateEmailMessageStatusUseCase.execute({
        emailId,
        status: 'SENT',
      })

      jobProcessed.labels('success').inc()

      console.log(
        `[job]: email: ${email.to} id:${emailId} processed successfully.`,
      )
    } catch (error) {
      await updateEmailMessageStatusUseCase.execute({
        emailId,
        status: 'FAILED',
      })

      jobProcessed.labels('failed').inc()

      console.error(`[job]: failed to process email ${emailId}`)
      throw error
    } finally {
      end({ status: 'completed' })
    }
  }
}
