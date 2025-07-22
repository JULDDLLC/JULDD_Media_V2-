/*
  # Update Adventure Awaits Song

  1. Updates
    - Update Adventure Awaits song with new audio file and background image
    - Use local file paths for better performance

  2. Changes
    - Background image: /adventure-awaits.png
    - Audio file: /Audio for Adventure Song.mp3
    - Enhanced description mentioning panda explorer
*/

-- Update the Adventure Awaits song with new content
UPDATE songs 
SET 
  description = 'An epic journey of discovery and courage with our brave panda explorer',
  background_image_url = '/adventure-awaits.png',
  sample_audio_url = '/Audio for Adventure Song.mp3'
WHERE title = 'Adventure Awaits';

-- If the song doesn't exist, insert it
INSERT INTO songs (title, description, lyrics, background_image_url, sample_audio_url, order_index)
SELECT 
  'Adventure Awaits',
  'An epic journey of discovery and courage with our brave panda explorer',
  '# Adventure Awaits

**Verse 1:**
Pack your bags and lace your boots
Adventure calls from distant routes
Mountains high and valleys deep
Secrets that the world will keep

**Chorus:**
Adventure awaits, adventure awaits
Beyond the horizon, beyond the gates
With courage in heart and dreams so bright
We''ll chase the stars into the night

**Verse 2:**
Through the forest, cross the stream
Living out our wildest dream
Every step a story new
Adventure''s calling me and you

**Bridge:**
When the path gets rough and steep
And the journey makes us weep
Remember why we started here
Adventure conquers every fear

**Final Chorus:**
Adventure awaits, adventure awaits
The world is ours, we hold the fates
With friends beside us, hearts so true
There''s nothing that we cannot do',
  '/adventure-awaits.png',
  '/Audio for Adventure Song.mp3',
  4
WHERE NOT EXISTS (
  SELECT 1 FROM songs WHERE title = 'Adventure Awaits'
);

-- Add the Adventure Awaits poster product
INSERT INTO products (name, description, price_cents, image_url, stripe_price_id, category, is_active)
SELECT 
  'Adventure Awaits Poster',
  'Beautiful poster featuring our brave panda explorer ready for adventure',
  1999,
  '/adventure-awaits.png',
  'price_demo_poster',
  'art',
  true
WHERE NOT EXISTS (
  SELECT 1 FROM products WHERE name = 'Adventure Awaits Poster'
);