import React from 'react';
import { PRICING_PLANS } from '../data/mockData';
import { PricingPlan } from '../types';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

interface PricingProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onSelectPlan }) => {
  return (
    <section id="pricing" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-mono mb-3 block">
            Transparent Investment
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Priced For Scale & Market Leadership
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base">
            Choose the ideal creative package or development tier. Secure checkout via Stripe, Razorpay, UPI, and major cards.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {PRICING_PLANS.map(plan => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 backdrop-blur-xl ${
                plan.popular
                  ? 'bg-gradient-to-b from-purple-950/60 via-neutral-900/90 to-neutral-900/90 border-2 border-purple-500/80 shadow-2xl shadow-purple-950/50 scale-105 z-10'
                  : 'bg-neutral-900/60 border border-neutral-800/80 hover:border-purple-500/40'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-mono text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <span className="text-xs font-mono text-purple-400 px-2.5 py-1 rounded bg-neutral-800">
                    {plan.tier}
                  </span>
                </div>
                <p className="text-neutral-400 text-xs min-h-[36px] mb-6">{plan.description}</p>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black text-white">${plan.price}</span>
                  <span className="text-xs text-neutral-400 font-mono">/ {plan.period}</span>
                </div>

                <div className="space-y-3 mb-8 pt-6 border-t border-neutral-800">
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                    <span className="text-neutral-400">Delivery:</span>
                    <span className="text-purple-300">{plan.deliveryTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-neutral-300">
                    <span className="text-neutral-400">Revisions:</span>
                    <span className="text-purple-300">{plan.revisions}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <Check className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan(plan)}
                className={`w-full py-4 rounded-xl font-semibold text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-neutral-800 hover:bg-purple-600 text-neutral-200 hover:text-white border border-neutral-700'
                }`}
              >
                <span>Buy Now & Start</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
