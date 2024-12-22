import { KOL_LIST, TRACKING_SETTINGS } from '../config/constants.js';
import { db } from '../database/db.js';
import { logger } from '../utils/logger.js';

class TokenTracker {
  constructor() {
    this.trackedTokens = new Map();
  }

  async trackMention(kol, token, content, timestamp, price) {
    try {
      const mention = {
        kol,
        token,
        timestamp,
        price,
        content,
        sentiment: this.analyzeSentiment(content)
      };

      await db.insertMention(mention);
      this.updateTokenMetrics(token);
      
      return mention;
    } catch (error) {
      logger.error(`Failed to track mention: ${error.message}`);
      throw error;
    }
  }

  analyzeSentiment(content) {
    // Basic sentiment analysis
    const bullishTerms = ['bullish', 'moon', 'pump', 'long'];
    const bearishTerms = ['bearish', 'dump', 'short'];
    
    const bullishCount = bullishTerms.filter(term => 
      content.toLowerCase().includes(term)).length;
    const bearishCount = bearishTerms.filter(term => 
      content.toLowerCase().includes(term)).length;
    
    return {
      score: bullishCount - bearishCount,
      confidence: Math.min((bullishCount + bearishCount) / 5, 1)
    };
  }

  async getEarlyMentions(token) {
    const mentions = await db.getTokenMentions(token);
    return mentions
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(0, 5);
  }

  async updateTokenMetrics(token) {
    // Update price, volume, market cap
    const metrics = await this.fetchTokenMetrics(token);
    await db.updateTokenMetrics(token, metrics);
  }

  async fetchTokenMetrics(token) {
    // Implement API calls to get token metrics
    // This is a placeholder
    return {
      price: 0,
      volume24h: 0,
      marketCap: 0,
      timestamp: Date.now()
    };
  }
}

export const tokenTracker = new TokenTracker();