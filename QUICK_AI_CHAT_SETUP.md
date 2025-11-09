# ⚡ Quick AI Chat Setup

**You already have the env variables - just add them to approval-gateway!**

---

## ✅ What You Need to Do

### Step 1: Copy Variables to `approval-gateway/.env`

**Open `daily-poster/.env` and copy these values:**
- `XAI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

**Add them to `approval-gateway/.env`:**

```bash
# Copy from daily-poster/.env
XAI_API_KEY=<same value>
XAI_MODEL=grok-3
SUPABASE_URL=<same value>
SUPABASE_SERVICE_ROLE_KEY=<same value>
```

**That's it!** You already have everything else configured.

---

## ✅ Step 2: Install Supabase Package

```bash
cd approval-gateway
pip install supabase==2.10.0
```

---

## ✅ Step 3: Update Database

Set `owner_imessage` for your brand:

```sql
UPDATE brand_agent 
SET owner_imessage = 'tejdeepp0909@gmail.com'
WHERE id = 'your-brand-uuid';
```

---

## ✅ Step 4: Restart Approval Gateway

```bash
cd approval-gateway
python3 -m uvicorn app.main:app --reload --port 8000
```

---

## 🧪 Test It!

Send iMessage: `"generate post about productivity"`

You should get AI response! 📱✨

---

**That's all! Just copy the 3 variables from daily-poster/.env to approval-gateway/.env** 🚀

