import { createClient } from '@supabase/supabase-js';
import { config } from '../config/config.js';
import { logger } from '../utils/logger.js';

class Database {
  constructor() {
    this.supabase = createClient(config.database.url, config.database.key);
  }

  async insertMention(mention) {
    try {
      const { data, error } = await this.supabase
        .from('mentions')
        .insert([{
          kol_id: mention.kol.id,
          token_id: mention.token.id,
          content: mention.content,
          sentiment_score: mention.sentiment.score,
          confidence: mention.sentiment.confidence,
          price_at_mention: mention.price,
          timestamp: mention.timestamp
        }]);

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error(`Database error inserting mention: ${error.message}`);
      throw error;
    }
  }

  async getTokenMentions(token) {
    try {
      const { data, error } = await this.supabase
        .from('mentions')
        .select(`
          *,
          kols (handle, trading_style, reliability)
        `)
        .eq('token_id', token.id)
        .order('timestamp', { ascending: true });

      if (error) throw error;
      return data;
    } catch (error) {
      logger.error(`Database error fetching mentions: ${error.message}`);
      throw error;
    }
  }

  async updateTokenMetrics(token, metrics) {
    try {
      const { error } = await this.supabase
        .from('tokens')
        .update({
          current_price: metrics.price,
          market_cap: metrics.marketCap,
          last_updated: metrics.timestamp
        })
        .eq('id', token.id);

      if (error) throw error;
    } catch (error) {
      logger.error(`Database error updating token metrics: ${error.message}`);
      throw error;
    }
  }
}

export const db = new Database();