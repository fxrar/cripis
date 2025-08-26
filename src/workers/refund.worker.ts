import { Worker } from 'bullmq';
import { createRedisClient } from '../services/redis.service';
import { QUEUES } from '../config/constants';
import logger from '../config/logger';

/**
 * Worker handling refunds.
 */
const worker = new Worker(QUEUES.REFUND, async (job) => {
  logger.info('Processing refund', { job: job.id });
  // Build and broadcast refund tx
}, { connection: createRedisClient() });

worker.on('failed', (job, err) => logger.error('Refund job failed', { jobId: job?.id, err }));

export default worker;
