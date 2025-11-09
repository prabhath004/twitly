# 🚀 START HERE - iMessage Integration

**Everything you need in ONE file. Copy-paste and go!**

---

## ✅ What's Already Working

Your current setup:
- ✅ Activity Feed with brand dropdown
- ✅ Generate & Post button
- ✅ xAI (Grok-3) generates posts
- ✅ Composio posts to X
- ✅ **Auto-posting works perfectly!**

---

## 🎯 Two Options

### **OPTION A: Keep Current Setup** (Recommended for hackathon)

**ZERO changes needed!** Your app works perfectly now.

```bash
# Just run these services:
cd daily-poster
python -m uvicorn app.main:app --reload --port 8500

# In another terminal:
npm run dev

# Done! Use Activity Feed to post
```

✅ **This is already working for you!**

---

### **OPTION B: Add iMessage Approval** (Optional upgrade)

Enable iMessage approvals in **5 copy-paste steps**:

---

## 📱 OPTION B: 5-Step Setup

### Step 1: Install Photon (30 seconds)

```bash
npm install -g photon-imessage-kit
```

### Step 2: Add to approval-gateway/.env (copy-paste)

```bash
cd /Users/tejdeeppathipati/Desktop/twitly/approval-gateway

# Add these 3 lines to .env:
cat >> .env << 'EOF'

# iMessage Configuration
XAI_API_KEY=your-xai-key-here
PHOTON_BASE_URL=http://localhost:5173
PHOTON_TO=your-apple-id@icloud.com
EOF
```

**⚠️ Edit .env and replace:**
- `your-xai-key-here` → Your actual xAI API key
- `your-apple-id@icloud.com` → Your actual Apple ID

### Step 3: Add to daily-poster/.env (copy-paste)

```bash
cd /Users/tejdeeppathipati/Desktop/twitly/daily-poster

# Add these 3 lines to .env:
cat >> .env << 'EOF'

# iMessage Approval
REQUIRE_APPROVAL=true
APPROVAL_GATEWAY_URL=http://localhost:8000
OWNER_IMESSAGE=your-apple-id@icloud.com
EOF
```

**⚠️ Edit .env and replace:**
- `your-apple-id@icloud.com` → Your actual Apple ID

**💡 Set `REQUIRE_APPROVAL=false` to disable iMessage (auto-post)**

### Step 4: Start Services (4 terminals)

**Terminal 1:**
```bash
photon start --port 5173
```

**Terminal 2:**
```bash
cd /Users/tejdeeppathipati/Desktop/twitly/approval-gateway
python -m uvicorn app.main:app --reload --port 8000
```

**Terminal 3:**
```bash
cd /Users/tejdeeppathipati/Desktop/twitly/daily-poster
python -m uvicorn app.main:app --reload --port 8500
```

**Terminal 4:**
```bash
cd /Users/tejdeeppathipati/Desktop/twitly
npm run dev
```

### Step 5: Test (30 seconds)

1. **Go to:** http://localhost:3000/dashboard/activity
2. **Select brand:** Airstitch
3. **Click:** "Generate & Post"
4. **Check iMessage** - You'll get approval request!
5. **Reply:** `approve post_xxx`
6. **Check Twitter** - It's live! ✅

---

## 💬 iMessage Commands

Once Photon is running, you can:

```
approve post_123                    → Post it now
edit post_123: Better text here     → Edit & post
skip post_123                       → Cancel
generate post about productivity    → Ask AI to create post
```

---

## 🔄 Toggle Between Modes

### Enable iMessage Approval:
```bash
# Edit daily-poster/.env
REQUIRE_APPROVAL=true

# Restart daily-poster
```

### Disable (Auto-Post):
```bash
# Edit daily-poster/.env
REQUIRE_APPROVAL=false

# Restart daily-poster
```

---

## 🎯 What Mode Should You Use?

### For Hackathon Demo:
```
REQUIRE_APPROVAL=false
```
- ✅ Faster to demo
- ✅ No extra setup
- ✅ Shows AI posting
- Show iMessage as "coming soon"

### For Production:
```
REQUIRE_APPROVAL=true
```
- ✅ Full control
- ✅ Edit before posting
- ✅ Prevent mistakes

---

## ✅ Services Status

| Service | Port | Status | Required? |
|---------|------|--------|-----------|
| **Frontend** | 3000 | ✅ Running | Yes |
| **Daily Poster** | 8500 | ✅ Running | Yes |
| **Photon** | 5173 | ⚠️ Not installed | Only if using iMessage |
| **Approval Gateway** | 8000 | ⚠️ Optional | Only if using iMessage |

---

## 🎉 You're Ready!

### Current Setup (Working Now):
```bash
# Terminal 1
cd daily-poster
python -m uvicorn app.main:app --reload --port 8500

# Terminal 2
npm run dev

# Go to Activity Feed → Generate & Post → Done! ✅
```

### With iMessage (Optional):
```bash
# Follow 5-step setup above
# Then test with iMessage approvals
```

---

## 🆘 Quick Help

**"I just want to post tweets now"**
→ Use OPTION A (already working!)

**"I want iMessage control"**
→ Use OPTION B (5 steps above)

**"Photon not installing"**
→ Check Node.js is installed: `node --version`

**"iMessage not working"**
→ Check Photon is running: `curl http://localhost:5173/health`

---

## 📚 Documentation

- **`READY_TO_GO_IMESSAGE.md`** ← This file
- **`ENV_CONFIG_IMESSAGE.md`** ← Environment variables
- **`IMESSAGE_QUICKSTART.md`** ← Quick reference
- **`IMESSAGE_COMPLETE_GUIDE.md`** ← Full documentation

---

## ✨ Bottom Line

**Your app works NOW with auto-posting!**

iMessage is a **bonus feature** you can enable anytime by:
1. Running the setup script: `./setup-imessage.sh`
2. Starting Photon
3. Setting `REQUIRE_APPROVAL=true`

**But you don't need to - auto-posting works great!** 🚀

