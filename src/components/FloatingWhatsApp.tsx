import React, { useState } from 'react';
import { WhatsAppIcon } from './Icons';
import { getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center">
      {/* Floating Button */}
      <SpecularButton
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        size="custom"
        radius={999}
        baseColor="#25D366"
        lineColor="#FFFFFF"
        intensity={1.4}
        textColor="#FFFFFF"
        className="group relative flex items-center gap-2.5 px-4 sm:px-5 py-3 bg-[#25D366] text-white border border-white/40 rounded-full shadow-2xl hover:bg-[#1EBE5B] transition-all duration-300 focus:outline-none animate-whatsapp-attention cursor-pointer"
        aria-label="Falar com a ISÉLE no WhatsApp"
      >
        <div
          className="flex items-center gap-2.5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Pulsing indicator dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>

          {/* WhatsApp Icon */}
          <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-sm" />

          {/* Label */}
          <span className="text-xs font-sans tracking-[0.16em] uppercase font-bold text-white [text-shadow:none]">
            WhatsApp
          </span>
        </div>
      </SpecularButton>

      {/* Floating Subtle Helper Tooltip on hover */}
      {isHovered && (
        <div className="hidden sm:block absolute bottom-full right-0 mb-2.5 pointer-events-none animate-fade-in">
          <div className="bg-[#FBF8F2] text-[#30231C] text-[11px] font-sans px-3 py-1.5 border border-[#DED2C2] shadow-xl whitespace-nowrap font-medium rounded-xs">
            Atendimento direto ISÉLE
          </div>
        </div>
      )}
    </div>
  );
};
