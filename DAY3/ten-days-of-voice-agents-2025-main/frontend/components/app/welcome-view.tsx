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

const apollo = {
  primary: '#1A504C',
  accent: '#00D1C1',
  bg: '#0B1218',
};

// FLOATING BRAND CARD — WORKS 100%
const FloatingBrandCard = ({ delay, left, top, brand, color, icon: Icon }: any) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 1.2, type: 'spring', stiffness: 100 }}
    className="pointer-events-none absolute z-20 hidden sm:block"
    style={{ left, top }}
  >
    <motion.div
      animate={{
        y: [-20, 20, -20],
        rotate: [-4, 4, -4],
      }}
      transition={{
        y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
      }}
      className="rounded-2xl p-1"
      style={{ background: `linear-gradient(135deg, ${color}30, ${color}60)` }}
    >
      <div className="rounded-2xl border border-white/20 bg-black/50 px-12 py-5 backdrop-blur-2xl">
        <div className="flex flex-col items-center gap-3">
          <div className="rounded-full p-8" style={{ backgroundColor: color }}>
            <Icon className="h-10 w-10 text-white" />
          </div>
          <p className="text-lg font-bold text-white">{brand}</p>
          <p className="text-xs text-cyan-300">{brand === 'Murf AI' ? 'Powered By' : 'Inspired'}</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

export const WelcomeView = React.forwardRef<
  HTMLDivElement,
  { startButtonText: string; onStartCall: () => void }
>(({ startButtonText, onStartCall }, ref) => {
  return (
    <div ref={ref} className="relative min-h-screen w-screen overflow-hidden bg-[#0B1218]">
      {/* Top Gradient Bar */}
      <div
        className="h-1 w-full"
        style={{ background: `linear-gradient(90deg, ${apollo.primary}, ${apollo.accent})` }}
      />

      {/* Background Glow */}
      <div
        className="fixed inset-0 -z-10 opacity-20"
        style={{
          background: `radial-gradient(circle at 20% 80%, ${apollo.accent}, transparent 70%)`,
        }}
      />

      {/* 4 FLOATING CARDS — NOW 100% WORKING */}
      <FloatingBrandCard
        delay={0.8}
        left="6vw"
        top="14vh"
        brand="Apollo 24|7"
        color="#1A504C"
        icon={HeartPulse}
      />
      <FloatingBrandCard
        delay={1.1}
        left="82vw"
        top="16vh"
        brand="PharmEasy"
        color="#E91E63"
        icon={HeartPulse}
      />
      <FloatingBrandCard
        delay={1.4}
        left="8vw"
        top="58vh"
        brand="Tata 1mg"
        color="#FF6D00"
        icon={HospitalIcon}
      />
      <FloatingBrandCard
        delay={1.7}
        left="80vw"
        top="58vh"
        brand="Murf AI"
        color="#8B5CF6"
        icon={Sparkles}
      />

      {/* Main Content */}
      <div className="relative z-30 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="bg-gradient-to-r from-cyan-400 to-teal-500 bg-clip-text text-5xl leading-tight font-black tracking-tight text-transparent md:text-7xl lg:text-8xl">
            Daily Health
            <br />
            Check-in
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-xl">
            Your personal voice companion — trusted like <strong>Apollo 24|7</strong>,
            <br className="hidden md:block" />
            easy like <strong>PharmEasy</strong>, reliable like <strong>Tata 1mg</strong>,
            <br className="hidden md:block" />
            powered by the <strong>fastest TTS</strong>: <strong>Murf Falcon</strong>.
          </p>
        </motion.div>

        {/* STATIC BUTTON — NO FLOATING */}
        <div className="mt-16">
          <Button
            onClick={onStartCall}
            className="rounded-full text-xl font-bold transition-all hover:scale-105 hover:shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${apollo.primary}, ${apollo.accent})`,
              padding: '1.6rem 5rem',
              boxShadow: '0 20px 50px rgba(0,209,193,0.4)',
            }}
          >
            <span className="flex items-center gap-5">
              <PhoneCall className="h-10 w-10" />
              {startButtonText}
            </span>
          </Button>
        </div>

        {/* Feature Icons */}
        <div className="mt-24 grid w-full max-w-5xl grid-cols-2 gap-10 md:grid-cols-4">
          {[
            { icon: HeartPulse, label: 'Mood & Energy', color: '#00D1C1' },
            { icon: Calendar, label: 'Daily Check-ins', color: '#1A504C' },
            { icon: ShieldCheck, label: '100% Private', color: '#8B5CF6' },
            { icon: Activity, label: 'Real Progress', color: '#FF6D00' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-xl">
                <item.icon className="h-12 w-12" style={{ color: item.color }} />
              </div>
              <p className="text-sm font-medium text-gray-300 md:text-base">{item.label}</p>
            </div>
          ))}
        </div>

        {/* Floating Help Bubble */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2"
        >
          <div className="rounded-full bg-white/10 px-6 py-3 backdrop-blur-xl">
            <p className="text-sm text-cyan-200">
              First time?{' '}
              <a
                href="https://docs.livekit.io/agents/start/voice-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold underline"
              >
                Quick setup
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

WelcomeView.displayName = 'WelcomeView';
