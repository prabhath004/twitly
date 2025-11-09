# Auto-Reply System

## Overview
Automatically monitor X (Twitter) and reply to relevant posts to promote your brand.

---

## Task 1: Database Schema ✅

### What was created

**5 new tables:**

1. **`monitored_tweets`** - Tweets we're tracking
   - Stores tweet details, author info
   - Relevance scoring (sentiment + engagement + content)
   - Status tracking (pending, replied, skipped)

2. **`reply_queue`** - Generated replies ready to post
   - AI-generated reply text
   - Safety checks
   - Status (queued, posting, posted, failed)

3. **`posted_replies`** - Successfully posted replies
   - Performance metrics (likes, retweets, replies, views)
   - Engagement rate tracking
   - Analytics data

4. **`user_interaction_history`** - Track who we've replied to
   - Prevents replying to same user multiple times
   - Cooldown period (default 24 hours)

5. **`reply_rate_limits`** - Hourly/daily rate limiting
   - Tracks replies per hour (default max: 5)
   - Tracks replies per day (default max: 20)

**Extended `brand_agent` table with new fields:**
- `auto_reply_enabled` - Enable/disable auto-replies
- `reply_keywords` - Keywords to monitor
- `monitored_hashtags` - Hashtags to track
- `max_replies_per_hour` - Configurable limit (default: 5)
- `max_replies_per_day` - Configurable limit (default: 20)
- `user_cooldown_hours` - Hours before replying to same user (default: 24)
- `min_relevance_score` - Minimum score to reply (default: 0.50)
- `reply_tone_preference` - 'helpful', 'conversational', 'promotional', 'mix'

---

## How to test Task 1

### Step 1: Run the SQL script
```bash
# Go to Supabase dashboard
# Navigate to: SQL Editor
# Copy contents from: CREATE_AUTO_REPLY_TABLES.sql
# Click "Run"
```

### Step 2: Verify tables were created
The script includes a verification query at the end. You should see:
```
monitored_tweets          | 18 columns
reply_queue              | 15 columns
posted_replies           | 19 columns
user_interaction_history | 7 columns
reply_rate_limits        | 8 columns
```

### Step 3: Check brand_agent columns
```sql
-- Run this in Supabase SQL Editor
SELECT 
    auto_reply_enabled,
    reply_keywords,
    monitored_hashtags,
    max_replies_per_hour,
    max_replies_per_day
FROM brand_agent
LIMIT 1;
```

### Step 4: Enable auto-reply for your brand
```sql
-- Update your brand to enable auto-replies
UPDATE brand_agent
SET 
    auto_reply_enabled = true,
    reply_keywords = ARRAY['productivity', 'AI', 'automation', 'workflow'],
    monitored_hashtags = ARRAY['#productivity', '#SaaS', '#AI'],
    max_replies_per_hour = 5,
    max_replies_per_day = 20,
    min_relevance_score = 0.50
WHERE id = 'YOUR_BRAND_ID_HERE';
```

---

## Database Schema Summary

### Flow
```
X Tweet → monitored_tweets → reply_queue → posted_replies
                ↓
        user_interaction_history (cooldown check)
                ↓
        reply_rate_limits (rate limit check)
```

### Relevance Scoring
```
relevance_score = (sentiment_score × 0.3) + (engagement_score × 0.3) + (content_score × 0.4)

Only reply if: relevance_score >= min_relevance_score (default 0.50)
```

### Rate Limiting
```
Checks before replying:
1. User cooldown (default: don't reply to same user for 24h)
2. Hourly limit (default: max 5 replies per hour)
3. Daily limit (default: max 20 replies per day)
```

---

## Next Tasks

- [ ] Task 2: Set up auto-replier service structure
- [ ] Task 3: Build tweet monitoring system
- [ ] Task 4: Implement relevance scoring AI
- [ ] Task 5: Build reply generation AI
- [ ] Task 6: Add safety checks
- [ ] Task 7: Implement rate limiting
- [ ] Task 8: Connect to Composio
- [ ] Task 9: Add test mode
- [ ] Task 10: Create dashboard UI
- [ ] Task 11: Add analytics
- [ ] Task 12: End-to-end testing

---

## Configuration Examples

### Conservative brand (low-risk)
```sql
max_replies_per_hour = 3
max_replies_per_day = 10
min_relevance_score = 0.70
reply_tone_preference = 'helpful'
```

### Aggressive brand (high-engagement)
```sql
max_replies_per_hour = 10
max_replies_per_day = 50
min_relevance_score = 0.40
reply_tone_preference = 'mix'
```

### Support-focused brand
```sql
max_replies_per_hour = 8
max_replies_per_day = 30
min_relevance_score = 0.50
reply_tone_preference = 'supportive'
```

---

## Notes

- All tables have RLS (Row Level Security) enabled
- Service role has full access (for backend)
- Users can only view their own brand's data
- Timestamps auto-update via triggers
- Foreign keys ensure data integrity
- Indexes optimize common queries

---

**Status: Task 1 Complete ✅**
**Next: Run SQL script in Supabase and verify**

