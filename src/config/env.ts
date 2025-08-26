import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3000'),
  MONGODB_URI: z.string(),
  REDIS_URL: z.string(),
  TATUM_API_KEY: z.string().optional(),
  CRYPTOAPIS_KEY: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  LOG_LEVEL: z.string().default('info')
});

const env = envSchema.parse(process.env);

export default env;
