# Auto-Replier Service

Automatically monitor X (Twitter) and reply to relevant posts to promote your brand.

## Overview

This service:
- Monitors X for mentions, keywords, and hashtags
- Scores tweets for relevance (sentiment + engagement + content)
- Generates brand-voice replies using AI
- Posts replies automatically (with rate limiting & safety checks)
- Tracks performance and engagement

## Setup

### 1. Install dependencies

```bash
cd auto-replier
python -m venv venv
source venv/bin/activate  # On Mac/Linux
# OR
venv\Scripts\activate  # On Windows

pip install -r requirements.txt
```

### 2. Environment variables

Make sure these are set in your `.env` file (in the root project):

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# xAI (Grok)
XAI_API_KEY=your_xai_api_key

# Composio (Twitter)
COMPOSIO_API_KEY=your_composio_key

# Optional: Test mode
AUTO_REPLY_TEST_MODE=false  # Set to 'true' to generate but not post
```

### 3. Run the service

```bash
# From the auto-replier directory
python -m uvicorn app.main:app --host 0.0.0.0 --port 8600 --reload
```

Or use the shortcut:

```bash
python app/main.py
```

## API Endpoints

### Health & Status

- `GET /` - Service info
- `GET /health` - Health check
- `GET /config` - Current configuration

### Brands

- `GET /brands` - List all brands with auto-reply enabled
- `GET /brands/{brand_id}` - Get brand configuration
- `GET /brands/{brand_id}/stats` - Get reply statistics

### Monitoring (TODO: Implement in Tasks 3-9)

- `POST /monitor` - Manually trigger monitoring
- `POST /test-reply` - Test reply generation without posting

### Debug

- `GET /debug/tables` - Check database tables

## Testing

### 1. Check service is running

```bash
curl http://localhost:8600/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "auto-replier",
  "version": "0.1.0",
  "test_mode": false,
  "brands_enabled": 1,
  "timestamp": "2025-11-09T..."
}
```

### 2. List enabled brands

```bash
curl http://localhost:8600/brands
```

### 3. Get brand configuration

```bash
curl http://localhost:8600/brands/YOUR_BRAND_ID
```

### 4. Check database tables

```bash
curl http://localhost:8600/debug/tables
```

## Configuration

All settings are in `app/config.py`. Key settings:

- `monitor_interval_minutes` - How often to check for new tweets (default: 10)
- `default_max_replies_per_hour` - Max replies per hour (default: 5)
- `default_max_replies_per_day` - Max replies per day (default: 20)
- `default_min_relevance_score` - Minimum score to reply (default: 0.50)
- `test_mode` - Generate but don't post (default: false)

## Next Steps

- [ ] Task 3: Build tweet monitoring system
- [ ] Task 4: Implement relevance scoring
- [ ] Task 5: Build reply generation AI
- [ ] Task 6: Add safety checks
- [ ] Task 7: Implement rate limiting
- [ ] Task 8: Connect to Composio
- [ ] Task 9: Add test mode
- [ ] Task 10: Create dashboard UI
- [ ] Task 11: Add analytics
- [ ] Task 12: End-to-end testing

## Architecture

```
auto-replier/
├── app/
│   ├── __init__.py       # Package init
│   ├── main.py           # FastAPI app
│   ├── config.py         # Configuration
│   ├── database.py       # Supabase helpers
│   └── models.py         # Pydantic models
├── requirements.txt      # Dependencies
└── README.md             # This file
```

## Port

Service runs on port **8600** (to avoid conflicts with other services).

