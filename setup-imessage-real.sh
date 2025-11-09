#!/bin/bash

# iMessage Integration Setup Script (Real - Using AppleScript)
# Run this to set up iMessage approval with your Mac

set -e  # Exit on error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📱 iMessage Integration Setup (Real)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "This uses your Mac's Messages app via AppleScript."
echo ""

# Check if on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo "❌ This only works on macOS!"
    exit 1
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚙️  Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Get user input
echo "Enter your iMessage recipient (phone or Apple ID):"
echo "Examples: +12408890686 or yourname@icloud.com"
read -p "Recipient: " RECIPIENT

if [ -z "$RECIPIENT" ]; then
    echo "❌ Recipient is required!"
    exit 1
fi

# Ensure phone numbers have + prefix
if [[ "$RECIPIENT" =~ ^[0-9] ]]; then
    if [[ ! "$RECIPIENT" =~ ^\+ ]]; then
        RECIPIENT="+$RECIPIENT"
        echo "✅ Added + prefix: $RECIPIENT"
    fi
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 Installing Dependencies"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Install iMessage bridge dependencies
cd imessage-bridge
echo "📦 Installing @photon-ai/imessage-kit..."
if command -v npm &> /dev/null; then
    npm install > /dev/null 2>&1
    echo "✅ SDK installed"
else
    echo "❌ npm not found! Please install Node.js first"
    exit 1
fi
cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚙️  Configuring Services"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Update approval-gateway/.env
echo "📝 Updating approval-gateway/.env..."
cd approval-gateway

if grep -q "PHOTON_BASE_URL" .env 2>/dev/null; then
    # Update existing
    sed -i.bak "s|PHOTON_BASE_URL=.*|PHOTON_BASE_URL=http://localhost:5173|" .env
    sed -i.bak "s|PHOTON_TO=.*|PHOTON_TO=$RECIPIENT|" .env
    echo "✅ Updated iMessage config in approval-gateway/.env"
else
    # Add new
    echo "" >> .env
    echo "# iMessage Configuration" >> .env
    echo "PHOTON_BASE_URL=http://localhost:5173" >> .env
    echo "PHOTON_TO=$RECIPIENT" >> .env
    echo "✅ Added iMessage config to approval-gateway/.env"
fi

cd ..

# Update daily-poster/.env
echo "📝 Updating daily-poster/.env..."
cd daily-poster

if grep -q "REQUIRE_APPROVAL" .env 2>/dev/null; then
    echo "⚠️  Approval config already exists in daily-poster/.env"
else
    echo "" >> .env
    echo "# iMessage Approval Mode" >> .env
    echo "REQUIRE_APPROVAL=false  # Change to 'true' to enable" >> .env
    echo "APPROVAL_GATEWAY_URL=http://localhost:8000" >> .env
    echo "OWNER_IMESSAGE=$RECIPIENT" >> .env
    echo "✅ Added approval config to daily-poster/.env"
fi

cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 iMessage Recipient: $RECIPIENT"
echo "🖥️  Bridge URL: http://localhost:5173"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🧪 Testing iMessage Bridge"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Starting bridge to send test message..."
echo ""

# Start bridge in background briefly for test
cd imessage-bridge
npm run dev > /dev/null 2>&1 &
BRIDGE_PID=$!
cd ..

# Wait for bridge to start
sleep 5

# Send test message
echo "📤 Sending test message to $RECIPIENT..."
curl -s -X POST http://localhost:5173/send \
  -H "Content-Type: application/json" \
  -d "{\"recipient\":\"$RECIPIENT\",\"text\":\"🤖 BrandPilot iMessage Bridge is ready!\"}" \
  > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Test message sent! Check your Messages app."
else
    echo "⚠️  Test failed. Make sure:"
    echo "   1. Messages app is signed in"
    echo "   2. Full Disk Access is granted to Terminal"
    echo "   3. Node.js is installed (npm --version)"
fi

# Stop test bridge
kill $BRIDGE_PID > /dev/null 2>&1

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 Next Steps:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Check Messages app for test message ✅"
echo ""
echo "2. To enable approval mode:"
echo "   Edit: daily-poster/.env"
echo "   Change: REQUIRE_APPROVAL=true"
echo ""
echo "3. Start all services (4 terminals):"
echo ""
echo "   Terminal 1: cd imessage-bridge && npm run dev"
echo "   Terminal 2: cd approval-gateway && python -m uvicorn app.main:app --reload --port 8000"
echo "   Terminal 3: cd daily-poster && python -m uvicorn app.main:app --reload --port 8500"
echo "   Terminal 4: npm run dev"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ iMessage integration ready!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

