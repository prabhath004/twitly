#!/bin/bash

echo "═══════════════════════════════════════════════════════════════════════"
echo "  🧪 TESTING TWITTER POSTING - Quick Verification"
echo "═══════════════════════════════════════════════════════════════════════"
echo ""

# Check if services are running
echo "1. Checking services..."
if lsof -ti:3000 > /dev/null 2>&1; then
    echo "   ✅ Next.js: Running"
else
    echo "   ❌ Next.js: NOT running"
    echo "      Run: npm run dev"
fi

if lsof -ti:8500 > /dev/null 2>&1; then
    echo "   ✅ daily-poster: Running"
else
    echo "   ❌ daily-poster: NOT running"
fi

echo ""
echo "2. Testing API endpoint..."
curl -X POST http://localhost:8500/generate-from-prompt \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello from test script!", "user_id": "test_user"}' \
  2>/dev/null | python3 -c "import sys, json; data=json.load(sys.stdin); print(f\"   Generated: {data.get('post_text', 'N/A')[:50]}...\"); print(f\"   Posted: {data.get('posted', False)}\"); print(f\"   Error: {data.get('error', 'None')}\")"

echo ""
echo "═══════════════════════════════════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "1. Go to: http://localhost:3000/dashboard/activity"
echo "2. Make sure Twitter is connected in Integrations"
echo "3. Try posting a tweet!"
echo ""

