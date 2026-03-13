"use client";

import ScrollyCanvas from "@/components/ScrollyCanvas";
import Projects from "@/components/Projects";
import { useEffect } from "react";

export default function Home() {
  
  // Custom smooth scroll implementation (optional, but requested for high-end feel)
  useEffect(() => {
    // Lenis or similar could be added here later if desired.
    // We are currently relying on Next.js 14 and CSS smooth scrolling.
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="w-full bg-[#121212]">
      {/* 
        The ScrollyCanvas contains the 500vh sticky sequence.
        When finished scrolling through this section, the view 
        will naturally continue to the Projects section below.
      */}
      <ScrollyCanvas />
      
      {/* 
        The Projects component appears *after* the animation finishes.
      */}
      <Projects />
    </main>
  );
}
