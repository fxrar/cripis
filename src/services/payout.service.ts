import Payout from '../db/models/Payout';
import { queues } from './queue.service';
import { QUEUES } from '../config/constants';
import { PayoutStatus } from '../types/enums';

/**
 * Queue payout for processing.
 */
export const queuePayout = async (orderId: string, amount: string, to: string) => {
  await Payout.create({ order: orderId, amount, to, status: PayoutStatus.PENDING });
  await queues[QUEUES.PAYOUT].add('payout', { orderId });
};

export default { queuePayout };
