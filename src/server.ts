import mongoose from 'mongoose';
import app from './app';
import env from './config/env';
import logger from './config/logger';
import { createRedisClient } from './services/redis.service';
import { initQueues } from './services/queue.service';

const start = async () => {
  try {
    await mongoose.connect(env.MONGODB_URI);
    logger.info('MongoDB connected');

    createRedisClient();
    initQueues();

    const port = parseInt(env.PORT, 10);
    app.listen(port, () => logger.info(`Server started on port ${port}`));
  } catch (err) {
    logger.error('Startup error', { err });
    process.exit(1);
  }
};

start();
