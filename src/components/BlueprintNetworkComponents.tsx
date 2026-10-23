"use client";

import React, { useRef, useState } from "react";
import { Award, CheckCircle2, Sparkles } from "lucide-react";
import { CERTIFICATIONS_DATA } from "@/data/portfolio";
import { useLenisScroll } from "./SmoothScrollProvider";

/**
 * 1. CENTRAL LIVING NETWORK FIBER (Scroll-driven SVG pulse connecting the whole page)
 */
export function LivingNetworkSpine() {
  const { scrollProgress } = useLenisScroll();

  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-6 lg:left-1/2 lg:-translate-x-1/2 z-0 w-12 flex justify-center overflow-hidden opacity-75"
      aria-hidden="true"
    >
      {/* Background passive fiber */}
      <div className="w-[2px] h-full bg-gradient-to-b from-violet-200/40 via-violet-300/50 to-violet-200/40" />

      {/* Active glowing fiber driven by Lenis scrollProgress */}
      <div
        className="absolute top-0 w-[3px] bg-gradient-to-b from-violet-600 via-purple-500 to-indigo-600 cable-glow origin-top transition-transform duration-75"
        style={{
          height: "100%",
          transform: `scaleY(${Math.max(0.03, scrollProgress)})`,
        }}
      />

      {/* Travelling optical packet head */}
      <div
        className="absolute w-4 h-4 rounded-full bg-violet-600 ring-4 ring-violet-300/70 shadow-lg shadow-violet-600 transition-all duration-75"
        style={{
          top: `calc(${Math.min(96, Math.max(4, scrollProgress * 100))}% - 8px)`,
        }}
      />
    </div>
  );
}

/**
 * 2. SECTION NODE CONNECTOR (Lights up when the optical packet reaches the section)
 */
interface BlueprintNodeHeaderProps {
  nodeId: string;
  vlanTag: string;
  title: string;
  highlight: string;
  subtitle: string;
}

export function BlueprintNodeHeader({
  nodeId,
  vlanTag,
  title,
  highlight,
  subtitle,
}: BlueprintNodeHeaderProps) {
  return (
    <div className="relative z-10 flex flex-col items-start lg:items-center lg:text-center max-w-3xl lg:mx-auto space-y-3">
      {/* Node Connector Pill */}
      <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-violet-200 shadow-sm">
        <span className="w-2.5 h-2.5 rounded-full bg-violet-600 animate-ping" />
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-violet-700">
          {nodeId}
        </span>
        <span className="text-slate-300">|</span>
        <span className="font-mono text-[11px] text-slate-600">{vlanTag}</span>
      </div>

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950">
        {title}{" "}
        <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {highlight}
        </span>
      </h2>

      <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
        {subtitle}
      </p>
    </div>
  );
}

/**
 * 3. HERO ASYMMETRIC 3D/SVG MONOGRAM "MS" WITH ORBITAL RINGS & PARALLAX BADGES
 */
