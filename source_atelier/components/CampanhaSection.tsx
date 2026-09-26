import React from 'react';
import { ArrowRight } from 'lucide-react';
import { SITE_IMAGES, INSTAGRAM_URL } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

export const CampanhaSection: React.FC = () => {
  return (
    <div className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-[#1C1410]">
      {/* Background Cinematic Campaign Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={SITE_IMAGES.campanhaBanner}
          alt="Campanha Editorial ISÉLE — Vista o que faz sentido para você"
          className="w-full h-full object-cover object-center scale-102 hover:scale-105 transition-transform duration-1000 ease-out"
          loading="lazy"
        />
        {/* Editorial Vignette & Warm Tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/85 via-[#1C1410]/40 to-[#1C1410]/50" />
      </div>

      {/* Floating Center Card / Text Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
          <span className="w-8 h-[1px] bg-[#FBF8F2]/60" />
          <span className="text-[11px] font-sans tracking-[0.35em] uppercase text-[#FBF8F2]/90">
            CAMPANHA EDITORIAL
          </span>
          <span className="w-8 h-[1px] bg-[#FBF8F2]/60" />
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-[#FFFFFF] tracking-tight leading-[1.1] mb-5 max-w-2xl">
          Vista o que faz sentido para você.
        </h2>

        <p className="text-sm sm:text-base md:text-lg font-sans text-[#FBF8F2]/85 font-light tracking-wide max-w-md mb-8 sm:mb-10">
          Descubra a nova seleção ISÉLE.
        </p>

        <SpecularButton
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          size="custom"
          radius={4}
          baseColor="#DED2C2"
          lineColor="#FFFFFF"
          intensity={1.3}
          textColor="#30231C"
          className="px-8 sm:px-10 py-3.5 sm:py-4 bg-[#FFFFFF] text-[#30231C] text-xs font-sans tracking-[0.22em] uppercase hover:bg-[#F4EBDD] hover:shadow-2xl transition-all duration-300 font-medium group"
        >
          <span className="inline-flex items-center gap-3">
            <span>CONHECER NOVIDADES</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </SpecularButton>
      </div>
    </div>
  );
};
