// PERFECTLY CENTERED • PREMIUM • FULLY FITTED VERSION
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { PhoneIncoming, ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from '@/components/livekit/button';

const WelcomeView = forwardRef<HTMLDivElement, { onStartCall: () => void }>((props, ref) => (
  <div ref={ref} className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black">
    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-emerald-900" />

    {/* Ambient Glow */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 opacity-20"
      style={{
        background: `conic-gradient(
          from 0deg at 50% 50%,
          transparent 0deg,
          #22c55e 120deg,
          #4ade80 240deg,
          transparent 360deg
        )`,
        filter: 'blur(120px)',
      }}
    />

    {/* MAIN CENTERED CONTENT */}
    <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20 text-center">
      {/* Badge */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <div className="rounded-full border border-white/20 bg-white/10 px-4 py-1 backdrop-blur-xl">
          <p className="text-xs tracking-[0.2em] text-white/70">MORE GROCERY</p>
        </div>
      </motion.div>

      {/* Orb Section */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative mb-10 flex flex-col items-center"
      >
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-20 rounded-full border border-emerald-400/20 blur-lg"
        />

        {/* Orb */}
        <div className="relative rounded-full border border-white/20 bg-gradient-to-br from-white/5 to-white/10 p-10 shadow-xl backdrop-blur-xl">
          <ShoppingCart className="h-20 w-20 text-emerald-300" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-4 bg-gradient-to-r from-white via-emerald-200 to-green-200 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent md:text-7xl"
      >
        ALEX
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mb-2 text-xl text-white/90 md:text-2xl"
      >
        Your Voice Grocery Assistant
      </motion.p>

      <p className="mb-10 text-base text-white/50">Speak your order. Get it delivered.</p>

      {/* BEGIN BUTTON */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
      >
        <Button
          onClick={props.onStartCall}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 p-2 shadow-lg"
        >
          <div className="relative rounded-2xl transition-all group-hover:bg-transparent md:px-16 md:py-6">
            {/* Border Glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 opacity-0 blur-xl group-hover:opacity-100"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <span className="relative flex items-center gap-4 text-[10px] font-bold text-white md:text-xl">
              <PhoneIncoming className="h-8 w-8 md:h-10 md:w-10" />
              BEGIN
              <Sparkles className="h-8 w-8 text-yellow-300 md:h-10 md:w-10" />
            </span>
          </div>
        </Button>
      </motion.div>
    </div>

    {/* FOOTER */}
    <div className="relative z-10 pb-6 text-center">
      <p className="font-mono text-[10px] tracking-widest text-white/20">
        LIVEKIT • DEEPGRAM • MURF • GEMINI 2.5 FLASH
      </p>
    </div>
  </div>
));

WelcomeView.displayName = 'WelcomeView';
export default WelcomeView;
