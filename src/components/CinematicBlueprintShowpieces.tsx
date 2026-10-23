"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLenisScroll } from "./SmoothScrollProvider";

/**
 * 1. CINEMATIC PRELOADER : Giant "MS" Monogram + Violet Fiber Ignition + 000% Counter + Curtain Lift
 */
export function BlueprintPreloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1250;

    const step = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setCount(pct);
      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(100);
        setTimeout(() => setDone(true), 150);
        setTimeout(() => setHidden(true), 900);
      }
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col justify-between bg-slate-950 text-white p-6 sm:p-12 transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] select-none"
      style={{
        clipPath: done ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
      }}
    >
      {/* Top Blueprint Telemetry */}
      <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-violet-300/70">
        <span>SYS-BOOT // MATTEO.SERVANTY</span>
        <span>SISR ARCHITECTURE v2.6</span>
      </div>

      {/* Center Giant Monogram & Name Reveal */}
      <div className="my-auto flex flex-col items-center justify-center text-center">
        <div className="relative flex items-center justify-center mb-6">
          <div
            className="w-24 h-24 rounded-3xl bg-violet-600/20 border border-violet-400/50 flex items-center justify-center font-black text-4xl tracking-tighter text-violet-300 shadow-2xl shadow-violet-600/40"
            style={{
              transform: `scale(${0.85 + (count / 100) * 0.15})`,
            }}
          >
            MS
          </div>
        </div>

        <div className="overflow-hidden">
          <h1
            className="text-[clamp(2.5rem,7vw,6.5rem)] font-black tracking-[-0.05em] uppercase leading-none"
            style={{
              transform: `translateY(${Math.max(0, 40 - (count / 100) * 40)}px)`,
              opacity: Math.min(1, count / 40),
            }}
          >
            Matteo{" "}
            <span className="font-serif italic font-normal text-violet-400">
              Servanty
            </span>
          </h1>
        </div>

        {/* Animated Fiber Trace Line */}
        <div className="w-[min(75vw,480px)] h-[3px] bg-white/10 rounded-full mt-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-600 via-purple-400 to-indigo-500 origin-left"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>
      </div>

      {/* Bottom Giant Tabular Counter 000% */}
      <div className="flex items-end justify-between">
        <div className="hidden sm:block font-mono text-xs text-slate-400 space-y-1">
          <div>INITIALISATION DES INTERFACES VLAN... OK</div>
          <div className="text-violet-400">LENIS SMOOTH ENGINE... ACTIVE</div>
        </div>

        <div className="flex items-start font-sans font-black leading-[0.8] tracking-[-0.06em] ml-auto">
          <span className="text-[clamp(4.5rem,16vw,11rem)] tabular-nums text-white">
            {String(count).padStart(3, "0")}
          </span>
          <span className="ml-1 mt-[0.15em] text-[clamp(1.5rem,4vw,3rem)] text-violet-400">
            %
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. CINEMATIC STICKY PORTAL INTERLUDE (Unique "Blueprint & Réseau Vivant" transitions)
 */
interface BlueprintPortalProps {
  nodeCode: string;
  word: string;
  subtitle: string;
  variant: "zoom-through" | "split-gate" | "iris-core" | "curtain-dark";
  roundedTop?: boolean;
}

