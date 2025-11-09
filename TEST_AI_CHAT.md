# 🧪 Test AI Chat via iMessage - Step by Step

**Complete testing guide to verify everything works!**

---

## ✅ Prerequisites Checklist

Before testing, make sure:

- [ ] **Full Disk Access** granted to Terminal
- [ ] **Environment variables** added to `approval-gateway/.env`:
  - `XAI_API_KEY`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
- [ ] **Database updated** with `owner_imessage = 'tejdeepp0909@gmail.com'`
- [ ] **Supabase package installed**: `pip install supabase==2.10.0`

---

## 🚀 Step 1: Start All Services

**Open 4 terminals and run these:**

### Terminal 1: iMessage Bridge
```bash
cd /Users/tejdeeppathipati/Desktop/twitly/imessage-bridge
npm run dev
```

**Wait for:** `✅ Running on: http://localhost:5173`

### Terminal 2: Approval Gateway
```bash
cd /Users/tejdeeppathipati/Desktop/twitly/approval-gateway
python3 -m uvicorn app.main:app --reload --port 8000
```

**Wait for:** 
- `✅ iMessage watching started (webhook: http://localhost:8000/webhooks/imessage)`
- `Server ready on port 8000`

### Terminal 3: Daily Poster (optional, but good to have)
```bash
cd /Users/tejdeeppathipati/Desktop/twitly/daily-poster
python3 -m uvicorn app.main:app --reload --port 8500
```

### Terminal 4: Frontend (optional)
```bash
cd /Users/tejdeeppathipati/Desktop/twitly
npm run dev
```

---

## 🧪 Step 2: Verify Services Are Running

**In a new terminal, run:**

```bash
# Check iMessage Bridge
curl http://localhost:5173/health

# Check Approval Gateway
curl http://localhost:8000/

# Check if watching is active (should show webhook URL)
curl http://localhost:5173/health
```

**Expected responses:**
- iMessage Bridge: `{"status":"ok",...}`
- Approval Gateway: `{"service":"brandpilot-approval-gateway",...}`

---

## 📱 Step 3: Test Sending a Message

### Option A: Send from Your iPhone/Mac Messages App

1. **Open Messages app** (on iPhone, iPad, or Mac)
2. **Start a new conversation** or open existing
3. **Send to:** `tejdeepp0909@gmail.com` (yourself)
4. **Message:** `"generate post about productivity"`

### Option B: Test via Terminal (if you have another device)

```bash
# This sends a test message
curl "http://localhost:5173/test?recipient=tejdeepp0909@gmail.com"
```

---

## ✅ Step 4: What Should Happen

### Expected Flow:

1. **You send:** `"generate post about productivity"`

2. **iMessage Bridge receives it** (check Terminal 1 logs):
   ```
   📨 New message from tejdeepp0909@gmail.com: generate post about productivity
   ```

3. **Approval Gateway processes it** (check Terminal 2 logs):
   ```
   Processing AI chat request...
   Looking up brand for tejdeepp0909@gmail.com...
   Calling xAI...
   ```

4. **You receive response** (in Messages app):
   ```
   🤖 Here's a post about productivity:

   [AI-generated, brand-aware post text]
   ```

---

## 🔍 Step 5: Verify It Worked

### Check Terminal Logs:

**Terminal 1 (iMessage Bridge):**
- Should show: `📨 New message from...`
- Should show: `✅ iMessage sent to...`

**Terminal 2 (Approval Gateway):**
- Should show: `Processing AI chat request`
- Should show: `Brand found: [your brand name]`
- Should show: `AI response generated`

### Check Messages App:
- You should receive a message starting with `🤖`
- The message should be brand-aware and relevant

---

## 🎯 Test Scenarios

### Test 1: Basic Post Generation
**Send:** `"generate post about productivity"`

**Expected:** AI generates a post about productivity using your brand context

### Test 2: Specific Topic
**Send:** `"create post about our new feature"`

**Expected:** AI generates a post about a new feature, using your brand's communication style

### Test 3: Help Request
**Send:** `"help me write a post about AI"`

**Expected:** AI provides help or generates a post about AI

