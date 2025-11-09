# 🚀 SIMPLE START - Just Run This

**Your app is ready. Just copy-paste these commands:**

---

## ✅ What Works NOW

- ✅ Activity Feed with brand dropdown
- ✅ Generate & Post button  
- ✅ xAI generates tweets
- ✅ Composio posts to X
- ✅ **Everything is working!**

---

## 🎯 Start Your App (2 Terminals)

### Terminal 1: Backend

```bash
cd /Users/tejdeeppathipati/Desktop/twitly/daily-poster
python -m uvicorn app.main:app --reload --port 8500
```

**You should see:**
```
INFO:     Uvicorn running on http://0.0.0.0:8500
INFO:     Application startup complete.
```

### Terminal 2: Frontend

```bash
cd /Users/tejdeeppathipati/Desktop/twitly
npm run dev
```

**You should see:**
```
✓ Ready in X ms
○ Local: http://localhost:3000
```

---

## 🎮 Use Your App

1. **Open:** http://localhost:3000/dashboard/activity
2. **Select brand:** Choose "Airstitch" from dropdown
3. **Click:** "Generate & Post"
4. **Wait 2-5 seconds** - xAI generates tweet
5. **Check Twitter** - Posted! ✅

---

## 📱 WhatsApp Approval (Optional)

**Want to approve tweets via WhatsApp before posting?**

### Quick Setup:

1. **Edit:** `daily-poster/.env`
   ```bash
   REQUIRE_APPROVAL=true  # Change from false to true
   ```

2. **Edit:** `approval-gateway/.env`
   ```bash
   OWNER_WA_NUMBER=whatsapp:+your-number  # Your WhatsApp number
   ```

3. **Start approval gateway:**
   ```bash
   # Terminal 3:
   cd /Users/tejdeeppathipati/Desktop/twitly/approval-gateway
   python -m uvicorn app.main:app --reload --port 8000
   ```

4. **Restart daily-poster** (Terminal 1)

Now you'll get WhatsApp messages before tweets post!

---

## 🆘 Troubleshooting

### "Port already in use"
```bash
# Kill the process on that port
lsof -ti:8500 | xargs kill -9
lsof -ti:3000 | xargs kill -9
```

### "Module not found"
```bash
# Install Python dependencies
cd daily-poster
pip install -r requirements.txt

# Install Node dependencies
cd /Users/tejdeeppathipati/Desktop/twitly
npm install
```

### "Supabase error"
Check your `.env` files have correct Supabase credentials.

### "Can't post to X"
Make sure you're connected to X via Composio in the frontend.

---

## ✅ That's It!

**Two commands, two terminals, and you're live.** 🚀

```bash
# Terminal 1:
cd daily-poster && python -m uvicorn app.main:app --reload --port 8500

# Terminal 2:  
cd /Users/tejdeeppathipati/Desktop/twitly && npm run dev
```

**Go to Activity Feed and start posting!** ✨

