# 🧪 **Complete Testing Guide - Content Actions System**

## ✅ **Step-by-Step Test Plan**

### **STEP 1: Create Database Table** ⏱️ 2 minutes

1. Open your **Supabase Dashboard**
2. Go to **SQL Editor**
3. Copy the entire contents of **`CREATE_CONTENT_ACTIONS_TABLE.sql`** (shown below)
4. Paste and **Run it**

```sql
-- Content Actions Table
-- Stores automated posting actions/goals for brands
-- Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS content_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brand_agent(id) ON DELETE CASCADE,
    
    -- Action Details
    action_type VARCHAR(50) NOT NULL, 
    -- Options: 'announcement', 'engagement', 'excitement', 'promotion', 'education', 'community', 'metrics'
    
    title VARCHAR(255) NOT NULL,
    description TEXT,
    context TEXT, -- Additional details for AI to generate better content
    
    -- Execution Settings
    tone VARCHAR(50) DEFAULT 'engaging',
    -- Options: 'engaging', 'professional', 'casual', 'inspiring', 'humorous'
    
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    -- Options: 'pending', 'completed', 'paused'
    
    -- Result Tracking
    posted_at TIMESTAMP,
    tweet_id VARCHAR(255),
    tweet_url TEXT,
    post_text TEXT, -- Store the actual generated tweet
    
    -- Metadata
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    
    -- Ordering (for manual reordering in UI - future feature)
    sort_order INTEGER DEFAULT 0
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_actions_brand_status 
ON content_actions(brand_id, status, created_at);

CREATE INDEX IF NOT EXISTS idx_actions_status 
ON content_actions(status, created_at);

-- Update timestamp trigger
CREATE OR REPLACE FUNCTION update_actions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_actions_timestamp
    BEFORE UPDATE ON content_actions
    FOR EACH ROW
    EXECUTE FUNCTION update_actions_updated_at();

-- Verify table was created
SELECT 
    table_name,
    column_name,
    data_type
FROM information_schema.columns
WHERE table_name = 'content_actions'
ORDER BY ordinal_position;
```

**Expected Result:** 
- ✅ "Success. No rows returned"
- ✅ Then see list of columns (id, brand_id, action_type, etc.)

---

### **STEP 2: Go to Actions Page** ⏱️ 1 minute

1. Open browser: **`http://localhost:3000/dashboard/actions`**

2. Or click **🎯 Actions** in the left sidebar

**Expected Result:**
- ✅ See "Content Actions" page
- ✅ See "+ New Action" button
- ✅ See "0 pending" in subtitle

---

### **STEP 3: Create Your First Action** ⏱️ 2 minutes

1. Click **"+ New Action"**

2. Fill in the form:
```
Action Type: 📢 Announcement
Goal/Title: "Test - Launch new AI feature"
Description: "Announce our AI-powered analytics dashboard"
Context: "Saves 5 hours per week, real-time insights, free for all users"
Tone: 🎯 Engaging
```

3. Click **"Create Action"**

**Expected Result:**
- ✅ Alert: "✅ Action created successfully!"
- ✅ See your action in the "⏳ Pending" section
- ✅ See action with title and description

---

### **STEP 4: Manual Post Test (Immediate)** ⏱️ 1 minute

**⚠️ IMPORTANT: Make sure Twitter is connected first!**
- Go to `/dashboard/integrations` and connect X if you haven't

**Then:**

1. In the Actions page, find your pending action

2. Click the green **▶️ Play button** (Post Now)

3. Confirm the dialog

**Expected Result:**
- ✅ Alert showing "✅ Posted successfully!"
- ✅ See the generated tweet text
- ✅ Action moves to "✅ Completed" section
- ✅ See "View on X →" link

4. Click **"View on X →"** to see your live tweet!

---

### **STEP 5: Create Multiple Actions** ⏱️ 3 minutes

Create 3 more actions to test the queue:

**Action 2:**
```
Type: 🎯 Engagement
Goal: "Ask about productivity challenges"
Description: "Engage with audience about their pain points"
Context: "We help people save time and be more productive"
Tone: 😊 Casual
```

**Action 3:**
```
Type: 🎉 Excitement
Goal: "Build hype for upcoming sale"
Description: "Tease our Black Friday deal"
Context: "50% off all plans, limited time only"
Tone: ✨ Inspiring
```

**Action 4:**
```
Type: 💼 Promotion
Goal: "Promote free trial"
Description: "Offer 14-day free trial"
Context: "No credit card needed, full access to all features"
Tone: 💼 Professional
```

**Expected Result:**
- ✅ See all 4 actions in Pending section
- ✅ Actions ordered by creation time (oldest first)

---

### **STEP 6: Test Pause/Resume** ⏱️ 1 minute

1. Find an action in Pending

2. Click **⏸️ Pause button**

**Expected Result:**
- ✅ Action moves to "⏸️ Paused" section
- ✅ See orange background color

3. Click **▶️ Play button** in Paused section

**Expected Result:**
- ✅ Action moves back to "⏳ Pending"

---

