"use client";

import React, { useState } from "react";
import {
  X,
  Server,
  FileCode2,
  CheckCircle2,
  Terminal,
  Network,
  Layers,
  Copy,
  Check,
} from "lucide-react";
import { ProjectItem } from "@/data/portfolio";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!project) return null;

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[88vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-violet-100 text-violet-700 border border-violet-200">
              {project.type === "infrastructure" ? (
                <>
                  <Server className="w-3.5 h-3.5" />
                  <span>Dossier d&apos;Infrastructure SISR</span>
                </>
              ) : (
                <>
                  <FileCode2 className="w-3.5 h-3.5" />
                  <span>Procédure Technique d&apos;Exploitation</span>
                </>
              )}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {project.title}
            </h3>
            <p className="text-sm text-slate-600">{project.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fermer la fenêtre"
            className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-violet-100 hover:text-violet-700 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Environment & Competencies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-500 mb-2.5">
              <Layers className="w-4 h-4 text-violet-600" />
              <span>Environnement Technique</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.environment.map((env) => (
                <span
                  key={env}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700"
                >
                  {env}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-violet-50/60 border border-violet-200/80">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-violet-700 mb-2.5">
              <CheckCircle2 className="w-4 h-4 text-violet-600" />
              <span>Compétences du TCS mobilisées (E4)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.competencies.map((code) => (
                <span
                  key={code}
                  className="px-3 py-1 rounded-lg bg-violet-600 text-white text-xs font-mono font-semibold shadow-xs"
                >
                  Bloc {code}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Architecture & VLAN Table if present */}
        {project.architecture && (
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
              <Network className="w-4 h-4 text-violet-600" />
              <span>Topologie & Plan d&apos;adressage Réseau</span>
            </div>
            <p className="text-sm text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 font-mono text-xs">
              {project.architecture.topologySummary}
            </p>

            {project.architecture.vlans && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 font-mono text-xs">
                      <th className="py-2 px-3">VLAN ID</th>
                      <th className="py-2 px-3">Nom / Zone</th>
                      <th className="py-2 px-3">Sous-réseau CIDR</th>
                      <th className="py-2 px-3">Passerelle (Gateway)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/60 bg-white">
                    {project.architecture.vlans.map((v) => (
                      <tr key={v.id} className="hover:bg-violet-50/40">
                        <td className="py-2 px-3 font-mono font-semibold text-violet-700">
                          {v.id}
                        </td>
                        <td className="py-2 px-3 font-medium text-slate-800">{v.name}</td>
                        <td className="py-2 px-3 font-mono text-slate-600">{v.subnet}</td>
                        <td className="py-2 px-3 font-mono text-slate-600">{v.gateway}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Steps / Procedure */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-violet-600" />
            <span>
              {project.type === "infrastructure"
                ? "Étapes de déploiement & Configuration"
                : "Déroulé pas-à-pas de la Procédure"}
            </span>
          </h4>

          <div className="space-y-4">
            {project.steps.map((step, idx) => (
              <div
                key={step.stepNumber}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-violet-100 text-violet-700 font-mono text-xs font-bold">
                    {step.stepNumber}
                  </span>
                  <h5 className="font-semibold text-slate-900 text-sm sm:text-base">
                    {step.title}
                  </h5>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
                {step.commandOrConfig && (
                  <div className="relative rounded-xl bg-slate-900 text-slate-100 p-4 font-mono text-xs overflow-x-auto">
                    <button
                      onClick={() => handleCopy(step.commandOrConfig!, idx)}
                      className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 hover:bg-violet-600 text-slate-200 text-[11px] transition-colors cursor-pointer"
                    >
                      {copiedIndex === idx ? (
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
                    <pre className="pr-16 leading-relaxed">{step.commandOrConfig}</pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Results & Validation */}
        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2.5">
          <div className="text-sm font-bold text-emerald-950 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Résultats obtenus & Validation en production</span>
          </div>
          <ul className="space-y-1.5">
            {project.results.map((res, i) => (
              <li key={i} className="text-sm text-emerald-900 flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>{res}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
