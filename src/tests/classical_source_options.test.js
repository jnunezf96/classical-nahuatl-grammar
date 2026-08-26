"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_source_options");
    const root = path.resolve(__dirname, "..", "..");
    const runtimeManifest = fs.readFileSync(path.join(root, "src", "runtime", "create_runtime.mjs"), "utf8");
    const shell = fs.readFileSync(path.join(root, "src", "ui", "shell", "classical_shell.mjs"), "utf8");
    const composer = fs.readFileSync(path.join(root, "src", "ui", "composer", "composer.mjs"), "utf8");
    const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
    const inventoryRuntime = ctx;

    s.eq(
        "canonical VNC source inventory is loaded and valid",
        {
            loadedByRuntime: runtimeManifest.includes("src/core/classical/source_stem_inventory.mjs"),
            audit: (() => {
                const audit = inventoryRuntime.auditClassicalNahuatlCanonicalSourceStemInventory();
                return {
                    kind: audit.kind,
                    version: audit.version,
                    invalidRecordCount: audit.invalidRecordCount,
                    duplicateCount: audit.duplicateCount,
                    quantityConflictPresent: audit.quantityConflictPresent,
                    canonicalQuantityPresent: audit.canonicalQuantityPresent,
                    ok: audit.ok,
                };
            })(),
            examples: inventoryRuntime.getClassicalNahuatlCanonicalSourceStemInventory("vnc")
                .filter((record) => ["nemi", "cual-ā-ni"].includes(record.stem))
                .map((record) => `${record.valenceDisplay}|${record.stem}`),
        },
        {
            loadedByRuntime: true,
            audit: {
                kind: "classical-nahuatl-canonical-source-stem-inventory-audit",
                version: 1,
                invalidRecordCount: 0,
                duplicateCount: 0,
                quantityConflictPresent: false,
                canonicalQuantityPresent: true,
                ok: true,
            },
            examples: ["intransitive|cual-ā-ni", "intransitive|nemi"],
        }
    );

    s.eq(
        "Lesson 24 synonymy remains a read-only lexical Source fact rather than a selectable operation",
        inventoryRuntime.getClassicalNahuatlCanonicalSourceStemInventory("vnc")
            .filter(record => record.lexicalAlternativeGroupId)
            .map(record => ({
                stem: record.stem,
                group: record.lexicalAlternativeGroupId,
                relation: record.lexicalAlternativeRelation,
                readOnly: record.lexicalFactsReadOnly,
                selectableOperation: record.userSelectableOperation,
                grammarAuthority: record.grammarAuthority,
            })),
        [
            {
                stem: "tep-ē-hua",
                group: "cn-l24-2463-tep-e-hua-hui",
                relation: "lexical-source-alternative",
                readOnly: true,
                selectableOperation: false,
                grammarAuthority: false,
            },
            {
                stem: "tep-ē-hui",
                group: "cn-l24-2463-tep-e-hua-hui",
                relation: "lexical-source-alternative",
                readOnly: true,
                selectableOperation: false,
                grammarAuthority: false,
            },
            {
                stem: "tōy-ā-hua",
                group: "cn-l24-2463-toy-a-hua-hui",
                relation: "lexical-source-alternative",
                readOnly: true,
                selectableOperation: false,
                grammarAuthority: false,
            },
            {
                stem: "tōy-ā-hui",
                group: "cn-l24-2463-toy-a-hua-hui",
                relation: "lexical-source-alternative",
                readOnly: true,
                selectableOperation: false,
                grammarAuthority: false,
            },
        ]
    );

    s.eq(
        "built-in VNC citation shape supplies only its convenient default Valence",
        inventoryRuntime.getClassicalNahuatlCanonicalSourceStemInventory("vnc")
            .filter(record => ["āna", "nemi"].includes(record.stem))
            .map(record => ({
                citation: record.citation,
                valenceDisplay: record.valenceDisplay,
                defaultSourceValence: record.defaultSourceValence,
                grammarAuthority: record.grammarAuthority,
            })),
        [
            {
                citation: "...-(āna)",
                valenceDisplay: "transitive",
                defaultSourceValence: "specific-projective",
                grammarAuthority: false,
            },
            {
                citation: "(nemi)",
                valenceDisplay: "intransitive",
                defaultSourceValence: "intransitive",
                grammarAuthority: false,
            },
        ]
    );

    s.ok(
        "every built-in VNC receives the same citation-derived default without becoming a route gate",
        inventoryRuntime.getClassicalNahuatlCanonicalSourceStemInventory("vnc")
            .every(record => (
                record.defaultSourceValence === (
                    record.valenceDisplay === "transitive"
                        ? "specific-projective"
                        : "intransitive"
                )
                && record.grammarAuthority === false
            ))
    );

    s.eq(
        "the class owner resolves built-in yohua without guessing variable or unknown stems",
        [
            ["yohua", { valence: "intransitive" }],
            ["ē-hua", { valence: "intransitive" }],
            ["xemi", { valence: "intransitive" }],
        ].map(([stem, options]) => {
            const profile = inventoryRuntime
                .inferClassicalNahuatlLesson7ClassProfile(stem, options);
            return {
                stem,
                classId: profile.classId,
                classOptions: profile.classOptions,
                selectionRequired: profile.classSelectionRequired,
                ruleId: profile.classGuidelineRuleId,
            };
        }),
        [
            {
                stem: "yohua",
                classId: "A",
                classOptions: ["A"],
                selectionRequired: false,
                ruleId: "cn-l7-765-intransitive-wa-change-a",
            },
            {
                stem: "ē-hua",
                classId: "A",
                classOptions: ["A", "B"],
                selectionRequired: false,
                ruleId: "cn-l7-75-variable-a-b-membership",
            },
            {
                stem: "xemi",
                classId: "",
                classOptions: [],
                selectionRequired: true,
                ruleId: "",
            },
        ]
    );

    s.eq(
        "built-in class preservation follows guideline, owner option, then claim permission",
        ["cochi", "ē-hua", "mati"].map((stem) => {
            const profile = inventoryRuntime
                .inferClassicalNahuatlLesson7ClassProfile(stem, {
                    valence: "intransitive",
                });
            return {
                stem,
                classId: profile.classId,
                classOptions: profile.classOptions,
                guidelineAllowed: profile.classGuidelineAllowedClassIds,
                claimAllowed: profile.classClaimAllowedClassIds,
            };
        }),
        [
            {
                stem: "cochi",
                classId: "",
                classOptions: [],
                guidelineAllowed: [],
                claimAllowed: ["A", "B", "D"],
            },
            {
                stem: "ē-hua",
                classId: "A",
                classOptions: ["A", "B"],
                guidelineAllowed: ["A", "B"],
                claimAllowed: ["A", "B"],
            },
            {
                stem: "mati",
                classId: "B",
                classOptions: ["B"],
                guidelineAllowed: [],
                claimAllowed: ["A", "B", "D"],
            },
        ]
    );

    s.eq(
        "the VNC owner retains first-person supportive i with the built-in transitive default and antecessive",
        typeof inventoryRuntime.buildClassicalNahuatlVerbstemClassFrame === "function"
            ? (() => {
                const present = inventoryRuntime.buildClassicalNahuatlVerbstemClassFrame("(āna)", {
                    subject: "1sg",
                    mood: "indicative",
                    tense: "present",
                    verbClass: "B",
                    valence: "specific-projective",
                });
                const antecessive = inventoryRuntime.buildClassicalNahuatlVerbstemClassFrame("(āna)", {
                    subject: "1sg",
                    mood: "indicative",
                    tense: "preterit",
                    verbClass: "B",
                    valence: "specific-projective",
                    antecessive: true,
                });
                return {
                    presentAuthorized: present.authorizationStatus,
                    presentSupportiveI: present.formulaRealization.includes("ni-"),
                    antecessiveAuthorized: antecessive.authorizationStatus,
                    antecessiveSupportiveI: antecessive.formulaRealization.includes("ni-"),
                    outsidePrefixes: antecessive.expandedVncBoundaryFrame?.outsidePrefixes || [],
                };
            })()
            : null,
        {
            presentAuthorized: "authorized",
            presentSupportiveI: true,
            antecessiveAuthorized: "authorized",
            antecessiveSupportiveI: true,
            outsidePrefixes: ["ō#"],
        }
    );

    s.ok(
        "Source shell keeps the picker, two genuine source choices, and read-only morph analysis",
        shell.includes('id="classical-vnc-source-stem"')
            && shell.includes('<span class="classical-nnc-source-guide__label">Try an example</span>')
            && shell.includes('Type a verbstem or choose a built-in verbstem')
            && !shell.includes('Canonical verbstem')
            && shell.includes('data-classical-source-parts-kind="whole-stem"')
            && shell.includes('data-classical-source-parts-kind="embed-matrix"')
            && shell.includes('id="classical-source-internal-morphs"')
    );

    s.ok(
        "Source choices are wired and receive distinct compact layouts",
        composer.includes("populateClassicalVncSourceStemPicker")
            && composer.includes("applyClassicalVncSourceStemSelection")
            && composer.includes("applyClassicalVncBuiltInSourceClassDefault")
            && composer.includes("ownerSelection?.classGuidelineAllowedClassIds?.length")
            && composer.includes("ownerSelection?.classOptions?.length")
            && composer.includes("ownerSelection?.classClaimAllowedClassIds || []")
            && composer.includes("ownerAllowedClassIds.includes(currentClass)")
            && css.includes('[data-classical-source-parts-mode="whole-stem"] .classical-source-parts__grid')
            && css.includes('[data-classical-source-parts-mode="embed-matrix"] .classical-source-parts__grid')
            && css.includes('[data-classical-source-parts-mode="embed-matrix"] .classical-source-parts__field--whole')
    );

    return s;
}

module.exports = { run };
