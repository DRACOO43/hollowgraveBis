import React, { useState } from 'react';
import { PricingPlan, ServiceItem } from '../types';
import { X, CreditCard, ShieldCheck, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { useToast } from './Toast';

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
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
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
      <div className="relative max-w-md w-full bg-[#0e0e14] border border-purple-900/50 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4 animate-fade-down">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 text-green-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Payment Confirmed!</h3>
            <p className="text-neutral-400 text-xs">Your order has been placed successfully. Anshuman and Raja have been notified.</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <span className="text-xs uppercase font-mono tracking-widest text-purple-400 mb-2 block">Secure Checkout</span>
              <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
              <div className="text-3xl font-black text-white mt-2">${price} <span className="text-xs font-mono text-neutral-400">USD</span></div>
            </div>

            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-3">Select Payment Gateway</label>
                <div className="grid grid-cols-2 gap-3">
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
                          ? 'bg-purple-600/20 border-purple-500 text-white'
                          : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-green-400 shrink-0" />
                <span className="text-[11px] text-neutral-400">256-Bit SSL Encrypted & Secure Webhook Verification</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2"
              >
                <span>{loading ? 'Processing Payment...' : `Pay $${price} Now`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
