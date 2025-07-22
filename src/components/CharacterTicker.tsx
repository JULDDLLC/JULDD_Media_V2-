import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { motion } from 'framer-motion';
import { supabase, type Character } from '../lib/supabase';

const CharacterTicker: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const { data, error } = await supabase
        .from('characters')
        .select('*')
        .order('created_at');

      if (error) {
        console.error('Error fetching characters:', error);
      } else {
        setCharacters(data || []);
      }
    };

    fetchCharacters();
  }, []);

  if (characters.length === 0) {
    return null;
  }

  return (
    <div className="glass py-4 overflow-hidden">
      <Marquee
        gradient={false}
        speed={50}
        pauseOnHover
        className="py-2"
      >
        {characters.map((character, index) => (
          <motion.div
            key={`${character.id}-${index}`}
            className="mx-8 flex items-center space-x-3"
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', bounce: 0.4 }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
              style={{ backgroundColor: character.color }}
            >
              {character.name.charAt(0)}
            </div>
            <div className="text-white">
              <div className="font-bold">{character.name}</div>
              <div className="text-sm opacity-80">{character.slogan}</div>
            </div>
          </motion.div>
        ))}
      </Marquee>
    </div>
  );
};

export default CharacterTicker;