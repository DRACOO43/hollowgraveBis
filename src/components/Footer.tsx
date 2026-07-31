import React, { useState } from 'react';
import { Terminal, Send, Mail, CheckCircle2, Sparkles, Loader2, ShieldCheck } from 'lucide-react';
import { useToast } from './Toast';
import { DiscordIcon } from './DiscordIcon';

export const Footer: React.FC = () => {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(data.message || 'Subscribed successfully!');
        setSubscribed(true);
        setEmail('');
      } else {
        showToast(data.error || 'Subscription failed', 'error');
      }
    } catch {
      showToast('Network error while connecting to server', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#050508] border-t border-neutral-900 pt-16 pb-12 relative overflow-hidden text-neutral-400">
      {/* Background ambient light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-purple-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* ==========================================
            DISCORD COMMUNITY & NEWSLETTER SECTION
           ========================================== */}
        <div className="mb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Discord CTA Card */}
          <div className="lg:col-span-5 rounded-3xl bg-gradient-to-br from-indigo-950/80 via-purple-950/60 to-neutral-900 border border-indigo-500/40 p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl backdrop-blur-xl group hover:border-indigo-400/60 transition-all">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/30 transition-colors" />
            
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-mono font-semibold uppercase tracking-wider">
                <DiscordIcon className="w-4 h-4 text-indigo-400" />
                <span>OFFICIAL DISCORD COMMUNITY</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Join The HOLLOWGRAVE Discord
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Connect directly with founders Anshuman & Raja, participate in live digital build showcases, request priority feedback, and collaborate with creators worldwide.
              </p>
            </div>

            <div className="pt-6 relative z-10">
              <a
                href="https://discord.gg/8znW9nfYhQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-500/50 flex items-center justify-center gap-2.5 border border-indigo-400/30 group-hover:scale-[1.02] animate-glow-pulse"
              >
                <DiscordIcon className="w-5 h-5 text-white" />
                <span>Join Our Discord Community</span>
              </a>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="lg:col-span-7 rounded-3xl bg-neutral-900/80 border border-neutral-800 p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl backdrop-blur-xl">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>HOLLOWGRAVE VIP INTEL</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Get Exclusive Digital Insights & Releases
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Subscribe to receive early announcements on creative releases, full-stack tech breakdowns, and client allocations.
              </p>
            </div>

            <div className="pt-6">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-2 animate-fade-in">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Subscription Confirmed!</h4>
                  <p className="text-xs text-emerald-200">Welcome to the HOLLOWGRAVE inner circle.</p>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="enter your email address..."
                        className="w-full bg-neutral-950/90 border border-neutral-800 rounded-2xl pl-11 pr-4 py-3.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 transition-all"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] font-mono text-neutral-500">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3 h-3" /> No Spam
                    </span>
                    <span className="flex items-center gap-1 text-neutral-400">
                      <ShieldCheck className="w-3 h-3 text-purple-400" /> Secure
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* ==========================================
            FOOTER LINKS & BRANDING
           ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-neutral-900 to-indigo-600 p-[1px] shadow-lg shadow-purple-500/20">
                <div className="w-full h-full bg-[#0a0a0f] rounded-xl flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-purple-400" />
                </div>
              </div>
              <div>
                <span className="font-bold tracking-widest text-lg text-white font-sans">
                  HOLLOW<span className="text-purple-400">GRAVE</span>
                </span>
                <span className="block text-[9px] tracking-[0.2em] text-purple-300 font-bold uppercase font-mono">
                  Production & Firm
                </span>
              </div>
            </a>
            <p className="text-xs leading-relaxed max-w-sm text-neutral-400">
              An elite creative digital agency specializing in cinematic video editing, full-stack software development, UI/UX, branding, and AI automation solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-6">Quick Links</h4>
            <ul className="space-y-3 text-xs">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-purple-400 transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-purple-400 transition-colors">Portfolio</a></li>
              <li><a href="#about" className="hover:text-purple-400 transition-colors">About Agency</a></li>
              <li><a href="#team" className="hover:text-purple-400 transition-colors">Founders & Team</a></li>
              <li><a href="#contact" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
              <li>
                <a 
                  href="https://discord.gg/8znW9nfYhQ" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <DiscordIcon className="w-3.5 h-3.5" /> Join Discord
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-6">Expertise</h4>
            <ul className="space-y-3 text-xs">
              <li><a href="#services" className="hover:text-purple-400 transition-colors">Cinematic Editing</a></li>
              <li><a href="#services" className="hover:text-purple-400 transition-colors">Full-Stack Web Dev</a></li>
              <li><a href="#services" className="hover:text-purple-400 transition-colors">Mobile App Development</a></li>
              <li><a href="#services" className="hover:text-purple-400 transition-colors">UI/UX & Branding</a></li>
              <li><a href="#services" className="hover:text-purple-400 transition-colors">AI Automation</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white mb-6">Legal & Policy</h4>
            <ul className="space-y-3 text-xs">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Refund Policy</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Cookie Preferences</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-xs font-mono">
          <p>© {new Date().getFullYear()} HollowGrave Production & Firm. All rights reserved.</p>
          <p className="mt-4 sm:mt-0 text-neutral-500">Design. Develop. Dominate.</p>
        </div>
      </div>
    </footer>
  );
};

