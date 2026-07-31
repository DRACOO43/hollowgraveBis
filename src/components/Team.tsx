import React, { useState, useRef } from 'react';
import { TEAM_MEMBERS } from '../data/mockData';
import { TeamMember } from '../types';
import { Github, Linkedin, Twitter, Instagram, Send, Sparkles, CheckCircle2, Award, Briefcase, ChevronRight, MessageSquare, Mail, Loader2, X } from 'lucide-react';
import { useToast } from './Toast';
import { StaggerContainer, StaggerItem } from './ScrollEffects';

interface TeamCardProps {
  member: TeamMember;
  onSelectMember: (m: TeamMember) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ member, onSelectMember }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Max 10 deg rotation
    const rotateX = ((y - centerY) / centerY) * -9;
    const rotateY = ((x - centerX) / centerX) * 9;

    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`);
    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22
    });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: transform.includes('scale3d(1, 1, 1)')
          ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
          : 'transform 0.08s ease-out',
        transformStyle: 'preserve-3d'
      }}
      className="group rounded-3xl bg-neutral-900/80 border border-neutral-800/90 hover:border-purple-500/70 p-8 transition-colors duration-300 shadow-2xl backdrop-blur-xl flex flex-col justify-between relative overflow-hidden hover:shadow-purple-950/40"
    >
      {/* Dynamic Interactive Glare Overlay */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-3xl z-20"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(168, 85, 247, 0.4) 0%, rgba(99, 102, 241, 0.2) 40%, transparent 75%)`
        }}
      />

      {/* Ambient background blur inside card */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />

      <div className="relative z-10">
        {/* Header & Avatar */}
        <div className="flex items-start gap-6 mb-6">
          <div 
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-xl group-hover:border-purple-400 group-hover:scale-105 transition-all shrink-0 bg-neutral-950"
            style={{ transform: 'translateZ(20px)' }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-950/60 via-transparent to-transparent" />
          </div>

          <div className="space-y-1.5 flex-grow" style={{ transform: 'translateZ(15px)' }}>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/90 border border-purple-800/70 text-purple-300 text-[10px] font-mono uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-purple-400" />
                {member.role}
              </span>
              {member.verified && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-[10px] font-mono" title="Verified Founder/Lead">
                  <CheckCircle2 className="w-3 h-3" /> VERIFIED
                </span>
              )}
            </div>

            <h3 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              {member.name}
            </h3>

            {member.status && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {member.status}
              </span>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="text-neutral-300 text-sm leading-relaxed mb-6" style={{ transform: 'translateZ(10px)' }}>
          {member.bio}
        </p>

        {/* Metrics Bar */}
        <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-neutral-950/70 border border-neutral-800/80 mb-6 font-mono text-xs" style={{ transform: 'translateZ(12px)' }}>
          <div className="flex items-center gap-2 text-neutral-300">
            <Briefcase className="w-3.5 h-3.5 text-purple-400" />
            <span>{member.projectsCompleted || 100}+ Projects</span>
          </div>
          <div className="flex items-center gap-2 text-neutral-300">
            <Award className="w-3.5 h-3.5 text-indigo-400" />
            <span>{member.experience || '5+ Years'}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-8" style={{ transform: 'translateZ(8px)' }}>
          <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-400 block mb-3">
            Specialized Expertise
          </span>
          <div className="flex flex-wrap gap-2">
            {member.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-neutral-800/80 border border-neutral-700/60 text-xs font-mono text-purple-300 group-hover:border-purple-500/50 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="relative z-10 pt-6 border-t border-neutral-800/80 space-y-4" style={{ transform: 'translateZ(18px)' }}>
        <button
          onClick={() => onSelectMember(member)}
          className="w-full py-3 rounded-xl bg-purple-950/70 hover:bg-purple-600 border border-purple-800/70 hover:border-purple-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg group-hover:shadow-purple-600/30"
        >
          <MessageSquare className="w-3.5 h-3.5 text-purple-400 group-hover:text-white" />
          <span>Direct Consultation & Profile</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        <div className="flex items-center justify-between text-xs font-mono text-neutral-400 pt-1">
          <span className="uppercase text-[10px] tracking-widest">Connect</span>
          <div className="flex items-center gap-2">
            {member.socials.github && (
              <a href={member.socials.github} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-neutral-800/80 hover:bg-purple-600 text-neutral-300 hover:text-white transition-colors" title="GitHub">
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {member.socials.linkedin && (
              <a href={member.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-neutral-800/80 hover:bg-purple-600 text-neutral-300 hover:text-white transition-colors" title="LinkedIn">
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {member.socials.twitter && (
              <a href={member.socials.twitter} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-neutral-800/80 hover:bg-purple-600 text-neutral-300 hover:text-white transition-colors" title="Twitter">
                <Twitter className="w-3.5 h-3.5" />
              </a>
            )}
            {member.socials.instagram && (
              <a href={member.socials.instagram} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-neutral-800/80 hover:bg-purple-600 text-neutral-300 hover:text-white transition-colors" title="Instagram">
                <Instagram className="w-3.5 h-3.5" />
              </a>
            )}
            {member.socials.discord && (
              <a href={member.socials.discord} target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-neutral-800/80 hover:bg-purple-600 text-neutral-300 hover:text-white transition-colors" title="Discord Community">
                <Send className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Team: React.FC = () => {
  const { showToast } = useToast();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [directMessage, setDirectMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);

  const handleSendDirectInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;
    if (!directMessage || !userEmail) {
      showToast('Please fill in your email and message.', 'error');
      return;
    }

    setSendingMsg(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userName || 'Client Partner',
          email: userEmail,
          subject: `Direct Inquiry for ${selectedMember.name} (${selectedMember.role})`,
          message: directMessage
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(`Inquiry sent directly to ${selectedMember.name}! We will get back to you shortly.`);
        setDirectMessage('');
        setUserEmail('');
        setUserName('');
        setSelectedMember(null);
      } else {
        showToast(data.error || 'Failed to submit inquiry', 'error');
      }
    } catch {
      showToast('Network error submitting inquiry', 'error');
    } finally {
      setSendingMsg(false);
    }
  };

  return (
    <section id="team" className="py-24 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-indigo-900/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <StaggerContainer staggerDelay={0.15} viewportAmount={0.1}>
          {/* Section Header */}
          <StaggerItem variant="fade-up">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono tracking-[0.2em] uppercase mb-4">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                LEADERSHIP & CREATIVE ARCHITECTS
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                Meet The Masterminds Behind HollowGrave
              </h2>
              <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
                Driven by relentless technical craftsmanship, elite engineering precision, and visionary creative direction that powers industry leaders worldwide.
              </p>
            </div>
          </StaggerItem>

          {/* Team Cards Grid with 3D Parallax Tilt */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TEAM_MEMBERS.map((member) => (
              <StaggerItem key={member.id} variant="scale-up">
                <TeamCard
                  member={member}
                  onSelectMember={setSelectedMember}
                />
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>

      {/* ==========================================
          TEAM MEMBER CONSULTATION & PROFILE MODAL
         ========================================== */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fade-in">
          <div className="relative max-w-2xl w-full bg-[#0a0a0f] border border-purple-900/60 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/40"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-bold text-white">{selectedMember.name}</h3>
                    {selectedMember.verified && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                  <span className="text-xs font-mono text-purple-400">{selectedMember.role}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedMember(null)}
                className="p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Member Bio & Stats */}
            <div className="space-y-3">
              <p className="text-neutral-300 text-sm leading-relaxed">
                {selectedMember.bio}
              </p>

              <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
                <span className="px-3 py-1 rounded-lg bg-purple-950/60 border border-purple-800/60 text-purple-300">
                  ⚡ {selectedMember.projectsCompleted}+ Completed Projects
                </span>
                <span className="px-3 py-1 rounded-lg bg-indigo-950/60 border border-indigo-800/60 text-indigo-300">
                  🎯 {selectedMember.experience}
                </span>
                {selectedMember.status && (
                  <span className="px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-emerald-300">
                    🟢 {selectedMember.status}
                  </span>
                )}
              </div>
            </div>

            {/* Direct Inquiry Form */}
            <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
              <h4 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" />
                Send Direct Message to {selectedMember.name.split(' ')[0]}
              </h4>

              <form onSubmit={handleSendDirectInquiry} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your Name / Company"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
                  />
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Your Email Address *"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  value={directMessage}
                  onChange={(e) => setDirectMessage(e.target.value)}
                  placeholder={`Describe your project requirement or topic for ${selectedMember.name}...`}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl p-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 resize-none"
                />

                <button
                  type="submit"
                  disabled={sendingMsg}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {sendingMsg ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Direct Inquiry</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
