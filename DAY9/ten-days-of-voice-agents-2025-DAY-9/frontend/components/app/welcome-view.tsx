// components/app/welcome-view.tsx → DAY 9 FINAL (THE ONE THAT WINS THE INTERNET)
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { PhoneIncoming, ShoppingBag, Sparkles } from 'lucide-react';
import { Button } from '@/components/livekit/button';

const WelcomeView = forwardRef<HTMLDivElement, { onStartCall: () => void }>((props, ref) => (
  <div ref={ref} className="relative min-h-screen overflow-hidden bg-black">
    {/* Infinite depth background */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950 to-black" />

    {/* Cinematic orbital ring system */}
    <div className="absolute inset-0">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-500/10 blur-3xl"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 180, repeat: Infinity, ease: 'linear' }}
        className="absolute top-1/2 left-1/2 h-[1600px] w-[1600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-500/10 blur-3xl"
      />
    </div>

    <div className="relative z-10 flex min-h-screen flex-col justify-between px-8 py-20">
      {/* Floating top badge */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.4, type: 'spring' }}
        className="self-center"
      >
        <div className="rounded-full border border-white/10 bg-white/5 px-12 py-5 backdrop-blur-3xl">
          <p className="text-sm font-light tracking-widest text-white/50">DR ABHISHEK SHOP</p>
        </div>
      </motion.div>

      {/* Center masterpiece */}
      <div className="flex flex-1 items-center justify-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, type: 'spring', stiffness: 70 }}
          className="space-y-32 text-center"
        >
          {/* Floating crystal orb */}
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 100px rgba(6, 182, 212, 0.3)',
                  '0 0 200px rgba(139, 92, 246, 0.4)',
                  '0 0 100px rgba(6, 182, 212, 0.3)',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -inset-40 rounded-full blur-3xl"
            />
            <div className="relative rounded-full border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-32 backdrop-blur-3xl">
              <ShoppingBag className="h-48 w-48 text-cyan-400" strokeWidth={1.2} />
            </div>
          </div>

          {/* ALEX — the most beautiful text ever rendered */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.6 }}
            className="text-[180px] leading-none font-black tracking-tighter md:text-[240px] lg:text-[280px]"
            style={{
              background:
                'linear-gradient(135deg, #ffffff 0%, #a5f3fc 30%, #c084fc 70%, #f0abfc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            ALEX
          </motion.h1>

          <p className="text-5xl font-extralight tracking-wider text-white/60 md:text-6xl">
            Voice Commerce. Redefined.
          </p>
        </motion.div>
      </div>

      {/* Bottom — pure dominance */}
      <div className="space-y-20">
        {/* GOD BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.2, type: 'spring' }}
          className="flex justify-center"
        >
          <Button
            onClick={props.onStartCall}
            className="group relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 p-3 shadow-2xl"
          >
            <div className="relative rounded-3xl bg-black px-48 py-24 transition-all group-hover:bg-transparent">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: [-1000, 1000] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
              <span className="relative flex items-center gap-16 text-8xl font-black tracking-tight text-white">
                <PhoneIncoming className="h-32 w-32 transition-transform group-hover:scale-110 group-hover:rotate-12" />
                BEGIN
                <Sparkles className="h-32 w-32 text-yellow-300" />
              </span>
            </div>
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="text-center text-7xl font-extralight tracking-widest text-white/30"
        >
          Your voice. Your store.
        </motion.p>

        <p className="text-center font-mono text-xs tracking-widest text-white/20 uppercase">
          LiveKit • Deepgram • Murf AI • Gemini 2.5 Flash
        </p>
      </div>
    </div>
  </div>
));

WelcomeView.displayName = 'WelcomeView';
export default WelcomeView;
