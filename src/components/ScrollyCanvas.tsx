"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import Overlay from "./Overlay";

const FRAME_COUNT = 120;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress (0 to 1) to frame index (0 to 119)
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    const loadImages = async () => {
      for (let i = 0; i < FRAME_COUNT; i++) {
        // Pad the index with leading zeros (e.g., 000, 001, 119)
        const paddedIndex = i.toString().padStart(3, "0");
        const img = new Image();
        img.src = `/sequence/frame_${paddedIndex}_delay-0.066s.png`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === FRAME_COUNT) {
            setImagesLoaded(true);
          }
        };
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current || images.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions to match window viewport, while maintaining high DPI
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(frameIndex.get());
    };

    const renderFrame = (index: number) => {
      if (!ctx || !canvas) return;
      const safeIndex = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(index)));
      const img = images[safeIndex];

      if (!img) return;

      // Object fit cover logic for canvas
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(
        img,
        0, 0, img.width, img.height,
        centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
      );
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas(); // initial draw

    // Setup framer motion listener
    const unsubscribe = frameIndex.on("change", (latestState) => {
      renderFrame(latestState);
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      unsubscribe();
    };
  }, [imagesLoaded, images, frameIndex]);

  return (
    <div ref={containerRef} className="relative w-full h-[500vh] bg-[#121212]">
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white/50 z-20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-8 h-8 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              <p className="text-sm font-medium tracking-widest uppercase">Loading Sequence...</p>
            </div>
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Pass scroll progress to overlay for parallax text */}
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
