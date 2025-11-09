# 🚀 Quick Setup: AI Chat via iMessage

**Get AI chat working in 2 steps!**

---

## ✅ Step 1: Add Missing Variables to `approval-gateway/.env`

**You already have these in `daily-poster/.env` - just copy them!**

Add to `approval-gateway/.env` (same values as in `daily-poster/.env`):

```bash
# xAI for AI Chat (same as daily-poster)
XAI_API_KEY=your_existing_xai_key
XAI_MODEL=grok-3

# Supabase for brand lookup (same as daily-poster)
SUPABASE_URL=your_existing_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_existing_service_role_key
```

**Note:** These are the SAME variables you already have in `daily-poster/.env` - just copy the values!

---

## ✅ Step 2: Update Database

Set `owner_imessage` for your brand:

```sql
UPDATE brand_agent 
SET owner_imessage = 'tejdeepp0909@gmail.com'
WHERE id = 'your-brand-uuid';
```

**Or in Supabase dashboard:**
1. Go to `brand_agent` table
2. Find your brand row
3. Set `owner_imessage` = `tejdeepp0909@gmail.com`
4. Save

---

## ✅ Step 3: Install Dependencies & Restart

```bash
# Install supabase package
cd approval-gateway
pip install supabase==2.10.0

# Restart approval gateway
# (Stop current process, then:)
python3 -m uvicorn app.main:app --reload --port 8000
```

---

## 🧪 Test It!

**Send an iMessage to yourself:**

Message: `"generate post about productivity"`

**You should receive:**
```
🤖 Here's a post about productivity:

[AI-generated, brand-aware post]
```

---

## ✅ That's It!

**Now you can:**
- `"generate post about X"`
- `"create post about Y"`
- `"help me write a post"`
- `"what should I post about?"`

**All via iMessage!** 📱✨

---

## 🆘 Troubleshooting

### "No brand found"
→ Make sure `owner_imessage` is set in database

### "AI chat not configured"
→ Check `XAI_API_KEY` is in `.env`

### "Module not found: supabase"
→ Run: `pip install supabase==2.10.0`

### Messages not arriving
→ Check iMessage Bridge is running
→ Check message watching started (should auto-start)

---

**Ready to chat with AI? Send a message!** 🚀

