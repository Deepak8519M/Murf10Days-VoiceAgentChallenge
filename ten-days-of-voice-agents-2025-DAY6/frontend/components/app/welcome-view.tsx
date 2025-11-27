// components/app/welcome-view.tsx
import { forwardRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle2, Lock, PhoneIncoming, Shield, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  startButtonText?: string;
  onStartCall: () => void;
}

export const WelcomeView = forwardRef<HTMLDivElement, WelcomeViewProps>(
  ({ startButtonText = 'Answer Fraud Alert Call', onStartCall }, ref) => {
    const [ringPulse, setRingPulse] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => setRingPulse((p) => !p), 1800);
      return () => clearInterval(interval);
    }, []);

    return (
      <div ref={ref} className="relative min-h-screen overflow-hidden bg-black">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950" />
        <motion.div
          animate={{
            background: [
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.25) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.35) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.25) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0"
        />

        {/* Cyber Grid */}
        <div className="bg-grid-cyan-900/10 absolute inset-0 bg-[length:60px_60px]" />

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
            animate={{
              x: [0, 80, -80, 0],
              y: [0, -80, 80, 0],
              scale: [1, 1.2, 0.9, 1],
            }}
            transition={{
              duration: 18 + i * 2,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 1.5,
            }}
            style={{
              top: `${15 + i * 10}%`,
              left: i % 2 === 0 ? '-10%' : 'auto',
              right: i % 2 === 1 ? '-10%' : 'auto',
            }}
          />
        ))}

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="space max-w-5xl space-y-16 text-center"
          >
            {/* Hero Shield + Ringing Phone */}
            <motion.div
              animate={{ scale: ringPulse ? 1.1 : 1 }}
              transition={{ duration: 0.8 }}
              className="relative inline-block"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl"
              />
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="shadow-4xl relative rounded-full bg-gradient-to-br from-slate-900 to-slate-800 p-10 ring-8 ring-cyan-500/30"
              >
                <Shield className="h-32 w-32 text-cyan-400 drop-shadow-2xl" strokeWidth={2.5} />

                {/* Ringing Phone */}
                <motion.div
                  animate={{
                    x: [0, 8, -8, 8, 0],
                    rotate: [0, 12, -12, 12, 0],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="absolute -top-3 -right-6 rounded-full bg-red-600 p-4 shadow-2xl ring-6 ring-red-600/50"
                >
                  <PhoneIncoming className="h-10 w-10 text-white" />
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.8, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-red-600/40 blur-xl"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Text — Now Perfectly Readable */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-7xl lg:text-8xl"
              >
                FRAUD ALERT
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-2xl font-light text-gray-300 md:text-4xl"
              >
                HDFC Bank <span className="font-bold text-cyan-400">Security Shield</span> Activated
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mx-auto max-w-2xl text-lg text-gray-400 md:text-xl"
              >
                Suspicious transaction detected • AI agent calling • Your money is under protection
              </motion.p>
            </div>

            {/* Stats Cards — Compact & Beautiful */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
            >
              {[
                { icon: Lock, label: 'AES-256 Encryption', value: 'Active' },
                { icon: Activity, label: 'Real-time Monitoring', value: '24/7' },
                { icon: Zap, label: 'Response Time', value: '< 2.3s' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.08 }}
                  className="group relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-white/5 p-8 backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
                  <item.icon className="mx-auto mb-4 h-12 w-12 text-cyan-400" />
                  <p className="text-3xl font-black text-white">{item.value}</p>
                  <p className="mt-2 text-sm text-gray-400">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* GOD-TIER BUTTON — Now Perfect Size */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className="pt-6"
            >
              <Button
                onClick={onStartCall}
                className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-20 py-10 text-3xl font-bold text-white shadow-2xl transition-all hover:scale-105 hover:from-cyan-400 hover:to-purple-500 hover:shadow-cyan-500/60 md:px-24 md:py-12 md:text-4xl"
              >
                <motion.span
                  className="relative z-10 flex items-center gap-6"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PhoneIncoming className="h-12 w-12 transition-transform group-hover:rotate-12 md:h-14 md:w-14" />
                  {startButtonText}
                  <Sparkles className="h-12 w-12 text-yellow-300 md:h-14 md:w-14" />
                </motion.span>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 blur-xl group-hover:opacity-60"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Button>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8 }}
              className="flex items-center justify-center gap-6 pt-16 text-gray-500"
            >
              <CheckCircle2 className="h-6 w-6 text-cyan-400" />
              <span className="text-lg md:text-xl">
                LiveKit + Murf AI + Your Genius = Unstoppable
              </span>
              <CheckCircle2 className="h-6 w-6 text-cyan-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }
);

WelcomeView.displayName = 'WelcomeView';
