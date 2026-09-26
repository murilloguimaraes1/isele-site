import React from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative w-full min-h-[100dvh] pt-20 pb-10 sm:pt-36 sm:pb-24 flex flex-col items-center justify-center overflow-hidden bg-transparent">
      {/* Central Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-12 text-center flex flex-col items-center">
        {/* Small Tagline */}
        <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
          <span className="w-5 sm:w-8 h-[1px] bg-[#DED2C2]" />
          <span className="text-[10px] sm:text-xs font-sans tracking-[0.25em] sm:tracking-[0.35em] uppercase text-[#DED2C2] font-semibold flex items-center gap-1.5 sm:gap-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#DED2C2]" />
            ISÉLE ATELIER — MODA FEMININA
          </span>
          <span className="w-5 sm:w-8 h-[1px] bg-[#DED2C2]" />
        </div>

        {/* Main Title (H1 SEO & Animated Entrance) */}
        <h1 className="text-3xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-[1.12] sm:leading-[1.08] max-w-3xl mb-4 sm:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.98)] font-normal animate-slide-up">
          Seu estilo começa aqui.
        </h1>

        {/* Subtitle */}
        <p className="text-xs sm:text-base md:text-lg font-sans text-[#FBF8F2] max-w-lg font-light leading-relaxed mb-6 sm:mb-10 tracking-wide px-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] animate-fade-in">
          Moda atual para mulheres que gostam de se vestir com personalidade, elegância e movimento.
        </p>

        {/* Dual Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full max-w-xs sm:max-w-none sm:w-auto">
          {/* Primary Button */}
          <SpecularButton
            onClick={onExplore}
            size="custom"
            radius={4}
            baseColor="#FFFFFF"
            lineColor="#FFFFFF"
            intensity={1.3}
            textColor="#1C1410"
            className="w-full sm:w-auto px-7 py-3 sm:py-3.5 bg-white text-[#1C1410] text-[11px] sm:text-xs font-sans tracking-[0.18em] sm:tracking-[0.2em] uppercase hover:bg-[#F4EBDD] transition-all duration-300 font-bold shadow-xl [text-shadow:none] cursor-pointer"
          >
            CONHECER NOVIDADES
          </SpecularButton>

          {/* Secondary Button */}
          <SpecularButton
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            size="custom"
            radius={4}
            baseColor="#FBF8F2"
            lineColor="#FFFFFF"
            intensity={1.1}
            textColor="#FFFFFF"
            className="w-full sm:w-auto px-6 py-3 sm:py-3.5 bg-black/40 backdrop-blur-md hover:bg-white/20 text-white border border-white/40 hover:border-white text-[11px] sm:text-xs font-sans tracking-[0.16em] sm:tracking-[0.18em] uppercase transition-all duration-300 font-semibold shadow-xl [text-shadow:none]"
          >
            <span className="inline-flex items-center justify-center gap-2">
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>FALAR NO WHATSAPP</span>
            </span>
          </SpecularButton>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 pt-6 sm:pt-14 flex flex-col items-center">
        <button
          onClick={onExplore}
          className="group flex flex-col items-center gap-1.5 text-white hover:text-[#DED2C2] transition-colors cursor-pointer focus:outline-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
          aria-label="Rolar para descobrir mais sobre a ISÉLE"
        >
          <span className="text-[9px] sm:text-[10px] font-sans tracking-[0.25em] uppercase font-light">
            ROLE PARA DESCOBRIR
          </span>
          <ChevronDown className="w-4 h-4 stroke-[1.5] animate-bounce text-white group-hover:text-[#DED2C2]" />
        </button>
      </div>
    </div>
  );
};
