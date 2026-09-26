/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
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

  // References for each section
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

  // Track active section via IntersectionObserver with natural scroll margins
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

  // Track scroll position for Header background switch
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPos > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#F4EBDD] text-[#30231C] font-sans antialiased selection:bg-[#8C2D2D]/20 selection:text-[#30231C]">
      {/* Fixed Header */}
      <Header
        currentSection={currentSection}
        onNavigate={goToSection}
        isScrolled={isScrolled}
      />

      {/* Floating Section Pagination on Desktop */}
      <SectionPagination
        currentSection={currentSection}
        totalSections={TOTAL_SECTIONS}
        onSelectSection={goToSection}
        sectionNames={SECTION_NAMES}
      />

      {/* Main Content Sections — Natural Continuous Flow */}
      <main className="w-full">
        {/* ========================================================
            SEÇÃO 01 — HERO (Apresentação ISÉLE)
            ======================================================== */}
        <section
          id="inicio"
          ref={sectionRefs[0]}
          aria-label="Seção 1: Início ISÉLE"
          className="w-full scroll-mt-0"
        >
          <Hero onExplore={() => goToSection(1)} />
        </section>

        {/* ========================================================
            SEÇÃO 02 — ESSÊNCIA (A Essência ISÉLE)
            ======================================================== */}
        <section
          id="essencia"
          ref={sectionRefs[1]}
          aria-label="Seção 2: Essência ISÉLE"
          className="w-full bg-transparent relative scroll-mt-20"
        >
          <EssenciaSection onExploreNovidades={() => goToSection(2)} />
        </section>

        {/* ========================================================
            SEÇÃO 03 — NOVIDADES (Novos Looks)
            ======================================================== */}
        <section
          id="novidades"
          ref={sectionRefs[2]}
          aria-label="Seção 3: Novos Looks"
          className="w-full bg-[#F4EBDD] relative scroll-mt-20"
        >
          <NovidadesSection onSelectLook={(look) => setActiveLook(look)} />
        </section>

        {/* ========================================================
            SEÇÃO 04 — WHATSAPP (Gostou de algum look? Fale com a ISÉLE)
            ======================================================== */}
        <section
          id="contato"
          ref={sectionRefs[3]}
          aria-label="Seção 4: Contato WhatsApp"
          className="w-full scroll-mt-20"
        >
          <WhatsAppSection />
        </section>
      </main>

      {/* Minimalist Footer */}
      <Footer onNavigate={goToSection} />

      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Look Inspection Modal */}
      <LookModal look={activeLook} onClose={() => setActiveLook(null)} />
    </div>
  );
}
