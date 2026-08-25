import fs from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL, fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { buildGrammarOsRelease } from "./build_grammar_os_release.mjs";

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, "..");
function assert(value, message) { if (!value) throw new Error(message); }
function git(args) {
  return execFileSync("git", args, {
    cwd: ROOT,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
}
function meta(source, name) {
  return source.match(new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']+)["']`, "iu"))?.[1] || "";
}

const packageJson = JSON.parse(await fs.readFile(path.join(ROOT, "package.json"), "utf8"));
const packageLock = JSON.parse(await fs.readFile(path.join(ROOT, "package-lock.json"), "utf8"));
const indexSource = await fs.readFile(path.join(ROOT, "index.html"), "utf8");
const readme = await fs.readFile(path.join(ROOT, "README.md"), "utf8");
const headers = await fs.readFile(path.join(ROOT, "_headers"), "utf8");
const version = meta(indexSource, "classical-grammar-os-version");
const release = meta(indexSource, "classical-grammar-os-release");
const build = meta(indexSource, "classical-grammar-os-build");
const styleBuild = indexSource.match(/style\.css\?v=([^"']+)/u)?.[1] || "";
const scriptBuild = indexSource.match(/src\/browser\/main\.mjs\?v=([^"']+)/u)?.[1] || "";

assert(version === packageJson.version, "index and package versions differ");
assert(packageLock.version === version && packageLock.packages?.[""]?.version === version, "package-lock version differs");
assert(readme.includes(`Grammar OS v${version} — ${release}`), "README release differs");
assert(styleBuild === build && scriptBuild === build, "public cache/build identities differ");
assert(indexSource.includes('href="favicon.svg"') && indexSource.includes('href="site.webmanifest"'), "public discovery assets are absent");
assert(indexSource.includes('id="classical-bootstrap-status"'), "visible bootstrap status is absent");
assert(indexSource.includes("Content-Security-Policy") && headers.includes("frame-ancestors 'none'"), "security policy is incomplete");
assert(headers.includes("X-Content-Type-Options: nosniff"), "nosniff header is absent");
assert(!indexSource.includes('href="data:,"') && !indexSource.includes("http://"), "public index retains a placeholder or insecure URL");

for (const name of await fs.readdir(path.join(ROOT, "data"))) {
  if (name.endsWith(".json")) JSON.parse(await fs.readFile(path.join(ROOT, "data", name), "utf8"));
}
JSON.parse(await fs.readFile(path.join(ROOT, "site.webmanifest"), "utf8"));

const runtimeUrl = `${pathToFileURL(path.join(ROOT, "src/runtime/create_runtime.mjs")).href}?launch=${Date.now()}`;
const runtime = await import(runtimeUrl);
const coverage = runtime.assertRuntimeInstallerCoverage();
assert(runtime.RUNTIME_MODULE_PATHS.length === coverage.modulePaths.length, "runtime installer coverage differs");
assert(new Set(runtime.RUNTIME_MODULE_PATHS).size === runtime.RUNTIME_MODULE_PATHS.length, "runtime manifest contains duplicates");
for (const modulePath of runtime.RUNTIME_MODULE_PATHS) {
  await fs.access(path.join(ROOT, modulePath));
}

const result = await buildGrammarOsRelease();
const trackedFiles = new Set(git(["ls-files", "-z"]).split("\0").filter(Boolean));
const untrackedReleaseFiles = result.manifest.files
  .map(item => item.path)
  .filter(file => !trackedFiles.has(file));
assert(untrackedReleaseFiles.length === 0, `release contains untracked files: ${untrackedReleaseFiles.join(", ")}`);
assert(git(["status", "--porcelain"]).trim() === "", "launch verification requires a clean committed worktree");
assert(result.manifest.sourceWorktreeDirty === false, "release manifest records a dirty worktree");
assert(result.manifest.payloadBytes <= 35 * 1024 * 1024, "release payload exceeds 35 MiB");
let gzipTextBytes = 0;
for (const item of result.manifest.files) {
  if (!/\.(?:css|html|js|json|mjs|svg|txt)$/u.test(item.path)) continue;
  gzipTextBytes += gzipSync(await fs.readFile(path.join(result.siteRoot, item.path)), { level: 9 }).byteLength;
}
assert(gzipTextBytes <= 8 * 1024 * 1024, "compressed text payload exceeds 8 MiB");
process.stdout.write([
  `[PASS] Grammar OS v${version} launch gate`,
  `release=${release}`,
  `build=${build}`,
  `runtimeModules=${runtime.RUNTIME_MODULE_PATHS.length}`,
  `files=${result.manifest.fileCount}`,
  `payloadBytes=${result.manifest.payloadBytes}`,
  `gzipTextBytes=${gzipTextBytes}`,
  `site=${result.siteRoot}`,
].join("\n") + "\n");
