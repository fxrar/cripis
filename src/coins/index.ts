import { CoinPlugin } from './types';
import ltc from './ltc.plugin';

const registry: Record<string, CoinPlugin> = {
  ltc
};

export default registry;
