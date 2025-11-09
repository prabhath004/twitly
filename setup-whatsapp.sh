#!/bin/bash

# WhatsApp Approval Setup Script
# Run this to set up WhatsApp approval in one command

set -e  # Exit on error

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📱 WhatsApp Approval Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "This will configure WhatsApp approval for your tweets."
echo ""

# Get user input
read -p "Enter your WhatsApp number (format: +12408890686): " PHONE_NUMBER

if [ -z "$PHONE_NUMBER" ]; then
    echo "❌ Phone number is required!"
    exit 1
fi

# Ensure it has + prefix
if [[ ! "$PHONE_NUMBER" =~ ^\+ ]]; then
    PHONE_NUMBER="+$PHONE_NUMBER"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⚙️  Configuration"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Update approval-gateway/.env
echo "📝 Updating approval-gateway/.env..."
cd approval-gateway

# Check if OWNER_WA_NUMBER exists
if grep -q "OWNER_WA_NUMBER" .env 2>/dev/null; then
    # Update existing line
    sed -i.bak "s|OWNER_WA_NUMBER=.*|OWNER_WA_NUMBER=whatsapp:$PHONE_NUMBER|" .env
    echo "✅ Updated OWNER_WA_NUMBER in approval-gateway/.env"
else
    # Add new line
    echo "" >> .env
    echo "# WhatsApp Approval Number" >> .env
    echo "OWNER_WA_NUMBER=whatsapp:$PHONE_NUMBER" >> .env
    echo "✅ Added OWNER_WA_NUMBER to approval-gateway/.env"
fi

cd ..

# Update daily-poster/.env
echo "📝 Updating daily-poster/.env..."
cd daily-poster

if ! grep -q "REQUIRE_APPROVAL" .env 2>/dev/null; then
    echo "" >> .env
    echo "# WhatsApp Approval Mode" >> .env
    echo "REQUIRE_APPROVAL=false  # Change to 'true' to enable" >> .env
    echo "APPROVAL_GATEWAY_URL=http://localhost:8000" >> .env
    echo "✅ Added approval config to daily-poster/.env"
else
    echo "⚠️  Approval config already exists in daily-poster/.env"
fi

cd ..

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📱 WhatsApp Number: whatsapp:$PHONE_NUMBER"
echo "📝 Mode: Auto-post (REQUIRE_APPROVAL=false)"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 To Enable WhatsApp Approval:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Edit daily-poster/.env"
echo "   Change: REQUIRE_APPROVAL=true"
echo ""
echo "2. Start Approval Gateway (Terminal 1):"
echo "   cd approval-gateway"
echo "   python -m uvicorn app.main:app --reload --port 8000"
echo ""
echo "3. Restart Daily Poster (Terminal 2):"
echo "   cd daily-poster"
echo "   python -m uvicorn app.main:app --reload --port 8500"
echo ""
echo "4. Start Frontend (Terminal 3):"
echo "   npm run dev"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ You're ready to go!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

