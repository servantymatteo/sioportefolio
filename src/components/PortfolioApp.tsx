"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Server,
  FileCode2,
  Network,
  CheckCircle2,
  ArrowRight,
  Shield,
  Cpu,
  Sparkles,
  Copy,
  Check,
} from "lucide-react";
import {
  PORTFOLIO_OWNER,
  BTS_SIO_DATA,
  ABOUT_DATA,
  ENTREPRISE_DATA,
  PROJECTS_DATA,
  VEILLES_DATA,
  ProjectItem,
} from "@/data/portfolio";
import { Navbar } from "./Navbar";
import { ProjectModal } from "./ProjectModal";
import { useLenisScroll } from "./SmoothScrollProvider";
import {
  BlueprintNodeHeader,
  HeroMonogramOrbit,
  TiltCertificationsGrid,
} from "./BlueprintNetworkComponents";
import { TcsPdfViewerSection } from "./TcsPdfViewerSection";
import { CustomInfraDiagram } from "./CustomInfraDiagram";
import { BtsSioSpotlight } from "./BtsSioSpotlight";
import { DriveProceduresSection } from "./DriveProceduresSection";
import {
  BlueprintPreloader,
  BlueprintPortal,
  KineticStatement,
  BlueprintVelocityRibbon,
} from "./CinematicBlueprintShowpieces";

