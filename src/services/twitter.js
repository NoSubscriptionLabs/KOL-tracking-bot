import { TwitterApi } from 'twitter-api-v2';
import { config } from '../config/config.js';
import { logger } from '../utils/logger.js';

class TwitterService {
  constructor() {
    this.client = new TwitterApi({
      appKey: process.env.TWITTER_API_KEY,
      appSecret: process.env.TWITTER_API_SECRET,
      accessToken: process.env.TWITTER_ACCESS_TOKEN,
      accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });
  }

  async postAlphaAcknowledgement(token, kols, initialPrice) {
    const mainKol = kols[0];
    const tweet = this.formatAlphaTweet(token, mainKol, kols, initialPrice);
    
    try {
      await this.client.v2.tweet(tweet);
      logger.info(`Posted alpha acknowledgement for ${token}`);
    } catch (error) {
      logger.error(`Failed to post tweet: ${error.message}`);
      throw error;
    }
  }

  formatAlphaTweet(token, mainKol, kols, initialPrice) {
    if (mainKol.tradingStyle === 'short-term') {
      return `📊 ${mainKol.handle} spotted $${token} at $${initialPrice}
⚠️ Note: Known for short-term trades (usually <24h)
Other early eyes: ${kols.slice(1, 4).map(k => '@' + k.handle).join(', ')}
DYOR - Track the data 🔍`;
    }

    return `🎯 First 5 to spot $${token}:
${kols.slice(0, 5).map((k, i) => `${i + 1}. @${k.handle}`).join('\n')}
Initial price: $${initialPrice}
Real alpha comes early. 📈`;
  }

  async respondToQuery(token, kols, initialPrice) {
    const response = `Data check on $${token}:
First mention by @${kols[0].handle} at $${initialPrice}
Also early: ${kols.slice(1, 3).map(k => '@' + k.handle).join(', ')}
Always DYOR 🔍`;
    
    return response;
  }
}

export const twitterService = new TwitterService();