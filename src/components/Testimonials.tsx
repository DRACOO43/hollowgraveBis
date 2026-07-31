import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollEffects';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-[#07070b] relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal variant="zoom-3d">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-mono mb-3 block">
              Client Success Stories
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Trusted By Industry Leaders & Founders
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              See what high-growth startup CEOs, creators, and enterprise executives say about working with HOLLOWGRAVE.
            </p>
          </div>
        </ScrollReveal>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, rotate: index % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="relative rounded-3xl bg-neutral-900/60 border border-neutral-800/80 p-8 flex flex-col justify-between hover:border-purple-500/50 transition-all duration-500 shadow-xl backdrop-blur-xl group"
            >
              <div className="absolute top-6 right-6 text-purple-500/20 group-hover:text-purple-500/40 transition-colors">
                <Quote className="w-10 h-10" />
              </div>

              <div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-purple-400 text-purple-400" />
                  ))}
                </div>

                <p className="text-neutral-300 text-sm leading-relaxed mb-8 italic">
                  "{item.content}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-neutral-800">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border border-purple-500/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{item.name}</h4>
                  <p className="text-xs font-mono text-purple-400">{item.company}</p>
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">{item.projectType}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
