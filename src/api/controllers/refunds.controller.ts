import { Request, Response, NextFunction } from 'express';
import refundService from '../../services/refund.service';

/**
 * List merchant refunds.
 */
export const listRefunds = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const merchant = (req as any).merchant;
    const refunds = await refundService.listRefunds(merchant._id);
    res.json(refunds);
  } catch (err) {
    next(err);
  }
};
