import React, { useState } from 'react';
import { SERVICES } from '../data/mockData';
import { Video, PlaySquare, Image as ImageIcon, Code, Smartphone, Layout, PenTool, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';
import { StaggerContainer, StaggerItem } from './ScrollEffects';

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Services' },
    { id: 'video', name: 'Video Editing' },
    { id: 'design', name: 'Design & Thumbnails' },
    { id: 'dev', name: 'Development' },
    { id: 'branding', name: 'Branding' },
    { id: 'ai', name: 'AI Automation' }
  ];

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.category === activeCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Video': return Video;
      case 'PlaySquare': return PlaySquare;
      case 'Image': return ImageIcon;
      case 'Code': return Code;
      case 'Smartphone': return Smartphone;
      case 'Layout': return Layout;
      case 'PenTool': return PenTool;
      case 'Cpu': return Cpu;
      default: return Code;
    }
  };

  return (
    <section id="services" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <StaggerContainer staggerDelay={0.12} viewportAmount={0.1}>
          <StaggerItem variant="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-mono mb-3 block">
                Capabilities & Expertise
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                Elite Digital Services Designed For Market Dominance
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base">
                From Hollywood-grade cinematic video editing to lightning-fast full-stack web applications and custom AI workflows.
              </p>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                      activeCategory === cat.id
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => {
              const IconComponent = getIcon(service.iconName);
              return (
                <StaggerItem key={service.id} variant="fade-up">
                  <div className="group relative rounded-2xl bg-neutral-900/60 border border-neutral-800/80 p-8 hover:border-purple-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-950/30 backdrop-blur-xl flex flex-col justify-between h-full">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full pointer-events-none group-hover:bg-purple-500/10 transition-colors" />

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300 shadow-lg">
                          <IconComponent className="w-7 h-7" />
                        </div>
                        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-neutral-800 text-purple-300 border border-neutral-700">
                          From ${service.startingPrice}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                        {service.description}
                      </p>

                      <ul className="space-y-2.5 mb-8">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-xs text-neutral-300">
                            <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button
                      onClick={() => onSelectService(service)}
                      className="w-full py-3.5 rounded-xl bg-neutral-900 hover:bg-purple-600 border border-neutral-800 hover:border-purple-500 text-neutral-200 hover:text-white font-medium text-xs uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                    >
                      <span>Request Service</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
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
