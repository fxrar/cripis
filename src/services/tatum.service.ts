import axios from 'axios';
import env from '../config/env';

/**
 * Derive a fresh address from Tatum.
 */
export const deriveAddress = async (coin: string): Promise<string> => {
  // Placeholder: real call would use Tatum's API
  const resp = await axios.post(`https://api.tatum.io/v3/${coin}/address`, {}, {
    headers: { 'x-api-key': env.TATUM_API_KEY }
  });
  return resp.data.address;
};

/**
 * Broadcast a raw transaction via Tatum.
 */
export const broadcastTx = async (coin: string, rawTx: string): Promise<string> => {
  const resp = await axios.post(`https://api.tatum.io/v3/${coin}/broadcast`, { txData: rawTx }, {
    headers: { 'x-api-key': env.TATUM_API_KEY }
  });
  return resp.data.txId;
};

export default { deriveAddress, broadcastTx };
