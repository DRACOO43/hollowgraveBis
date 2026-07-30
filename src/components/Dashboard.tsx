import React, { useState, useEffect } from 'react';
import { User, Order } from '../types';
import { X, LayoutDashboard, ShoppingBag, FileText, Download, Settings, Shield, Sparkles, UserCheck, Phone, Building, Mail, Camera, Save, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useToast } from './Toast';

interface DashboardProps {
  currentUser: User;
  onClose: () => void;
  onOpenProjectRequest?: () => void;
  onUpdateUser?: (updatedUser: User) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ currentUser, onClose, onOpenProjectRequest, onUpdateUser }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'orders' | 'invoices' | 'settings'>('profile');
  const [orders, setOrders] = useState<Order[]>([]);

  // Profile Form state
  const [name, setName] = useState(currentUser.name || '');
  const [email, setEmail] = useState(currentUser.email || '');
  const [phone, setPhone] = useState((currentUser as any).phone || '+91 87675 27656');
  const [company, setCompany] = useState((currentUser as any).company || 'Acme Digital');
  const [avatar, setAvatar] = useState(currentUser.avatar || '');
  const [bio, setBio] = useState((currentUser as any).bio || 'Valued HOLLOWGRAVE Customer & Production Partner.');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: currentUser.id,
          name,
          email,
          phone,
          company,
          avatar,
          bio
        })
      });
      const data = await res.json();
      if (res.ok && data.user) {
        showToast('Customer Profile updated successfully!');
        if (onUpdateUser) {
          onUpdateUser(data.user);
        }
      } else {
        showToast(data.error || 'Failed to save profile changes.', 'error');
      }
    } catch {
      showToast('Network error while updating profile.', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in">
      <div className="relative max-w-5xl w-full h-[90vh] bg-[#0a0a0f] border border-purple-900/50 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-neutral-900 flex items-center justify-between bg-neutral-900/40">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img src={avatar || currentUser.avatar} alt={name} className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500/50 shadow-lg shadow-purple-950/50" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-[#0a0a0f] flex items-center justify-center text-[10px] text-black font-bold" title="Online & Verified">
                ✓
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{name || currentUser.name}</h2>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800/80 font-semibold tracking-wider uppercase">
                  Customer Partner
                </span>
              </div>
              <p className="text-xs font-mono text-neutral-400 mt-0.5">{email || currentUser.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
              title="Close Dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-neutral-950/80 border-r border-neutral-900 p-5 flex flex-row md:flex-col gap-2 shrink-0 overflow-x-auto">
            {[
              { id: 'profile', name: 'Customer Profile', icon: UserCheck },
              { id: 'projects', name: 'My Projects', icon: LayoutDashboard },
              { id: 'orders', name: 'My Orders', icon: ShoppingBag },
              { id: 'invoices', name: 'Invoices & Billing', icon: FileText },
              { id: 'settings', name: 'Security & Auth', icon: Settings },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-medium transition-all shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              );
            })}

            {onOpenProjectRequest && (
              <div className="mt-auto hidden md:block pt-6 border-t border-neutral-900">
                <button
                  onClick={() => {
                    onClose();
                    onOpenProjectRequest();
                  }}
                  className="w-full py-3 rounded-xl bg-purple-950/60 border border-purple-800/60 hover:border-purple-500 text-purple-300 hover:text-white font-medium text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                  <span>Start New Project</span>
                </button>
              </div>
            )}
          </div>

          {/* Main Area */}
          <div className="flex-grow p-6 sm:p-8 overflow-y-auto space-y-8 bg-[#07070b]">
            {/* CUSTOMER PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="space-y-8 animate-fade-in">
                {/* Profile Banner */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-950/40 via-neutral-900 to-indigo-950/40 border border-purple-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl">
                  <div className="space-y-1">
                    <span className="text-xs uppercase font-mono tracking-widest text-purple-400">Verified Client Identity</span>
                    <h3 className="text-xl font-bold text-white">Welcome to Your Personal Customer Portal</h3>
                    <p className="text-xs text-neutral-300 max-w-xl">
                      Manage your contact information, track ongoing website/video production sprints, review invoices, and communicate directly with Anshuman and Raja.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="px-3 py-1.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Account Active
                    </span>
                  </div>
                </div>

                {/* Edit Customer Profile Form */}
                <form onSubmit={handleSaveProfile} className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-6">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <UserCheck className="w-5 h-5 text-purple-400" />
                      <span>Customer Contact & Business Details</span>
                    </h3>
                    <span className="text-xs font-mono text-neutral-400">ID: {currentUser.id}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Full Display Name</label>
                      <div className="relative">
                        <UserCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Phone / WhatsApp</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          placeholder="+91 87675 27656"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Company / Brand Name</label>
                      <div className="relative">
                        <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                        <input
                          type="text"
                          value={company}
                          onChange={e => setCompany(e.target.value)}
                          placeholder="Acme Digital"
                          className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Avatar Image URL</label>
                    <div className="relative">
                      <Camera className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                      <input
                        type="url"
                        value={avatar}
                        onChange={e => setAvatar(e.target.value)}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-white text-xs focus:outline-none focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 uppercase tracking-wider mb-2">Customer Bio / Project Notes</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      placeholder="Brief note about your agency partnership or project objectives..."
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-4 py-3 text-white text-xs resize-none focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={saving}
                      className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs uppercase tracking-wider shadow-lg shadow-purple-600/30 flex items-center gap-2 transition-all"
                    >
                      <Save className="w-4 h-4" />
                      <span>{saving ? 'Saving Changes...' : 'Save Customer Profile'}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* MY PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Active Projects & Scope Tracker</h3>
                  {onOpenProjectRequest && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenProjectRequest();
                      }}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-purple-600/30"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      Start Another Project
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-neutral-900/60 border border-purple-900/50 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-neutral-800 pb-4">
                      <div>
                        <span className="text-xs font-mono text-purple-400 uppercase tracking-wider">PROJECT #HG-PRJ-01</span>
                        <h4 className="text-lg font-bold text-white mt-1">SaaS Full-Stack Web Development & Dashboard</h4>
                        <p className="text-xs text-neutral-400">Assigned Production Leads: <span className="text-white font-semibold">Anshuman Bhalerao & Raja Sahu</span></p>
                      </div>
                      <span className="px-3.5 py-1.5 rounded-full bg-blue-950 text-blue-300 text-xs font-mono border border-blue-800 font-semibold">
                        Sprint 2 in Progress (75%)
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-neutral-300 font-mono">
                        <span>Milestone: API Integration & Payment Gateway</span>
                        <span className="text-purple-400 font-bold">75% Complete</span>
                      </div>
                      <div className="w-full h-2.5 bg-neutral-950 rounded-full overflow-hidden border border-neutral-800">
                        <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-[75%]" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                      <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                        <span className="text-neutral-500 block">Target Deadline</span>
                        <span className="font-semibold text-white">August 2026</span>
                      </div>
                      <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                        <span className="text-neutral-500 block">Budget Tier</span>
                        <span className="font-semibold text-white">$1,500 - $3,000</span>
                      </div>
                      <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-xs">
                        <span className="text-neutral-500 block">Telegram Updates</span>
                        <span className="font-semibold text-emerald-400">Active Channel</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold text-white">Your Placed Orders</h3>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-mono text-purple-400">{order.id} • {order.gateway} Gateway</span>
                        <h4 className="text-base font-bold text-white mt-1">{order.serviceName}</h4>
                        <span className="text-xs text-neutral-400 font-mono">Placed on {new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-black text-white">${order.amount}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${
                          order.status === 'Completed' ? 'bg-green-950 text-green-300 border border-green-800' : 'bg-blue-950 text-blue-300 border border-blue-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INVOICES TAB */}
            {activeTab === 'invoices' && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="text-xl font-bold text-white">Invoices & Billing Receipts</h3>
                <div className="space-y-4">
                  {orders.map(order => (
                    <div key={order.id} className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono text-purple-400">INV-{order.id}</span>
                        <h4 className="text-sm font-bold text-white">{order.serviceName}</h4>
                        <span className="text-xs text-neutral-400 font-mono">${order.amount} USD • Paid via {order.gateway}</span>
                      </div>
                      <button
                        onClick={() => showToast(`Downloading official invoice INV-${order.id}.pdf`)}
                        className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-purple-600 text-white text-xs font-medium uppercase tracking-wider flex items-center gap-2 transition-colors shadow-sm"
                      >
                        <Download className="w-4 h-4" />
                        <span>Receipt PDF</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECURITY & SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6 max-w-xl animate-fade-in">
                <h3 className="text-xl font-bold text-white">Security & Account Verification</h3>

                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white">Two-Factor Authentication (2FA)</h4>
                      <p className="text-xs text-neutral-400 mt-1">Protect your customer account with mobile OTP verification.</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-mono">
                      Enabled
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-4">
                  <h4 className="text-sm font-bold text-white">Password Recovery</h4>
                  <p className="text-xs text-neutral-400">Need to update your password? Send a password reset link to <span className="text-purple-300">{currentUser.email}</span>.</p>
                  <button
                    type="button"
                    onClick={() => showToast('Password reset link sent to your email!')}
                    className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-medium uppercase tracking-wider"
                  >
                    Send Reset Link
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
