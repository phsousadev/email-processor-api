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

    let statusLabel = 'success'

    try {
      const { email } = await findEmailMessageById.execute(emailId)

      if (!email) {
        const msg = `[JOB]: Email ${emailId} not found`
        this.logger.warn({ emailId, jobId: job.id }, msg)
        statusLabel = 'failed'
        throw new Error(msg)
      }

      this.logger.info(
        { emailId, jobId: job.id, to: email.to },
        '[JOB]: Simulating sending email',
      )

      const forceErrorEmailSubject = email.subject === 'forbidden subject'
      const success = forceErrorEmailSubject ? false : Math.random() < 0.8

      if (!success) {
        this.logger.warn(
          { emailId, jobId: job.id, success },
          '[JOB]: Simulated sending failure',
        )
        statusLabel = 'failed'
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

      this.logger.info(
        { emailId, jobId: job.id, to: email.to },
        '[JOB]: Email processed successfully',
      )
    } catch (error) {
      statusLabel = 'failed'

      await updateEmailMessageStatusUseCase.execute({
        emailId,
        status: 'FAILED',
      })

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
      jobProcessed.labels(statusLabel).inc()
      end({ status: statusLabel })

      this.logger.info({ emailId, jobId: job.id }, '[JOB]: Finished processing')
    }
  }
}
