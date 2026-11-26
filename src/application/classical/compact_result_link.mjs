const PREFIX = "sgr1";
const MAX_ADDRESS = 16000;
const MAX_JSON_BYTES = 262144;

async function compress(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  if (bytes.length > MAX_JSON_BYTES) throw new Error("Result recipe too large");
  const stream = new Blob([bytes]).stream().pipeThrough(new CompressionStream("deflate"));
  const packed = new Uint8Array(await new Response(stream).arrayBuffer());
  return btoa(Array.from(packed, byte => String.fromCharCode(byte)).join(""))
    .replaceAll("+", "-").replaceAll("/", "_").replace(/=+$/, "");
}

async function expand(segment) {
  if (!/^[A-Za-z0-9_-]+$/.test(segment)) throw new Error("Invalid Result segment");
  const bytes = Uint8Array.from(atob(segment.replaceAll("-", "+").replaceAll("_", "/")), ch => ch.charCodeAt(0));
  const reader = new Blob([bytes]).stream().pipeThrough(new DecompressionStream("deflate")).getReader();
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let text = "", length = 0;
  try {
    for (;;) {
      const {done, value} = await reader.read();
      if (done) break;
      length += value.length;
      if (length > MAX_JSON_BYTES) throw new Error("Expanded Result segment too large");
      text += decoder.decode(value, {stream:true});
    }
    return JSON.parse(text + decoder.decode());
  } finally {
    await reader.cancel().catch(() => {});
  }
}

export function isCompactResultAddress(address) {
  return typeof address === "string" && address.startsWith(PREFIX + "/");
}

export async function encodeCompactResultAddress(recipe) {
  if (!recipe || recipe.kind !== "classical-grammar-result-reload-recipe" || recipe.version !== 1
    || recipe.roots?.result !== recipe.nodes?.length - 1) return null;
  const result = recipe.nodes.at(-1);
  // Dependencies precede the operation. A verbal chain can also carry its
  // initial build separately from the operations that continue it.
  const steps = result.type === "vnc" ? result.recipe.steps : null;
  const chained = steps?.length > 1;
  const source = { dependencies: recipe.nodes.slice(0,-1) };
  let grammar = result;
  if (chained) {
    source.priorBuild = steps[0];
    grammar = {...result, recipe:{...result.recipe, steps:steps.slice(1)}};
  } else if (result.source && typeof result.source === "object") {
    const {source: lexicalSource, ...operation} = result;
    source.lexicalSource = lexicalSource;
    grammar = operation;
  }
  const segments = await Promise.all([compress(source), compress(grammar)]);
  const address = [PREFIX, ...segments, recipe.roots.result.toString(36)].join("/");
  return address.length <= MAX_ADDRESS ? address : null;
}

export async function decodeCompactResultAddress(address) {
  if (!isCompactResultAddress(address) || address.length > MAX_ADDRESS) return null;
  const parts = address.split("/");
  if (parts.length !== 4 || !/^[0-9a-z]{1,2}$/.test(parts[3])) return null;
  try {
    const [source, grammar] = await Promise.all([expand(parts[1]), expand(parts[2])]);
    const root = Number.parseInt(parts[3], 36);
    if (!source || !Array.isArray(source.dependencies)
      || root !== source.dependencies.length || root >= 128
      || !grammar || typeof grammar !== "object" || Array.isArray(grammar)) return null;
    if (Object.hasOwn(source, "priorBuild")) {
      if (grammar.type !== "vnc" || !Array.isArray(grammar.recipe?.steps)) return null;
      grammar.recipe.steps.unshift(source.priorBuild);
    }
    if (Object.hasOwn(source, "lexicalSource")) {
      if (Object.hasOwn(grammar, "source")) return null;
      grammar.source = source.lexicalSource;
    }
    return {kind:"classical-grammar-result-reload-recipe", version:1, nodes:[...source.dependencies, grammar], roots:{result:root}};
  } catch { return null; }
}
