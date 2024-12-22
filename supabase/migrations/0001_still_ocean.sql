CREATE TABLE IF NOT EXISTS kols (
  id INTEGER PRIMARY KEY,
  handle TEXT UNIQUE NOT NULL,
  trading_style TEXT,
  reliability REAL,
  avg_hold_time TEXT,
  notes TEXT
);

CREATE TABLE IF NOT EXISTS tokens (
  id INTEGER PRIMARY KEY,
  symbol TEXT UNIQUE NOT NULL,
  name TEXT,
  current_price REAL,
  initial_tracked_price REAL,
  market_cap REAL,
  created_at INTEGER,
  last_updated INTEGER
);

CREATE TABLE IF NOT EXISTS mentions (
  id INTEGER PRIMARY KEY,
  kol_id INTEGER,
  token_id INTEGER,
  content TEXT,
  sentiment_score REAL,
  confidence REAL,
  price_at_mention REAL,
  timestamp INTEGER,
  FOREIGN KEY (kol_id) REFERENCES kols(id),
  FOREIGN KEY (token_id) REFERENCES tokens(id)
);

CREATE INDEX IF NOT EXISTS idx_mentions_token_timestamp 
ON mentions(token_id, timestamp);