import { twitterClient } from './client.js';
import { formatAlphaTweet, formatQueryResponse } from './formatters.js';
import { logger } from '../../utils/logger.js';

class TwitterService {
  constructor() {
    this.client = twitterClient;
  }

  async postAlphaAcknowledgement(token, kols, initialPrice) {
    const mainKol = kols[0];
    const tweet = formatAlphaTweet(token, mainKol, kols, initialPrice);
    
    try {
      await this.client.tweet(tweet);
      logger.info(`Posted alpha acknowledgement for ${token}`);
    } catch (error) {
      logger.error(`Failed to post tweet: ${error.message}`);
      throw error;
    }
  }

  async respondToQuery(token, kols, initialPrice) {
    return formatQueryResponse(token, kols, initialPrice);
  }
}

export const twitterService = new TwitterService();