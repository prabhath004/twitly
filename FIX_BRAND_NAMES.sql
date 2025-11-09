-- Fix brand_name values in brand_agent table
-- Run this in Supabase SQL Editor to clean up your brand names

-- 1. Update brand_name to use name where brand_name is empty
UPDATE brand_agent
SET brand_name = name
WHERE brand_name IS NULL OR brand_name = '' OR LENGTH(brand_name) = 0;

-- 2. Update brand_name to use name where brand_name is too long (likely contains description)
UPDATE brand_agent
SET brand_name = name
WHERE LENGTH(brand_name) > 100;

-- 3. Verify the changes
SELECT id, name, brand_name, LENGTH(brand_name) as brand_name_length
FROM brand_agent
WHERE is_active = true
ORDER BY created_at DESC;

-- Done! Your brand names should now be clean and short

