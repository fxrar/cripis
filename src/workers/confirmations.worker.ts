import { Worker } from 'bullmq';
import { createRedisClient } from '../services/redis.service';
import { QUEUES } from '../config/constants';
import logger from '../config/logger';

/**
 * Worker checking transaction confirmations.
 */
const worker = new Worker(QUEUES.CONFIRMATIONS, async (job) => {
  logger.info('Checking confirmations', { job: job.id });
  // Implement check logic here
}, { connection: createRedisClient() });

worker.on('failed', (job, err) => logger.error('Confirmation job failed', { jobId: job?.id, err }));

export default worker;
