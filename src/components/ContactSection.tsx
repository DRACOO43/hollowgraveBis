import React, { useState } from 'react';
import { Mail, Phone, Send, MessageSquare, Instagram, Github, Linkedin, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from './Toast';
import { DiscordIcon } from './DiscordIcon';

export const ContactSection: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    budget: '',
    deadline: '',
    message: '',
    joinedDiscord: true
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          subject: formData.subject,
          budget: formData.budget,
          deadline: formData.deadline,
          message: formData.message
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Inquiry logged! Join Discord to speak with Anshuman & Raja immediately.');
        setSubmitted(true);
      } else {
        showToast(data.error || 'Failed to deliver message.', 'error');
      }
    } catch {
      showToast('Network error while submitting inquiry.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-indigo-900/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-purple-900/15 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-mono font-semibold uppercase tracking-widest mb-4">
            <DiscordIcon className="w-4 h-4 text-indigo-400" />
            <span>MANDATORY CONTACT PORTAL</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            To Contact HOLLOWGRAVE, Join Our Discord
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
            All project consultations, custom quotes, and direct client support are strictly managed through our official Discord server. Join to connect directly with founders Anshuman Bhalerao & Raja Sahu in real-time.
          </p>
        </div>

        {/* Discord Mandatory Hero Banner */}
        <div className="mb-12 rounded-3xl bg-gradient-to-r from-indigo-950/90 via-purple-950/70 to-neutral-900 border-2 border-indigo-500/50 p-8 sm:p-12 relative overflow-hidden shadow-2xl shadow-indigo-950/50 backdrop-blur-2xl">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Primary Client Communication Channel</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Connect Directly With Founders on Discord
              </h3>
              <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed max-w-2xl">
                We operate with 100% transparency and lightning-fast communication. Joining our Discord server grants you immediate access to our executive private channels, project tracking boards, and live voice scoping sessions.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-300 font-mono pt-2">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Direct Access to Anshuman & Raja
                </span>
                <span className="flex items-center gap-1.5 text-indigo-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> &lt;2 Hour Response Time
                </span>
                <span className="flex items-center gap-1.5 text-purple-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Live Voice Scoping
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-stretch lg:items-end justify-center">
              <a
                href="https://discord.gg/8znW9nfYhQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-2xl shadow-indigo-600/40 hover:shadow-indigo-500/60 hover:scale-105 flex items-center justify-center gap-3 border border-indigo-400/40 animate-glow-pulse"
              >
                <DiscordIcon className="w-6 h-6 text-white" />
                <span>Join Discord To Contact Us</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-[11px] font-mono text-indigo-300/80 mt-2 text-center lg:text-right block">
                https://discord.gg/8znW9nfYhQ
              </span>
            </div>
          </div>
        </div>

        {/* Contact Form & Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-xl space-y-6">
              <h3 className="text-xl font-bold text-white">Alternative Contact Details</h3>
              <p className="text-xs text-neutral-400">
                While Discord is mandatory for active project collaboration, you can also reach our administrative desk via email or phone.
              </p>
              
              <div className="space-y-4 pt-2">
                <a href="mailto:hollowgravebis@gmail.com" className="flex items-center gap-4 group p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 hover:border-purple-500/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-neutral-400 block">Email Desk</span>
                    <span className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors">hollowgravebis@gmail.com</span>
                  </div>
                </a>

                <a href="tel:+918767527656" className="flex items-center gap-4 group p-3.5 rounded-2xl bg-neutral-950/60 border border-neutral-800 hover:border-purple-500/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-neutral-400 block">Phone / WhatsApp</span>
                    <span className="text-xs font-semibold text-white group-hover:text-purple-300 transition-colors">+91 87675 27656</span>
                  </div>
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-neutral-800 space-y-3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest block">Official Social Links</span>
                <div className="flex items-center gap-3">
                  <a href="https://discord.gg/8znW9nfYhQ" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600 text-indigo-300 hover:text-white transition-all flex items-center gap-2 text-xs font-mono">
                    <DiscordIcon className="w-4 h-4" />
                    <span>Discord</span>
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-neutral-800 hover:bg-purple-600 text-neutral-300 hover:text-white transition-colors">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-neutral-800 hover:bg-purple-600 text-neutral-300 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-xl bg-neutral-800 hover:bg-purple-600 text-neutral-300 hover:text-white transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact / Project Pre-Inquiry Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/90 border-2 border-indigo-500/60 backdrop-blur-xl text-center space-y-6 shadow-2xl animate-fade-in">
                <div className="w-20 h-20 rounded-full bg-indigo-500/20 border-2 border-indigo-400 text-indigo-300 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
                  <DiscordIcon className="w-10 h-10" />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Inquiry Form Pre-Logged!</h3>
                  <p className="text-neutral-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                    To complete your consultation and start working with Anshuman Bhalerao & Raja Sahu, please join our official Discord server now.
                  </p>
                </div>

                <a
                  href="https://discord.gg/8znW9nfYhQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-indigo-600/40 transition-all hover:scale-105 border border-indigo-400/40"
                >
                  <DiscordIcon className="w-5 h-5 text-white" />
                  <span>Join Discord To Complete Scoping</span>
                </a>

                <div className="pt-2">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-neutral-400 underline hover:text-white transition-colors"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-xl shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">Pre-Log Your Project Scope</h3>
                    <p className="text-neutral-400 text-xs">Fill details below, then join Discord to discuss with the founders.</p>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-[10px] font-mono uppercase tracking-wider">
                    Discord Mandatory
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Mercer"
                      className="w-full bg-neutral-950/90 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full bg-neutral-950/90 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-neutral-950/90 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Service Required</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Video Editing / Web App"
                      className="w-full bg-neutral-950/90 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Project Vision & Details *</label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe what you want us to build or create..."
                    className="w-full bg-neutral-950/90 border border-neutral-800 rounded-xl px-4 py-3 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                {/* Mandatory Discord Requirement Banner in Form */}
                <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/40 flex items-start gap-3">
                  <DiscordIcon className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-indigo-200 leading-normal">
                    <span className="font-bold text-white block mb-0.5">Note: Discord Membership Required</span>
                    All final project scoping, milestones, and direct chat happen on Discord. You will be prompted to join Discord after submitting.
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <span>Pre-Logging Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry & Join Discord</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
