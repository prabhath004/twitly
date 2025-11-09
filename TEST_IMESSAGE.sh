#!/bin/bash

# Quick test of iMessage integration

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 Testing iMessage Integration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Test 1: Check iMessage bridge is running
echo "1️⃣  Checking iMessage Bridge..."
if curl -s http://localhost:5173/health > /dev/null 2>&1; then
    echo "   ✅ iMessage Bridge is running"
else
    echo "   ❌ iMessage Bridge not running"
    echo "   Start it: cd imessage-bridge && npm run dev"
    exit 1
fi

# Test 2: Send test message
echo ""
echo "2️⃣  Sending test iMessage to tejdeepp0909@gmail.com..."
RESPONSE=$(curl -s 'http://localhost:5173/test?recipient=tejdeepp0909@gmail.com')

if echo "$RESPONSE" | grep -q "success"; then
    echo "   ✅ Test message sent!"
    echo "   📱 Check your Messages app (Mac/iPhone/iPad)"
else
    echo "   ❌ Failed to send:"
    echo "   $RESPONSE"
    echo ""
    echo "   🔒 Did you grant Full Disk Access?"
    echo "   System Settings → Privacy & Security → Full Disk Access"
    echo "   Add Terminal, restart Terminal, try again"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

