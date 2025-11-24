// frontend/components/app/welcome-view.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Calendar,
  HeartPulse,
  HospitalIcon,
  PhoneCall,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/livekit/button';

// frontend/components/app/welcome-view.tsx

// frontend/components/app/welcome-view.tsx

const apollo = {
  primary: '#1A504C',
  accent: '#00D1C1',
  bg: '#0B1218',
  text: '#E2E8F0',
};

// Levitating Brand Card with 3D float + glow + parallax
const BrandCard = ({ delay, x, y, brand, color, icon: Icon }: any) => {
  const float = {
    y: [0, -20, 0],
    rotate: [0, 3, -3, 0],
    transition: {
      y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
      rotate: { duration: 8, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, x: x.initial, y: y.initial }}
      animate={{
        opacity: 1,
        scale: 1,
        x: x.final,
        y: y.final,
        ...float,
      }}
      transition={{
        delay,
        duration: 1.8,
        type: 'spring',
        stiffness: 80,
        damping: 15,
      }}
      className="pointer-events-none absolute z-20"
      style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.6))' }}
      whileHover={{ scale: 1.1, rotate: 5 }}
    >
      <div
        className="relative rounded-3xl p-1"
        style={{
          background: `linear-gradient(135deg, ${color}20, ${color}40)`,
        }}
      >
        <div className="rounded-3xl border border-white/30 bg-black/40 px-19 py-10 backdrop-blur-3xl">
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="rounded-full p-12"
              style={{ backgroundColor: color }}
            >
              {Icon && <Icon className="h-12 w-12 text-white" />}
            </motion.div>
            <p className="text-2xl font-black tracking-wider text-white drop-shadow-md">{brand}</p>
            <p className="text-xs font-light text-cyan-300">
              {brand === 'Murf AI' ? 'Powered By' : 'Design Inspired'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
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
      {/* Gradient Top Bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${apollo.primary}, ${apollo.accent})` }}
      />

      {/* Floating Glowing Orb Background */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 20, repeat: Infinity }}
        className="fixed inset-0 -z-10"
        style={{
          background: `radial-gradient(circle at 30% 70%, ${apollo.accent}10, transparent 60%)`,
        }}
      />

      {/* LEVITATING BRAND CARDS — TRUE 3D FLOAT */}
      <BrandCard
        delay={1.2}
        x={{ initial: -600, final: '8vw' }}
        y={{ initial: -400, final: '18vh' }}
        brand="Apollo 24|7"
        color="#1A504C"
        icon={HeartPulse}
      />
      <BrandCard
        delay={1.5}
        x={{ initial: 700, final: '72vw' }}
        y={{ initial: -500, final: '62vh' }}
        brand="PharmEasy"
        color="#E91E63"
        icon={HeartPulse}
      />
      <BrandCard
        delay={1.8}
        x={{ initial: -700, final: '12vw' }}
        y={{ initial: 500, final: '64vh' }}
        brand="Tata 1mg"
        color="#FF6D00"
        icon={HospitalIcon}
      />
      <BrandCard
        delay={2.1}
        x={{ initial: 800, final: '78vw' }}
        y={{ initial: -600, final: '26vh' }}
        brand="Murf AI"
        color="#8B5CF6"
        icon={Sparkles}
      />

      {/* Main Content */}
      <div className="relative z-30 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <h1
            className="bg-gradient-to-br from-[#00D1C1] via-[#1A504C] to-[#00D1C1] bg-clip-text font-black tracking-tighter text-transparent"
            style={{ fontSize: 'clamp(3.5rem, 12vw, 11rem)', lineHeight: '1' }}
          >
            Daily Health
            <br />
            Check‑in
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mx-auto mt-8 max-w-4xl leading-relaxed font-light text-gray-300"
            style={{ fontSize: 'clamp(1.1rem, 4vw, 2.2rem)' }}
          >
            Your personal voice companion — trusted like <strong>Apollo</strong>, easy like{' '}
            <strong>PharmEasy</strong>, reliable like <strong>Tata 1mg</strong>, and powered by the{' '}
            <strong>fastest TTS</strong>: <strong>Murf Falcon</strong>.
          </motion.p>
        </motion.div>

        {/* Levitating Start Button */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mt-20"
        >
          <Button
            onClick={onStartCall}
            className="group relative overflow-hidden rounded-full text-3xl font-bold transition-all duration-700 hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${apollo.primary}, ${apollo.accent})`,
              padding: '2rem 6rem',
              boxShadow: '0 20px 40px rgba(0,209,193,0.4), inset 0 4px 20px rgba(255,255,255,0.2)',
            }}
          >
            <span className="relative z-10 flex items-center gap-6">
              <PhoneCall className="h-12 w-12" />
              {startButtonText}
            </span>
            <motion.div
              className="absolute inset-0 bg-white/40"
              animate={{ x: ['-200%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </Button>
        </motion.div>

        {/* Feature Cards with Hover Lift */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
          className="mt-32 grid w-full max-w-6xl grid-cols-2 gap-12 md:grid-cols-4"
        >
          {[
            { icon: HeartPulse, label: 'Mood & Energy', color: '#00D1C1' },
            { icon: Calendar, label: 'Daily Check‑ins', color: '#1A504C' },
            { icon: ShieldCheck, label: '100% Private', color: '#8B5CF6' },
            { icon: Activity, label: 'Real Progress', color: '#FF6D00' },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -20, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="text-center"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                className="mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-2xl"
                style={{ boxShadow: '0 15px 30px rgba(0,0,0,0.5)' }}
              >
                <item.icon className="h-24 w-24" style={{ color: item.color }} />
              </motion.div>
              <p className="text-lg font-medium text-gray-200">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Help Bubble */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2"
      >
        <div
          className="rounded-full bg-gradient-to-r from-cyan-500/20 to-teal-500/20 px-10 py-5 shadow-2xl backdrop-blur-xl"
          style={{ border: `2px solid ${apollo.accent}` }}
        >
          <p className="text-center font-medium text-cyan-100">
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
