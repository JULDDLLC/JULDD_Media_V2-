/*
  # Initial JULDD Media Database Schema

  1. New Tables
    - `characters` - Character slogans for ticker
    - `cofounders` - Team member profiles
    - `songs` - Music content with TTS samples
    - `products` - Merchandise items
    - `orders` - Purchase records
    - `newsletter` - Email subscriptions

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for public read access
    - Protect admin data with authenticated user policies
*/

-- Characters table for ticker
CREATE TABLE IF NOT EXISTS characters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slogan text NOT NULL,
  color text DEFAULT '#00FFB0',
  created_at timestamptz DEFAULT now()
);

-- Cofounders table
CREATE TABLE IF NOT EXISTS cofounders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  title text NOT NULL,
  bio text NOT NULL,
  avatar_url text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Songs table
CREATE TABLE IF NOT EXISTS songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  lyrics text NOT NULL,
  background_image_url text,
  sample_audio_url text,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price_cents integer NOT NULL,
  image_url text,
  stripe_price_id text,
  category text DEFAULT 'merch',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text UNIQUE,
  customer_email text,
  total_cents integer NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Newsletter table
CREATE TABLE IF NOT EXISTS newsletter (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  subscribed_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE characters ENABLE ROW LEVEL SECURITY;
ALTER TABLE cofounders ENABLE ROW LEVEL SECURITY;
ALTER TABLE songs ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Characters are viewable by everyone"
  ON characters FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Cofounders are viewable by everyone"
  ON cofounders FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Songs are viewable by everyone"
  ON songs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Active products are viewable by everyone"
  ON products FOR SELECT
  TO public
  USING (is_active = true);

-- Newsletter signup policy
CREATE POLICY "Anyone can subscribe to newsletter"
  ON newsletter FOR INSERT
  TO public
  WITH CHECK (true);

-- Admin policies for authenticated users
CREATE POLICY "Authenticated users can view orders"
  ON orders FOR ALL
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can view newsletter"
  ON newsletter FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample data
INSERT INTO characters (name, slogan, color) VALUES
  ('Luna', 'Dream big, sparkle bright! ✨', '#FF59F8'),
  ('Zephyr', 'Adventure awaits around every corner! 🌟', '#00FFB0'),
  ('Pixel', 'Code your way to creativity! 💫', '#00BFFF'),
  ('Melody', 'Music makes the world go round! 🎵', '#FFD700'),
  ('Cosmo', 'Explore the infinite possibilities! 🚀', '#FF6B6B');

INSERT INTO cofounders (name, title, bio, order_index) VALUES
  ('Alex Chen', 'Creative Director', 'Visionary artist with 10+ years in animation and storytelling. Passionate about bringing characters to life through cutting-edge AI technology.', 1),
  ('Jordan Smith', 'Technical Lead', 'Full-stack developer and AI enthusiast. Specializes in creating seamless user experiences and innovative audio-visual solutions.', 2),
  ('Taylor Brown', 'Music Producer', 'Award-winning composer and sound designer. Masters the art of creating memorable melodies that resonate with children and families.', 3),
  ('Sam Wilson', 'Brand Strategist', 'Marketing maven with expertise in building authentic connections between brands and communities. Drives growth through storytelling.', 4),
  ('Casey Davis', 'Operations Manager', 'Detail-oriented leader ensuring smooth project execution. Coordinates between creative and technical teams to deliver excellence.', 5);

INSERT INTO songs (title, description, lyrics, order_index) VALUES
  ('Rainbow Dreams', 'A magical journey through colors and imagination', '# Rainbow Dreams\n\nVerse 1:\nColors dancing in the sky\nRed and orange flying high\nYellow sunshine, green grass grows\nBlue ocean, purple rose\n\nChorus:\nRainbow dreams, rainbow dreams\nNothing''s quite the way it seems\nEvery color tells a story\nFilled with wonder, filled with glory', 1),
  ('Friendship Song', 'Celebrating the bonds that make us stronger', '# Friendship Song\n\nVerse 1:\nWhen you''re feeling sad and blue\nI''ll be right here next to you\nTogether we can face the day\nIn our special friendship way\n\nChorus:\nFriends forever, through and through\nI''ll always be here loving you\nHand in hand we''ll find our way\nFriendship grows stronger every day', 2),
  ('Space Adventure', 'Blast off into an intergalactic musical journey', '# Space Adventure\n\nVerse 1:\nCountdown starting, engines roar\nBlasting off to explore\nStars and planets all around\nIn space there is no sound\n\nChorus:\nSpace adventure, here we go\nTo places that we''ve never known\nAstronauts brave and true\nThe universe is calling you', 3);

INSERT INTO products (name, description, price_cents, category, stripe_price_id) VALUES
  ('Panda''s Coloring Book', 'Beautiful 32-page coloring book featuring Luna and friends', 97, 'books', 'price_1234567890'),
  ('Character Sticker', 'Digital Download charadter stickers with all your favorite JULDD characters', 97, 'stickers', 'price_0987654321'),
  ('Where''s Panda T-Shirt', 'Soft cotton tee with colorful Rainbow Dreams artwork', 2497, 'apparel', 'price_1122334455'),
  ('Zephyr Adventure Mug', 'Ceramic mug perfect for hot chocolate and imagination', 1599, 'accessories', 'price_5544332211'),
  ('Complete Song Collection', 'Digital download of all JULDD Media songs with bonus content', 999, 'digital', 'price_9988776655');