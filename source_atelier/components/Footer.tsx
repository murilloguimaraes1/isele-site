import React from 'react';
import { WhatsAppIcon, InstagramIcon } from './Icons';
import { INSTAGRAM_URL, getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

interface FooterProps {
  onNavigate: (sectionIndex: number) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#EFE4D5] text-[#30231C] pt-16 pb-12 px-6 sm:px-8 border-t border-[#DED2C2]">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Logo ISÉLE */}
        <button
          onClick={() => onNavigate(0)}
          className="text-2xl sm:text-3xl font-serif tracking-[0.3em] uppercase text-[#30231C] hover:text-[#8C2D2D] transition-colors mb-3 focus:outline-none"
        >
          ISÉLE
        </button>

        {/* Brand Phrase */}
        <p className="text-sm font-sans text-[#75685D] font-light max-w-md mb-8">
          Moda feminina para vestir o seu momento.
        </p>

        {/* Minimal Navigation Links */}
        <nav
          aria-label="Links do Rodapé"
          className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-9 gap-y-3 text-xs font-sans tracking-[0.18em] uppercase text-[#30231C] mb-8"
        >
          <button
            onClick={() => onNavigate(0)}
            className="hover:text-[#8C2D2D] transition-colors"
          >
            INÍCIO
          </button>
          <button
            onClick={() => onNavigate(1)}
            className="hover:text-[#8C2D2D] transition-colors"
          >
            ESSÊNCIA
          </button>
          <button
            onClick={() => onNavigate(2)}
            className="hover:text-[#8C2D2D] transition-colors"
          >
            NOVIDADES
          </button>
          <button
            onClick={() => onNavigate(3)}
            className="hover:text-[#8C2D2D] transition-colors"
          >
            CONTATO
          </button>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8C2D2D] transition-colors"
          >
            INSTAGRAM
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#8C2D2D] transition-colors"
          >
            WHATSAPP
          </a>
        </nav>

        {/* Social Icons */}
        <div className="flex items-center space-x-4 mb-8">
          <SpecularButton
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="custom"
            radius={999}
            baseColor="#75685D"
            lineColor="#8C2D2D"
            intensity={1.1}
            textColor="#30231C"
            className="w-9 h-9 rounded-full bg-[#FBF8F2] border border-[#DED2C2] flex items-center justify-center text-[#30231C] hover:text-[#8C2D2D] hover:border-[#8C2D2D] transition-colors shadow-2xs"
            aria-label="Instagram da ISÉLE"
          >
            <InstagramIcon className="w-4 h-4" />
          </SpecularButton>

          <SpecularButton
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            size="custom"
            radius={999}
            baseColor="#75685D"
            lineColor="#8C2D2D"
            intensity={1.1}
            textColor="#30231C"
            className="w-9 h-9 rounded-full bg-[#FBF8F2] border border-[#DED2C2] flex items-center justify-center text-[#30231C] hover:text-[#8C2D2D] hover:border-[#8C2D2D] transition-colors shadow-2xs"
            aria-label="WhatsApp da ISÉLE"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </SpecularButton>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-[#DED2C2]/70 w-full max-w-xl text-[11px] font-sans text-[#75685D] tracking-wider">
          © 2026 ISÉLE. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
