# 🔧 Fixing iMessage Flow - Complete Debug Guide

**Issues found and fixes applied:**

---

## 🐛 Issues Found

### 1. **Command Detection Order**
- **Problem:** "post" command was checked before "generate and post"
- **Fix:** Check "generate and post" FIRST, then "post" command

### 2. **Webhook Format Mismatch**
- **Problem:** Bridge sends nested format, gateway expected flat
- **Fix:** Gateway now handles both formats

### 3. **Messages Being Echoed**
- **Problem:** SDK processing own messages
- **Fix:** Added `isFromMe` check to skip own messages

### 4. **Brand Lookup Issue**
- **Problem:** Not finding correct brand (showing Nike instead of Airstitch)
- **Fix:** Added better logging to debug brand lookup

---

## ✅ What's Fixed

1. ✅ Command detection order corrected
2. ✅ Webhook format handling improved
3. ✅ Own messages are skipped
4. ✅ Better logging added

---

## 🧪 How to Test

### Step 1: Restart Services

**Terminal 1: iMessage Bridge**
```bash
# Stop (Ctrl+C)
cd imessage-bridge
npm run dev
```

**Terminal 2: Approval Gateway**
```bash
# Stop (Ctrl+C)
cd approval-gateway
python3 -m uvicorn app.main:app --reload --port 8000
```

**Terminal 3: Frontend (REQUIRED for posting!)**
```bash
cd /Users/tejdeeppathipati/Desktop/twitly
npm run dev
```

### Step 2: Check Services

```bash
# Check all services
curl http://localhost:5173/health  # iMessage Bridge
curl http://localhost:8000/        # Approval Gateway
curl http://localhost:3000 > /dev/null && echo "Frontend OK" || echo "Frontend NOT running"
```

### Step 3: Test Webhook Directly

```bash
curl -X POST http://localhost:8000/webhooks/imessage \
  -H "Content-Type: application/json" \
  -d '{
    "event": "new_message",
    "message": {
      "sender": "tejdeepp0909@gmail.com",
      "text": "generate and post about productivity"
    }
  }'
```

**Expected:** Should see logs in Terminal 2 showing:
- `📨 Received iMessage from...`
- `🤖 Detected AI chat request...`
- `🔍 Looking up brand...`
- `✅ Brand found: Airstitch`
- `📤 Posting to X...`

### Step 4: Test from Messages App

**Send:**
```
generate and post about productivity
```

**Check Terminal 2 logs** - should see:
- Message received
- Brand found
- AI generation
- Posting attempt
- Success/failure

---

## 🔍 Debugging Checklist

### ✅ Services Running?
- [ ] iMessage Bridge (port 5173)
- [ ] Approval Gateway (port 8000)
- [ ] Frontend (port 3000) - **REQUIRED for Composio!**

### ✅ Database Configured?
- [ ] `owner_imessage = 'tejdeepp0909@gmail.com'` set in brand_agent table
- [ ] Brand is active (`is_active = true`)

### ✅ Environment Variables?
- [ ] `XAI_API_KEY` in `approval-gateway/.env`
- [ ] `SUPABASE_URL` in `approval-gateway/.env`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` in `approval-gateway/.env`

### ✅ Twitter Connected?
- [ ] Twitter connected via Composio in frontend
- [ ] Frontend is running (needed for Composio API)

---

## 🚨 Common Issues

### "No brand found"
→ Check database: `SELECT id, brand_name, owner_imessage FROM brand_agent WHERE is_active = true;`
→ Make sure `owner_imessage = 'tejdeepp0909@gmail.com'`

### "Failed to post"
→ Check frontend is running (port 3000)
→ Check Twitter is connected via Composio
→ Check Terminal 2 logs for error details

### "Messages being echoed"
→ Should be fixed with `isFromMe` check
→ Restart iMessage Bridge to apply fix

### "Wrong brand (Nike instead of Airstitch)"
→ Check database - make sure only ONE brand has `owner_imessage = 'tejdeepp0909@gmail.com'`
→ Check Terminal 2 logs to see which brand is being found

---

## 📋 What to Check in Logs

**Terminal 1 (iMessage Bridge):**
- `📨 New message from...` (should NOT see your own messages)
- `✅ Message forwarded to webhook`

**Terminal 2 (Approval Gateway):**
- `📨 Received iMessage from...`
- `🤖 Detected AI chat request...`
- `🔍 Looking up brand...`
- `✅ Brand found: [your brand]`
- `📤 Posting to X...`
- `📤 Post result: {...}`

**Terminal 3 (Frontend - if running):**
- `🐦 [POST TWEET] Request received`
- `✅✅✅ [POST TWEET] Tweet posted successfully!`

---

## 🎯 Next Steps

1. **Restart all 3 services** (Bridge, Gateway, Frontend)
2. **Test webhook directly** (see Step 3 above)
3. **Test from Messages app**
4. **Check all terminal logs**
5. **Share logs if still not working**

**The key is: Frontend MUST be running for posting to work!** 🚀

