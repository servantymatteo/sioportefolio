"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Terminal,
  Copy,
  Check,
  CheckCircle2,
  Activity,
} from "lucide-react";
import { useLenisScroll } from "./SmoothScrollProvider";

interface InfraNodeStage {
  index: number;
  shortLabel: string;
  code: string;
  title: string;
  subtitle: string;
  ipRange: string;
  description: string;
  interfaces: string[];
  configSnippet: string;
}

const INFRA_STAGES: InfraNodeStage[] = [
  {
    index: 0,
    shortLabel: "01. WAN 100.X",
    code: "STAGE 01 // ARRIVÉE WAN",
    title: "Réseau WAN (100.X)",
    subtitle: "Interconnexion Amont & Passerelle Externe",
    ipRange: "100.X.X.0/24 (GW: 100.X.X.254)",
    description:
      "Le flux externe arrive en 100.X et se divise en deux liaisons : une branche directe vers l'interface amont de l'hyperviseur Proxmox VE (vmbr0) et une branche vers le commutateur amont SW 1.",
    interfaces: [
      "Sous-réseau WAN : 100.X.X.0/24",
      "Branche A ➔ Proxmox VE (vmbr0 / eno1)",
      "Branche B ➔ Switch SW 1 (Uplink)",
    ],
    configSnippet: `# Entrée WAN 100.X — Double distribution\nSUBNET_WAN="100.X.X.0/24" | GW="100.X.X.254"\n[1] -> Proxmox VE (Patte Amont vmbr0)\n[2] -> Switch SW 1 (Transit vers pfSense)`,
  },
  {
    index: 1,
    shortLabel: "02. Proxmox & SW 1",
    code: "STAGE 02 // SPLIT AMONT",
    title: "Proxmox VE (Amont) & Switch SW 1",
    subtitle: "Double alimentation : Hyperviseur + Transit L2",
    ipRange: "Proxmox vmbr0 (100.X) & SW 1 Transit",
    description:
      "En parallèle, Proxmox VE reçoit sa patte amont sur vmbr0 tandis que le Switch SW 1 assure la commutation de niveau 2 pour alimenter proprement l'interface WAN du pare-feu pfSense.",
    interfaces: [
      "Proxmox eno1 ➔ Bridge vmbr0 (100.X.X.10/24)",
      "SW 1 Port 1 : Arrivée WAN 100.X",
      "SW 1 Port 2 : Liaison vers WAN pfSense",
    ],
    configSnippet: `auto vmbr0\niface vmbr0 inet static\n    address 100.X.X.10/24\n    gateway 100.X.X.254\n    bridge-ports eno1`,
  },
  {
    index: 2,
    shortLabel: "03. pfSense",
    code: "STAGE 03 // COUPURE SÉCURITÉ",
    title: "Pare-feu pfSense",
    subtitle: "Filtrage, NAT Outbound & Routage Inter-VLAN",
    ipRange: "WAN: 100.X.X.250 ➔ LAN / Trunk 802.1Q",
    description:
      "Le pare-feu pfSense est alimenté en amont par SW 1. Il effectue la coupure sécuritaire entre la zone WAN (100.X) et les réseaux internes, assure le NAT et achemine les VLANs vers le Switch Planet.",
    interfaces: [
      "WAN (em0/vtnet0) : connecté à SW 1 (100.X)",
      "LAN/Trunk (em1/vtnet1) : vers Switch Planet",
      "Services : Firewalling, NAT, DHCP, DNS",
    ],
    configSnippet: `WAN (vtnet0) : 100.X.X.250/24 -> GW 100.X.X.254\nLAN (vtnet1) : Trunk 802.1Q -> Switch Planet\nNAT Outbound : Automatic / Filtrage strict`,
  },
  {
    index: 3,
    shortLabel: "04. SW Planet",
    code: "STAGE 04 // DISTRIBUTION LAN",
    title: "Switch Administrable Planet",
    subtitle: "Commutation Aval & Segmentation des VLANs",
    ipRange: "Trunk 802.1Q & Distribution LAN",
    description:
      "Placé derrière pfSense, le Switch Planet reçoit les flux filtrés et distribue les VLANs de production en renvoyant l'uplink sécurisé vers la seconde carte réseau de Proxmox VE.",
    interfaces: [
      "Port 1 (Trunk) : Uplink depuis pfSense LAN",
      "Port 2 (Trunk) : Uplink vers Proxmox (vmbr1)",
      "Ports 3-24 : Segmentation VLAN Services/Clients",
    ],
    configSnippet: `VLAN 10 (MGMT)  : Tagged Ports 1, 2\nVLAN 20 (SRV)   : Tagged Ports 1, 2\nUplink Aval     : Port Gi1/0/2 -> Proxmox vmbr1`,
  },
  {
    index: 4,
    shortLabel: "05. Proxmox VMs",
    code: "STAGE 05 // BOUCLE PROXMOX PRODUCTION",
    title: "Proxmox VE (Aval — VMs & Conteneurs)",
    subtitle: "Hébergement des Services Internes Isolés",
    ipRange: "Bridge vmbr1 (VLAN-Aware) • VMs Internes",
    description:
      "Le flux issu du Switch Planet revient sur Proxmox VE via le bridge secondaire vmbr1 (VLAN-Aware). Toutes les VMs de production (AD, GLPI, Zabbix, Debian) sont protégées derrière pfSense et SW Planet.",
    interfaces: [
      "Proxmox eno2 ➔ Bridge vmbr1 (VLAN-Aware)",
      "VMs & LXC rattachés aux VLANs du Switch Planet",
      "Boucle : VMs ➔ SW Planet ➔ pfSense ➔ SW 1 ➔ WAN",
    ],
    configSnippet: `auto vmbr1\niface vmbr1 inet manual\n    bridge-ports eno2\n    bridge-vlan-aware yes\n    bridge-vids 2-4094`,
  },
];

