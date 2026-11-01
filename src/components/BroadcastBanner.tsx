import React, { useState, useEffect } from 'react';
import { BroadcastMessage } from '../types';
import { X, Check } from 'lucide-react';

interface BroadcastBannerProps {
  currentMessage: BroadcastMessage | null;
}

export const BroadcastBanner: React.FC<BroadcastBannerProps> = ({ currentMessage }) => {
  const [show, setShow] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (currentMessage) {
      setShow(true);
      const timer = setTimeout(() => {
        if (!isPaused) {
          setShow(false);
        }
      }, 7000);
      return () => clearTimeout(timer);
    }
  }, [currentMessage, isPaused]);

  if (!currentMessage || !show) return null;

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[99999] flex items-center gap-3 px-6 py-2.5 bg-gradient-to-b from-[#0f0a1a] to-[#080610] backdrop-blur-lg border-b border-[#a78bfa]/35 shadow-[0_8px_32px_-8px_rgba(167,139,250,0.35)] text-[#f5f5f7] transition-transform duration-450 transform translate-y-0"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="status"
    >
      <div className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-[#a78bfa] shrink-0">
        <span className="text-base">{currentMessage.emoji || '📢'}</span>
        <span>{currentMessage.admin}</span>
        {currentMessage.verified && (
          <span className="w-3.5 h-3.5 inline-flex items-center justify-center bg-[#ff3b30] rounded-full text-white text-[9px] font-bold">
            <Check className="w-2.5 h-2.5 stroke-[3]" />
          </span>
        )}
      </div>

      <span className="w-1 h-1 rounded-full bg-white/35 shrink-0 hidden sm:block"></span>

      <div className="text-xs sm:text-sm font-medium text-white/92 flex-1 min-w-0 truncate">
        {currentMessage.message}
      </div>

      <button
        onClick={() => setShow(false)}
        className="w-5 h-5 rounded-md bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0 ml-auto"
        aria-label="Tutup"
      >
        <X className="w-3 h-3" />
      </button>
    </div>
  );
};
