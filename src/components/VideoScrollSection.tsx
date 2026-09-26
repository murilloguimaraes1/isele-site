import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { getWhatsAppLink } from '../config/siteConfig';
import { SpecularButton } from './ui/SpecularButton';
import { WhatsAppIcon } from './Icons';

const TOTAL_FRAMES = 192;
const BATCH_SIZE = 30;

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

export const VideoScrollSection: React.FC<{ onExplore?: () => void }> = ({ onExplore }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [progress, setProgress] = useState(0);
  const [isInitialReady, setIsInitialReady] = useState(false);

  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadedSetRef = useRef<Set<number>>(new Set());

  // Correct Vite production asset path
  const getFrameUrl = (index: number) => {
    const pad = String(index + 1).padStart(4, '0');
    return `/frames/frame_${pad}.webp`;
  };

  const getFallbackFrameUrl = (index: number) => {
    const pad = String(index + 1).padStart(4, '0');
    return `./frames/frame_${pad}.webp`;
  };

  // Load a single frame image with fallback URL support
  const loadFrame = useCallback((index: number): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      if (imagesRef.current[index] && imagesRef.current[index]?.complete && imagesRef.current[index]?.naturalWidth! > 0) {
        resolve(imagesRef.current[index]);
        return;
      }

      const img = new Image();
      
      const onSuccess = (loadedImg: HTMLImageElement) => {
        imagesRef.current[index] = loadedImg;
        loadedSetRef.current.add(index);
        resolve(loadedImg);
      };

      img.onload = () => onSuccess(img);
      img.onerror = () => {
        const fallbackImg = new Image();
        fallbackImg.onload = () => onSuccess(fallbackImg);
        fallbackImg.onerror = () => resolve(null);
        fallbackImg.src = getFallbackFrameUrl(index);
      };

      img.src = getFrameUrl(index);
    });
  }, []);

  // Progressive Chunk Preloading across all 383 frames
  useEffect(() => {
    let isCancelled = false;

    const startPreload = async () => {
      // Stage 1: First 30 frames for immediate display
      const firstBatch = [];
      for (let i = 0; i < Math.min(30, TOTAL_FRAMES); i++) {
        firstBatch.push(loadFrame(i));
      }
      await Promise.all(firstBatch);
      if (!isCancelled) setIsInitialReady(true);

      // Stage 2: Load all remaining frames in parallel batches
      for (let i = 30; i < TOTAL_FRAMES; i += BATCH_SIZE) {
        if (isCancelled) break;
        const batch = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, TOTAL_FRAMES); j++) {
          batch.push(loadFrame(j));
        }
        await Promise.all(batch);
      }
    };

    startPreload();

    return () => {
      isCancelled = true;
    };
  }, [loadFrame]);

  // Nearest frame locator to ensure zero blank or stuck frames
  const getNearestFrame = (targetIdx: number): HTMLImageElement | null => {
    if (loadedSetRef.current.has(targetIdx) && imagesRef.current[targetIdx]?.complete) {
      return imagesRef.current[targetIdx];
    }
    for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
      const prev = targetIdx - offset;
      if (prev >= 0 && loadedSetRef.current.has(prev) && imagesRef.current[prev]?.complete) {
        return imagesRef.current[prev];
      }
      const next = targetIdx + offset;
      if (next < TOTAL_FRAMES && loadedSetRef.current.has(next) && imagesRef.current[next]?.complete) {
        return imagesRef.current[next];
      }
    }
    return null;
  };

  // Draw WebP frame onto Canvas with cover aspect ratio
  const drawFrameOnCanvas = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const img = getNearestFrame(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.clientWidth || window.innerWidth;
    const displayHeight = canvas.clientHeight || window.innerHeight;

    if (canvas.width !== Math.round(displayWidth * dpr) || canvas.height !== Math.round(displayHeight * dpr)) {
      canvas.width = Math.round(displayWidth * dpr);
      canvas.height = Math.round(displayHeight * dpr);
    }

    const cw = canvas.width;
    const ch = canvas.height;

    ctx.clearRect(0, 0, cw, ch);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const imgW = img.naturalWidth;
    const imgH = img.naturalHeight;

    const canvasRatio = cw / ch;
    const imgRatio = imgW / imgH;

    let drawW: number, drawH: number, offsetX: number, offsetY: number;

    if (canvasRatio > imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
      offsetX = 0;
      offsetY = (ch - drawH) / 2;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
      offsetX = (cw - drawW) / 2;
      offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // Calculate progress formula using getBoundingClientRect()
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalDistance = rect.height - windowHeight;

    if (totalDistance <= 0) return;

    // Scrolled distance within sticky container
    const scrolled = -rect.top;
    const p = clamp(scrolled / totalDistance, 0, 1);
    
    setProgress(p);
    const targetIdx = Math.floor(p * (TOTAL_FRAMES - 1));
    targetFrameRef.current = targetIdx;
  }, []);

  // Register Scroll & Touch Event Listeners
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [handleScroll]);

  // Continuous 60FPS render loop using requestAnimationFrame
  useEffect(() => {
    let animId: number;

    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.05) {
        currentFrameRef.current += diff * 0.25;
        drawFrameOnCanvas(Math.round(currentFrameRef.current));
      } else {
        currentFrameRef.current = targetFrameRef.current;
        drawFrameOnCanvas(targetFrameRef.current);
      }
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [drawFrameOnCanvas]);

  // Draw initial frame as soon as initial batch is ready
  useEffect(() => {
    if (isInitialReady) {
      drawFrameOnCanvas(0);
    }
  }, [isInitialReady, drawFrameOnCanvas]);

  return (
    <div
      ref={containerRef}
      id="hero-scroll-container"
      className="relative w-full bg-[#0D0907]"
      style={{ height: '500vh' }}
    >
      {/* Sticky Hero Box pinned to 100dvh */}
      <div className="sticky top-0 w-full h-[100vh] h-[100dvh] overflow-hidden bg-[#0D0907] flex flex-col items-center justify-center">
        
        {/* HTML5 Canvas Element */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Dark Vignette Overlay for High Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0907]/90 via-[#0D0907]/35 to-[#0D0907]/60 z-10 pointer-events-none" />

        {/* Hero Overlay Content */}
        <div className="relative z-20 max-w-4xl mx-auto px-6 text-center flex flex-col items-center pointer-events-auto pt-16">
          <div className="inline-flex items-center gap-3 mb-4 sm:mb-6">
            <span className="w-8 h-[1px] bg-[#FBF8F2]/60" />
            <span className="text-[11px] sm:text-xs font-sans tracking-[0.35em] uppercase text-[#FBF8F2]/90 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#DED2C2]" />
              ISÉLE — MODA FEMININA
            </span>
            <span className="w-8 h-[1px] bg-[#FBF8F2]/60" />
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#FFFFFF] tracking-tight leading-[1.08] mb-5 max-w-3xl drop-shadow-xl">
            Seu estilo começa aqui.
          </h1>

          <p className="text-sm sm:text-base md:text-lg font-sans text-[#FBF8F2]/90 font-light tracking-wide max-w-xl mb-8 sm:mb-10 drop-shadow">
            Moda atual para mulheres que gostam de se vestir com personalidade, elegância e movimento.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 sm:gap-5 w-full sm:w-auto">
            <SpecularButton
              onClick={onExplore}
              size="custom"
              radius={4}
              baseColor="#FFFFFF"
              lineColor="#FFFFFF"
              intensity={1.3}
              textColor="#30231C"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#30231C] text-xs font-sans tracking-[0.2em] uppercase hover:bg-[#F4EBDD] hover:shadow-2xl transition-all duration-300 font-medium"
            >
              CONHECER NOVIDADES
            </SpecularButton>

            <SpecularButton
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              size="custom"
              radius={4}
              baseColor="#FBF8F2"
              lineColor="#FFFFFF"
              intensity={1.1}
              textColor="#FFFFFF"
              className="w-full sm:w-auto px-7 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/40 hover:border-white text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 font-medium"
            >
              <span className="inline-flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4" />
                <span>FALAR NO WHATSAPP</span>
              </span>
            </SpecularButton>
          </div>

          {/* Progress bar indicator */}
          <div className="mt-10 sm:mt-12 flex flex-col items-center gap-2">
            <div className="flex items-center gap-3 opacity-80">
              <div className="w-28 h-[2px] bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-75"
                  style={{ width: `${Math.round(progress * 100)}%` }}
                />
              </div>
              <span className="text-[10px] font-mono tracking-wider text-white/70">
                {Math.round(progress * 100)}%
              </span>
            </div>

            <button
              onClick={onExplore}
              className="group flex flex-col items-center gap-1 mt-2 text-white/70 hover:text-white transition-colors cursor-pointer focus:outline-none"
              aria-label="Rolar para ver a animação e o site"
            >
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase font-light">
                ROLE PARA ANIMAR
              </span>
              <ChevronDown className="w-4 h-4 animate-bounce text-white/80 group-hover:text-white" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
