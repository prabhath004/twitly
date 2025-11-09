# 🚀 BrandPilot - Ready to Go!

**Your AI-powered X (Twitter) posting system is ready. Just 2 commands to start!**

---

## ✅ What You Have

- ✅ **Activity Feed** - Select brand, generate & post tweets
- ✅ **xAI (Grok-3)** - Generates intelligent, brand-aware content
- ✅ **Composio X Integration** - Posts directly to Twitter
- ✅ **Supabase** - Stores brand profiles & content
- ✅ **Auto-posting** - Generate and post in one click
- ✅ **WhatsApp Approval** - Optional human-in-the-loop workflow

---

## 🎯 Quick Start (2 Minutes)

### Step 1: Start Backend

```bash
cd /Users/tejdeeppathipati/Desktop/twitly/daily-poster
python -m uvicorn app.main:app --reload --port 8500
```

**Wait for:** `✓ Application startup complete.`

### Step 2: Start Frontend

```bash
cd /Users/tejdeeppathipati/Desktop/twitly
npm run dev
```

**Wait for:** `✓ Ready in X ms`

### Step 3: Use It!

1. Open: **http://localhost:3000/dashboard/activity**
2. Select: **"Airstitch"** from dropdown
3. Click: **"Generate & Post"**
4. Check Twitter: **Posted!** ✅

---

## 📱 Numbers & Configuration

### Where Your Phone Number Goes

The phone number is **only needed for WhatsApp approval** (optional feature).

**File:** `approval-gateway/.env`

```bash
# Your WhatsApp number for receiving approval requests
OWNER_WA_NUMBER=whatsapp:+12408890686  # ← Change this to YOUR number

# Format: whatsapp:+[country_code][phone_number]
# Example: whatsapp:+15551234567
```

**Current Mode:** Auto-post (no approval needed)

To configure your number, run:

```bash
./setup-whatsapp.sh
```

---

## 🔄 Two Modes

### Mode 1: Auto-Post (Current - Default) ✅

**File:** `daily-poster/.env`
```bash
REQUIRE_APPROVAL=false
```

**Behavior:**
- Click "Generate & Post"
- AI generates tweet
- Posts immediately to X
- No approval needed

**Services needed:** 2
1. Daily Poster (port 8500)
2. Frontend (port 3000)

---

### Mode 2: WhatsApp Approval (Optional) 📱

**File:** `daily-poster/.env`
```bash
REQUIRE_APPROVAL=true
```

**Behavior:**
- Click "Generate & Post"
- AI generates tweet
- Sends to WhatsApp for approval
- You reply: `approve cr_xxx`
- Then posts to X

**Services needed:** 3
1. Approval Gateway (port 8000)
2. Daily Poster (port 8500)
3. Frontend (port 3000)

**Setup:**
```bash
./setup-whatsapp.sh
```

---

## 📋 Services Overview

| Service | Port | Status | When Needed? |
|---------|------|--------|--------------|
| **Daily Poster** | 8500 | Required | Always |
| **Frontend** | 3000 | Required | Always |
| **Approval Gateway** | 8000 | Optional | Only if `REQUIRE_APPROVAL=true` |

---

## 🛠️ Scripts

### `./start-all.sh` 
Shows commands to start all services

### `./setup-whatsapp.sh`
Configures your WhatsApp number for approvals

---

## 📖 Documentation

| File | What It Covers |
|------|----------------|
| **`SIMPLE_START.md`** | ← START HERE - Simplest guide |
| **`WHERE_TO_CONFIGURE_NUMBERS.md`** | Phone number configuration |
| **`REAL_IMESSAGE_OPTIONS.md`** | Why iMessage doesn't work (use WhatsApp!) |
| **`START_HERE_IMESSAGE.md`** | Full WhatsApp setup guide |

---

## 🆘 Troubleshooting

### Error: "Port already in use"
```bash
lsof -ti:8500 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### Error: "Module not found"
```bash
# Python dependencies
cd daily-poster
pip install -r requirements.txt

# Node dependencies
cd /Users/tejdeeppathipati/Desktop/twitly
npm install
```

### Error: "Supabase authentication failed"
Check `.env.local` and `daily-poster/.env` have correct Supabase credentials.

### Error: "Can't post to X"
Ensure you're connected to X via Composio in the frontend settings.

### Error: "No brands in dropdown"
1. Check you're logged in
2. Create a brand via onboarding
3. Ensure `is_active = true` in Supabase `brand_agent` table

---

## ⚠️ About iMessage

**iMessage integration is NOT available** because Apple doesn't provide an API.

**Use WhatsApp instead!** You already have Twilio WhatsApp configured.

See `REAL_IMESSAGE_OPTIONS.md` for details.

---

## ✨ Bottom Line

**Your app works NOW:**

```bash
# Terminal 1:
cd daily-poster && python -m uvicorn app.main:app --reload --port 8500

# Terminal 2:
cd /Users/tejdeeppathipati/Desktop/twitly && npm run dev

# Then: Open Activity Feed → Generate & Post → Done! ✅
```

**That's it!** 🚀

---

## 🎯 For Your Hackathon

### Demo This:
1. **Show the Activity Feed** - Clean UI
2. **Select "Airstitch"** - Your brand
3. **Click Generate & Post** - AI magic
4. **Show Twitter** - Live tweet!
5. **Mention:** "WhatsApp approval available for brand safety"

### Talk Track:
> "BrandPilot uses xAI to generate brand-aware content, 
> posts directly via Composio, and offers optional 
> WhatsApp approval for human oversight."

---

## 🚀 You're Ready!

No more setup needed. Just start the services and demo! 🎉

