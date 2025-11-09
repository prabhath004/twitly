# ✅ iMessage Setup Checklist

**Everything you need to do - check them off!**

---

## 🔒 Permissions (DO THIS FIRST!)

- [ ] Open System Settings → Privacy & Security → Full Disk Access
- [ ] Click "+" and add Terminal (or Cursor/VS Code)
- [ ] Make sure checkbox is ✅ enabled
- [ ] Close Terminal COMPLETELY
- [ ] Reopen Terminal

**⚠️ This is the #1 reason it doesn't work!**

---

## 📦 Dependencies (Already Done!)

- [x] iMessage Bridge dependencies installed
- [x] Config files updated with `tejdeepp0909@gmail.com`
- [x] Scripts created

---

## 🚀 Start Services

### Terminal 1: iMessage Bridge

```bash
cd /Users/tejdeeppathipati/Desktop/twitly/imessage-bridge
npm run dev
```

**✅ Wait for:** `✅ Running on: http://localhost:5173`

### Terminal 2: Approval Gateway

```bash
cd /Users/tejdeeppathipati/Desktop/twitly/approval-gateway
python3 -m uvicorn app.main:app --reload --port 8000
```

**✅ Wait for:** `Server ready on port 8000`

### Terminal 3: Daily Poster

```bash
cd /Users/tejdeeppathipati/Desktop/twitly/daily-poster
python3 -m uvicorn app.main:app --reload --port 8500
```

**✅ Wait for:** `Application startup complete`

### Terminal 4: Frontend

```bash
cd /Users/tejdeeppathipati/Desktop/twitly
npm run dev
```

**✅ Wait for:** `✓ Ready`

---

## 🧪 Test

- [ ] Run: `./TEST_IMESSAGE.sh`
- [ ] Check Messages app - did you get test message?
- [ ] If YES → ✅ Working!
- [ ] If NO → Grant Full Disk Access and restart Terminal

---

## 🎬 Demo

- [ ] Open: http://localhost:3000/dashboard/activity
- [ ] Select "Airstitch"
- [ ] Click "Generate & Post"
- [ ] Check iPhone/Mac Messages
- [ ] Reply: `approve post_xxx`
- [ ] Check Twitter - it's live!

---

## 🆘 If Something Fails

### iMessage Bridge won't start
```bash
# Kill port 5173
./kill-port.sh 5173

# Grant Full Disk Access (see top of checklist)
# Restart Terminal
# Try again
```

### Approval Gateway port in use
```bash
./kill-port.sh 8000
```

### No message received
- Check Messages app is signed in
- Check Full Disk Access is granted
- Check Terminal was restarted after granting access

---

## 📱 Where Messages Appear

✅ Mac Messages app  
✅ iPhone Messages app  
✅ iPad Messages app  
✅ Any device signed in with tejdeepp0909@gmail.com  

**Reply from any device!**

---

## ✨ You're Ready!

Check off each item above and you'll have a working demo! 🚀

