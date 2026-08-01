import React from 'react';
import { Play } from 'lucide-react';
import { DiscordIcon } from './DiscordIcon';
import { motion } from 'motion/react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-20 overflow-hidden bg-[#050505] text-[#F5F5F5]">
      {/* Background Glows & Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-purple-900/20 rounded-full opacity-60 pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[450px] h-[450px] bg-indigo-900/15 rounded-full opacity-60 pointer-events-none" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="lg:col-span-8"
          >
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-12 bg-purple-500" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-purple-400">HollowGrave Production & Firm</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              className="text-5xl sm:text-7xl lg:text-[96px] leading-[0.88] font-black tracking-tighter italic mb-8 select-none group relative"
            >
              <span className="inline-block bg-gradient-to-r from-white via-neutral-100 to-neutral-400 bg-clip-text text-transparent transition-all duration-300 hover:scale-[1.02] animate-rgb-split">
                HOLLOW
              </span>
              <span className="inline-block text-transparent text-stroke-purple bg-gradient-to-r from-purple-400 via-indigo-300 to-pink-400 bg-clip-text animate-cyber-glitch ml-2 hover:brightness-125">
                GRAVE
              </span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl font-mono not-italic tracking-wider text-purple-300 font-bold mt-3 flex items-center gap-3">
                <span className="bg-gradient-to-r from-purple-300 via-indigo-200 to-purple-400 bg-clip-text text-transparent hover:tracking-widest transition-all duration-500">
                  Production & Firm
                </span>
                <span className="inline-block w-3 h-3 rounded-full bg-purple-500 animate-ping opacity-80 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="max-w-xl text-lg sm:text-xl text-white/70 leading-relaxed mb-10"
            >
              The ultimate creative studio and digital production firm. We build ultra-sleek websites, high-converting web apps, cinematic video edits, and global brand identities.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12"
            >
              <a
                href="https://discord.gg/8znW9nfYhQ"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 border border-indigo-400/40 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300 flex items-center gap-3 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-105 backdrop-blur-xl group"
              >
                <DiscordIcon className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
                <span>Join Our Discord</span>
              </a>

              <a
                href="#portfolio"
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all flex items-center gap-3 backdrop-blur-xl"
              >
                <Play className="w-3.5 h-3.5 text-purple-400 fill-current" />
                <span>View Portfolio</span>
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex items-center gap-6 pt-4 border-t border-white/10"
            >
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
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-4 space-y-4"
          >
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

            <div className="p-5 rounded-xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30 backdrop-blur-md">
              <div className="text-[10px] font-bold uppercase tracking-widest mb-1 text-purple-300 opacity-80">Next Available Slot</div>
              <div className="text-sm font-semibold text-white">September 2026 Cohort</div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
