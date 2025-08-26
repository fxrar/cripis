import Refund from '../db/models/Refund';
import { queues } from './queue.service';
import { QUEUES } from '../config/constants';
import { RefundStatus } from '../types/enums';

/**
 * Queue refund for processing.
 */
export const createRefund = async (orderId: string, amount: string, address: string) => {
  const refund = await Refund.create({ order: orderId, amount, address, status: RefundStatus.PENDING });
  await queues[QUEUES.REFUND].add('refund', { refundId: refund._id });
  return refund;
};

/**
 * List refunds for given merchant.
 */
export const listRefunds = async (merchantId: string) => {
  return Refund.find()
    .populate({ path: 'order', match: { merchant: merchantId } })
    .lean();
};

export default { createRefund, listRefunds };
