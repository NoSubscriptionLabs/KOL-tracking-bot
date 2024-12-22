import dotenv from 'dotenv';
import schedule from 'node-schedule';
import { twitterService } from './services/twitter.js';
import { tokenTracker } from './services/tokenTracker.js';
import { logger } from './utils/logger.js';

dotenv.config();

async function main() {
  logger.info('Starting Sunny Crypto Bot...');

  // Schedule daily alpha acknowledgement
  schedule.scheduleJob('0 12 * * *', async () => {
    try {
      const trendingTokens = await tokenTracker.getTrendingTokens();
      for (const token of trendingTokens) {
        const earlyMentions = await tokenTracker.getEarlyMentions(token.symbol);
        if (earlyMentions.length > 0) {
          await twitterService.postAlphaAcknowledgement(
            token.symbol,
            earlyMentions,
            token.initial_tracked_price
          );
          break; // Only post one per day
        }
      }
    } catch (error) {
      logger.error(`Daily acknowledgement failed: ${error.message}`);
    }
  });

  // Start monitoring tweets
  await startStreamingTweets();
}

async function startStreamingTweets() {
  try {
    const rules = [{
      value: KOL_LIST.map(kol => `from:${kol.handle}`).join(' OR '),
      tag: 'kol_tweets'
    }];

    const stream = await twitterService.client.v2.searchStream({
      'tweet.fields': ['created_at', 'text', 'author_id']
    });

    stream.on('data', async tweet => {
      try {
        await processTweet(tweet);
      } catch (error) {
        logger.error(`Error processing tweet: ${error.message}`);
      }
    });

  } catch (error) {
    logger.error(`Stream setup failed: ${error.message}`);
    setTimeout(startStreamingTweets, 60000); // Retry after 1 minute
  }
}

main().catch(error => {
  logger.error(`Application failed to start: ${error.message}`);
  process.exit(1);
});