import AddressSubscription from '../db/models/AddressSubscription';

/**
 * Remove a subscription (placeholder).
 */
export const removeSubscription = async (_id: string) => {
  await AddressSubscription.deleteOne({ _id });
};

export default { removeSubscription };
