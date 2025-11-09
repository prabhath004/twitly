# 📝 Environment Configuration for iMessage

## Quick Setup

### approval-gateway/.env

**Add these 3 lines:**
```bash
XAI_API_KEY=your-xai-key-here
PHOTON_BASE_URL=http://localhost:5173
PHOTON_TO=your-apple-id@icloud.com
```

### daily-poster/.env

**Add these 3 lines:**
```bash
REQUIRE_APPROVAL=false                    # Set to true to enable iMessage approval
APPROVAL_GATEWAY_URL=http://localhost:8000
OWNER_IMESSAGE=your-apple-id@icloud.com
```

**That's it!** Replace `your-apple-id@icloud.com` with your actual Apple ID.

---

## Full Config Reference

### approval-gateway/.env (Complete)
```bash
# Server
PORT=8000

# Redis
REDIS_URL=redis://localhost:6379/0

# xAI for AI Chat
XAI_API_KEY=your-xai-key

# Photon iMessage
PHOTON_BASE_URL=http://localhost:5173
PHOTON_TO=your-apple-id@icloud.com

# Twilio (optional)
TWILIO_ACCOUNT_SID=your-sid
TWILIO_AUTH_TOKEN=your-token
TWILIO_WA_NUMBER=whatsapp:+14155238886
OWNER_WA_NUMBER=whatsapp:+1234567890
```

### daily-poster/.env (Complete)
```bash
# xAI
XAI_API_KEY=your-xai-key
XAI_MODEL=grok-3

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# iMessage Approval
REQUIRE_APPROVAL=false
APPROVAL_GATEWAY_URL=http://localhost:8000
OWNER_IMESSAGE=your-apple-id@icloud.com

# Scheduling
POST_TIME_UTC=09:00
```

---

## Modes

### Auto-Post Mode (Current - No Changes Needed)
```bash
REQUIRE_APPROVAL=false
```
✅ Generates and posts immediately  
✅ No iMessage needed  
✅ Works now!  

### iMessage Approval Mode (Optional)
```bash
REQUIRE_APPROVAL=true
```
📱 Sends to iMessage first  
📱 You approve before posting  
📱 Need Photon running  

