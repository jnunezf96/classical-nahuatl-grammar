"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "../..");

function run() {
    const s = createSuite("classical_authoritative_atom_ledger");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/ANDREWS_ATOM_LEDGER.json"),
        "utf8"
    ));
    const field = Object.fromEntries(
        ledger.codebook.atomTuple.map((name, index) => [name, index])
    );
    const atoms = ledger.atoms;
    const grammarAtoms = atoms.filter(
        (atom) => atom[field.force] === "grammar-bearing"
    );
    const missingReferences = atoms.filter((atom) =>
        !atom[field.referenceKind]
        || !atom[field.referencePath]
        || !atom[field.referenceCoordinate]
        || !fs.existsSync(path.join(ROOT, atom[field.referencePath]))
    ).map((atom) => atom[field.atomId]);
    const orphanAtoms = grammarAtoms.filter((atom) =>
        !atom[field.semanticOwnerId]
        || !atom[field.semanticOwnerReference]
        || !fs.existsSync(path.join(ROOT, atom[field.semanticOwnerReference]))
    ).map((atom) => atom[field.atomId]);

    s.eq("one ledger preserves the fixed atom accounting without orphans", {
        atomCount: atoms.length,
        uniqueAtomCount: new Set(atoms.map((atom) => atom[field.atomId])).size,
        grammarBearingCount: grammarAtoms.length,
        nonGrammarCount: atoms.length - grammarAtoms.length,
        orphanCount: orphanAtoms.length,
        missingReferenceCount: missingReferences.length,
    }, {
        atomCount: 28540,
        uniqueAtomCount: 28540,
        grammarBearingCount: 18639,
        nonGrammarCount: 9901,
        orphanCount: 0,
        missingReferenceCount: 0,
    });

    s.eq("checked statuses partition the grammar denominator exactly", {
        exactlyObserved: ledger.counts.exactlyObserved,
        retainedCanonicalProof: ledger.counts.retainedCanonicalProof,
        exactObservationPending: ledger.counts.exactObservationPending,
        classifiedNonGrammar: ledger.counts.classifiedNonGrammar,
        grammarStatusTotal: ledger.counts.exactlyObserved
            + ledger.counts.retainedCanonicalProof
            + ledger.counts.exactObservationPending,
    }, {
        exactlyObserved: ledger.activeExactObservation.exactlyObserved,
        retainedCanonicalProof: 5347,
        exactObservationPending: 18639
            - 5347
            - ledger.activeExactObservation.exactlyObserved,
        classifiedNonGrammar: 9901,
        grammarStatusTotal: 18639,
    });

    const catalog = fs.readFileSync(
        path.join(ROOT, "src/core/classical/nuclear_semantic_owner_catalog.mjs"),
        "utf8"
    );
    const assertionFiles = fs.readdirSync(
        path.join(ROOT, "src/core/classical/nuclear-owner-specs")
    ).filter((file) => file.endsWith("-canvas-atom-assertions.mjs"));
    s.eq("tracking records are absent from the executable owner catalog", {
        assertionFiles,
        catalogMentionsAssertionModules: /canvas[-_]atom[-_]assertions/u.test(catalog),
        trackingAuthority: ledger.authority.trackingAuthority,
        grammarAuthority: ledger.authority.grammarAuthority,
        trackingRecordsAuthorizeGrammar:
            ledger.invariants.trackingRecordsAuthorizeGrammar,
    }, {
        assertionFiles: [],
        catalogMentionsAssertionModules: false,
        trackingAuthority: "sole-current-atom-tracking-ledger",
        grammarAuthority: false,
        trackingRecordsAuthorizeGrammar: false,
    });

    return s;
}

module.exports = { run };
