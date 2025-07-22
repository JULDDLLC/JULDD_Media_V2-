import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, type MotionValue } from "framer-motion";
import ReactMarkdown from "react-markdown";
import type { Song } from "../lib/supabase";

interface Props {
  song: Song;
  index: number;
  scrollY: MotionValue<number>;
}

/* Time helper */
const fmt = (s: number) =>
  isNaN(s) ? "0:00" : `${Math.floor(s / 60)}:${("0" + ((s | 0) % 60)).slice(-2)}`;

const SongSection: React.FC<Props> = ({ song, index, scrollY }) => {
  const yOffset = useTransform(scrollY, [0, 1000], [0, -120 * (index + 1)]);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProg] = useState(0);
  const [duration, setDur] = useState(0);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const up = () => setProg(a.currentTime);
    const md = () => setDur(a.duration);
    a.addEventListener("timeupdate", up);
    a.addEventListener("loadedmetadata", md);
    return () => {
      a.removeEventListener("timeupdate", up);
      a.removeEventListener("loadedmetadata", md);
    };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    playing ? a.pause() : a.play();
    setPlaying(!playing);
  };

  const hero = {
    backgroundImage: `url(${song.background_image_url})`,
  } as const;
  
  const bgMode =
    song.title === "Adventure Awaits" || song.title === "Space Song"
      ? "bg-contain bg-top"
      : "bg-cover";

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden px-4 py-24">
      <motion.div className="absolute inset-0 z-0" style={{ y: yOffset }}>
        <div className="absolute inset-0 bg-gradient-to-r from-midnight/80 via-midnight/60 to-midnight/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight via-transparent to-midnight/40" />
      </motion.div>

      <div className="relative z-10 container mx-auto grid lg:grid-cols-2 gap-14 items-start">
        {/*
          FIX: The parent div is now `relative` to create a stacking context.
          This allows us to control the order of the children.
        */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative"
        >
          {/*
            FIX: The image now has `relative` and `z-10`.
            This lifts the image to a higher layer, so the card slides underneath it.
          */}
          {song.background_image_url && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={`relative z-10 w-full aspect-video rounded-2xl overflow-hidden shadow-xl ${bgMode} bg-no-repeat`}
              style={hero}
            />
          )}

          {/* This card is unchanged. The negative margin pulls it up, but it will now go *under* the image. */}
          <div className="glass rounded-3xl p-8 space-y-6 shadow-2xl -mt-10 lg:-mt-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">
              {song.title}
            </h2>
            {song.description && (
              <p className="text-white/80 leading-relaxed">
                {song.description}
              </p>
            )}
            {song.sample_audio_url && (
              <>
                <audio ref={audioRef} src={song.sample_audio_url} preload="auto" />
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={toggle}
                    className="w-14 h-14 flex items-center justify-center rounded-full bg-mint text-midnight text-2xl font-bold shadow-lg hover:scale-110 active:scale-95 transition"
                  >
                    {playing ? "❚❚" : "▶"}
                  </button>
                  <div className="flex-1">
                    <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-mint transition-all"
                        style={{ width: duration ? `${(progress / duration) * 100}%` : "0%" }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/60 mt-1">
                      <span>{fmt(progress)}</span>
                      <span>{fmt(duration)}</span>
                    </div>
                  </div>
                  <a
                    href={song.sample_audio_url}
                    download
                    className="glass px-4 py-2 rounded-full text-sm text-white hover:scale-105 transition"
                  >
                    ⬇
                  </a>
                </div>
              </>
            )}
          </div>
        </motion.div>

        {/* Lyrics Card */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          <div className="glass rounded-3xl p-8 max-h-[70vh] overflow-y-auto shadow-xl">
            <h3 className="text-3xl font-bold text-mint mb-4">Lyrics</h3>
            <div className="prose prose-invert max-w-none">
              <ReactMarkdown>{song.lyrics}</ReactMarkdown>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SongSection;