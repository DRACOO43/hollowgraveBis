import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './ScrollEffects';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#07070b] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-900/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <StaggerContainer staggerDelay={0.12} viewportAmount={0.1}>
          <StaggerItem variant="fade-up">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-mono mb-3 block">
                Got Questions?
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                Frequently Asked Questions
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base">
                Everything you need to know about partnering with HOLLOWGRAVE.
              </p>
            </div>
          </StaggerItem>

          {/* FAQ Accordion */}
          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <StaggerItem key={index} variant="fade-up">
                  <div className="rounded-2xl bg-neutral-900/60 border border-neutral-800/80 overflow-hidden backdrop-blur-xl transition-all duration-300">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-neutral-800/40 transition-colors"
                    >
                      <span className="text-base font-bold text-white flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-purple-400 shrink-0" />
                        {faq.question}
                      </span>
                      <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-purple-400' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-0 text-sm text-neutral-300 leading-relaxed border-t border-neutral-800/60 pt-4 animate-fade-down">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
};
