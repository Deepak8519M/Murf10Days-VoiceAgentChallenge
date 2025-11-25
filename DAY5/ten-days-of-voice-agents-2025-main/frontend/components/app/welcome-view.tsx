// components/WelcomeView.tsx
import { useEffect, useState } from 'react';
import { ArrowRight, Headphones, Mail, Mic, Sparkles, Store, Timer } from 'lucide-react';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  startButtonText?: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText = 'Talk to Zomato SDR',
  onStartCall,
}: WelcomeViewProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Zomato Red Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-black to-red-950" />

      {/* Animated Zomato-style Blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 animate-pulse rounded-full bg-red-600 opacity-40 blur-3xl" />
        <div className="animation-delay-2000 absolute top-20 -right-32 h-96 w-96 animate-pulse rounded-full bg-orange-600 opacity-30 blur-3xl" />
        <div className="animation-delay-4000 absolute -bottom-40 left-1/3 h-80 w-80 animate-pulse rounded-full bg-red-700 opacity-25 blur-3xl" />
      </div>

      {/* Floating Food Icons (Zomato vibe) */}
      <div className="pointer-events-none absolute inset-0">
        {['', '', '', '', '', ''].map((_, i) => (
          <div
            key={i}
            className="animate-float absolute"
            style={{
              top: `${10 + i * 15}%`,
              left: `${5 + i * 12}%`,
              animationDelay: `${i * 0.8}s`,
            }}
          >
            <div className="text-6xl text-red-500/20">Pizza</div>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <div
          className={`max-w-6xl space-y-20 transition-all duration-1200 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'}`}
        >
          {/* Zomato Logo Circle */}
          <div className="relative mx-auto">
            <div className="absolute inset-0 animate-ping rounded-full bg-red-600 opacity-30 blur-xl" />
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full bg-white shadow-2xl">
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-red-600">
                <Store className="h-20 w-20 text-white" strokeWidth={3} />
              </div>
            </div>
            <div className="absolute -inset-8 rounded-full bg-red-600/20 blur-3xl" />
          </div>

          {/* Hero Text */}
          <div className="space-y-8">
            <h1 className="text-6xl font-black tracking-tighter text-white md:text-8xl">
              Zomato
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                {' '}
                Partner AI
              </span>
            </h1>
            <p className="mx-auto max-w-4xl text-2xl leading-relaxed font-light text-gray-300 md:text-3xl">
              Meet <span className="font-bold text-red-400">Aarav</span> — your personal Zomato SDR
              <br />
              Books demos, answers questions, captures leads — all by voice
            </p>
          </div>

          {/* Feature Cards - Zomato Style */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Timer,
                title: '10-Minute Setup',
                desc: 'Get listed on Zomato in days, not weeks',
              },
              {
                icon: Mail,
                title: 'Auto Lead Capture',
                desc: 'Every call → JSON + follow-up email',
              },
              {
                icon: Sparkles,
                title: 'Real Zomato Knowledge',
                desc: 'Trained on actual partner FAQs',
              },
            ].map((f, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded-3xl border border-red-500/20 bg-white/5 p-10 backdrop-blur-xl transition-all hover:scale-105 hover:border-red-500/50 hover:bg-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-orange-600/10 opacity-0 transition-opacity group-hover:opacity-100" />
                <f.icon className="mx-auto mb-6 h-14 w-14 text-red-400" />
                <h3 className="mb-3 text-2xl font-bold text-white">{f.title}</h3>
                <p className="text-gray-300">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Zomato Red CTA Button */}
          <Button
            onClick={onStartCall}
            className="group relative overflow-hidden rounded-full bg-red-600 px-20 py-8 text-3xl font-bold text-white shadow-2xl transition-all duration-500 hover:scale-110 hover:bg-red-700 hover:shadow-red-600/50"
          >
            <span className="relative z-10 flex items-center gap-6">
              <Mic className="h-12 w-12 transition-transform group-hover:rotate-12" />
              {startButtonText}
              <ArrowRight className="h-10 w-10 transition-transform group-hover:translate-x-4" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 transition-opacity group-hover:opacity-60" />
          </Button>

          {/* Footer */}
          <div className="pt-20">
            <p className="text-xl text-gray-400">
              Powered by the fastest Indian voice —{' '}
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text font-bold text-transparent">
                Murf Falcon
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
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
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2 — s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};
