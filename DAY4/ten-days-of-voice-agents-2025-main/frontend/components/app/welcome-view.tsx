// components/WelcomeView.tsx  (or wherever you keep it)
import { useEffect, useState } from 'react';
import { Brain, Code2, Mic, Sparkles, Volume2 } from 'lucide-react';
import { Button } from '@/components/livekit/button';

interface WelcomeViewProps {
  startButtonText?: string;
  onStartCall: () => void;
}

export const WelcomeView = ({
  startButtonText = 'Start Voice Session',
  onStartCall,
}: WelcomeViewProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Waves */}
      <div className="absolute inset-0 opacity-30">
        <div className="animate-blob absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-500 mix-blend-multiply blur-3xl filter" />
        <div className="animation-delay-2000 animate-blob absolute -top-40 -right-40 h-80 w-80 rounded-full bg-pink-500 mix-blend-multiply blur-3xl filter" />
        <div className="animation-delay-4000 animate-blob absolute -bottom-40 left-40 h-80 w-80 rounded-full bg-indigo-500 mix-blend-multiply blur-3xl filter" />
      </div>

      {/* Sound Wave Visualizer (Premium Touch) */}
      <div className="pointer-events-none absolute inset-x-0 top-32 flex justify-center">
        <div className="flex gap-2">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="animate-soundwave w-2 rounded-full bg-purple-400"
              style={{
                animationDelay: `${i * 0.15}s`,
                height: `${Math.random() * 60 + 40}px`,
              }}
            />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={`reverse-${i}`}
              className="animate-soundwave w-2 rounded-full bg-purple-400"
              style={{
                animationDelay: `${(4 - i) * 0.15}s`,
                height: `${Math.random() * 60 + 40}px`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        {/* Logo + Title */}
        <div
          className={`space-y-8 transition-all duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-purple-600 to-pink-600 opacity-70 blur-2xl" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 shadow-2xl">
                <Brain className="h-14 w-14 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-7xl">
              CSE Active Recall Coach
            </h1>
            <p className="mx-auto max-w-2xl text-xl font-light text-purple-200 md:text-2xl">
              Master <span className="font-bold text-pink-300">Variables • Loops • Functions</span>{' '}
              by teaching an AI that changes its voice for every mode
            </p>
          </div>

          {/* Voice Mode Cards */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                voice: 'Matthew',
                role: 'Calm Teacher',
                icon: <Mic className="h-8 w-8" />,
                color: 'from-blue-500 to-cyan-500',
              },
              {
                voice: 'Alicia',
                role: 'Excited Quiz Host',
                icon: <Volume2 className="h-8 w-8" />,
                color: 'from-pink-500 to-rose-500',
              },
              {
                voice: 'Ken',
                role: 'Supportive Coach',
                icon: <Sparkles className="h-8 w-8" />,
                color: 'from-purple-500 to-indigo-500',
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg transition-all duration-500 hover:scale-105 hover:bg-white/10`}
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 transition-opacity group-hover:opacity-20`}
                />
                <div className="relative z-10 space-y-4">
                  <div
                    className={`w-fit rounded-xl bg-gradient-to-br p-4 ${item.color} text-white`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">{item.voice}</h3>
                  <p className="text-purple-200">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div
          className={`mt-16 transition-all delay-700 duration-1000 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
        >
          <Button
            variant="primary"
            size="lg"
            onClick={onStartCall}
            className="relative transform bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-6 text-lg font-bold tracking-wider shadow-2xl transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-pink-700"
          >
            <Code2 className="mr-3 h-6 w-6" />
            {startButtonText}
          </Button>
        </div>

        {/* Footer */}
        <div className="absolute right-0 bottom-8 left-0 text-center">
          <p className="text-sm text-purple-300">
            Powered by{' '}
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text font-bold text-transparent">
              Murf Falcon
            </span>{' '}
            + LiveKit Agents
          </p>
        </div>
      </div>

      {/* Tailwind Animations (add to globals.css or tailwind.config if not already there) */}
      <style jsx>{`
        @keyframes blob {
          0%,
          100% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        .animate-blob {
          animation: blob 20s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes soundwave {
          0%,
          100% {
            transform: scaleY(0.3);
          }
          50% {
            transform: scaleY(1);
          }
        }
        .animate-soundwave {
          animation: soundwave 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
