'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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

function PlayerBadge({ participant }: { participant?: LocalParticipant }) {
  const [displayName, setDisplayName] = useState('You');

  useEffect(() => {
    if (!participant) return;

    const updateName = () => {
      let name = participant.name || '';
      if ((!name || name === 'user' || name === 'identity') && participant.metadata) {
        try {
          const meta = JSON.parse(participant.metadata);
          if (meta.name) name = meta.name;
          if (meta.displayName) name = meta.displayName;
        } catch {}
      }
      setDisplayName(name.trim() || 'You');
    };

    updateName();
    participant.on(ParticipantEvent.NameChanged, updateName);
    participant.on(ParticipantEvent.MetadataChanged, updateName);

    return () => {
      participant.off(ParticipantEvent.NameChanged, updateName);
      participant.off(ParticipantEvent.MetadataChanged, updateName);
    };
  }, [participant]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="absolute top-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-2xl border border-emerald-500/40 bg-black/60 px-6 py-3 shadow-2xl ring-1 ring-emerald-400/30 backdrop-blur-xl"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-7 w-7 text-black"
        >
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      </div>
      <div className="text-left">
        <div className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
          Contestant
        </div>
        <div className="text-xl font-black tracking-tight text-white">{displayName}</div>
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
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-purple-900/20" />

      {/* Player Badge - Now Perfectly Centered */}
      <PlayerBadge participant={localParticipant} />

      {/* Main Agent Visuals - Centered */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <TileLayout chatOpen={chatOpen} />
      </div>

      {/* Chat - Optional, Right Side */}
      {chatOpen && (
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          className="fixed top-24 right-4 bottom-32 w-96 overflow-hidden rounded-2xl border border-emerald-500/30 bg-black/60 p-6 shadow-2xl ring-1 ring-emerald-400/20 backdrop-blur-xl"
        >
          <ChatTranscript messages={messages} className="h-full space-y-4" />
        </motion.div>
      )}

      {/* Bottom Control Bar - Perfectly Centered */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
        className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2"
      >
        <div className="rounded-3xl border border-emerald-500/40 bg-black/70 px-8 py-6 shadow-2xl ring-1 ring-emerald-400/30 backdrop-blur-2xl">
          <AgentControlBar controls={controls} onChatOpenChange={setChatOpen} />
        </div>
      </motion.div>

      {/* Optional subtle hint when host is listening */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center"
      >
        <p className="text-sm font-medium tracking-wider text-white/60">
          Host is listening, show your talent
        </p>
      </motion.div>
    </section>
  );
};
