import React from 'react';

interface EmblemProps {
  className?: string;
  theme?: 'neon' | 'monolith' | 'matrix' | 'gold' | 'white';
}

export const HollowgraveEmblemSvg: React.FC<EmblemProps> = ({ className = "w-10 h-10", theme = 'neon' }) => {
  const getThemeColor = () => {
    switch (theme) {
      case 'matrix': return '#22d3ee';
      case 'gold': return '#fbbf24';
      case 'white': return '#ffffff';
      default: return '#c084fc';
    }
  };

  const glowColor = getThemeColor();

  return (
    <svg
      viewBox="0 0 500 500"
      className={`${className} transition-all duration-300`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="emblemGlow" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#000000" />
          <stop offset="100%" stopColor={glowColor} stopOpacity="0.4" />
        </radialGradient>
      </defs>

      {/* Outer circular badge */}
      <circle cx="250" cy="250" r="235" fill="black" stroke={glowColor} strokeWidth="8" />

      {/* Gothic 'Ћ' / 'h' character exactly matching user's image */}
      <g fill="#FFFFFF">
        {/* Left vertical pillar with top serif */}
        <path d="M110 120 L220 120 L220 380 L110 380 Z" />
        <path d="M100 120 L130 120 L130 140 L100 140 Z" />

        {/* Top horizontal bar */}
        <path d="M220 120 L370 120 L370 145 L220 145 Z" />

        {/* Right curved gothic bowl/thorn sweeping down to sharp point */}
        <path d="M220 220 C290 220 330 240 355 270 C375 295 385 330 365 375 C355 395 340 415 320 435 L290 410 C310 390 325 370 335 350 C345 325 335 305 320 290 C305 275 275 265 220 265 Z" />
      </g>
    </svg>
  );
};
