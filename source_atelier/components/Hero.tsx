import React from 'react';
import { ChevronDown } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative w-full pt-28 pb-16 sm:pt-36 sm:pb-24 flex flex-col items-center justify-center overflow-hidden bg-[#F4EBDD]">
      {/* Central Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-12 text-center flex flex-col items-center">
        {/* Small Tagline */}
        <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
          <span className="w-8 h-[1px] bg-[#30231C]/30" />
          <span className="text-[11px] sm:text-xs font-sans tracking-[0.35em] uppercase text-[#75685D] font-medium">
            MODA FEMININA
          </span>
          <span className="w-8 h-[1px] bg-[#30231C]/30" />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#30231C] tracking-tight leading-[1.08] max-w-3xl mb-5 sm:mb-6">
          Seu estilo começa aqui.
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg font-sans text-[#75685D] max-w-xl font-light leading-relaxed mb-8 sm:mb-10 tracking-wide">
          Moda atual para mulheres que gostam de se vestir com personalidade.
        </p>

        {/* Dual Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
          {/* Primary Button: Conheça a ISÉLE */}
          <SpecularButton
            onClick={onExplore}
            size="custom"
            radius={4}
            baseColor="#30231C"
            lineColor="#30231C"
            intensity={1.2}
            textColor="#30231C"
            className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#30231C] border border-[#30231C] text-xs font-sans tracking-[0.2em] uppercase hover:bg-[#EFE4D5] hover:shadow-md transition-all duration-300 font-medium"
          >
            CONHEÇA A ISÉLE
          </SpecularButton>

          {/* Secondary Button: Falar no WhatsApp */}
          <SpecularButton
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            size="custom"
            radius={4}
            baseColor="#30231C"
            lineColor="#30231C"
            intensity={1.1}
            textColor="#30231C"
            className="w-full sm:w-auto px-7 py-3.5 bg-transparent hover:bg-[#EFE4D5] text-[#30231C] border border-[#30231C]/40 hover:border-[#30231C] text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 font-medium"
          >
            <span className="inline-flex items-center gap-2.5">
              <WhatsAppIcon className="w-4 h-4" />
              <span>FALAR NO WHATSAPP</span>
            </span>
          </SpecularButton>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 pt-10 sm:pt-14 flex flex-col items-center">
        <button
          onClick={onExplore}
          className="group flex flex-col items-center gap-1.5 text-[#75685D] hover:text-[#30231C] transition-colors cursor-pointer focus:outline-none"
          aria-label="Rolar para descobrir mais sobre a ISÉLE"
        >
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase font-light">
            ROLE PARA DESCOBRIR
          </span>
          <ChevronDown className="w-4 h-4 stroke-[1.5] animate-bounce text-[#75685D] group-hover:text-[#30231C]" />
        </button>
      </div>
    </div>
  );
};

