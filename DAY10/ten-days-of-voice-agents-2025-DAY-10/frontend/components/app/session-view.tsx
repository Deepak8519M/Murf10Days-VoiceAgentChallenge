'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { type LocalParticipant, ParticipantEvent } from 'livekit-client';
import { useLocalParticipant } from '@livekit/components-react';
import type { AppConfig } from '@/app-config';
import { ChatTranscript } from '@/components/app/chat-transcript';
import { TileLayout } from '@/components/app/tile-layout';
import {
  AgentControlBar,
  type ControlBarControls,
} from '@/components/livekit/agent-control-bar/agent-control-bar';
import { useChatMessages } from '@/hooks/useChatMessages';
import { useConnectionTimeout } from '@/hooks/useConnectionTimout';
import { useDebugMode } from '@/hooks/useDebug';

const IN_DEVELOPMENT = process.env.NODE_ENV !== 'production';

// === PLAYER BADGE — NOW A FLOATING ORB ===
function PlayerBadge({ participant }: { participant?: LocalParticipant }) {
  const [name, setName] = useState('You');

  useEffect(() => {
    if (!participant) return;
    const update = () => {
      let n = participant.name || '';
      if ((!n || n === 'user' || n === 'identity') && participant.metadata) {
        try {
          const meta = JSON.parse(participant.metadata);
          n = meta.name || meta.displayName || n;
        } catch {}
      }
      setName(n.trim() || 'You');
    };
    update();
    participant.on(ParticipantEvent.NameChanged, update);
    participant.on(ParticipantEvent.MetadataChanged, update);
    return () => {
      participant.off(ParticipantEvent.NameChanged, update);
      participant.off(ParticipantEvent.MetadataChanged, update);
    };
  }, [participant]);

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.6 }}
      className="absolute top-10 left-1/2 z-50 -translate-x-1/2"
    >
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 scale-150 animate-pulse rounded-full bg-emerald-400/30 blur-3xl" />

        {/* Badge */}
        <div className="relative flex items-center gap-5 rounded-full border border-emerald-400/50 bg-black/70 px-8 py-5 shadow-2xl ring-2 ring-emerald-400/40 backdrop-blur-2xl">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 via-cyan-400 to-teal-500 p-0.5">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-9 w-9 text-emerald-400"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </div>
            </div>
            <div className="absolute -inset-1 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-70 blur-xl" />
          </div>

          <div className="text-left">
            <p className="text-xs font-black tracking-widest text-emerald-300 uppercase">
              Contestant
            </p>
            <p className="text-2xl font-black tracking-tight text-white">{name}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const SessionView = ({ appConfig }: { appConfig: AppConfig }) => {
  useConnectionTimeout(200_000);
  useDebugMode({ enabled: IN_DEVELOPMENT });

  const { localParticipant } = useLocalParticipant();
  const messages = useChatMessages();
  const [chatOpen, setChatOpen] = useState(false);

  const controls: ControlBarControls = {
    leave: true,
    microphone: true,
    chat: appConfig.supportsChatInput,
    camera: appConfig.supportsVideoInput,
    screenShare: appConfig.supportsVideoInput,
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Epic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-black via-60% to-purple-950/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30" />

      {/* Subtle floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 h-96 w-96 animate-pulse rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute right-32 bottom-32 h-80 w-80 animate-pulse rounded-full bg-cyan-500/10 blur-3xl delay-700" />
        <div className="absolute top-1/3 right-1/4 h-64 w-64 animate-pulse rounded-full bg-purple-600/10 blur-3xl delay-1000" />
      </div>

      {/* Player Badge — God tier */}
      <PlayerBadge participant={localParticipant} />

      {/* Main Stage — Perfect center */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, type: 'spring', stiffness: 80 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative">
          {/* Glow behind agent */}
          <div className="absolute inset-0 scale-150 animate-pulse bg-emerald-400/20 blur-3xl" />
          <TileLayout chatOpen={chatOpen} />
        </div>
      </motion.div>

      {/* Chat Panel — Slides in from right */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-32 right-6 bottom-32 w-96 overflow-y-auto rounded-3xl border border-emerald-500/40 bg-black/60 p-8 shadow-2xl ring-2 ring-emerald-400/30 backdrop-blur-2xl"
          >
            <h3 className="mb-6 text-xl font-black text-emerald-400">Live Chat</h3>
            <ChatTranscript messages={messages} className="space-y-4" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Control Bar — Floating center bottom */}
      <motion.div
        initial={{ y: 150, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 120 }}
        className="absolute bottom-12 left-1/2 z-50 -translate-x-1/2"
      >
        <div className="relative">
          {/* Glow under bar */}
          <div className="absolute inset-x-0 -bottom-10 h-32 bg-gradient-to-t from-emerald-500/20 to-transparent blur-3xl" />

          <div className="rounded-full border border-emerald-400/50 bg-black/70 px-10 py-7 shadow-2xl ring-2 ring-emerald-400/40 backdrop-blur-2xl">
            <AgentControlBar controls={controls} onChatOpenChange={setChatOpen} />
          </div>
        </div>
      </motion.div>

      {/* Listening text — subtle & classy */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 font-medium tracking-wider text-emerald-300/80"
      >
        Host is listening — show your talent
      </motion.p>
    </section>
  );
};