### **STEP 7: Test Delete** ⏱️ 30 seconds

1. Click **🗑️ Delete button** on any action

2. Confirm deletion

**Expected Result:**
- ✅ Action disappears from list
- ✅ Page refreshes automatically

---

### **STEP 8: Test Automatic Hourly Posting** ⏱️ Wait 1 hour

**Current Status:**
- ✅ Daily-poster service running on port 8500
- ✅ Hourly scheduler active
- ✅ Next auto-post: **Check with command below**

**Check next post time:**
```bash
curl http://localhost:8500/next-post-time
```

**What will happen:**
- At the scheduled time, the oldest pending action will be posted automatically
- Action will move to Completed
- No manual intervention needed!

**To test immediately (don't wait 1 hour):**
```bash
# Trigger the hourly job manually
curl -X POST http://localhost:8500/trigger-daily-job
```

**Expected Result:**
- ✅ Oldest pending action gets posted
- ✅ Appears in Completed section
- ✅ Tweet URL visible

---

### **STEP 9: Verify Complete Flow** ⏱️ 2 minutes

**Check each component:**

1. **Database**
```sql
-- Run in Supabase SQL Editor
SELECT 
    id,
    action_type,
    title,
    status,
    posted_at,
    post_text,
    tweet_url
FROM content_actions
ORDER BY created_at DESC
LIMIT 10;
```

**Expected:** See all your actions with status, post_text for completed ones

2. **Backend API**
```bash
# List actions
curl "http://localhost:8500/?userId=YOUR_BRAND_ID"

# Should return: {"service":"daily-poster","status":"ok",...}
```

3. **Frontend**
- ✅ Can create actions
- ✅ Can see pending/completed/paused sections
- ✅ Can manually trigger posts
- ✅ Can pause/resume/delete

4. **Posted Tweets**
- ✅ Visit X.com and check your posts
- ✅ Verify URL is appended
- ✅ Verify tone matches selection
- ✅ Under 280 characters

---

## 🎯 **Test Scenarios**

### **Scenario 1: Morning Content Pipeline**
```
8:00 AM: Create 5 actions (one for each type)
9:00 AM: Action 1 posts automatically
10:00 AM: Action 2 posts automatically
11:00 AM: Action 3 posts automatically
... and so on
```

### **Scenario 2: Urgent Announcement**
```
1. Create "announcement" action
2. Click "Post Now" immediately
3. See it live on X within seconds
```

### **Scenario 3: Pause During Weekend**
```
Friday: Create 10 actions for next week
Friday: Pause all of them
Monday: Resume all - they'll post hourly
```

---

## 🔍 **Debugging Tips**

### **If actions aren't posting:**

1. **Check service is running:**
```bash
curl http://localhost:8500/
# Should return: {"service":"daily-poster","status":"ok"}
```

2. **Check logs:**
```bash
tail -f /tmp/daily-poster.log
# Should see: "✅ Scheduled hourly action posting"
```

3. **Check Twitter connection:**
- Go to `/dashboard/integrations`
- Verify X shows as "Connected"

4. **Check action exists:**
```sql
SELECT * FROM content_actions WHERE status = 'pending';
```

### **If frontend isn't showing actions:**

1. **Check browser console** (F12)
2. **Refresh the page**
3. **Verify brand_id matches** your current project

---

## ✅ **Success Checklist**

- [ ] Database table created
- [ ] Can access Actions page
- [ ] Can create action
- [ ] Can manually post action (Post Now)
- [ ] Tweet appears on X with URL
- [ ] Action moves to Completed
- [ ] Can create multiple actions
- [ ] Can pause/resume actions
- [ ] Can delete actions
- [ ] Hourly auto-posting works
- [ ] Completed actions show tweet links

---

## 📊 **What You Should See**

### **Completed Action Display:**
```
✅ Completed (3)

┌──────────────────────────────────────────────────┐
│ 📢 Launch new AI feature                         │
│ "Just launched our AI analytics dashboard!       │
│  Real-time insights that save 5 hours/week.      │
│  Try it: yourwebsite.com"                        │
│                                                   │
│ Posted: Nov 9, 2025, 12:03 PM                    │
│ View on X →                                      │
└──────────────────────────────────────────────────┘
```

### **Pending Actions Display:**
```
⏳ Pending (2)

┌──────────────────────────────────────────────────┐
│ 🎯 Ask about productivity challenges              │
│ Engage with audience about their pain points     │
│ Type: engagement  Tone: casual                   │
│                                                   │
│ [▶️ Post Now] [⏸️ Pause] [🗑️ Delete]            │
└──────────────────────────────────────────────────┘
```

---

## 🚀 **Next Steps After Testing**

Once everything works:

1. **Create a content calendar**
   - Plan 10-20 actions for the week
   - Mix different action types
   - Use various tones

2. **Monitor performance**
   - Check which action types get more engagement
   - Adjust tones based on results
   - Refine your descriptions

3. **Scale up**
   - Create actions in batches
   - Let automation handle posting
   - Focus on strategy, not execution

---

**Ready to test?** Start with Step 1! 🎉

