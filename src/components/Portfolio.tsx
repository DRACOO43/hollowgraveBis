import React, { useState } from 'react';
import { PORTFOLIO_ITEMS } from '../data/mockData';
import { PortfolioItem } from '../types';
import { ExternalLink, ArrowUpRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './ScrollEffects';

const getYouTubeEmbedUrl = (url: string) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}?autoplay=1` : null;
};

export const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);

  const categories = ['All', 'Websites', 'Apps', 'Editing', 'Design', 'Branding'];

  const filteredItems = filter === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter(item => item.category === filter);

  return (
    <section id="portfolio" className="py-24 bg-[#07070b] relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-blue-900/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <StaggerContainer staggerDelay={0.12} viewportAmount={0.1}>
          <StaggerItem variant="flip-x">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-mono mb-3 block">
                Featured Works
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                Digital Masterpieces Engineered For Impact
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base">
                Explore our curated showcase of elite websites, mobile applications, cinematic video edits, and brand systems.
              </p>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-300 ${
                      filter === cat
                        ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                        : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </StaggerItem>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <StaggerItem key={item.id} variant="scale-up">
                <div
                  onClick={() => setSelectedProject(item)}
                  className="group cursor-pointer rounded-2xl bg-neutral-900/80 border border-neutral-800/80 overflow-hidden hover:border-purple-500/50 transition-all duration-500 shadow-xl flex flex-col justify-between h-full"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-purple-300 border border-neutral-800">
                      {item.category}
                    </span>
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-neutral-950/80 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <span className="text-xs font-mono text-neutral-400 mb-1 block">{item.client}</span>
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-neutral-400 text-xs line-clamp-2 mb-4">
                        {item.description}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.map((tag, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-md bg-neutral-800/80 text-[10px] font-mono text-neutral-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-mono text-purple-400">
                        <span>{item.metrics}</span>
                        <span className="flex items-center gap-1 group-hover:underline">
                          View Case Study <ExternalLink className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative max-w-3xl w-full bg-[#0e0e14] border border-purple-900/50 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video bg-black">
              {getYouTubeEmbedUrl(selectedProject.url) ? (
                <iframe
                  src={getYouTubeEmbedUrl(selectedProject.url)!}
                  title={selectedProject.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-transparent" />
                </>
              )}
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-1 block">
                    {selectedProject.category} • {selectedProject.client}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">{selectedProject.title}</h2>
                </div>
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div>
                <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-400 mb-2">Project Overview</h4>
                <p className="text-neutral-300 text-sm leading-relaxed">{selectedProject.longDescription}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <span className="text-xs font-mono text-neutral-400 block mb-1">Key Results</span>
                  <span className="text-sm font-bold text-purple-300">{selectedProject.metrics}</span>
                </div>
                <div className="p-4 rounded-xl bg-neutral-900/80 border border-neutral-800">
                  <span className="text-xs font-mono text-neutral-400 block mb-1">Tech Stack</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedProject.tags.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-neutral-800 text-[10px] font-mono text-neutral-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
