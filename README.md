# JULDD Media - Creative Studio Website

A vibrant, responsive React + Vite + Tailwind site for "JULDD Media", a creative studio producing AI-animated children's songs, custom merch, and character-based content. Features glassmorphism design, Supabase integration, and interactive elements.

## ✨ Features

- **Fullscreen Hero** with video overlay and glass card design
- **Dynamic Character Ticker** powered by Supabase data
- **Interactive Cofounder Carousel** with flip animations
- **Parallax Song Sections** with ElevenLabs TTS integration
- **Glassmorphic Product Grid** with Stripe checkout
- **Protected Dashboard** with analytics
- **Custom 404 Page** with animated mascot
- **Mobile-first Responsive Design**

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom glassmorphism components
- **Animations**: Framer Motion
- **Database**: Supabase (Auth, Database, Storage)
- **Payments**: Stripe Checkout
- **State Management**: Zustand
- **Voice Synthesis**: ElevenLabs TTS API
- **UI Components**: Lucide React icons

## 🎨 Design System

### Colors
- **Midnight**: `#001C30` (primary background)
- **Mint**: `#00FFB0` (accent color)
- **Pink**: `#FF59F8` (secondary accent)
- **White**: `#FFFFFF` (text and overlays)

### Glassmorphism Style
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}
```

## 📱 Pages & Routes

### `/` - Home
- Fullscreen hero with video background
- Character ticker with real-time Supabase data
- Feature highlights with animated cards
- Call-to-action sections

### `/about` - Team
- Interactive cofounder carousel (mobile)
- Flip card grid (desktop)
- Mission statement section

### `/songs` - Music Content
- Parallax scroll sections for each song
- Markdown-rendered lyrics
- ElevenLabs TTS preview functionality
- Character-themed backgrounds

### `/shop` - Merchandise
- Product grid with category filtering
- Interactive shopping cart (Zustand)
- Stripe Checkout integration
- Glassmorphic product cards

### `/dashboard` - Analytics (Protected)
- Sales statistics and revenue tracking
- Newsletter subscriber metrics
- Recent orders table
- Quick action cards

### `/404` - Not Found
- Animated panda mascot
- Glitch text effects
- ElevenLabs voice line playback
- Navigation back to safety

## 🗄️ Database Schema

### Characters
```sql
- id: uuid (primary key)
- name: text
- slogan: text
- color: text
- created_at: timestamptz
```

### Cofounders
```sql
- id: uuid (primary key)
- name: text
- title: text
- bio: text
- avatar_url: text (optional)
- order_index: integer
- created_at: timestamptz
```

### Songs
```sql
- id: uuid (primary key)
- title: text
- description: text (optional)
- lyrics: text (markdown)
- background_image_url: text (optional)
- sample_audio_url: text (optional)
- order_index: integer
- created_at: timestamptz
```

### Products
```sql
- id: uuid (primary key)
- name: text
- description: text (optional)
- price_cents: integer
- image_url: text (optional)
- stripe_price_id: text (optional)
- category: text
- is_active: boolean
- created_at: timestamptz
```

### Orders
```sql
- id: uuid (primary key)
- stripe_session_id: text (unique)
- customer_email: text (optional)
- total_cents: integer
- status: text
- created_at: timestamptz
```

### Newsletter
```sql
- id: uuid (primary key)
- email: text (unique)
- subscribed_at: timestamptz
```

## 🔧 Setup Instructions

### 1. Environment Variables
Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# ElevenLabs Configuration (optional)
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
```

### 2. Supabase Setup

1. Create a new Supabase project
2. Run the migration file: `supabase/migrations/create_initial_schema.sql`
3. Set up Row Level Security policies
4. Create a storage bucket named `audio` for TTS files
5. Enable email authentication (optional)

### 3. Stripe Setup

1. Create a Stripe account
2. Set up product prices in Stripe Dashboard
3. Update the `stripe_price_id` fields in the products table
4. Configure webhook endpoints for order completion

### 4. Assets Setup

Place the following files in the `public` directory:
- `favicon.ico` - Site favicon
- `og.jpg` - Open Graph social preview image
- `assets/logo.svg` - Company logo

### 5. Installation & Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

### Build Settings
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18+

### Environment Variables
Ensure all environment variables are set in your deployment platform.

### Database Migrations
Run Supabase migrations in your production environment.

## 📊 Performance

- **Lighthouse Score**: 90+ (optimized for performance)
- **Mobile-first Design**: Responsive breakpoints at 768px and 1024px
- **Image Optimization**: Uses optimized external images
- **Code Splitting**: Automatic route-based code splitting with Vite

## 🎵 Audio Integration

### ElevenLabs TTS
- Generates voice samples for song previews
- Caches audio files in Supabase storage
- Fallback to Web Speech API for demo mode

### Audio Features
- Play button for song samples
- Background music support (placeholder)
- Voice-over for 404 page interactions

## 🛒 E-commerce Features

### Shopping Cart (Zustand)
- Persistent cart state
- Add/remove/update quantities
- Real-time total calculations

### Stripe Integration
- Secure checkout sessions
- Product-specific pricing
- Order completion webhooks

## 📱 Mobile Experience

- **Touch-friendly**: Large tap targets and smooth gestures
- **Responsive Design**: Adapts to all screen sizes
- **Performance Optimized**: Fast loading on mobile networks
- **Accessibility**: Screen reader friendly with proper ARIA labels

## 🎨 Animation Details

### Framer Motion Features
- **Scroll Triggers**: Elements animate when entering viewport
- **Page Transitions**: Smooth navigation between routes
- **Micro-interactions**: Hover states and button feedback
- **Loading States**: Skeleton screens and spinners

### Custom Animations
- Character ticker with pause-on-hover
- Flip card animations for team members
- Parallax scrolling for song sections
- Glitch effects for 404 page

## 🔒 Security

- **Row Level Security**: Enabled on all Supabase tables
- **Input Validation**: Form validation and sanitization
- **CORS Configuration**: Proper cross-origin settings
- **Environment Variables**: Secure API key management

## 📄 License

MIT License - feel free to use this project as a starting point for your own creative studio website.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Built with ❤️ and lots of imagination by the JULDD Media team**

For questions or support, visit our [GitHub repository](https://github.com/julddmedia) or contact us through our social media channels.