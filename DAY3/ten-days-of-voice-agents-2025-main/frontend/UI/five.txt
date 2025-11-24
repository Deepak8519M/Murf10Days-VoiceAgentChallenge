// components/app/welcome-view.tsx
import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Calendar,
  HeartPulse,
  Mic,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/livekit/button';

// Official Apollo 24|7 colors (2025)
const apollo = {
  primary: '#1A504C',
  accent: '#00A19D',
  light: '#F8FBFF',
  text: '#1F2A44',
  muted: '#4B5563',
};

export const WelcomeView = React.forwardRef<
  HTMLDivElement,
  { startButtonText: string; onStartCall: () => void }
>(({ startButtonText, onStartCall }, ref) => {
  return (
    <div ref={ref} className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Top gradient bar – exact Apollo header */}
      <div
        className="h-2 w-full"
        style={{ background: `linear-gradient(90deg, ${apollo.primary}, ${apollo.accent})` }}
      />

      {/* Subtle floating orbs – luxury feel */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ y: [-40, 40, -40] }}
          transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut' }}
          className="absolute top-20 left-10 h-96 w-96 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${apollo.primary}15, transparent 70%)` }}
        />
        <motion.div
          animate={{ y: [40, -40, 40] }}
          transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
          className="absolute right-10 bottom-20 h-80 w-80 rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${apollo.accent}12, transparent 70%)` }}
        />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-20">
        {/* Ultra Premium Hero */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center"
        >
          <h1 className="bg-gradient-to-br from-[#1A504C] via-[#1A504C] to-[#00A19D] bg-clip-text text-7xl leading-none font-black tracking-tighter text-transparent md:text-9xl lg:text-[11rem]">
            Daily
            <br />
            Health
            <br />
            Check‑in
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mx-auto mt-10 max-w-5xl text-2xl leading-relaxed font-light text-gray-700 md:text-4xl"
            style={{ color: apollo.text }}
          >
            Your personal voice companion that truly listens, remembers your journey,
            <br className="hidden md:block" />
            and helps you build healthier habits —{' '}
            <span className="font-semibold text-[#00A19D]">one day at a time</span>.
          </motion.p>
        </motion.div>

        {/* Flagship Apollo CTA */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.1, type: 'spring', stiffness: 120, damping: 18 }}
          className="mt-20"
        >
          <Button
            onClick={onStartCall}
            className="group shadow-3xl hover:shadow-4xl relative overflow-hidden rounded-full px-32 py-16 text-3xl font-bold text-white transition-all duration-500 md:text-4xl"
            style={{
              background: `linear-gradient(135deg, ${apollo.primary} 0%, #236663 60%, ${apollo.accent} 100%)`,
              minWidth: '560px',
              boxShadow: `0 30px 60px ${apollo.primary}50`,
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-7">
              <PhoneCall className="h-14 w-14" />
              {startButtonText}
            </span>

            {/* Animated shine sweep */}
            <motion.div
              className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent"
              initial={{ x: '-200%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />
          </Button>
        </motion.div>

        {/* Luxury Feature Grid */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="mt-32 grid grid-cols-2 gap-12 md:grid-cols-4"
        >
          {[
            { icon: HeartPulse, label: 'Mood & Energy' },
            { icon: Calendar, label: 'Daily Check‑ins' },
            { icon: ShieldCheck, label: '100% Private' },
            { icon: Activity, label: 'Real Progress' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -12, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="group text-center"
            >
              <div className="mb-6 rounded-3xl bg-gradient-to-br from-[#1A504C]/8 via-[#00A19D]/5 to-transparent p-10 shadow-xl ring-1 ring-gray-100 backdrop-blur-sm transition-all group-hover:ring-[#00A19D]/30">
                <item.icon className="mx-auto h-24 w-24" style={{ color: apollo.primary }} />
              </div>
              <p className="text-xl font-semibold tracking-tight" style={{ color: apollo.text }}>
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Premium Apollo Seal */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 2, type: 'spring', stiffness: 100 }}
          className="mt-44"
        >
          <div className="shadow-4xl rounded-4xl bg-white/95 p-16 ring-4 ring-[#1A504C]/10 backdrop-blur-xl">
            <div className="flex flex-col items-center">
              <Sparkles className="mb-6 h-20 w-20" style={{ color: apollo.accent }} />
              <p className="text-6xl font-black tracking-wider" style={{ color: apollo.primary }}>
                Apollo 24|7
              </p>
              <p className="mt-3 text-3xl font-medium" style={{ color: apollo.accent }}>
                Official Inspired Design
              </p>
              <p className="mt-6 text-base text-gray-500">
                Built with love during #MurfAIVoiceAgentsChallenge
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Luxury Help Card */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.4 }}
        className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2"
      >
        <div
          className="shadow-4xl rounded-full border-4 px-14 py-7 backdrop-blur-2xl"
          style={{ background: 'rgba(255,255,255,0.97)', borderColor: apollo.primary }}
        >
          <p className="text-xl font-semibold" style={{ color: apollo.text }}>
            First time with voice AI?{' '}
            <a
              href="https://docs.livekit.io/agents/start/voice-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline decoration-2 underline-offset-8"
              style={{ color: apollo.accent }}
            >
              30-second setup guide
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
});

WelcomeView.displayName = 'WelcomeView';
