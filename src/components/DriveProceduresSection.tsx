"use client";

import React, { useEffect, useState } from "react";
import {
  FolderSync,
  FileText,
  FolderOpen,
  ExternalLink,
  Download,
  RefreshCw,
  Eye,
  X,
  ArrowLeft,
} from "lucide-react";
import {
  DEFAULT_DRIVE_FOLDER_ID,
  type DriveProcedureFile,
} from "@/app/api/drive-procedures/route";

const STATIC_FALLBACK_DRIVE_FILES: DriveProcedureFile[] = [
  {
    id: "1lFz6f3LA9eaGTA_ZJFS9C2HyhLij8udp",
    name: "Procédure d'Isolation Multi-Promo Proxmox VE.pdf",
    cleanTitle: "Procédure d'Isolation Multi-Promo Proxmox VE",
    category: "Virtualisation Proxmox",
    isFolder: false,
    mimeType: "application/pdf",
    modifiedTime: "15:18",
    previewUrl:
      "https://drive.google.com/file/d/1lFz6f3LA9eaGTA_ZJFS9C2HyhLij8udp/preview",
    viewUrl:
      "https://drive.google.com/file/d/1lFz6f3LA9eaGTA_ZJFS9C2HyhLij8udp/view",
    downloadUrl:
      "https://drive.google.com/uc?export=download&id=1lFz6f3LA9eaGTA_ZJFS9C2HyhLij8udp",
  },
  {
    id: "1JnsiWGZGoXUjs0lra1ARo4c5nr9ZC0OS",
    name: "Tutoriel pfSense pour Débutants.pdf",
    cleanTitle: "Tutoriel pfSense pour Débutants",
    category: "Pare-feu & Sécurité",
    isFolder: false,
    mimeType: "application/pdf",
    modifiedTime: "15:18",
    previewUrl:
      "https://drive.google.com/file/d/1JnsiWGZGoXUjs0lra1ARo4c5nr9ZC0OS/preview",
    viewUrl:
      "https://drive.google.com/file/d/1JnsiWGZGoXUjs0lra1ARo4c5nr9ZC0OS/view",
    downloadUrl:
      "https://drive.google.com/uc?export=download&id=1JnsiWGZGoXUjs0lra1ARo4c5nr9ZC0OS",
  },
  {
    id: "1sw1mQVKdhvqWMPkp2ru_uKbvDwaUnUrF",
    name: "Tutoriel Switch Planet _ Configuration VLAN.pdf",
    cleanTitle: "Tutoriel Switch Planet : Configuration VLAN",
    category: "Switch & VLAN",
    isFolder: false,
    mimeType: "application/pdf",
    modifiedTime: "15:18",
    previewUrl:
      "https://drive.google.com/file/d/1sw1mQVKdhvqWMPkp2ru_uKbvDwaUnUrF/preview",
    viewUrl:
      "https://drive.google.com/file/d/1sw1mQVKdhvqWMPkp2ru_uKbvDwaUnUrF/view",
    downloadUrl:
      "https://drive.google.com/uc?export=download&id=1sw1mQVKdhvqWMPkp2ru_uKbvDwaUnUrF",
  },
  {
    id: "1IjkXc9x9YiPA4jLw_w9lYsnSMuA-v6_b",
    name: "IMAGE PROCEDURE AD1EX",
    cleanTitle: "IMAGE PROCEDURE AD1EX",
    category: "Systèmes & AD",
    isFolder: true,
    mimeType: "application/vnd.google-apps.folder",
    modifiedTime: "12 févr.",
    previewUrl:
      "https://drive.google.com/embeddedfolderview?id=1IjkXc9x9YiPA4jLw_w9lYsnSMuA-v6_b#grid",
    viewUrl:
      "https://drive.google.com/drive/folders/1IjkXc9x9YiPA4jLw_w9lYsnSMuA-v6_b",
  },
  {
    id: "12S_K1B_rNBNZ20wVFrtttB1WzqDMBLxG",
    name: "Vidéos tutos",
    cleanTitle: "Vidéos tutos",
    category: "Dossier Vidéos Tutos",
    isFolder: true,
    mimeType: "application/vnd.google-apps.folder",
    modifiedTime: "12 févr.",
    previewUrl:
      "https://drive.google.com/embeddedfolderview?id=12S_K1B_rNBNZ20wVFrtttB1WzqDMBLxG#grid",
    viewUrl:
      "https://drive.google.com/drive/folders/12S_K1B_rNBNZ20wVFrtttB1WzqDMBLxG",
  },
];

