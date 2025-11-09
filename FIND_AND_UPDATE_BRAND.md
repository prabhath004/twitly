# 🔍 Find Your Brand ID and Update owner_imessage

**Follow these steps to update your brand correctly:**

---

## ✅ Step 1: Run This Query to See Your Brands

**In Supabase SQL Editor, run:**

```sql
SELECT 
    id,
    brand_name,
    name,
    owner_imessage,
    is_active
FROM brand_agent
WHERE is_active = true
ORDER BY created_at DESC;
```

**This shows:**
- Your brand IDs (the UUIDs you need)
- Brand names
- Current `owner_imessage` value (probably NULL)

---

## ✅ Step 2: Check if `owner_imessage` Column Exists

**If you get an error about column not existing, run this first:**

```sql
ALTER TABLE brand_agent 
ADD COLUMN IF NOT EXISTS owner_imessage character varying(255) NULL;
```

---

## ✅ Step 3: Update Your Brand

**Option A: Update ALL active brands (easiest):**

```sql
UPDATE brand_agent 
SET owner_imessage = 'tejdeepp0909@gmail.com'
WHERE is_active = true;
```

**Option B: Update ONE specific brand (use UUID from Step 1):**

```sql
UPDATE brand_agent 
SET owner_imessage = 'tejdeepp0909@gmail.com'
WHERE id = '54a20da6-15ff-4b6e-b80e-77804db22edb';  -- Replace with your actual UUID
```

---

## ✅ Step 4: Verify It Worked

```sql
SELECT 
    id,
    brand_name,
    owner_imessage
FROM brand_agent
WHERE is_active = true;
```

**You should see `tejdeepp0909@gmail.com` in the `owner_imessage` column!**

---

## 🎯 Quick Copy-Paste (All-in-One)

**Run this to do everything at once:**

```sql
-- Add column if missing
ALTER TABLE brand_agent 
ADD COLUMN IF NOT EXISTS owner_imessage character varying(255) NULL;

-- Update all active brands
UPDATE brand_agent 
SET owner_imessage = 'tejdeepp0909@gmail.com'
WHERE is_active = true;

-- Verify
SELECT id, brand_name, owner_imessage 
FROM brand_agent 
WHERE is_active = true;
```

---

**That's it! Your brand(s) are now configured for iMessage AI chat!** ✅

