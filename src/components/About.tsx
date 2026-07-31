import React from 'react';
import { Target, Compass, Award, Users, Globe, Briefcase, Zap, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal } from './ScrollEffects';

export const About: React.FC = () => {
  const stats = [
    { label: 'Completed Projects', value: '310+', icon: Briefcase },
    { label: 'Global Clients', value: '180+', icon: Users },
    { label: 'Countries Served', value: '28', icon: Globe },
    { label: 'Client Satisfaction', value: '99.8%', icon: Award }
  ];

  return (
    <section id="about" className="py-24 bg-[#07070b] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-950/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <ScrollReveal variant="zoom-3d">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-mono mb-3 block">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Engineered For Absolute Excellence
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
              HollowGrave Production & Firm is an elite creative studio & digital firm founded by visionaries dedicated to building high-impact digital products, cinematic videos, custom websites, and scalable software architectures.
            </p>
          </div>
        </ScrollReveal>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-xl text-center group hover:border-purple-500/50 transition-all duration-300 shadow-xl"
              >
                <div className="w-12 h-12 rounded-xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white mb-2 font-sans tracking-tight">{stat.value}</div>
                <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <ScrollReveal variant="slide-left" delay={0.1}>
            <div className="p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-xl h-full">
              <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-purple-600/30">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                To empower ambitious creators, startups, and enterprises with world-class digital products and cinematic content that leave a permanent mark.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="zoom-3d" delay={0.25}>
            <div className="p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-xl h-full">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                To redefine the global standard of creative agencies by fusing ruthless technical execution with breathtaking visual storytelling.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slide-right" delay={0.4}>
            <div className="p-8 rounded-3xl bg-neutral-900/80 border border-neutral-800 backdrop-blur-xl h-full">
              <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/30">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Core Values</h3>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Speed without compromise. Relentless innovation. Absolute transparency. Craftsmanship that rivals the world's top technology companies.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Why Choose Us */}
        <ScrollReveal variant="fade-up">
          <div className="p-10 rounded-3xl bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-purple-950/40 border border-purple-900/40 backdrop-blur-2xl">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Why Partner With HOLLOWGRAVE?</h3>
              <p className="text-neutral-400 text-sm">We don't just deliver projects; we engineer long-term digital dominance.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[
                'Direct Founder Involvement',
                'Apple & Linear Grade Aesthetics',
                'Sub-Second Performance 95+',
                'Transparent Sprint Delivery',
                'Advanced AI Automation',
                '24/7 VIP Support Channel'
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  transition={{ delay: idx * 0.08 }}
                  className="flex items-center gap-3 p-4 rounded-xl bg-neutral-900/80 border border-neutral-800"
                >
                  <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0" />
                  <span className="text-sm font-medium text-neutral-200">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
