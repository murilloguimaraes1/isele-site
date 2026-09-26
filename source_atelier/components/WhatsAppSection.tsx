import React from 'react';
import { WhatsAppIcon } from './Icons';
import { getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

export const WhatsAppSection: React.FC = () => {
  return (
    <div className="w-full bg-[#EFE4D5] py-20 sm:py-28 px-5 sm:px-8 border-y border-[#DED2C2]">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Subtle decorative mark */}
        <div className="w-10 h-10 rounded-full bg-[#F4EBDD] border border-[#DED2C2] flex items-center justify-center mb-6 shadow-xs">
          <WhatsAppIcon className="w-5 h-5 text-[#30231C]" />
        </div>

        {/* Small Tag */}
        <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#75685D] font-medium block mb-3">
          CANAL DIRETO & CONSULTORIA
        </span>

        {/* Title */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#30231C] tracking-tight mb-5 leading-tight">
          Gostou de algum look?
        </h2>

        {/* Text */}
        <p className="text-base sm:text-lg font-sans text-[#75685D] font-light max-w-xl mb-9 leading-relaxed">
          Fale com a ISÉLE pelo WhatsApp e descubra as peças, tamanhos e novidades disponíveis.
        </p>

        {/* Big Conversion Button */}
        <SpecularButton
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          size="custom"
          radius={4}
          baseColor="#30231C"
          lineColor="#30231C"
          intensity={1.25}
          textColor="#30231C"
          className="px-10 py-4 bg-white text-[#30231C] border border-[#30231C] text-xs sm:text-sm font-sans tracking-[0.2em] uppercase hover:bg-[#EFE4D5] hover:shadow-md transition-all duration-300 shadow-md font-medium"
        >
          <span className="inline-flex items-center gap-3">
            <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>FALAR NO WHATSAPP</span>
          </span>
        </SpecularButton>

        {/* Small Subtext */}
        <p className="text-xs font-sans tracking-wider text-[#75685D] mt-5">
          Atendimento personalizado • Respondemos em horário comercial
        </p>
      </div>
    </div>
  );
};
