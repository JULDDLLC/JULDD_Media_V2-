import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Sparkles, Music, Shirt } from 'lucide-react';
import { Link } from 'react-router-dom';
import CharacterTicker from '../components/CharacterTicker';

const Home: React.FC = () => {
  const featuresRef = useRef(null);
  const isInView = useInView(featuresRef, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Music,
      title: 'AI-Animated Songs',
      description: 'Magical musical journeys that bring characters to life',
      link: '/songs'
    },
    {
      icon: Shirt,
      title: 'Custom Merch',
      description: 'Unique products featuring your favorite characters',
      link: '/shop'
    },
    {
      icon: Sparkles,
      title: 'Character Stories',
      description: 'Meet the amazing cast of JULDD Media universe',
      link: '/about'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url('/adventure panda.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          {/* Enhanced Glassmorphic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-midnight/85 via-midnight/70 to-midnight/85 backdrop-blur-[3px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/95 via-transparent to-midnight/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/80 via-transparent to-midnight/80" />
          
          {/* Additional glassmorphic elements */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-mint/5 backdrop-blur-sm border border-white/10" />
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-pink/5 backdrop-blur-sm border border-white/10" />
          </div>
        </div>

        {/* Hero Content */}
        <motion.div
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {/* Main glass card container */}
          <div className="glass rounded-3xl p-8 md:p-12 mb-8 shadow-2xl">
            <motion.h1
              className="text-6xl md:text-8xl font-bold text-gradient mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              Imagination in Motion
            </motion.h1>
            
            <motion.p
              className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Where creativity meets technology to create magical experiences <br /> for children and families
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              <Link
                to="/songs"
                className="btn-gradient px-8 py-4 rounded-full text-white font-bold flex items-center space-x-2 text-lg shadow-2xl hover:shadow-mint/25 transition-all duration-300"
              >
                <Play className="w-6 h-6" />
                <span>Explore Songs</span>
              </Link>
              
              <Link
                to="/shop"
                className="glass px-8 py-4 rounded-full text-white font-bold hover:scale-105 transition-transform text-lg shadow-xl border border-white/20"
              >
                Shop Merch
              </Link>
            </motion.div>
          </div>

          {/* Adventure tagline */}
          <motion.div
            className="glass rounded-2xl px-6 py-3 inline-block"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <p className="text-mint font-semibold text-lg">
              🐼 Ready for an Adventure? Let's Go! 🌟
            </p>
          </motion.div>
        </motion.div>

        {/* Enhanced Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 rounded-full bg-mint/15 backdrop-blur-md border border-white/20 shadow-xl"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
        
        <motion.div
          className="absolute bottom-32 right-16 w-16 h-16 rounded-full bg-pink/15 backdrop-blur-md border border-white/20 shadow-xl"
          animate={{
            y: [0, -15, 0],
            rotate: [360, 180, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />

        {/* Additional Adventure-themed floating elements */}
        <motion.div
          className="absolute top-1/3 right-1/4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
            rotate: [0, 360, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          🎒
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 left-1/3 w-10 h-10 rounded-full bg-gradient-to-r from-mint/20 to-pink/20 backdrop-blur-sm flex items-center justify-center text-xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            rotate: [0, -360, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          🗺️
        </motion.div>

        <motion.div
          className="absolute top-1/2 left-1/6 w-8 h-8 rounded-full bg-gradient-to-r from-pink/20 to-mint/20 backdrop-blur-sm flex items-center justify-center text-lg"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          ⭐
        </motion.div>
      </section>

      {/* Character Ticker */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gradient mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Meet Our Characters
          </motion.h2>
          <CharacterTicker />
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-gradient mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            What We Create
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Link
                    to={feature.link}
                    className="block p-8 glass hover:scale-105 transition-all duration-300 card-tilt group"
                  >
                    <div className="text-center">
                      <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-mint/20 to-pink/20 mb-6 group-hover:scale-110 transition-transform">
                        <IconComponent className="w-8 h-8 text-mint" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-mint/10 via-transparent to-pink/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Ready to Join the Adventure?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Discover a world where imagination knows no bounds and every story becomes a magical journey.
            </p>
            <Link
              to="/about"
              className="btn-gradient px-12 py-4 rounded-full text-white font-bold text-xl hover:scale-105 transition-transform inline-block"
            >
              Meet the Team
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;