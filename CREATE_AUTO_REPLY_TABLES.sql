-- Auto-Reply System Database Tables
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. MONITORED TWEETS
-- Stores tweets we're tracking for replies
-- ============================================
CREATE TABLE IF NOT EXISTS monitored_tweets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brand_agent(id) ON DELETE CASCADE,
    
    -- Tweet details
    tweet_id VARCHAR(255) NOT NULL UNIQUE,
    tweet_text TEXT NOT NULL,
    author_username VARCHAR(255),
    author_id VARCHAR(255),
    
    -- Classification
    trigger_type VARCHAR(50) NOT NULL, 
    -- Options: 'mention', 'keyword', 'hashtag', 'reply_to_brand'
    matched_keywords TEXT[], -- Array of matched keywords
    
    -- Metrics
    likes_count INTEGER DEFAULT 0,
    retweets_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    tweet_created_at TIMESTAMP,
    
    -- Relevance scoring
    relevance_score DECIMAL(3,2), -- 0.00 to 1.00
    sentiment VARCHAR(20), -- 'positive', 'neutral', 'negative', 'mixed'
    engagement_score DECIMAL(3,2),
    content_score DECIMAL(3,2),
    
    -- Status
    status VARCHAR(20) DEFAULT 'pending',
    -- Options: 'pending', 'replied', 'skipped', 'failed'
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Indexes for fast lookups
    CONSTRAINT unique_brand_tweet UNIQUE(brand_id, tweet_id)
);

CREATE INDEX idx_monitored_tweets_brand_status ON monitored_tweets(brand_id, status, created_at DESC);
CREATE INDEX idx_monitored_tweets_score ON monitored_tweets(relevance_score DESC, created_at DESC);
CREATE INDEX idx_monitored_tweets_tweet_id ON monitored_tweets(tweet_id);


-- ============================================
-- 2. REPLY QUEUE
-- Generated replies ready to be posted
-- ============================================
CREATE TABLE IF NOT EXISTS reply_queue (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brand_agent(id) ON DELETE CASCADE,
    monitored_tweet_id UUID REFERENCES monitored_tweets(id) ON DELETE CASCADE,
    
    -- Original tweet context
    original_tweet_id VARCHAR(255) NOT NULL,
    original_tweet_text TEXT NOT NULL,
    original_author VARCHAR(255),
    
    -- Generated reply
    reply_text TEXT NOT NULL,
    reply_tone VARCHAR(50), -- 'helpful', 'conversational', 'promotional', 'supportive'
    reply_type VARCHAR(50), -- 'answer', 'engage', 'promote', 'support'
    
    -- AI generation metadata
    generation_model VARCHAR(100),
    generation_prompt TEXT,
    confidence_score DECIMAL(3,2), -- AI confidence in reply quality
    
    -- Status
    status VARCHAR(20) DEFAULT 'queued',
    -- Options: 'queued', 'posting', 'posted', 'failed', 'cancelled'
    
    -- Safety checks
    safety_passed BOOLEAN DEFAULT true,
    safety_flags TEXT[], -- Any concerns flagged
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    posted_at TIMESTAMP,
    error_message TEXT
);

CREATE INDEX idx_reply_queue_brand_status ON reply_queue(brand_id, status, created_at);
CREATE INDEX idx_reply_queue_original_tweet ON reply_queue(original_tweet_id);


-- ============================================
-- 3. POSTED REPLIES
-- Successfully posted replies for analytics
-- ============================================
CREATE TABLE IF NOT EXISTS posted_replies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brand_agent(id) ON DELETE CASCADE,
    
    -- Tweet IDs
    reply_tweet_id VARCHAR(255) NOT NULL UNIQUE, -- Our reply tweet ID
    original_tweet_id VARCHAR(255) NOT NULL, -- Tweet we replied to
    
    -- Content
    reply_text TEXT NOT NULL,
    original_tweet_text TEXT NOT NULL,
    original_author VARCHAR(255),
    
    -- Classification
    reply_tone VARCHAR(50),
    reply_type VARCHAR(50),
    trigger_type VARCHAR(50),
    
    -- Performance metrics (updated periodically)
    likes_count INTEGER DEFAULT 0,
    retweets_count INTEGER DEFAULT 0,
    replies_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    
    -- Engagement rate
    engagement_rate DECIMAL(5,2), -- (likes + retweets + replies) / views * 100
    
    -- Context
    relevance_score DECIMAL(3,2),
    sentiment VARCHAR(20),
    
    -- Metadata
    posted_at TIMESTAMP DEFAULT NOW(),
    last_metrics_update TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_posted_replies_brand ON posted_replies(brand_id, posted_at DESC);
CREATE INDEX idx_posted_replies_original ON posted_replies(original_tweet_id);
CREATE INDEX idx_posted_replies_engagement ON posted_replies(engagement_rate DESC, posted_at DESC);


