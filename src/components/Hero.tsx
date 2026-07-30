import React from 'react';
import { ArrowRight, Sparkles, Play, Code2, Film, Layers } from 'lucide-react';

interface HeroProps {
  onOpenProjectRequest: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenProjectRequest }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#050505] text-[#F5F5F5]">
      {/* Background Glows & Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-12 bg-purple-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">HollowGrave Production & Firm</span>
            </div>

            <h1 className="text-5xl sm:text-7xl lg:text-[96px] leading-[0.88] font-black tracking-tighter italic mb-8">
              HOLLOW<span className="text-transparent text-stroke">GRAVE</span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl font-mono not-italic tracking-wider text-purple-300 font-bold mt-2">
                Production & Firm
              </span>
            </h1>

            <p className="max-w-xl text-lg sm:text-xl text-white/70 leading-relaxed mb-10">
              The ultimate creative studio and digital production firm. We build ultra-sleek websites, high-converting web apps, cinematic video edits, and global brand identities.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-12">
              <button
                onClick={onOpenProjectRequest}
                className="px-8 py-4 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-full hover:bg-purple-500 hover:text-white transition-all shadow-xl shadow-white/5 flex items-center gap-3 group"
              >
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#portfolio"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all flex items-center gap-3 backdrop-blur-xl"
              >
                <Play className="w-3.5 h-3.5 text-purple-400 fill-current" />
                <span>View Portfolio</span>
              </a>
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-white/10">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-black bg-purple-600 grid place-items-center text-[10px] font-bold text-white shadow-lg" title="Anshuman Bhalerao">AB</div>
                <div className="w-10 h-10 rounded-full border-2 border-black bg-blue-600 grid place-items-center text-[10px] font-bold text-white shadow-lg" title="Raja Sahu">RS</div>
                <div className="w-10 h-10 rounded-full border-2 border-black bg-indigo-600 grid place-items-center text-[10px] font-bold text-white shadow-lg" title="Prince Jaiswal">PJ</div>
                <div className="w-10 h-10 rounded-full border-2 border-black bg-emerald-600 grid place-items-center text-[10px] font-bold text-white shadow-lg" title="Kabir Singh">KS</div>
              </div>
              <div className="text-xs">
                <span className="block font-bold text-white">Anshuman, Raja, Prince & Kabir</span>
                <span className="text-white/40 uppercase tracking-wider">Leadership & Creative Leads</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-bold uppercase text-purple-400 tracking-widest">Live Project</span>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold mb-3 text-white">Project: Ethereal Labs</h3>
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-3">
                <div className="w-[84%] h-full bg-gradient-to-r from-purple-500 to-blue-500" />
              </div>
              <div className="flex justify-between text-[10px] text-white/40 uppercase font-mono">
                <span>Efficiency: 98%</span>
                <span>Progress: 84%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-white">120+</span>
                <span className="text-[10px] text-white/40 uppercase tracking-tighter mt-1">Projects Done</span>
              </div>
              <div className="p-5 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-white">18</span>
                <span className="text-[10px] text-white/40 uppercase tracking-tighter mt-1">Countries</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 backdrop-blur-md">
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-purple-300 opacity-80">Next Available Slot</div>
              <div className="text-sm font-semibold text-white">September 2026 Cohort</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

