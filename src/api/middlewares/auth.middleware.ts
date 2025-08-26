import { Request, Response, NextFunction } from 'express';
import Merchant from '../../db/models/Merchant';
import logger from '../../config/logger';

/**
 * Merchant authentication using API key.
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey) {
    return res.status(401).json({ error: 'Missing API key' });
  }
  try {
    const merchant = await Merchant.findOne({ apiKey }).lean();
    if (!merchant) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
    (req as any).merchant = merchant;
    next();
  } catch (err) {
    logger.error('Auth error', { err });
    next(err);
  }
};
