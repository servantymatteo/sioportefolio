"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLenisScroll } from "./SmoothScrollProvider";

/**
 * 1. PRELOADER INTRO (Style benjamin.kenler.fr : SVG Signature + Giant 000% Counter + Clip-Path Curtain)
 */
export function EditorialPreloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1350; // Fast & snappy editorial loader

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setCount(pct);
      if (elapsed < duration) {
        requestAnimationFrame(step);
      } else {
        setCount(100);
        setTimeout(() => setDone(true), 180);
        setTimeout(() => setHidden(true), 950);
      }
    };

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-bg text-fg transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{
        clipPath: done ? "inset(0 0 100% 0)" : "inset(0 0 0% 0)",
      }}
      aria-label="Chargement"
      role="status"
    >
      {/* Center SVG Signature Stroke */}
      <div className="container-x flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6 select-none">
          <span
            className="font-serif italic text-[clamp(3.2rem,9vw,8.5rem)] leading-none tracking-[-0.03em] transition-all duration-500"
            style={{
              opacity: Math.min(1, count / 45),
              transform: `translateY(${Math.max(0, 24 - (count / 100) * 24)}px)`,
            }}
          >
            Mattéo
          </span>
          <span
            className="font-sans font-bold uppercase text-[clamp(3.2rem,9vw,8.5rem)] leading-none tracking-[-0.06em] transition-all duration-500"
            style={{
              opacity: Math.min(1, Math.max(0, (count - 15) / 50)),
              transform: `translateY(${Math.max(0, 28 - (count / 100) * 28)}px)`,
            }}
          >
            SERVANTY
          </span>
        </div>

        {/* Violet Accent Brush Stroke */}
        <svg
          viewBox="0 0 700 40"
          className="w-[min(78vw,560px)] h-8 mt-2 overflow-visible"
          aria-hidden="true"
        >
          <path
            d="M 20 26 C 210 8, 460 6, 680 22"
            fill="none"
            stroke="rgb(var(--accent))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="700"
            strokeDashoffset={700 - (count / 100) * 700}
            className="transition-all duration-75"
          />
        </svg>
      </div>

      {/* Bottom Right Giant Tabular Counter 000% */}
      <div className="container-x absolute inset-x-0 bottom-6 flex items-end justify-between">
        <div className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          BTS SIO • Option SISR • Infrastructure &amp; Cybersécurité
        </div>
        <p className="flex items-start font-sans font-bold leading-[0.8] tracking-[-0.06em] ml-auto">
          <span className="text-[clamp(5rem,20vw,13.5rem)] tabular-nums">
            {String(count).padStart(3, "0")}
          </span>
          <span className="ml-1 mt-[0.18em] text-[clamp(1.5rem,4.5vw,3.2rem)] text-accent">
            %
          </span>
        </p>
      </div>

      {/* Bottom Bar */}
      <div className="absolute inset-x-0 bottom-0 h-1 bg-fg/10">
        <div
          className="h-full origin-left bg-accent transition-transform duration-75"
          style={{ transform: `scaleX(${count / 100})` }}
        />
      </div>
    </div>
  );
}

/**
 * 2. FULLSCREEN STICKY INTERLUDE TRANSITION (Style benjamin.kenler.fr : dive / split / circle / lift / shutters)
 */
interface SectionInterludeProps {
  word: string;
  subtitle?: string;
  variant: "dive" | "split" | "circle" | "lift" | "shutters";
  inverted?: boolean;
}

