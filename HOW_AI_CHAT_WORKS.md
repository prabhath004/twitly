# 🤖 How AI Chat via iMessage Works

**Complete explanation of the AI chat integration**

---

## 📱 The Flow

```
You (iPhone/Mac) 
  ↓
Send iMessage: "generate post about productivity"
  ↓
iMessage Bridge (port 5173)
  ↓ Watches for new messages
  ↓ Forwards to webhook
  ↓
Approval Gateway (port 8000)
  ↓ Detects: "generate post" = AI chat request
  ↓ Looks up brand by iMessage ID
  ↓ Calls xAI (Grok) with brand context
  ↓ Gets AI response
  ↓
iMessage Bridge
  ↓ Sends response back
  ↓
You receive: "🤖 Here's a post about productivity..."
```

---

## 🔧 Components

### 1. **iMessage Bridge** (`imessage-bridge/`)
- **What it does:** Watches for incoming iMessages
- **How:** Uses `@photon-ai/imessage-kit` SDK
- **Port:** 5173
- **Key feature:** Forwards messages to webhook

### 2. **Approval Gateway** (`approval-gateway/`)
- **What it does:** Processes messages
- **Detects:**
  - Approval commands: `approve cr_xxx`
  - AI chat requests: `generate post about X`
- **Port:** 8000
- **Key features:**
  - Brand lookup from iMessage ID
  - AI chat via xAI (Grok)
  - Sends responses back

### 3. **Brand Lookup** (`approval-gateway/app/brand_lookup.py`)
- **What it does:** Finds your brand from iMessage ID
- **How:** Queries Supabase `brand_agent` table
- **Matches:** `owner_imessage` field = your iMessage ID

---

## 🎯 How Detection Works

### Approval Commands:
```python
"approve cr_abc123"  → Processes approval
"edit cr_abc123: new text"  → Edits and approves
"skip cr_abc123"  → Rejects
```

### AI Chat Requests:
```python
"generate post about X"  → Triggers AI chat
"create post about Y"  → Triggers AI chat
"help me write..."  → Triggers AI chat
"what should I post"  → Triggers AI chat
```

**Detection logic:**
- First tries to parse as approval command
- If not an approval command, checks if it's AI chat request
- Uses keyword matching: `generate post`, `create post`, `help me`, etc.

---

## 🧠 AI Chat Process

1. **User sends:** `"generate post about productivity"`

2. **System detects:** AI chat request (keyword: "generate post")

3. **Brand lookup:**
   ```python
   brand = get_brand_for_imessage("tejdeepp0909@gmail.com")
   # Returns brand from brand_agent table where owner_imessage matches
   ```

4. **AI call:**
   ```python
   ai_response = chat_with_ai(
       user_message="generate post about productivity",
       brand_info=brand,  # All brand context from database
       xai_api_key=settings.xai_api_key,
       xai_model="grok-3"
   )
   ```

5. **Response sent back:**
   ```python
   imsg_client.send_message(
       "tejdeepp0909@gmail.com",
       f"🤖 {ai_response}"
   )
   ```

---

## 📊 Brand Context Sent to AI

The AI receives **all** your brand info from the database:

- Brand name
- Description
- Products
- Communication style
- Personality
- Target market
- Content pillars
- Values
- And more!

**This makes responses on-brand automatically!**

---

## 🔄 Message Watching

**Automatic startup:**
- When Approval Gateway starts, it calls `/watch/start` on iMessage Bridge
- Sets webhook URL: `http://localhost:8000/webhooks/imessage`
- All incoming messages are forwarded to this webhook

**Manual startup (if needed):**
```bash
curl -X POST http://localhost:5173/watch/stop
curl -X POST http://localhost:5173/watch/start \
  -H "Content-Type: application/json" \
  -d '{
    "webhookUrl": "http://localhost:8000/webhooks/imessage"
  }'
```

---

## ⚙️ Configuration

### Required in `approval-gateway/.env`:

**Copy from `daily-poster/.env` (you already have these!):**

```bash
# xAI for AI Chat (same as daily-poster)
XAI_API_KEY=your_existing_xai_key
XAI_MODEL=grok-3

# Supabase for brand lookup (same as daily-poster)
SUPABASE_URL=your_existing_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_existing_service_role_key

# iMessage Bridge URL (already configured)
PHOTON_BASE_URL=http://localhost:5173
```

### Required in Database:

```sql
UPDATE brand_agent 
SET owner_imessage = 'tejdeepp0909@gmail.com'
WHERE id = 'your-brand-id';
```

---

## 🎬 Example Conversation

**You:** `"generate post about our new feature"`

**System:**
1. Detects AI chat request
2. Looks up brand (Airstitch)
3. Calls xAI with brand context
4. Gets response: `"Exciting news! We just launched [feature]..."`
5. Sends back: `"🤖 Exciting news! We just launched [feature]..."`

**You:** `"make it shorter"`

**System:**
1. Detects AI chat request (context-aware)
2. Uses same brand context
3. Generates shorter version
4. Sends back: `"🤖 Just launched [feature]! Try it now 🚀"`

---

## 🚨 Troubleshooting

### Messages not being forwarded
→ Check iMessage Bridge is watching:
```bash
curl http://localhost:5173/health
```

### "No brand found"
→ Set `owner_imessage` in database:
```sql
UPDATE brand_agent 
SET owner_imessage = 'tejdeepp0909@gmail.com' 
WHERE id = 'your-brand-id';
```

### "AI chat not configured"
→ Add `XAI_API_KEY` to `.env`

### Messages not arriving
→ Check Full Disk Access is granted
→ Restart Terminal after granting access

---

## ✨ Key Features

- ✅ **Natural language** - Just chat normally
- ✅ **Brand-aware** - Uses full brand context
- ✅ **Real-time** - Instant responses
- ✅ **Works everywhere** - iPhone, iPad, Mac
- ✅ **Smart routing** - Knows approval vs chat
- ✅ **Automatic watching** - Starts on gateway startup

---

## 🎯 Summary

**You can now:**
1. Send iMessages to yourself
2. Say things like "generate post about X"
3. Get AI-generated, brand-aware responses
4. All via iMessage - no app needed!

**The system:**
- Watches for messages automatically
- Detects what you want (approval vs chat)
- Uses your brand context
- Responds instantly

**It's like having an AI assistant in your Messages app!** 📱✨

