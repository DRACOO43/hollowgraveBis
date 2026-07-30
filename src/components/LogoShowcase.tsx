import React, { useState, useRef } from 'react';
import { Sparkles, Zap, Shield, Play, RotateCw, Upload, Image as ImageIcon, Sliders } from 'lucide-react';
import { useToast } from './Toast';
import { HollowgraveLogoSvg } from './HollowgraveLogoSvg';
import { HollowgraveEmblemSvg } from './HollowgraveEmblemSvg';

export const LogoShowcase: React.FC = () => {
  const { showToast } = useToast();
  const [activeTheme, setActiveTheme] = useState<'neon' | 'monolith' | 'matrix' | 'gold'>('neon');
  const [isGlitching, setIsGlitching] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [customLogoUrl, setCustomLogoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotation({
      x: (-y / 15),
      y: (x / 15)
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  const triggerGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomLogoUrl(url);
      showToast('Logo uploaded and loaded into interactive showcase!');
    }
  };

  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.4em] text-purple-400 font-mono mb-3 block">
            Brand Identity Showcase
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            The HOLLOWGRAVE Emblem
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed mb-8">
            Engineered with brutalist sharpness, metallic depth, and futuristic precision. Upload your logo image or explore the interactive 3D animated showcase.
          </p>

          {/* Upload Button & Theme Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-mono text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Your Logo Image</span>
            </button>
            {customLogoUrl && (
              <button
                onClick={() => setCustomLogoUrl(null)}
                className="px-5 py-3 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                Reset to Default Emblem
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { id: 'neon', label: 'Neon Purple' },
              { id: 'monolith', label: 'Pure Monolith' },
              { id: 'matrix', label: 'Matrix Cyan' },
              { id: 'gold', label: 'Void Gold' }
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTheme(t.id as any)}
                className={`px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all ${
                  activeTheme === t.id
                    ? 'bg-white text-black font-bold shadow-lg shadow-white/20'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive 3D Showcase Card */}
        <div className="max-w-4xl mx-auto">
          <div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={triggerGlitch}
            className={`relative rounded-3xl p-12 transition-all duration-300 backdrop-blur-2xl cursor-pointer group overflow-hidden ${
              activeTheme === 'neon' ? 'bg-gradient-to-b from-purple-950/40 via-neutral-900/80 to-black border-2 border-purple-500/50 shadow-[0_0_50px_rgba(168,85,247,0.25)]' :
              activeTheme === 'monolith' ? 'bg-neutral-900/90 border-2 border-neutral-700 shadow-2xl' :
              activeTheme === 'matrix' ? 'bg-gradient-to-b from-cyan-950/40 via-neutral-900/80 to-black border-2 border-cyan-500/50 shadow-[0_0_50px_rgba(6,182,212,0.25)]' :
              'bg-gradient-to-b from-amber-950/40 via-neutral-900/80 to-black border-2 border-amber-500/50 shadow-[0_0_50px_rgba(245,158,11,0.25)]'
            }`}
            style={{
              transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Ambient Corner Accents */}
            <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest text-white/30 uppercase">[SYS.EMBLEM_V2]</div>
            <div className="absolute top-4 right-4 font-mono text-[10px] tracking-widest text-white/30 uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
              Interactive 3D
            </div>

            {/* Logo Rendering Frame */}
            <div className={`py-8 flex flex-col items-center justify-center text-center transition-all duration-500 ${isGlitching ? 'animate-pulse scale-105 filter hue-rotate-90' : ''}`}>
              
              {customLogoUrl ? (
                <div className="relative my-6 max-w-xl w-full p-4 rounded-2xl bg-black/50 border border-white/10 flex items-center justify-center overflow-hidden">
                  <img
                    src={customLogoUrl}
                    alt="HOLLOWGRAVE Custom Logo"
                    className="max-h-80 w-auto object-contain filter drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] animate-float"
                  />
                </div>
              ) : (
                <div className="w-full max-w-3xl mx-auto py-4 flex flex-col items-center gap-8">
                  <div className="w-32 h-32 md:w-40 md:h-40 filter drop-shadow-[0_0_30px_rgba(192,132,252,0.4)] animate-float">
                    <HollowgraveEmblemSvg className="w-full h-full" theme={activeTheme} />
                  </div>
                  <HollowgraveLogoSvg className="w-full h-auto drop-shadow-2xl" theme={activeTheme} />
                </div>
              )}

              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest mt-6">
                Click anywhere to trigger neural glitch simulation
              </span>
            </div>

            {/* Bottom Specs Bar */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-400 gap-4">
              <span>FORMAT: HIGH-RES VECTOR & METALLIC SHADER</span>
              <span>CREATORS: ANSHUMAN BHALERAO & RAJA SAHU</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

