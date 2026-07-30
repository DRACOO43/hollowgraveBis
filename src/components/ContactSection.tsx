import React, { useState } from 'react';
import { Mail, Phone, Send, MessageSquare, Instagram, Github, Linkedin } from 'lucide-react';
import { useToast } from './Toast';

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
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.subject,
          budget: formData.budget,
          deadline: formData.deadline,
          description: formData.message
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Inquiry sent successfully! Telegram notification delivered.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          budget: '',
          deadline: '',
          message: ''
        });
      } else {
        showToast(data.error || 'Failed to deliver message via Telegram.', 'error');
      }
    } catch {
      showToast('Network error while sending Telegram notification.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-mono mb-3 block">
            Start A Project
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Let's Build Something Legendary Together
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Contact Anshuman, Raja, Prince, Kabir, and the HollowGrave team. We respond within 2 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-xl">
              <h3 className="text-xl font-bold text-white mb-6">Direct Channels</h3>
              
              <div className="space-y-6">
                <a href="mailto:hollowgravebis@gmail.com" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-400 block">Email Us</span>
                    <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">hollowgravebis@gmail.com</span>
                  </div>
                </a>

                <a href="tel:+918767527656" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neutral-400 block">Call / WhatsApp</span>
                    <span className="text-sm font-semibold text-white group-hover:text-purple-300 transition-colors">+91 87675 27656</span>
                  </div>
                </a>
              </div>

              {/* Social Buttons & Discord Community */}
              <div className="pt-8 mt-8 border-t border-neutral-800 space-y-4">
                <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">Social Networks & Community</span>
                
                {/* Join Discord Banner */}
                <a
                  href="https://discord.gg/8znW9nfYhQ"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-indigo-900/60 via-purple-900/40 to-neutral-900 border border-indigo-500/30 hover:border-indigo-400/60 transition-all group shadow-lg shadow-indigo-950/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/80 flex items-center justify-center text-white group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-indigo-300 block font-semibold">Official Discord Server</span>
                      <span className="text-sm font-bold text-white group-hover:text-indigo-200">Join HOLLOWGRAVE Community</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-indigo-400 bg-indigo-950/80 px-3 py-1.5 rounded-lg border border-indigo-800/50 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    Join &rarr;
                  </span>
                </a>

                <div className="flex items-center gap-3 pt-2">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-neutral-800 hover:bg-purple-600 text-neutral-300 hover:text-white transition-colors" title="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://discord.gg/8znW9nfYhQ" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-neutral-800 hover:bg-indigo-600 text-neutral-300 hover:text-white transition-colors" title="Discord Community">
                    <MessageSquare className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-neutral-800 hover:bg-purple-600 text-neutral-300 hover:text-white transition-colors" title="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-neutral-800 hover:bg-purple-600 text-neutral-300 hover:text-white transition-colors" title="GitHub">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Glass Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-3xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-xl shadow-2xl space-y-6">
              <h3 className="text-2xl font-bold text-white mb-2">Send Us A Message</h3>
              <p className="text-neutral-400 text-xs mb-6">Fill out the form below and our executive team will review your requirements immediately.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Alex Mercer"
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500 transition-colors"
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
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Company / Organization</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp / Brand Name"
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Service Required</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={e => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Full-Stack / Video Edit"
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Budget</label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={e => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="$1,000 - $3,000"
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Deadline</label>
                  <input
                    type="text"
                    value={formData.deadline}
                    onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                    placeholder="2-3 Weeks / Flexible"
                    className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project goals, timeline, and vision..."
                  className="w-full bg-neutral-950/80 border border-neutral-800 rounded-xl px-4 py-3.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
