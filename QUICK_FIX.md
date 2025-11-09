# 🚨 Quick Fix for Your Errors

---

## Error 1: Database Permission

**Error:** `Failed to open database at /Users/tejdeeppathipati/Library/Messages/chat.db`

### Fix (2 minutes):

1. **System Settings** → **Privacy & Security** → **Full Disk Access**
2. Click **"+"** → Add **Terminal** (or your IDE)
3. **Restart Terminal** (close and reopen)
4. Try again: `cd imessage-bridge && npm run dev`

**Read:** `FIX_PERMISSIONS.md` for detailed steps

---

## Error 2: Port 8000 Already in Use

**Error:** `[Errno 48] Address already in use`

### Fix (30 seconds):

```bash
# Kill process on port 8000
lsof -ti:8000 | xargs kill -9

# Or find and kill manually:
lsof -i:8000
# Then kill the PID shown
```

**Then start approval gateway:**
```bash
cd approval-gateway
python3 -m uvicorn app.main:app --reload --port 8000
```

---

## ✅ After Fixing Both

**Start all services:**

```bash
# Terminal 1: iMessage Bridge
cd imessage-bridge
npm run dev

# Terminal 2: Approval Gateway
cd approval-gateway
python3 -m uvicorn app.main:app --reload --port 8000

# Terminal 3: Daily Poster
cd daily-poster
python3 -m uvicorn app.main:app --reload --port 8500

# Terminal 4: Frontend
npm run dev
```

---

## 🧪 Test

```bash
# Test iMessage bridge
curl 'http://localhost:5173/test?recipient=+YOUR_NUMBER'

# Check Messages app - should work! ✅
```


