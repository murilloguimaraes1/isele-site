import React, { useState } from 'react';
import { ArrowDown, Sparkles, Layers, MessageSquare, ArrowUpRight } from 'lucide-react';
import { getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

interface EssenciaSectionProps {
  onExploreNovidades?: () => void;
}

export const EssenciaSection: React.FC<EssenciaSectionProps> = ({ onExploreNovidades }) => {
  const [activePillar, setActivePillar] = useState<number | null>(null);

  const pillars = [
    {
      id: 1,
      number: '01',
      title: 'Curadoria Exclusiva',
      subtitle: 'Estilo & Identidade',
      description:
        'Peças selecionadas a dedo que equilibram as principais tendências de moda com a versatilidade que valoriza o seu guarda-roupa.',
      icon: Sparkles,
      highlight: 'Design Atual',
    },
    {
      id: 2,
      number: '02',
      title: 'Qualidade & Caimento',
      subtitle: 'Toque Macio & Costura',
      description:
        'Malhas nobres, acabamentos refinados e tecidos leves com caimento impecável que proporcionam elegância com máximo conforto.',
      icon: Layers,
      highlight: 'Acabamento Preciso',
    },
    {
      id: 3,
      number: '03',
      title: 'Atendimento Direto',
      subtitle: 'Proximidade & Consultoria',
      description:
        'Sem intermediários frios: fale diretamente com a ISÉLE no WhatsApp para consultar medidas, caimento e disponibilidade de cada peça.',
      icon: MessageSquare,
      highlight: 'Canal WhatsApp',
    },
  ];

  const marqueeWords = [
    'MODA FEMININA ATUAL',
    'CURADORIA EXCLUSIVA',
    'CAIMENTO IMPECÁVEL',
    'ESTILO E ELEGANTE',
    'ELEGÂNCIA SEM ESFORÇO',
    'CONSULTORIA VIA WHATSAPP',
    'MODA QUE ACOMPANHA VOCÊ',
  ];

  return (
    <div className="w-full py-16 sm:py-24 px-4 sm:px-8 max-w-7xl mx-auto relative z-10 bg-transparent">
      {/* Infinite Editorial Scrolling Marquee Ribbon (Transparent Background) */}
      <div className="w-full overflow-hidden py-3 border-y border-white/20 mb-12 sm:mb-16 select-none bg-transparent">
        <div className="animate-marquee items-center gap-8 text-[11px] font-sans tracking-[0.3em] uppercase text-[#DED2C2]">
          {marqueeWords.concat(marqueeWords).map((word, i) => (
            <React.Fragment key={i}>
              <span className="hover:text-white transition-colors shrink-0">{word}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5A8A8] shrink-0" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Central Content Box */}
      <div>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#DED2C2]" />
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.35em] uppercase text-[#DED2C2] font-semibold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              A ESSÊNCIA DA MARCA
            </span>
            <span className="w-6 h-[1px] bg-[#DED2C2]" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] font-normal">
            Moda que acompanha você.
          </h2>

          <p className="text-sm sm:text-base font-sans text-[#FBF8F2] font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
            Uma curadoria de peças atuais, femininas e versáteis pensadas para transformar cada momento em uma expressão autêntica do seu estilo.
          </p>
        </div>

        {/* 3 Floating Interactive Pillars — 100% Transparent Off-White Floating Text Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 max-w-6xl mx-auto">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isHovered = activePillar === idx;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActivePillar(idx)}
                onMouseLeave={() => setActivePillar(null)}
                className={`relative group p-6 sm:p-7 rounded-lg border transition-all duration-500 flex flex-col justify-between cursor-default bg-transparent ${
                  isHovered
                    ? 'border-white/40 -translate-y-1.5'
                    : 'border-white/15'
                }`}
              >
                {/* Top Row: Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-2xl sm:text-3xl font-serif text-[#FBF8F2] group-hover:text-[#DED2C2] transition-colors font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                      {pillar.number}
                    </span>

                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center text-[#FBF8F2] group-hover:border-[#DED2C2] group-hover:text-[#DED2C2] transition-all bg-black/20 backdrop-blur-xs">
                      <Icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Subtitle Tag */}
                  <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#DED2C2] block mb-2 font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                    {pillar.subtitle}
                  </span>

                  {/* Pillar Title */}
                  <h3 className="text-xl sm:text-2xl font-serif text-[#FBF8F2] group-hover:text-white transition-colors mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.98)] font-normal">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm font-sans text-[#FBF8F2] font-light leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Highlight Indicator */}
                <div className="mt-8 pt-4 border-t border-white/20 flex items-center justify-between text-[11px] font-sans tracking-[0.14em] uppercase text-[#DED2C2] group-hover:text-white transition-colors drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  <span>{pillar.highlight}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#DED2C2]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Prompt */}
      {onExploreNovidades && (
        <div className="mt-12 sm:mt-16 pt-6 flex justify-center border-t border-white/15">
          <SpecularButton
            onClick={onExploreNovidades}
            size="custom"
            radius={4}
            baseColor="#FFFFFF"
            lineColor="#FFFFFF"
            intensity={1.2}
            textColor="#30231C"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#30231C] border border-white text-[11px] font-sans tracking-[0.18em] uppercase hover:bg-[#F4EBDD] transition-all duration-300 shadow-lg cursor-pointer font-medium"
          >
            <span>Ver Novidades</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </SpecularButton>
        </div>
      )}
    </div>
  );
};
