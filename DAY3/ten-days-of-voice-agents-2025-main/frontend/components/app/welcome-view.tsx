// src/components/app/welcome-view.tsx   (or wherever your path is)
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Cloud, Heart, Mic, Sparkles, Sun, Zap } from 'lucide-react';
import { Button } from '@/components/livekit/button';

function WellnessIllustration() {
  return (
    <div className="relative mb-8">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative"
      >
        <div className="absolute inset-0 -z-10 blur-3xl">
          <div className="mx-auto h-80 w-80 rounded-full bg-gradient-to-br from-emerald-400/30 via-blue-400/20 to-purple-500/30" />
        </div>

        <div className="flex flex-col items-center">
          <div className="relative">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
            >
              <Heart className="h-24 w-24 text-emerald-500 drop-shadow-2xl" fill="currentColor" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
              className="absolute -top-6 -left-8"
            >
              <Sun className="h-14 w-14 text-yellow-400" />
            </motion.div>

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="absolute -top-8 -right-10"
            >
              <Sparkles className="h-12 w-12 text-purple-400" />
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 7, delay: 2 }}
              className="absolute bottom-2 -left-10"
            >
              <Cloud className="h-12 w-12 text-blue-300" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, delay: 1.5 }}
              className="absolute right-2 bottom-4"
            >
              <Zap className="h-10 w-10 text-amber-400" />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

interface WelcomeViewProps {
  startButtonText: string;
  onStartCall: () => void;
}

// This is the fix: Named export + forwardRef + displayName
export const WelcomeView = React.forwardRef<
  HTMLDivElement,
  WelcomeViewProps & React.HTMLAttributes<HTMLDivElement>
>(({ startButtonText, onStartCall, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex min-h-screen flex-col bg-gradient-to-b from-emerald-50 via-white to-blue-50/50 ${className || ''}`}
      {...props}
    >
      <section className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <WellnessIllustration />

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h1 className="mb-6 text-4xl leading-tight font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Your Daily Wellness Companion
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-gray-600 md:text-xl">
            A gentle voice to check in with you every day — reflecting on how you feel, setting
            small intentions, and growing together.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-12"
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onStartCall}
            className="group relative transform overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-16 py-7 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-emerald-600 hover:to-teal-700"
          >
            <span className="relative z-10 flex items-center gap-4">
              <Mic className="h-7 w-7" />
              {startButtonText}
            </span>
            <motion.div
              className="absolute inset-0 bg-white/25"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.7 }}
            />
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-gray-600 md:text-base"
        >
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-emerald-600" />
            <span>Daily gentle check-ins</span>
          </div>
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-rose-500" />
            <span>Remembers your journey</span>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span>Small steps, real progress</span>
          </div>
        </motion.div>
      </section>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="pointer-events-none fixed bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="pointer-events-auto rounded-2xl border border-gray-200/50 bg-white/90 px-8 py-4 shadow-xl backdrop-blur-xl">
          <p className="text-sm text-gray-600 md:text-base">
            Need help?{' '}
            <a
              href="https://docs.livekit.io/agents/start/voice-ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-emerald-600 underline underline-offset-2 hover:text-emerald-700"
            >
              Voice AI Quickstart
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
});

WelcomeView.displayName = 'WelcomeView';
