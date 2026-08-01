import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HollowgraveEmblemSvg } from './HollowgraveEmblemSvg';
import { Sparkles, Terminal, ShieldCheck, Zap } from 'lucide-react';

interface IntroSplashProps {
  onComplete?: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState('INITIALIZING HOLLOWGRAVE CORE...');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user already saw intro in current session
    const hasSeenIntro = sessionStorage.getItem('hg_has_seen_intro');
    if (hasSeenIntro) {
      setIsVisible(false);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            sessionStorage.setItem('hg_has_seen_intro', 'true');
            onComplete?.();
          }, 400);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 15) + 8;
        if (next > 30 && next <= 65) {
          setPhaseText('LOADING GRAPHICS & WORKFLOW ENGINES...');
        } else if (next > 65 && next <= 90) {
          setPhaseText('CALIBRATING HIGH-IMPACT LAYOUTS...');
        } else if (next > 90) {
          setPhaseText('SYSTEM READY • ENTERING DIGITAL FIRM');
        }

        return next > 100 ? 100 : next;
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#05050c] text-white selection:bg-purple-500 overflow-hidden"
      >
        {/* Background Ambient Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-indigo-600/10 rounded-full pointer-events-none" />
        
        {/* Animated Cyber Grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Central Entrance Emblem & Card */}
        <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6 text-center space-y-8">
          
          {/* Emblem Container with Pulsing Rings */}
          <div className="relative flex items-center justify-center">
            {/* Pulsing Outer Rings */}
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-36 h-36 rounded-full border border-purple-500/40 bg-purple-500/10 blur-sm"
            />
            <motion.div
              animate={{ scale: [1.1, 1.4, 1.1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
              className="absolute w-44 h-44 rounded-full border border-indigo-500/30 bg-indigo-500/5 blur-md"
            />

            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 w-28 h-28 p-2 rounded-3xl bg-neutral-950/90 border-2 border-purple-500/60 shadow-2xl shadow-purple-600/40 backdrop-blur-xl flex items-center justify-center"
            >
              <HollowgraveEmblemSvg className="w-full h-full text-purple-400 drop-shadow-[0_0_20px_rgba(192,132,252,0.8)]" theme="neon" />
            </motion.div>
          </div>

          {/* Agency Title & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-700/60 text-[11px] font-mono text-purple-300 uppercase tracking-widest shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>HOLLOWGRAVE PRODUCTION & FIRM</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-sans">
              Digital Excellence Unlocked
            </h1>
          </motion.div>

          {/* Progress & Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400 px-1">
              <span className="flex items-center gap-1.5 text-purple-300">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                {phaseText}
              </span>
              <span className="font-bold text-white text-sm">{progress}%</span>
            </div>

            {/* Glowing Custom Bar */}
            <div className="w-full h-2 rounded-full bg-neutral-900 border border-neutral-800 p-0.5 overflow-hidden shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
          </motion.div>

          {/* Direct Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => {
              setIsVisible(false);
              sessionStorage.setItem('hg_has_seen_intro', 'true');
              onComplete?.();
            }}
            className="text-[11px] font-mono text-neutral-400 hover:text-purple-300 transition-colors uppercase tracking-widest underline decoration-purple-500/40 underline-offset-4"
          >
            Skip Intro →
          </motion.button>

        </div>

        {/* Footer Status */}
        <div className="absolute bottom-6 left-0 right-0 text-center text-[10px] font-mono text-neutral-400 flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" /> Founder Verified
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Zap className="w-3 h-3 text-indigo-400" /> High-Performance Engine
          </span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
