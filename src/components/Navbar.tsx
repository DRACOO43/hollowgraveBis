import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, User as UserIcon, LogOut, Sparkles, LayoutDashboard, MessageSquare } from 'lucide-react';
import { User } from '../types';
import { HollowgraveLogoSvg } from './HollowgraveLogoSvg';
import { HollowgraveEmblemSvg } from './HollowgraveEmblemSvg';

interface NavbarProps {
  currentUser: User | null;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  onOpenDashboard: () => void;
  onOpenAdmin: () => void;
  onOpenProjectRequest: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenDashboard,
  onOpenAdmin,
  onOpenProjectRequest
}) => {
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
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'Team', href: '#team' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-purple-950/40 py-4 shadow-2xl shadow-purple-950/10'
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
        </nav>

        {/* Right Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="https://discord.gg/8znW9nfYhQ"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-indigo-950/60 border border-indigo-500/40 hover:border-indigo-400 text-indigo-300 hover:text-white text-xs font-medium transition-all shadow-sm hover:shadow-indigo-500/20"
            title="Join Discord Server"
          >
            <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
            <span>Discord</span>
          </a>

          <button
            onClick={onOpenProjectRequest}
            className="relative group overflow-hidden rounded-full p-[1px] font-medium text-xs tracking-wider uppercase transition-all duration-300"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 animate-gradient" />
            <span className="relative px-5 py-2.5 rounded-full bg-[#0a0a0f] text-neutral-200 group-hover:bg-transparent group-hover:text-white transition-all flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Start Project
            </span>
          </button>

          {currentUser ? (
            <div className="flex items-center gap-3">
              {currentUser.role === 'admin' && (
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-purple-950/40 border border-purple-800/60 text-purple-300 hover:bg-purple-900/40 text-xs font-medium transition-colors"
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </button>
              )}
              <button
                onClick={onOpenDashboard}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 text-xs font-medium transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="max-w-[100px] truncate">{currentUser.name}</span>
                <LayoutDashboard className="w-3.5 h-3.5 text-neutral-400" />
              </button>
              <button
                onClick={onLogout}
                title="Logout"
                className="p-2 rounded-lg bg-neutral-900 hover:bg-red-950/40 border border-neutral-800 hover:border-red-900/60 text-neutral-400 hover:text-red-400 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenAuth('login')}
                className="text-xs uppercase font-medium tracking-wider text-neutral-300 hover:text-white px-3 py-2 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => onOpenAuth('signup')}
                className="text-xs uppercase font-medium tracking-wider px-4 py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium shadow-lg shadow-purple-600/30 transition-all"
              >
                Sign Up
              </button>
            </div>
          )}
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
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProjectRequest();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Start Project
            </button>
            <a
              href="https://discord.gg/8znW9nfYhQ"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-xl bg-indigo-950/80 border border-indigo-600/50 text-indigo-300 font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              Join Discord Server
            </a>
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenDashboard();
                  }}
                  className="w-full py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4 text-purple-400" />
                  Client Dashboard ({currentUser.name})
                </button>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full py-3 rounded-xl bg-purple-950/40 border border-purple-800 text-purple-300 font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </button>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                  className="w-full py-3 rounded-xl bg-red-950/40 border border-red-900 text-red-300 font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('login');
                  }}
                  className="py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white font-medium text-xs uppercase tracking-wider"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth('signup');
                  }}
                  className="py-3 rounded-xl bg-purple-600 text-white font-medium text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
