import { NextResponse } from "next/server";

export const DEFAULT_DRIVE_FOLDER_ID = "1D5jXhFzvpnm1oPK0MVo0I0ncfuwlh8IA";

export interface DriveProcedureFile {
  id: string;
  name: string;
  cleanTitle: string;
  category: string;
  isFolder: boolean;
  mimeType: string;
  modifiedTime: string;
  previewUrl: string;
  viewUrl: string;
  downloadUrl?: string;
}

function extractFolderId(input: string): string {
  const trimmed = input.trim();
  const match = trimmed.match(/\/folders\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) return match[1];
  return trimmed;
}

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .normalize("NFC");
}

function formatCleanTitle(
  name: string,
  isFolder: boolean
): { cleanTitle: string; category: string } {
  const withoutExt = name.replace(/\.(pdf|docx?|pptx?|xlsx?|mp4|mkv)$/i, "");
  let category = isFolder ? "Dossier Drive" : "Procédure PDF";

  if (/pfsense|firewall|pare-feu|wireguard|vpn/i.test(withoutExt)) {
    category = "Pare-feu & Sécurité";
  } else if (/planet|switch|vlan|cisco|reseau/i.test(withoutExt)) {
    category = "Switch & VLAN";
  } else if (/proxmox|isolation|vm|lxc|virtualisation/i.test(withoutExt)) {
    category = "Virtualisation Proxmox";
  } else if (/ad|active\s*directory|windows|debian|linux/i.test(withoutExt)) {
    category = "Systèmes & AD";
  } else if (/vid[eé]o|tuto/i.test(withoutExt) && isFolder) {
    category = "Dossier Vidéos Tutos";
  }

  const cleaned = withoutExt.replace(/[_]+/g, " : ").trim();
  return { cleanTitle: cleaned, category };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const queryFolder = searchParams.get("folderId");
  const rawFolder =
    queryFolder ||
    process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID ||
    DEFAULT_DRIVE_FOLDER_ID;
  const folderId = extractFolderId(rawFolder);

  try {
    const publicFolderUrl = `https://drive.google.com/embeddedfolderview?id=${folderId}#list`;
    const res = await fetch(publicFolderUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      },
      next: { revalidate: 30 },
    });

    if (res.ok) {
      const html = await res.text();
      const files: DriveProcedureFile[] = [];
      const seenIds = new Set<string>();

      // Match each flip-entry block with its href, title, and last modified date
      const entryRegex =
        /<div class="flip-entry" id="entry-([a-zA-Z0-9_-]+)"[\s\S]*?<a href="([^"]+)"[\s\S]*?<div class="flip-entry-title">([^<]+)<\/div><\/a><\/div><div class="flip-entry-last-modified"><div>([^<]*)<\/div>/g;

      let match: RegExpExecArray | null;
      while ((match = entryRegex.exec(html)) !== null) {
        const entryId = match[1];
        const href = match[2];
        const rawTitle = decodeHtmlEntities(match[3]).trim();
        const modifiedTime = match[4].trim() || "Drive Sync";

        if (entryId && rawTitle && !seenIds.has(entryId)) {
          seenIds.add(entryId);
          const isFolder = href.includes("/drive/folders/");
          const { cleanTitle, category } = formatCleanTitle(rawTitle, isFolder);

          files.push({
            id: entryId,
            name: rawTitle,
            cleanTitle,
            category,
            isFolder,
            mimeType: isFolder
              ? "application/vnd.google-apps.folder"
              : "application/pdf",
            modifiedTime,
            previewUrl: isFolder
              ? `https://drive.google.com/embeddedfolderview?id=${entryId}#grid`
              : `https://drive.google.com/file/d/${entryId}/preview`,
            viewUrl: isFolder
              ? `https://drive.google.com/drive/folders/${entryId}`
              : `https://drive.google.com/file/d/${entryId}/view`,
            downloadUrl: isFolder
              ? undefined
              : `https://drive.google.com/uc?export=download&id=${entryId}`,
          });
        }
      }

      // Sort PDFs first, then sub-folders
      files.sort((a, b) => Number(a.isFolder) - Number(b.isFolder));

      return NextResponse.json({
        configured: true,
        folderId,
        mode: "public_folder_sync",
        files,
      });
    }
  } catch {
    // Fallback below
  }

  return NextResponse.json({
    configured: true,
    folderId,
    mode: "embed_fallback",
    files: [],
  });
}
