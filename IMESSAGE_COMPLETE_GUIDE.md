# 📱 iMessage Approval & AI Chat - Complete Guide

**Control your X posting AND chat with AI - all via iMessage!**

---

## ✨ Features

### 1. **Approval Flow** ✅
- Get iMessage notifications for generated posts
- Approve, edit, or skip via simple commands
- Posts only with your permission

### 2. **AI Conversation** 🤖
- Chat with AI via iMessage
- Generate posts on-demand
- Get content ideas
- Edit and improve posts

### 3. **Multi-Platform** 🚀
- Post to X (Twitter)
- Post to Reddit (future)
- All from iMessage!

---

## 🚀 Quick Setup

### 1. Install Photon iMessage Kit

```bash
# Install globally
npm install -g photon-imessage-kit

# Start the sidecar
photon start --port 5173
```

### 2. Configure Environment

**`approval-gateway/.env`:**
```bash
# xAI for AI chat
XAI_API_KEY=your-xai-key

# Photon iMessage
PHOTON_BASE_URL=http://localhost:5173
PHOTON_TO=your-apple-id@icloud.com
```

**`daily-poster/.env`:**
```bash
# Enable approval mode
REQUIRE_APPROVAL=true
APPROVAL_GATEWAY_URL=http://localhost:8000
OWNER_IMESSAGE=your-apple-id@icloud.com
```

### 3. Start All Services

```bash
# Terminal 1: Photon
photon start --port 5173

# Terminal 2: Approval Gateway (with iMessage support)
cd approval-gateway
python -m uvicorn app.main:app --reload --port 8000

# Terminal 3: Daily Poster
cd daily-poster  
python -m uvicorn app.main:app --reload --port 8500

# Terminal 4: Frontend
npm run dev
```

---

## 💬 iMessage Commands

### Approval Commands:

```
approve post_123          → Post immediately to X
edit post_123: New text   → Post edited version
skip post_123             → Cancel this post
```

### AI Chat Commands:

```
generate post about productivity          → AI creates a post
create post about our new feature        → AI creates a post
help me write something about AI         → AI helps you
what should I post about today?          → AI gives ideas
suggest a post                           → AI generates content
```

---

## 🎯 Example Workflows

### Workflow 1: Approval Flow

```
1. You click "Generate & Post" in dashboard
   ↓
2. iMessage arrives:
   "🤖 Airstitch - New Post
   
    Post: Struggling with tasks? Airstitch helps...
    
    approve post_123"
   ↓
3. You reply: "approve post_123"
   ↓
4. System posts to X
   ↓
5. You get confirmation:
   "✅ Posted! https://twitter.com/i/web/status/..."
```

### Workflow 2: AI Conversation

```
1. You text: "generate post about productivity"
   ↓
2. AI responds:
   "🤖 Here's a post for you:
   
    'Struggling to stay productive? Here are 3 tips...'
    
    Want me to post this? Reply:
    approve post_456"
   ↓
3. You: "edit post_456: Make it shorter"
   ↓
4. AI: "Edited version:
   
    'Top 3 productivity tips...'
    
    approve post_456?"
   ↓
5. You: "approve post_456"
   ↓
6. ✅ Posted!
```

### Workflow 3: Quick Ideas

```
You: "What should I post about today?"
AI: "Based on your brand (Airstitch), here are 3 ideas:
     1. Productivity hack of the day
     2. Customer success story
     3. Behind-the-scenes of AI development
     
     Which interests you?"
     
You: "generate post about #1"
AI: "Here's a productivity post: ..."
```

---

## 🔧 Technical Flow

