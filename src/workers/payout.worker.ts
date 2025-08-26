import { Worker } from 'bullmq';
import { createRedisClient } from '../services/redis.service';
import { QUEUES } from '../config/constants';
import logger from '../config/logger';

/**
 * Worker forwarding funds to merchant payout address.
 */
const worker = new Worker(QUEUES.PAYOUT, async (job) => {
  logger.info('Processing payout', { job: job.id });
  // Build and broadcast tx via Tatum
}, { connection: createRedisClient() });

worker.on('failed', (job, err) => logger.error('Payout job failed', { jobId: job?.id, err }));

export default worker;
