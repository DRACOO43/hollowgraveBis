import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { User } from '../types';
import { useToast } from './Toast';

interface AuthModalProps {
  initialMode: 'login' | 'signup';
  noticeBanner?: string;
  onClose: () => void;
  onLoginSuccess: (user: User, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ initialMode, noticeBanner, onClose, onLoginSuccess }) => {
  const { showToast } = useToast();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [socialModal, setSocialModal] = useState<'none' | 'google' | 'discord'>('none');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(true);
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Password strength calculation
  const getPasswordStrength = (pass: string) => {
    if (!pass) return { score: 0, label: 'Empty', color: 'bg-neutral-800' };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 10) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return { score, label: 'Weak', color: 'bg-red-500' };
    if (score <= 4) return { score, label: 'Medium', color: 'bg-amber-500' };
    return { score, label: 'Strong', color: 'bg-emerald-500' };
  };

  const strength = getPasswordStrength(password);

  // Social account inputs
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');
  const [customDiscordName, setCustomDiscordName] = useState('');

  const handleGoogleAuth = async (selectedEmail?: string, selectedName?: string) => {
    setLoading(true);
    try {
      const gEmail = selectedEmail || customGoogleEmail || 'creator.google@gmail.com';
      const gName = selectedName || customGoogleName || gEmail.split('@')[0].replace('.', ' ');
      
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: gName,
          email: gEmail,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(gEmail)}`,
          googleId: `g-${Date.now()}`
        })
      });

      const data = await res.json();
      if (res.ok) {
        showToast(`Signed in with Google as ${data.user.name}!`);
        onLoginSuccess(data.user, data.token);
        onClose();
      } else {
        showToast(data.error || 'Google auth failed', 'error');
      }
    } catch {
      showToast('Failed to connect to Google Auth API', 'error');
    } finally {
      setLoading(false);
      setSocialModal('none');
    }
  };

  const handleDiscordAuth = async (selectedTag?: string) => {
    setLoading(true);
    try {
      const dTag = selectedTag || customDiscordName || 'GraveMaster#0001';
      const dName = dTag.split('#')[0];
      const dEmail = `${dName.toLowerCase().replace(/[^a-z0-9]/g, '')}@discord.gg`;

      const res = await fetch('/api/auth/discord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: dName,
          email: dEmail,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(dTag)}`,
          discordId: `d-${Date.now()}`
        })
      });

      const data = await res.json();
      if (res.ok) {
        showToast(`Connected via Discord as ${data.user.name}!`);
        onLoginSuccess(data.user, data.token);
        onClose();
      } else {
        showToast(data.error || 'Discord auth failed', 'error');
      }
    } catch {
      showToast('Failed to connect to Discord Auth API', 'error');
    } finally {
      setLoading(false);
      setSocialModal('none');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'login') {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ emailOrUsername: email, password, rememberMe })
        });
        const data = await res.json();
        if (res.ok) {
          showToast(`Welcome back, ${data.user.name}!`);
          onLoginSuccess(data.user, data.token);
          onClose();
        } else {
          showToast(data.error || 'Login failed', 'error');
        }
      } else if (mode === 'signup') {
        if (password !== confirmPassword) {
          showToast('Passwords do not match. Please re-enter.', 'error');
          setLoading(false);
          return;
        }
        if (!acceptTerms) {
          showToast('Please accept the Terms of Service to continue.', 'error');
          setLoading(false);
          return;
        }

        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, username, email, password, termsAccepted: true })
        });
        const data = await res.json();
        if (res.ok) {
          showToast(`Account created successfully! Welcome to HOLLOWGRAVE.`);
          onLoginSuccess(data.user, data.token);
          onClose();
        } else {
          showToast(data.error || 'Signup failed', 'error');
        }
      } else {
        if (!resetSent) {
          const res = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
          });
          const data = await res.json();
          if (res.ok) {
            showToast(data.message || 'Reset instructions sent!');
            if (data.resetCodeDemo) {
              setResetCode(data.resetCodeDemo);
            }
            setResetSent(true);
          } else {
            showToast(data.error || 'Failed to request reset', 'error');
          }
        } else {
          const res = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, resetCode, newPassword })
          });
          const data = await res.json();
          if (res.ok) {
            showToast('Password reset successfully! Please log in with your new password.');
            setMode('login');
            setPassword(newPassword);
            setResetSent(false);
          } else {
            showToast(data.error || 'Password reset failed', 'error');
          }
        }
      }
    } catch {
      showToast('Network error while processing request', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdmin = () => {
    setEmail('anshuman@hollowgrave.com');
    setPassword('admin123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      {/* GOOGLE OAUTH DIALOG */}
      {socialModal === 'google' && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-white text-neutral-900 rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-neutral-200 animate-scale-up">
            <button
              onClick={() => setSocialModal('none')}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <svg className="w-10 h-10 mx-auto mb-3" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <h4 className="text-lg font-bold">Sign in with Google</h4>
              <p className="text-xs text-neutral-500 mt-1">Choose an account to continue to <span className="font-semibold text-purple-700">HOLLOWGRAVE</span></p>
            </div>

            <div className="space-y-2 mb-6">
              <button
                onClick={() => handleGoogleAuth('anshuman@gmail.com', 'Anshuman Bhalerao')}
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-neutral-100 border border-neutral-200 text-left transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center text-sm">
                  AB
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-neutral-800">Anshuman Bhalerao</div>
                  <div className="text-xs text-neutral-500 truncate">anshuman@gmail.com</div>
                </div>
              </button>

              <button
                onClick={() => handleGoogleAuth('rajasahu@gmail.com', 'Raja Sahu')}
                className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-neutral-100 border border-neutral-200 text-left transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                  RS
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-neutral-800">Raja Sahu</div>
                  <div className="text-xs text-neutral-500 truncate">rajasahu@gmail.com</div>
                </div>
              </button>
            </div>

            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <p className="text-[11px] font-medium text-neutral-500 text-center uppercase tracking-wider">Or enter custom Google account</p>
              <input
                type="text"
                placeholder="Name (e.g. Alex Mercer)"
                value={customGoogleName}
                onChange={e => setCustomGoogleName(e.target.value)}
                className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Email (e.g. alex@gmail.com)"
                value={customGoogleEmail}
                onChange={e => setCustomGoogleEmail(e.target.value)}
                className="w-full bg-neutral-100 border border-neutral-300 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={() => handleGoogleAuth()}
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                {loading ? 'Authenticating...' : 'Authorize & Sign In'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DISCORD OAUTH DIALOG */}
      {socialModal === 'discord' && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#313338] text-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative border border-indigo-900/50 animate-scale-up">
            <button
              onClick={() => setSocialModal('none')}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#383a40] text-neutral-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#5865F2] flex items-center justify-center text-white mx-auto mb-3 shadow-lg shadow-[#5865F2]/40">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </div>
              <h4 className="text-lg font-bold">Authorize HOLLOWGRAVE</h4>
              <p className="text-xs text-neutral-400 mt-1">Connect your Discord identity to sign in instantly</p>
            </div>

            <div className="bg-[#2b2d31] rounded-2xl p-4 mb-6 border border-neutral-700 space-y-3">
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Access your username & avatar</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Know what servers you are in</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleDiscordAuth('HollowGraveGamer#7777')}
                className="w-full p-3 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-lg"
              >
                <span>Authorize as HollowGraveGamer#7777</span>
              </button>

              <button
                onClick={() => handleDiscordAuth('CreativeGrave#1337')}
                className="w-full p-3 rounded-2xl bg-[#383a40] hover:bg-[#404249] text-neutral-200 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Authorize as CreativeGrave#1337</span>
              </button>
            </div>

            <div className="pt-4 border-t border-neutral-700/80 space-y-3">
              <p className="text-[11px] font-mono text-neutral-400 text-center uppercase tracking-wider">Or enter custom Discord handle</p>
              <input
                type="text"
                placeholder="Discord Handle (e.g. GraveMaster#0001)"
                value={customDiscordName}
                onChange={e => setCustomDiscordName(e.target.value)}
                className="w-full bg-[#1e1f22] border border-neutral-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#5865F2]"
              />
              <button
                onClick={() => handleDiscordAuth()}
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                {loading ? 'Authorizing...' : 'Authorize & Connect'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN AUTH MODAL CONTAINER */}
      <div className="relative max-w-md w-full bg-[#0e0e14] border border-purple-900/50 rounded-3xl p-8 shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-800/60 flex items-center justify-center text-purple-400 mx-auto mb-4 shadow-lg">
            <Sparkles className="w-6 h-6" />
          </div>

          {noticeBanner && (
            <div className="mb-4 p-3.5 rounded-2xl bg-purple-950/80 border border-purple-500/50 text-purple-200 text-xs font-medium flex items-center gap-2.5 shadow-lg animate-pulse">
              <Lock className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-left">{noticeBanner}</span>
            </div>
          )}

          <h3 className="text-2xl font-bold text-white mb-2">
            {mode === 'login' && 'Welcome Back'}
            {mode === 'signup' && 'Create Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h3>
          <p className="text-neutral-400 text-xs">
            {mode === 'login' && 'Access your HOLLOWGRAVE client portal and orders'}
            {mode === 'signup' && 'Join the elite ecosystem of high-growth creators'}
            {mode === 'forgot' && 'Enter your email to receive a recovery link'}
          </p>
        </div>

        {/* SOCIAL SIGN UP & SIGN IN BUTTONS */}
        {mode !== 'forgot' && (
          <div className="space-y-3 mb-6">
            <button
              type="button"
              onClick={() => setSocialModal('google')}
              className="w-full py-3.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-white font-medium text-xs flex items-center justify-center gap-3 transition-all hover:border-neutral-500 shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>{mode === 'signup' ? 'Sign up with Google' : 'Continue with Google'}</span>
            </button>

            <button
              type="button"
              onClick={() => setSocialModal('discord')}
              className="w-full py-3.5 px-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium text-xs flex items-center justify-center gap-3 transition-all shadow-md shadow-[#5865F2]/20"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span>{mode === 'signup' ? 'Sign up with Discord' : 'Continue with Discord'}</span>
            </button>

            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-neutral-800"></div>
              <span className="px-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Or email</span>
              <div className="flex-1 border-t border-neutral-800"></div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Anshuman Bhalerao"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Username</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="anshuman_b"
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">
              {mode === 'login' ? 'Email or Username' : 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type={mode === 'login' ? 'text' : 'email'}
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="anshuman@hollowgrave.com"
                className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono text-neutral-300 uppercase tracking-wider">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => { setMode('forgot'); setResetSent(false); }}
                    className="text-xs text-purple-400 hover:underline font-mono"
                  >
                    Forgot Password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              {mode === 'signup' && password && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-neutral-400">Password Strength:</span>
                    <span className={`font-bold ${strength.label === 'Strong' ? 'text-emerald-400' : strength.label === 'Medium' ? 'text-amber-400' : 'text-red-400'}`}>
                      {strength.label}
                    </span>
                  </div>
                  <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden flex gap-1">
                    <div className={`h-full flex-1 rounded-full transition-all ${strength.score >= 1 ? strength.color : 'bg-neutral-800'}`} />
                    <div className={`h-full flex-1 rounded-full transition-all ${strength.score >= 3 ? strength.color : 'bg-neutral-800'}`} />
                    <div className={`h-full flex-1 rounded-full transition-all ${strength.score >= 5 ? strength.color : 'bg-neutral-800'}`} />
                  </div>
                </div>
              )}
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          {mode === 'login' && (
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-800 bg-neutral-950 text-purple-600 focus:ring-purple-500/20"
                />
                <span>Remember me for 30 days</span>
              </label>
            </div>
          )}

          {mode === 'signup' && (
            <div className="pt-1">
              <label className="flex items-center gap-2.5 text-xs text-neutral-300 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={acceptTerms}
                  onChange={e => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-800 bg-neutral-950 text-purple-600 focus:ring-purple-500/20"
                />
                <span>I accept HOLLOWGRAVE Terms & Privacy Policy</span>
              </label>
            </div>
          )}

          {mode === 'forgot' && resetSent && (
            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">6-Digit Reset Code</label>
                <input
                  type="text"
                  required
                  value={resetCode}
                  onChange={e => setResetCode(e.target.value)}
                  placeholder="rst_123456"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 mt-6"
          >
            <span>
              {loading
                ? 'Processing...'
                : mode === 'login'
                ? 'Sign In'
                : mode === 'signup'
                ? 'Create Account'
                : resetSent
                ? 'Reset Password Now'
                : 'Send Reset Code'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {mode === 'login' && (
          <button
            onClick={handleDemoAdmin}
            className="w-full mt-3 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-purple-300 transition-colors"
          >
            Quick Fill Demo Admin Credentials
          </button>
        )}

        <div className="mt-8 pt-6 border-t border-neutral-800 text-center text-xs text-neutral-400">
          {mode === 'login' && (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setMode('signup')} className="text-purple-400 font-semibold hover:underline">
                Sign Up
              </button>
            </p>
          )}
          {mode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-purple-400 font-semibold hover:underline">
                Sign In
              </button>
            </p>
          )}
          {mode === 'forgot' && (
            <p>
              Remembered password?{' '}
              <button onClick={() => setMode('login')} className="text-purple-400 font-semibold hover:underline">
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

