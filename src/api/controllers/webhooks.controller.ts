import { Request, Response, NextFunction } from 'express';
import orderService from '../../services/order.service';

/**
 * Handle CryptoAPIs webhook for address transactions.
 */
export const cryptoapisWebhook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.body;
    await orderService.handleIncomingTx(data);
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};
