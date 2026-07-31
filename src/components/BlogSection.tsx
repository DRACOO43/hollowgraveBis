import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { Calendar, Clock, ArrowRight, X } from 'lucide-react';
import { StaggerContainer, StaggerItem } from './ScrollEffects';

export const BlogSection: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <section className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-950/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <StaggerContainer staggerDelay={0.14} viewportAmount={0.1}>
          <StaggerItem variant="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.3em] text-purple-400 font-mono mb-3 block">
                Agency Insights & Articles
              </span>
              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
                Latest Thoughts On Design, Dev & Growth
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base">
                Expert frameworks, tutorials, and deep dives straight from the HOLLOWGRAVE leadership.
              </p>
            </div>
          </StaggerItem>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map(post => (
              <StaggerItem key={post.id} variant="scale-up">
                <div
                  onClick={() => setSelectedPost(post)}
                  className="group cursor-pointer rounded-3xl bg-neutral-900/60 border border-neutral-800/80 overflow-hidden hover:border-purple-500/50 transition-all duration-500 shadow-xl flex flex-col justify-between backdrop-blur-xl h-full"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-neutral-950/80 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-purple-300 border border-neutral-800">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 mb-3">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-neutral-400 text-xs line-clamp-3 mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                      <span className="text-xs font-mono text-purple-400">By {post.author}</span>
                      <span className="flex items-center gap-1 text-xs font-medium text-white group-hover:text-purple-300 transition-colors">
                        Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>

      {/* Blog Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
          <div className="relative max-w-3xl w-full bg-[#0e0e14] border border-purple-900/50 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-transparent" />
            </div>

            <div className="p-8 overflow-y-auto space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-2 block">
                  {selectedPost.category} • {selectedPost.date}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">{selectedPost.title}</h2>
                <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span>Author: {selectedPost.author}</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800">
                <p className="text-neutral-300 text-sm leading-relaxed whitespace-pre-line">{selectedPost.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
