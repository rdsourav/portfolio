"use client";

import { motion, MotionValue, useTransform } from "framer-motion";

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: Intro (0% to 20%)
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);

  // Section 2: Middle (20% to 50%)
  const y2 = useTransform(scrollYProgress, [0.2, 0.35, 0.5], [100, 0, -100]);
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45, 0.5], [0, 1, 1, 0]);

  // Section 3: End of sequence (50% to 80%)
  const y3 = useTransform(scrollYProgress, [0.5, 0.7, 0.9], [100, 0, -100]);
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.7, 0.85, 0.9], [0, 1, 1, 0]);

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      
      {/* Section 1 */}
      <motion.div
        style={{ y: y1, opacity: opacity1 }}
        className="absolute inset-x-0 top-[40%] flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-2xl">
          SOURAV RANJAN
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-white/80 font-light tracking-wide drop-shadow-lg">
          Creative Frontend & Backend Developer.
        </p>
      </motion.div>

      {/* Section 2 */}
      <motion.div
        style={{ y: y2, opacity: opacity2 }}
        className="absolute inset-y-0 left-[10%] md:left-[20%] flex flex-col justify-center px-4 max-w-lg"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6 drop-shadow-xl leading-tight">
          I build digital <span className="text-white/50 italic">experiences.</span>
        </h2>
        <div className="w-16 h-1 bg-white/30 rounded-full mb-6" />
        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed drop-shadow-md">
          Combining high-end aesthetics with complex engineering to create unforgettable web journeys.
        </p>
      </motion.div>

      {/* Section 3 */}
      <motion.div
        style={{ y: y3, opacity: opacity3 }}
        className="absolute inset-y-0 right-[10%] md:right-[20%] flex flex-col justify-center items-end text-right px-4 max-w-lg"
      >
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-white mb-6 drop-shadow-xl leading-tight">
          Versatile <br/> Tech Stack.
        </h2>
        <div className="w-16 h-1 bg-white/30 rounded-full mb-6" />
        <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed drop-shadow-md">
          Web Tech, Node.js, Python, C/C++, Java, DSA & Blockchain.
        </p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity: opacity1 }}
        className="absolute bottom-12 inset-x-0 flex justify-center"
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-white/50">Scroll to explore</p>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </motion.div>

    </div>
  );
}
