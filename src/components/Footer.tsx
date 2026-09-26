import React from 'react';
import { WhatsAppIcon, InstagramIcon } from './Icons';
import { INSTAGRAM_URL, getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

interface FooterProps {
  onNavigate: (sectionIndex: number) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full text-[#FBF8F2] pt-16 pb-12 px-6 sm:px-8 border-t border-white/15">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Logo ISÉLE */}
        <button
          onClick={() => onNavigate(0)}
          className="text-2xl sm:text-3xl font-serif tracking-[0.3em] uppercase text-white hover:text-[#DED2C2] transition-colors mb-3 focus:outline-none drop-shadow-md"
        >
          ISÉLE
        </button>

        {/* Brand Phrase */}
        <p className="text-sm font-sans text-[#EFE4D5]/80 font-light max-w-md mb-8">
          Moda feminina para vestir o seu momento.
        </p>

        {/* Minimal Navigation Links */}
        <nav
          aria-label="Links do Rodapé"
          className="flex flex-wrap justify-center items-center gap-x-6 sm:gap-x-9 gap-y-3 text-xs font-sans tracking-[0.18em] uppercase text-[#FBF8F2]/90 mb-8"
        >
          <button
            onClick={() => onNavigate(0)}
            className="hover:text-[#DED2C2] transition-colors"
          >
            INÍCIO
          </button>
          <button
            onClick={() => onNavigate(1)}
            className="hover:text-[#DED2C2] transition-colors"
          >
            ESSÊNCIA
          </button>
          <button
            onClick={() => onNavigate(2)}
            className="hover:text-[#DED2C2] transition-colors"
          >
            NOVIDADES
          </button>
          <button
            onClick={() => onNavigate(3)}
            className="hover:text-[#DED2C2] transition-colors"
          >
            CONTATO
          </button>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#DED2C2] transition-colors"
          >
            INSTAGRAM
          </a>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#DED2C2] transition-colors"
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
            baseColor="#FBF8F2"
            lineColor="#FFFFFF"
            intensity={1.1}
            textColor="#FFFFFF"
            className="w-9 h-9 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#30231C] transition-colors shadow-xs"
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
            baseColor="#FBF8F2"
            lineColor="#FFFFFF"
            intensity={1.1}
            textColor="#FFFFFF"
            className="w-9 h-9 rounded-full bg-white/10 border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#30231C] transition-colors shadow-xs"
            aria-label="WhatsApp da ISÉLE"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </SpecularButton>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-white/15 w-full max-w-xl text-[11px] font-sans text-[#DED2C2]/70 tracking-wider">
          © 2026 ISÉLE. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};