-- ============================================
-- 4. USER INTERACTION HISTORY
-- Track who we've replied to (for cooldown)
-- ============================================
CREATE TABLE IF NOT EXISTS user_interaction_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brand_agent(id) ON DELETE CASCADE,
    
    -- User details
    user_id VARCHAR(255) NOT NULL,
    username VARCHAR(255),
    
    -- Interaction tracking
    last_reply_at TIMESTAMP NOT NULL,
    total_replies INTEGER DEFAULT 1,
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint
    CONSTRAINT unique_brand_user UNIQUE(brand_id, user_id)
);

CREATE INDEX idx_user_history_brand_user ON user_interaction_history(brand_id, user_id);
CREATE INDEX idx_user_history_last_reply ON user_interaction_history(last_reply_at DESC);


-- ============================================
-- 5. REPLY RATE LIMITS
-- Track hourly/daily posting rates
-- ============================================
CREATE TABLE IF NOT EXISTS reply_rate_limits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brand_agent(id) ON DELETE CASCADE,
    
    -- Time window
    time_window VARCHAR(20) NOT NULL, -- 'hourly' or 'daily'
    window_start TIMESTAMP NOT NULL,
    window_end TIMESTAMP NOT NULL,
    
    -- Counts
    replies_count INTEGER DEFAULT 0,
    max_replies INTEGER NOT NULL, -- Configured limit
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Unique constraint
    CONSTRAINT unique_brand_window UNIQUE(brand_id, time_window, window_start)
);

CREATE INDEX idx_rate_limits_brand_window ON reply_rate_limits(brand_id, time_window, window_start DESC);


-- ============================================
-- 6. AUTO REPLY CONFIG (extend brand_agent)
-- Add reply-specific configuration to brand_agent
-- ============================================

-- Add new columns to brand_agent table
ALTER TABLE brand_agent 
ADD COLUMN IF NOT EXISTS auto_reply_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS reply_keywords TEXT[], -- Keywords to monitor beyond brand name
ADD COLUMN IF NOT EXISTS monitored_hashtags TEXT[], -- Hashtags to track
ADD COLUMN IF NOT EXISTS max_replies_per_hour INTEGER DEFAULT 5,
ADD COLUMN IF NOT EXISTS max_replies_per_day INTEGER DEFAULT 20,
ADD COLUMN IF NOT EXISTS user_cooldown_hours INTEGER DEFAULT 24,
ADD COLUMN IF NOT EXISTS min_relevance_score DECIMAL(3,2) DEFAULT 0.50,
ADD COLUMN IF NOT EXISTS reply_tone_preference VARCHAR(50) DEFAULT 'mix'; -- 'helpful', 'conversational', 'promotional', 'mix'


-- ============================================
-- TRIGGERS FOR UPDATED_AT
-- ============================================

-- monitored_tweets
CREATE OR REPLACE FUNCTION update_monitored_tweets_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_monitored_tweets_timestamp
    BEFORE UPDATE ON monitored_tweets
    FOR EACH ROW
    EXECUTE FUNCTION update_monitored_tweets_updated_at();

-- user_interaction_history
CREATE OR REPLACE FUNCTION update_user_history_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_history_timestamp
    BEFORE UPDATE ON user_interaction_history
    FOR EACH ROW
    EXECUTE FUNCTION update_user_history_updated_at();

-- reply_rate_limits
CREATE OR REPLACE FUNCTION update_rate_limits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_rate_limits_timestamp
    BEFORE UPDATE ON reply_rate_limits
    FOR EACH ROW
    EXECUTE FUNCTION update_rate_limits_updated_at();


-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE monitored_tweets ENABLE ROW LEVEL SECURITY;
ALTER TABLE reply_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE posted_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interaction_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE reply_rate_limits ENABLE ROW LEVEL SECURITY;

-- Policies for service role (full access)
CREATE POLICY "Service role full access on monitored_tweets"
ON monitored_tweets FOR ALL
USING (true);

CREATE POLICY "Service role full access on reply_queue"
ON reply_queue FOR ALL
USING (true);

CREATE POLICY "Service role full access on posted_replies"
ON posted_replies FOR ALL
USING (true);

CREATE POLICY "Service role full access on user_interaction_history"
ON user_interaction_history FOR ALL
USING (true);

CREATE POLICY "Service role full access on reply_rate_limits"
ON reply_rate_limits FOR ALL
USING (true);

-- Policies for users (read their own brand's data)
CREATE POLICY "Users can view their brand's monitored tweets"
ON monitored_tweets FOR SELECT
USING (
    brand_id IN (
        SELECT id FROM brand_agent WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can view their brand's reply queue"
ON reply_queue FOR SELECT
USING (
    brand_id IN (
        SELECT id FROM brand_agent WHERE user_id = auth.uid()
    )
);

CREATE POLICY "Users can view their brand's posted replies"
ON posted_replies FOR SELECT
USING (
    brand_id IN (
        SELECT id FROM brand_agent WHERE user_id = auth.uid()
    )
);


-- ============================================
-- DONE!
-- ============================================

-- Verify tables were created
SELECT 
    table_name,
    (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
AND table_name IN (
    'monitored_tweets',
    'reply_queue', 
    'posted_replies',
    'user_interaction_history',
    'reply_rate_limits'
)
ORDER BY table_name;

