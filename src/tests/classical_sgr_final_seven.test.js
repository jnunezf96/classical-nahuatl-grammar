"use strict";

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");
const { pathToFileURL } = require("url");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const PRIOR_REPORT = path.join(
    ROOT,
    "reports/generated/classical_sgr_browser",
    "inventory-dacbf10128613891c158a5a43dc94ccc1ef0ef67e4e74e82fdc2704b59e1468a__recipe-d7467423d016f64ff9a641d42574112566acf03aa2b9865fcec69b80fbcc39d6.json"
);

const PUBLIC_FINAL_THREE = Object.freeze([
    [
        "CAA-grammar-nominal-construction--measure-modification",
        "interactive-choice",
        "grammar",
    ],
    ["CAA-nnc-ordinary--nnc-state", "interactive-choice", "grammar"],
    [
        "CAA-nnc-ordinary--possessor-person-number",
        "interactive-choice",
        "grammar",
    ],
]);

const INTENTIONALLY_UNSURFACED_PRONOMINAL_FOUR = Object.freeze([
    "CAA-nnc-pronominal--matrix-family",
    "CAA-nnc-pronominal--matrix-form",
    "CAA-nnc-pronominal--quantitive-embed",
    "CAA-nnc-pronominal--quantitive-matrix",
]);

function getRouteCases() {
    const moduleUrl = pathToFileURL(path.join(
        ROOT,
        "src/tests/helpers/classical_sgr_route_recipes.mjs"
    )).href;
    const script = `
        const registry = (await import(${JSON.stringify(moduleUrl)}))
            .CLASSICAL_SGR_ROUTE_RECIPE_REGISTRY;
        const wanted = new Set([
            "nnc-base/ordinary-scalar",
            "nnc-base/possessive-pil-reduplication",
            "nnc-pronominal/personal-scalar",
            "nnc-pronominal/quantitive-scalar",
            "nominal-construction/measure"
        ]);
        const cases = registry.families.flatMap(family => family.cases)
            .filter(record => wanted.has(record.caseId));
        const presets = Object.fromEntries(registry.presets.map(record => [
            record.presetId,
            record
        ]));
        process.stdout.write(JSON.stringify({ cases, presets }));
    `;
    const result = spawnSync(
        process.execPath,
        ["--input-type=module", "--eval", script],
        { cwd: ROOT, encoding: "utf8" }
    );
    if (result.status !== 0) throw new Error(result.stderr || "route import failed");
    return JSON.parse(result.stdout);
}

function selectionValue(record, controlKey) {
    return (record?.selections || []).find(
        selection => selection.controlKey === controlKey
    )?.value;
}

