import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase, type Cofounder } from '../lib/supabase';

const About: React.FC = () => {
  const [cofounders, setCofounders] = useState<Cofounder[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());

  useEffect(() => {
    const fetchCofounders = async () => {
      const { data, error } = await supabase
        .from('cofounders')
        .select('*')
        .order('order_index');

      if (error) {
        console.error('Error fetching cofounders:', error);
      } else {
        setCofounders(data || []);
      }
    };

    fetchCofounders();
  }, []);

  const toggleFlip = (id: string) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % cofounders.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + cofounders.length) % cofounders.length);
  };

  if (cofounders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-mint/20 border-t-mint rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading team...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
            Meet Our Creative Team
          </h1>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Five passionate creators united by a shared vision: to bring imagination to life through 
            innovative storytelling, cutting-edge technology, and boundless creativity.
          </p>
        </motion.div>

        {/* Desktop Grid View */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-5 gap-8 mb-16">
          {cofounders.map((cofounder, index) => (
            <motion.div
              key={cofounder.id}
              className="relative h-96 cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => toggleFlip(cofounder.id)}
            >
              <div className="relative w-full h-full preserve-3d transition-transform duration-700">
                <div
                  className={`absolute w-full h-full backface-hidden ${
                    flippedCards.has(cofounder.id) ? 'rotate-y-180' : ''
                  }`}
                  style={{ 
                    transform: flippedCards.has(cofounder.id) ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* Front of card */}
                  <div className="w-full h-full glass rounded-2xl p-6 flex flex-col items-center justify-center">
                    {cofounder.avatar_url ? (
                      <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-mint/30">
                        <img
                          src={cofounder.avatar_url}
                          alt={cofounder.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-gradient-to-r from-mint to-pink flex items-center justify-center mb-4">
                        <span className="text-3xl font-bold text-midnight">
                          {cofounder.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-white mb-2 text-center">
                      {cofounder.name}
                    </h3>
                    <p className="text-mint text-center font-semibold">
                      {cofounder.title}
                    </p>
                    <div className="mt-auto text-center">
                      <p className="text-sm text-white/60">Click to flip</p>
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute w-full h-full backface-hidden ${
                    flippedCards.has(cofounder.id) ? '' : 'rotate-y-180'
                  }`}
                  style={{ 
                    transform: flippedCards.has(cofounder.id) ? 'rotateY(0deg)' : 'rotateY(-180deg)',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  {/* Back of card */}
                  <div className="w-full h-full glass rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-gradient mb-3">
                      {cofounder.name}
                    </h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {cofounder.bio}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel View */}
        <div className="lg:hidden">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="glass rounded-2xl p-8 mx-4"
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-center">
                  {cofounders[currentIndex].avatar_url ? (
                    <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-mint/30">
                      <img
                        src={cofounders[currentIndex].avatar_url}
                        alt={cofounders[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-mint to-pink flex items-center justify-center mx-auto mb-6">
                      <span className="text-4xl font-bold text-midnight">
                        {cofounders[currentIndex].name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {cofounders[currentIndex].name}
                  </h3>
                  <p className="text-mint font-semibold mb-6">
                    {cofounders[currentIndex].title}
                  </p>
                  <p className="text-white/80 leading-relaxed">
                    {cofounders[currentIndex].bio}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 glass rounded-full hover:scale-110 transition-transform"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 glass rounded-full hover:scale-110 transition-transform"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {cofounders.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-mint scale-125' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass rounded-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gradient mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              At JULDD Media, we believe that every child deserves access to stories that inspire, 
              educate, and entertain. Through the power of AI animation, original music, and 
              character-driven narratives, we're creating a new generation of content that sparks 
              imagination and brings families together. Our commitment extends beyond entertainment—we're 
              building a creative ecosystem where technology serves humanity's most precious resource: 
              the boundless creativity of young minds.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;