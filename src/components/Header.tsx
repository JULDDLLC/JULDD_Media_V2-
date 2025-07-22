import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../store/cart';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();
  const totalItems = useCartStore(state => state.getTotalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload and test the logo image
  useEffect(() => {
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

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/songs', label: 'Songs' },
    { path: '/shop', label: 'Shop' },
    { path: '/dashboard', label: 'Dashboard' },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
              {logoLoaded && !logoError ? (
                <img
                  src="/logo.png"
                  alt="JULDD Media Logo"
                  className="w-10 h-10 object-contain"
                  style={{ imageRendering: 'auto' }}
                />
              ) : (
                <span className="text-mint font-bold text-xl">J</span>
              )}
            </div>
            <span className="text-xl font-bold text-gradient hover-gradient">
              JULDD Media
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative py-2 px-4 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-mint'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    className="absolute inset-0 glass rounded-lg"
                    layoutId="activeTab"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
            
            {/* Cart Icon */}
            <Link
              to="/shop"
              className="relative p-2 rounded-full glass hover:scale-110 transition-transform"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-pink text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg glass"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden mt-4 p-4 glass rounded-2xl"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`py-2 px-4 rounded-lg transition-all duration-300 ${
                      location.pathname === item.path
                        ? 'text-mint bg-white/10'
                        : 'text-white/80 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-2 py-2 px-4 rounded-lg text-white/80 hover:text-white hover:bg-white/5"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart ({totalItems})</span>
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;