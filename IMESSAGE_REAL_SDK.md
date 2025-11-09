# 📱 iMessage Integration - Real SDK

**Now using `@photon-ai/imessage-kit` - The professional iMessage SDK!**

---

## ✅ What Changed

**Before:** AppleScript bridge (hacky, unreliable)  
**Now:** Real SDK from Photon AI (professional, type-safe, feature-rich)

---

## 🎯 Key Improvements

- ✅ **Type-safe** - Full TypeScript support
- ✅ **Real SDK** - Not a workaround
- ✅ **More features** - Send images, files, batch sending
- ✅ **Better reliability** - Proper error handling
- ✅ **Webhook support** - Real-time message watching
- ✅ **Cross-runtime** - Works with Node.js and Bun

---

## 🚀 Quick Start

### 1. Grant Permissions (REQUIRED!)

**Full Disk Access:**
1. System Settings → Privacy & Security → Full Disk Access
2. Add Terminal (or your IDE)
3. Restart terminal

### 2. Install

```bash
cd imessage-bridge
npm install
```

### 3. Start

```bash
npm run dev
```

### 4. Test

```bash
curl 'http://localhost:5173/test?recipient=+YOUR_NUMBER'
```

**Check Messages app - it works!** ✅

---

## 📚 SDK Features

The `@photon-ai/imessage-kit` SDK supports:

### Sending
- ✅ Text messages
- ✅ Images (local files or URLs)
- ✅ Files (PDF, CSV, VCF, etc.)
- ✅ Batch sending
- ✅ Mixed content (text + images + files)

### Reading
- ✅ Get all messages
- ✅ Filter by sender, date, unread
- ✅ Get unread messages grouped by sender
- ✅ Real-time watching

### Advanced
- ✅ Message chain processing
- ✅ Plugin system
- ✅ Webhook integration
- ✅ Error handling

---

## 🔧 API Endpoints

### Send Message
```bash
POST /send
{
  "recipient": "+15551234567",
  "text": "Hello!"
}
```

### Test
```bash
GET /test?recipient=+15551234567
```

### Get Unread
```bash
GET /messages/unread
```

### Start Watching (Webhook)
```bash
POST /watch/start
{
  "webhookUrl": "http://localhost:8000/webhook/imessage"
}
```

---

## 📖 Full Documentation

- **Bridge README:** `imessage-bridge/README.md`
- **SDK Docs:** https://github.com/photon-hq/imessage-kit
- **Quick Start:** `QUICK_START_IMESSAGE_REAL.md`

---

## ⚠️ Important Notes

### Permissions
- **Full Disk Access** is required
- Grant to Terminal/IDE, not just Node.js
- Restart terminal after granting

### Requirements
- macOS only
- Node.js 18+ (or Bun)
- Messages app signed in
- `better-sqlite3` for Node.js (auto-installed)

### License
The SDK uses **SSPL license** - check license terms for commercial use.

---

## 🎯 Integration

The bridge works exactly like before:

**approval-gateway/.env:**
```bash
PHOTON_BASE_URL=http://localhost:5173
PHOTON_TO=+YOUR_NUMBER
```

**Same API, better implementation!** ✨

---

## 🚀 You're Ready!

```bash
# Install
cd imessage-bridge && npm install

# Start
npm run dev

# Test
curl 'http://localhost:5173/test?recipient=+YOUR_NUMBER'
```

**Much better than AppleScript!** 📱✨


