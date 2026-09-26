import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { SpecularButton } from './ui/SpecularButton';

interface SectionPaginationProps {
  currentSection: number;
  totalSections: number;
  onSelectSection: (index: number) => void;
  sectionNames?: string[];
}

export const SectionPagination: React.FC<SectionPaginationProps> = ({
  currentSection,
  totalSections,
  onSelectSection,
  sectionNames = [
    'Início',
    'Essência',
    'Novidades',
    'Contato',
  ],
}) => {
  return (
    <aside
      aria-label="Navegação por seções"
      className="hidden lg:flex fixed right-5 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-2 select-none"
    >
      {/* Up Button */}
      <SpecularButton
        onClick={() => onSelectSection(Math.max(0, currentSection - 1))}
        disabled={currentSection === 0}
        aria-label="Seção anterior"
        size="custom"
        radius={999}
        baseColor="#75685D"
        lineColor="#8C2D2D"
        intensity={1.1}
        textColor="#30231C"
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all bg-[#FBF8F2]/90 backdrop-blur-xs border border-[#DED2C2] text-[#30231C] ${
          currentSection === 0
            ? 'opacity-20 cursor-not-allowed'
            : 'hover:bg-[#8C2D2D] hover:text-white hover:border-[#8C2D2D] shadow-xs cursor-pointer'
        }`}
      >
        <ChevronUp className="w-3.5 h-3.5 stroke-[2]" />
      </SpecularButton>

      {/* Dots Indicator */}
      <div className="flex flex-col items-center gap-2 py-1">
        {Array.from({ length: totalSections }).map((_, idx) => {
          const isActive = currentSection === idx;
          const label = sectionNames[idx] || `Seção ${idx + 1}`;

          return (
            <button
              key={idx}
              onClick={() => onSelectSection(idx)}
              aria-label={`Ir para seção ${idx + 1}: ${label}`}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
            >
              {/* Tooltip on left */}
              <span className="absolute right-7 px-2.5 py-1 bg-[#30231C] text-[#FBF8F2] text-[10px] font-sans tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm uppercase border border-[#DED2C2]/40">
                0{idx + 1} · {label}
              </span>

              {/* Indicator Dot */}
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-2 h-6 bg-[#8C2D2D] shadow-xs'
                    : 'w-2 h-2 bg-[#DED2C2] hover:bg-[#8C2D2D]'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Down Button */}
      <SpecularButton
        onClick={() => onSelectSection(Math.min(totalSections - 1, currentSection + 1))}
        disabled={currentSection === totalSections - 1}
        aria-label="Próxima seção"
        size="custom"
        radius={999}
        baseColor="#75685D"
        lineColor="#8C2D2D"
        intensity={1.1}
        textColor="#30231C"
        className={`w-7 h-7 rounded-full flex items-center justify-center transition-all bg-[#FBF8F2]/90 backdrop-blur-xs border border-[#DED2C2] text-[#30231C] ${
          currentSection === totalSections - 1
            ? 'opacity-20 cursor-not-allowed'
            : 'hover:bg-[#8C2D2D] hover:text-white hover:border-[#8C2D2D] shadow-xs cursor-pointer'
        }`}
      >
        <ChevronDown className="w-3.5 h-3.5 stroke-[2]" />
      </SpecularButton>
    </aside>
  );
};
