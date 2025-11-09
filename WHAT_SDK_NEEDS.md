# 📱 What the iMessage SDK Needs

**Simple explanation of what the SDK is trying to access**

---

## ✅ What the SDK Does

The `@photon-ai/imessage-kit` SDK needs to **READ** your Messages database to:
- Send iMessages
- Read incoming messages
- Track message history

**It does NOT need any specific data** - it just needs **permission to read the file**.

---

## 📁 What File It Accesses

**Location:** `~/Library/Messages/chat.db`

This is your **Messages app database** - it contains all your iMessages, SMS, and RCS messages.

**The SDK just needs to READ this file** - it doesn't modify it or need any specific data in it.

---

## 🔒 Why It Fails

**Error:** `unable to open database file`

This means:
- ✅ The database file EXISTS (we confirmed this)
- ❌ Node.js doesn't have **permission** to read it

**Solution:** Grant **Full Disk Access** to Terminal/Node.js

---

## 🎯 What You Need to Do

### Step 1: Grant Full Disk Access

1. **System Settings** → **Privacy & Security** → **Full Disk Access**
2. Click **"+"** → Add **Terminal** (or your IDE)
3. **Restart Terminal**

### Step 2: Test

```bash
cd imessage-bridge
npm run dev
```

**The server will start!** ✅

### Step 3: Try Sending

```bash
curl 'http://localhost:5173/test?recipient=+YOUR_NUMBER'
```

**Now it will try to initialize the SDK** - if permissions are granted, it works!

---

## 💡 What Changed

I made the SDK initialization **lazy** - meaning:

**Before:**
- SDK tried to connect immediately → Server crashed ❌

**Now:**
- Server starts successfully ✅
- SDK only connects when you actually use it
- Clear error messages if permissions aren't granted

---

## 🧪 Test Without Permissions

Even without permissions, you can:

```bash
# Check server is running
curl http://localhost:5173/health

# Response:
{
  "status": "ok",
  "service": "imessage-bridge",
  "sdk": "@photon-ai/imessage-kit",
  "initialized": false
}
```

**Server works!** But SDK isn't initialized yet.

---

## ✅ After Granting Permissions

Once you grant Full Disk Access and restart terminal:

```bash
# Try sending
curl 'http://localhost:5173/test?recipient=+YOUR_NUMBER'

# SDK will initialize automatically
# If permissions are granted → Works! ✅
# If not → Clear error message with solution
```

---

## 📋 Summary

**What SDK needs:**
- ✅ Read access to `~/Library/Messages/chat.db`
- ✅ Full Disk Access permission
- ✅ Messages app database (already exists)

**What SDK does NOT need:**
- ❌ Any specific data in the database
- ❌ Any messages to exist
- ❌ Any contacts
- ❌ Any conversations

**It just needs permission to read the file!** 🔒

---

## 🚀 Next Steps

1. **Grant Full Disk Access** (see Step 1 above)
2. **Restart Terminal**
3. **Start server:** `cd imessage-bridge && npm run dev`
4. **Test:** `curl 'http://localhost:5173/test?recipient=+YOUR_NUMBER'`

**That's it!** The SDK will work once permissions are granted. ✨


