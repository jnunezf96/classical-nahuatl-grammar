"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    checkRuntimeManifest,
    parseIndexScriptPaths,
} = require("../../scripts/lib/runtime_manifest_check");
const {
    currentBrowserCacheKey,
    usesBrowserCacheKey,
} = require("./helpers/browser_cache_chain");

const ROOT = path.resolve(__dirname, "../..");
const CANONICAL_RUNTIME_MODULES = Object.freeze([
    "src/browser/main.mjs",
    "src/ui/shell/classical_shell.mjs",
    "src/core/grammar/contract_registry.mjs",
    "src/application/classical/vnc_application.mjs",
    "src/ui/curriculum/curriculum.mjs",
]);

function normalizeLocalAssetPath(value = "") {
    return String(value || "")
        .split(/[?#]/u, 1)[0]
        .replace(/^\.\//u, "");
}

function getLocalScriptEntries(source = "") {
    return Array.from(String(source || "").matchAll(/<script\b([^>]*)>/giu), (match) => {
        const attributes = match[1] || "";
        const sourceMatch = attributes.match(/\bsrc\s*=\s*["']([^"']+)["']/iu);
        const typeMatch = attributes.match(/\btype\s*=\s*["']([^"']+)["']/iu);
        return {
            path: normalizeLocalAssetPath(sourceMatch?.[1] || ""),
            type: String(typeMatch?.[1] || "").toLowerCase(),
        };
    }).filter((entry) => (
        entry.path
        && !/^(?:[A-Za-z][A-Za-z0-9+.-]*:|\/\/)/u.test(entry.path)
    ));
}

function findDirectClassicImplementationRequires() {
    const testDir = path.join(ROOT, "src", "tests");
    const directClassicRequire = /require\(\s*["']\.\.\/(?:application|core|ui)\/[^"']+\.js["']\s*\)/gu;
    return fs.readdirSync(testDir)
        .filter((fileName) => fileName.endsWith(".test.js"))
        .sort()
        .flatMap((fileName) => {
            const source = fs.readFileSync(path.join(testDir, fileName), "utf8");
            return Array.from(source.matchAll(directClassicRequire), (match) => `${fileName}:${match[0]}`);
        });
}

function run(ctx = {}) {
    const s = createSuite("runtime_delivery_checks");
    const indexSource = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");
    const localScriptEntries = getLocalScriptEntries(indexSource);

    s.eq(
        "index script parsing normalizes modern module paths and ignores external scripts",
        parseIndexScriptPaths([
            '<script type="module" src="./src/a.mjs?v=one"></script>',
            '<script src="https://example.test/external.js"></script>',
            '<script type="module" src="src/b.mjs#fragment"></script>',
        ].join("\n")),
        ["src/a.mjs", "src/b.mjs"]
    );

    s.eq(
        "the public index has one canonical modern-browser entry module",
        localScriptEntries,
        [{ path: "src/browser/main.mjs", type: "module" }]
    );

    s.eq(
        "the public index contains no classic script lane",
        localScriptEntries
            .filter((entry) => entry.type !== "module" || !entry.path.endsWith(".mjs"))
            .map((entry) => entry.path),
        []
    );

    s.eq(
        "the canonical browser, shell, grammar, application, and curriculum modules exist",
        CANONICAL_RUNTIME_MODULES.filter((modulePath) => !fs.existsSync(path.join(ROOT, modulePath))),
        []
    );

    const browserEntrySource = fs.readFileSync(path.join(ROOT, "src", "browser", "main.mjs"), "utf8");
    s.ok(
        "the browser entry delegates to the ESM bootstrap and publishes its readiness promise",
        browserEntrySource.includes('from "../bootstrap/bootstrap.mjs?v=')
            && browserEntrySource.includes("__CLASSICAL_MODULE_BOOTSTRAP_PROMISE__")
    );

    const bootstrapSource = fs.readFileSync(path.join(
        ROOT,
        "src/bootstrap/bootstrap.mjs"
    ), "utf8");
    const runtimeBridgeSource = fs.readFileSync(path.join(
        ROOT,
        "src/bootstrap/runtime_bridge.mjs"
    ), "utf8");
    const runtimeSource = fs.readFileSync(path.join(
        ROOT,
        "src/runtime/create_runtime.mjs"
    ), "utf8");
    const runtimeContractSource = fs.readFileSync(path.join(
        ROOT,
        "src/runtime/runtime_capability_contract.mjs"
    ), "utf8");
    const clauseRelationSource = fs.readFileSync(path.join(
        ROOT,
        "src/application/classical/clause_relation_controller.mjs"
    ), "utf8");
    const lateValidationOwnerSource = fs.readFileSync(path.join(
        ROOT,
        "src/core/classical/late_validation_owner_catalog.mjs"
    ), "utf8");
    const lateValidationSemanticSource = fs.readFileSync(path.join(
        ROOT,
        "src/core/classical/late_grammar_validation_semantic_operations.mjs"
    ), "utf8");
    const cacheKey = currentBrowserCacheKey(indexSource);
    const atlasObservationApiNames = [
        "getClassicalGrammarApplicationAtlasObservation",
        "isClassicalGrammarApplicationAtlasObservation",
        "subscribeClassicalGrammarApplicationAtlasObservations",
    ];
    s.eq(
        "the cache-current browser runtime publishes the read-only Atlas observation bridge",
        {
            indexToBrowser:
                usesBrowserCacheKey(
                    indexSource,
                    "src/browser/main.mjs",
                    cacheKey
                ),
            browserToBootstrap:
                usesBrowserCacheKey(
                    browserEntrySource,
                    "../bootstrap/bootstrap.mjs",
                    cacheKey
                ),
            bootstrapToRuntime:
                usesBrowserCacheKey(
                    bootstrapSource,
                    "../runtime/create_runtime.mjs",
                    cacheKey
                ),
            bootstrapToBridge:
                usesBrowserCacheKey(
                    bootstrapSource,
                    "./runtime_bridge.mjs",
                    cacheKey
                ),
            bridgeToRuntime:
                usesBrowserCacheKey(
                    runtimeBridgeSource,
                    "../runtime/create_runtime.mjs",
                    cacheKey
                ),
            runtimeToApplication:
                usesBrowserCacheKey(
                    runtimeSource,
                    "../application/classical/grammar_application.mjs",
                    cacheKey
                ),
            runtimeToCapabilityContract:
                usesBrowserCacheKey(
                    runtimeSource,
                    "./runtime_capability_contract.mjs",
                    cacheKey
                ),
            contractContainsAllApis: atlasObservationApiNames.every(
                capabilityName => runtimeContractSource.includes(
                    `\n${capabilityName}\n`
                )
            ),
            runtimePublishedAllApis: atlasObservationApiNames.every(
                capabilityName => typeof ctx[capabilityName] === "function"
            ),
            diagnosticAuthority:
                ctx.getClassicalGrammarApplicationInventory?.()
                    ?.grammaticalRhymeCalibration
                    ?.grammaticalAtlas?.grammarAuthority,
        },
        {
            indexToBrowser: true,
            browserToBootstrap: true,
            bootstrapToRuntime: true,
            bootstrapToBridge: true,
            bridgeToRuntime: true,
            runtimeToApplication: true,
            runtimeToCapabilityContract: true,
            contractContainsAllApis: true,
            runtimePublishedAllApis: true,
            diagnosticAuthority: false,
        }
    );

    s.eq(
        "the cache-current late-validation path reuses the same VNC application module",
        {
            runtimeToVncApplication: usesBrowserCacheKey(
                runtimeSource,
                "../application/classical/vnc_application.mjs",
                cacheKey
            ),
            runtimeToClauseRelation: usesBrowserCacheKey(
                runtimeSource,
                "../application/classical/clause_relation_controller.mjs",
                cacheKey
            ),
            clauseRelationToLateOwners: usesBrowserCacheKey(
                clauseRelationSource,
                "../../core/classical/late_validation_owner_catalog.mjs",
                cacheKey
            ),
            lateOwnersToSemanticOperations: usesBrowserCacheKey(
                lateValidationOwnerSource,
                "./late_grammar_validation_semantic_operations.mjs",
                cacheKey
            ),
            semanticOperationsToVncApplication: usesBrowserCacheKey(
                lateValidationSemanticSource,
                "../../application/classical/vnc_application.mjs",
                cacheKey
            ),
        },
        {
            runtimeToVncApplication: true,
            runtimeToClauseRelation: true,
            clauseRelationToLateOwners: true,
            lateOwnersToSemanticOperations: true,
            semanticOperationsToVncApplication: true,
        }
    );

    s.eq(
        "tests do not execute classic application, core, or UI implementation files directly",
        findDirectClassicImplementationRequires(),
        []
    );

    const repositoryManifest = checkRuntimeManifest(ROOT);
    s.eq(
        "the public entry and canonical ESM runtime manifest remain aligned",
        repositoryManifest.findings,
        []
    );

    return s;
}

module.exports = { run };
