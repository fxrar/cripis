export interface CoinPlugin {
  symbol: string;
  deriveAddress(xpub: string): Promise<string>;
  buildPayoutTx(from: string, to: string, amount: string): Promise<string>;
}
