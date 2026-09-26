import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight, Eye, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { SITE_IMAGES, INSTAGRAM_URL, getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

export interface LookItem {
  id: string;
  title: string;
  badge: string;
  image: string;
  subtitle: string;
  category: string;
}

interface NovidadesSectionProps {
  onSelectLook?: (look: LookItem) => void;
}

export const NovidadesSection: React.FC<NovidadesSectionProps> = ({ onSelectLook }) => {
  const sectionContainerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const totalLooks = SITE_IMAGES.novidades.length;

  // Track if section is in viewport so autoplay only runs when user actually views it
  useEffect(() => {
    const container = sectionContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  const checkScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    // Approximate active card index
    const approxCardWidth = 270;
    const idx = Math.round(scrollLeft / approxCardWidth);
    setActiveIndex(Math.min(totalLooks - 1, Math.max(0, idx)));
  }, [totalLooks]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  // Smooth scroll by direction
  const handleScroll = (direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollAmount = Math.max(el.clientWidth * 0.65, 260);
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Safe horizontal-only scroll that never affects page or window vertical scroll
  const scrollToLook = useCallback((index: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>('[data-carousel-card]');
    const targetCard = cards[index];
    if (targetCard) {
      const targetCardRect = targetCard.getBoundingClientRect();
      const containerRect = el.getBoundingClientRect();
      const relativeLeft = targetCardRect.left - containerRect.left + el.scrollLeft;
      const targetScrollLeft = relativeLeft - (el.clientWidth / 2) + (targetCard.offsetWidth / 2);

      el.scrollTo({
        left: Math.max(0, targetScrollLeft),
        behavior: 'smooth',
      });
    }
  }, []);

  // Automated Smooth Gliding Carousel Animation (only when visible on screen)
  useEffect(() => {
    if (!isPlaying || isHovered || !isInView) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % totalLooks;
        scrollToLook(next);
        return next;
      });
    }, 3800);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, isInView, totalLooks, scrollToLook]);

  return (
    <div
      ref={sectionContainerRef}
      className="w-full py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center relative z-10"
    >
      {/* Header with Title and Carousel Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-[#DED2C2]/60 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C2D2D] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] uppercase text-[#75685D] font-medium">
              CURADORIA DE PEÇAS
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#30231C] tracking-tight mb-1.5">
            NOVOS LOOKS.
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[#75685D] font-light">
            Modelagens atuais e elegantes para valorizar o seu estilo.
          </p>
        </div>

        {/* Carousel Navigation Buttons & Auto-play status */}
        <div className="flex items-center gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.16em] uppercase text-[#30231C] hover:text-[#8C2D2D] font-medium group transition-colors"
          >
            <span>Instagram</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Horizontal Carousel Track — Only the Cutout Mannequins on Landing Page Beige Background */}
      <div
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
      >
        <div
          ref={carouselRef}
          className="flex flex-row items-stretch justify-start md:justify-center gap-6 sm:gap-10 md:gap-14 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 px-2"
          style={{ scrollPaddingLeft: '16px', scrollPaddingRight: '16px' }}
        >
          {SITE_IMAGES.novidades.map((look) => (
            <div
              key={look.id}
              data-carousel-card
              className="w-[230px] sm:w-[270px] md:w-[300px] shrink-0 snap-start group relative bg-transparent border-0 shadow-none transition-all duration-500 ease-out hover:-translate-y-2 flex flex-col items-center"
            >
              {/* Mannequin Silhouette — 100% Transparent Background */}
              <div
                className="relative aspect-[3/4] w-full flex items-center justify-center bg-[#F4EBDD] rounded-sm cursor-pointer"
                onClick={() => onSelectLook && onSelectLook(look)}
              >
                <img
                  src={look.image}
                  alt={`${look.title} — Manequim ISÉLE`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain filter drop-shadow-[0_12px_28px_rgba(48,35,28,0.07)] group-hover:drop-shadow-[0_18px_36px_rgba(48,35,28,0.14)] transition-all duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Subtle Hover Action on Mannequin (Floating Pill Without Square Tint) */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                  <span className="px-3.5 py-1.5 bg-[#FBF8F2]/95 backdrop-blur-xs text-[#30231C] text-[10px] font-sans tracking-[0.16em] uppercase rounded-full shadow-md border border-[#DED2C2]/60 flex items-center gap-1.5 whitespace-nowrap">
                    <Eye className="w-3 h-3" />
                    <span>Ver Detalhes</span>
                  </span>
                </div>
              </div>

              {/* Minimal Text Underneath */}
              <div className="pt-3 pb-1 text-center flex flex-col items-center w-full">
                <h3 className="text-base sm:text-lg font-serif text-[#30231C] group-hover:text-[#8C2D2D] transition-colors leading-snug">
                  {look.title}
                </h3>

                {/* Minimal WhatsApp Inquiry */}
                <SpecularButton
                  href={getWhatsAppLink(`Olá! Gostei da peça "${look.title}" no site da ISÉLE e gostaria de saber disponibilidade e tamanhos.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="custom"
                  radius={4}
                  baseColor="#75685D"
                  lineColor="#8C2D2D"
                  intensity={1.1}
                  textColor="#75685D"
                  className="inline-flex items-center gap-1.5 py-1 px-2.5 bg-transparent hover:bg-[#EFE4D5] text-[11px] font-sans tracking-[0.14em] uppercase text-[#75685D] hover:text-[#8C2D2D] transition-colors font-medium mt-1.5 border border-[#30231C]/15"
                >
                  <WhatsAppIcon className="w-3 h-3 text-[#30231C]" />
                  <span>Consultar no WhatsApp</span>
                </SpecularButton>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Bottom Link */}
      <div className="flex justify-center mt-6 sm:mt-8 pt-4">
        {/* Action Button */}
        <SpecularButton
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          size="custom"
          radius={4}
          baseColor="#30231C"
          lineColor="#30231C"
          intensity={1.2}
          textColor="#30231C"
          className="px-6 py-2.5 bg-white text-[#30231C] border border-[#30231C] text-[11px] font-sans tracking-[0.18em] uppercase hover:bg-[#EFE4D5] transition-all duration-300 shadow-xs font-medium"
        >
          <span className="inline-flex items-center gap-2.5">
            <span>VER NOVIDADES NO INSTAGRAM</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </SpecularButton>
      </div>
    </div>
  );
};