```
┌──────────────────────────────────────────────────────┐
│              USER SENDS IMESSAGE                     │
│     "generate post about productivity"               │
└────────────────┬─────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────────────┐
│            PHOTON IMESSAGE KIT                       │
│  - Receives message from Mac's iMessage              │
│  - Forwards to webhook                               │
│    POST /webhook/imessage-post                       │
└────────────────┬─────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────────────┐
│         APPROVAL GATEWAY (app/main.py)               │
│  1. Parse message                                    │
│  2. Detect: Command or AI chat?                      │
│     ├─ Command → Process approval                    │
│     └─ AI chat → Call xAI                            │
└────────────────┬─────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────────────┐
│              XAI (GROK API)                          │
│  - Generates post based on request                   │
│  - Returns AI-generated content                      │
└────────────────┬─────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────────────┐
│         SEND RESPONSE VIA IMESSAGE                   │
│  - Formats response                                  │
│  - Sends back via Photon                             │
│  - User receives AI-generated post                   │
└────────────────┬─────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────────────┐
│           USER APPROVES                              │
│     "approve post_123"                               │
└────────────────┬─────────────────────────────────────┘
                 ↓
┌──────────────────────────────────────────────────────┐
│      POST TO X VIA COMPOSIO                          │
│  - approval-gateway calls Composio API               │
│  - Tweet goes live on X                              │
│  - User gets confirmation                            │
└──────────────────────────────────────────────────────┘
```

---

## ⚙️ Configuration Options

### Mode 1: Always Require Approval

```bash
# daily-poster/.env
REQUIRE_APPROVAL=true
```

### Mode 2: Auto-Post (No Approval)

```bash
# daily-poster/.env
REQUIRE_APPROVAL=false
```

### Mode 3: Hybrid

- Daily posts: Auto-post
- Generated on-demand: Require approval
- Replies: Require approval

---

## 📱 Photon iMessage Kit Setup

### Configure Webhook in Photon:

```json
{
  "webhook_url": "http://localhost:8000/webhook/imessage-post",
  "events": ["message.received"]
}
```

### For Production (with ngrok):

```bash
# Start ngrok
ngrok http 8000

# Use ngrok URL in Photon config
{
  "webhook_url": "https://abc123.ngrok.io/webhook/imessage-post"
}
```

---

## 🎯 Advanced: Brand Mapping

Map iMessage sender to brand_id:

```python
# In approval-gateway/app/main.py

# Add this mapping
SENDER_TO_BRAND = {
    "user@icloud.com": "brand-uuid-1",
    "+1234567890": "brand-uuid-2"
}

# In webhook handler:
brand_id = SENDER_TO_BRAND.get(sender)
if brand_id:
    # Fetch actual brand info from Supabase
    # Use real brand data for AI
```

---

## ✅ Benefits

| Feature | Without Approval | With iMessage Approval |
|---------|-----------------|------------------------|
| Control | ❌ Auto-posts everything | ✅ You approve each post |
| Flexibility | ❌ No editing | ✅ Edit before posting |
| AI Help | ❌ Pre-scheduled only | ✅ Generate on-demand |
| Convenience | ✅ Fully automatic | ✅ Quick mobile approval |

---

## 🎉 You're Ready!

1. ✅ Approval Gateway has post approval endpoints
2. ✅ Daily Poster integrated with approval flow
3. ✅ AI chat support via iMessage
4. ✅ Full workflow implemented

Just:
1. Install Photon iMessage Kit
2. Set `REQUIRE_APPROVAL=true` (or false for auto)
3. Start all services
4. Test via iMessage!

---

## 🧪 Testing

### Test 1: Generate & Approve

```bash
# 1. Click "Generate & Post" in Activity Feed
# 2. Check iMessage - you'll get approval request
# 3. Reply: "approve post_xxx"
# 4. Check Twitter - it's live!
```

### Test 2: AI Chat

```
You (iMessage): "generate post about productivity tips"
AI (iMessage): "Here's a post:  'Boost productivity with these 3 simple habits...'
                approve post_789?"
You: "approve post_789"  
AI: "✅ Posted! Check Twitter"
```

### Test 3: Edit Flow

```
You: "generate post about our product"
AI: "Post: 'Check out Airstitch for...' approve post_456?"
You: "edit post_456: Try Airstitch free today!"
AI: "✅ Posted edited version!"
```

---

**Ready to test? Let me know if you want help setting up Photon!** 🚀

