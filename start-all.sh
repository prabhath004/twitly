#!/bin/bash

# Start all services for BrandPilot/Twitly
# Run this in separate terminals or use tmux

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Starting BrandPilot Services"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if running in tmux
if [ -n "$TMUX" ]; then
    echo "✅ Running in tmux - starting all services..."
    
    # Start Daily Poster
    tmux new-window -n "daily-poster" "cd daily-poster && python -m uvicorn app.main:app --reload --port 8500"
    
    # Start Frontend
    tmux new-window -n "frontend" "npm run dev"
    
    echo "✅ Core services started in tmux windows!"
    echo "   Use Ctrl+B then number to switch windows"
    echo ""
    echo "💡 To enable iMessage approval, also start:"
    echo "   iMessage Bridge (port 5173)"
    echo "   Approval Gateway (port 8000)"
    
else
    echo "⚠️  Not running in tmux"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "🎯 REQUIRED Services (Start These):"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Terminal 1 - Daily Poster:"
    echo "cd daily-poster"
    echo "python -m uvicorn app.main:app --reload --port 8500"
    echo ""
    echo "Terminal 2 - Frontend:"
    echo "npm run dev"
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📱 OPTIONAL - iMessage Approval:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "Terminal 3 - iMessage Bridge (optional):"
    echo "cd imessage-bridge"
    echo "npm run dev"
    echo ""
    echo "Terminal 4 - Approval Gateway (optional):"
    echo "cd approval-gateway"
    echo "python -m uvicorn app.main:app --reload --port 8000"
    echo ""
    echo "(Only needed if REQUIRE_APPROVAL=true in daily-poster/.env)"
    echo ""
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Services:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   Daily Poster:     http://localhost:8500 (REQUIRED)"
echo "   Frontend:         http://localhost:3000 (REQUIRED)"
echo "   iMessage Bridge:  http://localhost:5173 (optional - for approvals)"
echo "   Approval Gateway: http://localhost:8000 (optional - for approvals)"
echo ""
echo "🎯 Test at: http://localhost:3000/dashboard/activity"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

