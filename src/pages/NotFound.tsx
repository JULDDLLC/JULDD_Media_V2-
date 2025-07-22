import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { playTTSPreview } from '../lib/tts';

const NotFound: React.FC = () => {
  useEffect(() => {
    // Play the TTS message when component mounts
    const timeout = setTimeout(() => {
      playTTSPreview("Oops! This page got lost in the multiverse! Let's get you back home!");
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-12">
      <div className="container mx-auto px-4 text-center">
        {/* Animated 404 */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-8xl md:text-9xl font-bold text-gradient mb-4"
            animate={{ 
              textShadow: [
                '0 0 20px rgba(255, 89, 248, 0.5)',
                '0 0 40px rgba(0, 255, 176, 0.5)',
                '0 0 20px rgba(255, 89, 248, 0.5)'
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            404
          </motion.h1>
          
          <motion.p
            className="text-2xl md:text-3xl font-bold text-white mb-2"
            animate={{ x: [-5, 5, -5] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          >
            Page Lost in the Multiverse
          </motion.p>
        </motion.div>

        {/* Dancing Panda Mascot */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <motion.div
            className="inline-block w-64 h-64 rounded-full bg-gradient-to-br from-mint/20 to-pink/20 backdrop-blur-sm flex items-center justify-center text-8xl"
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            🐼
          </motion.div>
          
          <motion.div
            className="mt-4 glass rounded-2xl p-4 inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <p className="text-white/80 font-semibold">
              "Don't worry, I'll help you find your way back!"
            </p>
          </motion.div>
        </motion.div>

        {/* Glitch Text Effect */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.p
            className="text-xl text-white/80 mb-4"
            animate={{ 
              textShadow: [
                '2px 0 #ff59f8, -2px 0 #00ffb0',
                '-2px 0 #ff59f8, 2px 0 #00ffb0',
                '2px 0 #ff59f8, -2px 0 #00ffb0'
              ]
            }}
            transition={{ duration: 0.1, repeat: Infinity, repeatType: 'reverse' }}
          >
            Looks like this page wandered off on its own adventure!
          </motion.p>
          <p className="text-white/60">
            But don't worry - there's plenty of magic waiting for you back home.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Link
            to="/"
            className="btn-gradient px-8 py-4 rounded-full text-white font-bold flex items-center space-x-2 text-lg hover:scale-105 transition-transform"
          >
            <Home className="w-6 h-6" />
            <span>Return Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="glass px-8 py-4 rounded-full text-white font-bold flex items-center space-x-2 text-lg hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Go Back</span>
          </button>
        </motion.div>

        {/* Floating Particles */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-mint to-pink opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default NotFound;