-- Content Actions Table
-- Stores automated posting actions/goals for brands
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS content_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brand_agent(id) ON DELETE CASCADE,
    
    -- Action Details
    action_type VARCHAR(50) NOT NULL, 
    -- Options: 'announcement', 'engagement', 'excitement', 'promotion', 'education', 'community', 'metrics'
    
    title VARCHAR(255) NOT NULL,
    description TEXT,
    context TEXT, -- Additional details for AI to generate better content
    
    -- Execution Settings
    tone VARCHAR(50) DEFAULT 'engaging',
    -- Options: 'engaging', 'professional', 'casual', 'inspiring', 'humorous'
    
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    -- Options: 'pending', 'completed', 'paused'
    
    -- Result Tracking
    posted_at TIMESTAMP,
    tweet_id VARCHAR(255),
    tweet_url TEXT,
    post_text TEXT, -- Store the actual generated tweet
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Ordering (for manual reordering in UI - future feature)
    sort_order INTEGER DEFAULT 0
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_actions_brand_status 
ON content_actions(brand_id, status, created_at);

CREATE INDEX IF NOT EXISTS idx_actions_status 
ON content_actions(status, created_at);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_actions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_actions_timestamp
    BEFORE UPDATE ON content_actions
    FOR EACH ROWimage.png
    EXECUTE FUNCTION update_actions_updated_at();

-- Sample data for testing (optional)
INSERT INTO content_actions (brand_id, action_type, title, description, context, tone, status)
SELECT 
    id,
    'announcement',
    'Test Action - New Feature Launch',
    'Announce our amazing new AI-powered feature that saves users time',
    'AI analytics dashboard, real-time insights, saves 5 hours per week',
    'exciting',
    'pending'
FROM brand_agent 
WHERE is_active = true
LIMIT 1;

-- Verify
SELECT 
    id,
    action_type,
    title,
    status,
    created_at
FROM content_actions
ORDER BY created_at DESC;

