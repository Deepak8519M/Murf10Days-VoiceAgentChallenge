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
      {/* Subtle Saffron Glows */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 h-96 w-96 rounded-full bg-orange-300 blur-3xl" />
        <div className="absolute right-20 bottom-20 h-96 w-96 rounded-full bg-amber-400 blur-3xl" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-3xl space-y-10 text-center">
          {/* Hero Icon Section – Perfectly Centered */}
          <div className="flex justify-center">
            <motion.div
              animate={{ scale: pulse ? 1.08 : 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-8 animate-ping rounded-full bg-orange-400/30 blur-3xl" />
              <div className="relative rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 p-8 shadow-2xl">
                <Store className="h-24 w-24 text-white md:h-28 md:w-28" strokeWidth={3} />
              </div>

              {/* Ringing Badge – Perfect Position */}
              <motion.div
                animate={{ y: [-5, 5, -5], rotate: [-12, 12, -12] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="absolute -top-4 -right-6 rounded-full bg-green-600 p-4 shadow-xl ring-4 ring-green-500/70"
              >
                <PhoneIncoming className="h-9 w-9 text-white" />
              </motion.div>
            </motion.div>
          </div>

          {/* Typography – Tight & Perfect */}
          <div className="space-y-5">
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-orange-600 via-red-600 to-amber-600 bg-clip-text text-5xl leading-tight font-black tracking-tight text-transparent md:text-6xl lg:text-7xl"
            >
              नमस्ते! Welcome
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-2xl font-bold text-orange-800 md:text-3xl"
            >
              I'm <span className="text-orange-600">Robin</span> — Your Grocery Buddy
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="mx-auto max-w-xl text-base font-medium text-orange-700 md:text-lg"
            >
              Order Amul, Maggi, Aashirvaad, fresh sabzi — just speak naturally
            </motion.p>
          </div>

          {/* Feature Pills – Perfect 2×2 Grid */}
          <div className="mx-auto grid max-w-2xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[
              { icon: ShoppingCart, text: 'Smart Cart' },
              { icon: Package, text: 'Auto Track' },
              { icon: IndianRupee, text: 'Best Price' },
              { icon: Truck, text: '30-Min' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.1 }}
                className="rounded-2xl border border-orange-200 bg-white/90 px-6 py-5 shadow-md backdrop-blur-sm"
              >
                <f.icon className="mx-auto mb-2 h-8 w-8 text-orange-600" />
                <p className="text-sm font-bold text-orange-800">{f.text}</p>
              </motion.div>
            ))}
          </div>

          {/* Perfect Button – Not Too Big */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
            className="pt-6"
          >
            <Button
              onClick={onStartCall}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-orange-500 to-red-600 px-16 py-8 text-2xl font-bold text-white shadow-xl transition-all hover:scale-105 hover:shadow-orange-500/60 md:px-20 md:py-9 md:text-3xl"
            >
              <motion.span
                className="relative z-10 flex items-center gap-5"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <PhoneIncoming className="h-10 w-10 transition-transform group-hover:rotate-12" />
                {startButtonText}
                <Sparkles className="h-10 w-10 text-yellow-300" />
              </motion.span>
              <motion.div
                className="absolute inset-0 bg-white/20 opacity-0 blur-xl group-hover:opacity-100"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Button>
          </motion.div>

          {/* Footer – Clean & Centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col items-center gap-4 pt-12 text-orange-700"
          >
            <div className="flex items-center gap-4">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium md:text-base">
                LiveKit • Deepgram • Murf AI • Gemini 2.5 Flash
              </span>
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <p className="mt-4 text-xl font-bold text-orange-600 md:text-2xl">
              बोलिए... क्या चाहिए आज?
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
});

WelcomeView.displayName = 'WelcomeView';
