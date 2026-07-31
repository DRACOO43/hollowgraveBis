import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { HollowgraveEmblemSvg } from './HollowgraveEmblemSvg';
import { DiscordIcon } from './DiscordIcon';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/85 backdrop-blur-xl border-b border-purple-950/40 py-4 shadow-2xl shadow-purple-950/10'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group py-1">
          <HollowgraveEmblemSvg className="w-10 h-10 group-hover:scale-110 transition-transform duration-300" theme="neon" />
          <div className="hidden sm:block">
            <span className="font-bold tracking-widest text-base text-white font-sans">
              HOLLOW<span className="text-purple-400">GRAVE</span>
            </span>
            <span className="block text-[8px] tracking-[0.2em] text-purple-300 font-bold uppercase font-mono">
              Production & Firm
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-8 bg-neutral-900/60 backdrop-blur-md px-6 py-2.5 rounded-full border border-neutral-800/80 shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase font-medium tracking-wider text-neutral-300 hover:text-purple-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://discord.gg/8znW9nfYhQ"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase font-medium tracking-wider text-indigo-300 hover:text-indigo-200 flex items-center gap-1.5 transition-colors"
          >
            <DiscordIcon className="w-3.5 h-3.5 text-indigo-400" />
            <span>Join Discord</span>
          </a>
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Premium "Join Our Discord" Button */}
          <a
            href="https://discord.gg/8znW9nfYhQ"
            target="_blank"
            rel="noopener noreferrer"
            className="relative group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 hover:scale-[1.03] border border-indigo-400/40 backdrop-blur-xl animate-glow-pulse"
          >
            <DiscordIcon className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
            <span>Join Our Discord</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-200"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0a0a0f]/95 backdrop-blur-2xl border-b border-purple-950/40 p-6 flex flex-col gap-4 lg:hidden shadow-2xl animate-fade-down">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm uppercase font-medium tracking-wider text-neutral-300 hover:text-purple-400 py-2 border-b border-neutral-900"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 flex flex-col gap-3">
            <a
              href="https://discord.gg/8znW9nfYhQ"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg shadow-indigo-600/30 border border-indigo-400/30 animate-glow-pulse"
            >
              <DiscordIcon className="w-4 h-4 text-white" />
              Join Our Discord
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

