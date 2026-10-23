import fs from "fs";
import path from "path";

const rootDir = process.cwd();
const outDir = path.resolve(rootDir, "out");
const publicDir = path.resolve(rootDir, "public");
const nextAppDir = path.resolve(rootDir, ".next/server/app");
const nextStaticDir = path.resolve(rootDir, ".next/static");

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

// 1. Copy public assets (PDFs, SVGs, etc.)
copyRecursive(publicDir, outDir);

// 2. Copy prerendered HTML pages
if (fs.existsSync(path.join(nextAppDir, "index.html"))) {
  fs.copyFileSync(
    path.join(nextAppDir, "index.html"),
    path.join(outDir, "index.html")
  );
}
if (fs.existsSync(path.join(nextAppDir, "_not-found.html"))) {
  fs.copyFileSync(
    path.join(nextAppDir, "_not-found.html"),
    path.join(outDir, "404.html")
  );
}

// 3. Copy _next/static assets
copyRecursive(nextStaticDir, path.join(outDir, "_next/static"));

console.log(`Static export ready for OVH in: ${outDir}`);
