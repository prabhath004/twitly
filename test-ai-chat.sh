#!/bin/bash

# Quick test script for AI Chat via iMessage

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 Testing AI Chat via iMessage"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test 1: Check services
echo "1️⃣  Checking services..."
if curl -s http://localhost:5173/health > /dev/null 2>&1; then
    echo "   ✅ iMessage Bridge: Running"
else
    echo "   ❌ iMessage Bridge: Not running"
    echo "   Start it: cd imessage-bridge && npm run dev"
    exit 1
fi

if curl -s http://localhost:8000/ > /dev/null 2>&1; then
    echo "   ✅ Approval Gateway: Running"
else
    echo "   ❌ Approval Gateway: Not running"
    echo "   Start it: cd approval-gateway && python3 -m uvicorn app.main:app --reload --port 8000"
    exit 1
fi

echo ""
echo "2️⃣  Testing webhook directly..."
RESPONSE=$(curl -s -X POST http://localhost:8000/webhooks/imessage \
  -H "Content-Type: application/json" \
  -d '{
    "from": "tejdeepp0909@gmail.com",
    "text": "generate post about productivity"
  }')

if echo "$RESPONSE" | grep -q "ai_chat\|error\|no_brand"; then
    echo "   ✅ Webhook is responding!"
    if echo "$RESPONSE" | grep -q "ai_chat"; then
        echo "   ✅ AI chat processed successfully!"
        echo ""
        echo "   Response preview:"
        echo "$RESPONSE" | python3 -m json.tool 2>/dev/null | head -10 || echo "$RESPONSE" | head -5
    elif echo "$RESPONSE" | grep -q "no_brand"; then
        echo "   ⚠️  No brand found - update database:"
        echo "   UPDATE brand_agent SET owner_imessage = 'tejdeepp0909@gmail.com' WHERE is_active = true;"
    else
        echo "   ⚠️  Error occurred:"
        echo "$RESPONSE" | python3 -m json.tool 2>/dev/null || echo "$RESPONSE"
    fi
else
    echo "   ❌ Webhook failed:"
    echo "$RESPONSE"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3️⃣  Test from Messages app:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "   📱 Open Messages app (iPhone/Mac/iPad)"
echo "   📝 Send to: tejdeepp0909@gmail.com"
echo "   💬 Message: 'generate post about productivity'"
echo ""
echo "   ✅ If you receive a response, everything works!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

