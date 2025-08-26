import mongoose, { Schema, Document } from 'mongoose';
import { RefundStatus } from '../../types/enums';

export interface RefundDoc extends Document {
  order: Schema.Types.ObjectId;
  amount: string;
  address: string;
  status: RefundStatus;
  txHash?: string;
}

const RefundSchema = new Schema<RefundDoc>({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: String,
  address: String,
  status: { type: String, enum: Object.values(RefundStatus), default: RefundStatus.PENDING },
  txHash: String
}, { timestamps: true });

export default mongoose.model<RefundDoc>('Refund', RefundSchema);
