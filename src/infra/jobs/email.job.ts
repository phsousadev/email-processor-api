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
        throw new Error(`[JOB]: email ${emailId} not found`)
      }

      console.log(
        `[JOB]: simulating sending email to: ${email.to} id: ${email.id}`,
      )

      const success = Math.random() < 0.8

      if (!success)
        console.log(
          `[JOB]: simulates sending failure to ${emailId}. sucess: ${success}`,
        )

      if (!success) {
        throw new Error('[JOB]: simulated failure to send')
      }

      await updateEmailMessageStatusUseCase.execute({
        emailId,
        status: 'SENT',
      })

      jobProcessed.labels('success').inc()

      console.log(
        `[JOB]: email: ${email.to} id:${emailId} processed successfully.`,
      )
    } catch (error) {
      await updateEmailMessageStatusUseCase.execute({
        emailId,
        status: 'FAILED',
      })

      jobProcessed.labels('failed').inc()

      console.error(`[JOB]: failed to process email ${emailId}`)
      throw error
    } finally {
      end({ status: 'completed' })
    }
  }
}
