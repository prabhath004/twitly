#!/bin/bash

# Quick fix script for common errors

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔧 Fixing Common Errors"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Fix 1: Kill process on port 8000
echo "1️⃣  Fixing port 8000..."
if lsof -ti:8000 > /dev/null 2>&1; then
    echo "   ⚠️  Port 8000 is in use"
    lsof -ti:8000 | xargs kill -9
    echo "   ✅ Killed process on port 8000"
else
    echo "   ✅ Port 8000 is free"
fi

echo ""

# Fix 2: Check database permissions
echo "2️⃣  Checking Messages database..."
if [ -f ~/Library/Messages/chat.db ]; then
    echo "   ✅ Database exists: ~/Library/Messages/chat.db"
    
    # Try to read it (this will fail if no permissions)
    if [ -r ~/Library/Messages/chat.db ]; then
        echo "   ✅ Database is readable"
    else
        echo "   ⚠️  Database exists but may not be readable"
        echo "   📝 You need Full Disk Access!"
    fi
else
    echo "   ❌ Database not found!"
    echo "   📝 Make sure Messages app is signed in"
fi

echo ""

# Fix 3: Check Full Disk Access
echo "3️⃣  Full Disk Access Check:"
echo ""
echo "   ⚠️  MANUAL STEP REQUIRED:"
echo ""
echo "   1. Open System Settings"
echo "   2. Go to Privacy & Security"
echo "   3. Click Full Disk Access"
echo "   4. Click '+' and add Terminal (or your IDE)"
echo "   5. Restart Terminal"
echo ""

# Check if we can access the database
echo "4️⃣  Testing database access..."
if node -e "require('fs').accessSync(require('os').homedir() + '/Library/Messages/chat.db', require('fs').constants.R_OK)" 2>/dev/null; then
    echo "   ✅ Node.js can access database!"
else
    echo "   ❌ Node.js cannot access database"
    echo "   📝 Grant Full Disk Access to Terminal/Node.js"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Fixes Applied!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Next Steps:"
echo ""
echo "1. Grant Full Disk Access (see step 3 above)"
echo "2. Restart Terminal"
echo "3. Try again:"
echo "   cd imessage-bridge && npm run dev"
echo ""


