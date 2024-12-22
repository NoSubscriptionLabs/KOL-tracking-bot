import { TwitterApi } from 'twitter-api-v2';
import { validateTwitterConfig, twitterConfig } from './config.js';
import { logger } from '../../utils/logger.js';

class TwitterClient {
  constructor() {
    validateTwitterConfig();
    this.client = new TwitterApi(twitterConfig);
  }

  async tweet(content) {
    try {
      await this.client.v2.tweet(content);
      logger.info('Tweet posted successfully');
    } catch (error) {
      logger.error(`Failed to post tweet: ${error.message}`);
      throw error;
    }
  }

  async setupStream(rules, onTweet) {
    try {
      const stream = await this.client.v2.searchStream({
        'tweet.fields': ['created_at', 'text', 'author_id']
      });

      stream.on('data', onTweet);
      logger.info('Twitter stream setup successfully');
      
      return stream;
    } catch (error) {
      logger.error(`Failed to setup stream: ${error.message}`);
      throw error;
    }
  }
}

export const twitterClient = new TwitterClient();