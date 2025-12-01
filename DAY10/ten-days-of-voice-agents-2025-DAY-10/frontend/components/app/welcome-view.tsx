// components/app/welcome-view.tsx → FINAL CLEAN & LUXURY (NO TEXT OVERLAYS)
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/livekit/button';

function WelcomeImage() {
  return (
    <svg
      width="90"
      height="90"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-8 text-emerald-400 drop-shadow-2xl"
    >
      <path
        d="M15 24V40C15 40.7957 14.6839 41.5587 14.1213 42.1213C13.5587 42.6839 12.7956 43 12 43C11.2044 43 10.4413 42.6839 9.87868 42.1213C9.31607 41.5587 9 40.7957 9 40V24C9 23.2044 9.31607 22.4413 9.87868 21.8787C10.4413 21.3161 11.2044 21 12 21C12.7956 21 13.5587 21.3161 14.1213 21.8787C14.6839 22.4413 15 23.2044 15 24ZM22 5C21.2044 5 20.4413 5.31607 19.8787 5.87868C19.3161 6.44129 19 7.20435 19 8V56C19 56.7957 19.3161 57.5587 19.8787 58.1213C20.4413 58.6839 21.2044 59 22 59C22.7956 59 23.5587 58.6839 24.1213 58.1213C24.6839 57.5587 25 56.7957 25 56V8C25 7.20435 24.6839 6.44129 24.1213 5.87868C23.5587 5.31607 22.7956 5 22 5ZM32 13C31.2044 13 30.4413 13.3161 29.8787 13.8787C29.3161 14.4413 29 15.2044 29 16V48C29 48.7957 29.3161 49.5587 29.8787 50.1213C30.4413 50.6839 31.2044 51 32 51C32.7956 51 33.5587 50.6839 34.1213 50.1213C34.6839 49.5587 35 48.7957 35 48V16C35 15.2044 34.6839 14.4413 34.1213 13.8787C33.5587 13.3161 32.7956 13 32 13ZM42 21C41.2043 21 40.4413 21.3161 39.8787 21.8787C39.3161 22.4413 39 23.2044 39 24V40C39 40.7957 39.3161 41.5587 39.8787 42.1213C40.4413 42.6839 41.2043 43 42 43C42.7957 43 43.5587 42.6839 44.1213 42.1213C44.6839 41.5587 45 40.7957 45 40V24C45 23.2044 44.6839 22.4413 44.1213 21.8787C43.5587 21.3161 42.7957 21 42 21ZM52 17C51.2043 17 50.4413 17.3161 49.8787 17.8787C49.3161 18.4413 49 19.2044 49 20V44C49 44.7957 49.3161 45.5587 49.8787 46.1213C50.4413 46.6839 51.2043 47 52 47C52.7957 47 53.5587 46.6839 54.1213 46.1213C54.6839 45.5587 55 44.7957 55 44V20C55 19.2044 54.6839 18.4413 54.1213 17.8787C53.5587 17.3161 52.7957 17 52 17Z"
        fill="currentColor"
      />
    </svg>
  );
}

export const WelcomeView = React.forwardRef<HTMLDivElement, { onStartCall: () => void }>(
  (props, ref) => {
    const [name, setName] = useState('');
    const [started, setStarted] = useState(false);

    const handleStart = () => {
      if (!name.trim()) return;
      setStarted(true);
      setTimeout(() => props.onStartCall(name.trim()), 900);
    };

    return (
      <div
        ref={ref}
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black text-white"
      >
        {/* Soft background glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-purple-900/20" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-black/80 p-12 shadow-2xl ring-1 ring-emerald-400/20 backdrop-blur-2xl">
            {/* No text overlays — clean & minimal */}

            <WelcomeImage />

            <h2 className="mb-3 text-center text-5xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                Ready to Play?
              </span>
            </h2>

            <p className="mb-10 text-center text-lg font-medium text-white/70">
              Enter your name to join the battle
            </p>

            <div className="space-y-6">
              <div>
                <label className="mb-3 block text-center text-sm font-bold tracking-widest text-emerald-400 uppercase">
                  Your Stage Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleStart()}
                  placeholder="Type your name..."
                  className="w-full rounded-2xl border border-emerald-500/40 bg-black/50 px-6 py-5 text-center text-lg font-semibold text-white backdrop-blur-xl transition-all placeholder:text-white/40 focus:ring-4 focus:ring-emerald-400/50 focus:outline-none"
                />
              </div>

              <Button
                onClick={handleStart}
                disabled={!name.trim() || started}
                className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-6 text-2xl font-black tracking-wider text-black uppercase shadow-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <motion.div
                  className="absolute inset-0 bg-white/20"
                  animate={{ x: [-400, 400] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                />
                <span className="relative">{started ? 'Starting...' : "LET'S GO"}</span>
              </Button>
            </div>

            <p className="mt-8 text-center font-mono text-xs tracking-widest text-emerald-400/60 uppercase">
              Press Enter to continue
            </p>
          </div>
        </motion.div>

        {/* Clean loading screen */}
        {started && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
          >
            <p className="animate-pulse text-4xl font-black text-emerald-400 drop-shadow-2xl">
              Getting things ready...
            </p>
          </motion.div>
        )}
      </div>
    );
  }
);

WelcomeView.displayName = 'WelcomeView';
