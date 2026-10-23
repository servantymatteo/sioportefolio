"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Network,
  Server,
  ShieldCheck,
  Activity,
  GraduationCap,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { useLenisScroll } from "./SmoothScrollProvider";
import { BTS_SIO_DATA } from "@/data/portfolio";

const SISR_PILLARS = [
  {
    code: "PILIER 01 // RÉSEAUX",
    title: "Architecture Réseau & Commutation",
    desc: "Segmentation VLAN 802.1Q, routage inter-VLAN, Spanning-Tree, agrégation LACP et interconnexion WAN.",
    tools: ["Cisco IOS", "Switch Planet", "SW 1", "VLAN / Trunk", "OSPF"],
    icon: Network,
  },
  {
    code: "PILIER 02 // SYSTÈMES & VIRTUALISATION",
    title: "Hyperviseurs & Administration Système",
    desc: "Clusters Proxmox VE (KVM/LXC), Windows Server (Active Directory, GPO, DNS, DHCP) et serveurs Linux Debian.",
    tools: ["Proxmox VE", "Windows Server 2022", "Debian 12", "AD DS / GPO", "ZFS"],
    icon: Server,
  },
  {
    code: "PILIER 03 // CYBERSÉCURITÉ",
    title: "Filtrage Périmétrique & Durcissement",
    desc: "Pare-feu pfSense (NAT, règles inter-VLAN, HA CARP), tunnels VPN WireGuard/IPsec et recommandations ANSSI.",
    tools: ["pfSense", "WireGuard VPN", "Hardening ANSSI", "Fail2ban / UFW", "LAPS"],
    icon: ShieldCheck,
  },
  {
    code: "PILIER 04 // EXPLOITATION & MCO",
    title: "Supervision, Parc ITSM & Sauvegardes",
    desc: "Maintien en condition opérationnelle, gestion de parc et ticketing GLPI, supervision Zabbix et sauvegardes PRA.",
    tools: ["GLPI 10", "Zabbix 7", "Proxmox Backup", "Règle 3-2-1", "PRA / PCA"],
    icon: Activity,
  },
];

export function BtsSioSpotlight() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useLenisScroll();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || 800;
    const scrollable = rect.height - winH;
    if (scrollable <= 0) return;

    const raw = -rect.top / scrollable;
    setProgress(Math.max(0, Math.min(1, raw)));
  }, [scrollY]);

  const sisrData = BTS_SIO_DATA.options[0];
  const activePillarIdx = Math.min(
    3,
    Math.floor(progress * SISR_PILLARS.length)
  );

  return (
    <div
      ref={sectionRef}
      className="relative"
      style={{ height: "230svh" }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col justify-between pt-18 pb-26 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full my-auto space-y-6">
          {/* Top Monolith Card: BTS SIO — Focus 100% SISR */}
          <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-950 text-white border-2 border-violet-500/40 p-6 sm:p-10 shadow-2xl">
            {/* Ambient Violet Glow that moves with Lenis scroll */}
            <div
              className="pointer-events-none absolute -top-24 w-96 h-96 rounded-full bg-violet-600/25 blur-3xl transition-transform duration-75"
              style={{
                left: `${10 + progress * 65}%`,
              }}
            />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Diploma Identity */}
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/20 border border-violet-400/40 text-violet-300 font-mono text-xs font-bold">
                  <GraduationCap className="w-4 h-4 text-violet-400" />
                  <span>DIPLÔME D&apos;ÉTAT BAC+2 // SPÉCIALITÉ SISR</span>
                </div>

                <h3 className="text-2xl sm:text-4xl lg:text-[2.65rem] font-black tracking-tight leading-[1.08]">
                  BTS SIO —{" "}
                  <span className="font-serif italic font-normal text-violet-400">
                    Solutions d&apos;Infrastructure, Systèmes et Réseaux
                  </span>
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                  {sisrData.description}
                </p>

                {/* Career Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] font-mono uppercase text-violet-400 font-bold mr-1">
                    Débouchés :
                  </span>
                  {sisrData.careers.map((career) => (
                    <span
                      key={career}
                      className="px-3 py-1 rounded-xl bg-white/10 border border-white/10 text-xs font-mono text-violet-100"
                    >
                      {career}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Scroll-Driven Progress Gauge & Exam E4/E5 Badges */}
              <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-white/[0.05] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-violet-300 font-bold">
                    ARCHITECTURE DU DIPLÔME
                  </span>
                  <span className="font-mono text-xs text-emerald-400 font-bold">
                    OPTION SISR
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-violet-500/30">
                    <div className="font-mono text-[10px] text-violet-400 font-bold">
                      ÉPREUVE E4 (COEFF 4)
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      Support &amp; Mise à disposition
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Tableau de synthèse (TCS) &amp; Projets
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-violet-500/30">
                    <div className="font-mono text-[10px] text-emerald-400 font-bold">
                      ÉPREUVE E5 (COEFF 4)
                    </div>
                    <div className="text-sm font-bold text-white mt-0.5">
                      Conception d&apos;Infrastructure
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Lab Réseau, Proxmox &amp; pfSense
                    </div>
                  </div>
                </div>

                {/* Lenis Scroll Bar across the 4 SISR Pillars */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>Exploration des 4 piliers SISR au scroll</span>
                    <span className="text-violet-300 font-bold">
                      Pilier 0{activePillarIdx + 1} / 04
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 via-purple-400 to-emerald-400 origin-left transition-transform duration-75"
                      style={{ transform: `scaleX(${Math.max(0.15, progress)})` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 4 SISR Pillars Grid — Illuminates progressively as you scroll with Lenis! */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SISR_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = idx <= activePillarIdx;
              const isCurrent = idx === activePillarIdx;

              return (
                <div
                  key={pillar.code}
                  className={`rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between space-y-4 ${
                    isCurrent
                      ? "bg-violet-600 text-white border-violet-400 shadow-xl shadow-violet-600/25 -translate-y-1.5"
                      : isActive
                      ? "bg-white text-slate-900 border-violet-300 shadow-md"
                      : "bg-white/60 text-slate-500 border-slate-200/80 opacity-65"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                          isCurrent
                            ? "bg-white/20 text-white"
                            : isActive
                            ? "bg-violet-100 text-violet-700"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {pillar.code}
                      </span>
                      <Icon
                        className={`w-5 h-5 ${
                          isCurrent
                            ? "text-white"
                            : isActive
                            ? "text-violet-600"
                            : "text-slate-400"
                        }`}
                      />
                    </div>

                    <h4 className="text-base font-extrabold leading-snug">
                      {pillar.title}
                    </h4>

                    <p
                      className={`text-xs leading-relaxed ${
                        isCurrent
                          ? "text-violet-100"
                          : isActive
                          ? "text-slate-600"
                          : "text-slate-400"
                      }`}
                    >
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-2 border-t border-current/10">
                    {pillar.tools.map((t) => (
                      <span
                        key={t}
                        className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-semibold ${
                          isCurrent
                            ? "bg-white/15 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
