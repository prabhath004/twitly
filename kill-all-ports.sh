#!/bin/bash

# Kill all services on common ports

echo "🔍 Checking and killing processes on common ports..."
echo ""

PORTS=(5173 8000 8500 3000)

for PORT in "${PORTS[@]}"; do
    PIDS=$(lsof -ti:$PORT 2>/dev/null)
    if [ -n "$PIDS" ]; then
        echo "⚠️  Port $PORT is in use (PIDs: $PIDS)"
        echo "$PIDS" | xargs kill -9 2>/dev/null
        echo "   ✅ Killed processes on port $PORT"
    else
        echo "✅ Port $PORT is free"
    fi
done

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All ports cleared!"
echo ""
echo "Now you can start services:"
echo "  Terminal 1: cd imessage-bridge && npm run dev"
echo "  Terminal 2: cd approval-gateway && python3 -m uvicorn app.main:app --reload --port 8000"
echo "  Terminal 3: cd daily-poster && python3 -m uvicorn app.main:app --reload --port 8500"
echo "  Terminal 4: npm run dev"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