export function DriveProceduresSection() {
  const [currentFolderId, setCurrentFolderId] = useState<string>(
    DEFAULT_DRIVE_FOLDER_ID
  );
  const [folderHistory, setFolderHistory] = useState<
    { id: string; title: string }[]
  >([{ id: DEFAULT_DRIVE_FOLDER_ID, title: "Procédures (Racine)" }]);
  const [driveFiles, setDriveFiles] = useState<DriveProcedureFile[]>(
    STATIC_FALLBACK_DRIVE_FILES
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDriveFile, setSelectedDriveFile] =
    useState<DriveProcedureFile | null>(null);

  const fetchDriveFolder = async (folderIdToLoad: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/drive-procedures?folderId=${encodeURIComponent(folderIdToLoad)}`
      );
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.files) && data.files.length > 0) {
          setDriveFiles(data.files);
          return;
        }
      }
      if (folderIdToLoad === DEFAULT_DRIVE_FOLDER_ID) {
        setDriveFiles(STATIC_FALLBACK_DRIVE_FILES);
      } else {
        setDriveFiles([]);
      }
    } catch {
      if (folderIdToLoad === DEFAULT_DRIVE_FOLDER_ID) {
        setDriveFiles(STATIC_FALLBACK_DRIVE_FILES);
      } else {
        setDriveFiles([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriveFolder(currentFolderId);
  }, [currentFolderId]);

  const handleOpenSubfolder = (folder: DriveProcedureFile) => {
    setFolderHistory((prev) => [
      ...prev,
      { id: folder.id, title: folder.cleanTitle },
    ]);
    setCurrentFolderId(folder.id);
  };

  const handleGoBack = () => {
    if (folderHistory.length <= 1) return;
    const nextHistory = folderHistory.slice(0, -1);
    setFolderHistory(nextHistory);
    setCurrentFolderId(nextHistory[nextHistory.length - 1].id);
  };

  return (
    <section
      id="projets"
      className="relative bg-slate-950 text-white z-20 rounded-[2.5rem] sm:rounded-[3.5rem] mx-2 sm:mx-4 py-20 sm:py-28 px-4 sm:px-6 lg:px-8 shadow-2xl border border-violet-500/30"
    >
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header + Live Google Drive Sync Status */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-400/30 text-violet-300 font-mono text-xs font-bold">
              <FolderSync
                className={`w-3.5 h-3.5 text-emerald-400 ${
                  loading ? "animate-spin" : ""
                }`}
              />
              <span>
                NODE-06B // MES PROCÉDURES (SYNCHRONISÉES EN DIRECT DEPUIS MON DRIVE)
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight">
              Mes Procédures{" "}
              <span className="font-serif italic font-normal text-violet-400">
                Google Drive.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Synchronisation automatique avec mon dossier Google Drive{" "}
              <strong className="text-white">« Procédures »</strong> : chaque
              nouveau tutoriel PDF ou dossier que j&apos;ajoute sur mon Drive
              remonte automatiquement ici (Proxmox VE, pfSense, Switch Planet,
              AD...).
            </p>
          </div>

          {/* Sync & Open Drive Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-end">
            {folderHistory.length > 1 && (
              <button
                type="button"
                onClick={handleGoBack}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold transition-all cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Retour au dossier parent</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => fetchDriveFolder(currentFolderId)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
              />
              <span>Actualiser</span>
            </button>

            <a
              href={`https://drive.google.com/drive/folders/${currentFolderId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-mono text-xs font-bold shadow-lg shadow-violet-600/30 transition-all"
            >
              <span>Ouvrir mon Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 rounded-[2rem] bg-white/[0.04] border border-white/10 animate-pulse p-7 flex flex-col justify-between"
              >
                <div className="w-24 h-6 rounded-full bg-white/10" />
                <div className="space-y-2">
                  <div className="w-3/4 h-6 rounded bg-white/10" />
                  <div className="w-1/2 h-4 rounded bg-white/5" />
                </div>
                <div className="w-full h-8 rounded-xl bg-white/5" />
              </div>
            ))}
          </div>
        )}

        {/* Live Google Drive Cards Grid */}
        {!loading && driveFiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {driveFiles.map((file, idx) => (
              <article
                key={file.id}
                onClick={() =>
                  file.isFolder
                    ? handleOpenSubfolder(file)
                    : setSelectedDriveFile(file)
                }
                className="group rounded-[2rem] border border-white/15 bg-white/[0.05] hover:bg-violet-600 hover:border-violet-400 p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between min-h-[270px] cursor-pointer shadow-xl hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-serif italic text-5xl leading-none text-violet-400 group-hover:text-white/40 transition-colors">
                      0{idx + 1}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-wider font-bold ${
                        file.isFolder
                          ? "bg-amber-500/20 text-amber-300 group-hover:bg-white/20 group-hover:text-white"
                          : "bg-violet-500/25 text-violet-200 group-hover:bg-white/20 group-hover:text-white"
                      }`}
                    >
                      {file.isFolder ? (
                        <FolderOpen className="w-3.5 h-3.5" />
                      ) : (
                        <FileText className="w-3.5 h-3.5" />
                      )}
                      <span>{file.category}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {file.cleanTitle}
                  </h3>

                  <p className="text-xs font-mono text-slate-400 group-hover:text-violet-100 truncate">
                    {file.name} • Modifié : {file.modifiedTime}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 group-hover:border-white/25 flex items-center justify-between text-xs font-mono font-bold text-violet-300 group-hover:text-white">
                  <span className="inline-flex items-center gap-2">
                    {file.isFolder ? (
                      <>
                        <FolderOpen className="w-4 h-4" />
                        <span>Explorer ce sous-dossier</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        <span>Lire le PDF en direct</span>
                      </>
                    )}
                  </span>
                  <span>↗</span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Fallback embedded view if folder has special permissions */}
        {!loading && driveFiles.length === 0 && (
          <div className="rounded-3xl overflow-hidden border border-violet-500/40 bg-white h-[480px]">
            <iframe
              src={`https://drive.google.com/embeddedfolderview?id=${currentFolderId}#grid`}
              title="Dossier Google Drive Procédures"
              className="w-full h-full border-0"
            />
          </div>
        )}
      </div>

      {/* Modal Preview for any Google Drive PDF clicked */}
      {selectedDriveFile && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedDriveFile(null)}
        >
          <div
            data-lenis-prevent
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl h-[86vh] bg-slate-900 border border-violet-500/40 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
          >
            <div className="px-6 py-4 bg-slate-950 border-b border-white/10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <FileText className="w-5 h-5 text-violet-400 shrink-0" />
                <div className="truncate">
                  <h4 className="text-sm sm:text-base font-bold text-white truncate">
                    {selectedDriveFile.cleanTitle}
                  </h4>
                  <p className="text-xs font-mono text-slate-400 truncate">
                    {selectedDriveFile.name} • Synchronisé depuis Google Drive
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {selectedDriveFile.downloadUrl && (
                  <a
                    href={selectedDriveFile.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-violet-600 text-xs font-mono text-white transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Télécharger PDF</span>
                  </a>
                )}
                <a
                  href={selectedDriveFile.viewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-mono text-white transition-colors"
                >
                  <span>Ouvrir sur Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedDriveFile(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 bg-slate-950">
              <iframe
                src={selectedDriveFile.previewUrl}
                title={selectedDriveFile.cleanTitle}
                className="w-full h-full border-0"
                allow="autoplay"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
