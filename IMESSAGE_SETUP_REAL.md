# 📱 Real iMessage Setup - Complete Guide

**Working iMessage integration using your Mac's Messages app**

---

## ✅ What You're Getting

- ✅ **Real iMessage** via your Mac
- ✅ **Approval workflow** for tweets
- ✅ **No external services** - just AppleScript
- ✅ **Free** - no API costs

---

## 🎯 5-Step Setup

### Step 1: Grant Permissions (IMPORTANT!)

**The SDK needs Full Disk Access:**

1. Open **System Settings** → **Privacy & Security** → **Full Disk Access**
2. Click **"+"** and add **Terminal** (or your IDE)
3. **Restart your terminal**

### Step 2: Install iMessage Bridge (1 minute)

```bash
cd /Users/tejdeeppathipati/Desktop/twitly/imessage-bridge
npm install
```

**This installs:**
- `@photon-ai/imessage-kit` - The real SDK
- `better-sqlite3` - Database driver for Node.js
- Express - Web server

### Step 3: Start iMessage Bridge

```bash
npm run dev
```

**You should see:**
```
📱 iMessage Bridge Server
✅ Using: @photon-ai/imessage-kit
✅ Running on: http://localhost:5173
```

**Keep this terminal running!**

### Step 4: Test It

```bash
# In a new terminal, test with YOUR number:
curl 'http://localhost:5173/test?recipient=YOUR_PHONE_OR_APPLE_ID'

# Examples:
curl 'http://localhost:5173/test?recipient=+12408890686'
curl 'http://localhost:5173/test?recipient=yourname@icloud.com'
```

**Check your Messages app** - You should get a test message! ✅

### Step 5: Configure Approval Gateway

**Edit:** `approval-gateway/.env`

```bash
# Add these lines:
PHOTON_BASE_URL=http://localhost:5173
PHOTON_TO=YOUR_PHONE_OR_APPLE_ID

# Example:
# PHOTON_TO=+12408890686
# PHOTON_TO=yourname@icloud.com
```

### Step 6: Configure Daily Poster

**Edit:** `daily-poster/.env`

```bash
# Add these lines:
REQUIRE_APPROVAL=true
APPROVAL_GATEWAY_URL=http://localhost:8000
OWNER_IMESSAGE=YOUR_PHONE_OR_APPLE_ID

# Example:
# OWNER_IMESSAGE=+12408890686
```

---

## 🚀 Start Everything (4 Terminals)

### Terminal 1: iMessage Bridge
```bash
cd /Users/tejdeeppathipati/Desktop/twitly/imessage-bridge
npm run dev
```

### Terminal 2: Approval Gateway
```bash
cd /Users/tejdeeppathipati/Desktop/twitly/approval-gateway
python -m uvicorn app.main:app --reload --port 8000
```

### Terminal 3: Daily Poster
```bash
cd /Users/tejdeeppathipati/Desktop/twitly/daily-poster
python -m uvicorn app.main:app --reload --port 8500
```

### Terminal 4: Frontend
```bash
cd /Users/tejdeeppathipati/Desktop/twitly
npm run dev
```

---

## 🧪 Test The Full Flow

1. **Go to:** http://localhost:3000/dashboard/activity
2. **Select:** "Airstitch"
3. **Click:** "Generate & Post"
4. **Check iMessage** - You'll get approval request! 📱
5. **Reply:** `approve post_xxx`
6. **Check Twitter** - Posted! ✅

---

## 💬 iMessage Commands

**Approve:**
```
approve post_abc123
```

**Edit & Approve:**
```
edit post_abc123: This is better text
```

**Skip:**
```
skip post_abc123
```

**AI Chat:**
```
generate post about productivity tips
```

---

## ⚙️ Quick Scripts

### Auto-Configure Script

```bash
# Run this to set up everything:
./setup-imessage-real.sh
```

### Start All Services

```bash
# Update start-all.sh to include iMessage bridge
./start-all.sh
```

---

## 📋 Services Checklist

- [ ] **iMessage Bridge** - Port 5173 (NEW!)
- [ ] **Approval Gateway** - Port 8000
- [ ] **Daily Poster** - Port 8500
- [ ] **Frontend** - Port 3000

---

## 🆘 Troubleshooting

### "Messages not sending"

**Check 1:** Messages app is signed in
```bash
# Test Messages access:
osascript -e 'tell application "Messages" to get name of accounts'
```

**Check 2:** Terminal has accessibility permissions
- System Preferences → Security & Privacy → Accessibility
- Add Terminal or Python

**Check 3:** Bridge is running
```bash
curl http://localhost:5173/health
```

### "Recipient not found"

**Solution:** Add recipient to your Contacts app first!

### "Permission denied"

**Solution:** Grant Terminal permissions:
1. System Preferences → Security & Privacy → Accessibility
2. Click lock to make changes
3. Add Terminal (or iTerm)
4. Restart Terminal

---

## 🔄 Two Modes

### Mode 1: Auto-Post (Skip Approval)

**Edit:** `daily-poster/.env`
```bash
REQUIRE_APPROVAL=false
```

**Services needed:** 2
- Daily Poster
- Frontend

### Mode 2: iMessage Approval (Full Control)

**Edit:** `daily-poster/.env`
```bash
REQUIRE_APPROVAL=true
```

**Services needed:** 4
- iMessage Bridge
- Approval Gateway
- Daily Poster
- Frontend

---

## 📱 Recipient Format

**Phone Numbers:**
```bash
PHOTON_TO=+12408890686        # ✅ Correct
PHOTON_TO=+15551234567        # ✅ Correct
```

**Apple ID:**
```bash
PHOTON_TO=user@icloud.com     # ✅ Correct
PHOTON_TO=friend@gmail.com    # ✅ Correct (if they use iMessage)
```

**⚠️ Must include + for phone numbers!**

---

## 🎯 For Hackathon

### Demo Flow:
1. **Show Activity Feed** - Select brand
2. **Click Generate** - xAI creates tweet
3. **Show iMessage** - Approval arrives instantly
4. **Reply** - "approve post_xxx"
5. **Show Twitter** - Tweet is live!

### Talk Track:
> "BrandPilot uses iMessage for human-in-the-loop approval.
> AI generates the content, but you maintain full control
> with simple text commands from your phone."

---

## ✨ What Makes This Special

- ✅ **Real iMessage** (not SMS, not WhatsApp)
- ✅ **Native Mac integration** via AppleScript
- ✅ **No external APIs** needed
- ✅ **Works instantly** with your existing contacts
- ✅ **Secure** - all local to your Mac

---

## 🚀 You're Ready!

```bash
# Quick start:
cd imessage-bridge && python server.py  # Terminal 1
cd approval-gateway && python -m uvicorn app.main:app --reload --port 8000  # Terminal 2
cd daily-poster && python -m uvicorn app.main:app --reload --port 8500  # Terminal 3
npm run dev  # Terminal 4
```

**Test:** Send yourself a message, then try the full approval flow! 📱✨

