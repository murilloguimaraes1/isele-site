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
      <div className="w-full overflow-hidden py-3 border-y border-[#DED2C2]/50 mb-12 sm:mb-16 select-none bg-transparent">
        <div className="animate-marquee items-center gap-8 text-[11px] font-sans tracking-[0.3em] uppercase text-[#75685D]">
          {marqueeWords.concat(marqueeWords).map((word, i) => (
            <React.Fragment key={i}>
              <span className="hover:text-[#30231C] transition-colors shrink-0">{word}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8C2D2D]/60 shrink-0" />
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Central Content Box */}
      <div>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-[#30231C]/30" />
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.35em] uppercase text-[#75685D] font-medium">
              A ESSÊNCIA DA MARCA
            </span>
            <span className="w-6 h-[1px] bg-[#30231C]/30" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif text-[#30231C] tracking-tight leading-tight mb-4">
            Moda que acompanha você.
          </h2>

          <p className="text-sm sm:text-base font-sans text-[#75685D] font-light leading-relaxed">
            Uma curadoria de peças atuais, femininas e versáteis pensadas para transformar cada momento em uma expressão autêntica do seu estilo.
          </p>
        </div>

        {/* 3 Floating Interactive Pillars — Transparent Background */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isHovered = activePillar === idx;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActivePillar(idx)}
                onMouseLeave={() => setActivePillar(null)}
                className={`relative group p-7 sm:p-9 rounded-sm border transition-all duration-500 flex flex-col justify-between cursor-default bg-transparent ${
                  isHovered
                    ? 'border-[#8C2D2D]/70 -translate-y-2 shadow-lg bg-[#FBF8F2]/30 backdrop-blur-[2px]'
                    : 'border-[#DED2C2]/60 hover:border-[#8C2D2D]/40 bg-transparent'
                }`}
              >
                {/* Top Row: Number & Icon */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl sm:text-3xl font-serif text-[#75685D]/40 group-hover:text-[#8C2D2D] transition-colors font-light">
                      {pillar.number}
                    </span>

                    <div className="w-10 h-10 rounded-full border border-[#DED2C2]/80 flex items-center justify-center text-[#30231C] group-hover:border-[#8C2D2D] group-hover:text-[#8C2D2D] transition-all bg-transparent">
                      <Icon className="w-4 h-4 stroke-[1.5]" />
                    </div>
                  </div>

                  {/* Subtitle Tag */}
                  <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#75685D] block mb-1.5 font-medium">
                    {pillar.subtitle}
                  </span>

                  {/* Pillar Title */}
                  <h3 className="text-xl sm:text-2xl font-serif text-[#30231C] group-hover:text-[#8C2D2D] transition-colors mb-3">
                    {pillar.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm font-sans text-[#75685D] font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                {/* Bottom Highlight Indicator */}
                <div className="mt-8 pt-4 border-t border-[#DED2C2]/40 flex items-center justify-between text-[11px] font-sans tracking-[0.14em] uppercase text-[#75685D] group-hover:text-[#30231C] transition-colors">
                  <span>{pillar.highlight}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#8C2D2D]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action Prompt */}
      {onExploreNovidades && (
        <div className="mt-12 sm:mt-16 pt-6 flex justify-center border-t border-[#DED2C2]/50">
          <SpecularButton
            onClick={onExploreNovidades}
            size="custom"
            radius={4}
            baseColor="#30231C"
            lineColor="#30231C"
            intensity={1.2}
            textColor="#30231C"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#30231C] border border-[#30231C] text-[11px] font-sans tracking-[0.18em] uppercase hover:bg-[#EFE4D5] transition-all duration-300 shadow-xs cursor-pointer font-medium"
          >
            <span>Ver Novidades</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </SpecularButton>
        </div>
      )}
    </div>
  );
};