export function HeroMonogramOrbit() {
  const { scrollY } = useLenisScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 18;
    const y = (e.clientY - rect.top - rect.height / 2) / 18;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const parallaxY = scrollY * 0.14;

  const floatingBadges = [
    {
      name: "Proxmox VE 8",
      role: "Cluster & LXC/KVM",
      pos: "-top-4 left-2 sm:left-6",
      factor: 1.3,
      dot: "bg-orange-500",
    },
    {
      name: "Cisco IOS",
      role: "VLAN 802.1Q & OSPF",
      pos: "top-12 -right-2 sm:right-2",
      factor: -1.1,
      dot: "bg-sky-500",
    },
    {
      name: "pfSense HA",
      role: "CARP & WireGuard",
      pos: "bottom-16 -left-2 sm:left-0",
      factor: 0.9,
      dot: "bg-violet-600",
    },
    {
      name: "Debian 12 / AD",
      role: "Hardening ANSSI",
      pos: "-bottom-3 right-4 sm:right-8",
      factor: -1.4,
      dot: "bg-emerald-500",
    },
    {
      name: "SecNumacadémie",
      role: "Certifié ANSSI",
      pos: "top-1/2 -translate-y-1/2 -right-4 sm:-right-6",
      factor: 1.2,
      dot: "bg-purple-600",
    },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full aspect-square max-w-[490px] mx-auto flex items-center justify-center select-none"
      style={{
        transform: `translateY(-${parallaxY}px)`,
      }}
    >
      {/* Ambient Violet Glow Behind Monogram */}
      <div className="pointer-events-none absolute inset-10 rounded-full bg-gradient-to-tr from-violet-600/25 via-purple-500/20 to-indigo-400/15 blur-3xl" />

      {/* Outer Dashed Orbital Ring */}
      <div className="pointer-events-none absolute inset-4 rounded-full border border-dashed border-violet-300/90 animate-orbit-slow">
        <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-violet-600 shadow-md shadow-violet-600" />
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-purple-500" />
      </div>

      {/* Middle Technical Ring */}
      <div className="pointer-events-none absolute inset-14 rounded-full border border-violet-200/80 animate-orbit-reverse">
        <span className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-indigo-500" />
      </div>

      {/* Central 3D-Tilt Hexagonal / Blueprint Monogram "MS" */}
      <div
        className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 border-2 border-violet-400/50 shadow-2xl shadow-violet-900/30 flex flex-col items-center justify-center p-6 text-white transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(900px) rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
        }}
      >
        {/* Top Corner Telemetry */}
        <div className="w-full flex items-center justify-between text-[10px] font-mono text-violet-300/80">
          <span>SYS-NODE://MS</span>
          <span className="inline-flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            UP
          </span>
        </div>

        {/* SVG Monogram MS */}
        <div className="my-auto relative flex items-center justify-center">
          <span className="text-6xl sm:text-7xl font-black tracking-tighter bg-gradient-to-b from-white via-violet-100 to-violet-400 bg-clip-text text-transparent drop-shadow-sm">
            MS
          </span>
        </div>

        {/* Bottom Subtitle inside Monogram */}
        <div className="w-full pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-violet-200/90">
          <span>BTS SIO</span>
          <span className="px-2 py-0.5 rounded bg-violet-600/80 text-white font-bold">
            SISR
          </span>
        </div>
      </div>

      {/* Parallax Floating Tech Badges */}
      {floatingBadges.map((b) => (
        <div
          key={b.name}
          className={`absolute z-20 ${b.pos} px-3.5 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-lg shadow-violet-950/10 transition-transform duration-200`}
          style={{
            transform: `translate3d(${mousePos.x * b.factor}px, ${
              mousePos.y * b.factor
            }px, 0)`,
          }}
        >
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${b.dot}`} />
            <span className="text-xs font-bold text-slate-900">{b.name}</span>
          </div>
          <div className="text-[10px] font-mono text-slate-500 pl-4">
            {b.role}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * 4. 3D TILT CERTIFICATION GALLERY (Connected by Violet Network Impulses)
 */
export function TiltCertificationsGrid() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
      {CERTIFICATIONS_DATA.map((cert, index) => {
        const isHovered = hoveredId === cert.id;
        return (
          <div
            key={cert.id}
            onMouseEnter={() => setHoveredId(cert.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative rounded-3xl bg-white border border-slate-200/90 hover:border-violet-400 p-6 sm:p-7 shadow-sm hover:shadow-2xl hover:shadow-violet-600/15 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between space-y-5"
          >
            {/* Top Node Port Indicator */}
            <div className="flex items-center justify-between gap-2">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-200 text-[11px] font-mono font-semibold text-violet-700">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isHovered ? "bg-violet-600 animate-ping" : "bg-violet-500"
                  }`}
                />
                <span>PORT-0{index + 1}</span>
              </div>

              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  cert.status === "Obtenue"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {cert.status} • {cert.date}
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-violet-700 transition-colors leading-snug">
                  {cert.name}
                </h3>
                <div className="w-10 h-10 rounded-2xl bg-violet-100/80 text-violet-700 flex items-center justify-center shrink-0 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <Award className="w-5 h-5" />
                </div>
              </div>

              <p className="text-xs font-mono font-semibold text-violet-700">
                {cert.issuer}
              </p>

              <p className="text-sm text-slate-600 leading-relaxed">
                {cert.description}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-slate-800 bg-slate-50 group-hover:bg-violet-50/70 px-3 py-2 rounded-xl border border-slate-200/70">
                <Sparkles className="w-3.5 h-3.5 text-violet-600 shrink-0" />
                <span className="truncate">{cert.scoreOrBadge}</span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-medium"
                  >
                    <CheckCircle2 className="w-3 h-3 text-violet-600" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
