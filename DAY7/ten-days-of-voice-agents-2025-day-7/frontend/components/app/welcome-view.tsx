// components/app/welcome-view.tsx
import { forwardRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Clock,
  IndianRupee,
  Package,
  PhoneIncoming,
  ShoppingCart,
  Sparkles,
  Store,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/livekit/button';

export const WelcomeView = forwardRef<
  HTMLDivElement,
  { onStartCall: () => void; startButtonText?: string }
>(({ onStartCall, startButtonText = 'Call Robin – Your Grocery Assistant' }, ref) => {
  const [pulse, setPulse] = useState(false);
  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={ref}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50"
    >
      {/* Subtle Indian Pattern Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_#f97316_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,_#f59e0b_0%,_transparent_50%)]" />
      </div>

      {/* Floating Mandala Orbs */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-96 w-96 rounded-full border-8 border-orange-200/30 blur-3xl"
          animate={{
            x: [0, 60, -60, 0],
            y: [0, -60, 60, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20 + i * 4,
            repeat: Infinity,
            ease: 'linear',
            delay: i * 2,
          }}
          style={{
            top: `${10 + i * 15}%`,
            left: i % 2 === 0 ? '-20%' : 'auto',
            right: i % 2 === 1 ? '-20%' : 'auto',
          }}
        />
      ))}

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="w-full max-w-4xl space-y-12 text-center"
        >
          {/* Hero Store + Ringing Phone */}
          <div className="relative inline-block">
            <motion.div
              animate={{ scale: pulse ? 1.08 : 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Glow */}
              <div className="absolute inset-0 animate-ping rounded-full bg-orange-400/40 blur-3xl" />

              {/* Main Store Icon */}
              <div className="relative rounded-3xl bg-gradient-to-br from-orange-500 to-amber-600 p-10 shadow-2xl ring-8 ring-orange-300/50">
                <Store className="h-32 w-32 text-white md:h-40 md:w-40" strokeWidth={2.5} />
              </div>

              {/* Ringing Badge */}
              <motion.div
                animate={{ y: [-6, 6, -6], rotate: [-15, 15, -15] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="absolute -top-4 -right-8 rounded-full bg-green-600 p-5 shadow-2xl ring-8 ring-green-500/60"
              >
                <PhoneIncoming className="h-12 w-12 text-white" />
              </motion.div>
            </motion.div>
          </div>

          {/* Premium Indian Typography */}
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-6xl font-black tracking-tight text-transparent md:text-7xl lg:text-8xl"
            >
              नमस्ते! Welcome
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-3xl font-bold text-orange-800 md:text-5xl"
            >
              I'm <span className="text-orange-600">Robin</span> — Your Personal Grocery Assistant
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mx-auto max-w-2xl text-lg font-medium text-orange-700 md:text-xl"
            >
              Order Amul, Tata, Maggi, Aashirvaad, fresh sabzi — just speak in Hindi or English
            </motion.p>
          </div>

          {/* Feature Pills */}
          <div className="grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { icon: ShoppingCart, text: 'Add to Cart' },
              { icon: Package, text: 'Auto Tracking' },
              { icon: IndianRupee, text: 'Best Prices' },
              { icon: Clock, text: '30-Min Delivery' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.1 }}
                className="rounded-2xl border border-orange-200 bg-white/80 p-6 shadow-lg backdrop-blur-xl"
              >
                <f.icon className="mx-auto mb-2 h-10 w-10 text-orange-600" />
                <p className="text-sm font-semibold text-orange-800">{f.text}</p>
              </motion.div>
            ))}
          </div>

          {/* GOD-TIER CALL BUTTON */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6 }}
            className="pt-8"
          >
            <Button
              onClick={onStartCall}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-24 py-12 text-3xl font-bold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-orange-500/60 md:text-4xl"
            >
              <motion.span
                className="relative z-10 flex items-center gap-6"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PhoneIncoming className="h-12 w-12 transition-transform group-hover:rotate-12" />
                {startButtonText}
                <Sparkles className="h-12 w-12 text-yellow-300" />
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 opacity-0 blur-xl group-hover:opacity-70"
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>
          </motion.div>

          {/* Trust Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="flex flex-wrap items-center justify-center gap-6 pt-16 text-orange-700"
          >
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <span className="text-lg font-medium">
              Powered by LiveKit • Deepgram • Murf AI • Gemini 2.5
            </span>
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </motion.div>

          {/* Hindi Touch */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="mt-8 text-2xl font-bold text-orange-600"
          >
            बोलिए... क्या चाहिए आज?
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
});

WelcomeView.displayName = 'WelcomeView';
