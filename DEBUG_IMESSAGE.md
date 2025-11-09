# 🔍 Debugging iMessage Integration

**Issues found and fixes:**

---

## 🐛 Problem 1: Messages Being Echoed Back

**Issue:** You see your own messages appearing as received messages.

**Cause:** The iMessage SDK was including your own messages (`isFromMe: true`).

**Fix:** Added check to skip messages from yourself:
```typescript
if (message.isFromMe) {
  return; // Skip own messages
}
```

---

## 🐛 Problem 2: Webhook Format Mismatch

**Issue:** iMessage bridge sends nested format, approval gateway expected flat format.

**Bridge sends:**
```json
{
  "event": "new_message",
  "message": {
    "sender": "...",
    "text": "..."
  }
}
```

**Gateway expected:**
```json
{
  "from": "...",
  "text": "..."
}
```

**Fix:** Updated webhook handler to support both formats.

---

## ✅ How to Test Now

1. **Restart iMessage Bridge** (to apply the fix):
   ```bash
   # Stop current process (Ctrl+C)
   cd imessage-bridge
   npm run dev
   ```

2. **Restart Approval Gateway** (to apply the fix):
   ```bash
   # Stop current process (Ctrl+C)
   cd approval-gateway
   python3 -m uvicorn app.main:app --reload --port 8000
   ```

3. **Send a test message:**
   ```
   generate post about productivity
   ```

4. **Check Terminal 2 (Approval Gateway):**
   - Should see: `📨 Received iMessage from tejdeepp0909@gmail.com: generate post about productivity`
   - Should see: `Processing AI chat request...`
   - Should see: `Brand found: [your brand]`

5. **Check Terminal 1 (iMessage Bridge):**
   - Should see: `📨 New message from tejdeepp0909@gmail.com: ...`
   - Should see: `✅ Message forwarded to webhook`
   - Should NOT see your own messages being processed

---

## 🔍 What to Look For

### ✅ Working Correctly:
- Terminal 1: `📨 New message from...` (only messages FROM others, not your own)
- Terminal 1: `✅ Message forwarded to webhook`
- Terminal 2: `📨 Received iMessage from...`
- Terminal 2: `Processing AI chat request...`
- Terminal 2: `Brand found: [brand name]`
- Terminal 2: `AI response generated`
- Messages app: You receive AI response

### ❌ Not Working:
- Terminal 1: `⏭️ Skipping own message` (this is OK - it's working!)
- Terminal 1: `❌ Webhook error` (check approval gateway is running)
- Terminal 2: No logs (webhook not receiving messages)
- Messages app: No response (check all services are running)

---

## 🚨 Common Issues

### "No response in Messages"
→ Check Terminal 2 logs - is it processing?
→ Check Terminal 1 - is webhook being called?

### "Messages being echoed"
→ Should be fixed now with `isFromMe` check
→ Restart iMessage Bridge to apply fix

### "Webhook error"
→ Check approval gateway is running on port 8000
→ Check webhook URL is correct: `http://localhost:8000/webhooks/imessage`

---

## 🎯 Next Steps

1. **Restart both services** (to apply fixes)
2. **Send test message:** `"generate post about productivity"`
3. **Check logs** in both terminals
4. **Check Messages app** for response

**If still not working, share the terminal logs!** 📋

