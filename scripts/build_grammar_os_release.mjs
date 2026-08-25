import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = path.resolve(SCRIPT_DIR, "..");
const DEVELOPMENT_ROOT = path.resolve(WEB_ROOT, "../Classical_Nahuatl_Grammar");
const ROOT_FILES = Object.freeze([
  "index.html", "style.css", "favicon.svg", "site.webmanifest",
  "robots.txt", "_headers", "404.html", "privacy.html",
  "google0cd5aa7f57651321.html", ".well-known/security.txt",
]);
const RUNTIME_DIRECTORIES = Object.freeze([
  "data", "src/appendices", "src/application", "src/bootstrap",
  "src/browser", "src/core", "src/lessons", "src/runtime", "src/ui",
]);
const FORBIDDEN_PREFIXES = Object.freeze([
  ".git/", ".instruction-backup-", "docs/", "scripts/", "src/node/", "src/tests/",
]);

function meta(indexSource, name) {
  return indexSource.match(
    new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']+)["']`, "iu")
  )?.[1] || "";
}

function gitValue(args) {
  try {
    return execFileSync("git", args, {
      cwd: WEB_ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
  } catch {
    return "";
  }
}

async function copy(relativePath, siteRoot) {
  const source = path.join(WEB_ROOT, relativePath);
  const destination = path.join(siteRoot, relativePath);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.cp(source, destination, {
    recursive: true,
    filter: entry => path.basename(entry) !== ".DS_Store",
  });
}

async function filesUnder(root, current = root) {
  const result = [];
  for (const entry of await fs.readdir(current, { withFileTypes: true })) {
    const absolutePath = path.join(current, entry.name);
    if (entry.isDirectory()) result.push(...await filesUnder(root, absolutePath));
    else if (entry.isFile()) result.push(path.relative(root, absolutePath).replaceAll(path.sep, "/"));
    else throw new Error(`Release contains a link or special file: ${absolutePath}`);
  }
  return result.sort();
}

async function record(siteRoot, relativePath) {
  const content = await fs.readFile(path.join(siteRoot, relativePath));
  return {
    path: relativePath,
    bytes: content.byteLength,
    sha256: createHash("sha256").update(content).digest("hex"),
  };
}

export async function buildGrammarOsRelease({ outputRoot = "" } = {}) {
  const packageJson = JSON.parse(await fs.readFile(path.join(WEB_ROOT, "package.json"), "utf8"));
  const indexSource = await fs.readFile(path.join(WEB_ROOT, "index.html"), "utf8");
  const version = meta(indexSource, "classical-grammar-os-version");
  const release = meta(indexSource, "classical-grammar-os-release");
  const build = meta(indexSource, "classical-grammar-os-build");
  if (!version || packageJson.version !== version || !release || !build) {
    throw new Error("Grammar OS release metadata is incomplete or version-mismatched.");
  }
  const releaseRoot = outputRoot
    ? path.resolve(outputRoot)
    : path.join(DEVELOPMENT_ROOT, "reports/generated/grammar_os_release", `v${version}`);
  const siteRoot = path.join(releaseRoot, "site");
  await fs.rm(siteRoot, { recursive: true, force: true });
  await fs.mkdir(siteRoot, { recursive: true });
  for (const relativePath of [...ROOT_FILES, ...RUNTIME_DIRECTORIES]) {
    await copy(relativePath, siteRoot);
  }
  const shippedFiles = await filesUnder(siteRoot);
  const forbidden = shippedFiles.filter(file => FORBIDDEN_PREFIXES.some(
    prefix => file === prefix.replace(/\/$/u, "") || file.startsWith(prefix)
  ));
  if (forbidden.length) throw new Error(`Development files entered the release: ${forbidden.join(", ")}`);
  const records = [];
  for (const relativePath of shippedFiles) records.push(await record(siteRoot, relativePath));
  const manifest = {
    schemaVersion: 1,
    product: "Grammar OS",
    version,
    release,
    build,
    generatedAt: new Date().toISOString(),
    sourceCommit: gitValue(["rev-parse", "HEAD"]),
    sourceWorktreeDirty: Boolean(gitValue(["status", "--porcelain"])),
    fileCount: records.length + 1,
    payloadBytes: records.reduce((sum, item) => sum + item.bytes, 0),
    files: records,
  };
  await fs.writeFile(
    path.join(siteRoot, "release-manifest.json"),
    `${JSON.stringify(manifest, null, 2)}\n`
  );
  return { releaseRoot, siteRoot, manifest };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const result = await buildGrammarOsRelease({ outputRoot: process.argv[2] || "" });
  process.stdout.write(`[PASS] Grammar OS v${result.manifest.version}: ${result.manifest.fileCount} files\n${result.siteRoot}\n`);
}
