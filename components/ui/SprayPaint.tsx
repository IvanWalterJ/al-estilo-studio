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
    // Respect reduced motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(true);
      onComplete?.();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = src;

    img.onload = () => {
      // Draw logo to offscreen canvas to extract alpha mask
      const offscreen = document.createElement("canvas");
      offscreen.width = width;
      offscreen.height = height;
      const offCtx = offscreen.getContext("2d")!;
      offCtx.drawImage(img, 0, 0, width, height);
      const maskData = offCtx.getImageData(0, 0, width, height);

      // Collect all valid pixels (where logo is opaque)
      const validPixels: [number, number][] = [];
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          if (maskData.data[idx + 3] > 40) {
            validPixels.push([x, y]);
          }
        }
      }

      // Shuffle pixels for random spray effect
      for (let i = validPixels.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [validPixels[i], validPixels[j]] = [validPixels[j], validPixels[i]];
      }

      const totalPixels = validPixels.length;
      const duration = 2200; // ms
      const fps = 60;
      const totalFrames = Math.floor((duration / 1000) * fps);
      const pixelsPerFrame = Math.ceil(totalPixels / totalFrames);

      let frame = 0;
      let pixelIndex = 0;
      let rafId: number;

      // Fill canvas with dark background first
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);

      function drawFrame() {
        const batch = Math.min(pixelsPerFrame * 3, totalPixels - pixelIndex);

        for (let i = 0; i < batch; i++) {
          const [px, py] = validPixels[pixelIndex + i];
          const originalIdx = (py * width + px) * 4;
          const r = maskData.data[originalIdx];
          const g = maskData.data[originalIdx + 1];
          const b = maskData.data[originalIdx + 2];
          const a = maskData.data[originalIdx + 3] / 255;

          // Mix original color with pink spray
          const pinkMix = Math.random() * 0.4;
          const fr = Math.round(r * (1 - pinkMix) + 247 * pinkMix);
          const fg = Math.round(g * (1 - pinkMix) + 37 * pinkMix);
          const fb = Math.round(b * (1 - pinkMix) + 133 * pinkMix);

          // Add small random offset for spray scatter
          const ox = (Math.random() - 0.5) * 2;
          const oy = (Math.random() - 0.5) * 2;

          ctx!.globalAlpha = a * (0.7 + Math.random() * 0.3);
          ctx!.fillStyle = `rgb(${fr},${fg},${fb})`;
          ctx!.beginPath();
          ctx!.arc(px + ox, py + oy, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
          ctx!.fill();
        }

        pixelIndex += batch;
        frame++;

        if (pixelIndex < totalPixels) {
          rafId = requestAnimationFrame(drawFrame);
        } else {
          ctx!.globalAlpha = 1;
          setTimeout(() => {
            setDone(true);
            onComplete?.();
          }, 300);
        }
      }

      rafId = requestAnimationFrame(drawFrame);

      return () => cancelAnimationFrame(rafId);
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
