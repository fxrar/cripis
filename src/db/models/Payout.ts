import mongoose, { Schema, Document } from 'mongoose';
import { PayoutStatus } from '../../types/enums';

export interface PayoutDoc extends Document {
  order: Schema.Types.ObjectId;
  amount: string;
  to: string;
  status: PayoutStatus;
  txHash?: string;
}

const PayoutSchema = new Schema<PayoutDoc>({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: String,
  to: String,
  status: { type: String, enum: Object.values(PayoutStatus), default: PayoutStatus.PENDING },
  txHash: String
}, { timestamps: true });

export default mongoose.model<PayoutDoc>('Payout', PayoutSchema);
