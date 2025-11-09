# 📱 iMessage Quick Start - Real SDK

**Using `@photon-ai/imessage-kit` - The professional iMessage SDK**

---

## ✅ Requirements

- ✅ macOS (Mac computer)
- ✅ Node.js 18+ (`node --version`)
- ✅ Messages app signed in
- ✅ **Full Disk Access** granted to Terminal

---

## 🚀 3-Step Setup

### Step 1: Grant Permissions (IMPORTANT!)

**The SDK needs Full Disk Access:**

1. Open **System Settings** → **Privacy & Security** → **Full Disk Access**
2. Click **"+"** and add:
   - **Terminal** (or iTerm, VS Code, Cursor)
   - **Node.js** (if available)
3. **Restart your terminal**

### Step 2: Run Setup Script

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

The script will:
- Install `@photon-ai/imessage-kit`
- Configure all services
- Send you a test message

### Step 3: Check Messages App

You should receive:
```
🤖 BrandPilot iMessage Bridge is ready!
```

✅ **If you got it, you're all set!**

---

## 🚀 Start Services

**Terminal 1: iMessage Bridge**
```bash
cd imessage-bridge
npm run dev
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

## 🆘 Troubleshooting

### "Permission denied" or "Cannot access database"

**Grant Full Disk Access:**
1. System Settings → Privacy & Security → Full Disk Access
2. Add Terminal/Node.js
3. Restart terminal

### "Module not found: better-sqlite3"

```bash
cd imessage-bridge
npm install
```

### "npm not found"

Install Node.js:
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

### "Test message not received"

**Check:**
1. Messages app is signed in
2. Full Disk Access is granted
3. Bridge is running (`curl http://localhost:5173/health`)
4. Recipient is correct format (`+12408890686`)

---

## ✅ That's It!

**You're using the real iMessage SDK now!** Much better than AppleScript. 🚀

**Read more:** `imessage-bridge/README.md`


