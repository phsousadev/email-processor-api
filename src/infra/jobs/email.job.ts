import { FindEmailMessageByIdFactoryUseCase } from '@/http/use-cases/factories/find-email-message-by-id-factory'
import { SaveEmailMessageLogErrorFactory } from '@/http/use-cases/factories/save-email-message-error-log-factory'
import { UpdateEmailMessageStatusFactoryUseCase } from '@/http/use-cases/factories/update-email-message-status-factory'
import { jobDuration, jobProcessed } from '@/lib/metrics'
import { Job } from 'bullmq'
import { FastifyBaseLogger } from 'fastify'

export class EmailJobProcessor {
  constructor(private readonly logger: FastifyBaseLogger) {}

  async process(job: Job): Promise<void> {
    const { emailId } = job.data

    const end = jobDuration.startTimer()

    const updateEmailMessageStatusUseCase =
      UpdateEmailMessageStatusFactoryUseCase()
    const findEmailMessageById = FindEmailMessageByIdFactoryUseCase()

    this.logger.info({ emailId, jobId: job.id }, '[JOB]: Starting processing')

    try {
      const { email } = await findEmailMessageById.execute(emailId)

      if (!email) {
        const msg = `[JOB]: Email ${emailId} not found`
        this.logger.warn({ emailId, jobId: job.id }, msg)
        throw new Error(msg)
      }

      this.logger.info(
        { emailId, jobId: job.id, to: email.to },
        '[JOB]: Simulating sending email',
      )

      // Forcing a processing failure for testing purposes only
      const forceErrorEmailSubject = email.subject === 'forbidden subject'
      const success = forceErrorEmailSubject ? false : Math.random() < 0.8

      if (!success) {
        this.logger.warn(
          { emailId, jobId: job.id, success },
          '[JOB]: Simulated sending failure',
        )
        throw new Error(
          forceErrorEmailSubject
            ? '[JOB]: forbidden subject'
            : '[JOB]: simulated failure to send',
        )
      }

      await updateEmailMessageStatusUseCase.execute({
        emailId,
        status: 'SENT',
      })

      jobProcessed.labels('success').inc()

      this.logger.info(
        { emailId, jobId: job.id, to: email.to },
        '[JOB]: Email processed successfully',
      )
    } catch (error) {
      await updateEmailMessageStatusUseCase.execute({
        emailId,
        status: 'FAILED',
      })

      jobProcessed.labels('failed').inc()

      const saveEmailMessageLogErrorFactory = SaveEmailMessageLogErrorFactory()

      const errorMessage =
        error instanceof Error ? error.message : String(error)

      await saveEmailMessageLogErrorFactory.execute({
        emailMessageId: emailId,
        errorMessage,
      })

      this.logger.error(
        { emailId, jobId: job.id, error: errorMessage },
        '[JOB]: Failed to process email',
      )

      throw error
    } finally {
      end({ status: 'completed' })
      this.logger.info({ emailId, jobId: job.id }, '[JOB]: Finished processing')
    }
  }
}
