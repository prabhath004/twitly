# 📱 iMessage Quick Start

**Get iMessage approval working in 3 commands**

---

## ✅ Requirements

- macOS (Mac computer)
- Messages app signed in
- Python 3.7+

---

## 🚀 3-Step Setup

### Step 1: Run Setup Script

```bash
cd /Users/tejdeeppathipati/Desktop/twitly
./setup-imessage-real.sh
```

**Enter your number when prompted:**
```
Recipient: +12408890686
```

**Or your Apple ID:**
```
Recipient: yourname@icloud.com
```

### Step 2: Check Messages App

You should receive a test message:
```
🤖 BrandPilot iMessage Bridge is ready!
```

✅ **If you got it, you're all set!**

### Step 3: Start Services

**Terminal 1: iMessage Bridge**
```bash
cd imessage-bridge
python server.py
```

**Terminal 2: Approval Gateway**
```bash
cd approval-gateway
python -m uvicorn app.main:app --reload --port 8000
```

**Terminal 3: Daily Poster**
```bash
cd daily-poster
python -m uvicorn app.main:app --reload --port 8500
```

**Terminal 4: Frontend**
```bash
npm run dev
```

---

## 🧪 Test It

1. Go to: http://localhost:3000/dashboard/activity
2. Select "Airstitch"
3. Click "Generate & Post"
4. **Check iMessage** - Approval request arrives! 📱
5. Reply: `approve post_xxx`
6. **Check Twitter** - Posted! ✅

---

## 💬 Commands

```
approve post_123           → Post it
edit post_123: New text    → Edit & post
skip post_123              → Cancel
```

---

## 🔄 Toggle Approval

**Enable iMessage approval:**
```bash
# Edit: daily-poster/.env
REQUIRE_APPROVAL=true
```

**Disable (auto-post):**
```bash
# Edit: daily-poster/.env
REQUIRE_APPROVAL=false
```

---

## 🆘 Troubleshooting

### "Test message not received"

**Check Messages app is signed in:**
```bash
# Test AppleScript:
osascript -e 'tell application "Messages" to get name of accounts'
```

### "Permission denied"

**Grant Terminal permissions:**
1. System Preferences → Security & Privacy
2. Accessibility → Add Terminal
3. Restart Terminal

### "Bridge not starting"

**Install dependencies:**
```bash
cd imessage-bridge
pip install -r requirements.txt
```

---

## ✅ That's It!

**iMessage approval is ready.** Just start the 4 services and test! 🚀

**Read more:** `IMESSAGE_SETUP_REAL.md`


