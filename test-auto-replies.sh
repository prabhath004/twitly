#!/bin/bash

echo "🧪 Auto-Replies Testing Helper"
echo "================================"
echo ""

# Check if auto-replier is running
echo "1. Checking auto-replier service..."
if curl -s http://localhost:8600/health > /dev/null 2>&1; then
    echo "   ✅ Auto-replier service is running"
    curl -s http://localhost:8600/health | python3 -m json.tool 2>/dev/null || echo "   ⚠️  Service responded but format may be wrong"
else
    echo "   ❌ Auto-replier service is NOT running"
    echo "   Start it with: cd auto-replier && python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8600 --reload"
fi

echo ""
echo "2. Checking test mode..."
curl -s http://localhost:8600/test-mode 2>/dev/null | python3 -m json.tool || echo "   ⚠️  Could not check test mode"

echo ""
echo "3. Next steps:"
echo "   - Get your brand_id from Supabase"
echo "   - Enable auto_reply_enabled in brand_agent table"
echo "   - Set keywords and hashtags"
echo "   - Test monitoring: curl -X POST http://localhost:8600/monitor/YOUR_BRAND_ID"
echo "   - View dashboard: http://localhost:3000/dashboard/auto-replies"
echo ""
echo "📖 Full guide: See TESTING_AUTO_REPLIES.md"
