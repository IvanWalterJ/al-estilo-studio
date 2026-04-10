"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SprayPaintProps {
  src: string;
  width: number;
  height: number;
  onComplete?: () => void;
}

export function SprayPaint({ src, width, height, onComplete }: SprayPaintProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      onComplete?.();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId = 0;
    let cancelled = false;

    const img = new window.Image();
    // Same-origin asset — no crossOrigin attribute needed.
    // Setting crossOrigin on a Next.js public-folder image taints the canvas
    // because the dev server doesn't return Access-Control-Allow-Origin headers.
    img.src = src;

    img.onload = () => {
      if (cancelled) return;

      // Extract pixel data from an offscreen canvas
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d")!;
      offCtx.drawImage(img, 0, 0, width, height);
      const maskData = offCtx.getImageData(0, 0, width, height);

      // Collect all opaque pixels
      const validPixels: [number, number][] = [];
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (maskData.data[(y * width + x) * 4 + 3] > 40) {
            validPixels.push([x, y]);
          }
        }
      }

      // Fisher-Yates shuffle for random spray order
      for (let i = validPixels.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [validPixels[i], validPixels[j]] = [validPixels[j], validPixels[i]];
      }

      const totalPixels = validPixels.length;
      const totalFrames = Math.floor((2200 / 1000) * 60); // 2.2s at 60fps
      const pixelsPerFrame = Math.ceil(totalPixels / totalFrames);
      let pixelIndex = 0;

      ctx.clearRect(0, 0, width, height);

      function drawFrame() {
        if (cancelled) return;

        const batch = Math.min(pixelsPerFrame * 3, totalPixels - pixelIndex);

        for (let i = 0; i < batch; i++) {
          const [px, py] = validPixels[pixelIndex + i];
          const base = (py * width + px) * 4;
          const r = maskData.data[base];
          const g = maskData.data[base + 1];
          const b = maskData.data[base + 2];
          const a = maskData.data[base + 3] / 255;

          const pinkMix = Math.random() * 0.4;
          const fr = Math.round(r * (1 - pinkMix) + 247 * pinkMix);
          const fg = Math.round(g * (1 - pinkMix) + 37 * pinkMix);
          const fb = Math.round(b * (1 - pinkMix) + 133 * pinkMix);

          const ox = (Math.random() - 0.5) * 2;
          const oy = (Math.random() - 0.5) * 2;

          ctx!.globalAlpha = a * (0.7 + Math.random() * 0.3);
          ctx!.fillStyle = `rgb(${fr},${fg},${fb})`;
          ctx!.beginPath();
          ctx!.arc(px + ox, py + oy, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
          ctx!.fill();
        }

        pixelIndex += batch;

        if (pixelIndex < totalPixels) {
          rafId = requestAnimationFrame(drawFrame);
        } else {
          ctx!.globalAlpha = 1;
          setTimeout(() => {
            if (!cancelled) {
              setDone(true);
              onComplete?.();
            }
          }, 300);
        }
      }

      rafId = requestAnimationFrame(drawFrame);
    };

    img.onerror = () => {
      // Fallback: skip animation if image fails to load
      if (!cancelled) {
        setDone(true);
        onComplete?.();
      }
    };

    return () => {
      cancelled = true;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [src, width, height, onComplete]);

  return (
    <motion.canvas
      ref={canvasRef}
      width={width}
      height={height}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
