import { createClient } from '@supabase/supabase-js';

// Mock mode for preview - will use real Supabase when configured
const MOCK_MODE = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: any = null;

if (!MOCK_MODE) {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Mock Supabase client for preview
  supabase = {
    from: (table: string) => ({
      select: (columns = '*') => ({
        order: (column?: string, options?: any) => Promise.resolve({ 
          data: getMockData(table), 
          error: null 
        }),
        eq: (column: string, value: any) => ({
          order: (orderColumn?: string, options?: any) => Promise.resolve({ 
            data: getMockData(table).filter((item: any) => item[column] === value), 
            error: null 
          })
        })
      }),
      insert: (data: any) => Promise.resolve({ 
        data: null, 
        error: null 
      })
    }),
    storage: {
      from: (bucket: string) => ({
        list: (path?: string, options?: any) => Promise.resolve({ 
          data: [], 
          error: null 
        }),
        getPublicUrl: (path: string) => ({ 
          data: { publicUrl: '' } 
        }),
        upload: (path: string, file: any, options?: any) => Promise.resolve({ 
          error: null 
        })
      })
    }
  };
}

// Mock data for preview
const getMockData = (table: string) => {
  switch (table) {
    case 'characters':
      return [
        { id: '1', name: 'Luna', slogan: 'Dream big, sparkle bright! ✨', color: '#FF59F8', created_at: new Date().toISOString() },
        { id: '2', name: 'Zephyr', slogan: 'Adventure awaits around every corner! 🌟', color: '#00FFB0', created_at: new Date().toISOString() },
        { id: '3', name: 'Pixel', slogan: 'Code your way to creativity! 💫', color: '#00BFFF', created_at: new Date().toISOString() },
        { id: '4', name: 'Melody', slogan: 'Music makes the world go round! 🎵', color: '#FFD700', created_at: new Date().toISOString() },
        { id: '5', name: 'Cosmo', slogan: 'Explore the infinite possibilities! 🚀', color: '#FF6B6B', created_at: new Date().toISOString() }
      ];
    
    case 'cofounders':
      return [
        {
          id: '1',
          name: 'Dan',
          title: 'Composer & Chief Academic Officer',
          bio: 'I am a composer, performer, educator and disability advocate. I am the Chief Academic Officer for the David Z Foundation where we transform lives through the magic of music. BA in Vocal Performance, MA in Music Composition, Education Specialist credentialed in special education for students with extensive support needs. I love to see people connect, learn and grow.',
          avatar_url: '/dan-profile.jpg',
          order_index: 1,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Julie',
          title: 'Founder & Creative Director',
          bio: 'Founder of JULDD LLC. Designer and creative using AI to create art, animations, music, websites, and full stack apps. Passionate about pushing the boundaries of what\'s possible with artificial intelligence and creative technology.',
          avatar_url: '/julie-profile.jpg',
          order_index: 2,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Vicki (Ruh-Roh)',
          title: 'AI Enthusiast & Automation Expert',
          bio: 'AI Enthusiast | Automation Expert | Information/Knowledge Management Consultant | Always Learning. Specializing in streamlining processes and leveraging AI for maximum efficiency and innovation.',
          avatar_url: '/vicki-profile.jpg',
          order_index: 3,
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Morgen',
          title: 'AI Tool Informant & Crypto Team Leader',
          bio: 'Your AI Tool Informant. Keeping you updated with one tool at a time. Created by @morgenvictoria3. Leading women\'s crypto team in Defcon7 https://defcon-7.com. Expert in emerging AI technologies and blockchain innovation.',
          avatar_url: '/morgen-profile.jpg',
          order_index: 4,
          created_at: new Date().toISOString()
        }
      ];
    
    case 'songs':
      return [
      {
  id: '1',
  title: 'Blast Off Blues',
  description: 'An interstellar adventure in song form!',
  lyrics: `# Blast Off Blues

**Verse 1:**
Put on my helmet  
zip it up tight!  
Put on my helmet  
Ready to ride  
All strapped in  
and ready to go  
Astronauts  
ready to explore  

Countin’ down  
from 3-2-1,  
Hear the engines roar!  
Ready for fun  
3-2-1 we're blasting off  
Let's go find  
an open door  

**Chorus:**  
Flyin’ to the moon!  
Rocket’s blasting off  
Flyin’ to the moon!  
Rocket’s blasting off  
See the planets  
passing by  
On our way  
up to the sky  
...

(full lyrics can go here)`,
  background_image_url: '/BE631FE2-622F-48BD-A2AC-DE029B0987FA.png',
  sample_audio_url: '/Space Song.mp3',
  order_index: 1,
  created_at: new Date().toISOString()
},

        {
          id: '2',
          title: 'Friendship Song',
          description: 'Celebrating the bonds that make us stronger',
          lyrics: '# Friendship Song\n\n**Verse 1:**\nWhen you\'re feeling sad and blue\nI\'ll be right here next to you\nTogether we can face the day\nIn our special friendship way\n\n**Chorus:**\nFriends forever, through and through\nI\'ll always be here loving you\nHand in hand we\'ll find our way\nFriendship grows stronger every day\n\n**Bridge:**\nLaughter shared and tears we\'ve cried\nAlways standing side by side\nNo matter what the world may bring\nFriendship makes our hearts sing',
          background_image_url: 'https://images.pexels.com/photos/1164674/pexels-photo-1164674.jpeg',
          sample_audio_url: null,
          order_index: 2,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Space Adventure',
          description: 'Blast off into an intergalactic musical journey',
          lyrics: '# Space Adventure\n\n**Verse 1:**\nCountdown starting, engines roar\nBlasting off to explore\nStars and planets all around\nIn space there is no sound\n\n**Chorus:**\nSpace adventure, here we go\nTo places that we\'ve never known\nAstronauts brave and true\nThe universe is calling you\n\n**Verse 2:**\nFloating weightless through the void\nAlien friends to be enjoyed\nGalaxies spinning far and wide\nCosmic wonders as our guide',
          background_image_url: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg',
          sample_audio_url: null,
          order_index: 3,
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          title: 'Adventure Awaits',
          description: 'An epic journey of discovery and courage with our brave panda explorer',
          lyrics: '# Adventure Awaits\n\n**Verse 1:**\nPack your bags and lace your boots\nAdventure calls from distant routes\nMountains high and valleys deep\nSecrets that the world will keep\n\n**Chorus:**\nAdventure awaits, adventure awaits\nBeyond the horizon, beyond the gates\nWith courage in heart and dreams so bright\nWe\'ll chase the stars into the night\n\n**Verse 2:**\nThrough the forest, cross the stream\nLiving out our wildest dream\nEvery step a story new\nAdventure\'s calling me and you\n\n**Bridge:**\nWhen the path gets rough and steep\nAnd the journey makes us weep\nRemember why we started here\nAdventure conquers every fear\n\n**Final Chorus:**\nAdventure awaits, adventure awaits\nThe world is ours, we hold the fates\nWith friends beside us, hearts so true\nThere\'s nothing that we cannot do',
          background_image_url: '/adventure-awaits.png',
          sample_audio_url: '/Audio for Adventure Song.mp3',
          order_index: 4,
          created_at: new Date().toISOString()
        }
      ];
    
    case 'products':
      return [
        {
          id: '1',
          name: 'Coloring Book',
          description: 'Beautiful coloring book featuring Panda and friends',
          price_cents: 97,
          image_url: 'https://juldd.tsiprogram.org/wp-content/uploads/2025/07/Screenshot-2025-06-23-155951.png',
          stripe_price_id: 'price_demo_coloring_book',
          category: 'books',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Character Sticker',
          description: 'JULDD characters Digital Sticker Download',
          price_cents: 97,
          image_url: 'https://juldd.tsiprogram.org/wp-content/uploads/2025/03/Untitled-design-9.png',
          stripe_price_id: 'price_demo_stickers',
          category: 'stickers',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          name: 'Panda T-Shirt',
          description: 'Soft cotton tee with colorful Wheres Panda?',
          price_cents: 2497,
          image_url: 'https://juldd.tsiprogram.org/wp-content/uploads/2025/07/panda_tshirt.png',
          stripe_price_id: 'price_demo_tshirt',
          category: 'apparel',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '4',
          name: 'Wheres Panda',
          description: 'Adventures Across America Digital Book',
          price_cents: 297,
          image_url: 'https://juldd.tsiprogram.org/wp-content/uploads/2025/07/wheres_panda-1.png',
          stripe_price_id: 'price_demo_mug',
          category: 'accessories',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '5',
          name: 'Complete Song Collection',
          description: 'Digital download of all JULDD Media songs with bonus content',
          price_cents: 999,
          image_url: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg',
          stripe_price_id: 'price_demo_songs',
          category: 'digital',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '6',
          name: 'Pixel\'s Coding Journal',
          description: 'Interactive journal with coding challenges and creative prompts',
          price_cents: 1799,
          image_url: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg',
          stripe_price_id: 'price_demo_journal',
          category: 'books',
          is_active: true,
          created_at: new Date().toISOString()
        },
        {
          id: '7',
          name: 'Adventure Awaits Poster',
          description: 'Beautiful poster featuring our brave panda explorer ready for adventure',
          price_cents: 197,
          image_url: 'https://juldd.tsiprogram.org/wp-content/uploads/2025/07/7b90d88d-4896-4625-a2ca-7843e745d2b0.png',
          stripe_price_id: 'price_demo_poster',
          category: 'art',
          is_active: true,
          created_at: new Date().toISOString()
        }
      ];
    
    case 'orders':
      return [
        {
          id: '1',
          stripe_session_id: 'cs_demo_12345',
          customer_email: 'parent@example.com',
          total_cents: 2499,
          status: 'completed',
          created_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
        },
        {
          id: '2',
          stripe_session_id: 'cs_demo_67890',
          customer_email: 'family@example.com',
          total_cents: 1299,
          status: 'completed',
          created_at: new Date(Date.now() - 172800000).toISOString() // 2 days ago
        },
        {
          id: '3',
          stripe_session_id: 'cs_demo_11111',
          customer_email: 'teacher@school.edu',
          total_cents: 3598,
          status: 'completed',
          created_at: new Date(Date.now() - 259200000).toISOString() // 3 days ago
        }
      ];
    
    case 'newsletter':
      return [
        { id: '1', email: 'fan1@example.com', subscribed_at: new Date().toISOString() },
        { id: '2', email: 'fan2@example.com', subscribed_at: new Date().toISOString() },
        { id: '3', email: 'fan3@example.com', subscribed_at: new Date().toISOString() }
      ];
    
    default:
      return [];
  }
};

export { supabase };

// Types
export interface Character {
  id: string;
  name: string;
  slogan: string;
  color: string;
  created_at: string;
}

export interface Cofounder {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar_url?: string;
  order_index: number;
  created_at: string;
}

export interface Song {
  id: string;
  title: string;
  description?: string;
  lyrics: string;
  background_image_url?: string;
  sample_audio_url?: string;
  order_index: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price_cents: number;
  image_url?: string;
  stripe_price_id?: string;
  category: string;
  is_active: boolean;
  created_at: string;
}

export interface Order {
  id: string;
  stripe_session_id?: string;
  customer_email?: string;
  total_cents: number;
  status: string;
  created_at: string;
}

export interface NewsletterSubscription {
  id: string;
  email: string;
  subscribed_at: string;
}