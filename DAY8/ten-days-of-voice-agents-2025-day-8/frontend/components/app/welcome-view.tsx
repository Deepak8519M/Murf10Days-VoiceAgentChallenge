// components/app/welcome-view.tsx → 100% ZOOM PERFECT (NO ZOOM-OUT NEEDED)
import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Crown,
  Flame,
  PhoneIncoming,
  ScrollText,
  Shield,
  Sparkles,
  Sword,
} from 'lucide-react';
import { Button } from '@/components/livekit/button';

const WelcomeView = forwardRef<HTMLDivElement, { onStartCall: () => void }>((props, ref) => (
  <div ref={ref} className="relative min-h-screen overflow-hidden bg-black">
    <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-black to-indigo-950" />
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3] }}
      transition={{ duration: 12, repeat: Infinity }}
      className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 via-transparent to-purple-900/20"
    />

    <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl space-y-12 text-center"
      >
        {/* Crown Icon */}
        <motion.div className="relative inline-block">
          <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 opacity-60 blur-3xl" />
          <div className="relative rounded-full bg-gradient-to-br from-purple-800 to-indigo-900 p-8 ring-8 ring-purple-600/30">
            <Crown className="h-20 w-20 text-yellow-400" strokeWidth={2.5} />
          </div>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -top-3 -right-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 p-4 ring-8 ring-emerald-400/70"
          >
            <PhoneIncoming className="h-8 w-8 text-white" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <div className="space-y-4">
          <h1 className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-6xl font-black text-transparent md:text-7xl">
            AUREK
          </h1>
          <p className="text-2xl font-bold text-purple-100 md:text-3xl">The Voice Game Master</p>
          <p className="text-lg text-purple-300">A living fantasy adventure — just speak</p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-3 gap-4 md:grid-cols-5">
          {[
            { icon: Sword, label: 'Quest' },
            { icon: ScrollText, label: 'Memory' },
            { icon: BookOpen, label: 'Journal' },
            { icon: Flame, label: 'Story' },
            { icon: Shield, label: 'Voice' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="group relative rounded-2xl border border-purple-500/20 bg-white/5 p-4 backdrop-blur-xl"
            >
              <item.icon className="mx-auto mb-2 h-8 w-8 text-cyan-300" />
              <p className="text-xs font-bold text-purple-200">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Call Button */}
        <Button
          onClick={props.onStartCall}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 px-16 py-8 text-3xl font-bold text-white shadow-2xl hover:scale-105"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-cyan-400 opacity-0 blur-xl group-hover:opacity-70"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative flex items-center gap-4">
            <PhoneIncoming className="h-10 w-10 transition-transform group-hover:rotate-12" />
            BEGIN YOUR SAGA
            <Sparkles className="h-10 w-10 text-yellow-300" />
          </span>
        </Button>

        {/* Final Line */}
        <p className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-4xl font-black text-transparent md:text-5xl">
          What do you do?
        </p>

        {/* Footer */}
        <p className="text-sm text-purple-400/60">
          LiveKit • Deepgram • Murf AI • Gemini 2.5 Flash
        </p>
      </motion.div>
    </div>
  </div>
));

WelcomeView.displayName = 'WelcomeView';
export default WelcomeView;
