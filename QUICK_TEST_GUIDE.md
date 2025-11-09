# Quick Test Guide - Auto-Replies System

## 🚀 Quick Start Testing

### Step 1: Enable Auto-Replies for Your Brand

Run this SQL in Supabase (replace `YOUR_BRAND_ID`):

```sql
-- Enable auto-replies
UPDATE brand_agent
SET 
  auto_reply_enabled = true,
  reply_keywords = ARRAY['your product', 'your brand'],
  monitored_hashtags = ARRAY['#yourhashtag'],
  max_replies_per_hour = 5,
  max_replies_per_day = 20,
  min_relevance_score = 0.30
WHERE id = 'YOUR_BRAND_ID';

-- Verify it's enabled
SELECT id, brand_name, auto_reply_enabled, reply_keywords 
FROM brand_agent 
WHERE id = 'YOUR_BRAND_ID';
```

### Step 2: Enable Test Mode (Safe Testing)

```bash
# In auto-replier directory
export AUTO_REPLY_TEST_MODE=true

# Or add to .env
echo "AUTO_REPLY_TEST_MODE=true" >> auto-replier/.env
```

### Step 3: Test Each Step Manually

Replace `YOUR_BRAND_ID` with your actual brand ID:

```bash
# 1. Test Monitoring (fetch tweets)
curl -X POST "http://localhost:8600/monitor/YOUR_BRAND_ID"

# 2. Test Scoring (analyze tweets)
curl -X POST "http://localhost:8600/score/YOUR_BRAND_ID"

# 3. Test Reply Generation
curl -X POST "http://localhost:8600/generate-replies/YOUR_BRAND_ID"

# 4. Check Queue
curl "http://localhost:8600/reply-queue/YOUR_BRAND_ID"
```

### Step 4: View in Dashboard

1. Open: `http://localhost:3000/dashboard/auto-replies`
2. Select your project
3. Check the tabs:
   - **Queue** - See generated replies
   - **Posted** - See posted replies (empty in test mode)
   - **Analytics** - See statistics

### Step 5: Check Database

```sql
-- See monitored tweets
SELECT tweet_text, status, relevance_score 
FROM monitored_tweets 
WHERE brand_id = 'YOUR_BRAND_ID' 
ORDER BY created_at DESC 
LIMIT 10;

-- See reply queue
SELECT reply_text, status, original_tweet_text 
FROM reply_queue 
WHERE brand_id = 'YOUR_BRAND_ID' 
ORDER BY created_at DESC 
LIMIT 10;
```

---

## 🔍 What to Look For

### ✅ Working Correctly:
- Monitoring finds tweets
- Scoring assigns relevance scores
- Replies are generated
- Replies appear in queue
- Dashboard shows data

### ❌ Common Issues:
- **No tweets found**: Check keywords/hashtags
- **No replies generated**: Check relevance scores
- **Service not running**: Start auto-replier service
- **Dashboard empty**: Check brand_id matches

---

## 📊 Test Single Reply

Test with a custom tweet:

```bash
curl -X POST http://localhost:8600/test-reply \
  -H "Content-Type: application/json" \
  -d '{
    "brand_id": "YOUR_BRAND_ID",
    "tweet_text": "I love your product!",
    "tweet_id": "1234567890",
    "author_username": "test_user"
  }'
```

This shows:
- Relevance score
- Generated reply
- Whether it would post

---

## 🎯 Full Testing Workflow

1. **Enable test mode** ✅
2. **Enable auto-replies** in database ✅
3. **Set keywords/hashtags** ✅
4. **Run monitoring** → Check `monitored_tweets` table
5. **Run scoring** → Check `relevance_score` values
6. **Run generation** → Check `reply_queue` table
7. **View dashboard** → See everything in UI
8. **Disable test mode** → Actually post (when ready)

---

## 📝 Need Your Brand ID?

Run this to find it:

```sql
SELECT id, brand_name, auto_reply_enabled 
FROM brand_agent 
WHERE is_active = true;
```

