
# 📱 iMessage Approval Setup

**Get iMessage approval before posting to X (Twitter)!**

---

## 🎯 What This Does

Instead of auto-posting, the system:
1. **Generates a post** using xAI (Grok)
2. **Sends to your iMessage** for approval
3. **You reply** with "approve", "edit", or "skip"
4. **System posts** (or skips) based on your response

---

## 🚀 Setup (5 Steps)

### Step 1: Install Photon iMessage Kit

```bash
# Install Photon (Node.js sidecar for iMessage)
npm install -g photon-imessage-kit

# Or follow: https://github.com/photonhq/imessage-kit
```

### Step 2: Configure Photon

```bash
# Start Photon sidecar (in a separate terminal)
photon start --port 5173
```

Photon will:
- Connect to your Mac's iMessage
- Expose a REST API at `http://localhost:5173`

### Step 3: Configure Approval Gateway

Add to `approval-gateway/.env`:

```bash
# Photon iMessage Kit
PHOTON_BASE_URL=http://localhost:5173
PHOTON_TO=your-apple-id@icloud.com  # Your Apple ID or phone number
```

### Step 4: Configure Daily Poster

Add to `daily-poster/.env`:

```bash
# Enable iMessage approval mode
REQUIRE_APPROVAL=true
APPROVAL_GATEWAY_URL=http://localhost:8000
OWNER_IMESSAGE=your-apple-id@icloud.com  # Same as PHOTON_TO
```

### Step 5: Start Services

```bash
# Terminal 1: Photon iMessage Kit
photon start --port 5173

# Terminal 2: Approval Gateway
cd approval-gateway
python -m uvicorn app.main:app --reload --port 8000

# Terminal 3: Daily Poster
cd daily-poster
python -m uvicorn app.main:app --reload --port 8500

# Terminal 4: Frontend
npm run dev
```

---

## 💬 How to Use

### Automatic Flow:

1. **Daily poster generates a post** (or you click "Generate & Post")
2. **You receive an iMessage:**
   ```
   🤖 Airstitch - New Post
   
   ID: post_abc123
   Platform: X
   
   Post:
   Struggling to keep up with tasks? Let Airstitch help you stay organized 24/7! 
   
   Commands:
   • approve post_abc123
   • edit post_abc123: <your changes>
   • skip post_abc123
   ```

3. **You reply via iMessage:**
   - `approve post_abc123` → Posts immediately
   - `edit post_abc123: Better wording here!` → Posts edited version
   - `skip post_abc123` → Cancels post

4. **System posts to X** and sends you confirmation!

---

## 🎨 Talk to AI via iMessage

You can also have conversations with the AI to generate posts:

### Example Conversation:

**You (via iMessage):**
> Generate a post about our new feature

**System:**
> 🤖 Generated Post
> 
> ID: post_xyz789
> 
> "Just shipped a game-changing feature! Our AI assistant now..."
> 
> approve post_xyz789 or edit?

**You:**
> edit post_xyz789: Just shipped something cool! Our AI assistant...

**System:**
> ✅ Posted! https://twitter.com/i/web/status/123456

---

## 🔧 Advanced: Custom Commands

You can extend the iMessage handler to support custom commands:

```python
# In approval-gateway/app/imessage.py

Commands you can add:
- "generate post about [topic]" → AI generates new post
- "schedule post at 2pm" → Schedule for later
- "show pending posts" → List all pending approvals
- "stats" → Show posting analytics
```

---

## ⚙️ Configuration Options

### Daily Poster `.env`:

```bash
# Approval mode
REQUIRE_APPROVAL=true          # Enable iMessage approval
REQUIRE_APPROVAL=false         # Auto-post without approval

# Approval gateway
APPROVAL_GATEWAY_URL=http://localhost:8000

# Your iMessage
OWNER_IMESSAGE=your-apple-id@icloud.com  # Apple ID
# OR
OWNER_IMESSAGE=+1234567890              # Phone number
```

### Approval Gateway `.env`:

```bash
# Photon iMessage Kit
PHOTON_BASE_URL=http://localhost:5173   # Photon sidecar URL
PHOTON_TO=your-apple-id@icloud.com      # Your iMessage

# Webhook for responses
# Configure Photon to send incoming messages to:
# http://localhost:8000/webhook/imessage-post
```

---

## 🎯 Use Cases

### 1. Manual Approval Mode
- Every post needs your OK
- Perfect for sensitive brands
- Full control

### 2. Hybrid Mode
- Auto-post for daily content
- Approval for replies/sensitive posts
- Best of both worlds

### 3. AI Conversation
- Chat with AI via iMessage
- Generate posts on-demand
- Edit and approve in real-time

---

## 🚀 Quick Commands

### iMessage Commands:

```
approve post_123          → Approve and post immediately
edit post_123: New text   → Edit and post
skip post_123             → Cancel this post

generate post             → Ask AI to create a post
show pending              → List pending approvals
stats                     → Show analytics
```

---

## ✅ Integration Flow

```
Daily Poster
    ↓
Generates Post with xAI
    ↓
    ┌─────────────────────┐
    │ REQUIRE_APPROVAL?   │
    └───┬─────────────┬───┘
        │ YES         │ NO
        ↓             ↓
   iMessage      Post to X
   Approval      (Direct)
        ↓
   You Respond
        ↓
   approval-gateway
   processes decision
        ↓
   Posts to X
   via Composio
```

---

## 🎉 You're Ready!

1. ✅ Approval Gateway has iMessage support
2. ✅ Daily Poster integrated with approval flow
3. ✅ Photon iMessage Kit ready to use

Just:
1. Install Photon
2. Set `REQUIRE_APPROVAL=true`
3. Start all services
4. Get iMessage approvals for every post!

---

## 🔍 Testing

```bash
# 1. Start all services (see Step 5 above)

# 2. Click "Generate & Post" in Activity Feed

# 3. Check your iMessage - you'll get an approval request!

# 4. Reply: "approve post_xxx"

# 5. Check Twitter - post is live! 🎉
```

---

## 💡 Pro Tips

1. **Keep Photon running** - It's the bridge to iMessage
2. **Use Apple ID** - More reliable than phone number
3. **Test with "skip"** first - Make sure flow works
4. **Auto-post daily, approve replies** - Hybrid mode

---

**Want me to help set up Photon or add AI conversation features?** 🚀

