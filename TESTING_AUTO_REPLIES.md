# Testing Auto-Replies System - Complete Guide

## Prerequisites

1. **Auto-Replier Service Running**
   ```bash
   cd /Applications/Cisco/twitly/auto-replier
   python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8600 --reload
   ```

2. **Next.js Dashboard Running**
   ```bash
   cd /Applications/Cisco/twitly
   npm run dev
   ```

3. **Database Tables Created**
   - Run `CREATE_AUTO_REPLY_TABLES.sql` in Supabase

---

## Step 1: Enable Auto-Replies for Your Brand

### Option A: Via SQL (Supabase)

```sql
-- Enable auto-replies for your brand
UPDATE brand_agent
SET 
  auto_reply_enabled = true,
  reply_keywords = ARRAY['your product', 'your brand', 'your feature'],
  monitored_hashtags = ARRAY['#yourhashtag'],
  max_replies_per_hour = 5,
  max_replies_per_day = 20,
  user_cooldown_hours = 24,
  min_relevance_score = 0.50
WHERE id = 'YOUR_BRAND_ID';
```

### Option B: Check Current Settings

```sql
-- Check if auto-reply is enabled
SELECT 
  id,
  brand_name,
  auto_reply_enabled,
  reply_keywords,
  monitored_hashtags,
  max_replies_per_hour,
  max_replies_per_day
FROM brand_agent
WHERE id = 'YOUR_BRAND_ID';
```

---

## Step 2: Enable Test Mode (Recommended First)

### Set Test Mode in Environment

```bash
# In auto-replier directory
export AUTO_REPLY_TEST_MODE=true

# Or add to .env file
echo "AUTO_REPLY_TEST_MODE=true" >> auto-replier/.env
```

### Or Toggle via API

```bash
# Check current test mode
curl http://localhost:8600/test-mode

# Enable test mode
curl -X POST http://localhost:8600/test-mode/toggle
```

**Test Mode Benefits:**
- ✅ Generates replies but doesn't post to X
- ✅ No risk of spamming
- ✅ See what replies would be generated
- ✅ Test the entire pipeline safely

---

## Step 3: Test the System Step by Step

### 3.1 Test Monitoring (Fetch Tweets)

```bash
# Manually trigger monitoring for your brand
curl -X POST "http://localhost:8600/monitor/YOUR_BRAND_ID"
```

**Check Results:**
```sql
-- See monitored tweets
SELECT 
  tweet_id,
  tweet_text,
  author_username,
  trigger_type,
  status,
  created_at
FROM monitored_tweets
WHERE brand_id = 'YOUR_BRAND_ID'
ORDER BY created_at DESC
LIMIT 10;
```

### 3.2 Test Relevance Scoring

```bash
# Manually trigger scoring
curl -X POST "http://localhost:8600/score/YOUR_BRAND_ID"
```

**Check Results:**
```sql
-- See scored tweets
SELECT 
  tweet_text,
  relevance_score,
  sentiment,
  engagement_score,
  content_score,
  status
FROM monitored_tweets
WHERE brand_id = 'YOUR_BRAND_ID'
AND status IN ('replied', 'skipped')
ORDER BY relevance_score DESC
LIMIT 10;
```

### 3.3 Test Reply Generation

```bash
# Manually trigger reply generation
curl -X POST "http://localhost:8600/generate-replies/YOUR_BRAND_ID"
```

**Check Results:**
```sql
-- See generated replies in queue
SELECT 
  reply_text,
  original_tweet_text,
  original_author,
  reply_tone,
  reply_type,
  status,
  safety_passed,
  created_at
FROM reply_queue
WHERE brand_id = 'YOUR_BRAND_ID'
ORDER BY created_at DESC
LIMIT 10;
```

### 3.4 Test Reply Posting (Only if NOT in test mode)

```bash
# Manually trigger posting
curl -X POST "http://localhost:8600/post-replies/YOUR_BRAND_ID"
```

**Check Results:**
```sql
-- See posted replies
SELECT 
  reply_text,
  original_tweet_text,
  original_author,
  reply_tweet_id,
  posted_at
FROM posted_replies
WHERE brand_id = 'YOUR_BRAND_ID'
ORDER BY posted_at DESC
LIMIT 10;
```

---

## Step 4: Test Single Reply Generation

### Test with a Custom Tweet

```bash
curl -X POST http://localhost:8600/test-reply \
  -H "Content-Type: application/json" \
  -d '{
    "brand_id": "YOUR_BRAND_ID",
    "tweet_text": "I love your product! It's amazing!",
    "tweet_id": "1234567890",
    "author_username": "test_user"
  }'
```

**Response shows:**
- Relevance score
- Generated reply
- Whether it would post
- Safety check results

---

## Step 5: Monitor via Dashboard

1. **Open Dashboard:**
   ```
   http://localhost:3000/dashboard/auto-replies
   ```

