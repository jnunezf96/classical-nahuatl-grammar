"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "../..");

function run() {
    const s = createSuite("classical_grammar_fact_visible_credit_boundary");
    const pointer = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/active-exact-observation-manifest.json"),
        "utf8"
    ));
    const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, pointer.activeManifest), "utf8"));
    const userInterfaceSource = [
        "src/ui/composer/composer.mjs",
        "src/ui/panels/panels.mjs",
        "src/ui/rendering/rendering.mjs",
        "src/ui/shell/classical_shell.mjs",
    ].map((relativePath) => fs.readFileSync(path.join(ROOT, relativePath), "utf8")).join("\n");

    s.eq("only browser-delivered grammar facts receive visible completion credit", {
        activeVersion: manifest.version,
        activeExactObservations: manifest.counts.atoms,
        preparedStatus: manifest.preparedRuntimeFacts.status,
        preparedCount: manifest.preparedRuntimeFacts.atomCount,
        rollbackManifest: pointer.rollbackManifest,
        uiConsumesGrammarFactProjection: /CanvasGrammarFactProjection|presentPreparedClassical/u.test(userInterfaceSource),
    }, {
        activeVersion: "v20260810-visible-grammar-facts-checkpoint-012",
        activeExactObservations: 909,
        preparedStatus: "prepared-runtime-ready-not-exactly-observed",
        preparedCount: 500,
        rollbackManifest: "docs/proof-refresh/v20260810-visible-credit-correction-011/manifest.json",
        uiConsumesGrammarFactProjection: true,
    });
    return s;
}

module.exports = { run };
