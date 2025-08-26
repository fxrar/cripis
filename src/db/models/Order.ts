import mongoose, { Schema, Document } from 'mongoose';
import { OrderStatus } from '../../types/enums';

export interface OrderDoc extends Document {
  merchant: Schema.Types.ObjectId;
  coin: string;
  fiatCurrency: string;
  fiatAmount: number;
  cryptoAmount: string;
  merchantRef: string;
  customerRefundAddress?: string;
  address: string;
  status: OrderStatus;
  expiresAt: Date;
  txHash?: string;
}

const OrderSchema = new Schema<OrderDoc>({
  merchant: { type: Schema.Types.ObjectId, ref: 'Merchant', required: true },
  coin: String,
  fiatCurrency: String,
  fiatAmount: Number,
  cryptoAmount: String,
  merchantRef: String,
  customerRefundAddress: String,
  address: String,
  status: { type: String, enum: Object.values(OrderStatus), default: OrderStatus.CREATED },
  expiresAt: Date,
  txHash: String
}, { timestamps: true });

export default mongoose.model<OrderDoc>('Order', OrderSchema);
