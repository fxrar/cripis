import mongoose, { Schema, Document } from 'mongoose';

export interface AddressSubscriptionDoc extends Document {
  order: Schema.Types.ObjectId;
  address: string;
  subscriptionId: string;
}

const AddressSubscriptionSchema = new Schema<AddressSubscriptionDoc>({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  address: { type: String, required: true },
  subscriptionId: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<AddressSubscriptionDoc>('AddressSubscription', AddressSubscriptionSchema);
