-- Step 1: Check if owner_imessage column exists, if not add it
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'brand_agent' 
        AND column_name = 'owner_imessage'
    ) THEN
        ALTER TABLE brand_agent ADD COLUMN owner_imessage character varying(255) NULL;
        RAISE NOTICE 'Added owner_imessage column';
    ELSE
        RAISE NOTICE 'owner_imessage column already exists';
    END IF;
END $$;

-- Step 2: See all your active brands (to find the ID)
SELECT 
    id,
    brand_name,
    name,
    owner_imessage,
    is_active
FROM brand_agent
WHERE is_active = true
ORDER BY created_at DESC;

-- Step 3: Update ALL your active brands (if you want to set it for all)
-- UPDATE brand_agent 
-- SET owner_imessage = 'tejdeepp0909@gmail.com'
-- WHERE is_active = true;

-- Step 4: Or update a SPECIFIC brand (replace 'YOUR-BRAND-UUID-HERE' with actual UUID from Step 2)
-- UPDATE brand_agent 
-- SET owner_imessage = 'tejdeepp0909@gmail.com'
-- WHERE id = 'YOUR-BRAND-UUID-HERE';

