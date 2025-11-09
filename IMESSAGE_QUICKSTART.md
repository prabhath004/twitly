# 📱 iMessage Posting - 3-Minute Setup

**Post to X via iMessage - with AI help!**

---

## ⚡ Quick Setup

### 1. Install Photon (1 min)

```bash
npm install -g photon-imessage-kit
photon start --port 5173
```

### 2. Configure (1 min)

**`approval-gateway/.env`** - Add these lines:
```bash
XAI_API_KEY=your-xai-key-here
PHOTON_BASE_URL=http://localhost:5173
PHOTON_TO=your-apple-id@icloud.com
```

**`daily-poster/.env`** - Add these lines:
```bash
REQUIRE_APPROVAL=true
APPROVAL_GATEWAY_URL=http://localhost:8000
OWNER_IMESSAGE=your-apple-id@icloud.com
```

### 3. Start Services (1 min)

```bash
# Terminal 1
cd approval-gateway && python -m uvicorn app.main:app --reload --port 8000

# Terminal 2  
cd daily-poster && python -m uvicorn app.main:app --reload --port 8500

# Photon already running from step 1
```

**Done!** 🎉

---

## 🎯 How to Use

### Option 1: Approve Generated Posts

1. Click "Generate & Post" in Activity Feed
2. Get iMessage: "🤖 New Post... approve post_123"
3. Reply: `approve post_123`
4. Tweet goes live! ✅

### Option 2: Chat with AI

Text your configured iMessage number:
```
You: generate post about productivity
AI: "Here's a post: 'Top 3 productivity hacks...' approve post_456?"
You: approve post_456
AI: "✅ Posted!"
```

---

## 🔄 Modes

### Auto-Post (No Approval)
```bash
REQUIRE_APPROVAL=false
```
Posts immediately, no iMessage needed

### Approval Mode (iMessage)
```bash
REQUIRE_APPROVAL=true
```
Every post needs your iMessage approval

---

## 💡 Quick Commands

| Command | Action |
|---------|--------|
| `approve post_xxx` | Post it |
| `edit post_xxx: new text` | Change & post |
| `skip post_xxx` | Cancel |
| `generate post about [topic]` | Ask AI |
| `help me with [something]` | Chat with AI |

---

## ✅ What You Can Do

✅ Approve posts via iMessage  
✅ Edit posts before posting  
✅ Skip posts you don't like  
✅ Chat with AI to generate new posts  
✅ Get content ideas  
✅ Post from anywhere (just your phone!)  

---

## 🚀 Test It Now

```bash
# Make sure all 3 services are running
# Then text yourself:

"generate post about AI productivity"

# You'll get an AI-generated post back!
# Reply "approve post_xxx" to post it
```

---

**That's it! You're posting via iMessage now!** 📱✨

