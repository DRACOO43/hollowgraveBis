import React, { useState } from 'react';
import { ServiceItem } from './types';
import { ToastProvider } from './components/Toast';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { DiscordBanner } from './components/DiscordBanner';
import { About } from './components/About';
import { Team } from './components/Team';
import { Testimonials } from './components/Testimonials';
import { BlogSection } from './components/BlogSection';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AIChatWidget } from './components/AIChatWidget';
import { CheckoutModal } from './components/CheckoutModal';
import { LogoShowcase } from './components/LogoShowcase';
import { ScrollProgressBar, ScrollFloatingGlows, ParallaxText, ScrollReveal } from './components/ScrollEffects';
import { IntroSplash } from './components/IntroSplash';

export default function App() {
  const [checkoutItem, setCheckoutItem] = useState<ServiceItem | null>(null);

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#07070b] text-neutral-100 font-sans selection:bg-purple-500 selection:text-white relative overflow-x-hidden">
        <IntroSplash />
        <ScrollProgressBar />
        <ScrollFloatingGlows />
        <CustomCursor />

        <Navbar />

        <main className="relative z-10">
          <Hero />
          <LogoShowcase />
          
          <ParallaxText baseVelocity={2}>
            HOLLOWGRAVE • CREATIVE AGENCY • DIGITAL MASTERY • WE BUILD FUTURE
          </ParallaxText>

          <Services 
            onSelectService={(service) => setCheckoutItem(service)} 
          />
          <Portfolio />

          <ParallaxText baseVelocity={-2}>
            CINEMATIC EDITING • HIGH-CONVERSION WEBSITES • SCALABLE APPS • AI AUTOMATION
          </ParallaxText>

          <DiscordBanner />
          <About />
          <Team />
          <Testimonials />

          <ScrollReveal variant="elastic-scale">
            <BlogSection />
          </ScrollReveal>

          <ScrollReveal variant="fade-up">
            <FaqSection />
          </ScrollReveal>

          <ScrollReveal variant="zoom-3d">
            <ContactSection />
          </ScrollReveal>
        </main>

        <Footer />

        <AIChatWidget />

        {/* Modals */}
        {checkoutItem && (
          <CheckoutModal
            item={checkoutItem}
            onClose={() => setCheckoutItem(null)}
            onSuccess={() => setCheckoutItem(null)}
          />
        )}
      </div>
    </ToastProvider>
  );
}
