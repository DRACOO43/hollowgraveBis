import React from 'react';
import { ShieldCheck, Zap, Users, MessageSquareCode, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { DiscordIcon } from './DiscordIcon';

export const DiscordBanner: React.FC = () => {
  return (
    <section className="py-20 bg-[#05050c] relative overflow-hidden border-y border-indigo-900/40">
      {/* Background Neon Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/25 via-[#05050c] to-[#05050c] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-80 h-80 bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.8) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="relative rounded-3xl bg-gradient-to-br from-indigo-950/80 via-[#0a0a16]/90 to-purple-950/70 border border-indigo-500/40 p-8 sm:p-12 lg:p-16 shadow-2xl shadow-indigo-950/60 backdrop-blur-2xl overflow-hidden group">
          
          {/* Subtle Ambient Pulse Ring */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-mono font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <DiscordIcon className="w-4 h-4 text-indigo-400" />
                <span>OFFICIAL DISCORD COMMUNITY & CLIENT HUB</span>
              </div>

              {/* Title */}
              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Join Our <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">Discord</span> Community
              </h2>

              {/* Paragraph */}
              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-2xl">
                Skip the generic contact forms and long wait times. Join our official Discord server for direct 1-on-1 access to founders <strong className="text-white">Anshuman Bhalerao</strong> & <strong className="text-white">Raja Sahu</strong>, live project scoping, and real-time design & development updates.
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {[
                  { icon: ShieldCheck, text: 'Direct Access to Anshuman & Raja' },
                  { icon: Zap, text: '< 2 Hour Average Response Time' },
                  { icon: MessageSquareCode, text: 'Live Voice & Scoping Channels' },
                  { icon: Users, text: 'Exclusive Client Progress Tracking' },
                ].map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-neutral-950/60 border border-neutral-800/80 text-neutral-200 text-xs font-medium backdrop-blur-md">
                    <feat.icon className="w-4 h-4 text-indigo-400 shrink-0" />
                    <span>{feat.text}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Call To Action Box */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
              <div className="w-full max-w-md p-6 sm:p-8 rounded-2xl bg-neutral-950/90 border border-indigo-500/30 shadow-2xl space-y-6 text-center backdrop-blur-xl relative">
                
                <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-400/40 text-indigo-400 flex items-center justify-center mx-auto shadow-xl shadow-indigo-600/30">
                  <DiscordIcon className="w-9 h-9" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-extrabold text-white">Ready To Build Something Iconic?</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    Over 500+ creators, brands, and clients communicate with us daily on Discord.
                  </p>
                </div>

                <a
                  href="https://discord.gg/8znW9nfYhQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all duration-300 shadow-2xl shadow-indigo-600/50 hover:scale-[1.03] border border-indigo-400/40 flex items-center justify-center gap-3 animate-glow-pulse group"
                >
                  <DiscordIcon className="w-5 h-5 text-white group-hover:rotate-12 transition-transform duration-300" />
                  <span>JOIN OUR DISCORD NOW</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-center gap-2 text-[11px] font-mono text-indigo-300/90">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Instant Access • Free Consultation</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
