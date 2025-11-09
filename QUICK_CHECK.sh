#!/bin/bash

# Quick diagnostic script - run this and share the output

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 Complete System Check"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "1️⃣  Checking Services..."
echo ""

# Check iMessage Bridge
if curl -s http://localhost:5173/health > /dev/null 2>&1; then
    echo "✅ iMessage Bridge: Running (port 5173)"
    BRIDGE_HEALTH=$(curl -s http://localhost:5173/health)
    echo "   Response: $BRIDGE_HEALTH"
else
    echo "❌ iMessage Bridge: NOT running"
fi

echo ""

# Check Approval Gateway
if curl -s http://localhost:8000/ > /dev/null 2>&1; then
    echo "✅ Approval Gateway: Running (port 8000)"
    GATEWAY_HEALTH=$(curl -s http://localhost:8000/)
    echo "   Response: $GATEWAY_HEALTH"
else
    echo "❌ Approval Gateway: NOT running"
fi

echo ""

# Check Frontend
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend: Running (port 3000)"
else
    echo "❌ Frontend: NOT running (NEEDED for Composio!)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2️⃣  Testing Webhook..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

WEBHOOK_RESPONSE=$(curl -s -X POST http://localhost:8000/webhooks/imessage \
  -H "Content-Type: application/json" \
  -d '{
    "event": "new_message",
    "message": {
      "sender": "tejdeepp0909@gmail.com",
      "text": "generate and post about productivity"
    }
  }')

echo "Webhook Response:"
echo "$WEBHOOK_RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$WEBHOOK_RESPONSE"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  What You Need to Check:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "A. Run this SQL in Supabase:"
echo ""
echo "   SELECT id, brand_name, user_id, owner_imessage, is_active"
echo "   FROM brand_agent"
echo "   WHERE owner_imessage = 'tejdeepp0909@gmail.com';"
echo ""
echo "   Share the results!"
echo ""
echo "B. Does Activity Feed 'Generate & Post' work?"
echo "   - Go to: http://localhost:3000/dashboard/activity"
echo "   - Select a brand"
echo "   - Click 'Generate & Post'"
echo "   - Does it post to Twitter?"
echo ""
echo "C. Check Terminal 2 (Approval Gateway) logs"
echo "   - Send a message via iMessage"
echo "   - What logs appear?"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Share this output + answers to A, B, C"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

