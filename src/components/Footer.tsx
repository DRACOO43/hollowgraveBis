import React, { useState } from 'react';
import { Terminal, Send, MessageSquare, Mail, CheckCircle2, Sparkles, Loader2, ShieldCheck } from 'lucide-react';
import { useToast } from './Toast';

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
            NEWSLETTER SUBSCRIPTION SECTION
           ========================================== */}
        <div className="mb-20 rounded-3xl bg-gradient-to-r from-purple-950/40 via-neutral-900/90 to-indigo-950/40 border border-purple-900/40 p-8 sm:p-10 md:p-12 relative overflow-hidden shadow-2xl backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                <span>HOLLOWGRAVE VIP INTEL</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                Get Exclusive Project Updates & Digital Insights
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed max-w-xl">
                Subscribe to receive early announcements on creative releases, full-stack tech breakdowns, and priority client discount allocations directly to your inbox.
              </p>
              
              <div className="flex flex-wrap gap-4 text-xs font-mono text-neutral-400 pt-2">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> No Spam Ever
                </span>
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Stored Securely
                </span>
                <span className="flex items-center gap-1.5 text-neutral-300">
                  <Mail className="w-3.5 h-3.5 text-indigo-400" /> Unsubscribe Anytime
                </span>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/60 text-center space-y-3 animate-fade-in">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">Subscription Confirmed!</h4>
                  <p className="text-xs text-emerald-200">
                    Your email is registered in our backend. Welcome to the HOLLOWGRAVE inner circle.
                  </p>
                  <button
                    onClick={() => setSubscribed(false)}
                    className="text-xs text-neutral-400 underline hover:text-white transition-colors pt-1"
                  >
                    Subscribe another email
                  </button>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="space-y-3">
                  <div className="relative">
                    <Mail className="w-5 h-5 text-neutral-500 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="enter your primary email address..."
                      className="w-full bg-neutral-950/80 border border-neutral-800 rounded-2xl pl-12 pr-4 py-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all shadow-inner"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold font-mono uppercase tracking-wider transition-all shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing Registration...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe to Newsletter</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center font-mono text-neutral-500">
                    By submitting, you consent to receive marketing updates from HOLLOWGRAVE.
                  </p>
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-neutral-900 to-blue-600 p-[1px] shadow-lg shadow-purple-500/20">
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
              <li><a href="#services" className="hover:text-purple-400 transition-colors">Services</a></li>
              <li><a href="#portfolio" className="hover:text-purple-400 transition-colors">Portfolio</a></li>
              <li><a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing Plans</a></li>
              <li><a href="#about" className="hover:text-purple-400 transition-colors">About Agency</a></li>
              <li><a href="#team" className="hover:text-purple-400 transition-colors">Founders</a></li>
              <li>
                <a 
                  href="https://discord.gg/8znW9nfYhQ" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Discord Server
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
