import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import orderService from '../../services/order.service';

const createOrderSchema = z.object({
  coin: z.string(),
  fiatCurrency: z.string(),
  fiatAmount: z.number().positive(),
  merchantRef: z.string(),
  customerRefundAddress: z.string().optional()
});

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = createOrderSchema.parse(req.body);
    const merchant = (req as any).merchant;
    const order = await orderService.createOrder(merchant, payload);
    res.json(order);
  } catch (err) {
    next(err);
  }
};
