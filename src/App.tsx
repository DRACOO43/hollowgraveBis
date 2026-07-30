import React, { useState, useEffect } from 'react';
import { User, PricingPlan, ServiceItem } from './types';
import { ToastProvider } from './components/Toast';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { Pricing } from './components/Pricing';
import { About } from './components/About';
import { Team } from './components/Team';
import { Testimonials } from './components/Testimonials';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { Dashboard } from './components/Dashboard';
import { AdminPanel } from './components/AdminPanel';
import { AIChatWidget } from './components/AIChatWidget';
import { CheckoutModal } from './components/CheckoutModal';
import { ProjectRequestModal } from './components/ProjectRequestModal';
import { LogoShowcase } from './components/LogoShowcase';

type PendingAction = 
  | { type: 'project' } 
  | { type: 'checkout'; item: PricingPlan | ServiceItem } 
  | null;

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup' | null>(null);
  const [authNotice, setAuthNotice] = useState<string | undefined>(undefined);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);

  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [projectRequestOpen, setProjectRequestOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<PricingPlan | ServiceItem | null>(null);

  useEffect(() => {
    // Check stored token if any
    const token = localStorage.getItem('hg_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setCurrentUser(data.user);
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleOpenAuthModal = (mode: 'login' | 'signup', notice?: string) => {
    setAuthNotice(notice);
    setAuthModalMode(mode);
  };

  const handleRequireAuthAndExecute = (action: PendingAction, notice: string) => {
    if (currentUser) {
      if (action?.type === 'project') {
        setProjectRequestOpen(true);
      } else if (action?.type === 'checkout') {
        setCheckoutItem(action.item);
      }
    } else {
      setPendingAction(action);
      setAuthNotice(notice);
      setAuthModalMode('signup');
    }
  };

  const handleLoginSuccess = (user: User, token: string) => {
    setCurrentUser(user);
    localStorage.setItem('hg_token', token);

    // Resume pending action if any
    if (pendingAction) {
      if (pendingAction.type === 'project') {
        setProjectRequestOpen(true);
      } else if (pendingAction.type === 'checkout') {
        setCheckoutItem(pendingAction.item);
      }
      setPendingAction(null);
      setAuthNotice(undefined);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('hg_token');
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#07070b] text-neutral-100 font-sans selection:bg-purple-500 selection:text-white">
        <CustomCursor />

        <Navbar
          currentUser={currentUser}
          onOpenAuth={(mode) => handleOpenAuthModal(mode)}
          onLogout={handleLogout}
          onOpenDashboard={() => setDashboardOpen(true)}
          onOpenAdmin={() => setAdminOpen(true)}
          onOpenProjectRequest={() => 
            handleRequireAuthAndExecute({ type: 'project' }, 'Authentication required. Please sign up or log in first to start a project.')
          }
        />

        <main>
          <Hero 
            onOpenProjectRequest={() => 
              handleRequireAuthAndExecute({ type: 'project' }, 'Authentication required. Please sign up or log in first to start a project.')
            } 
          />
          <LogoShowcase />
          <Services 
            onSelectService={(service) => 
              handleRequireAuthAndExecute({ type: 'checkout', item: service }, `Please log in or sign up first to order "${service.title}".`)
            } 
          />
          <Portfolio />
          <Pricing 
            onSelectPlan={(plan) => 
              handleRequireAuthAndExecute({ type: 'checkout', item: plan }, `Please log in or sign up first to select the "${plan.name}" plan.`)
            } 
          />
          <About />
          <Team />
          <Testimonials />
          <BlogSection />
          <FaqSection />
          <ContactSection />
        </main>

        <Footer />

        <AIChatWidget />

        {/* Modals */}
        {authModalMode && (
          <AuthModal
            initialMode={authModalMode}
            noticeBanner={authNotice}
            onClose={() => {
              setAuthModalMode(null);
              setAuthNotice(undefined);
            }}
            onLoginSuccess={handleLoginSuccess}
          />
        )}

        {dashboardOpen && currentUser && (
          <Dashboard
            currentUser={currentUser}
            onClose={() => setDashboardOpen(false)}
            onOpenProjectRequest={() => 
              handleRequireAuthAndExecute({ type: 'project' }, 'Authentication required. Please sign up or log in first to start a project.')
            }
            onUpdateUser={(updatedUser) => setCurrentUser(updatedUser)}
          />
        )}

        {adminOpen && currentUser?.role === 'admin' && (
          <AdminPanel
            onClose={() => setAdminOpen(false)}
          />
        )}

        {checkoutItem && (
          <CheckoutModal
            item={checkoutItem}
            onClose={() => setCheckoutItem(null)}
            onSuccess={() => {
              if (currentUser) {
                setDashboardOpen(true);
              }
            }}
          />
        )}

        {projectRequestOpen && (
          <ProjectRequestModal
            onClose={() => setProjectRequestOpen(false)}
          />
        )}
      </div>
    </ToastProvider>
  );
}
