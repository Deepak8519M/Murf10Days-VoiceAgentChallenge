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
              'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.4) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.3) 0%, transparent 50%)',
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
            className="absolute h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"
            animate={{
              x: [0, 100, -100, 0],
              y: [0, -100, 100, 0],
              scale: [1, 1.3, 0.8, 1],
            }}
            transition={{
              duration: 20 + i * 3,
              repeat: Infinity,
              ease: 'linear',
              delay: i * 2,
            }}
            style={{
              top: `${10 + i * 12}%`,
              left: i % 2 === 0 ? '-10%' : 'auto',
              right: i % 2 === 1 ? '-10%' : 'auto',
            }}
          />
        ))}

        <div className="relative z-10 flex min-h-screen items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="max-w-6xl space-y-20 text-center"
          >
            {/* Hero Shield + Ringing Phone */}
            <motion.div
              animate={{ scale: ringPulse ? 1.15 : 1 }}
              transition={{ duration: 0.8 }}
              className="relative inline-block"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full bg-cyan-500/20 blur-3xl"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="shadow-4xl relative rounded-full bg-gradient-to-br from-slate-900 to-slate-800 p-16 ring-8 ring-cyan-500/30"
              >
                <Shield className="h-48 w-48 text-cyan-400 drop-shadow-2xl" strokeWidth={2.5} />

                {/* Ringing Phone */}
                <motion.div
                  animate={{
                    x: [0, 10, -10, 10, 0],
                    rotate: [0, 15, -15, 15, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-4 -right-8 rounded-full bg-red-600 p-6 shadow-2xl ring-8 ring-red-600/50"
                >
                  <PhoneIncoming className="h-16 w-16 text-white" />
                  <motion.div
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-red-600/40 blur-xl"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Text */}
            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-8xl leading-none font-black tracking-tight text-transparent md:text-9xl lg:text-[11rem]"
              >
                FRAUD ALERT
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-4xl font-light text-gray-300 md:text-6xl"
              >
                HDFC Bank <span className="font-bold text-cyan-400">Security Shield</span> Activated
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mx-auto max-w-3xl text-xl text-gray-400 md:text-2xl"
              >
                Suspicious transaction detected • AI agent calling • Your money is under protection
              </motion.p>
            </div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3"
            >
              {[
                { icon: Lock, label: 'AES-256 Encryption', value: 'Active' },
                { icon: Activity, label: 'Real-time Monitoring', value: '24/7' },
                { icon: Zap, label: 'Response Time', value: '< 2.3s' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="group relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-white/5 to-white/10 p-10 backdrop-blur-xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <item.icon className="mx-auto mb-6 h-16 w-16 text-cyan-400" />
                  <p className="text-4xl font-black text-white">{item.value}</p>
                  <p className="mt-2 text-gray-400">{item.label}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* GOD-TIER BUTTON */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5 }}
              className="pt-8"
            >
              <Button
                onClick={onStartCall}
                className="group shadow-4xl relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 px-32 py-16 text-5xl font-black tracking-wider text-white transition-all duration-700 hover:scale-110 hover:from-cyan-400 hover:to-purple-500 hover:shadow-cyan-500/60"
              >
                <motion.span
                  className="relative z-10 flex items-center gap-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PhoneIncoming className="h-20 w-20 transition-transform group-hover:rotate-12" />
                  {startButtonText}
                  <Sparkles className="h-16 w-16 text-yellow-300" />
                </motion.span>

                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 opacity-0 blur-xl group-hover:opacity-70"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Button>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="flex items-center justify-center gap-8 pt-20 text-gray-500"
            >
              <CheckCircle2 className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl">LiveKit + Murf AI + Your Genius = Unstoppable</span>
              <CheckCircle2 className="h-8 w-8 text-cyan-400" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    );
  }
);

WelcomeView.displayName = 'WelcomeView';
