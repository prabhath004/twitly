# ⚡ **Quick Reference - Content Actions System**

## 🔗 **URLs**

- **Actions Page:** `http://localhost:3000/dashboard/actions`
- **Activity Feed:** `http://localhost:3000/dashboard/activity`  
- **Integrations:** `http://localhost:3000/dashboard/integrations`
- **Daily-Poster API:** `http://localhost:8500/`

---

## 📋 **Action Types**

| Type | Emoji | Best For |
|------|-------|----------|
| Announcement | 📢 | Product launches, new features, partnerships |
| Engagement | 🎯 | Questions, polls, discussions |
| Excitement | 🎉 | Teasers, hype, behind-the-scenes |
| Promotion | 💼 | Sales, discounts, offers |
| Education | 📚 | Tips, tutorials, how-tos |
| Community | 🤝 | Customer stories, celebrations |
| Metrics | 📊 | Achievements, milestones |

---

## 🎨 **Tone Options**

| Tone | Emoji | Style |
|------|-------|-------|
| Engaging | 🎯 | Hook readers with curiosity |
| Professional | 💼 | Clear and authoritative |
| Casual | 😊 | Friendly and conversational |
| Inspiring | ✨ | Motivational and uplifting |
| Humorous | 😄 | Light and witty |

---

## 🔧 **Terminal Commands**

```bash
# Check if services are running
curl http://localhost:8500/
curl http://localhost:3000/

# Check next scheduled post time
curl http://localhost:8500/next-post-time

# View daily-poster logs
tail -f /tmp/daily-poster.log

# Restart daily-poster service
lsof -ti:8500 | xargs kill -9
cd /Applications/Cisco/twitly/daily-poster
python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8500 --reload

# Manually trigger hourly job (don't wait!)
curl -X POST http://localhost:8500/trigger-daily-job
```

---

## 🗄️ **Database Queries**

```sql
-- View all actions
SELECT * FROM content_actions ORDER BY created_at DESC;

-- View pending actions
SELECT * FROM content_actions WHERE status = 'pending';

-- View completed actions with tweets
SELECT 
    title,
    post_text,
    tweet_url,
    posted_at
FROM content_actions 
WHERE status = 'completed'
ORDER BY posted_at DESC;

-- Count actions by status
SELECT status, COUNT(*) 
FROM content_actions 
GROUP BY status;
```

---

## 🎯 **Quick Test**

1. **Go to:** `http://localhost:3000/dashboard/actions`
2. **Click:** "+ New Action"
3. **Fill:**
   - Type: Announcement
   - Title: "Test post"
   - Description: "Testing the system"
   - Tone: Engaging
4. **Click:** "Create Action"
5. **Click:** Green ▶️ button (Post Now)
6. **Result:** Tweet posted immediately!

---

## 📊 **Status Meanings**

- **Pending** ⏳ - Waiting to be posted (will post within 1 hour)
- **Completed** ✅ - Already posted to X
- **Paused** ⏸️ - Temporarily stopped (won't auto-post)

---

## 🚨 **Troubleshooting**

**Problem:** Actions not posting  
**Solution:** 
1. Check Twitter is connected (`/dashboard/integrations`)
2. Verify service running (`curl http://localhost:8500/`)
3. Check logs (`tail -f /tmp/daily-poster.log`)

**Problem:** Can't see actions page  
**Solution:**
1. Refresh browser
2. Check Next.js is running (port 3000)
3. Clear browser cache

**Problem:** "Twitter not connected" error  
**Solution:**
1. Go to `/dashboard/integrations`
2. Click "Connect" on X card
3. Authorize the app
4. Try posting again

---

## ⏰ **Automation Schedule**

- **Hourly Actions:** Every 1 hour (e.g., 1:00 PM, 2:00 PM, 3:00 PM...)
- **Daily Posts:** 9:00 AM UTC (if enabled)
- **Runs:** 24/7 automatically
- **Order:** Oldest pending action first

---

## 💡 **Tips**

1. **Be Specific:** More detail in "Context" = Better tweets
2. **Mix Tones:** Don't use same tone for every post
3. **Vary Types:** Mix announcements with engagement
4. **Batch Create:** Make 5-10 actions at once, let automation handle rest
5. **Monitor Results:** Check which tones/types perform best

---

## 📁 **Key Files**

| File | Purpose |
|------|---------|
| `CREATE_CONTENT_ACTIONS_TABLE.sql` | Database schema |
| `CONTENT_ACTIONS_SYSTEM.md` | Complete documentation |
| `TESTING_GUIDE.md` | Step-by-step testing |
| `app/dashboard/actions/page.tsx` | Frontend UI |
| `app/api/actions/*/route.ts` | API endpoints |
| `daily-poster/app/main.py` | Backend service |
| `daily-poster/app/prompts.py` | AI prompt templates |

---

## 🎨 **Example Actions**

```
📢 Announcement:
Title: "Launch new dashboard feature"
Context: "Real-time analytics, 5-minute setup, free for all users"

🎯 Engagement:
Title: "Ask about biggest productivity pain"
Context: "We help teams save 10+ hours/week"

🎉 Excitement:
Title: "Something big coming next week"
Context: "Game-changing AI feature, never seen before"

💼 Promotion:
Title: "Black Friday - 50% off everything"
Context: "Limited to first 100 customers, 48 hours only"
```

---

## ✅ **Pre-Flight Checklist**

Before going live:
- [ ] Database table created
- [ ] Twitter connected
- [ ] Daily-poster service running (port 8500)
- [ ] Next.js running (port 3000)
- [ ] Created and tested one action manually
- [ ] Verified tweet appeared on X
- [ ] Checked URL is appended correctly

---

**Need help?** Check the full docs in `CONTENT_ACTIONS_SYSTEM.md` 📚

