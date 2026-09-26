import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SITE_IMAGES, getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

interface ManifestoSectionProps {
  onNextSection?: () => void;
}

export const ManifestoSection: React.FC<ManifestoSectionProps> = ({ onNextSection }) => {
  return (
    <div className="w-full py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Top Manifesto Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Typography & Concept */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#75685D] font-medium">
              ISÉLE
            </span>
            <span className="w-6 h-[1px] bg-[#DED2C2]" />
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-[#30231C] leading-[1.12] tracking-tight mb-6">
            Moda que acompanha você.
          </h2>

          <p className="text-sm sm:text-base md:text-lg font-sans text-[#75685D] font-light leading-relaxed mb-8 max-w-xl">
            Uma curadoria de peças atuais, femininas e versáteis para transformar cada momento em uma expressão do seu estilo.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#DED2C2]/60">
            <SpecularButton
              href={getWhatsAppLink('Olá! Li o manifesto da ISÉLE e gostaria de conhecer as peças da coleção.')}
              target="_blank"
              rel="noopener noreferrer"
              size="custom"
              radius={4}
              baseColor="#75685D"
              lineColor="#8C2D2D"
              intensity={1.15}
              textColor="#30231C"
              className="px-5 py-2.5 bg-transparent hover:bg-[#EFE4D5] border border-[#30231C]/30 text-xs font-sans tracking-[0.18em] uppercase text-[#30231C] hover:text-[#8C2D2D] font-medium group transition-colors"
            >
              <span className="inline-flex items-center gap-2">
                <span>Consultar disponibilidade</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </SpecularButton>

            {onNextSection && (
              <SpecularButton
                onClick={onNextSection}
                size="custom"
                radius={4}
                baseColor="#75685D"
                lineColor="#30231C"
                intensity={0.9}
                textColor="#75685D"
                className="px-4 py-2.5 bg-transparent hover:bg-[#EFE4D5]/60 text-xs font-sans tracking-[0.16em] uppercase text-[#75685D] hover:text-[#30231C] transition-colors"
              >
                Ver estilos da marca ↓
              </SpecularButton>
            )}
          </div>
        </div>

        {/* Right Column: Editorial Image Composition */}
        <div className="lg:col-span-6">
          <div className="grid grid-cols-12 gap-4 sm:gap-6 items-end">
            {/* Primary Portrait Card */}
            <div className="col-span-8 overflow-hidden bg-[#FBF8F2] shadow-xs border border-[#DED2C2]/60">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={SITE_IMAGES.manifestoMain}
                  alt="Editorial ISÉLE — Estilo e Sensibilidade"
                  className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-4 bg-[#FBF8F2] flex items-center justify-between border-t border-[#DED2C2]/40">
                <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#75685D]">
                  Curadoria Exclusiva
                </span>
                <span className="text-[10px] font-serif italic text-[#30231C]">
                  Essência ISÉLE
                </span>
              </div>
            </div>

            {/* Secondary Macro / Detail Accent */}
            <div className="col-span-4 flex flex-col gap-3">
              <div className="aspect-[3/4] overflow-hidden bg-[#FBF8F2] border border-[#DED2C2]/60 shadow-xs">
                <img
                  src={SITE_IMAGES.manifestoDetail}
                  alt="Textura e corte ISÉLE"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="p-2 sm:p-3 bg-[#EFE4D5] border border-[#DED2C2]/50 text-center">
                <p className="text-[10px] sm:text-[11px] font-serif italic text-[#30231C] leading-snug">
                  “Cortes pensados para valorizar sua confiança.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
