import React, { useEffect } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './Icons';
import { LookItem } from './NovidadesSection';
import { getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

interface LookModalProps {
  look: LookItem | null;
  onClose: () => void;
}

export const LookModal: React.FC<LookModalProps> = ({ look, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!look) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#1C1410]/70 backdrop-blur-xs animate-fade-in">
      <div
        className="relative w-full max-w-3xl bg-[#FBF8F2] border border-[#DED2C2] shadow-2xl overflow-hidden animate-slide-up flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <SpecularButton
          onClick={onClose}
          size="custom"
          radius={999}
          baseColor="#75685D"
          lineColor="#8C2D2D"
          intensity={1.1}
          textColor="#30231C"
          className="absolute top-4 right-4 z-20 w-9 h-9 text-[#30231C] bg-[#FBF8F2]/90 hover:bg-[#EFE4D5] rounded-full transition-colors border border-[#DED2C2]/60"
          aria-label="Fechar visualização de look"
        >
          <X className="w-5 h-5" />
        </SpecularButton>

        {/* Left: Look Photography */}
        <div className="md:w-1/2 aspect-[4/5] md:aspect-auto overflow-hidden bg-[#F4EBDD] flex items-center justify-center p-6 relative">
          <img
            src={look.image}
            alt={look.title}
            referrerPolicy="no-referrer"
            className="w-full h-full max-h-[460px] object-contain drop-shadow-md"
          />
          <div className="absolute top-4 left-4 bg-[#FBF8F2]/90 px-2.5 py-1 text-[9px] font-sans tracking-[0.2em] uppercase text-[#30231C] border border-[#DED2C2]/60">
            {look.badge}
          </div>
        </div>

        {/* Right: Look Details & Inquiry */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-[#FBF8F2]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#75685D]">
                {look.category}
              </span>
              <span className="w-4 h-[1px] bg-[#DED2C2]" />
              <span className="text-[10px] font-serif italic text-[#30231C]">
                Coleção Atual
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-[#30231C] mb-3">
              {look.title}
            </h3>

            <p className="text-sm font-sans text-[#75685D] leading-relaxed mb-6 font-light">
              {look.subtitle}
            </p>

            <div className="p-4 bg-[#EFE4D5]/60 border border-[#DED2C2]/60 rounded-xs mb-6">
              <span className="text-[11px] font-sans tracking-wider uppercase text-[#30231C] font-medium block mb-1">
                Disponibilidade & Medidas
              </span>
              <p className="text-xs font-sans text-[#75685D] leading-relaxed">
                Consulte tamanhos do PP ao GG, tecidos e opções de cores falando diretamente com a nossa curadoria via WhatsApp.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#DED2C2]">
            <SpecularButton
              href={getWhatsAppLink(`Olá! Gostaria de consultar a disponibilidade do look "${look.title}" da ISÉLE.`)}
              target="_blank"
              rel="noopener noreferrer"
              size="custom"
              radius={4}
              baseColor="#30231C"
              lineColor="#30231C"
              intensity={1.2}
              textColor="#30231C"
              className="w-full py-3.5 bg-white text-[#30231C] border border-[#30231C] text-xs font-sans tracking-[0.18em] uppercase hover:bg-[#EFE4D5] transition-colors font-medium shadow-xs"
            >
              <span className="inline-flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4" />
                <span>CONSULTAR NO WHATSAPP</span>
              </span>
            </SpecularButton>

            <SpecularButton
              onClick={onClose}
              size="custom"
              radius={4}
              baseColor="#75685D"
              lineColor="#30231C"
              intensity={0.9}
              textColor="#75685D"
              className="w-full py-2.5 bg-transparent hover:bg-[#EFE4D5]/60 text-xs font-sans tracking-[0.14em] uppercase text-[#75685D] hover:text-[#30231C] transition-colors border border-transparent hover:border-[#DED2C2]/50"
            >
              Voltar à página
            </SpecularButton>
          </div>
        </div>
      </div>
    </div>
  );
};
