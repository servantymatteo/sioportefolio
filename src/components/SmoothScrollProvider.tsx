"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

interface LenisContextValue {
  lenis: Lenis | null;
  scrollY: number;
  scrollProgress: number;
  velocity: number;
  scrollToSection: (targetId: string) => void;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollY: 0,
  scrollProgress: 0,
  velocity: 0,
  scrollToSection: () => {},
});

export const useLenisScroll = () => useContext(LenisContext);

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [velocity, setVelocity] = useState(0);

  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.25,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    setLenis(lenisInstance);

    lenisInstance.on("scroll", (e: Lenis) => {
      setScrollY(e.scroll);
      setScrollProgress(e.progress);
      setVelocity(e.velocity);
    });

    let rafId: number;
    function raf(time: number) {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.destroy();
    };
  }, []);

  const scrollToSection = (targetId: string) => {
    const cleanId = targetId.startsWith("#") ? targetId : `#${targetId}`;
    if (lenis) {
      lenis.scrollTo(cleanId, {
        offset: -72,
        duration: 1.4,
      });
    } else {
      const element = document.querySelector(cleanId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <LenisContext.Provider
      value={{ lenis, scrollY, scrollProgress, velocity, scrollToSection }}
    >
      {/* Top 2px Accent Progress Line (Exact DA from benjamin.kenler.fr) */}
      <div
        className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-accent pointer-events-none"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      {children}
    </LenisContext.Provider>
  );
}
