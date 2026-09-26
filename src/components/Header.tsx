import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { WhatsAppIcon, InstagramIcon } from './Icons';
import { INSTAGRAM_URL, getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';

interface HeaderProps {
  currentSection: number;
  onNavigate: (sectionIndex: number) => void;
  isScrolled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentSection,
  onNavigate,
  isScrolled = false,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize or navigation
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { label: 'INÍCIO', index: 0 },
    { label: 'ESSÊNCIA', index: 1 },
    { label: 'NOVIDADES', index: 2 },
    { label: 'CONTATO', index: 3 },
  ];

  const handleNavClick = (index: number) => {
    onNavigate(index);
    setMobileMenuOpen(false);
  };

  const isTop = currentSection === 0 && !isScrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isTop
            ? 'bg-[#0D0907]/30 backdrop-blur-md text-[#FBF8F2] py-5 sm:py-6 border-b border-white/10'
            : 'bg-[#0D0907]/50 backdrop-blur-lg text-[#FBF8F2] py-3.5 sm:py-4 border-b border-white/15 shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Logo ISÉLE */}
          <button
            onClick={() => handleNavClick(0)}
            className="group text-left focus:outline-none"
            aria-label="ISÉLE — Ir para o início"
          >
            <span className="text-xl sm:text-2xl font-serif tracking-[0.3em] uppercase transition-colors block text-[#FBF8F2] group-hover:text-[#DED2C2]">
              ISÉLE
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav
            aria-label="Menu Principal"
            className="hidden md:flex items-center space-x-7 lg:space-x-9 text-xs font-sans tracking-[0.2em] uppercase"
          >
            {navItems.map((item) => {
              const isActive = currentSection === item.index;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.index)}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? 'text-[#DED2C2] font-semibold'
                      : 'text-[#FBF8F2]/80 hover:text-[#DED2C2]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#DED2C2] transition-all duration-300" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-4 lg:space-x-5">
            {/* Instagram Link */}
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 transition-colors rounded-full text-[#FBF8F2]/80 hover:text-white hover:bg-white/10"
              aria-label="Visitar Instagram da ISÉLE"
              title="Instagram @isele"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>

            {/* WhatsApp CTA Button */}
            <SpecularButton
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              size="custom"
              radius={4}
              baseColor="#30231C"
              lineColor="#30231C"
              intensity={1.2}
              textColor="#30231C"
              className="px-4 py-2 text-xs font-sans tracking-[0.16em] uppercase transition-all duration-300 bg-white/10 text-[#FBF8F2] border border-white/30 hover:bg-white/20 shadow-xs font-medium"
            >
              <span className="inline-flex items-center gap-2">
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>FALAR CONOSCO</span>
              </span>
            </SpecularButton>
          </div>

          {/* Mobile Right Controls: WhatsApp Quick Icon + Hamburger */}
          <div className="flex sm:hidden items-center space-x-2">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full transition-colors text-[#FBF8F2]/80 hover:bg-white/10"
              aria-label="WhatsApp ISÉLE"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md transition-colors text-[#FBF8F2]/80 hover:bg-white/10"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-[#0D0907]/95 backdrop-blur-2xl flex flex-col justify-between p-6 animate-fade-in text-[#FBF8F2] h-[100dvh] w-full">
          <div className="flex items-center justify-between border-b border-white/20 pb-5">
            <span className="text-xl font-serif tracking-[0.3em] uppercase text-[#FBF8F2]">
              ISÉLE
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-[#FBF8F2] hover:text-[#DED2C2]"
              aria-label="Fechar menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links list */}
          <nav className="flex flex-col space-y-6 my-auto py-6">
            {navItems.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.index)}
                className="text-left flex items-center justify-between text-lg font-serif tracking-[0.15em] uppercase hover:text-[#DED2C2] transition-colors py-1 group text-[#FBF8F2]"
              >
                <span>{item.label}</span>
                <span className="text-xs font-sans text-[#FBF8F2]/60 group-hover:text-[#DED2C2]">
                  0{idx + 1}
                </span>
              </button>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="space-y-4 pt-4 border-t border-white/20">
            <SpecularButton
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              size="custom"
              radius={4}
              baseColor="#30231C"
              lineColor="#30231C"
              intensity={1.2}
              textColor="#30231C"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-white text-[#30231C] border border-[#30231C] text-xs font-sans tracking-[0.18em] uppercase hover:bg-[#EFE4D5] transition-colors font-medium"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>Falar no WhatsApp</span>
            </SpecularButton>

            <SpecularButton
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="custom"
              radius={4}
              baseColor="#75685D"
              lineColor="#8C2D2D"
              intensity={1.1}
              textColor="#30231C"
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#EFE4D5] text-[#30231C] text-xs font-sans tracking-[0.16em] uppercase hover:bg-[#DED2C2] transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Acompanhar no Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </SpecularButton>
          </div>
        </div>
      )}
    </>
  );
};
