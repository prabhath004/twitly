# 📱 Where to Configure Your Phone Number

## 🎯 For Your Current Working Setup

You already have WhatsApp approval working! Here's where the numbers are:

---

## 📝 approval-gateway/.env

**Your WhatsApp number goes here:**

```bash
# ════════════════════════════════════════════
# Twilio WhatsApp Configuration
# ════════════════════════════════════════════

# Your Twilio business number (already configured)
TWILIO_WA_NUMBER=whatsapp:+15558716155

# YOUR phone number (where you receive approvals)
OWNER_WA_NUMBER=whatsapp:+1234567890  # ← Change this to YOUR number

# Example:
# OWNER_WA_NUMBER=whatsapp:+12408890686
```

---

## 📝 daily-poster/.env

**Enable approval mode here:**

```bash
# ════════════════════════════════════════════
# Approval Settings (OPTIONAL)
# ════════════════════════════════════════════

# Set to 'true' to require WhatsApp approval
# Set to 'false' to auto-post (current)
REQUIRE_APPROVAL=false  # ← Change to 'true' to enable approvals

# URL of approval gateway
APPROVAL_GATEWAY_URL=http://localhost:8000
```

---

## ✅ Current Setup (Auto-Post)

**Right now, with `REQUIRE_APPROVAL=false`:**
- No phone number needed!
- Posts go live immediately
- Activity Feed → Generate & Post → Done! ✅

---

## 📱 To Enable WhatsApp Approval

### Step 1: Update approval-gateway/.env

```bash
# Change this line to YOUR number:
OWNER_WA_NUMBER=whatsapp:+12408890686  # Your number with country code
```

### Step 2: Update daily-poster/.env

```bash
# Change this line:
REQUIRE_APPROVAL=true  # Enable approval mode
```

### Step 3: Start Services

```bash
# Terminal 1: Approval Gateway
cd /Users/tejdeeppathipati/Desktop/twitly/approval-gateway
python -m uvicorn app.main:app --reload --port 8000

# Terminal 2: Daily Poster
cd /Users/tejdeeppathipati/Desktop/twitly/daily-poster
python -m uvicorn app.main:app --reload --port 8500

# Terminal 3: Frontend
cd /Users/tejdeeppathipati/Desktop/twitly
npm run dev
```

### Step 4: Test

1. Go to Activity Feed
2. Select "Airstitch"
3. Click "Generate & Post"
4. **Check WhatsApp** - You'll get approval message!
5. Reply: `approve cr_xxx`
6. Check Twitter - It's live! ✅

---

## 📋 Number Format

**Always use this format:**

```bash
# ✅ CORRECT:
OWNER_WA_NUMBER=whatsapp:+12408890686  # Country code + number
OWNER_WA_NUMBER=whatsapp:+15551234567

# ❌ WRONG:
OWNER_WA_NUMBER=2408890686             # Missing whatsapp: prefix
OWNER_WA_NUMBER=+12408890686           # Missing whatsapp: prefix
OWNER_WA_NUMBER=whatsapp:2408890686    # Missing + and country code
```

---

## 🎯 Quick Reference

| Mode | REQUIRE_APPROVAL | Need Number? | Services Needed |
|------|------------------|--------------|-----------------|
| **Auto-Post** | `false` | ❌ No | Daily Poster + Frontend |
| **WhatsApp Approval** | `true` | ✅ Yes | Approval Gateway + Daily Poster + Frontend |

---

## 💡 Recommendation for Hackathon

### **Keep it Simple:**

```bash
# In daily-poster/.env
REQUIRE_APPROVAL=false  # Auto-post

# Run only these:
# 1. Daily Poster (port 8500)
# 2. Frontend (port 3000)
```

**This is already working perfectly!** ✅

### **Demo WhatsApp as a Feature:**

During presentation:
- "We support approval workflows"
- "Can integrate WhatsApp for human-in-the-loop"
- "Currently using auto-post for speed"

---

## 🔧 Test Your Current Setup

**Right now, without changing anything:**

```bash
# Terminal 1:
cd /Users/tejdeeppathipati/Desktop/twitly/daily-poster
python -m uvicorn app.main:app --reload --port 8500

# Terminal 2:
cd /Users/tejdeeppathipati/Desktop/twitly
npm run dev

# Then:
1. Open http://localhost:3000/dashboard/activity
2. Select "Airstitch" from dropdown
3. Click "Generate & Post"
4. Check Twitter - Posted! ✅
```

**This works NOW!** No phone number configuration needed.

---

## 📞 Summary

### Your Numbers Live Here:

1. **approval-gateway/.env**
   - Line: `OWNER_WA_NUMBER=whatsapp:+your-number`
   - Format: `whatsapp:+` + country code + phone number
   
2. **daily-poster/.env**
   - Line: `REQUIRE_APPROVAL=false` (current) or `true` (to enable)

### Current Working Setup:
- ✅ Auto-posting enabled
- ✅ No phone number needed
- ✅ Just run daily-poster + frontend
- ✅ Activity Feed works perfectly!

**Don't fix what's not broken!** 🚀

