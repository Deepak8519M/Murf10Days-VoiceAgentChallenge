// components/app/welcome-view.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Calendar, HeartPulse, PhoneCall, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/livekit/button';

const apollo = {
  primary: '#1A504C',
  accent: '#00D1C1',
  bg: '#0B1218',
  card: '#111A20',
  text: '#E2E8F0',
};

export const WelcomeView = React.forwardRef<
  HTMLDivElement,
  { startButtonText: string; onStartCall: () => void }
>(({ startButtonText, onStartCall }, ref) => {
  return (
    <div
      ref={ref}
      className="relative min-h-screen w-screen overflow-hidden"
      style={{ backgroundColor: apollo.bg }}
    >
      {/* Top gradient line */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${apollo.primary}, ${apollo.accent})` }}
      />

      {/* Floating glow orbs – now valid syntax */}
      <motion.div
        animate={{ y: ['-15vh', '15vh', '-15vh'] }}
        transition={{ repeat: Infinity, duration: 28, ease: 'easeInOut' }}
        className="pointer-events-none fixed top-[10vh] left-[5vw] h-[50vw] w-[50vw] rounded-full opacity-30 blur-3xl"
        style={{ background: `radial-gradient(circle, ${apollo.accent}40, transparent 70%)` }}
      />
      <motion.div
        animate={{ y: ['15vh', '-15vh', '15vh'] }}
        transition={{ repeat: Infinity, duration: 32, ease: 'easeInOut' }}
        className="pointer-events-none fixed right-[10vw] bottom-[15vh] h-[45vw] w-[45vw] rounded-full opacity-25 blur-3xl"
        style={{ background: `radial-gradient(circle, ${apollo.primary}50, transparent 70%)` }}
      />

      <div className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center"
        >
          <h1
            className="bg-gradient-to-br from-[#1A504C] to-[#00D1C1] bg-clip-text font-black tracking-tighter text-transparent"
            style={{ fontSize: 'clamp(3rem, 10vw, 9rem)', lineHeight: '1' }}
          >
            Daily Health
            <br />
            Check‑in
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mx-auto mt-6 max-w-4xl leading-relaxed font-light text-gray-300"
            style={{ fontSize: 'clamp(1rem, 3.5vw, 2.2rem)' }}
          >
            Your personal voice companion that listens deeply, remembers your journey, and helps you
            grow healthier — one day at a time.
          </motion.p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 120 }}
          className="mt-12"
        >
          <Button
            onClick={onStartCall}
            className="group relative overflow-hidden rounded-full shadow-2xl transition-all duration-500 hover:shadow-[0_0_70px_rgba(0,209,193,0.6)]"
            style={{
              background: `linear-gradient(135deg, ${apollo.primary}, ${apollo.accent})`,
              padding: 'clamp(1rem, 4vw, 3rem) clamp(3rem, 10vw, 8rem)',
              fontSize: 'clamp(1.1rem, 4vw, 2.2rem)',
              minWidth: 'min(80vw, 500px)',
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-4">
              <PhoneCall
                style={{ width: 'clamp(2rem, 6vw, 3.5rem)', height: 'clamp(2rem, 6vw, 3.5rem)' }}
              />
              {startButtonText}
            </span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{ x: ['-150%', '150%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </Button>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-20 grid w-full max-w-6xl grid-cols-2 gap-8 md:grid-cols-4"
        >
          {[
            { icon: HeartPulse, label: 'Mood & Energy' },
            { icon: Calendar, label: 'Daily Check‑ins' },
            { icon: ShieldCheck, label: '100% Private' },
            { icon: Activity, label: 'Real Progress' },
          ].map((item, i) => (
            <motion.div key={i} whileHover={{ y: -10 }} className="text-center">
              <div
                className="mx-auto mb-5 flex items-center justify-center rounded-3xl p-8 shadow-xl backdrop-blur-xl transition-all"
                style={{
                  background: `${apollo.card}CC`,
                  border: '1px solid rgba(255,255,255,0.1)',
                  width: 'clamp(100px, 20vw, 180px)',
                  height: 'clamp(100px, 20vw, 180px)',
                }}
              >
                <item.icon
                  style={{
                    width: 'clamp(40px, 10vw, 80px)',
                    height: 'clamp(40px, 10vw, 80px)',
                    color: apollo.accent,
                  }}
                />
              </div>
              <p
                className="font-medium"
                style={{ fontSize: 'clamp(0.9rem, 3vw, 1.4rem)', color: apollo.text }}
              >
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Apollo Seal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
          className="mt-24"
        >
          <div className="rounded-3xl bg-white/10 p-10 backdrop-blur-xl">
            <p
              className="text-center text-4xl font-black tracking-wider md:text-5xl"
              style={{ color: apollo.accent }}
            >
              Apollo 24|7
            </p>
            <p className="mt-2 text-center text-lg text-gray-400">Inspired Experience</p>
          </div>
        </motion.div>
      </div>

      {/* Floating Help */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
      >
        <div
          className="rounded-full px-8 py-4 shadow-2xl backdrop-blur-xl"
          style={{ background: `${apollo.card}E6`, border: `2px solid ${apollo.accent}` }}
        >
          <p
            className="text-center font-medium"
            style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)', color: apollo.text }}
          >
            First time?{' '}
            <a
              href="https://docs.livekit.io/agents/start/voice-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline"
              style={{ color: apollo.accent }}
            >
              Quick setup
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
});

WelcomeView.displayName = 'WelcomeView';
