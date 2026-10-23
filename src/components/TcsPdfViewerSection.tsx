"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  FileText,
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  Table2,
} from "lucide-react";
import { TCS_COMPETENCIES, TCS_REALISATIONS } from "@/data/portfolio";

export function TcsPdfViewerSection() {
  const [viewMode, setViewMode] = useState<"split" | "pdf" | "matrix">("split");
  const [selectedComp, setSelectedComp] = useState<string>("ALL");

  const pdfPath = "/tcs-matteo-servanty.pdf";

  return (
    <div className="space-y-8 relative z-10">
      {/* Top Action Bar : Mode Switcher + Official PDF Download */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-3xl bg-white border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">
              Document Officiel Épreuve E4 — Tableau de Synthèse
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Fichier cible : public/tcs-matteo-servanty.pdf
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200">
            <button
              onClick={() => setViewMode("split")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "split"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-violet-700"
              }`}
            >
              Vue Combinée
            </button>
            <button
              onClick={() => setViewMode("pdf")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "pdf"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-violet-700"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Lecteur PDF Plein</span>
            </button>
            <button
              onClick={() => setViewMode("matrix")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                viewMode === "matrix"
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-violet-700"
              }`}
            >
              <Table2 className="w-3.5 h-3.5" />
              <span>Grille Interactive</span>
            </button>
          </div>

          <a
            href={pdfPath}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-violet-600 text-white text-xs font-semibold transition-colors shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Télécharger le PDF</span>
          </a>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`grid gap-8 ${
          viewMode === "split" ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"
        }`}
      >
        {/* Embedded PDF Viewer Box */}
        {(viewMode === "split" || viewMode === "pdf") && (
          <div
            className={`${
              viewMode === "split" ? "lg:col-span-5" : "w-full"
            } flex flex-col rounded-3xl bg-white border border-slate-200/90 shadow-md overflow-hidden`}
          >
            <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-mono">
                <FileText className="w-4 h-4 text-violet-400" />
                <span>Aperçu PDF E4 — tcs-matteo-servanty.pdf</span>
              </div>
              <a
                href={pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-violet-300 hover:text-white font-mono"
              >
                <span>Ouvrir</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="relative bg-slate-100 h-[520px] flex flex-col">
              <object
                data={pdfPath}
                type="application/pdf"
                className="w-full h-full"
              >
                {/* Fallback UI when user hasn't dropped the PDF file yet */}
                <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="w-16 h-16 rounded-3xl bg-violet-100 text-violet-700 flex items-center justify-center shadow-inner">
                    <FileSpreadsheet className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5 max-w-md">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Emplacement PDF Prêt</span>
                    </div>
                    <h4 className="text-base font-bold text-slate-900">
                      Dépose ton fichier PDF officiel dans le dossier{" "}
                      <code className="px-1.5 py-0.5 rounded bg-violet-100 text-violet-800 font-mono text-xs">
                        public/
                      </code>
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Nomme ton fichier{" "}
                      <code className="font-mono font-semibold text-slate-800">
                        public/tcs-matteo-servanty.pdf
                      </code>{" "}
                      et il s&apos;affichera automatiquement dans ce lecteur intégré le jour de ton oral E4. En attendant, la matrice interactive ci-contre présente tes compétences !
                    </p>
                  </div>
                </div>
              </object>
            </div>
          </div>
        )}

        {/* Interactive Official BTS SIO Matrix */}
        {(viewMode === "split" || viewMode === "matrix") && (
          <div
            className={`${
              viewMode === "split" ? "lg:col-span-7" : "w-full"
            } flex flex-col space-y-4`}
          >
            {/* Filter by Block B1.1 - B1.6 */}
            <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3.5 rounded-2xl border border-slate-200/90">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Filtrer par compétence :
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setSelectedComp("ALL")}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                    selectedComp === "ALL"
                      ? "bg-violet-600 text-white"
                      : "bg-slate-100 text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                  }`}
                >
                  Toutes
                </button>
                {TCS_COMPETENCIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setSelectedComp(c.code)}
                    title={c.title}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                      selectedComp === c.code
                        ? "bg-violet-600 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-violet-50 hover:text-violet-700"
                    }`}
                  >
                    {c.code}
                  </button>
                ))}
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto rounded-3xl border border-slate-200/90 bg-white shadow-sm">
              <table className="w-full text-left border-collapse min-w-[680px]">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs font-mono">
                    <th className="py-3.5 px-4 w-[46%]">
                      Réalisations Professionnelles (SISR)
                    </th>
                    <th className="py-3.5 px-2 text-center w-[12%]">Période</th>
                    {TCS_COMPETENCIES.map((c) => (
                      <th
                        key={c.code}
                        className="py-3.5 px-1.5 text-center text-violet-300 font-bold"
                        title={c.title}
                      >
                        {c.code}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs sm:text-sm">
                  {(["school", "company1", "company2"] as const).map((cat) => {
                    const catTitle =
                      cat === "school"
                        ? "En centre de formation (Ateliers Professionnels SISR)"
                        : cat === "company1"
                        ? "En milieu professionnel — 1re année"
                        : "En milieu professionnel — 2e année";

                    const rows = TCS_REALISATIONS.filter(
                      (r) =>
                        r.category === cat &&
                        (selectedComp === "ALL" ||
                          r.competencies.includes(selectedComp))
                    );

                    if (rows.length === 0) return null;

                    return (
                      <React.Fragment key={cat}>
                        <tr className="bg-violet-50/90">
                          <td
                            colSpan={8}
                            className="py-2 px-4 text-[11px] font-mono font-bold uppercase tracking-wider text-violet-800"
                          >
                            {catTitle}
                          </td>
                        </tr>
                        {rows.map((row) => (
                          <tr
                            key={row.id}
                            className="hover:bg-slate-50/90 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                                {row.title}
                              </div>
                              <div className="text-[11px] text-slate-500 mt-0.5">
                                {row.context}
                              </div>
                            </td>
                            <td className="py-3 px-2 text-center font-mono text-[11px] text-slate-600">
                              {row.period}
                            </td>
                            {TCS_COMPETENCIES.map((c) => {
                              const active = row.competencies.includes(c.code);
                              return (
                                <td
                                  key={c.code}
                                  className="py-3 px-1.5 text-center"
                                >
                                  {active ? (
                                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-lg bg-violet-600 text-white font-mono text-xs font-bold shadow-2xs">
                                      ✓
                                    </span>
                                  ) : (
                                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-200" />
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