export function CustomInfraDiagram() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useLenisScroll();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manualStage, setManualStage] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || 800;
    const scrollable = rect.height - winH;
    if (scrollable <= 0) return;

    const raw = -rect.top / scrollable;
    const clamped = Math.max(0, Math.min(1, raw));
    setScrollProgress(clamped);
  }, [scrollY]);

  const scrollStageIndex = Math.min(
    4,
    Math.floor(scrollProgress * INFRA_STAGES.length)
  );
  const activeStageIndex =
    manualStage !== null ? manualStage : scrollStageIndex;
  const activeStage = INFRA_STAGES[activeStageIndex];

  // Progressive cable fill driven by Lenis scroll
  const seg1 = Math.max(0, Math.min(1, scrollProgress / 0.25));
  const seg2 = Math.max(0, Math.min(1, (scrollProgress - 0.22) / 0.26));
  const seg3 = Math.max(0, Math.min(1, (scrollProgress - 0.48) / 0.26));
  const seg4 = Math.max(0, Math.min(1, (scrollProgress - 0.72) / 0.26));

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="infrastructures"
      ref={sectionRef}
      className="relative z-20"
      style={{ height: "320svh" }}
    >
      {/* pt-16 clearing top telemetry bar, pb-24 clearing bottom floating macOS Dock */}
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-slate-950 text-white flex flex-col justify-between pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Background Architectural Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(rgba(139,92,246,0.35) 1px, transparent 1px), linear-gradient(to right, rgba(139,92,246,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(139,92,246,0.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px, 96px 96px, 96px 96px",
          }}
        />

        {/* 1. COMPACT TOP HEADER BAR */}
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-violet-500/20 border border-violet-400/40 text-violet-300 font-mono text-[11px] font-bold">
              <Activity className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>
                SCHÉMA RÉSEAU LENIS // FLUX : {Math.round(scrollProgress * 100)}%
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-black tracking-tight leading-tight">
              Mon Infrastructure :{" "}
              <span className="font-serif italic font-normal text-violet-400">
                WAN 100.X ➔ Proxmox &amp; SW 1 ➔ pfSense ➔ SW Planet ➔ Proxmox
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {manualStage !== null ? (
              <button
                type="button"
                onClick={() => setManualStage(null)}
                className="px-3 py-1 rounded-xl bg-violet-600 text-white font-mono text-[11px] cursor-pointer"
              >
                Reprendre le scroll auto ↻
              </button>
            ) : (
              <span className="text-[11px] font-mono text-slate-400 hidden xl:inline">
                Scrollez ou cliquez sur un équipement
              </span>
            )}
          </div>
        </div>

        {/* 2. RESPONSIVE ARCHITECTURAL SVG TOPOLOGY DIAGRAM */}
        <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 min-h-0 my-2 flex items-center justify-center">
          <div className="w-full h-full max-h-[38svh] rounded-3xl bg-slate-900/90 border border-violet-500/35 px-3 py-2 sm:px-6 sm:py-4 shadow-2xl flex items-center justify-center">
            <svg
              viewBox="0 0 1120 350"
              preserveAspectRatio="xMidYMid meet"
              className="w-full h-full select-none"
            >
              <defs>
                <filter
                  id="violetGlow"
                  x="-20%"
                  y="-20%"
                  width="140%"
                  height="140%"
                >
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* =============================================================
                  BACKGROUND PASSIVE CABLES
              ============================================================= */}
              {/* 1A: WAN (190,155) -> Proxmox Top (445,68) */}
              <path
                d="M 190 155 C 250 68, 340 68, 445 68"
                fill="none"
                stroke="rgba(148, 163, 184, 0.25)"
                strokeWidth="4"
                strokeDasharray="6 6"
              />
              {/* 1B: WAN (190,185) -> SW 1 (295,265) */}
              <path
                d="M 190 185 C 235 185, 245 265, 295 265"
                fill="none"
                stroke="rgba(148, 163, 184, 0.25)"
                strokeWidth="4"
              />
              {/* 2: SW 1 (445,265) -> pfSense (535,265) */}
              <path
                d="M 445 265 L 535 265"
                fill="none"
                stroke="rgba(148, 163, 184, 0.25)"
                strokeWidth="4"
              />
              {/* 3: pfSense (685,265) -> SW Planet (775,265) */}
              <path
                d="M 685 265 L 775 265"
                fill="none"
                stroke="rgba(148, 163, 184, 0.25)"
                strokeWidth="4"
              />
              {/* 4: SW Planet (925,245) -> Proxmox Return (695,68) */}
              <path
                d="M 925 245 C 1015 245, 1015 68, 695 68"
                fill="none"
                stroke="rgba(148, 163, 184, 0.25)"
                strokeWidth="4"
              />

              {/* =============================================================
                  ACTIVE LENIS-DRIVEN GLOWING CABLES
              ============================================================= */}
              <path
                d="M 190 155 C 250 68, 340 68, 445 68"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4.5"
                filter="url(#violetGlow)"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - seg1}
              />
              <path
                d="M 190 185 C 235 185, 245 265, 295 265"
                fill="none"
                stroke="#6366f1"
                strokeWidth="4.5"
                filter="url(#violetGlow)"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - seg1}
              />
              <path
                d="M 445 265 L 535 265"
                fill="none"
                stroke="#8b5cf6"
                strokeWidth="5"
                filter="url(#violetGlow)"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - seg2}
              />
              <path
                d="M 685 265 L 775 265"
                fill="none"
                stroke="#d946ef"
                strokeWidth="5"
                filter="url(#violetGlow)"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - seg3}
              />
              <path
                d="M 925 245 C 1015 245, 1015 68, 695 68"
                fill="none"
                stroke="#10b981"
                strokeWidth="5"
                filter="url(#violetGlow)"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={1 - seg4}
              />

              {/* =============================================================
                  CLEAN NON-OVERLAPPING CABLE LABELS
              ============================================================= */}
              <g className="font-mono text-[11px]" fill="#94a3b8">
                {/* Placed neatly above the top-left curve */}
                <text
                  x="310"
                  y="45"
                  textAnchor="middle"
                  fill="#38bdf8"
                  fontWeight="bold"
                >
                  WAN 100.X ➔ vmbr0
                </text>
                {/* Placed cleanly below the bottom-left curve */}
                <text
                  x="215"
                  y="252"
                  textAnchor="middle"
                  fill="#818cf8"
                  fontWeight="bold"
                >
                  100.X ➔ SW 1
                </text>
                {/* Between SW 1 and pfSense */}
                <text x="490" y="250" textAnchor="middle" fill="#a78bfa">
                  Patte WAN
                </text>
                {/* Between pfSense and SW Planet */}
                <text x="730" y="250" textAnchor="middle" fill="#e879f9">
                  Trunk LAN
                </text>
                {/* Placed cleanly to the left of the right-hand return arc */}
                <text
                  x="960"
                  y="155"
                  textAnchor="end"
                  fill="#34d399"
                  fontWeight="bold"
                >
                  VLANs ➔ Proxmox (vmbr1)
                </text>
              </g>

              {/* =============================================================
                  NODE 1 : WAN (100.X)
              ============================================================= */}
              <g
                onClick={() => setManualStage(0)}
                className="cursor-pointer"
                transform="translate(40, 115)"
              >
                <rect
                  x="0"
                  y="0"
                  width="150"
                  height="100"
                  rx="20"
                  fill={activeStageIndex === 0 ? "#0284c7" : "#0f172a"}
                  stroke={activeStageIndex === 0 ? "#38bdf8" : "#334155"}
                  strokeWidth="2.5"
                />
                <circle cx="24" cy="26" r="5" fill="#38bdf8" />
                <text
                  x="38"
                  y="30"
                  fill="#bae6fd"
                  className="font-mono text-[10px] font-bold"
                >
                  ENTRÉE WAN
                </text>
                <text
                  x="18"
                  y="60"
                  fill="#ffffff"
                  className="font-sans text-[18px] font-black"
                >
                  WAN 100.X
                </text>
                <text
                  x="18"
                  y="82"
                  fill="#94a3b8"
                  className="font-mono text-[11px]"
                >
                  100.X.X.0/24
                </text>
              </g>

              {/* =============================================================
                  NODE 2 : PROXMOX VE HYPERVISOR (Wider box so text never clips!)
              ============================================================= */}
              <g
                onClick={() => setManualStage(activeStageIndex === 4 ? 1 : 4)}
                className="cursor-pointer"
                transform="translate(445, 14)"
              >
                <rect
                  x="0"
                  y="0"
                  width="250"
                  height="108"
                  rx="22"
                  fill={
                    activeStageIndex === 1 || activeStageIndex === 4
                      ? "#4c1d95"
                      : "#0f172a"
                  }
                  stroke={
                    seg4 > 0.8
                      ? "#10b981"
                      : seg1 > 0.5
                      ? "#f59e0b"
                      : "#475569"
                  }
                  strokeWidth="3"
                />
                <circle cx="0" cy="54" r="6" fill="#38bdf8" />
                <circle cx="250" cy="54" r="6" fill="#10b981" />

                <text
                  x="125"
                  y="26"
                  textAnchor="middle"
                  fill="#fcd34d"
                  className="font-mono text-[10px] font-bold"
                >
                  HYPERVISEUR KVM / LXC
                </text>
                <text
                  x="125"
                  y="54"
                  textAnchor="middle"
                  fill="#ffffff"
                  className="font-sans text-[20px] font-black"
                >
                  PROXMOX VE
                </text>
                <text
                  x="125"
                  y="76"
                  textAnchor="middle"
                  fill="#cbd5e1"
                  className="font-mono text-[10.5px]"
                >
                  ◄ vmbr0 (WAN) | vmbr1 (Planet) ►
                </text>
                <text
                  x="125"
                  y="95"
                  textAnchor="middle"
                  fill="#34d399"
                  className="font-mono text-[10px] font-bold"
                >
                  VMs : AD, DNS, GLPI, Zabbix
                </text>
              </g>

              {/* =============================================================
                  NODE 3 : SWITCH SW 1
              ============================================================= */}
              <g
                onClick={() => setManualStage(1)}
                className="cursor-pointer"
                transform="translate(295, 215)"
              >
                <rect
                  x="0"
                  y="0"
                  width="150"
                  height="100"
                  rx="20"
                  fill={activeStageIndex === 1 ? "#312e81" : "#0f172a"}
                  stroke={seg1 > 0.7 ? "#818cf8" : "#334155"}
                  strokeWidth="2.5"
                />
                <circle cx="0" cy="50" r="5" fill="#6366f1" />
                <circle cx="150" cy="50" r="5" fill="#8b5cf6" />
                <text
                  x="20"
                  y="28"
                  fill="#a5b4fc"
                  className="font-mono text-[10px] font-bold"
                >
                  SWITCH AMONT
                </text>
                <text
                  x="20"
                  y="58"
                  fill="#ffffff"
                  className="font-sans text-[19px] font-black"
                >
                  SW 1
                </text>
                <text
                  x="20"
                  y="80"
                  fill="#94a3b8"
                  className="font-mono text-[11px]"
                >
                  Transit 100.X
                </text>
              </g>

              {/* =============================================================
                  NODE 4 : PARE-FEU PFSENSE
              ============================================================= */}
              <g
                onClick={() => setManualStage(2)}
                className="cursor-pointer"
                transform="translate(535, 215)"
              >
                <rect
                  x="0"
                  y="0"
                  width="150"
                  height="100"
                  rx="20"
                  fill={activeStageIndex === 2 ? "#5b21b6" : "#0f172a"}
                  stroke={seg2 > 0.7 ? "#a78bfa" : "#334155"}
                  strokeWidth="3"
                />
                <circle cx="0" cy="50" r="5" fill="#8b5cf6" />
                <circle cx="150" cy="50" r="5" fill="#d946ef" />
                <text
                  x="20"
                  y="28"
                  fill="#ddd6fe"
                  className="font-mono text-[10px] font-bold"
                >
                  FIREWALL / NAT
                </text>
                <text
                  x="20"
                  y="58"
                  fill="#ffffff"
                  className="font-sans text-[19px] font-black"
                >
                  pfSense
                </text>
                <text
                  x="20"
                  y="80"
                  fill="#c4b5fd"
                  className="font-mono text-[11px]"
                >
                  Coupure WAN/LAN
                </text>
              </g>

              {/* =============================================================
                  NODE 5 : SWITCH PLANET
              ============================================================= */}
              <g
                onClick={() => setManualStage(3)}
                className="cursor-pointer"
                transform="translate(775, 215)"
              >
                <rect
                  x="0"
                  y="0"
                  width="150"
                  height="100"
                  rx="20"
                  fill={activeStageIndex === 3 ? "#701a75" : "#0f172a"}
                  stroke={seg3 > 0.7 ? "#e879f9" : "#334155"}
                  strokeWidth="2.5"
                />
                <circle cx="0" cy="50" r="5" fill="#d946ef" />
                <circle cx="150" cy="30" r="5" fill="#10b981" />
                <text
                  x="20"
                  y="28"
                  fill="#f5d0fe"
                  className="font-mono text-[10px] font-bold"
                >
                  SWITCH AVAL
                </text>
                <text
                  x="20"
                  y="58"
                  fill="#ffffff"
                  className="font-sans text-[18px] font-black"
                >
                  SW Planet
                </text>
                <text
                  x="20"
                  y="80"
                  fill="#f0abfc"
                  className="font-mono text-[11px]"
                >
                  VLANs ➔ Proxmox
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* 3. COMPACT BOTTOM INSPECTOR (Never collides with bottom Dock!) */}
        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch shrink-0">
          {/* Left: Stage Selector + Explanation */}
          <div className="lg:col-span-7 rounded-2xl bg-white/[0.06] border border-white/15 p-4 flex flex-col justify-between space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-1.5">
              <div className="flex flex-wrap items-center gap-1">
                {INFRA_STAGES.map((st) => (
                  <button
                    key={st.index}
                    type="button"
                    onClick={() => setManualStage(st.index)}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold transition-all cursor-pointer ${
                      activeStageIndex === st.index
                        ? "bg-violet-600 text-white shadow-sm"
                        : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {st.shortLabel}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-emerald-300">
                {activeStage.ipRange}
              </span>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                {activeStage.title}{" "}
                <span className="text-slate-400 font-normal text-xs sm:text-sm">
                  — {activeStage.subtitle}
                </span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mt-1 line-clamp-2">
                {activeStage.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {activeStage.interfaces.map((intf) => (
                <span
                  key={intf}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-900/90 border border-white/10 font-mono text-[10px] text-violet-200"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>{intf}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right: Compact Terminal Config */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900 border border-violet-500/35 p-4 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-violet-300 font-bold">
                <Terminal className="w-3.5 h-3.5 text-violet-400" />
                <span>CONFIG // ÉTAPE 0{activeStageIndex + 1}</span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(activeStage.configSnippet)}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-violet-600 text-[10px] font-mono text-white transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copié</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copier</span>
                  </>
                )}
              </button>
            </div>

            <pre className="font-mono text-[11px] text-violet-100 overflow-x-auto leading-snug my-auto">
              {activeStage.configSnippet}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