export function PortfolioApp() {
  const { scrollToSection, scrollY } = useLenisScroll();
  const [activeProjectTab, setActiveProjectTab] = useState<
    "all" | "infrastructure" | "procedure"
  >("all");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null
  );
  const [activeSioBranch, setActiveSioBranch] = useState<"SISR" | "SLAM">(
    "SISR"
  );
  const [selectedVeilleCategory, setSelectedVeilleCategory] =
    useState<string>("Toutes");
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Horizontal scroll progress for "Mes projets" (Infrastructures & Procédure)
  const projectsTrackRef = useRef<HTMLElement>(null);
  const [projectsScrollRatio, setProjectsScrollRatio] = useState(0);

  useEffect(() => {
    const el = projectsTrackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const winH = window.innerHeight || 800;
    const scrollable = rect.height - winH;
    if (scrollable <= 0) return;

    const ratio = -rect.top / scrollable;
    setProjectsScrollRatio(Math.max(0, Math.min(1, ratio)));
  }, [scrollY]);

  const filteredProjects = PROJECTS_DATA.filter((p) =>
    activeProjectTab === "all" ? true : p.type === activeProjectTab
  );

  const filteredVeilles = VEILLES_DATA.articles.filter((a) =>
    selectedVeilleCategory === "Toutes"
      ? true
      : a.category === selectedVeilleCategory
  );

  // Hero sticky parallax progress
  const heroProgress = Math.min(1, Math.max(0, scrollY / 720));
  const hideHero = scrollY > 1100;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_OWNER.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-blueprint text-slate-900 relative">
      {/* 0. CINEMATIC PRELOADER (MS Monogram + 000% Counter + Curtain Lift) */}
      <BlueprintPreloader />

      {/* 1. FLOATING BOTTOM macOS DOCK + TOP TELEMETRY BAR */}
      <Navbar
        activeProjectTab={activeProjectTab}
        setActiveProjectTab={setActiveProjectTab}
      />

      <main className="flex-1">
        {/* ===================================================================
            NODE 00 : STICKY FULL-SCREEN HERO (Overlapped by the sliding sheet!)
        =================================================================== */}
        <section
          id="accueil"
          className={`sticky top-0 h-[100svh] min-h-[640px] flex items-center overflow-hidden z-0 ${
            hideHero ? "invisible pointer-events-none" : "visible"
          }`}
        >
          <div
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10"
            style={{
              transform: `translateY(${heroProgress * -65}px) scale(${
                1 - heroProgress * 0.05
              })`,
              opacity: 1 - heroProgress * 0.65,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              {/* Left Asymmetric Editorial Pitch */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white border border-violet-200 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-violet-600 animate-ping" />
                  <span className="font-mono text-xs font-semibold text-violet-700">
                    NODE-00 // {PORTFOLIO_OWNER.statusBadge}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-[4.4rem] font-black tracking-[-0.04em] text-slate-950 leading-[0.98]">
                  Concevoir le{" "}
                  <span className="font-serif italic font-normal bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    Réseau Vivant
                  </span>{" "}
                  &amp; Sécuriser le SI.
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  Bienvenue sur l&apos;architecture de{" "}
                  <strong className="text-slate-900 font-bold">
                    {PORTFOLIO_OWNER.fullName}
                  </strong>{" "}
                  —{" "}
                  <span className="px-2 py-0.5 rounded-md bg-violet-100 text-violet-800 font-semibold">
                    BTS SIO Option SISR
                  </span>
                  . Scrollez pour activer le câble fibre optique violet et traverser mes infrastructures, procédures et mon TCS.
                </p>

                {/* Primary CTAs */}
                <div className="flex flex-wrap items-center gap-3.5 pt-2">
                  <button
                    onClick={() => {
                      setActiveProjectTab("infrastructure");
                      scrollToSection("infrastructures");
                    }}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-semibold text-sm shadow-xl shadow-violet-600/25 transition-all hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Server className="w-4 h-4" />
                    <span>Voir mon Infrastructure</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => scrollToSection("tcs")}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-950 hover:bg-violet-600 text-white font-semibold text-sm shadow-sm transition-all cursor-pointer"
                  >
                    <span>Ouvrir le TCS (PDF Officiel E4)</span>
                  </button>
                </div>

                {/* Telemetry Strip */}
                <div className="grid grid-cols-3 gap-4 pt-4 max-w-xl">
                  <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-2xs">
                    <div className="text-[10px] font-mono text-slate-400">
                      SPÉCIALITÉ
                    </div>
                    <div className="text-xl font-black text-violet-700 font-mono">
                      SISR
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-2xs">
                    <div className="text-[10px] font-mono text-slate-400">
                      ÉCOLE
                    </div>
                    <div className="text-lg font-black text-slate-900 font-mono truncate">
                      M2S Vitrolles
                    </div>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-slate-200/80 shadow-2xs">
                    <div className="text-[10px] font-mono text-slate-400">
                      ALTERNANCE
                    </div>
                    <div className="text-lg font-black text-emerald-600 font-mono truncate">
                      Mairie 13240
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 3D/SVG Monogram "MS" + Orbital Rings & Parallax Badges */}
              <div className="lg:col-span-5">
                <HeroMonogramOrbit />
              </div>
            </div>
          </div>

          {/* Darkening Curtain as the Main Sheet slides over the Sticky Hero */}
          <div
            className="pointer-events-none absolute inset-0 bg-slate-950"
            style={{ opacity: heroProgress * 0.55 }}
          />
        </section>

        {/* ===================================================================
            MAIN SLIDING SHEET OVER THE HERO (rounded-t-[3rem] + deep shadow)
            NOTE: No overflow-clip here so inner position:sticky works natively!
        =================================================================== */}
        <div className="relative z-10 rounded-t-[2.5rem] sm:rounded-t-[3.5rem] bg-[#f8f9fc] bg-blueprint shadow-[0_-30px_80px_rgba(15,23,42,0.35)] border-t border-violet-300/60">
          {/* PORTAL 1 : ZOOM-THROUGH INTO BTS SIO */}
          <BlueprintPortal
            nodeCode="NODE-01"
            word="BTS SIO"
            subtitle="ARCHITECTURE & SPÉCIALITÉ SISR"
            variant="zoom-through"
            roundedTop
          />

          {/* =================================================================
              NODE 01 : BTS SIO — 100% FOCUS SISR SPOTLIGHT DRIVEN BY LENIS
          ================================================================= */}
          <section id="bts-sio" className="pt-20 pb-8 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <BlueprintNodeHeader
                nodeId="NODE-01"
                vlanTag="FORMATION // BTS SIO OPTION SISR"
                title="Ma Formation :"
                highlight="BTS SIO Option SISR"
                subtitle={BTS_SIO_DATA.intro}
              />

              {/* Word-by-word Scroll Illuminated Statement */}
              <KineticStatement
                eyebrow="PHILOSOPHIE D'ARCHITECTURE"
                text="Chaque service numérique repose sur une fondation invisible : des VLANs étanches, des hyperviseurs redondés, un annuaire durci et des sauvegardes immuables prêtes à encaisser l’imprévu."
                highlights={[
                  "fondation invisible",
                  "VLANs étanches,",
                  "hyperviseurs redondés,",
                  "sauvegardes immuables",
                ]}
              />
            </div>

            {/* Sticky Lenis 4-Pillar SISR Spotlight */}
            <BtsSioSpotlight />
          </section>

          {/* LENIS VELOCITY RIBBON */}
          <BlueprintVelocityRibbon />

          {/* PORTAL 2 : SPLIT-GATE INTO PROFIL & ENTREPRISE */}
          <BlueprintPortal
            nodeCode="NODE-02"
            word="PARCOURS"
            subtitle="PROFIL • ENTREPRISE • CERTIFICATIONS"
            variant="split-gate"
          />

          {/* =================================================================
              NODE 02 : À PROPOS DE MOI (CONNECTED TIMELINE + RACKS)
          ================================================================= */}
          <section id="a-propos" className="py-24 sm:py-32 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <BlueprintNodeHeader
                nodeId="NODE-02"
                vlanTag="IDENTITÉ // PARCOURS & STACK"
                title="À Propos de Moi &"
                highlight="Nœuds de Compétences"
                subtitle={PORTFOLIO_OWNER.bio}
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Connected Network Nodes Timeline */}
                <div className="lg:col-span-5 bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <span className="font-mono text-xs font-bold uppercase text-violet-700">
                      TRACEROUTE // PARCOURS
                    </span>
                    <span className="font-mono text-xs text-slate-400">
                      {ABOUT_DATA.timeline.length} HOPS ACTIFS
                    </span>
                  </div>

                  <div className="relative pl-6 border-l-2 border-violet-400 space-y-8">
                    {ABOUT_DATA.timeline.map((step, idx) => (
                      <div key={idx} className="relative space-y-2 group">
                        <span className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-violet-600 ring-4 ring-violet-100 group-hover:scale-125 transition-transform" />
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-violet-100 text-violet-700 font-mono text-[11px] font-bold">
                            HOP 0{idx + 1}
                          </span>
                          <span className="text-xs font-mono text-slate-500">
                            {step.year}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900">
                          {step.title}
                        </h3>
                        <div className="text-xs font-medium text-violet-700">
                          {step.institution}
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {step.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {step.tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[11px]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: 3 Connected Skill Racks */}
                <div className="lg:col-span-7 space-y-5">
                  {ABOUT_DATA.skillGroups.map((group, idx) => (
                    <div
                      key={group.category}
                      className="bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/90 hover:border-violet-400 p-6 shadow-sm transition-all space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-1 rounded-lg bg-violet-600 text-white font-mono text-xs font-bold">
                            RACK 0{idx + 1}
                          </span>
                          <h3 className="text-base font-bold text-slate-900">
                            {group.category}
                          </h3>
                        </div>
                        <Cpu className="w-4 h-4 text-violet-600" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {group.skills.map((s) => (
                          <div
                            key={s.name}
                            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-slate-800">
                                {s.name}
                              </span>
                              <span className="font-mono font-bold text-violet-700">
                                {s.level}%
                              </span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-purple-500"
                                style={{ width: `${s.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* =================================================================
              NODE 03 : ENTREPRISE — STACKING CARDS ON SCROLL
          ================================================================= */}
          <section id="entreprise" className="py-24 sm:py-32 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <BlueprintNodeHeader
                nodeId="NODE-03"
                vlanTag="ENTREPRISE // TERRAIN & MCO"
                title="Mon Entreprise &"
                highlight="Missions Empilées"
                subtitle={ENTREPRISE_DATA.context}
              />

              {/* Company Identity Banner */}
              <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-violet-500/30 space-y-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-violet-400">
                      ENVIRONNEMENT D&apos;ACCUEIL SISR
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold mt-1">
                      {ENTREPRISE_DATA.companyName}
                    </h3>
                    <p className="text-sm text-slate-400 mt-1">
                      {ENTREPRISE_DATA.sector} • {ENTREPRISE_DATA.size}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-600/20 border border-violet-400/40 text-violet-200 font-mono text-xs self-start">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    Production Active
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {ENTREPRISE_DATA.infrastructureStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1"
                    >
                      <div className="text-2xl sm:text-3xl font-black text-violet-400 font-mono">
                        {stat.value}
                      </div>
                      <div className="text-sm font-bold text-white">
                        {stat.label}
                      </div>
                      <div className="text-xs text-slate-400">{stat.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sticky Stacking Mission Cards (Each card stacks over the previous one as you scroll!) */}
              <div className="space-y-6 max-w-5xl mx-auto">
                {ENTREPRISE_DATA.missions.map((mission, idx) => (
                  <div
                    key={mission.title}
                    className="sticky bg-white rounded-3xl border-2 border-slate-200/90 hover:border-violet-500 p-7 sm:p-10 shadow-xl shadow-slate-900/5 transition-all"
                    style={{
                      top: `${96 + idx * 22}px`,
                    }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                      <div className="flex items-center gap-3">
                        <span className="w-12 h-12 rounded-2xl bg-violet-600 text-white font-serif italic text-2xl font-bold flex items-center justify-center shadow-md shadow-violet-600/25">
                          0{idx + 1}
                        </span>
                        <div>
                          <div className="text-xs font-mono uppercase text-violet-700 font-bold">
                            MISSION EN ENTREPRISE • RÉFÉRENTIEL {mission.code}
                          </div>
                          <h4 className="text-xl sm:text-2xl font-extrabold text-slate-950">
                            {mission.title}
                          </h4>
                        </div>
                      </div>
                      <Shield className="w-6 h-6 text-violet-600 hidden sm:block" />
                    </div>

                    <p className="text-base text-slate-600 leading-relaxed my-5">
                      {mission.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {mission.tools.map((t) => (
                        <span
                          key={t}
                          className="px-3 py-1 rounded-xl bg-violet-50 border border-violet-200/80 text-violet-900 font-mono text-xs font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================================
              NODE 04 : MES CERTIFICATIONS — 3D TILT CARDS
          ================================================================= */}
          <section id="certifications" className="py-24 sm:py-32 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <BlueprintNodeHeader
                nodeId="NODE-04"
                vlanTag="CERTIFICATIONS // TRYHACKME PRE SECURITY • CISCO CCNA 1"
                title="Mes Certifications &"
                highlight="Attestations IT"
                subtitle="Validation de mes compétences en réseaux et cybersécurité : TryHackMe Pre Security (Obtenue) et Cisco CCNA 1 (En cours)."
              />

              <TiltCertificationsGrid />
            </div>
          </section>

          {/* PORTAL 3 : IRIS-CORE INTO TCS PDF */}
          <BlueprintPortal
            nodeCode="NODE-05"
            word="SYNTHÈSE E4"
            subtitle="TABLEAU DE SYNTHÈSE OFFICIEL (PDF)"
            variant="iris-core"
          />

          {/* =================================================================
              NODE 05 : TCS — LECTEUR PDF OFFICIEL INTÉGRÉ + MATRICE E4
          ================================================================= */}
          <section id="tcs" className="py-24 sm:py-32 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <BlueprintNodeHeader
                nodeId="NODE-05"
                vlanTag="ÉPREUVE E4 // TABLEAU DE SYNTHÈSE (TCS)"
                title="Tableau de Synthèse &"
                highlight="Lecteur PDF Officiel"
                subtitle="Visualisez directement mon Tableau de Synthèse officiel au format PDF pour le jury BTS SIO ou filtrez mes réalisations par compétence (B1.1 à B1.6)."
              />

              <TcsPdfViewerSection />
            </div>
          </section>

          {/* =================================================================
              NODE 06A : PARTIE DÉDIÉE SUR LA PAGE — MON INFRASTRUCTURE
              (WAN 100.X ➔ Proxmox & SW 1 ➔ pfSense ➔ SW Planet ➔ Proxmox)
          ================================================================= */}
          <CustomInfraDiagram />

          {/* =================================================================
              NODE 06B : MES PROCÉDURES — SYNCHRONISATION AUTOMATIQUE GOOGLE DRIVE
          ================================================================= */}
          <DriveProceduresSection />

          {/* =================================================================
              NODE 07 : VEILLES TECHNOLOGIQUES + MONUMENTAL FINALE
          ================================================================= */}
          <section id="veilles" className="py-24 sm:py-32 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <BlueprintNodeHeader
                nodeId="NODE-07"
                vlanTag="VEILLES // SOUVERAINETÉ LINUX & SORTIE DE MICROSOFT"
                title="Ma Veille Technologique :"
                highlight="Alternatives Linux à Microsoft (Samba AD)"
                subtitle={VEILLES_DATA.problematique}
              />

              {/* Methodology Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {VEILLES_DATA.methodology.map((m, i) => (
                  <div
                    key={m.tool}
                    className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-xs space-y-2"
                  >
                    <span className="px-2.5 py-1 rounded-lg bg-violet-100 text-violet-700 font-mono text-xs font-bold">
                      FLUX RSS 0{i + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 pt-1">
                      {m.tool}
                    </h3>
                    <div className="text-xs font-semibold text-violet-700">
                      {m.role}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {m.sources}
                    </p>
                  </div>
                ))}
              </div>

              {/* Comparatif Solutions */}
              <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xs overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200/90 text-sm font-bold text-slate-900">
                  {VEILLES_DATA.comparison.title}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-mono uppercase tracking-wider text-slate-500">
                      <tr>
                        <th className="px-6 py-3 font-semibold">Solution</th>
                        <th className="px-6 py-3 font-semibold">Le mieux</th>
                        <th className="px-6 py-3 font-semibold">Le moins bon</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/90">
                      {VEILLES_DATA.comparison.rows.map((row) => (
                        <tr key={row.solution}>
                          <td className="px-6 py-3 font-bold text-violet-700 whitespace-nowrap">
                            {row.solution}
                          </td>
                          <td className="px-6 py-3 text-slate-700">{row.best}</td>
                          <td className="px-6 py-3 text-slate-500">{row.worst}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="px-6 py-4 bg-violet-50/70 border-t border-violet-200/70 text-sm font-semibold text-violet-800">
                  {VEILLES_DATA.comparison.summary}
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm font-bold text-slate-900">
                  Dossiers &amp; Bulletins Analysés :
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Toutes",
                    "Souveraineté & État",
                    "Active Directory sous Linux",
                    "Alternative Open Source",
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedVeilleCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        selectedVeilleCategory === cat
                          ? "bg-violet-600 text-white"
                          : "bg-white border border-slate-200 text-slate-700 hover:border-violet-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredVeilles.map((art) => (
                  <article
                    key={art.id}
                    className="p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/90 hover:border-violet-400 shadow-xs transition-all flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-violet-100 text-violet-700">
                          {art.category}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          {art.source} • {art.date}
                        </span>
                      </div>
                      <h4 className="text-lg font-bold text-slate-900 leading-snug">
                        {art.title}
                      </h4>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-violet-50/70 border border-violet-200/80 space-y-1">
                      <div className="text-[11px] font-mono font-bold uppercase text-violet-700">
                        Impact &amp; Retenue SISR
                      </div>
                      <p className="text-xs sm:text-sm text-slate-800">
                        {art.takeawaySISR}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* =================================================================
              MONUMENTAL FINALE FOOTER
          ================================================================= */}
          <footer className="relative bg-slate-950 text-white rounded-t-[2.5rem] sm:rounded-t-[3.5rem] pt-20 pb-32 overflow-hidden z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 font-mono text-xs">
                <span>FIN DE TRAME // PRÊT POUR L&apos;ÉPREUVE E4 &amp; E5</span>
              </div>

              <h2 className="text-[clamp(2.8rem,9vw,8.5rem)] font-black tracking-[-0.05em] leading-[0.9]">
                Parlons de{" "}
                <span className="font-serif italic font-normal text-violet-400">
                  votre SI.
                </span>
              </h2>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-xl shadow-violet-600/30 transition-all cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Email copié : {PORTFOLIO_OWNER.email}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copier mon email ({PORTFOLIO_OWNER.email})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => scrollToSection("accueil")}
                  className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-colors cursor-pointer"
                >
                  Remonter au NODE-00 ↑
                </button>
              </div>
            </div>

            {/* Giant Watermark */}
            <div
              className="pointer-events-none select-none mt-16 overflow-hidden"
              aria-hidden="true"
            >
              <p className="whitespace-nowrap text-center text-[12.5vw] font-black uppercase leading-[0.8] tracking-[-0.06em] text-white/[0.04]">
                MATTÉO SERVANTY • SISR
              </p>
            </div>
          </footer>
        </div>
      </main>

      {/* Project & Procedure Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
