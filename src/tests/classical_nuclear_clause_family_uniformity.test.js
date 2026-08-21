"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const suite = createSuite(
        "classical_nuclear_clause_family_uniformity"
    );
    const vncSource = ctx.buildClassicalNahuatlNuclearClauseSource(
        "ahci",
        {
            clauseKind: "verbal-nuclear-clause",
            transitivity: "intransitive",
            usageRole: "simple-sentence",
        }
    );
    const nncSource = ctx.buildClassicalNahuatlNuclearClauseSource(
        "cal",
        {
            clauseKind: "nominal-nuclear-clause",
            stateArity: "vacant",
            usageRole: "simple-sentence",
        }
    );
    const vnc =
        ctx.evaluateClassicalNahuatlNuclearClauseStructure(vncSource);
    const nnc =
        ctx.evaluateClassicalNahuatlNuclearClauseStructure(nncSource);

    suite.eq(
        "VNC and NNC use one typed nuclear-clause Source and Result lifecycle",
        {
            sourceKinds: [vncSource.kind, nncSource.kind],
            sourceVersions: [vncSource.version, nncSource.version],
            sourceOwned: [
                ctx.isClassicalNahuatlNuclearClauseSource(vncSource),
                ctx.isClassicalNahuatlNuclearClauseSource(nncSource),
            ],
            resultKinds: [vnc.kind, nnc.kind],
            resultVersions: [vnc.version, nnc.version],
            resultOwned: [
                ctx.isClassicalNahuatlNuclearClauseResult(vnc),
                ctx.isClassicalNahuatlNuclearClauseResult(nnc),
            ],
            exactSources: [vnc.source === vncSource, nnc.source === nncSource],
            unitKinds: [
                vnc.structureFrame.unitKind,
                nnc.structureFrame.unitKind,
            ],
            stageOne: [
                vnc.structureFrame.stage1Formula,
                nnc.structureFrame.stage1Formula,
            ],
            subjectStructures: [
                vnc.structureFrame.subjectStructure.formula,
                nnc.structureFrame.subjectStructure.formula,
            ],
            independentProjectionFacts: [
                vnc.structureFrame.formulaDerivedFromTypedStructure,
                nnc.structureFrame.formulaDerivedFromTypedStructure,
            ],
        },
        {
            sourceKinds: Array(2).fill(
                "classical-nahuatl-nuclear-clause-source"
            ),
            sourceVersions: [1, 1],
            sourceOwned: [true, true],
            resultKinds: Array(2).fill(
                "classical-nahuatl-nuclear-clause-structure-result"
            ),
            resultVersions: [1, 1],
            resultOwned: [true, true],
            exactSources: [true, true],
            unitKinds: ["nuclear-clause", "nuclear-clause"],
            stageOne: ["Subject + Predicate", "Subject + Predicate"],
            subjectStructures: [
                "#person+...+number#",
                "#person+...+number#",
            ],
            independentProjectionFacts: [true, true],
        }
    );

    suite.eq(
        "the shared shell keeps verbal and nominal predicate contents distinct",
        {
            kinds: [vnc.clauseKind, nnc.clauseKind],
            components: [
                vnc.structureFrame.predicateStructure.components,
                nnc.structureFrame.predicateStructure.components,
            ],
            layers: [
                vnc.structureFrame.organizationalLayers,
                nnc.structureFrame.organizationalLayers,
            ],
            predicateKinds: [
                vnc.predicateFrame.predicateKind,
                nnc.predicateFrame.predicateKind,
            ],
            stateBelongsTo: [
                vnc.predicateFrame.stateBelongsTo,
                nnc.predicateFrame.stateBelongsTo,
            ],
            valenceBelongsTo: [
                vnc.predicateFrame.valenceBelongsTo,
                nnc.predicateFrame.valenceBelongsTo,
            ],
            tenseSlots: [
                vnc.predicateFrame.tenseSlot,
                nnc.predicateFrame.tenseSlot,
            ],
        },
        {
            kinds: [
                "verbal-nuclear-clause",
                "nominal-nuclear-clause",
            ],
            components: [
                ["valence", "stem", "tense"],
                ["state", "stem"],
            ],
            layers: [
                [
                    "verbstem",
                    "verbcore=valence+stem",
                    "predicate=verbcore+tense",
                    "VNC=subject+predicate",
                ],
                [
                    "nounstem",
                    "nouncore=predicate=state+stem",
                    "NNC=subject+predicate",
                ],
            ],
            predicateKinds: ["verbal-predicate", "nominal-predicate"],
            stateBelongsTo: ["not-applicable", "predicate"],
            valenceBelongsTo: ["verbcore", "not-applicable"],
            tenseSlots: ["present", "none"],
        }
    );

    let forbiddenVnc = "";
    let forbiddenNnc = "";
    try {
        ctx.buildClassicalNahuatlNuclearClauseSource("ahci", {
            clauseKind: "verbal-nuclear-clause",
            transitivity: "intransitive",
            formula: "#forged#",
        });
    } catch (error) {
        forbiddenVnc = String(error.message || error);
    }
    try {
        ctx.buildClassicalNahuatlNuclearClauseSource("cal", {
            clauseKind: "nominal-nuclear-clause",
            stateArity: "vacant",
            surface: "forged",
        });
    } catch (error) {
        forbiddenNnc = String(error.message || error);
    }
    suite.eq(
        "both families reject spelling authority and copied owner identities",
        {
            forbiddenVnc,
            forbiddenNnc,
            copiedSources: [
                ctx.isClassicalNahuatlNuclearClauseSource({
                    ...vncSource,
                }),
                ctx.isClassicalNahuatlNuclearClauseSource({
                    ...nncSource,
                }),
            ],
            copiedResults: [
                ctx.isClassicalNahuatlNuclearClauseResult({ ...vnc }),
                ctx.isClassicalNahuatlNuclearClauseResult({ ...nnc }),
            ],
            jsonResults: [
                ctx.isClassicalNahuatlNuclearClauseResult(
                    JSON.parse(JSON.stringify(vnc))
                ),
                ctx.isClassicalNahuatlNuclearClauseResult(
                    JSON.parse(JSON.stringify(nnc))
                ),
            ],
        },
        {
            forbiddenVnc:
                "classical-nuclear-clause-source-authority-invalid",
            forbiddenNnc:
                "classical-nuclear-clause-source-authority-invalid",
            copiedSources: [false, false],
            copiedResults: [false, false],
            jsonResults: [false, false],
        }
    );

    return suite;
}

module.exports = { run };
