import { Request, Response, NextFunction } from 'express';
import logger from '../../config/logger';

/**
 * Generic error handler.
 */
export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  logger.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Error' });
};
