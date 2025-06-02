import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'dev:debug', 'uat', 'production']).default('dev'),
  PORT: z.coerce.number().default(3001),
  REDIS_PORT: z.coerce.number().default(6379),
  REDIS_HOST: z.string().default('localhost'),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(`Invalid environment variable`, _env.error.format())

  throw new Error(`Invalid environment variable.`)
}

export const env = _env.data
