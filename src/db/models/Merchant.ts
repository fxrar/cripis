import mongoose, { Schema, Document } from 'mongoose';

export interface MerchantDoc extends Document {
  name: string;
  apiKey: string;
  payoutAddress: string;
  underpaymentThreshold: number;
  refundPolicy: 'auto' | 'manual';
}

const MerchantSchema = new Schema<MerchantDoc>({
  name: { type: String, required: true },
  apiKey: { type: String, required: true, unique: true },
  payoutAddress: { type: String, required: true },
  underpaymentThreshold: { type: Number, default: 0 },
  refundPolicy: { type: String, enum: ['auto', 'manual'], default: 'auto' }
});

export default mongoose.model<MerchantDoc>('Merchant', MerchantSchema);
