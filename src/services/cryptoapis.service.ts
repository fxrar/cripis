import axios from 'axios';
import env from '../config/env';

/**
 * Subscribe to address notifications via CryptoAPIs.
 */
export const subscribeAddress = async (coin: string, address: string, callbackUrl: string): Promise<string> => {
  const resp = await axios.post(`https://rest.cryptoapis.io/v2/blockchain-events/${coin}/address`, {
    address,
    callbackUrl
  }, { headers: { 'x-api-key': env.CRYPTOAPIS_KEY } });
  return resp.data.data.id;
};

export default { subscribeAddress };
