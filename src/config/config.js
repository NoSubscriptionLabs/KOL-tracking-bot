export const config = {
  twitter: {
    // Twitter API configuration will be loaded from environment variables
    rateLimits: {
      tweets: {
        daily: 1,
        hourly: 4
      }
    }
  },
  database: {
    // Using Supabase configuration from environment variables
    url: process.env.VITE_SUPABASE_URL,
    key: process.env.VITE_SUPABASE_ANON_KEY
  },
  tracking: {
    minMarketCap: 1000000, // $1M minimum
    maxTokenAge: '365d',
    updateInterval: '15m'
  }
};