"use client";

import React, { useEffect, useState } from "react";
import {
  Home,
  GraduationCap,
  User,
  Building2,
  Award,
  FileSpreadsheet,
  FolderGit2,
  Server,
  FileCode2,
  Rss,
  ChevronUp,
} from "lucide-react";
import { useLenisScroll } from "./SmoothScrollProvider";

interface NavbarProps {
  activeProjectTab: "all" | "infrastructure" | "procedure";
  setActiveProjectTab: (tab: "all" | "infrastructure" | "procedure") => void;
}

const SECTIONS = [
  "accueil",
  "bts-sio",
  "a-propos",
  "entreprise",
  "certifications",
  "tcs",
  "infrastructures",
  "projets",
  "veilles",
];

export function Navbar({ activeProjectTab, setActiveProjectTab }: NavbarProps) {
  const { scrollToSection, scrollProgress } = useLenisScroll();
  const [activeSection, setActiveSection] = useState<string>("accueil");
  const [projectsPopupOpen, setProjectsPopupOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0,
      }
    );

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setProjectsPopupOpen(false);
  };

  const handleProjectSubClick = (type: "all" | "infrastructure" | "procedure") => {
    setActiveProjectTab(type);
    if (type === "infrastructure") {
      scrollToSection("infrastructures");
    } else {
      scrollToSection("projets");
    }
    setProjectsPopupOpen(false);
  };

  const dockItemClass = (id: string) => {
    const isActive = activeSection === id;
    return `group relative flex items-center gap-2 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-300 cursor-pointer select-none ${
      isActive
        ? "bg-violet-600 text-white shadow-lg shadow-violet-600/35 -translate-y-1 scale-[1.04]"
        : "text-slate-700 hover:text-violet-700 hover:bg-violet-50/90 hover:-translate-y-0.5"
    }`;
  };

  return (
    <>
      {/* Minimal Top Blueprint Status Strip */}
      <div className="fixed top-0 inset-x-0 z-40 pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex items-center justify-between">
          <button
            onClick={() => handleNavClick("accueil")}
            className="pointer-events-auto inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-xs hover:border-violet-300 transition-all cursor-pointer"
          >
            <span className="w-6 h-6 rounded-full bg-violet-600 text-white font-mono text-[11px] font-bold flex items-center justify-center">
              MS
            </span>
            <span className="text-xs font-bold text-slate-900 tracking-tight">
              Mattéo Servanty
            </span>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 font-semibold">
              BTS SIO SISR
            </span>
          </button>

          <div className="pointer-events-auto hidden sm:inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-xs text-[11px] font-mono text-slate-600">
            <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
            <span>TRAME RÉSEAU : {Math.round(scrollProgress * 100)}%</span>
          </div>
        </div>
      </div>

      {/* Floating Bottom macOS / Linear Dock */}
      <nav
        aria-label="Menu du site (Dock)"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-[96vw]"
      >
        {/* Pop-up Submenu for "Mes projets" (opens upwards) */}
        {projectsPopupOpen && (
          <div
            onMouseEnter={() => setProjectsPopupOpen(true)}
            onMouseLeave={() => setProjectsPopupOpen(false)}
            className="absolute bottom-full left-1/2 -translate-x-1/2 pb-3 w-72 z-50 animate-fadeIn"
          >
            <div className="bg-white/95 backdrop-blur-2xl rounded-3xl border border-violet-200 shadow-2xl shadow-violet-950/15 p-2.5 space-y-1.5">
              <div className="px-3 py-1 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-violet-600 font-semibold">
                <span>Mes projets (Sous-menu)</span>
                <span>2 catégories</span>
              </div>

              <button
                onClick={() => handleProjectSubClick("infrastructure")}
                className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                  activeProjectTab === "infrastructure" && activeSection === "projets"
                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/25"
                    : "hover:bg-violet-50 text-slate-800"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    activeProjectTab === "infrastructure" && activeSection === "projets"
                      ? "bg-white/20 text-white"
                      : "bg-violet-100 text-violet-700"
                  }`}
                >
                  <Server className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold capitalize">
                    Infrastructures
                  </div>
                  <div
                    className={`text-[11px] ${
                      activeProjectTab === "infrastructure" &&
                      activeSection === "projets"
                        ? "text-violet-100"
                        : "text-slate-500"
                    }`}
                  >
                    Schémas VLAN, Proxmox, pfSense
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleProjectSubClick("procedure")}
                className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                  activeProjectTab === "procedure" && activeSection === "projets"
                    ? "bg-violet-600 text-white shadow-md shadow-violet-600/25"
                    : "hover:bg-violet-50 text-slate-800"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    activeProjectTab === "procedure" && activeSection === "projets"
                      ? "bg-white/20 text-white"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  <FileCode2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold capitalize">Procédure</div>
                  <div
                    className={`text-[11px] ${
                      activeProjectTab === "procedure" && activeSection === "projets"
                        ? "text-violet-100"
                        : "text-slate-500"
                    }`}
                  >
                    Documentation pas-à-pas &amp; PRA
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Main Dock Bar */}
        <div className="flex items-center gap-1 p-1.5 rounded-3xl bg-white/90 backdrop-blur-2xl border border-slate-200/90 shadow-2xl shadow-violet-950/15 overflow-x-auto no-scrollbar">
          <button
            onClick={() => handleNavClick("accueil")}
            className={dockItemClass("accueil")}
            title="Accueil"
          >
            <Home className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline whitespace-nowrap">Accueil</span>
          </button>

          <button
            onClick={() => handleNavClick("bts-sio")}
            className={dockItemClass("bts-sio")}
            title="BTS SIO"
          >
            <GraduationCap className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline whitespace-nowrap">BTS SIO</span>
          </button>

          <button
            onClick={() => handleNavClick("a-propos")}
            className={dockItemClass("a-propos")}
            title="À Propos de Moi"
          >
            <User className="w-4 h-4 shrink-0" />
            <span className="hidden lg:inline whitespace-nowrap">
              À Propos de Moi
            </span>
          </button>

          <button
            onClick={() => handleNavClick("entreprise")}
            className={dockItemClass("entreprise")}
            title="Entreprise"
          >
            <Building2 className="w-4 h-4 shrink-0" />
            <span className="hidden lg:inline whitespace-nowrap">Entreprise</span>
          </button>

          <button
            onClick={() => handleNavClick("certifications")}
            className={dockItemClass("certifications")}
            title="Mes certifications"
          >
            <Award className="w-4 h-4 shrink-0" />
            <span className="hidden xl:inline whitespace-nowrap">
              Mes certifications
            </span>
          </button>

          <button
            onClick={() => handleNavClick("tcs")}
            className={dockItemClass("tcs")}
            title="TCS (Tableau de synthèse)"
          >
            <FileSpreadsheet className="w-4 h-4 shrink-0" />
            <span className="whitespace-nowrap">TCS</span>
          </button>

          {/* Mes projets with upward pop-up trigger */}
          <div
            onMouseEnter={() => setProjectsPopupOpen(true)}
            onMouseLeave={() => setProjectsPopupOpen(false)}
          >
            <button
              onClick={() => {
                setProjectsPopupOpen(!projectsPopupOpen);
                scrollToSection("infrastructures");
              }}
              className={dockItemClass(
                activeSection === "infrastructures" ? "infrastructures" : "projets"
              )}
              title="Mes projets (Infrastructures & Procédure)"
            >
              <FolderGit2 className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">Mes projets</span>
              <ChevronUp
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  projectsPopupOpen ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <button
            onClick={() => handleNavClick("veilles")}
            className={dockItemClass("veilles")}
            title="Veilles"
          >
            <Rss className="w-4 h-4 shrink-0" />
            <span className="hidden md:inline whitespace-nowrap">Veilles</span>
          </button>
        </div>
      </nav>
    </>
  );
}
