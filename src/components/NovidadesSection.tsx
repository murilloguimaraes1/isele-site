import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight, Eye, ChevronLeft, ChevronRight, Play, Pause, Sparkles, ShoppingBag } from 'lucide-react';
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
  const [isInView, setIsInView] = useState(false);

  // States for 1st Carousel: Novos Looks (4 fotos reais)
  const [looksActiveIndex, setLooksActiveIndex] = useState(0);
  const [looksIsPlaying, setLooksIsPlaying] = useState(true);
  const [looksIsHovered, setLooksIsHovered] = useState(false);
  const [looksTouchStartX, setLooksTouchStartX] = useState<number | null>(null);

  // States for 2nd Carousel: Bolsas & Clutches (3 fotos reais)
  const [bolsasActiveIndex, setBolsasActiveIndex] = useState(0);
  const [bolsasIsPlaying, setBolsasIsPlaying] = useState(true);
  const [bolsasIsHovered, setBolsasIsHovered] = useState(false);
  const [bolsasTouchStartX, setBolsasTouchStartX] = useState<number | null>(null);

  const totalLooks = SITE_IMAGES.novidades.length;
  const totalBolsas = SITE_IMAGES.bolsas.length;

  // Track if section is in viewport
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

  // --- Handlers for 1st Carousel (Looks) ---
  const handleLooksNext = useCallback(() => {
    setLooksActiveIndex((prev) => (prev + 1) % totalLooks);
  }, [totalLooks]);

  const handleLooksPrev = useCallback(() => {
    setLooksActiveIndex((prev) => (prev - 1 + totalLooks) % totalLooks);
  }, [totalLooks]);

  useEffect(() => {
    if (!looksIsPlaying || looksIsHovered || !isInView || totalLooks === 0) return;

    const interval = setInterval(() => {
      handleLooksNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [looksIsPlaying, looksIsHovered, isInView, totalLooks, handleLooksNext]);

  const handleLooksTouchStart = (e: React.TouchEvent) => {
    setLooksIsHovered(true);
    setLooksTouchStartX(e.touches[0].clientX);
  };

  const handleLooksTouchEnd = (e: React.TouchEvent) => {
    setLooksIsHovered(false);
    if (looksTouchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = looksTouchStartX - touchEndX;
    if (diff > 40) {
      handleLooksNext();
    } else if (diff < -40) {
      handleLooksPrev();
    }
    setLooksTouchStartX(null);
  };

  // --- Handlers for 2nd Carousel (Bolsas) ---
  const handleBolsasNext = useCallback(() => {
    setBolsasActiveIndex((prev) => (prev + 1) % totalBolsas);
  }, [totalBolsas]);

  const handleBolsasPrev = useCallback(() => {
    setBolsasActiveIndex((prev) => (prev - 1 + totalBolsas) % totalBolsas);
  }, [totalBolsas]);

  useEffect(() => {
    if (!bolsasIsPlaying || bolsasIsHovered || !isInView || totalBolsas === 0) return;

    const interval = setInterval(() => {
      handleBolsasNext();
    }, 3500);

    return () => clearInterval(interval);
  }, [bolsasIsPlaying, bolsasIsHovered, isInView, totalBolsas, handleBolsasNext]);

  const handleBolsasTouchStart = (e: React.TouchEvent) => {
    setBolsasIsHovered(true);
    setBolsasTouchStartX(e.touches[0].clientX);
  };

  const handleBolsasTouchEnd = (e: React.TouchEvent) => {
    setBolsasIsHovered(false);
    if (bolsasTouchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = bolsasTouchStartX - touchEndX;
    if (diff > 40) {
      handleBolsasNext();
    } else if (diff < -40) {
      handleBolsasPrev();
    }
    setBolsasTouchStartX(null);
  };

  return (
    <div
      ref={sectionContainerRef}
      className="w-full py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center relative z-10"
    >
      {/* ===================================================================== */}
      {/* PRIMEIRO CARROSSEL — NOVOS LOOKS (4 FOTOS REAIS) */}
      {/* ===================================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-white/20 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5A8A8] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.3em] uppercase text-[#DED2C2] font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              COLEÇÃO EXCLUSIVA ISÉLE
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white tracking-tight mb-1.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            NOVOS LOOKS.
          </h2>
          <p className="text-xs sm:text-sm font-sans text-[#FBF8F2] font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Produções completas em fotos reais para inspirar o seu closet.
          </p>
        </div>

        {/* Controles de Navegação */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLooksIsPlaying(!looksIsPlaying)}
            className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 hover:border-white/50 text-white transition-all duration-300 backdrop-blur-md active:scale-95 shadow-md cursor-pointer flex items-center justify-center"
            title={looksIsPlaying ? 'Pausar carrosel automático' : 'Iniciar carrosel automático'}
            aria-label={looksIsPlaying ? 'Pausar reprodução automática de looks' : 'Iniciar reprodução automática de looks'}
          >
            {looksIsPlaying ? (
              <Pause className="w-3.5 h-3.5 text-[#E5A8A8]" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white ml-0.5" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleLooksPrev}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 hover:border-white/50 text-white transition-all duration-300 backdrop-blur-md active:scale-95 shadow-md cursor-pointer"
              aria-label="Look anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleLooksNext}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 hover:border-white/50 text-white transition-all duration-300 backdrop-blur-md active:scale-95 shadow-md cursor-pointer"
              aria-label="Próximo look"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-sans tracking-[0.16em] uppercase text-[#FBF8F2] hover:text-[#DED2C2] font-medium group transition-colors ml-2"
          >
            <span>Instagram</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#DED2C2]" />
          </a>
        </div>
      </div>

      {/* Área Principal do Carrossel de Looks */}
      <div
        className="relative w-full overflow-hidden py-4"
        onMouseEnter={() => setLooksIsHovered(true)}
        onMouseLeave={() => setLooksIsHovered(false)}
        onTouchStart={handleLooksTouchStart}
        onTouchEnd={handleLooksTouchEnd}
      >
        {/* Mobile View (<640px): 1 Card per Slide */}
        <div className="block sm:hidden w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${looksActiveIndex * 100}%)` }}
          >
            {SITE_IMAGES.novidades.map((look, idx) => (
              <div
                key={look.id}
                className="w-full shrink-0 px-1 flex flex-col items-center"
              >
                <div
                  className={`w-full max-w-[340px] group relative bg-black/50 backdrop-blur-lg border rounded-2xl p-4 flex flex-col items-center transition-all duration-500 shadow-2xl ${
                    idx === looksActiveIndex
                      ? 'border-[#DED2C2] bg-black/65 shadow-[0_0_30px_rgba(229,168,168,0.25)] ring-1 ring-[#DED2C2]/40'
                      : 'border-white/20'
                  }`}
                >
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-[9px] font-sans tracking-[0.2em] uppercase text-[#FBF8F2] rounded-full border border-white/25 font-semibold shadow-md">
                      {look.badge}
                    </span>
                  </div>

                  <div
                    className="relative aspect-[9/16] w-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 rounded-xl cursor-pointer overflow-hidden shadow-xl group-hover:border-white/40 transition-all"
                    onClick={() => onSelectLook && onSelectLook(look)}
                  >
                    <img
                      src={look.image}
                      alt={`${look.title} — ISÉLE`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <span className="px-4 py-2 bg-[#FBF8F2]/95 backdrop-blur-md text-[#30231C] text-[10px] font-sans tracking-[0.18em] uppercase rounded-full shadow-lg border border-[#DED2C2]/60 flex items-center gap-1.5 whitespace-nowrap font-semibold">
                        <Eye className="w-3.5 h-3.5 text-[#30231C]" />
                        <span>Ver Detalhes</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 text-center flex flex-col items-center w-full">
                    <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#DED2C2] mb-1 font-semibold">
                      {look.category}
                    </span>
                    <h3 className="text-lg font-serif text-white leading-snug drop-shadow-sm font-semibold">
                      {look.title}
                    </h3>
                    <p className="text-xs font-sans text-[#FBF8F2]/85 font-light mt-1.5 leading-relaxed line-clamp-3 px-1">
                      {look.subtitle}
                    </p>

                    <SpecularButton
                      href={getWhatsAppLink(`Olá! Gostei da peça "${look.title}" da ISÉLE e gostaria de saber tamanhos e disponibilidade.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="custom"
                      radius={4}
                      baseColor="#FFFFFF"
                      lineColor="#FFFFFF"
                      intensity={1.1}
                      textColor="#1C1410"
                      className="w-full py-2.5 mt-4 bg-white hover:bg-[#F4EBDD] text-[11px] font-sans tracking-[0.14em] uppercase text-[#1C1410] font-bold transition-all border border-white shadow-md flex items-center justify-center gap-2"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-[#1C1410]" />
                      <span>Consultar no WhatsApp</span>
                    </SpecularButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tablet View (640px-1024px): 2 Cards per View */}
        <div className="hidden sm:block lg:hidden w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${looksActiveIndex * 50}%)` }}
          >
            {SITE_IMAGES.novidades.map((look, idx) => (
              <div
                key={look.id}
                className="w-1/2 shrink-0 px-2 flex flex-col items-center"
              >
                <div
                  className={`w-full group relative bg-black/50 backdrop-blur-lg border rounded-2xl p-4 sm:p-5 flex flex-col items-center transition-all duration-500 shadow-2xl ${
                    idx === looksActiveIndex
                      ? 'border-[#DED2C2] bg-black/65 shadow-[0_0_35px_rgba(229,168,168,0.25)] ring-1 ring-[#DED2C2]/40'
                      : 'border-white/20'
                  }`}
                >
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-[9px] font-sans tracking-[0.2em] uppercase text-[#FBF8F2] rounded-full border border-white/25 font-semibold shadow-md">
                      {look.badge}
                    </span>
                  </div>

                  <div
                    className="relative aspect-[9/16] w-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 rounded-xl cursor-pointer overflow-hidden shadow-xl group-hover:border-white/40 transition-all"
                    onClick={() => onSelectLook && onSelectLook(look)}
                  >
                    <img
                      src={look.image}
                      alt={`${look.title} — ISÉLE`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <span className="px-4 py-2 bg-[#FBF8F2]/95 backdrop-blur-md text-[#30231C] text-[10px] font-sans tracking-[0.18em] uppercase rounded-full shadow-lg border border-[#DED2C2]/60 flex items-center gap-1.5 whitespace-nowrap font-semibold">
                        <Eye className="w-3.5 h-3.5 text-[#30231C]" />
                        <span>Ver Detalhes</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 text-center flex flex-col items-center w-full">
                    <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#DED2C2] mb-1 font-semibold">
                      {look.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-serif text-white leading-snug drop-shadow-sm font-semibold">
                      {look.title}
                    </h3>
                    <p className="text-xs font-sans text-[#FBF8F2]/85 font-light mt-1.5 leading-relaxed line-clamp-3 px-1">
                      {look.subtitle}
                    </p>

                    <SpecularButton
                      href={getWhatsAppLink(`Olá! Gostei da peça "${look.title}" da ISÉLE e gostaria de saber tamanhos e disponibilidade.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      size="custom"
                      radius={4}
                      baseColor="#FFFFFF"
                      lineColor="#FFFFFF"
                      intensity={1.1}
                      textColor="#1C1410"
                      className="w-full py-2.5 mt-4 bg-white hover:bg-[#F4EBDD] text-[11px] font-sans tracking-[0.14em] uppercase text-[#1C1410] font-bold transition-all border border-white shadow-md flex items-center justify-center gap-2"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-[#1C1410]" />
                      <span>Consultar no WhatsApp</span>
                    </SpecularButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop View (≥1024px): 3 Cards per View */}
        <div className="hidden lg:block w-full overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${(looksActiveIndex % (totalLooks - 2)) * 33.333}%)` }}
          >
            {SITE_IMAGES.novidades.map((look, idx) => {
              const isActive = idx === looksActiveIndex;
              return (
                <div
                  key={look.id}
                  className="w-1/3 shrink-0 px-3 flex flex-col items-center"
                  onClick={() => setLooksActiveIndex(idx)}
                >
                  <div
                    className={`w-full group relative bg-black/50 backdrop-blur-lg border rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out shadow-2xl h-full ${
                      isActive
                        ? 'border-[#DED2C2] bg-black/70 ring-2 ring-[#DED2C2]/50 shadow-[0_0_35px_rgba(229,168,168,0.3)] scale-[1.02]'
                        : 'border-white/15 hover:border-white/40 hover:bg-black/60 opacity-90 hover:opacity-100'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-[#E5A8A8] text-black text-[9px] font-sans tracking-[0.2em] uppercase rounded-full font-bold shadow-lg flex items-center gap-1 z-30">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>DESTAQUE ATIVO</span>
                      </div>
                    )}

                    <div className="absolute top-7 left-7 z-20">
                      <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-[9px] font-sans tracking-[0.2em] uppercase text-[#FBF8F2] rounded-full border border-white/25 font-semibold shadow-md">
                        {look.badge}
                      </span>
                    </div>

                    <div
                      className="relative aspect-[9/16] w-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl group-hover:border-white/40 transition-all mb-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onSelectLook) onSelectLook(look);
                      }}
                    >
                      <img
                        src={look.image}
                        alt={`${look.title} — ISÉLE`}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)] transition-all duration-700 ease-out ${
                          isActive ? 'scale-105' : 'group-hover:scale-105'
                        }`}
                      />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        <span className="px-4 py-2 bg-[#FBF8F2]/95 backdrop-blur-md text-[#30231C] text-[10px] font-sans tracking-[0.18em] uppercase rounded-full shadow-lg border border-[#DED2C2]/60 flex items-center gap-1.5 whitespace-nowrap font-semibold">
                          <Eye className="w-3.5 h-3.5 text-[#30231C]" />
                          <span>Ver Detalhes</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col flex-1 justify-between text-center">
                      <div>
                        <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#DED2C2] font-semibold">
                          {look.category}
                        </span>
                        <h3 className="text-lg font-serif text-white group-hover:text-[#DED2C2] transition-colors leading-snug drop-shadow-sm font-semibold mt-0.5">
                          {look.title}
                        </h3>
                        <p className="text-xs font-sans text-[#FBF8F2]/85 font-light mt-1.5 leading-relaxed line-clamp-3">
                          {look.subtitle}
                        </p>
                      </div>

                      <SpecularButton
                        href={getWhatsAppLink(`Olá! Gostei da peça "${look.title}" da ISÉLE e gostaria de saber tamanhos e disponibilidade.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="custom"
                        radius={4}
                        baseColor="#FFFFFF"
                        lineColor="#FFFFFF"
                        intensity={1.1}
                        textColor="#1C1410"
                        className="w-full py-2.5 mt-4 bg-white hover:bg-[#F4EBDD] text-[11px] font-sans tracking-[0.14em] uppercase text-[#1C1410] font-bold transition-all border border-white shadow-md flex items-center justify-center gap-2"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-[#1C1410]" />
                        <span>Consultar no WhatsApp</span>
                      </SpecularButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center justify-center gap-2.5 mt-6 sm:mt-8">
          {SITE_IMAGES.novidades.map((look, idx) => (
            <button
              key={look.id}
              onClick={() => setLooksActiveIndex(idx)}
              aria-label={`Ir para o look ${idx + 1}: ${look.title}`}
              className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                idx === looksActiveIndex
                  ? 'w-8 bg-[#DED2C2] shadow-[0_0_10px_rgba(222,210,194,0.8)]'
                  : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* SEGUNDO CARROSSEL — BOLSAS & CLUTCHES EXCLUSIVAS (FOTOS REAIS) */}
      {/* ===================================================================== */}
      <div className="mt-16 sm:mt-24 pt-12 border-t border-white/20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 pb-4 border-b border-white/20 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5A8A8] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.35em] uppercase text-[#DED2C2] font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] flex items-center gap-1.5">
                <ShoppingBag className="w-3 h-3 text-[#E5A8A8]" />
                <span>COLEÇÃO DE ACESSÓRIOS & BOLSAS</span>
              </span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-serif text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              Bolsas & Clutches Exclusivas.
            </h3>
            <p className="text-xs sm:text-sm font-sans text-[#FBF8F2] font-light mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Design atemporal e artesanal em fotos reais para arrematar a sua produção com sofisticação.
            </p>
          </div>

          {/* Controles de Navegação das Bolsas */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setBolsasIsPlaying(!bolsasIsPlaying)}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 hover:border-white/50 text-white transition-all duration-300 backdrop-blur-md active:scale-95 shadow-md cursor-pointer flex items-center justify-center"
              title={bolsasIsPlaying ? 'Pausar carrosel automático' : 'Iniciar carrosel automático'}
              aria-label={bolsasIsPlaying ? 'Pausar reprodução automática de bolsas' : 'Iniciar reprodução automática de bolsas'}
            >
              {bolsasIsPlaying ? (
                <Pause className="w-3.5 h-3.5 text-[#E5A8A8]" />
              ) : (
                <Play className="w-3.5 h-3.5 text-white ml-0.5" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleBolsasPrev}
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 hover:border-white/50 text-white transition-all duration-300 backdrop-blur-md active:scale-95 shadow-md cursor-pointer"
                aria-label="Bolsa anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleBolsasNext}
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 hover:border-white/50 text-white transition-all duration-300 backdrop-blur-md active:scale-95 shadow-md cursor-pointer"
                aria-label="Próxima bolsa"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Track Deslizante das Bolsas */}
        <div
          className="relative w-full overflow-hidden py-4"
          onMouseEnter={() => setBolsasIsHovered(true)}
          onMouseLeave={() => setBolsasIsHovered(false)}
          onTouchStart={handleBolsasTouchStart}
          onTouchEnd={handleBolsasTouchEnd}
        >
          {/* Mobile View (<640px): 1 Bolsa por Slide */}
          <div className="block sm:hidden w-full overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${bolsasActiveIndex * 100}%)` }}
            >
              {SITE_IMAGES.bolsas.map((bolsa, idx) => (
                <div
                  key={bolsa.id}
                  className="w-full shrink-0 px-1 flex flex-col items-center"
                >
                  <div
                    className={`w-full max-w-[340px] group relative bg-black/50 backdrop-blur-lg border rounded-2xl p-4 flex flex-col items-center transition-all duration-500 shadow-2xl ${
                      idx === bolsasActiveIndex
                        ? 'border-[#DED2C2] bg-black/65 shadow-[0_0_30px_rgba(229,168,168,0.25)] ring-1 ring-[#DED2C2]/40'
                        : 'border-white/20'
                    }`}
                  >
                    <div className="absolute top-6 left-6 z-20">
                      <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-[9px] font-sans tracking-[0.2em] uppercase text-[#FBF8F2] rounded-full border border-white/25 font-semibold shadow-md">
                        {bolsa.badge}
                      </span>
                    </div>

                    <div className="relative aspect-[4/5] w-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl group-hover:border-white/40 transition-all">
                      <img
                        src={bolsa.image}
                        alt={`${bolsa.title} — ISÉLE`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-all duration-700 ease-out"
                      />
                    </div>

                    <div className="pt-4 text-center flex flex-col items-center w-full">
                      <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#DED2C2] mb-1 font-semibold">
                        {bolsa.category}
                      </span>
                      <h4 className="text-lg font-serif text-white leading-snug drop-shadow-sm font-semibold">
                        {bolsa.title}
                      </h4>
                      <p className="text-xs font-sans text-[#FBF8F2]/85 font-light mt-1.5 leading-relaxed line-clamp-3 px-1">
                        {bolsa.subtitle}
                      </p>

                      <SpecularButton
                        href={getWhatsAppLink(`Olá! Gostei da "${bolsa.title}" no site da ISÉLE e gostaria de consultar disponibilidade.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="custom"
                        radius={4}
                        baseColor="#FFFFFF"
                        lineColor="#FFFFFF"
                        intensity={1.1}
                        textColor="#1C1410"
                        className="w-full py-2.5 mt-4 bg-white hover:bg-[#F4EBDD] text-[11px] font-sans tracking-[0.14em] uppercase text-[#1C1410] font-bold transition-all border border-white shadow-md flex items-center justify-center gap-2"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-[#1C1410]" />
                        <span>Consultar no WhatsApp</span>
                      </SpecularButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop & Tablet View (≥640px): Grid de 3 Bolsas com Spotlight Interativo e Deslize Lateral */}
          <div className="hidden sm:grid sm:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {SITE_IMAGES.bolsas.map((bolsa, idx) => {
              const isActive = idx === bolsasActiveIndex;
              return (
                <div
                  key={bolsa.id}
                  className="w-full flex flex-col items-center"
                  onClick={() => setBolsasActiveIndex(idx)}
                >
                  <div
                    className={`w-full group relative bg-black/50 backdrop-blur-lg border rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-500 ease-out shadow-2xl h-full ${
                      isActive
                        ? 'border-[#DED2C2] bg-black/70 ring-2 ring-[#DED2C2]/50 shadow-[0_0_35px_rgba(229,168,168,0.3)] scale-[1.02]'
                        : 'border-white/15 hover:border-white/40 hover:bg-black/60 opacity-90 hover:opacity-100'
                    }`}
                  >
                    {isActive && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3.5 py-0.5 bg-[#E5A8A8] text-black text-[9px] font-sans tracking-[0.2em] uppercase rounded-full font-bold shadow-lg flex items-center gap-1 z-30">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>ACESSÓRIO EM DESTAQUE</span>
                      </div>
                    )}

                    <div className="absolute top-7 left-7 z-20">
                      <span className="px-3 py-1 bg-black/80 backdrop-blur-md text-[9px] font-sans tracking-[0.2em] uppercase text-[#FBF8F2] rounded-full border border-white/25 font-semibold shadow-md">
                        {bolsa.badge}
                      </span>
                    </div>

                    <div className="relative aspect-[4/5] w-full flex items-center justify-center bg-black/40 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden shadow-xl group-hover:border-white/40 transition-all mb-4">
                      <img
                        src={bolsa.image}
                        alt={`${bolsa.title} — ISÉLE`}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full object-cover filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.6)] transition-all duration-700 ease-out ${
                          isActive ? 'scale-105' : 'group-hover:scale-105'
                        }`}
                      />
                    </div>

                    <div className="flex flex-col flex-1 justify-between text-center">
                      <div>
                        <span className="text-[10px] font-sans tracking-[0.22em] uppercase text-[#DED2C2] font-semibold">
                          {bolsa.category}
                        </span>
                        <h4 className="text-lg font-serif text-white group-hover:text-[#DED2C2] transition-colors leading-snug drop-shadow-sm font-semibold mt-0.5">
                          {bolsa.title}
                        </h4>
                        <p className="text-xs font-sans text-[#FBF8F2]/85 font-light mt-1.5 leading-relaxed line-clamp-3">
                          {bolsa.subtitle}
                        </p>
                      </div>

                      <SpecularButton
                        href={getWhatsAppLink(`Olá! Gostei da "${bolsa.title}" no site da ISÉLE e gostaria de consultar disponibilidade.`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="custom"
                        radius={4}
                        baseColor="#FFFFFF"
                        lineColor="#FFFFFF"
                        intensity={1.1}
                        textColor="#1C1410"
                        className="w-full py-2.5 mt-4 bg-white hover:bg-[#F4EBDD] text-[11px] font-sans tracking-[0.14em] uppercase text-[#1C1410] font-bold transition-all border border-white shadow-md flex items-center justify-center gap-2"
                      >
                        <WhatsAppIcon className="w-3.5 h-3.5 text-[#1C1410]" />
                        <span>Consultar no WhatsApp</span>
                      </SpecularButton>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dots das Bolsas */}
          <div className="flex items-center justify-center gap-2.5 mt-6 sm:mt-8">
            {SITE_IMAGES.bolsas.map((bolsa, idx) => (
              <button
                key={bolsa.id}
                onClick={() => setBolsasActiveIndex(idx)}
                aria-label={`Ir para a bolsa ${idx + 1}: ${bolsa.title}`}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === bolsasActiveIndex
                    ? 'w-8 bg-[#DED2C2] shadow-[0_0_10px_rgba(222,210,194,0.8)]'
                    : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Botão Final Instagram */}
      <div className="flex justify-center mt-10 sm:mt-12 pt-2">
        <SpecularButton
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          size="custom"
          radius={4}
          baseColor="#FFFFFF"
          lineColor="#FFFFFF"
          intensity={1.2}
          textColor="#30231C"
          className="px-7 py-3 bg-white text-[#30231C] border border-white text-[11px] font-sans tracking-[0.18em] uppercase hover:bg-[#F4EBDD] transition-all duration-300 shadow-md font-medium"
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
