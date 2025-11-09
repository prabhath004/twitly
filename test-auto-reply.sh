#!/bin/bash

echo "🧪 Auto-Replies Quick Test"
echo "=========================="
echo ""

# Get brand ID from user
read -p "Enter your brand_id (or press Enter to skip): " BRAND_ID

if [ -z "$BRAND_ID" ]; then
    echo "⚠️  No brand_id provided. Skipping API tests."
    echo ""
    echo "To test:"
    echo "1. Get your brand_id from Supabase"
    echo "2. Enable auto_reply_enabled in brand_agent table"
    echo "3. Run this script again with brand_id"
    exit 0
fi

BASE_URL="http://localhost:8600"

echo "Testing with brand_id: $BRAND_ID"
echo ""

# Check service
echo "1️⃣  Checking service..."
if curl -s "$BASE_URL/health" > /dev/null; then
    echo "   ✅ Service is running"
else
    echo "   ❌ Service not running!"
    echo "   Start: cd auto-replier && python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8600 --reload"
    exit 1
fi

# Check test mode
echo ""
echo "2️⃣  Checking test mode..."
TEST_MODE=$(curl -s "$BASE_URL/test-mode" | python3 -c "import sys, json; print(json.load(sys.stdin)['test_mode'])" 2>/dev/null)
if [ "$TEST_MODE" = "True" ]; then
    echo "   ✅ Test mode is ENABLED (safe)"
else
    echo "   ⚠️  Test mode is DISABLED (will post to X)"
    read -p "   Enable test mode? (y/n): " ENABLE_TEST
    if [ "$ENABLE_TEST" = "y" ]; then
        curl -X POST "$BASE_URL/test-mode/toggle" > /dev/null 2>&1
        echo "   ✅ Test mode enabled"
    fi
fi

# Check brand
echo ""
echo "3️⃣  Checking brand..."
BRAND_CHECK=$(curl -s "$BASE_URL/brands/$BRAND_ID" | python3 -c "import sys, json; d=json.load(sys.stdin); print('enabled' if d.get('brand', {}).get('auto_reply_enabled') else 'disabled')" 2>/dev/null)
if [ "$BRAND_CHECK" = "enabled" ]; then
    echo "   ✅ Auto-reply is enabled for this brand"
else
    echo "   ❌ Auto-reply is NOT enabled"
    echo "   Enable it in Supabase:"
    echo "   UPDATE brand_agent SET auto_reply_enabled = true WHERE id = '$BRAND_ID';"
    exit 1
fi

# Test monitoring
echo ""
echo "4️⃣  Testing monitoring..."
read -p "   Trigger monitoring? (y/n): " TRIGGER_MONITOR
if [ "$TRIGGER_MONITOR" = "y" ]; then
    RESULT=$(curl -s -X POST "$BASE_URL/monitor/$BRAND_ID")
    echo "   Response: $RESULT"
fi

# Test scoring
echo ""
echo "5️⃣  Testing scoring..."
read -p "   Trigger scoring? (y/n): " TRIGGER_SCORE
if [ "$TRIGGER_SCORE" = "y" ]; then
    RESULT=$(curl -s -X POST "$BASE_URL/score/$BRAND_ID")
    echo "   Response: $RESULT"
fi

# Test generation
echo ""
echo "6️⃣  Testing reply generation..."
read -p "   Trigger reply generation? (y/n): " TRIGGER_GEN
if [ "$TRIGGER_GEN" = "y" ]; then
    RESULT=$(curl -s -X POST "$BASE_URL/generate-replies/$BRAND_ID")
    echo "   Response: $RESULT"
fi

echo ""
echo "✅ Testing complete!"
echo ""
echo "📊 View results in dashboard:"
echo "   http://localhost:3000/dashboard/auto-replies"
echo ""
echo "📝 Check database:"
echo "   SELECT * FROM monitored_tweets WHERE brand_id = '$BRAND_ID' ORDER BY created_at DESC LIMIT 5;"
echo "   SELECT * FROM reply_queue WHERE brand_id = '$BRAND_ID' ORDER BY created_at DESC LIMIT 5;"
