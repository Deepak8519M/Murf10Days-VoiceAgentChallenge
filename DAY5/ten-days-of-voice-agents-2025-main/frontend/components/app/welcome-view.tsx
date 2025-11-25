// components/WelcomeView.tsx
import { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bike,
  ChefHat,
  Clock,
  IndianRupee,
  PhoneCall,
  Star,
  Store,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  startButtonText?: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText = 'Talk to Aarav from Zomato',
  onStartCall,
}: WelcomeViewProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* PREMIUM CINEMATIC BACKGROUND — ONLY CHANGE */}
      <div className="absolute inset-0">
        {/* Deep luxury gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-black to-orange-950" />

        {/* Subtle warm glow orbs */}
        <div className="absolute top-0 -left-40 h-96 w-96 rounded-full bg-red-600/30 blur-3xl" />
        <div className="absolute top-40 -right-40 h-80 w-80 rounded-full bg-orange-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-600/10 blur-3xl" />

        {/* Ultra-fine grain texture for richness */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating food icons (subtle animation) */}
      <div className="pointer-events-none absolute inset-0">
        {[
          { Icon: ChefHat, delay: '0s', top: '10%', left: '10%' },
          { Icon: Bike, delay: '2s', top: '20%', right: '15%' },
          { Icon: Store, delay: '4s', bottom: '30%', left: '20%' },
          { Icon: IndianRupee, delay: '1s', top: '60%', right: '10%' },
        ].map(({ Icon, delay, ...pos }, i) => (
          <div
            key={i}
            className="animate-float absolute opacity-30"
            style={{ animationDelay: delay, ...pos }}
          >
            <Icon className="h-16 w-16 text-orange-500 drop-shadow-2xl" />
          </div>
        ))}
      </div>

      {/* EVERYTHING ELSE 100% UNCHANGED — YOUR ORIGINAL LAYOUT */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div
          className={`max-w-5xl text-center transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Zomato-style Logo */}
          <div className="mb-8 inline-block">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse bg-red-600 opacity-50 blur-3xl" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-red-600 to-orange-700 shadow-2xl ring-8 ring-red-600/40">
                <div className="rounded-full bg-white/95 p-6 shadow-inner backdrop-blur-sm">
                  <Store className="h-16 w-16 text-red-600" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="mb-6 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl">
            Grow Your Restaurant with Zomato
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl">
            Join <span className="font-bold text-red-400">350,000+ restaurants</span> getting more
            orders every day.
            <br />
            <span className="font-semibold text-orange-400">
              No upfront fees • Only pay per order • Onboard in 48 hours
            </span>
          </p>

          {/* Trust & Benefits Grid */}
          <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: TrendingUp, label: '10x More Orders', color: 'text-green-400' },
              { icon: Clock, label: '48hr Onboarding', color: 'text-orange-400' },
              { icon: Star, label: '4.4+ Rating', color: 'text-yellow-400' },
              { icon: Users, label: 'Pan-India Reach', color: 'text-red-400' },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:border-red-500/50 hover:bg-white/10"
              >
                <Icon className={`h-10 w-10 ${color} mb-2`} />
                <span className="text-sm font-bold text-gray-200">{label}</span>
              </div>
            ))}
          </div>

          {/* Feature Pills */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {[
              { icon: Zap, text: 'Zero Upfront Cost' },
              { icon: Bike, text: 'Fast Delivery Fleet' },
              { icon: PhoneCall, text: 'Dedicated Support' },
              { icon: IndianRupee, text: 'Best Commission Rates' },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-3 rounded-full border border-red-500/30 bg-red-950/50 px-6 py-3 text-orange-300 transition-all hover:border-orange-500/60 hover:bg-red-900/60"
              >
                <Icon className="h-5 w-5 text-orange-400" />
                <span className="font-semibold">{text}</span>
              </div>
            ))}
          </div>

          {/* Main CTA Button */}
          <div className="mb-10">
            <Button
              onClick={onStartCall}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-red-600 to-orange-600 px-16 py-8 text-2xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-red-600/50 md:text-3xl"
            >
              <span className="relative z-10 flex items-center gap-4">
                <PhoneCall className="h-10 w-10 transition-transform group-hover:rotate-12" />
                {startButtonText}
                <ArrowRight className="h-9 w-9 transition-transform group-hover:translate-x-4" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 transition-opacity group-hover:opacity-80" />
            </Button>
          </div>

          {/* Subtext */}
          <p className="text-lg text-gray-400">
            Speak directly with <span className="font-bold text-red-400">Aarav</span> — your Zomato
            Partner Manager
            <br />
            <span className="text-sm text-gray-500">Average call: 3–5 minutes • No obligation</span>
          </p>
        </div>
      </div>

      {/* Floating Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