function run(ctx = {}) {
    const suite = createSuite("classical_sgr_final_seven");
    const inventory = ctx.getClassicalSourceGrammarResultSurfaceInventory();
    const byId = new Map(
        [...inventory.axes, ...inventory.outputs].map(atom => [atom.atomId, atom])
    );
    suite.eq(
        "the three genuine choices remain public while four pronominal Grammar facts stay unsurfaced",
        {
            publicChoices: PUBLIC_FINAL_THREE.map(([atomId]) => {
                const atom = byId.get(atomId);
                return [atom?.atomId, atom?.disposition, atom?.binding?.stage];
            }),
            intentionallyUnsurfaced: INTENTIONALLY_UNSURFACED_PRONOMINAL_FOUR
                .map(atomId => {
                    const atom = byId.get(atomId);
                    return [
                        atom?.atomId,
                        atom?.disposition,
                        atom?.binding?.stage,
                        atom?.binding?.public,
                    ];
                }),
        },
        {
            publicChoices: PUBLIC_FINAL_THREE,
            intentionallyUnsurfaced:
                INTENTIONALLY_UNSURFACED_PRONOMINAL_FOUR.map(atomId => [
                    atomId,
                    "intentionally-unsurfaced",
                    "grammar",
                    false,
                ]),
        }
    );

    const prior = JSON.parse(fs.readFileSync(PRIOR_REPORT, "utf8"));
    const recoveredReceipts = [
        "CAA-nnc-ordinary--nnc-state",
        "CAA-nnc-ordinary--possessor-person-number",
    ].map(atomId => {
        const receipt = prior.atomOutcomes.find(
            outcome => outcome.atomId === atomId
        )?.receipt;
        return {
            atomId,
            observationLabel: receipt?.observationLabel,
            locator: receipt?.locator,
            value: receipt?.material?.control?.value,
        };
    });
    const { cases, presets } = getRouteCases();
    const caseById = new Map(cases.map(record => [record.caseId, record]));
    const ordinary = caseById.get("nnc-base/ordinary-scalar");
    const possessive = caseById.get(
        "nnc-base/possessive-pil-reduplication"
    );
    const personal = caseById.get("nnc-pronominal/personal-scalar");
    const quantitive = caseById.get("nnc-pronominal/quantitive-scalar");
    const measure = caseById.get("nominal-construction/measure");
    suite.eq(
        "the exact prior ordinary receipts and bounded final routes are replayed",
        {
            recoveredReceipts,
            ordinary: {
                alwaysObserve: ordinary.alwaysObserve,
                preSelectionActions: ordinary.preSelectionActions,
                state: selectionValue(ordinary, "classical-rule-logic-nnc-state"),
            },
            possessive: {
                alwaysObserve: possessive.alwaysObserve,
                preSelectionActions: possessive.preSelectionActions,
                state: selectionValue(possessive, "classical-rule-logic-nnc-state"),
                possessor: selectionValue(
                    possessive,
                    "classical-rule-logic-nnc-possessor"
                ),
                lastSelection: possessive.selections.at(-1).controlKey,
            },
            personalSource: selectionValue(
                personal,
                "classical-nnc-source-example"
            ),
            quantitiveSource: selectionValue(
                quantitive,
                "classical-nnc-source-example"
            ),
            quantitiveActions: quantitive.actions || [],
            measure: {
                alwaysObserve: measure.alwaysObserve,
                preSelectionActions: measure.preSelectionActions,
                presetScope: selectionValue(
                    presets[measure.presetId],
                    "classical-rule-logic-nnc-output-scope"
                ),
                source: measure.source,
                classifier: selectionValue(
                    measure,
                    "classical-cardinal-classifier"
                ),
                composition: selectionValue(
                    measure,
                    "classical-cardinal-measure-composition"
                ),
            },
        },
        {
            recoveredReceipts: [
                {
                    atomId: "CAA-nnc-ordinary--nnc-state",
                    observationLabel: "nnc-base/ordinary-scalar",
                    locator: "#classical-rule-logic-nnc-state",
                    value: "absolutive",
                },
                {
                    atomId: "CAA-nnc-ordinary--possessor-person-number",
                    observationLabel: "nnc-base/possessive-pil-reduplication",
                    locator: "#classical-rule-logic-nnc-possessor",
                    value: "1sg",
                },
            ],
            ordinary: {
                alwaysObserve: true,
                preSelectionActions: ["apply-source"],
                state: "absolutive",
            },
            possessive: {
                alwaysObserve: true,
                preSelectionActions: ["apply-source"],
                state: "possessive",
                possessor: "1sg",
                lastSelection: "classical-rule-logic-nnc-possessor",
            },
            personalSource: "yeh",
            quantitiveSource: "ix-qui-ch",
            quantitiveActions: [],
            measure: {
                alwaysObserve: true,
                preSelectionActions: ["apply-source"],
                presetScope: "single",
                source: {
                    mode: "embed-matrix",
                    fields: { embed: "tlacuā-l", matrix: "tla-māma-l" },
                },
                classifier: "measure",
                composition: "with-measured-nnc",
            },
        }
    );

    const rendering = fs.readFileSync(
        path.join(ROOT, "src/ui/rendering/rendering.mjs"),
        "utf8"
    );
    const executor = fs.readFileSync(
        path.join(ROOT, "src/tests/helpers/classical_sgr_recipe_executor.mjs"),
        "utf8"
    );
    suite.ok(
        "generic NNC projection stays wrapped while issued specialized Results remain capturable",
        rendering.includes("const aggregateSurfaceFrame =")
        && rendering.includes("if (!basalUnit || !aggregateSurfaceFrame) {")
        && rendering.includes("const candidate = basalUnit === \"nnc\"")
        && executor.includes("button[data-classical-source-parts-kind=")
        && executor.includes("caseRecord.preSelectionActions")
        && executor.includes("caseRecord.alwaysObserve !== true")
    );

    return suite;
}

module.exports = { run };
