import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GlobalVideoCanvasBackground } from './components/GlobalVideoCanvasBackground';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { EssenciaSection } from './components/EssenciaSection';
import { NovidadesSection, LookItem } from './components/NovidadesSection';
import { WhatsAppSection } from './components/WhatsAppSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { SectionPagination } from './components/SectionPagination';
import { LookModal } from './components/LookModal';

const TOTAL_SECTIONS = 4;
const SECTION_NAMES = [
  'Início',
  'Essência',
  'Novidades',
  'Contato',
];

export default function App() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLook, setActiveLook] = useState<LookItem | null>(null);

  // Section references for precise navigation
  const sectionRefs = [
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
    useRef<HTMLElement>(null),
  ];

  const isNavigatingRef = useRef(false);
  const navTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll to target section
  const goToSection = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL_SECTIONS) return;

    isNavigatingRef.current = true;
    setCurrentSection(index);

    const targetEl = sectionRefs[index]?.current;
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    navTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 700);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.forEach((ref, index) => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !isNavigatingRef.current) {
              setCurrentSection(index);
            }
          });
        },
        {
          rootMargin: '-20% 0px -40% 0px',
          threshold: 0.1,
        }
      );

      observer.observe(ref.current);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  // Track scroll position for Header background styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPos > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen min-h-[100dvh] bg-transparent text-[#FBF8F2] font-sans antialiased selection:bg-[#E5A8A8]/30 selection:text-white">
      {/* Global Fixed Canvas Background Video Animation */}
      <GlobalVideoCanvasBackground />

      {/* Header */}
      <Header
        currentSection={currentSection}
        onNavigate={goToSection}
        isScrolled={isScrolled}
      />

      {/* Floating Section Dots */}
      <SectionPagination
        currentSection={currentSection}
        totalSections={TOTAL_SECTIONS}
        onSelectSection={goToSection}
        sectionNames={SECTION_NAMES}
      />

      {/* Main Single Page Content Flow with Ultra-Translucent Sections */}
      <main className="relative z-10 w-full">
        {/* SEÇÃO 01 — HERO (Fundo 100% Transparente) */}
        <section
          id="inicio"
          ref={sectionRefs[0]}
          aria-label="Seção 1: Início ISÉLE"
          className="w-full snap-section scroll-mt-0 bg-transparent"
        >
          <Hero onExplore={() => goToSection(1)} />
        </section>

        {/* SEÇÃO 02 — ESSÊNCIA (Fundo Translúcido com Vídeo Visível 100%) */}
        <section
          id="essencia"
          ref={sectionRefs[1]}
          aria-label="Seção 2: Essência ISÉLE"
          className="w-full snap-section glass-section-sand text-shadow-sand relative scroll-mt-20 border-t border-white/15"
        >
          <EssenciaSection onExploreNovidades={() => goToSection(2)} />
        </section>

        {/* SEÇÃO 03 — NOVIDADES (Fundo Translúcido com Vídeo Visível 100%) */}
        <section
          id="novidades"
          ref={sectionRefs[2]}
          aria-label="Seção 3: Novos Looks"
          className="w-full snap-section glass-section-sand text-shadow-sand relative scroll-mt-20 border-t border-white/15"
        >
          <NovidadesSection onSelectLook={(look) => setActiveLook(look)} />
        </section>

        {/* SEÇÃO 04 — CONTATO (Fundo 100% Transparente sobre o Vídeo) */}
        <section
          id="contato"
          ref={sectionRefs[3]}
          aria-label="Seção 4: Contato WhatsApp"
          className="w-full snap-section text-[#FBF8F2] scroll-mt-20 bg-transparent"
        >
          <WhatsAppSection />
        </section>
      </main>

      {/* Footer com Fundo Translúcido Escuro */}
      <footer className="relative z-10 w-full glass-section-footer text-[#FBF8F2]">
        <Footer onNavigate={goToSection} />
      </footer>

      {/* Floating WhatsApp CTA */}
      <FloatingWhatsApp />

      {/* Look Modal */}
      <LookModal look={activeLook} onClose={() => setActiveLook(null)} />
    </div>
  );
}
