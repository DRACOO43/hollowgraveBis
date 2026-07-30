import React, { useState, useEffect } from 'react';
import { User, Order, ContactMessage } from '../types';
import { X, Shield, DollarSign, Users, Briefcase, MessageSquare, Mail, Calendar, CheckCircle2 } from 'lucide-react';

interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'users' | 'orders' | 'messages' | 'newsletter'>('stats');
  const [stats, setStats] = useState<any>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [searchSubscriber, setSearchSubscriber] = useState('');

  useEffect(() => {
    fetch('/api/admin/stats').then(res => res.json()).then(setStats).catch(console.error);
    fetch('/api/admin/users').then(res => res.json()).then(setUsers).catch(console.error);
    fetch('/api/orders').then(res => res.json()).then(setOrders).catch(console.error);
    fetch('/api/admin/messages').then(res => res.json()).then(setMessages).catch(console.error);
    fetch('/api/admin/newsletter').then(res => res.json()).then(setSubscribers).catch(console.error);
  }, []);

  const filteredSubscribers = subscribers.filter(s =>
    s.email.toLowerCase().includes(searchSubscriber.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-2xl animate-fade-in">
      <div className="relative max-w-6xl w-full h-[90vh] bg-[#0a0a0f] border border-purple-900/60 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-neutral-900 flex items-center justify-between bg-neutral-900/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950 border border-purple-800 flex items-center justify-center text-purple-400">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">HOLLOWGRAVE Admin Control Center</h2>
              <p className="text-xs font-mono text-neutral-400">Executive Management Dashboard</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
          {/* Sidebar */}
          <div className="w-full md:w-64 bg-neutral-950/60 border-r border-neutral-900 p-6 flex flex-row md:flex-col gap-2 shrink-0 overflow-x-auto">
            {[
              { id: 'stats', name: 'Revenue & Analytics', icon: DollarSign },
              { id: 'users', name: 'Manage Users', icon: Users },
              { id: 'orders', name: 'Manage Orders', icon: Briefcase },
              { id: 'messages', name: 'Client Inquiries', icon: MessageSquare },
              { id: 'newsletter', name: 'Newsletter Emails', icon: Mail, badge: subscribers.length },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs uppercase tracking-wider font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-950 text-purple-300 text-[10px] font-mono border border-purple-800">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Main Area */}
          <div className="flex-grow p-8 overflow-y-auto space-y-8 bg-[#07070b]">
            {activeTab === 'stats' && stats && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                    <span className="text-xs font-mono text-neutral-400 block mb-1">Total Revenue</span>
                    <span className="text-3xl font-black text-white">${stats.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                    <span className="text-xs font-mono text-neutral-400 block mb-1">Active Projects</span>
                    <span className="text-3xl font-black text-white">{stats.activeProjects}</span>
                  </div>
                  <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                    <span className="text-xs font-mono text-neutral-400 block mb-1">Total Clients</span>
                    <span className="text-3xl font-black text-white">{stats.totalClients}</span>
                  </div>
                  <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                    <span className="text-xs font-mono text-purple-400 block mb-1">Newsletter Subscribers</span>
                    <span className="text-3xl font-black text-purple-300">{subscribers.length}</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800">
                  <h3 className="text-lg font-bold text-white mb-4">Founders Overview</h3>
                  <p className="text-sm text-neutral-300">
                    System operating at peak efficiency. All services, AI endpoints, and newsletter email collection routes are active and capturing backend updates seamlessly.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Registered Users ({users.length})</h3>
                <div className="space-y-3">
                  {users.map(u => (
                    <div key={u.id} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                        <div>
                          <h4 className="text-sm font-bold text-white">{u.name}</h4>
                          <span className="text-xs font-mono text-neutral-400">{u.email}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-purple-950 text-purple-300 text-xs font-mono border border-purple-800">
                        {u.role.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Manage Client Orders ({orders.length})</h3>
                <div className="space-y-3">
                  {orders.map(o => (
                    <div key={o.id} className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-mono text-purple-400">{o.id} • ${o.amount}</span>
                        <h4 className="text-sm font-bold text-white">{o.serviceName}</h4>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-green-950 text-green-300 text-xs font-mono border border-green-800">
                        {o.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-white">Client Inquiries ({messages.length})</h3>
                <div className="space-y-4">
                  {messages.map(m => (
                    <div key={m.id} className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-white">{m.name} ({m.email})</span>
                        <span className="text-xs font-mono text-neutral-400">{new Date(m.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h4 className="text-xs font-mono text-purple-400">{m.subject}</h4>
                      <p className="text-sm text-neutral-300">{m.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'newsletter' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Newsletter Marketing Subscribers</h3>
                    <p className="text-xs text-neutral-400 font-mono">
                      Subscribed emails stored in the backend database ({subscribers.length} total)
                    </p>
                  </div>
                  
                  <input
                    type="text"
                    placeholder="Search subscriber emails..."
                    value={searchSubscriber}
                    onChange={(e) => setSearchSubscriber(e.target.value)}
                    className="bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-3">
                  {filteredSubscribers.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 text-neutral-400 text-sm">
                      No matching newsletter subscribers found.
                    </div>
                  ) : (
                    filteredSubscribers.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 flex items-center justify-between hover:border-purple-800/60 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800 text-purple-400 flex items-center justify-center">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">{sub.email}</h4>
                            <span className="text-[10px] font-mono text-neutral-400 flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-purple-400" />
                              Subscribed {new Date(sub.subscribedAt).toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-300 text-xs font-mono border border-emerald-800/60 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> ACTIVE
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
