#!/bin/bash

# Quick script to kill processes on specific ports

PORT=${1:-5173}

echo "🔍 Checking port $PORT..."

if lsof -ti:$PORT > /dev/null 2>&1; then
    echo "⚠️  Port $PORT is in use:"
    lsof -i:$PORT
    
    echo ""
    read -p "Kill process on port $PORT? (y/n) " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        lsof -ti:$PORT | xargs kill -9
        echo "✅ Killed process on port $PORT"
    else
        echo "❌ Cancelled"
    fi
else
    echo "✅ Port $PORT is free"
fi


