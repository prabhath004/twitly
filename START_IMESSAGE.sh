#!/bin/bash

# One-click start script for iMessage approval flow
# This starts all 4 services you need

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Starting BrandPilot with iMessage"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Your iMessage: tejdeepp0909@gmail.com"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

if [ -n "$TMUX" ]; then
    echo "✅ Running in tmux - starting all services..."
    
    # Start iMessage Bridge
    tmux new-window -n "imessage" "cd imessage-bridge && npm run dev"
    
    # Start Approval Gateway
    tmux new-window -n "approval" "cd approval-gateway && python3 -m uvicorn app.main:app --reload --port 8000"
    
    # Start Daily Poster
    tmux new-window -n "daily-poster" "cd daily-poster && python3 -m uvicorn app.main:app --reload --port 8500"
    
    # Start Frontend
    tmux new-window -n "frontend" "npm run dev"
    
    echo "✅ All services started!"
    echo ""
    echo "Switch between windows:"
    echo "   Ctrl+B then 1,2,3,4"
    
else
    echo "⚠️  Run these commands in SEPARATE terminals:"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Terminal 1️⃣  - iMessage Bridge:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "cd imessage-bridge"
    echo "npm run dev"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Terminal 2️⃣  - Approval Gateway:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "cd approval-gateway"
    echo "python3 -m uvicorn app.main:app --reload --port 8000"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Terminal 3️⃣  - Daily Poster:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "cd daily-poster"
    echo "python3 -m uvicorn app.main:app --reload --port 8500"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "Terminal 4️⃣  - Frontend:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "npm run dev"
    echo ""
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Services will run on:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   iMessage Bridge:  http://localhost:5173"
echo "   Approval Gateway: http://localhost:8000"
echo "   Daily Poster:     http://localhost:8500"
echo "   Frontend:         http://localhost:3000"
echo ""
echo "🎯 Open: http://localhost:3000/dashboard/activity"
echo ""
echo "📱 You'll receive approvals at: tejdeepp0909@gmail.com"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🧪 TO TEST:"
echo "   1. Select 'Airstitch' in Activity Feed"
echo "   2. Click 'Generate & Post'"
echo "   3. Check Messages app - approval arrives!"
echo "   4. Reply: 'approve post_xxx'"
echo "   5. Check Twitter - posted! ✅"
echo ""

