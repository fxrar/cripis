import Order, { OrderDoc } from '../db/models/Order';
import AddressSubscription from '../db/models/AddressSubscription';
import { convertFiatToCrypto } from './rates.service';
import tatumService from './tatum.service';
import cryptoapisService from './cryptoapis.service';
import { ORDER_EXPIRY_MINUTES } from '../config/constants';
import { OrderStatus } from '../types/enums';
import logger from '../config/logger';

/**
 * Create a new order and subscribe to address.
 */
const createOrder = async (merchant: any, payload: any): Promise<OrderDoc> => {
  const { coin, fiatCurrency, fiatAmount, merchantRef, customerRefundAddress } = payload;
  const cryptoAmount = await convertFiatToCrypto(coin, fiatCurrency, fiatAmount);
  const address = await tatumService.deriveAddress(coin);
  const expiresAt = new Date(Date.now() + ORDER_EXPIRY_MINUTES * 60 * 1000);

  const order = await Order.create({
    merchant: merchant._id,
    coin,
    fiatCurrency,
    fiatAmount,
    cryptoAmount,
    merchantRef,
    customerRefundAddress,
    address,
    status: OrderStatus.ADDRESS_ASSIGNED,
    expiresAt
  });

  try {
    const subId = await cryptoapisService.subscribeAddress(coin, address, 'https://example.com/webhook');
    await AddressSubscription.create({ order: order._id, address, subscriptionId: subId });
  } catch (err) {
    logger.error('Failed to subscribe address', { err });
  }

  return order.toObject();
};

/**
 * Handle incoming transaction webhook.
 */
const handleIncomingTx = async (data: any) => {
  // parse data and update order status etc.
  logger.info('Incoming tx webhook', { data });
};

export default { createOrder, handleIncomingTx };
