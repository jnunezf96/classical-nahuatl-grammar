"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function readJson(relativePath) {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, relativePath), "utf8"));
}

function run() {
    const s = createSuite("classical_canvas_atom_ui_reconciliation");
    const semanticScope = readJson("../../docs/ANDREWS_ATOM_SEMANTIC_SCOPE_AND_FORCE.json");
    const proofMigration = readJson("../../docs/ANDREWS_INDIVIDUAL_ATOM_PROOF_MIGRATION.json");
    const application = readJson("../../docs/CLASSICAL_APPLICATION_AXIS_DISPOSITIONS.json");
    const bridge = readJson("../../docs/CLASSICAL_APPLICATION_AXIS_CANVAS_BRIDGE.json");
    const atoms = semanticScope.atoms;
    const atomById = new Map(atoms.map((atom) => [atom.atomId, atom]));
    const canaryIds = [
        "ACI-P086-L005-336D0005B5",
        "ACI-P086-L007-336D0005B5",
        "ACI-P086-L008-336D0005B5",
    ];

    s.eq("the exhaustive source denominator reconciles with individual proof migration", {
        atomCount: atoms.length,
        uniqueAtomCount: new Set(atoms.map((atom) => atom.atomId)).size,
        grammarBearingCount: atoms.filter((atom) => atom.force === "grammar-bearing").length,
        nonGrammarCount: atoms.filter((atom) => atom.force !== "grammar-bearing").length,
        newAssertionCount: proofMigration.counts.newIndividualAtomProofs,
        retainedProofCount: atoms.filter((atom) => atom.force === "grammar-bearing").length
            - proofMigration.counts.newIndividualAtomProofs,
    }, {
        atomCount: 28540,
        uniqueAtomCount: 28540,
        grammarBearingCount: 18639,
        nonGrammarCount: 9901,
        newAssertionCount: 13292,
        retainedProofCount: 5347,
    });

    s.eq("typed application contracts remain the sole source of genuine choices", {
        applicationAxes: application.entries.length,
        genuineChoices: application.entries.filter((entry) =>
            entry.semanticFactRole === "genuine-user-choice").length,
        nonChoices: application.entries.filter((entry) =>
            entry.semanticFactRole !== "genuine-user-choice").length,
        atomCreatedAxes: bridge.counts.applicationAxesCreatedByAtomAssertions,
        uiAuthority: bridge.authority.uiAuthority,
        evidenceAbsenceBlocksGeneration: bridge.authority.evidenceAbsenceBlocksGeneration,
    }, {
        applicationAxes: 392,
        genuineChoices: 64,
        nonChoices: 328,
        atomCreatedAxes: 0,
        uiAuthority: "none",
        evidenceAbsenceBlocksGeneration: false,
    });

    const lesson1ChoiceLinks = {
        "CAA-classical.morpheme.inflectional-affix.demote--process-kind": ["ACI-P029-L016-682536CD59"],
        "CAA-classical.structure.group.compose--group-shape": ["ACI-P031-L014-D364C15A04"],
        "CAA-classical.structure.meaningful-rank.downgrade--downgrade-mode": ["ACI-P030-L006-518758C8D7", "ACI-P030-L006-518758C8D7-02"],
        "CAA-classical.structure.meaningful-rank.source-or-upgrade.validate--transition-mode": ["ACI-P030-L004-D47685394D"],
        "CAA-classical.structure.stem.compound--compound-relation": ["ACI-P030-L015-A02A98BF92"],
        "CAA-classical.structure.stem.form-directly--formation-kind": ["ACI-P030-L011-9FE9D0F679", "ACI-P030-L011-9FE9D0F679-02", "ACI-P030-L011-9FE9D0F679-03"],
    };
    const bridgeByAxis = new Map(bridge.entries.map(entry => [
        entry.applicationAxisAtomId,
        entry.canvasAtomIds,
    ]));
    s.eq("the six new Lesson 1 user choices point to their exact Canvas atoms", {
        bridgeCounts: {
            interactive: bridge.counts.interactiveAxisCount,
            mapped: bridge.counts.mappedAxisCount,
            links: bridge.counts.directProvenanceLinkCount,
            uniqueAtoms: bridge.counts.uniqueDirectProvenanceAtomCount,
        },
        links: Object.fromEntries(Object.keys(lesson1ChoiceLinks).map(axisId => [
            axisId,
            bridgeByAxis.get(axisId) || [],
        ])),
        linkedAtomsAreGrammar: Object.values(lesson1ChoiceLinks).flat().every(atomId =>
            atomById.get(atomId)?.force === "grammar-bearing"),
    }, {
        bridgeCounts: { interactive: 64, mapped: 64, links: 95, uniqueAtoms: 86 },
        links: lesson1ChoiceLinks,
        linkedAtomsAreGrammar: true,
    });

    s.eq("section 7.9 keeps singular, plural, and reciprocal propositions distinct", {
        present: canaryIds.map((atomId) => atomById.has(atomId)),
        categories: canaryIds.map((atomId) => atomById.get(atomId)?.category),
        forces: canaryIds.map((atomId) => atomById.get(atomId)?.force),
        topics: canaryIds.map((atomId) => atomById.get(atomId)?.about),
        evidenceAbsenceBlocksGeneration: canaryIds.map((atomId) =>
            atomById.get(atomId)?.authorityPolicy?.evidenceAbsenceBlocksGeneration),
    }, {
        present: [true, true, true],
        categories: ["CON", "CON", "ALT"],
        forces: ["grammar-bearing", "grammar-bearing", "grammar-bearing"],
        topics: [
            [
                "human-object-or-referent",
                "singular",
                "subject",
                "object",
                "human-object-specified",
                "singular-subject",
            ],
            [
                "plural",
                "reflexive",
                "reciprocative",
                "subject",
                "plural-subject",
            ],
            [
                "plural",
                "reciprocative",
                "subject",
                "plural-subject",
            ],
        ],
        evidenceAbsenceBlocksGeneration: [false, false, false],
    });

    return s;
}

module.exports = { run };
