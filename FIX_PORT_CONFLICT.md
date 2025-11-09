# 🔧 Fix Port 5173 Conflict

**Port 5173 is already in use by another project**

---

## ✅ Quick Fix (Already Done!)

I already killed the process on port 5173. You can now start the iMessage bridge:

```bash
cd imessage-bridge
npm run dev
```

---

## 🔄 If It Happens Again

### Option 1: Kill the Port (Quick)

```bash
# Kill port 5173
./kill-port.sh 5173

# Or manually:
lsof -ti:5173 | xargs kill -9
```

### Option 2: Use Different Port

**Change the port for iMessage bridge:**

```bash
# Start on different port
PORT=5174 npm run dev

# Or set in .env file
echo "PORT=5174" > imessage-bridge/.env
npm run dev
```

**Then update `approval-gateway/.env`:**
```bash
PHOTON_BASE_URL=http://localhost:5174  # Changed from 5173
```

---

## 🎯 Recommended Ports

| Service | Default Port | Alternative |
|---------|-------------|-------------|
| iMessage Bridge | 5173 | 5174, 5175, 3001 |
| Approval Gateway | 8000 | 8001, 8002 |
| Daily Poster | 8500 | 8501, 8502 |
| Frontend | 3000 | 3001, 3002 |

---

## 🛠️ Helper Script

**Use the kill-port script:**

```bash
# Kill specific port
./kill-port.sh 5173

# It will show what's using it and ask to kill
```

---

## ✅ You're Good Now!

Port 5173 is free. Start the bridge:

```bash
cd imessage-bridge
npm run dev
```

**Should work now!** ✅


