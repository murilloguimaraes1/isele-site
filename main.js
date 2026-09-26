const TOTAL_FRAMES = 383;

const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d', { alpha: false });
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderText = document.getElementById('loader-text');

const images = new Array(TOTAL_FRAMES);
const loadedMap = new Set();

let loadedCount = 0;
let targetFrame = 0;
let currentFrame = 0;

// Set high resolution DPI canvas bounds
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.round(window.innerWidth * dpr);
  canvas.height = Math.round(window.innerHeight * dpr);
  renderFrame(Math.round(currentFrame));
}

window.addEventListener('resize', resizeCanvas);

// Find nearest loaded frame if current target frame is still loading
function getBestAvailableImage(targetIndex) {
  if (loadedMap.has(targetIndex) && images[targetIndex]?.complete) {
    return images[targetIndex];
  }
  
  // Search outward for closest loaded frame
  for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
    const prev = targetIndex - offset;
    if (prev >= 0 && loadedMap.has(prev) && images[prev]?.complete) {
      return images[prev];
    }
    const next = targetIndex + offset;
    if (next < TOTAL_FRAMES && loadedMap.has(next) && images[next]?.complete) {
      return images[next];
    }
  }
  return null;
}

// Render image on canvas with cover ratio and crisp quality
function renderFrame(index) {
  const frameIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
  const img = getBestAvailableImage(frameIdx);

  if (!img || !img.complete || img.naturalWidth === 0) return;

  const cw = canvas.width;
  const ch = canvas.height;

  ctx.clearRect(0, 0, cw, ch);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';

  const imgW = img.naturalWidth;
  const imgH = img.naturalHeight;

  // Cover aspect ratio algorithm
  const canvasRatio = cw / ch;
  const imgRatio = imgW / imgH;

  let drawW, drawH, offsetX, offsetY;

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
}

function loadSingleImage(index) {
  return new Promise((resolve) => {
    const padded = String(index + 1).padStart(4, '0');
    const primaryUrl = `public/frames/frame_${padded}.webp`;
    const fallbackUrl = `frames/frame_${padded}.webp`;

    const img = new Image();

    const handleSuccess = () => {
      images[index] = img;
      loadedMap.add(index);
      loadedCount++;

      const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
      if (loaderBar) loaderBar.style.width = `${percent}%`;
      if (loaderText) loaderText.textContent = `Carregando ${percent}%`;

      if (index === 0) renderFrame(0);
      resolve(img);
    };

    img.onload = handleSuccess;
    img.onerror = () => {
      // Try secondary path
      const img2 = new Image();
      img2.onload = () => {
        images[index] = img2;
        loadedMap.add(index);
        loadedCount++;
        const percent = Math.floor((loadedCount / TOTAL_FRAMES) * 100);
        if (loaderBar) loaderBar.style.width = `${percent}%`;
        if (loaderText) loaderText.textContent = `Carregando ${percent}%`;
        if (index === 0) renderFrame(0);
        resolve(img2);
      };
      img2.onerror = () => {
        loadedCount++;
        resolve(null);
      };
      img2.src = fallbackUrl;
    };

    img.src = primaryUrl;
  });
}

// Progressive Range/Chunk Preloading
async function startProgressivePreload() {
  // Stage 1: Load first 40 frames rapidly for instant interactivity
  const initialBatch = [];
  for (let i = 0; i < Math.min(40, TOTAL_FRAMES); i++) {
    initialBatch.push(loadSingleImage(i));
  }
  await Promise.all(initialBatch);

  // Hide loader early once initial batch is ready, so user can scroll immediately
  if (loader) loader.classList.add('hidden');

  // Stage 2: Load remaining frames in small parallel batches
  const batchSize = 25;
  for (let i = 40; i < TOTAL_FRAMES; i += batchSize) {
    const batch = [];
    for (let j = i; j < Math.min(i + batchSize, TOTAL_FRAMES); j++) {
      batch.push(loadSingleImage(j));
    }
    await Promise.all(batch);
  }
}

// Update target frame from window scroll position
function updateScroll() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
  const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 1;
  const maxScroll = scrollHeight - window.innerHeight;

  if (maxScroll <= 0) return;

  const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScroll));
  targetFrame = scrollFraction * (TOTAL_FRAMES - 1);
}

window.addEventListener('scroll', updateScroll, { passive: true });
window.addEventListener('wheel', updateScroll, { passive: true });
window.addEventListener('touchmove', updateScroll, { passive: true });

// Continuous 60FPS fluid lerp render loop
function animate() {
  const diff = targetFrame - currentFrame;
  if (Math.abs(diff) > 0.001) {
    currentFrame += diff * 0.15;
    renderFrame(Math.round(currentFrame));
  }
  requestAnimationFrame(animate);
}

// Initialize
resizeCanvas();
updateScroll();
startProgressivePreload();
requestAnimationFrame(animate);
