import React from 'react';
import { Github, Youtube, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import NewsletterSignup from './NewsletterSignup';

// TikTok SVG Icon
const TikTokIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-.88-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.1z"/>
  </svg>
);

const Footer: React.FC = () => {
  const [logoLoaded, setLogoLoaded] = React.useState(false);
  const [logoError, setLogoError] = React.useState(false);

  // Preload and test the logo image
  React.useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setLogoLoaded(true);
      setLogoError(false);
    };
    img.onerror = () => {
      setLogoError(true);
      setLogoLoaded(false);
    };
    img.src = '/logo.png';
  }, []);

  const socialLinks = [
    {
      icon: TikTokIcon,
      href: 'https://tiktok.com/@julddmedia',
      label: 'TikTok'
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/julddmedia',
      label: 'Twitter'
    },
    {
      icon: Github,
      href: 'https://github.com/julddmedia',
      label: 'GitHub'
    },
    {
      icon: Youtube,
      href: 'https://youtube.com/@julddmedia',
      label: 'YouTube'
    }
  ];

  return (
    <footer className="bg-midnight/90 backdrop-blur-lg border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Newsletter Signup */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-2">
              Stay in the Loop!
            </h3>
            <p className="text-white/70 mb-6">
              Get updates on new songs, characters, and exclusive content.
            </p>
            <NewsletterSignup />
          </div>

          {/* Social Links */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-4">Follow Our Journey</h3>
            <div className="flex justify-center md:justify-end space-x-4 mb-6">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full glass hover:scale-110 transition-all duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <IconComponent className="w-6 h-6" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                {logoLoaded && !logoError ? (
                  <img
                    src="/logo.png"
                    alt="JULDD Media Logo"
                    className="w-8 h-8 object-contain"
                    style={{ imageRendering: 'auto' }}
                  />
                ) : (
                  <span className="text-mint font-bold text-lg">J</span>
                )}
              </div>
              <span className="text-xl font-bold text-gradient">JULDD Media</span>
            </div>
            
            <div className="text-center md:text-right">
              <div className="flex flex-wrap justify-center md:justify-end gap-4 mb-2 text-sm">
                <Link 
                  to="/privacy-policy" 
                  className="text-white/60 hover:text-mint transition-colors"
                >
                  Privacy Policy
                </Link>
                <span className="text-white/40">•</span>
                <Link 
                  to="/terms-of-service" 
                  className="text-white/60 hover:text-mint transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
              <p className="text-white/60 text-sm">
                © 2025 JULDD Media. Made with ❤️ and lots of imagination.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;