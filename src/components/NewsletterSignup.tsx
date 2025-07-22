import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      // Check if we're in demo mode
      const isDemoMode = !import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (isDemoMode) {
        // Demo mode - simulate success
        setTimeout(() => {
          setStatus('success');
          setMessage('Welcome to JULDD Media! 🎵');
          setEmail('');
          setName('');
          setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
        return;
      }

      // Add to newsletter database
      const { error: dbError } = await supabase
        .from('newsletter')
        .insert([{ email }]);

      if (dbError) {
        if (dbError.code === '23505') { // Unique constraint violation
          setStatus('error');
          setMessage('This email is already subscribed!');
        } else {
          throw dbError;
        }
      } else {
        // Send welcome email via Supabase Edge Function
        try {
          const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
          const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
          
          const emailResponse = await fetch(`${supabaseUrl}/functions/v1/send-newsletter-email`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${supabaseAnonKey}`,
            },
            body: JSON.stringify({
              email,
              name: name || null,
            }),
          });

          if (!emailResponse.ok) {
            console.warn('Failed to send welcome email, but subscription was successful');
          }
        } catch (emailError) {
          console.warn('Email service error:', emailError);
          // Don't fail the whole process if email fails
        }

        setStatus('success');
        setMessage('Welcome to JULDD Media! Check your email for a special welcome message! 🎵');
        setEmail('');
        setName('');
        setTimeout(() => {
          setStatus('idle');
          setMessage('');
        }, 5000);
      }
    } catch (error) {
      console.error('Newsletter signup error:', error);
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 3000);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input (Optional) */}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name (optional)"
          className="w-full px-4 py-3 rounded-lg glass text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-mint/50"
          disabled={status === 'loading'}
        />
        
        {/* Email Input */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-3 rounded-lg glass text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-mint/50"
            required
            disabled={status === 'loading'}
          />
          
          <motion.button
            type="submit"
            className="px-6 py-3 btn-gradient rounded-lg text-white font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 min-w-[140px]"
            disabled={status === 'loading'}
            whileHover={{ scale: status === 'loading' ? 1 : 1.05 }}
            whileTap={{ scale: status === 'loading' ? 1 : 0.95 }}
          >
            {status === 'loading' ? (
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : status === 'success' ? (
              <span>✓ Subscribed!</span>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Subscribe</span>
              </>
            )}
          </motion.button>
        </div>
      </form>

      {/* Status Message */}
      {message && (
        <motion.div
          className={`mt-4 p-3 rounded-lg text-center ${
            status === 'success' 
              ? 'bg-mint/20 text-mint border border-mint/30' 
              : 'bg-red-500/20 text-red-300 border border-red-500/30'
          }`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {message}
        </motion.div>
      )}
    </div>
  );
};

export default NewsletterSignup;