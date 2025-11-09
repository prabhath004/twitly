# 📱 iMessage Bridge - Real SDK

**Using `@photon-ai/imessage-kit` - The real iMessage SDK for macOS**

---

## ✅ What This Is

This is a **Node.js/TypeScript** bridge server that uses the **real** `@photon-ai/imessage-kit` SDK to send and receive iMessages.

**Much better than AppleScript!** ✨

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd /Users/tejdeeppathipati/Desktop/twitly/imessage-bridge
npm install
```

**Note:** This installs `better-sqlite3` for Node.js (required for the SDK).

### 2. Grant Permissions

**IMPORTANT:** The SDK needs **Full Disk Access** to read your Messages database.

1. Open **System Settings** → **Privacy & Security** → **Full Disk Access**
2. Click **"+"** and add:
   - **Terminal** (or iTerm, VS Code, Cursor - whatever you use)
   - **Node.js** (if available)

3. Restart your terminal/IDE

### 3. Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm run build
npm start
```

**You should see:**
```
📱 iMessage Bridge Server
✅ Using: @photon-ai/imessage-kit
✅ Running on: http://localhost:5173
```

### 4. Test It

```bash
# Send test message
curl 'http://localhost:5173/test?recipient=+YOUR_NUMBER'

# Or in browser:
http://localhost:5173/test?recipient=+12408890686
```

**Check your Messages app** - You should get the test message! ✅

---

## 📡 API Endpoints

### Health Check
```bash
GET /health

Response:
{
  "status": "ok",
  "service": "imessage-bridge",
  "sdk": "@photon-ai/imessage-kit"
}
```

### Send Message
```bash
POST /send
Content-Type: application/json

{
  "recipient": "+15551234567",
  "text": "Hello from BrandPilot!"
}

Response:
{
  "status": "sent",
  "recipient": "+15551234567",
  "message": "iMessage sent successfully"
}
```

### Test Message
```bash
GET /test?recipient=+15551234567

Response:
{
  "status": "success",
  "message": "Test message sent to +15551234567"
}
```

### Get Unread Messages
```bash
GET /messages/unread

Response:
{
  "status": "ok",
  "count": 5,
  "messages": [...]
}
```

### Start Watching (Webhook)
```bash
POST /watch/start
Content-Type: application/json

{
  "webhookUrl": "http://localhost:8000/webhook/imessage",
  "webhookHeaders": {
    "Authorization": "Bearer token"
  }
}

Response:
{
  "status": "started",
  "message": "Watching for new messages",
  "webhookUrl": "http://localhost:8000/webhook/imessage"
}
```

### Stop Watching
```bash
POST /watch/stop

Response:
{
  "status": "stopped",
  "message": "Stopped watching for messages"
}
```

---

## 🔧 Configuration

### Environment Variables

```bash
# .env file (optional)
PORT=5173
DEBUG=true
```

### SDK Options

The SDK is initialized with:
```typescript
const sdk = new IMessageSDK({
  debug: process.env.DEBUG === 'true',
  maxConcurrent: 5  // Max concurrent sends
});
```

---

## 🧪 Testing

### Test 1: Health Check
```bash
curl http://localhost:5173/health
```

### Test 2: Send Test Message
```bash
curl 'http://localhost:5173/test?recipient=+YOUR_NUMBER'
```

### Test 3: Send Custom Message
```bash
curl -X POST http://localhost:5173/send \
  -H "Content-Type: application/json" \
  -d '{
    "recipient": "+YOUR_NUMBER",
    "text": "Hello from BrandPilot!"
  }'
```

---

## 📱 Recipient Format

**Phone Numbers:**
```
+12408890686        ✅ Correct
+15551234567        ✅ Correct
```

**Apple IDs:**
```
user@icloud.com     ✅ Correct
friend@gmail.com    ✅ Correct (if they use iMessage)
```

---

## 🆘 Troubleshooting

### "Permission denied" or "Cannot access database"

**Solution:** Grant Full Disk Access:
1. System Settings → Privacy & Security → Full Disk Access
2. Add Terminal/Node.js
3. Restart terminal

### "Module not found: better-sqlite3"

**Solution:**
```bash
npm install better-sqlite3
```

**Note:** On macOS, you may need:
```bash
brew install python-setuptools
```

### "SDK initialization failed"

**Check:**
1. You're on macOS
2. Messages app is signed in
3. Full Disk Access is granted
4. Database exists: `~/Library/Messages/chat.db`

### "Recipient not found"

The SDK will still try to send, but the message may fail if:
- Recipient isn't in your contacts
- Phone number format is wrong
- Apple ID doesn't exist

---

## 🔄 Integration with Approval Gateway

The approval gateway calls this bridge at:
```
POST http://localhost:5173/send
```

**Configuration in `approval-gateway/.env`:**
```bash
PHOTON_BASE_URL=http://localhost:5173
PHOTON_TO=+YOUR_NUMBER
```

---

## 📚 SDK Features

This bridge uses `@photon-ai/imessage-kit` which supports:

- ✅ **Send text messages**
- ✅ **Send images** (local files or URLs)
- ✅ **Send files** (PDF, CSV, VCF, etc.)
- ✅ **Read messages** (unread, filtered, etc.)
- ✅ **Real-time watching** (webhook support)
- ✅ **Batch sending**
- ✅ **Message chain processing**
- ✅ **Plugin system**

**For full SDK docs:** https://github.com/photon-hq/imessage-kit

---

## 🚀 Production Notes

- Keep the server running in the background
- Use `pm2` or `systemd` for process management
- Monitor logs for errors
- The SDK handles database connections automatically

---

## ✅ You're Ready!

```bash
# Install
npm install

# Start
npm run dev

# Test
curl 'http://localhost:5173/test?recipient=+YOUR_NUMBER'
```

**Check Messages app - it works!** 📱✨
