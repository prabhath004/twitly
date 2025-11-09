# Essential Composio Functions for Auto-Reply System

Based on the Composio platform screenshots, here are the essential functions needed:

## READ Functions (Essential)

1. **Search recent tweets** ✅ (Currently using direct X API)
   - Function: `TWITTER_SEARCH_RECENT_TWEETS` or direct API
   - Purpose: Find tweets by keywords/hashtags
   - Status: Working via direct X API v2

2. **Get tweets by IDs** ✅ (Should use Composio)
   - Function: `TWITTER_GET_TWEETS_BY_IDS`
   - Purpose: Get full tweet details for scoring
   - Status: Can be improved to use Composio

3. **Look up post by id** ✅ (Should use Composio)
   - Function: `TWITTER_LOOKUP_POST_BY_ID`
   - Purpose: Get single tweet details
   - Status: Can be improved to use Composio

4. **Get mentions** ✅ (Currently using direct X API)
   - Function: Direct X API `/2/users/:id/mentions`
   - Purpose: Find @mentions of brand
   - Status: Working via direct X API v2

## REPLY/POST Functions (Essential)

1. **Create a post** ✅ (Currently using)
   - Function: `Action.TWITTER_POST_TWEET` or `TWITTER_CREATE_POST`
   - Purpose: Post replies
   - Status: Working via Composio

2. **Reply to a post** ⚠️ (Should check if available)
   - Function: `TWITTER_REPLY_TO_POST` (if exists)
   - Purpose: Reply directly to a tweet (better than creating new post)
   - Status: Need to verify if this exists in Composio

## Current Implementation

### Reading (monitor.py)
- Uses direct X API v2 calls (not Composio actions)
- This is fine, but could be improved to use Composio for consistency

### Posting (reply_poster.py)
- Uses `Action.TWITTER_POST_TWEET` via Composio
- This is correct, but should check if there's a specific "reply" action

## Recommendations

1. **Keep current read implementation** - Direct X API is working fine
2. **Verify reply action** - Check if Composio has `TWITTER_REPLY_TO_POST` or similar
3. **If reply action exists** - Update `reply_poster.py` to use it instead of `POST_TWEET`

