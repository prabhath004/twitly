# 🤖 AI Chat via iMessage - Complete Guide

**Now you can chat with AI to generate posts directly from iMessage!**

---

## ✅ How It Works

1. **You send a message** to your iMessage (tejdeepp0909@gmail.com)
2. **iMessage Bridge** receives it and forwards to Approval Gateway
3. **Approval Gateway** detects if it's:
   - An **approval command** (approve/edit/skip) → processes approval
   - An **AI chat request** → generates post with AI
4. **AI response** comes back via iMessage

---

## 🎯 What You Can Say

### Generate Posts:
- `"generate post about productivity"`
- `"create post about AI"`
- `"write post about our new feature"`
- `"help me write a post about X"`

### Get Ideas:
- `"what should I post about?"`
- `"give me content ideas"`
- `"suggest a post"`

### Ask Questions:
- `"how should I respond to this?"`
- `"what's our brand voice?"`
- `"help me with social media"`

---

## 🔧 Setup Required

### 1. Add to `approval-gateway/.env`:

**Copy the same values from `daily-poster/.env`:**

```bash
# xAI for AI Chat (same as daily-poster)
XAI_API_KEY=your_existing_xai_key
XAI_MODEL=grok-3

# Supabase for brand lookup (same as daily-poster)
SUPABASE_URL=your_existing_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_existing_service_role_key
```

**You already have these in `daily-poster/.env` - just copy them!**

### 2. Update Brand in Database:

Make sure your brand has `owner_imessage` set:

```sql
UPDATE brand_agent 
SET owner_imessage = 'tejdeepp0909@gmail.com'
WHERE id = 'your-brand-id';
```

---

## 📱 How to Use

### Step 1: Start All Services

```bash
# Terminal 1: iMessage Bridge
cd imessage-bridge && npm run dev

# Terminal 2: Approval Gateway
cd approval-gateway && python3 -m uvicorn app.main:app --reload --port 8000

# Terminal 3: Daily Poster (if needed)
cd daily-poster && python3 -m uvicorn app.main:app --reload --port 8500
```

### Step 2: Send a Message

**From your iPhone/Mac/iPad Messages app:**

Send to: `tejdeepp0909@gmail.com` (or yourself)

Message: `"generate post about productivity"`

### Step 3: Get AI Response

You'll receive a response like:

```
🤖 Here's a post about productivity:

"Boost your productivity with AI-powered tools that automate repetitive tasks. Focus on what matters - creativity and strategy. 🚀 #Productivity #AI"
```

---

## 🎬 Example Conversation

**You:** `"generate post about our new feature"`

**AI:** `"🤖 Exciting news! We just launched [feature name] - making [benefit]. Try it now and see the difference! 🚀 #NewFeature"`

**You:** `"make it more casual"`

**AI:** `"🤖 Just dropped [feature]! It's pretty cool - [benefit]. Give it a spin! 🎉"`

---

## 🔍 How Brand Lookup Works

The system looks up your brand by matching:
- Your iMessage ID (`tejdeepp0909@gmail.com`)
- With `owner_imessage` field in `brand_agent` table

**If multiple brands match**, it uses the first active one.

**If no brand found**, you'll get a helpful message asking you to set `owner_imessage` in the database.

---

## 🚨 Troubleshooting

### "No brand found"
→ Set `owner_imessage` in your brand_agent table:
```sql
UPDATE brand_agent 
SET owner_imessage = 'tejdeepp0909@gmail.com' 
WHERE id = 'your-brand-id';
```

### "AI chat not configured"
→ Add `XAI_API_KEY` to `approval-gateway/.env`

### "Not receiving messages"
→ Check that:
1. iMessage Bridge is running
2. Message watching is started (auto-starts on approval gateway startup)
3. Full Disk Access is granted

### Messages not forwarding
→ Manually start watching:
```bash
curl -X POST http://localhost:5173/watch/start \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "http://localhost:8000/webhooks/imessage"
  }'
```

---

## ✨ Features

- ✅ **Natural language** - Just chat normally
- ✅ **Brand-aware** - Uses your brand context from database
- ✅ **Real-time** - Instant responses via iMessage
- ✅ **Works on all devices** - iPhone, iPad, Mac
- ✅ **Smart detection** - Knows when you want AI vs approval

---

## 🎯 Next Steps

1. ✅ Set up environment variables
2. ✅ Update brand `owner_imessage` in database
3. ✅ Start services
4. ✅ Test by sending a message!
5. ✅ Generate posts on the go! 🚀

---

**Ready to chat with AI? Just send a message to your iMessage!** 📱✨

