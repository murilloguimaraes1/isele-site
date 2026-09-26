import React, { useEffect, useRef, useState, useCallback } from 'react';

const TOTAL_DESKTOP_FRAMES = 192;
const TOTAL_MOBILE_FRAMES = 170;
const BATCH_SIZE = 30;

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

export const GlobalVideoCanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetFrameRef = useRef<number>(0);
  const currentFrameRef = useRef<number>(0);

  const desktopImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_DESKTOP_FRAMES).fill(null));
  const mobileImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_MOBILE_FRAMES).fill(null));

  const desktopLoadedSet = useRef<Set<number>>(new Set());
  const mobileLoadedSet = useRef<Set<number>>(new Set());

  const [isMobile, setIsMobile] = useState<boolean>(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const isMobileRef = useRef<boolean>(isMobile);

  useEffect(() => {
    isMobileRef.current = isMobile;
  }, [isMobile]);

  // Handle window resize to switch between Desktop (16:9) and Mobile (9:16) video frame sets
  useEffect(() => {
    const checkMobile = () => {
      const mobileState = window.innerWidth < 768;
      if (mobileState !== isMobileRef.current) {
        setIsMobile(mobileState);
      }
    };
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getFrameUrl = (index: number, mobile: boolean) => {
    const pad = String(index + 1).padStart(4, '0');
    return mobile ? `/frames_mobile/frame_${pad}.webp` : `/frames/frame_${pad}.webp`;
  };

  const getFallbackFrameUrl = (index: number, mobile: boolean) => {
    const pad = String(index + 1).padStart(4, '0');
    return mobile ? `./frames_mobile/frame_${pad}.webp` : `./frames/frame_${pad}.webp`;
  };

  const loadFrame = useCallback((index: number, mobile: boolean): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      const arr = mobile ? mobileImagesRef.current : desktopImagesRef.current;
      const loadedSet = mobile ? mobileLoadedSet.current : desktopLoadedSet.current;

      if (arr[index] && arr[index]?.complete && arr[index]?.naturalWidth! > 0) {
        resolve(arr[index]);
        return;
      }

      const img = new Image();

      const onSuccess = (loadedImg: HTMLImageElement) => {
        arr[index] = loadedImg;
        loadedSet.add(index);
        resolve(loadedImg);
      };

      img.onload = () => onSuccess(img);
      img.onerror = () => {
        const fallbackImg = new Image();
        fallbackImg.onload = () => onSuccess(fallbackImg);
        fallbackImg.onerror = () => resolve(null);
        fallbackImg.src = getFallbackFrameUrl(index, mobile);
      };

      img.src = getFrameUrl(index, mobile);
    });
  }, []);

  // Progressive Chunk Preloading for Desktop vs Mobile
  useEffect(() => {
    let isCancelled = false;
    const mobile = isMobile;
    const total = mobile ? TOTAL_MOBILE_FRAMES : TOTAL_DESKTOP_FRAMES;

    const startPreload = async () => {
      const firstBatch = [];
      for (let i = 0; i < Math.min(30, total); i++) {
        firstBatch.push(loadFrame(i, mobile));
      }
      await Promise.all(firstBatch);

      for (let i = 30; i < total; i += BATCH_SIZE) {
        if (isCancelled) break;
        const batch = [];
        for (let j = i; j < Math.min(i + BATCH_SIZE, total); j++) {
          batch.push(loadFrame(j, mobile));
        }
        await Promise.all(batch);
      }
    };

    startPreload();

    return () => {
      isCancelled = true;
    };
  }, [isMobile, loadFrame]);

  const getNearestFrame = (targetIdx: number, mobile: boolean): HTMLImageElement | null => {
    const total = mobile ? TOTAL_MOBILE_FRAMES : TOTAL_DESKTOP_FRAMES;
    const loadedSet = mobile ? mobileLoadedSet.current : desktopLoadedSet.current;
    const arr = mobile ? mobileImagesRef.current : desktopImagesRef.current;

    if (loadedSet.has(targetIdx) && arr[targetIdx]?.complete) {
      return arr[targetIdx];
    }
    for (let offset = 1; offset < total; offset++) {
      const prev = targetIdx - offset;
      if (prev >= 0 && loadedSet.has(prev) && arr[prev]?.complete) {
        return arr[prev];
      }
      const next = targetIdx + offset;
      if (next < total && loadedSet.has(next) && arr[next]?.complete) {
        return arr[next];
      }
    }
    return null;
  };

  // Draw WebP frame onto fixed Canvas
  const drawFrameOnCanvas = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const mobile = isMobileRef.current;
    const img = getNearestFrame(frameIndex, mobile);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = Math.max(window.devicePixelRatio || 1, 2);
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

    const focalX = 0.50;
    const focalY = 0.45;

    if (canvasRatio >= imgRatio) {
      drawW = cw;
      drawH = cw / imgRatio;
      offsetX = 0;
      offsetY = (ch - drawH) * focalY;
    } else {
      drawH = ch;
      drawW = ch * imgRatio;
      offsetX = (cw - drawW) * focalX;
      offsetY = (ch - drawH) * focalY;
    }

    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
  }, []);

  // Synchronized Scroll Progress: Scroll down -> Video advances / Scroll up -> Video rewinds
  const handleScroll = useCallback(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const viewportHeight = window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight || 1;
    const totalHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight
    );
    const maxScroll = totalHeight - viewportHeight;

    if (maxScroll <= 0) return;

    const p = clamp(scrollTop / maxScroll, 0, 1);

    const total = isMobileRef.current ? TOTAL_MOBILE_FRAMES : TOTAL_DESKTOP_FRAMES;
    const targetIdx = Math.floor(p * (total - 1));
    targetFrameRef.current = targetIdx;
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleScroll, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleScroll);
      window.visualViewport.addEventListener('scroll', handleScroll);
    }
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleScroll);
        window.visualViewport.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll]);

  // 60FPS continuous animation loop
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

    return () => cancelAnimationFrame(animId);
  }, [drawFrameOnCanvas]);

  return (
    <div className="fixed inset-0 w-[100dvw] h-[100dvh] z-0 pointer-events-none overflow-hidden bg-[#0D0907]">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Subtle top edge gradient for header contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
};
