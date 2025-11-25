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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Subtle Zomato-inspired background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-orange-500/5 to-amber-600/10" />
        <div className="absolute top-0 left-0 h-96 w-96 -translate-x-1/2 translate-y-1/4 rounded-full bg-red-500 opacity-20 blur-3xl filter" />
        <div className="absolute right-0 bottom-0 h-96 w-96 translate-x-1/3 -translate-y-1/3 rounded-full bg-orange-500 opacity-20 blur-3xl filter" />
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
            className="animate-float absolute opacity-20"
            style={{ animationDelay: delay, ...pos }}
          >
            <Icon className="h-16 w-16 text-red-600" />
          </div>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-12">
        <div
          className={`max-w-5xl text-center transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Zomato-style Logo */}
          <div className="mb-8 inline-block">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse bg-red-500 opacity-40 blur-3xl" />
              <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-orange-600 shadow-2xl ring-8 ring-red-500/30">
                <div className="rounded-full bg-white p-6 shadow-inner">
                  <Store className="h-16 w-16 text-red-600" strokeWidth={3} />
                </div>
              </div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-red-700 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl">
            Grow Your Restaurant with Zomato
          </h1>

          <p className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-gray-700 md:text-2xl">
            Join <span className="font-bold text-red-600">350,000+ restaurants</span> getting more
            orders every day.
            <br />
            <span className="font-semibold text-orange-600">
              No upfront fees • Only pay per order • Onboard in 48 hours
            </span>
          </p>

          {/* Trust & Benefits Grid */}
          <div className="mb-12 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: TrendingUp, label: '10x More Orders', color: 'text-green-600' },
              { icon: Clock, label: '48hr Onboarding', color: 'text-orange-600' },
              { icon: Star, label: '4.4+ Rating', color: 'text-yellow-600' },
              { icon: Users, label: 'Pan-India Reach', color: 'text-red-600' },
            ].map(({ icon: Icon, label, color }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-2xl border border-gray-200 bg-white/70 p-6 shadow-lg backdrop-blur-sm transition-all hover:scale-105 hover:shadow-xl"
              >
                <Icon className={`h-10 w-10 ${color} mb-2`} />
                <span className="text-sm font-bold text-gray-800">{label}</span>
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
                className="flex items-center gap-3 rounded-full border border-red-200 bg-red-50 px-6 py-3 text-red-700 transition-all hover:bg-red-100 hover:shadow-md"
              >
                <Icon className="h-5 w-5" />
                <span className="font-semibold">{text}</span>
              </div>
            ))}
          </div>

          {/* Main CTA Button */}
          <div className="mb-10">
            <Button
              onClick={onStartCall}
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-red-600 to-orange-600 px-16 py-8 text-2xl font-bold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-red-500/40 md:text-3xl"
            >
              <span className="relative z-10 flex items-center gap-4">
                <PhoneCall className="h-10 w-10 transition-transform group-hover:rotate-12" />
                {startButtonText}
                <ArrowRight className="h-9 w-9 transition-transform group-hover:translate-x-4" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 transition-opacity group-hover:opacity-70" />
            </Button>
          </div>

          {/* Subtext */}
          <p className="text-lg text-gray-600">
            Speak directly with <span className="font-bold text-red-600">Aarav</span> — your Zomato
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
