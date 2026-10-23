import fs from "fs";
import path from "path";
import { compile, optimize, Polyfills } from "@tailwindcss/node";
import { Scanner } from "@tailwindcss/oxide";

const rootDir = process.cwd();
const inputPath = path.resolve(rootDir, "src/app/tailwind-source.css");
const outputPath = path.resolve(rootDir, "src/app/globals.css");

async function main() {
  const css = fs.readFileSync(inputPath, "utf8");
  const compiler = await compile(css, {
    from: inputPath,
    base: path.dirname(inputPath),
    shouldRewriteUrls: true,
    onDependency: () => {},
    polyfills: Polyfills.All,
  });

  const scanner = new Scanner({
    sources: [
      {
        base: path.resolve(rootDir, "src"),
        pattern: "**/*",
        negated: false,
      },
    ],
  });

  const candidates = [...scanner.scan()];
  const built = compiler.build(candidates);
  const optimized = optimize(built, { minify: false }).code;
  fs.writeFileSync(outputPath, optimized, "utf8");
  console.log(`Compiled Tailwind v4 CSS (${candidates.length} candidates) -> src/app/globals.css`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
