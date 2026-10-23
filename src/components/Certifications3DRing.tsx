"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLenisScroll } from "./SmoothScrollProvider";
import { CERTIFICATION_ITEMS_3D } from "@/data/portfolio3d";

export function Certifications3DRing() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useLenisScroll();
  const [scrollAngle, setScrollAngle] = useState(0);
  const [manualOffsetAngle, setManualOffsetAngle] = useState(0);

  const count = CERTIFICATION_ITEMS_3D.length;
  const stepDeg = 360 / count;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || 800;
    const scrollable = rect.height - winH;
    if (scrollable <= 0) return;

    const raw = -rect.top / scrollable;
    const clamped = Math.max(0, Math.min(1, raw));
    // Full 360deg rotation across the sticky scroll track
    setScrollAngle(clamped * 360);
  }, [scrollY]);

  const totalAngle = scrollAngle + manualOffsetAngle;

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative"
      style={{ height: "340svh" }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden tech-grid-bg select-none flex flex-col justify-between py-20 md:py-24">
        {/* Top Editorial Header */}
        <div className="container-x relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pointer-events-none">
          <div>
            <p className="eyebrow text-accent-ink mb-2">
              05 • Développement professionnel (B1.6)
            </p>
            <h2 className="text-[clamp(2.4rem,5.2vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.04em]">
              Mes certifica
              <span className="font-serif font-normal italic text-accent">
                tions.
              </span>
            </h2>
          </div>
          <p className="max-w-sm text-xs sm:text-sm text-muted leading-relaxed">
            Scrollez pour faire tourner l&apos;anneau 3D de mes certifications et attestations (ANSSI, Cisco, CNIL, PIX, Stormshield, Proxmox).
          </p>
        </div>

        {/* Center 3D Perspective Carousel Ring */}
        <div className="relative flex-1 flex items-center justify-center [perspective:1400px] [transform-style:preserve-3d]">
          <div
            className="relative w-[290px] h-[390px] [transform-style:preserve-3d] transition-transform duration-75 ease-out"
            style={{
              transform: `translateZ(-220px) rotateY(-${totalAngle}deg)`,
            }}
          >
            {CERTIFICATION_ITEMS_3D.map((item, idx) => {
              const cardAngle = idx * stepDeg;
              return (
                <div
                  key={item.id}
                  className="absolute inset-0 [transform-style:preserve-3d]"
                  style={{
                    transform: `rotateY(${cardAngle}deg) translateZ(460px)`,
                  }}
                >
                  {/* Front Face */}
                  <div className="absolute inset-0 overflow-hidden rounded-[24px] border hairline bg-surface text-fg p-6 flex flex-col justify-between shadow-xl [backface-visibility:hidden]">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-ink">
                          {item.date}
                        </p>
                        <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent-ink font-semibold">
                          {item.code}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center gap-3">
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border hairline bg-bg font-serif italic text-lg font-bold text-accent">
                          {item.shortBadge}
                        </span>
                        <p className="text-xs leading-snug text-muted font-medium">
                          {item.issuer}
                        </p>
                      </div>

                      <h3 className="mt-5 text-[21px] font-medium leading-[1.12] tracking-[-0.03em]">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-xs leading-relaxed text-fg/70 line-clamp-4">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t hairline flex items-center justify-between">
                      <span className="rounded-full bg-accent px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-on-accent">
                        {item.status}
                      </span>
                      <span className="font-serif italic text-2xl text-fg/20">
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Back Face (Exact DA from benjamin.kenler.fr) */}
                  <div className="absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[24px] border hairline p-6 bg-bg text-fg [backface-visibility:hidden] [transform:rotateY(180deg)]">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                      Certification IT
                    </span>
                    <span className="font-serif text-[72px] italic leading-none text-fg/15">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-muted">{item.issuer}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Manual Left/Right Controls */}
          <button
            type="button"
            onClick={() => setManualOffsetAngle((a) => a - stepDeg)}
            aria-label="Carte précédente"
            className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 place-items-center rounded-full border border-fg/15 bg-bg/90 text-fg transition-colors hover:bg-accent hover:text-on-accent hover:border-transparent cursor-pointer"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setManualOffsetAngle((a) => a + stepDeg)}
            aria-label="Carte suivante"
            className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-20 grid h-11 w-11 place-items-center rounded-full border border-fg/15 bg-bg/90 text-fg transition-colors hover:bg-accent hover:text-on-accent hover:border-transparent cursor-pointer"
          >
            →
          </button>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="container-x relative z-10 flex items-center justify-between text-xs font-mono uppercase tracking-[0.16em] text-muted">
          <span>Rotation Lenis 3D : {Math.round(totalAngle % 360)}°</span>
          <span>{count} Attestations &amp; Modules validés</span>
        </div>
      </div>
    </section>
  );
}
