import React, { useState } from 'react';
import { PricingPlan, ServiceItem } from '../types';
import { X, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from './Toast';
import { DiscordIcon } from './DiscordIcon';

interface CheckoutModalProps {
  item: PricingPlan | ServiceItem;
  onClose: () => void;
  onSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ item, onClose, onSuccess }) => {
  const { showToast } = useToast();
  const [gateway, setGateway] = useState<'Stripe' | 'Razorpay' | 'UPI' | 'Card'>('Stripe');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const price = 'price' in item ? item.price : item.startingPrice;
  const name = 'name' in item ? item.name : item.title;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceName: name,
          amount: price,
          gateway
        })
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        showToast('Payment successful! Order processed.');
      } else {
        showToast(data.error || 'Payment failed', 'error');
      }
    } catch {
      showToast('Network error', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div className="relative max-w-md w-full bg-[#0e0e14] border border-indigo-900/50 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-6 space-y-4 animate-fade-down">
            <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-400 text-indigo-300 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Order Confirmed!</h3>
            <p className="text-neutral-300 text-xs leading-relaxed">
              Your service package has been processed. To begin work and connect directly with Anshuman & Raja, join our official Discord server now.
            </p>

            <a
              href="https://discord.gg/8znW9nfYhQ"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/30 border border-indigo-400/30"
            >
              <DiscordIcon className="w-5 h-5 text-white" />
              <span>Join Discord To Start Project</span>
            </a>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <span className="text-xs uppercase font-mono tracking-widest text-indigo-400 mb-2 block">Service Order</span>
              <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
              <div className="text-3xl font-black text-white mt-2">${price} <span className="text-xs font-mono text-neutral-400">USD</span></div>
            </div>

            <form onSubmit={handleCheckout} className="space-y-5">
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Select Payment Gateway</label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'Stripe', label: 'Stripe (Card / Apple Pay)' },
                    { id: 'Razorpay', label: 'Razorpay (Global)' },
                    { id: 'UPI', label: 'UPI / Google Pay / PhonePe' },
                    { id: 'Card', label: 'Credit / Debit Card' }
                  ].map(g => (
                    <button
                      type="button"
                      key={g.id}
                      onClick={() => setGateway(g.id as any)}
                      className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${
                        gateway === g.id
                          ? 'bg-indigo-600/20 border-indigo-500 text-white'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discord Requirement Notice */}
              <div className="p-3.5 rounded-xl bg-indigo-950/60 border border-indigo-500/40 flex items-center gap-3">
                <DiscordIcon className="w-5 h-5 text-indigo-400 shrink-0" />
                <span className="text-[11px] text-indigo-200">Mandatory: Discord membership is required for client communication & project delivery.</span>
              </div>

              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-[10px] text-neutral-400">256-Bit SSL Encrypted Payment</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Processing Payment...' : `Pay $${price} & Join Discord`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