### Test 4: Approval Command (if you have pending approvals)
**Send:** `"approve cr_abc123"`

**Expected:** Processes approval (not AI chat)

---

## 🚨 Troubleshooting

### Problem: No response received

**Check:**
1. **iMessage Bridge running?**
   ```bash
   curl http://localhost:5173/health
   ```

2. **Message watching started?**
   - Check Terminal 2 for: `✅ iMessage watching started`
   - If not, manually start:
     ```bash
     curl -X POST http://localhost:5173/watch/start \
       -H "Content-Type: application/json" \
       -d '{"webhookUrl": "http://localhost:8000/webhooks/imessage"}'
     ```

3. **Full Disk Access granted?**
   - System Settings → Privacy & Security → Full Disk Access
   - Terminal should be checked ✅

### Problem: "No brand found"

**Fix:**
```sql
-- Check if owner_imessage is set
SELECT id, brand_name, owner_imessage 
FROM brand_agent 
WHERE is_active = true;

-- If NULL, update it:
UPDATE brand_agent 
SET owner_imessage = 'tejdeepp0909@gmail.com'
WHERE is_active = true;
```

### Problem: "AI chat not configured"

**Fix:**
- Check `approval-gateway/.env` has:
  ```bash
  XAI_API_KEY=your_key_here
  SUPABASE_URL=your_url_here
  SUPABASE_SERVICE_ROLE_KEY=your_key_here
  ```
- Restart approval gateway after adding

### Problem: "Module not found: supabase"

**Fix:**
```bash
cd approval-gateway
pip install supabase==2.10.0
```

### Problem: Messages not forwarding to webhook

**Check logs:**
- Terminal 1 should show: `📨 New message from...`
- Terminal 2 should show webhook received

**Manually test webhook:**
```bash
curl -X POST http://localhost:8000/webhooks/imessage \
  -H "Content-Type: application/json" \
  -d '{
    "from": "tejdeepp0909@gmail.com",
    "text": "generate post about productivity"
  }'
```

**Expected response:** `{"status":"ai_chat","response":"..."}`

---

## ✅ Success Indicators

**Everything is working if:**
- ✅ iMessage Bridge shows: `📨 New message from...`
- ✅ Approval Gateway shows: `Processing AI chat request`
- ✅ You receive AI response in Messages app
- ✅ Response is brand-aware and relevant
- ✅ Response starts with `🤖`

---

## 🎬 Quick Test Script

**Run this to test everything at once:**

```bash
#!/bin/bash

echo "🧪 Testing AI Chat via iMessage..."
echo ""

# Test 1: Check services
echo "1️⃣  Checking services..."
curl -s http://localhost:5173/health > /dev/null && echo "   ✅ iMessage Bridge: Running" || echo "   ❌ iMessage Bridge: Not running"
curl -s http://localhost:8000/ > /dev/null && echo "   ✅ Approval Gateway: Running" || echo "   ❌ Approval Gateway: Not running"

echo ""
echo "2️⃣  Testing webhook directly..."
RESPONSE=$(curl -s -X POST http://localhost:8000/webhooks/imessage \
  -H "Content-Type: application/json" \
  -d '{
    "from": "tejdeepp0909@gmail.com",
    "text": "generate post about productivity"
  }')

if echo "$RESPONSE" | grep -q "ai_chat"; then
    echo "   ✅ Webhook working! AI chat processed"
    echo "   Response: $(echo $RESPONSE | jq -r '.response' 2>/dev/null || echo 'Check logs')"
else
    echo "   ❌ Webhook failed:"
    echo "   $RESPONSE"
fi

echo ""
echo "3️⃣  Now test from Messages app:"
echo "   Send to: tejdeepp0909@gmail.com"
echo "   Message: 'generate post about productivity'"
echo ""
echo "✅ If you receive a response, everything works!"
```

---

## 🎯 Next Steps After Testing

Once it works:
1. ✅ Try different prompts
2. ✅ Test with different topics
3. ✅ Verify brand context is used correctly
4. ✅ Test approval commands (if you have pending approvals)

---

**Ready to test? Start the services and send a message!** 🚀📱

