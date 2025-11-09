# Test iMessage Posting

## Quick Test

### 1. Check Services Are Running

```bash
# Terminal 1: iMessage Bridge (should show "Watching for new messages")
curl http://localhost:5173/health

# Terminal 2: Approval Gateway (should show "ok")
curl http://localhost:8000/health

# Terminal 3: Frontend (should show Next.js)
curl http://localhost:3000
```

### 2. Check Watch Status

```bash
# Should show webhook URL
curl http://localhost:5173/watch/status 2>/dev/null || echo "No status endpoint"
```

### 3. Test from iMessage

**Send this message from your Mac Messages app to yourself (tejdeepp0909@gmail.com):**

```
generate and post about productivity
```

### 4. What Should Happen

1. **iMessage Bridge (Terminal 1)** should show:
   ```
   📨 New message from tejdeepp0909@gmail.com: generate and post about productivity
   📤 Forwarding to webhook: http://localhost:8000/webhooks/imessage
   ✅ Message forwarded to webhook
   ```

2. **Approval Gateway (Terminal 2)** should show:
   ```
   📨 Received iMessage from tejdeepp0909@gmail.com: generate and post about productivity
   ✅ Found Airstitch brand: 54a20da6-15ff-4b6e-b80e-77804db22edb
   📤 Posting to X with brand_id: 54a20da6-15ff-4b6e-b80e-77804db22edb
   ✅ Post successful! Tweet ID: ..., URL: https://x.com/i/status/...
   📱 Sending iMessage response to tejdeepp0909@gmail.com: ✅ Posted to X!...
   ✅ iMessage sent successfully
   ```

3. **Frontend (Terminal 3)** should show:
   ```
   🐦 [POST TWEET] Request received
      User ID: 54a20da6-15ff-4b6e-b80e-77804db22edb
   📋 [POST TWEET] Total connections: 1
   ✅✅✅ [POST TWEET] Tweet posted successfully!
   ```

4. **You should receive an iMessage** with:
   ```
   ✅ Posted to X!

   [Generated tweet text]

   🔗 https://x.com/i/status/[tweet_id]
   ```

## Troubleshooting

### If messages aren't being forwarded:

1. **Check watch is running:**
   ```bash
   curl -X POST http://localhost:5173/watch/start \
     -H "Content-Type: application/json" \
     -d '{"webhookUrl": "http://localhost:8000/webhooks/imessage"}'
   ```

2. **Check iMessage Bridge logs** - should show messages being received

3. **Check Full Disk Access** - Make sure Terminal/Cursor has Full Disk Access in System Settings

### If posting fails:

1. **Check brand_id** - Should be `54a20da6-15ff-4b6e-b80e-77804db22edb` (Airstitch)

2. **Check Composio connection** - Go to Activity Feed and try "Generate & Post" button

3. **Check Approval Gateway logs** - Look for "No active Twitter connection found" errors

### If iMessage response isn't sent:

1. **Check iMessage Bridge `/send` endpoint:**
   ```bash
   curl -X POST http://localhost:5173/send \
     -H "Content-Type: application/json" \
     -d '{"recipient": "tejdeepp0909@gmail.com", "text": "Test message"}'
   ```

2. **Check Approval Gateway logs** - Should show "📱 Sending iMessage response" and "✅ iMessage sent successfully"

## Alternative: Test with "Post This" Command

1. **Generate first:**
   ```
   generate post about AI
   ```

2. **Then post:**
   ```
   post this
   ```

This should post the last generated tweet and send you the link.

