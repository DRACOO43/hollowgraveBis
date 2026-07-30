import React, { useState } from 'react';
import { X, Sparkles, Send } from 'lucide-react';
import { useToast } from './Toast';

interface ProjectRequestModalProps {
  onClose: () => void;
}

export const ProjectRequestModal: React.FC<ProjectRequestModalProps> = ({ onClose }) => {
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [serviceType, setServiceType] = useState('Full-Stack Web App');
  const [budget, setBudget] = useState('$1,500 - $3,000');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [deadline, setDeadline] = useState('');
  const [details, setDetails] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      showToast('Please enter your name and email.', 'error');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/send-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          service: serviceType,
          budget,
          deadline,
          description: details || 'Custom project inquiry submitted via interactive builder.'
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast('Project scope submitted! Telegram notification delivered.');
        setTimeout(() => onClose(), 1500);
      } else {
        showToast(data.error || 'Failed to deliver message via Telegram.', 'error');
      }
    } catch {
      showToast('Network error while sending Telegram notification.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative max-w-xl w-full bg-[#0e0e14] border border-purple-900/50 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 mx-auto mb-4 shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Start Your Project</h3>
          <p className="text-neutral-400 text-xs">Configure your scope and get an instant review from HOLLOWGRAVE leadership.</p>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-3">Select Primary Service</label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Full-Stack Web App',
                  'Mobile App Dev',
                  'Cinematic Video Editing',
                  'Thumbnail Design Suite',
                  'Brand Identity & UI/UX',
                  'AI Automation Agent'
                ].map(s => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setServiceType(s)}
                    className={`p-3.5 rounded-xl border text-xs font-medium text-left transition-all ${
                      serviceType === s
                        ? 'bg-purple-600/20 border-purple-500 text-white'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-3">Estimated Budget</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['$500 - $1,500', '$1,500 - $3,000', '$3,000 - $7,000', '$7,000+'].map(b => (
                  <button
                    type="button"
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`p-3 rounded-xl border text-xs font-medium text-center transition-all ${
                      budget === b
                        ? 'bg-purple-600/20 border-purple-500 text-white'
                        : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30"
            >
              Continue to Details
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+91 87675 27656"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Acme Inc"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">Deadline</label>
                <input
                  type="text"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                  placeholder="2 Weeks / Urgent"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white text-xs focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-1.5">Project Vision & Goals</label>
              <textarea
                rows={3}
                value={details}
                onChange={e => setDetails(e.target.value)}
                placeholder="Tell us about your requirements, technical specifications, and key features..."
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-white text-xs resize-none focus:outline-none focus:border-purple-500"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 uppercase font-medium"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="w-2/3 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Submitting...' : 'Submit Request'}</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
