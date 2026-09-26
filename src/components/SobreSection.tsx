import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SITE_IMAGES, getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

export const SobreSection: React.FC = () => {
  return (
    <div className="w-full py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        {/* Left Column: Image with refined frame */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative max-w-md mx-auto lg:max-w-none">
            {/* Background offset card */}
            <div className="absolute -inset-2 sm:-inset-3 bg-[#EFE4D5] -rotate-1 border border-[#DED2C2]/60 z-0" />

            {/* Main Image */}
            <div className="relative z-10 overflow-hidden bg-[#FBF8F2] border border-[#DED2C2] shadow-xs">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={SITE_IMAGES.sobre}
                  alt="Sobre a marca ISÉLE — Mais que roupas"
                  className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-[#FBF8F2] flex items-center justify-between border-t border-[#DED2C2]/50">
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#75685D]">
                  ISÉLE CONCEITO
                </span>
                <span className="text-[10px] font-serif italic text-[#30231C]">
                  São Paulo • Brasil
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Text and Brand Essence */}
        <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#75685D] font-medium">
              SOBRE A ISÉLE
            </span>
            <span className="w-6 h-[1px] bg-[#DED2C2]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#30231C] tracking-tight leading-[1.12] mb-6">
            MAIS QUE ROUPAS.
          </h2>

          <p className="text-base sm:text-lg font-sans text-[#75685D] font-light leading-relaxed mb-8 max-w-xl">
            A ISÉLE nasceu para aproximar moda, personalidade e estilo. Uma seleção de peças atuais para mulheres que gostam de acompanhar tendências sem abrir mão da sua essência.
          </p>

          {/* Three subtle pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-[#DED2C2]/60 mb-8">
            <div>
              <span className="text-xs font-serif tracking-wider uppercase text-[#30231C] block mb-1">
                Curadoria Autoral
              </span>
              <p className="text-[11px] font-sans text-[#75685D] leading-snug">
                Peças escolhidas a dedo para valorizar seu guarda-roupa.
              </p>
            </div>
            <div>
              <span className="text-xs font-serif tracking-wider uppercase text-[#30231C] block mb-1">
                Caimento Impecável
              </span>
              <p className="text-[11px] font-sans text-[#75685D] leading-snug">
                Modelagens que abraçam o corpo com leveza e movimento.
              </p>
            </div>
            <div>
              <span className="text-xs font-serif tracking-wider uppercase text-[#30231C] block mb-1">
                Atendimento Próximo
              </span>
              <p className="text-[11px] font-sans text-[#75685D] leading-snug">
                Conversa direta via WhatsApp para tirar qualquer dúvida.
              </p>
            </div>
          </div>

          <div>
            <SpecularButton
              href={getWhatsAppLink('Olá! Gostaria de conversar com a equipe da ISÉLE para conhecer mais sobre a marca.')}
              target="_blank"
              rel="noopener noreferrer"
              size="custom"
              radius={4}
              baseColor="#4A3B32"
              lineColor="#FFFFFF"
              intensity={1.2}
              textColor="#FFFFFF"
              className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#30231C] text-[#FFFFFF] text-xs font-sans tracking-[0.18em] uppercase hover:bg-[#8C2D2D] transition-colors"
            >
              <span>FALAR COM NOSSA EQUIPE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </SpecularButton>
          </div>
        </div>
      </div>
    </div>
  );
};
