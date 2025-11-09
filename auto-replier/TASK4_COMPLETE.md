# Task 4 Complete: Relevance Scoring AI ✅

## What Was Built

### 1. **relevance_scoring.py** - Complete Scoring System
- ✅ `XAIClient` - Sentiment analysis using xAI/Grok
- ✅ `calculate_engagement_score()` - Engagement metrics scoring
- ✅ `calculate_content_score()` - Keyword/hashtag matching
- ✅ `calculate_sentiment_score()` - Sentiment to score conversion
- ✅ `score_tweet_relevance()` - Complete scoring function
- ✅ `score_pending_tweets()` - Score all pending tweets for a brand
- ✅ `score_all_pending_tweets()` - Score for all brands

### 2. **Scoring Formula**

```
Total Score = (Sentiment × 0.3) + (Engagement × 0.3) + (Content × 0.4)

Where:
- Sentiment Score: 0.0-1.0 (AI-powered, positive=high, negative=low)
- Engagement Score: 0.0-1.0 (based on likes, retweets, replies)
- Content Score: 0.0-1.0 (keyword/hashtag matching)

Threshold: Only reply if Total Score >= min_relevance_score (default: 0.50)
```

### 3. **Integration**
- ✅ Automatic scoring every 5 minutes (scheduler)
- ✅ Updates `monitored_tweets` table with scores
- ✅ Sets status: "replied" (relevant) or "skipped" (low score)
- ✅ Stores sentiment, engagement_score, content_score

### 4. **API Endpoints**
- ✅ `POST /score` - Score all pending tweets
- ✅ `POST /score/{brand_id}` - Score tweets for a brand

---

## How It Works

### Scoring Flow

```
1. Get pending tweets (status="pending")
   ↓
2. For each tweet:
   a. Analyze sentiment (xAI/Grok) → 0.0-1.0
   b. Calculate engagement score → 0.0-1.0
   c. Calculate content match → 0.0-1.0
   ↓
3. Combine with weights:
   Total = (Sentiment × 0.3) + (Engagement × 0.3) + (Content × 0.4)
   ↓
4. Compare to threshold (min_relevance_score)
   ↓
5. Update database:
   - relevance_score
   - sentiment
   - engagement_score
   - content_score
   - status: "replied" (if score >= threshold) or "skipped"
```

### Sentiment Analysis

Uses xAI/Grok to analyze tweet sentiment:
- **Positive**: Score 0.6-1.0 (high relevance)
- **Neutral**: Score 0.4-0.6 (medium relevance)
- **Negative**: Score 0.0-0.4 (low relevance, but might still reply if helpful)
- **Mixed**: Score 0.4-0.6 (medium relevance)

### Engagement Scoring

Based on likes, retweets, and replies:
- **High** (100+ likes): 0.8-1.0
- **Medium** (10-100 likes): 0.4-0.8
- **Low** (<10 likes): 0.0-0.4

Weighted calculation: `(likes × 1.0) + (retweets × 1.5) + (replies × 0.8)`

### Content Matching

Checks how well tweet matches brand keywords/hashtags:
- Exact keyword match: +1.0
- Hashtag match: +1.0
- Mention boost: +20% score

---

## Configuration

### Scoring Weights (in `app/config.py`)

```python
sentiment_weight = 0.3    # 30% weight
engagement_weight = 0.3   # 30% weight
content_weight = 0.4      # 40% weight (most important)
```

### Engagement Thresholds

```python
high_engagement_threshold = 100   # 100+ likes = high
medium_engagement_threshold = 10  # 10-100 = medium
```

### Per-Brand Threshold

```sql
UPDATE brand_agent
SET min_relevance_score = 0.60  -- Higher = more selective
WHERE id = 'YOUR_BRAND_ID';
```

---

## Testing

### 1. Score All Pending Tweets

```bash
curl -X POST http://localhost:8600/score
```

**Response:**
```json
{
  "success": true,
  "brands_scored": 2,
  "total_scored": 25,
  "total_relevant": 12,
  "results": [
    {
      "brand_id": "...",
      "tweets_scored": 15,
      "tweets_relevant": 8,
      "tweets_skipped": 7
    }
  ]
}
```

### 2. Score Tweets for Specific Brand

```bash
curl -X POST http://localhost:8600/score/YOUR_BRAND_ID
```

### 3. Check Scored Tweets

```sql
-- View relevant tweets (should reply)
SELECT 
    tweet_text,
    author_username,
    relevance_score,
    sentiment,
    engagement_score,
    content_score,
    status
FROM monitored_tweets
WHERE brand_id = 'YOUR_BRAND_ID'
AND status = 'replied'
ORDER BY relevance_score DESC
LIMIT 10;

-- View skipped tweets (low score)
SELECT 
    tweet_text,
    relevance_score,
    sentiment,
    status
FROM monitored_tweets
WHERE brand_id = 'YOUR_BRAND_ID'
AND status = 'skipped'
ORDER BY relevance_score DESC
LIMIT 10;
```

---

## Example Scores

### High Relevance Tweet (Score: 0.85)
- **Sentiment**: Positive (0.9)
- **Engagement**: High (0.8) - 150 likes, 20 retweets
- **Content**: Perfect match (1.0) - matches 3 keywords
- **Total**: (0.9 × 0.3) + (0.8 × 0.3) + (1.0 × 0.4) = **0.85** ✅

### Medium Relevance Tweet (Score: 0.55)
- **Sentiment**: Neutral (0.5)
- **Engagement**: Medium (0.6) - 25 likes, 3 retweets
- **Content**: Good match (0.7) - matches 2 keywords
- **Total**: (0.5 × 0.3) + (0.6 × 0.3) + (0.7 × 0.4) = **0.55** ✅

### Low Relevance Tweet (Score: 0.35)
- **Sentiment**: Negative (0.3)
- **Engagement**: Low (0.2) - 2 likes
- **Content**: Weak match (0.4) - matches 1 keyword
- **Total**: (0.3 × 0.3) + (0.2 × 0.3) + (0.4 × 0.4) = **0.35** ❌

---

## What's Next

- ✅ **Task 4 Complete** - Relevance scoring fully built
- ⏭️ **Task 5** - Build reply generation AI
- ⏭️ **Task 6** - Add safety checks
- ⏭️ **Task 7** - Implement rate limiting
- ⏭️ **Task 8** - Connect to Composio for posting

---

## Files Created/Modified

1. ✅ `auto-replier/app/relevance_scoring.py` - Complete scoring system (350+ lines)
2. ✅ `auto-replier/app/main.py` - Added scoring endpoints & scheduler job
3. ✅ `auto-replier/app/monitor.py` - Optional immediate scoring

---

## Notes

- Scoring runs automatically every 5 minutes
- Sentiment analysis uses xAI/Grok (requires XAI_API_KEY)
- If xAI not configured, defaults to neutral sentiment
- Tweets with score >= threshold are marked "replied" (ready for reply generation)
- Tweets below threshold are marked "skipped" (won't get replies)

---

## Scheduler Jobs

1. **Monitoring** - Every 10 minutes
   - Fetches new tweets
   - Saves to database (status: "pending")

2. **Scoring** - Every 5 minutes
   - Scores pending tweets
   - Updates with relevance scores
   - Sets status: "replied" or "skipped"

---

**Status: Task 4 Complete ✅**
**Ready for Task 5: Reply Generation AI**

