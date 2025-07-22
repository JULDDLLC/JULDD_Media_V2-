import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { supabase, type Song } from "../lib/supabase";
import SongSection from "../components/SongSection";

const Songs: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  /* ───────────────────────────── FETCH SONGS ───────────────────────────── */
  useEffect(() => {
    const fetchSongs = async () => {
      const { data, error } = await supabase
        .from("songs")
        .select("*")
        .order("order_index");

      if (error) {
        console.error("Error fetching songs:", error);
      } else {
        // --- FIX: The original code filtered out songs without audio, causing an infinite load.
        // This now ensures all songs from the database are displayed.
        setSongs(data || []);
      }
    };

    fetchSongs();
  }, []);

  /* ───────────────────────────── AUTOPLAY THEME SONG ───────────────────────────── */
  useEffect(() => {
    const playMedia = async () => {
      try {
        if (audioRef.current) {
          audioRef.current.volume = 0.3;
          await audioRef.current.play();
          setIsPlaying(true);
        }
        if (videoRef.current) {
          videoRef.current.muted = true;
          await videoRef.current.play();
          setIsVideoLoaded(true);
        }
      } catch (err) {
        console.log("Auto-play prevented by browser:", err);
      }
    };

    const timer = setTimeout(playMedia, 800);
    return () => clearTimeout(timer);
  }, []);

  /* ───────────────────────────── TOGGLES ───────────────────────────── */
  const toggleAudio = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!videoRef.current.muted);
    }
  };

  /* ───────────────────────────── LOADING STATE ───────────────────────────── */
  if (songs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-mint/20 border-t-mint rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60">Loading magical songs...</p>
        </div>
      </div>
    );
  }

  /* ───────────────────────────── RENDER ───────────────────────────── */
  return (
    <div ref={containerRef} className="min-h-screen pt-24">
      {/* THEME AUDIO (JULDD jingle) */}
      <audio ref={audioRef} loop preload="auto" className="hidden">
        <source
          src="https://juldd.tsiprogram.org/wp-content/uploads/2025/06/JULDD-MEDIA.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* BACKGROUND VIDEO */}
      <div className="fixed inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-20"
          loop
          muted
          playsInline
          preload="auto"
        >
          <source
            src="https://juldd.tsiprogram.org/wp-content/uploads/2025/06/fxcraft-video-843469.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-midnight/60" />
      </div>

      {/* MEDIA CONTROLS */}
      <div className="fixed top-28 right-4 z-50 flex flex-col gap-2">
        <motion.button
          onClick={toggleAudio}
          className="p-3 glass rounded-full hover:scale-110 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? "🔊" : "🔇"}
        </motion.button>

        <motion.button
          onClick={toggleMute}
          className="p-3 glass rounded-full hover:scale-110 transition-transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMuted ? "🎥" : "📹"}
        </motion.button>
      </div>

      {/* HEADER */}
      <motion.div
        className="relative z-10 container mx-auto px-4 text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6">
          Musical Adventures
        </h1>
        <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
          Embark on magical journeys through melody and imagination. Each song
          tells a unique story, bringing our beloved characters to life through
          the power of music and AI animation.
        </p>
      </motion.div>

      {/* SONG SECTIONS (only the visible ones) */}
      <div className="relative z-10">
        {songs.map((song, index) => (
          <SongSection key={song.id} song={song} index={index} scrollY={scrollY} />
        ))}
      </div>

      {/* CALL-TO-ACTION */}
      <section className="relative z-10 py-20 bg-gradient-to-r from-mint/10 via-transparent to-pink/10">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-6">
              Want More Music?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive access to new songs,
              behind-the-scenes content, and special character adventures.
            </p>
            <button className="btn-gradient px-12 py-4 rounded-full text-white font-bold text-xl hover:scale-105 transition-transform">
              Get Exclusive Access
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Songs;