export function BlueprintPortal({
  nodeCode,
  word,
  subtitle,
  variant,
  roundedTop = false,
}: BlueprintPortalProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useLenisScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || 800;
    const total = rect.height - winH;
    if (total <= 0) return;

    const raw = -rect.top / total;
    setProgress(Math.max(0, Math.min(1, raw)));
  }, [scrollY]);

  return (
    <div
      ref={containerRef}
      className="relative select-none z-20"
      style={{ height: "155svh" }}
      aria-hidden="true"
    >
      <div
        className={`sticky top-0 h-[100svh] overflow-hidden bg-slate-950 text-white flex items-center justify-center ${
          roundedTop ? "rounded-t-[2.5rem] sm:rounded-t-[3.5rem]" : ""
        }`}
      >
        {/* Subtle Blueprint Grid in background */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(139,92,246,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.2) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Glowing Center Vertical Fiber Line */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-violet-600/0 via-violet-500 to-violet-600/0" />

        {/* VARIANT 1: SPLIT-GATE (Left & Right Blueprint Gates slide open) */}
        {variant === "split-gate" ? (
          <>
            <div
              className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center border-r border-violet-500/30"
              style={{
                clipPath: "inset(0 50% 0 0)",
                transform: `translateX(${-progress * 52}%)`,
              }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-violet-400 mb-3">
                {nodeCode} // {subtitle}
              </span>
              <div className="text-[clamp(3.2rem,14vw,19svh)] font-black uppercase tracking-[-0.05em] leading-none whitespace-nowrap">
                {word}
              </div>
            </div>
            <div
              className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center border-l border-violet-500/30"
              style={{
                clipPath: "inset(0 0 0 50%)",
                transform: `translateX(${progress * 52}%)`,
              }}
            >
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-violet-400 mb-3">
                {nodeCode} // {subtitle}
              </span>
              <div className="text-[clamp(3.2rem,14vw,19svh)] font-black uppercase tracking-[-0.05em] leading-none whitespace-nowrap text-violet-400">
                {word}
              </div>
            </div>
          </>
        ) : (
          /* VARIANT 2 / 3 / 4: CENTER KINETIC TYPOGRAPHY */
          <div
            className="relative z-10 flex flex-col items-center text-center px-4 will-change-transform"
            style={{
              transform:
                variant === "zoom-through"
                  ? `scale(${1 + Math.pow(progress, 2) * 3.8})`
                  : `scale(${0.92 + progress * 0.22})`,
              opacity:
                variant === "zoom-through"
                  ? Math.max(0, 1 - Math.max(0, (progress - 0.55) * 2.3))
                  : 1,
            }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/15 border border-violet-400/30 text-violet-300 font-mono text-xs uppercase tracking-[0.2em] mb-4">
              <span className="w-2 h-2 rounded-full bg-violet-400 animate-ping" />
              <span>
                {nodeCode} • {subtitle}
              </span>
            </div>

            <div className="text-[clamp(3rem,13.5vw,18svh)] font-black uppercase tracking-[-0.055em] leading-[0.88] bg-gradient-to-b from-white via-violet-100 to-violet-500 bg-clip-text text-transparent">
              {word}
            </div>
          </div>
        )}

        {/* Iris Circular Reveal into next Light Section */}
        {variant === "iris-core" && (
          <div
            className="absolute inset-0 bg-[#f8f9fc] pointer-events-none z-20"
            style={{
              clipPath: `circle(${Math.pow(progress, 1.65) * 115}% at 50% 50%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

/**
 * 3. WORD-BY-WORD SCROLL REVEAL + VIOLET HIGHLIGHTER (High-Impact Narrative Statement)
 */
interface KineticStatementProps {
  eyebrow: string;
  text: string;
  highlights: string[];
}

export function KineticStatement({
  eyebrow,
  text,
  highlights,
}: KineticStatementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useLenisScroll();
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || 800;
    const start = winH * 0.85;
    const end = winH * 0.25;
    const r = (start - rect.top) / (start - end);
    setRatio(Math.max(0, Math.min(1, r)));
  }, [scrollY]);

  const words = text.split(" ");

  const isHighlighted = (wordIdx: number) => {
    for (const phrase of highlights) {
      const pWords = phrase.split(" ");
      for (let i = 0; i <= words.length - pWords.length; i++) {
        const candidate = words
          .slice(i, i + pWords.length)
          .join(" ")
          .replace(/[.,;:!?]/g, "");
        const target = phrase.replace(/[.,;:!?]/g, "");
        if (candidate.toLowerCase() === target.toLowerCase()) {
          if (wordIdx >= i && wordIdx < i + pWords.length) return true;
        }
      }
    }
    return false;
  };

  return (
    <div ref={ref} className="py-10 sm:py-14">
      <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-violet-600 mb-4">
        {eyebrow}
      </div>
      <p className="text-[clamp(1.75rem,3.6vw,3.35rem)] font-bold leading-[1.12] tracking-[-0.035em] text-slate-950 max-w-5xl">
        {words.map((w, idx) => {
          const threshold = idx / words.length;
          const active = ratio >= threshold;
          const hl = isHighlighted(idx);
          return (
            <React.Fragment key={idx}>
              <span
                className={`inline-block transition-all duration-300 ${
                  hl
                    ? "px-1.5 rounded-lg bg-gradient-to-r from-violet-600/20 to-purple-500/20 text-violet-900"
                    : ""
                }`}
                style={{
                  opacity: active ? 1 : 0.16,
                  transform: active ? "translateY(0px)" : "translateY(4px)",
                }}
              >
                {w}
              </span>{" "}
            </React.Fragment>
          );
        })}
      </p>
    </div>
  );
}

/**
 * 4. LENIS VELOCITY TECH MARQUEE
 */
export function BlueprintVelocityRibbon() {
  const { scrollY } = useLenisScroll();
  const shift = (scrollY * 0.07) % 50;

  const items = [
    "PROXMOX VE 8 CLUSTER",
    "PFSENSE HA CARP",
    "CISCO IOS VLAN 802.1Q",
    "WINDOWS SERVER 2022 AD DS",
    "DEBIAN 12 HARDENING",
    "WIREGUARD VPN",
    "ZABBIX 7.0 NOC",
    "GLPI 10 ITSM",
    "PROXMOX BACKUP SERVER",
    "RECOMMANDATIONS ANSSI",
  ];

  return (
    <div className="py-6 bg-slate-950 text-white border-y border-violet-500/30 overflow-hidden select-none relative z-20">
      <div className="flex whitespace-nowrap overflow-hidden">
        <div
          className="flex shrink-0 items-center gap-8 will-change-transform"
          style={{ transform: `translateX(-${shift}%)` }}
        >
          {[...items, ...items, ...items].map((it, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 font-mono text-xs sm:text-sm font-bold tracking-[0.18em] uppercase text-violet-200"
            >
              <span className="w-2 h-2 rounded-full bg-violet-500" />
              <span>{it}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
