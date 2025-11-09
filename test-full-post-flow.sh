#!/bin/bash

# Complete test of iMessage → Generate → Post to X flow

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 Testing Full iMessage Post Flow"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Step 1: Check services
echo "1️⃣  Checking services..."
if curl -s http://localhost:5173/health > /dev/null 2>&1; then
    echo "   ✅ iMessage Bridge: Running"
else
    echo "   ❌ iMessage Bridge: Not running"
    exit 1
fi

if curl -s http://localhost:8000/ > /dev/null 2>&1; then
    echo "   ✅ Approval Gateway: Running"
else
    echo "   ❌ Approval Gateway: Not running"
    exit 1
fi

if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "   ✅ Frontend: Running"
else
    echo "   ❌ Frontend: NOT running (needed for Composio!)"
    exit 1
fi

echo ""
echo "2️⃣  Testing webhook with 'generate and post'..."
echo ""

RESPONSE=$(curl -s -X POST http://localhost:8000/webhooks/imessage \
  -H "Content-Type: application/json" \
  -d '{
    "event": "new_message",
    "message": {
      "sender": "tejdeepp0909@gmail.com",
      "text": "generate and post about productivity"
    }
  }')

echo "Response:"
echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  Check Terminal 2 (Approval Gateway) logs for:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   📨 Received iMessage from..."
echo "   🤖 Detected AI chat request..."
echo "   🔍 Looking up brand..."
echo "   ✅ Brand found: [your brand]"
echo "   ✅ Cleaned post (XXX chars): [tweet text]"
echo "   📤 Posting to X with brand_id: ..."
echo "   📤 Post result: {...}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4️⃣  Check Terminal 3 (Frontend) logs for:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   🐦 [POST TWEET] Request received"
echo "   ✅✅✅ [POST TWEET] Tweet posted successfully!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5️⃣  Check Messages app:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   You should receive:"
echo "   '🤖 Generated and posted! [tweet] ✅ [tweet URL]'"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Test complete! Check all logs above."
echo ""

