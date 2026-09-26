import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { SITE_IMAGES, getWhatsAppLink } from '../config/siteConfig';

export const EstiloSection: React.FC = () => {
  const styles = [
    {
      id: 'casual',
      title: 'CASUAL',
      subtitle: 'Leveza e conforto elegante para os momentos do dia a dia.',
      image: SITE_IMAGES.estilo.casual,
      tag: 'LINHO & ALGODÃO',
    },
    {
      id: 'contemporaneo',
      title: 'CONTEMPORÂNEO',
      subtitle: 'Linhas limpas, alfaiataria atual e cortes estruturados.',
      image: SITE_IMAGES.estilo.contemporaneo,
      tag: 'ALFAIATARIA MODERNA',
    },
    {
      id: 'feminino',
      title: 'FEMININO',
      subtitle: 'Fluidez sutil, silhuetas delicadas e caimento natural.',
      image: SITE_IMAGES.estilo.feminino,
      tag: 'VESTIDOS & SAIAS',
    },
    {
      id: 'sofisticado',
      title: 'SOFISTICADO',
      subtitle: 'Presença marcante e acabamento impecável para ocasiões especiais.',
      image: SITE_IMAGES.estilo.sofisticado,
      tag: 'NOITE & EVENTOS',
    },
  ];

  return (
    <div className="w-full py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
        <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#75685D] font-medium block mb-2">
          CURADORIA ISÉLE
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#30231C] tracking-tight mb-3">
          O SEU ESTILO, DO SEU JEITO.
        </h2>
        <p className="text-sm sm:text-base font-sans text-[#75685D] font-light">
          Peças para diferentes momentos, sempre com a essência ISÉLE.
        </p>
      </div>

      {/* 4 Large Visual Blocks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {styles.map((style) => (
          <a
            key={style.id}
            href={getWhatsAppLink(`Olá! Vi o estilo ${style.title} no site da ISÉLE e gostaria de ver as peças disponíveis.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden bg-[#FBF8F2] border border-[#DED2C2]/70 shadow-xs transition-all duration-500 hover:shadow-md hover:border-[#8C2D2D]/40"
          >
            {/* Image Container with subtle zoom */}
            <div className="relative aspect-[3/4] overflow-hidden bg-[#EFE4D5]">
              <img
                src={style.image}
                alt={`Estilo ${style.title} — ISÉLE`}
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              {/* Subtle gradient overlay at bottom for text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Tag pill at top left */}
              <div className="absolute top-3 left-3 bg-[#FBF8F2]/90 backdrop-blur-xs px-2.5 py-1 text-[9px] font-sans tracking-[0.18em] uppercase text-[#30231C]">
                {style.tag}
              </div>

              {/* Bottom text inside image */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-[#FBF8F2] transition-transform duration-300 group-hover:-translate-y-1">
                <div className="flex items-center justify-between mb-1.5">
                  <h3 className="text-xl sm:text-2xl font-serif tracking-wider uppercase text-white font-normal">
                    {style.title}
                  </h3>
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-xs font-sans text-[#FBF8F2]/80 font-light leading-snug line-clamp-2">
                  {style.subtitle}
                </p>

                {/* Animated underline */}
                <div className="w-0 group-hover:w-full h-[1.5px] bg-[#FFFFFF] transition-all duration-500 mt-2" />
              </div>
            </div>

            {/* Micro footer link */}
            <div className="p-3 bg-[#FBF8F2] flex items-center justify-between text-[11px] font-sans tracking-[0.16em] uppercase text-[#30231C] border-t border-[#DED2C2]/50 group-hover:text-[#8C2D2D] transition-colors">
              <span>Consultar Peças</span>
              <span className="text-[10px] text-[#75685D] group-hover:text-[#8C2D2D]">WhatsApp →</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
