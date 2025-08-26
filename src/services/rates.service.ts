import axios from 'axios';

/**
 * Retrieve crypto amount for fiat amount using external rate API.
 */
export const convertFiatToCrypto = async (coin: string, fiatCurrency: string, fiatAmount: number): Promise<string> => {
  const res = await axios.get(`https://api.coinbase.com/v2/prices/${coin}-${fiatCurrency}/spot`);
  const rate = parseFloat(res.data.data.amount);
  const cryptoAmount = (fiatAmount / rate).toFixed(8);
  return cryptoAmount;
};

export default { convertFiatToCrypto };
