import React, { useState } from 'react';
import { WhatsAppIcon } from './Icons';
import { getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

export const FloatingWhatsApp: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center">
      {/* Floating Button */}
      <SpecularButton
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        size="custom"
        radius={999}
        baseColor="#4A3B32"
        lineColor="#FFFFFF"
        intensity={1.3}
        textColor="#FFFFFF"
        className="group relative flex items-center gap-2.5 px-4 py-3 bg-[#30231C] text-[#FFFFFF] border border-[#DED2C2]/40 rounded-full shadow-lg hover:shadow-2xl hover:bg-[#8C2D2D] transition-all duration-300 focus:outline-none"
        aria-label="Falar com a ISÉLE no WhatsApp"
      >
        <div
          className="flex items-center gap-2.5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Pulsing indicator dot */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFFFFF] opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFFFFF]"></span>
          </span>

          {/* WhatsApp Icon */}
          <WhatsAppIcon className="w-4 h-4 text-white" />

          {/* Label */}
          <span className="text-xs font-sans tracking-[0.14em] uppercase font-medium">
            WhatsApp
          </span>
        </div>
      </SpecularButton>

      {/* Floating Subtle Helper Tooltip on hover */}
      {isHovered && (
        <div className="hidden sm:block absolute bottom-full right-0 mb-2 pointer-events-none animate-fade-in">
          <div className="bg-[#FBF8F2] text-[#30231C] text-[11px] font-sans px-3 py-1.5 border border-[#DED2C2] shadow-md whitespace-nowrap">
            Atendimento direto ISÉLE
          </div>
        </div>
      )}
    </div>
  );
};
