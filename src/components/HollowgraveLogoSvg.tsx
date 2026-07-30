import React from 'react';

interface LogoProps {
  className?: string;
  theme?: 'neon' | 'monolith' | 'matrix' | 'gold' | 'white';
}

export const HollowgraveLogoSvg: React.FC<LogoProps> = ({ className = "w-full h-auto", theme = 'neon' }) => {
  const getThemeColors = () => {
    switch (theme) {
      case 'matrix':
        return { primary: '#22d3ee', secondary: '#0891b2', glow: 'rgba(34, 211, 238, 0.6)' };
      case 'gold':
        return { primary: '#fbbf24', secondary: '#d97706', glow: 'rgba(251, 191, 36, 0.6)' };
      case 'monolith':
        return { primary: '#ffffff', secondary: '#a3a3a3', glow: 'rgba(255, 255, 255, 0.4)' };
      case 'white':
        return { primary: '#ffffff', secondary: '#e5e7eb', glow: 'rgba(255, 255, 255, 0.8)' };
      default: // neon purple
        return { primary: '#c084fc', secondary: '#9333ea', glow: 'rgba(192, 132, 252, 0.7)' };
    }
  };

  const colors = getThemeColors();

  return (
    <svg
      viewBox="0 0 800 350"
      className={`${className} filter drop-shadow-[0_0_20px_${colors.glow}] transition-all duration-500`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="metalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor={colors.primary} />
          <stop offset="100%" stopColor="#171717" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Background dark banner plate */}
      <path
        d="M150 140 L400 120 L650 140 L700 240 L400 260 L100 240 Z"
        fill="#0a0a0f"
        stroke={colors.primary}
        strokeWidth="2"
        opacity="0.95"
      />

      {/* Spiky Wings / Thorns behind text */}
      <g stroke={colors.primary} strokeWidth="2" fill="#000000" opacity="0.8">
        <path d="M80 180 L140 100 L120 160 Z" />
        <path d="M720 180 L660 100 L680 160 Z" />
        <path d="M120 100 L180 60 L160 110 Z" />
        <path d="M680 100 L620 60 L640 110 Z" />
        <path d="M180 60 L240 40 L210 70 Z" />
        <path d="M620 60 L560 40 L590 70 Z" />
      </g>

      {/* Main HOLLOWGRAVE Death-Metal Logotype */}
      <g filter="url(#glow)">
        <text
          x="400"
          y="155"
          textAnchor="middle"
          fill="url(#metalGrad)"
          fontFamily="system-ui, sans-serif"
          fontWeight="900"
          fontStyle="italic"
          fontSize="82"
          letterSpacing="4"
          stroke="#000000"
          strokeWidth="3"
        >
          HOLLOWGRAVE
        </text>
      </g>

      {/* Develop & Edit Bar */}
      <g transform="translate(0, 195)">
        {/* Left wing line */}
        <path d="M120 10 L310 10 L340 25 L360 10 L400 10" stroke={colors.primary} strokeWidth="2.5" />
        {/* Right wing line */}
        <path d="M680 10 L490 10 L460 25 L440 10 L400 10" stroke={colors.primary} strokeWidth="2.5" />
        
        {/* PRODUCTION text */}
        <text x="210" y="16" fill="#ffffff" fontFamily="monospace" fontSize="15" fontWeight="bold" letterSpacing="4" textAnchor="middle">
          PRODUCTION
        </text>

        {/* FIRM text */}
        <text x="590" y="16" fill="#ffffff" fontFamily="monospace" fontSize="15" fontWeight="bold" letterSpacing="6" textAnchor="middle">
          FIRM
        </text>

        {/* Center Diamond / Crest Icon */}
        <polygon points="400,0 410,12 400,24 390,12" fill={colors.primary} />
      </g>

      {/* Central Sharp Downward Dagger / Crest */}
      <g transform="translate(400, 220)">
        <path d="M0 0 L12 40 L0 110 L-12 40 Z" fill="url(#metalGrad)" stroke={colors.secondary} strokeWidth="1.5" />
        <path d="M0 -10 L4 20 L0 80 L-4 20 Z" fill="#ffffff" />
        <circle cx="0" cy="5" r="4" fill="#000000" />
      </g>

      {/* Decorative thorns extending from center */}
      <path d="M350 230 L300 270 L340 250 Z" fill={colors.primary} opacity="0.7" />
      <path d="M450 230 L500 270 L460 250 Z" fill={colors.primary} opacity="0.7" />
    </svg>
  );
};
