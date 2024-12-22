export const KOL_LIST = [
  {
    handle: 'cryptolyxe',
    tradingStyle: 'short-term',
    reliability: 0.8,
    avgHoldTime: '24h',
    notes: 'Known for quick trades, rarely posts exits'
  }
  // Add more KOLs here
];

export const TRACKING_SETTINGS = {
  minMarketCap: 1000000, // $1M minimum market cap
  maxAge: '365d', // Track tokens less than 1 year old
  updateInterval: '15m',
  tweetLimit: {
    daily: 1,
    hourly: 4 // For responses
  }
};

export const EXCHANGES = {
  DEX: ['uniswap', 'pancakeswap', 'raydium'],
  CEX: ['binance', 'coinbase', 'kraken']
};