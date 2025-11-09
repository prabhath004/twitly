# 🔒 Fix iMessage Database Permission Error

**Error:** `Failed to open database at /Users/tejdeeppathipati/Library/Messages/chat.db`

This means the SDK can't access your Messages database. You need to grant **Full Disk Access**.

---

## ✅ Step-by-Step Fix

### Step 1: Open System Settings

1. Click **Apple menu** (🍎) → **System Settings**
2. Go to **Privacy & Security**
3. Scroll down to **Full Disk Access**
4. Click the **lock icon** 🔒 (enter your password)

### Step 2: Add Terminal/Node

1. Click the **"+"** button
2. Navigate to and add:
   - **Terminal** (or iTerm, VS Code, Cursor - whatever you're using)
   - **Node.js** (if you can find it: `/usr/local/bin/node` or `/opt/homebrew/bin/node`)

### Step 3: Restart Terminal

**IMPORTANT:** Close and reopen your terminal completely.

### Step 4: Test Again

```bash
cd imessage-bridge
npm run dev
```

**Should work now!** ✅

---

## 🔍 Alternative: Check Database Path

If the database doesn't exist at all:

```bash
# Check if database exists
ls -la ~/Library/Messages/chat.db

# If it doesn't exist, you might need to:
# 1. Open Messages app
# 2. Sign in with your Apple ID
# 3. Send/receive at least one message
```

---

## 🆘 Still Not Working?

### Check 1: Verify Full Disk Access

```bash
# Check if Terminal has access
# (This won't work, but if it errors, you know permissions are wrong)
ls ~/Library/Messages/chat.db
```

### Check 2: Try Different Terminal

- If using Terminal → Try iTerm
- If using VS Code → Try Terminal app
- Grant permissions to the one you're actually using

### Check 3: Check Database Location

The SDK looks for: `~/Library/Messages/chat.db`

Make sure:
- Messages app is installed
- You're signed in to Messages
- You have at least one conversation

---

## ✅ Quick Test After Fixing

```bash
# Start bridge
cd imessage-bridge
npm run dev

# In another terminal, test:
curl 'http://localhost:5173/test?recipient=+YOUR_NUMBER'
```

**Check Messages app - you should get the test message!** 📱