2. **Check Stats:**
   - Queued replies count
   - Posted replies count
   - Failed replies count
   - Success rate

3. **View Queue Tab:**
   - See all queued replies
   - Check status (queued/posting/posted/failed)
   - See error messages if any

4. **View Posted Tab:**
   - See successfully posted replies
   - View engagement metrics
   - Click links to view on X

5. **View Analytics Tab:**
   - Total engagement
   - System statistics

---

## Step 6: Check Service Logs

### Auto-Replier Service Logs

The service logs show:
- ✅ When monitoring runs
- ✅ How many tweets found
- ✅ Scoring results
- ✅ Reply generation
- ✅ Posting attempts
- ❌ Any errors

**Watch logs in real-time:**
```bash
# If running in terminal, you'll see logs directly
# Or check the log file if running in background
tail -f /tmp/auto-replier.log
```

---

## Step 7: Verify Everything is Working

### Checklist:

- [ ] Auto-replier service is running (port 8600)
- [ ] Brand has `auto_reply_enabled = true`
- [ ] Test mode enabled (for safe testing)
- [ ] Monitoring finds tweets
- [ ] Scoring assigns relevance scores
- [ ] Replies are generated
- [ ] Replies appear in queue
- [ ] Dashboard shows data
- [ ] No errors in logs

---

## Common Issues & Solutions

### Issue 1: No Tweets Being Monitored

**Check:**
- Is Twitter connected via Composio?
- Are keywords/hashtags set correctly?
- Is monitoring running? (check scheduler)

**Fix:**
```sql
-- Update keywords
UPDATE brand_agent
SET reply_keywords = ARRAY['your', 'keywords', 'here']
WHERE id = 'YOUR_BRAND_ID';
```

### Issue 2: Replies Not Generating

**Check:**
- Are tweets marked as "replied" status?
- Is relevance score high enough?
- Check `min_relevance_score` setting

**Fix:**
```sql
-- Lower relevance threshold
UPDATE brand_agent
SET min_relevance_score = 0.30
WHERE id = 'YOUR_BRAND_ID';
```

### Issue 3: Replies Not Posting

**Check:**
- Is test mode disabled?
- Are rate limits reached?
- Is Twitter connection active?

**Fix:**
```bash
# Disable test mode
curl -X POST http://localhost:8600/test-mode/toggle

# Check rate limits
curl http://localhost:8600/rate-limits/YOUR_BRAND_ID
```

### Issue 4: Dashboard Shows No Data

**Check:**
- Is a project selected?
- Does brand_id match?
- Are API endpoints working?

**Fix:**
```bash
# Test API directly
curl "http://localhost:3000/api/auto-replies/stats?brandId=YOUR_BRAND_ID"
```

---

## Quick Test Script

Save this as `test-auto-replies.sh`:

```bash
#!/bin/bash

BRAND_ID="YOUR_BRAND_ID"
BASE_URL="http://localhost:8600"

echo "🧪 Testing Auto-Replies System"
echo "================================"

# 1. Check service health
echo "1. Checking service health..."
curl -s "$BASE_URL/health" | python3 -m json.tool

# 2. Check test mode
echo -e "\n2. Checking test mode..."
curl -s "$BASE_URL/test-mode" | python3 -m json.tool

# 3. Trigger monitoring
echo -e "\n3. Triggering monitoring..."
curl -X POST "$BASE_URL/monitor/$BRAND_ID" | python3 -m json.tool

# 4. Trigger scoring
echo -e "\n4. Triggering scoring..."
curl -X POST "$BASE_URL/score/$BRAND_ID" | python3 -m json.tool

# 5. Trigger reply generation
echo -e "\n5. Triggering reply generation..."
curl -X POST "$BASE_URL/generate-replies/$BRAND_ID" | python3 -m json.tool

# 6. Check queue
echo -e "\n6. Checking reply queue..."
curl -s "$BASE_URL/reply-queue/$BRAND_ID" | python3 -m json.tool

# 7. Check rate limits
echo -e "\n7. Checking rate limits..."
curl -s "$BASE_URL/rate-limits/$BRAND_ID" | python3 -m json.tool

echo -e "\n✅ Test complete!"
```

Make it executable:
```bash
chmod +x test-auto-replies.sh
./test-auto-replies.sh
```

---

## Next Steps

1. **Start with Test Mode** - Enable test mode first
2. **Test Each Step** - Run monitoring, scoring, generation separately
3. **Check Dashboard** - Verify data appears in UI
4. **Review Logs** - Check for any errors
5. **Test Real Posting** - Disable test mode when ready
6. **Monitor Engagement** - Check analytics after posting

---

## Need Help?

- Check service logs for errors
- Verify database tables exist
- Ensure environment variables are set
- Check Composio connection status
- Review API responses for error messages

