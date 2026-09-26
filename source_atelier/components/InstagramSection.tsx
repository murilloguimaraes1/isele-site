import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from './Icons';
import { SITE_IMAGES, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

export const InstagramSection: React.FC = () => {
  return (
    <div className="w-full py-16 sm:py-24 px-5 sm:px-8 max-w-7xl mx-auto flex flex-col justify-center">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 mb-2">
          <InstagramIcon className="w-4 h-4 text-[#8C2D2D]" />
          <span className="text-[11px] font-sans tracking-[0.3em] uppercase text-[#75685D] font-medium">
            COMUNIDADE DIGITAL
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#30231C] tracking-tight mb-3">
          ACOMPANHE A ISÉLE
        </h2>
        <p className="text-sm sm:text-base font-sans text-[#75685D] font-light mb-2">
          Novidades, inspirações e looks que fazem parte do nosso dia a dia.
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-[#8C2D2D] hover:underline font-semibold"
        >
          {INSTAGRAM_HANDLE}
        </a>
      </div>

      {/* Grid of 6 Editorial Instagram Posts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {SITE_IMAGES.instagramFeed.map((post) => (
          <a
            key={post.id}
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden bg-[#EFE4D5] border border-[#DED2C2]/60 shadow-xs"
            aria-label={`Ver publicação ISÉLE no Instagram: ${post.caption}`}
          >
            <img
              src={post.image}
              alt={post.caption}
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
              loading="lazy"
            />

            {/* Hover overlay with Instagram Icon and Caption preview */}
            <div className="absolute inset-0 bg-[#1C1410]/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-center text-[#FBF8F2]">
              <InstagramIcon className="w-5 h-5 mb-2 text-white" />
              <p className="text-[10px] font-sans text-[#FBF8F2]/90 line-clamp-3 leading-snug">
                {post.caption}
              </p>
              <div className="mt-2 inline-flex items-center gap-1 text-[9px] font-sans tracking-widest uppercase text-white/80">
                <span>Ver no feed</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Central CTA Button */}
      <div className="text-center mt-10 sm:mt-12">
        <SpecularButton
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          size="custom"
          radius={4}
          baseColor="#4A3B32"
          lineColor="#FFFFFF"
          intensity={1.2}
          textColor="#FFFFFF"
          className="px-8 py-3.5 bg-[#30231C] text-[#FFFFFF] text-xs font-sans tracking-[0.2em] uppercase hover:bg-[#8C2D2D] transition-all duration-300 shadow-xs"
        >
          <span className="inline-flex items-center gap-2.5">
            <InstagramIcon className="w-4 h-4" />
            <span>SEGUIR NO INSTAGRAM →</span>
          </span>
        </SpecularButton>
      </div>
    </div>
  );
};