export function SectionInterlude({
  word,
  subtitle,
  variant,
  inverted = false,
}: SectionInterludeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useLenisScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || 800;
    const totalScrollable = rect.height - winH;
    if (totalScrollable <= 0) return;

    const raw = -rect.top / totalScrollable;
    const clamped = Math.max(0, Math.min(1, raw));
    setProgress(clamped);
  }, [scrollY]);

  const baseBg = inverted ? "bg-fg text-bg" : "bg-fg text-bg";
  const revealBg = inverted ? "bg-fg" : "bg-bg";

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{ height: "165svh" }}
      aria-hidden="true"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-bg">
        {/* Base Panel with Giant Kinetic Word */}
        {variant === "split" ? (
          <>
            {/* Left Half */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center ${baseBg}`}
              style={{
                clipPath: "inset(0 50% 0 0)",
                transform: `translateX(${-progress * 55}%)`,
              }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent mb-4">
                {subtitle}
              </span>
              <div
                className="font-sans font-bold uppercase leading-none tracking-[-0.055em] whitespace-nowrap"
                style={{ fontSize: "clamp(3.2rem, 15.5vw, 22svh)" }}
              >
                {word}
              </div>
            </div>
            {/* Right Half */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center ${baseBg}`}
              style={{
                clipPath: "inset(0 0 0 50%)",
                transform: `translateX(${progress * 55}%)`,
              }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent mb-4">
                {subtitle}
              </span>
              <div
                className="font-sans font-bold uppercase leading-none tracking-[-0.055em] whitespace-nowrap"
                style={{ fontSize: "clamp(3.2rem, 15.5vw, 22svh)" }}
              >
                {word}
              </div>
            </div>
          </>
        ) : (
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center ${baseBg}`}
          >
            {subtitle && (
              <span
                className="font-mono text-[11px] uppercase tracking-[0.24em] text-accent mb-4 transition-opacity"
                style={{ opacity: Math.max(0, 1 - progress * 2) }}
              >
                {subtitle}
              </span>
            )}
            <div
              className="font-sans font-bold uppercase leading-none tracking-[-0.055em] whitespace-nowrap will-change-transform"
              style={{
                fontSize: "clamp(3rem, 14.5vw, 22svh)",
                transform:
                  variant === "dive"
                    ? `scale(${1 + Math.pow(progress, 2.2) * 5.5})`
                    : `scale(${1 + progress * 0.25})`,
                opacity:
                  variant === "dive"
                    ? Math.max(0, 1 - Math.max(0, (progress - 0.55) * 2.2))
                    : 1,
              }}
            >
              {word.split("").map((char, idx) => (
                <span
                  key={idx}
                  className="inline-block bg-gradient-to-b from-white via-stone-200 to-violet-300 bg-clip-text text-transparent"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Variant Overlays */}
        {variant === "circle" && (
          <div
            className={`absolute inset-0 ${revealBg} pointer-events-none`}
            style={{
              clipPath: `circle(${Math.pow(progress, 1.6) * 115}% at 50% 50%)`,
            }}
          />
        )}

        {variant === "lift" && (
          <div
            className="absolute inset-0 bg-fg pointer-events-none"
            style={{
              transform: `translateY(${(1 - progress) * 100}%)`,
            }}
          />
        )}

        {variant === "shutters" && (
          <div className="absolute inset-0 flex flex-col pointer-events-none">
            {[0, 1, 2, 3, 4, 5, 6].map((barIdx) => (
              <div
                key={barIdx}
                className="-my-px flex-1 bg-bg"
                style={{
                  transform: `scaleX(${Math.min(1, Math.max(0, (progress - barIdx * 0.04) * 1.45))})`,
                  transformOrigin: barIdx % 2 === 0 ? "left" : "right",
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * 3. WORD-BY-WORD SCROLL OPACITY + VIOLET MARKER REVEAL (Style benjamin.kenler.fr)
 */
interface ScrollRevealParagraphProps {
  text: string;
  highlightedPhrases?: string[];
  className?: string;
}

export function ScrollRevealParagraph({
  text,
  highlightedPhrases = [],
  className = "",
}: ScrollRevealParagraphProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollY } = useLenisScroll();
  const [revealRatio, setRevealRatio] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || 800;
    // Start revealing when top enters 88% of viewport, finish at 32%
    const start = winH * 0.88;
    const end = winH * 0.3;
    const ratio = (start - rect.top) / (start - end);
    setRevealRatio(Math.max(0, Math.min(1, ratio)));
  }, [scrollY]);

  const words = text.split(" ");

  // Check if word index is part of a highlighted phrase
  const isWordHighlighted = (wordIndex: number) => {
    for (const phrase of highlightedPhrases) {
      const phraseWords = phrase.split(" ");
      for (let i = 0; i <= words.length - phraseWords.length; i++) {
        const slice = words
          .slice(i, i + phraseWords.length)
          .join(" ")
          .replace(/[.,;:!?]/g, "");
        const cleanPhrase = phrase.replace(/[.,;:!?]/g, "");
        if (slice.toLowerCase() === cleanPhrase.toLowerCase()) {
          if (wordIndex >= i && wordIndex < i + phraseWords.length) {
            return true;
          }
        }
      }
    }
    return false;
  };

  return (
    <p ref={ref} className={className}>
      {words.map((word, idx) => {
        const wordThreshold = idx / words.length;
        const active = revealRatio >= wordThreshold;
        const highlighted = isWordHighlighted(idx);

        return (
          <React.Fragment key={idx}>
            <span
              className={`inline-block transition-all duration-300 ${
                highlighted ? "marker" : ""
              }`}
              style={{
                opacity: active ? 1 : 0.16,
                backgroundSize: highlighted
                  ? active
                    ? "100% 0.42em"
                    : "0% 0.42em"
                  : undefined,
              }}
            >
              {word}
            </span>{" "}
          </React.Fragment>
        );
      })}
    </p>
  );
}

/**
 * 4. DUAL INFINITE MARQUEE DRIVEN BY LENIS SCROLL VELOCITY
 */
interface VelocityMarqueeProps {
  topItems: string[];
  bottomKeywords: string[];
}

export function VelocityMarquee({
  topItems,
  bottomKeywords,
}: VelocityMarqueeProps) {
  const { scrollY } = useLenisScroll();
  const offset = (scrollY * 0.08) % 50;

  return (
    <div className="space-y-6 border-y hairline py-10 overflow-hidden select-none bg-bg">
      {/* Row 1: Tech Stack Pills */}
      <div className="flex overflow-hidden whitespace-nowrap">
        <div
          className="flex shrink-0 items-center gap-4 will-change-transform"
          style={{ transform: `translateX(-${offset}%)` }}
        >
          {[...topItems, ...topItems, ...topItems].map((item, i) => (
            <span
              key={i}
              className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border hairline bg-surface/60 hover:border-accent hover:bg-accent hover:text-on-accent transition-colors duration-300"
            >
              <span className="h-2 w-2 rounded-full bg-accent group-hover:bg-on-accent" />
              <span className="font-mono text-xs sm:text-sm uppercase tracking-[0.14em] font-semibold">
                {item}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Row 2: Giant Editorial Serif Italic Keywords */}
      <div className="flex overflow-hidden whitespace-nowrap" aria-hidden="true">
        <div
          className="flex shrink-0 items-center will-change-transform"
          style={{ transform: `translateX(${-50 + offset}%)` }}
        >
          {[...bottomKeywords, ...bottomKeywords, ...bottomKeywords].map(
            (kw, i) => (
              <span
                key={i}
                className="flex items-center gap-8 pr-8 font-serif text-[clamp(2rem,4.8vw,4.25rem)] italic tracking-[-0.04em] text-muted"
              >
                {kw}
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-accent" />
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
