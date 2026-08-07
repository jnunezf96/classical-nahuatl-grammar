"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_source_inventory_lexical_resolution");

    s.eq(
        "quantity-neutral user entry resolves to the one Canvas-canonical īmacaci Source record",
        (() => {
            const canonicalMatches = ctx
                .getClassicalNahuatlCanonicalSourceStemInventory("vnc")
                .filter(record => (
                    record.stem === "īmacaci"
                    && record.valenceDisplay === "transitive"
                ));
            const resolved = ctx.resolveClassicalNahuatlCanonicalSourceStemRecord({
                enteredStem: "imacaci",
                basalUnit: "vnc",
                valence: "transitive",
            });
            return {
                canonicalMatchCount: canonicalMatches.length,
                resolvedIsCanonicalRecord: resolved === canonicalMatches[0],
                ownerIssued: ctx.isClassicalNahuatlCanonicalSourceStemRecord(resolved),
                clonedRecordRejected: !ctx.isClassicalNahuatlCanonicalSourceStemRecord({
                    ...resolved,
                }),
                stem: resolved?.stem || "",
                sourceSection: resolved?.sourceSection || "",
                initialIKind: resolved?.initialIAnalysis?.kind || "",
                frozen: Object.isFrozen(resolved),
            };
        })(),
        {
            canonicalMatchCount: 1,
            resolvedIsCanonicalRecord: true,
            ownerIssued: true,
            clonedRecordRejected: true,
            stem: "īmacaci",
            sourceSection: "25.4.4",
            initialIKind: "real",
            frozen: true,
        }
    );

    s.eq(
        "unlicensed and wrong-valence lexical inputs do not resolve through quantity neutrality",
        {
            unrelated: ctx.resolveClassicalNahuatlCanonicalSourceStemRecord({
                enteredStem: "imacaxi",
                basalUnit: "vnc",
                valence: "transitive",
            }),
            wrongValence: ctx.resolveClassicalNahuatlCanonicalSourceStemRecord({
                enteredStem: "imacaci",
                basalUnit: "vnc",
                valence: "intransitive",
            }),
            ambiguousQuantityAndBoundaryNeutralMatch:
                ctx.resolveClassicalNahuatlCanonicalSourceStemRecord({
                    enteredStem: "cāl",
                    basalUnit: "nnc",
                    valence: "not-applicable",
                }),
            exactMatchWinsBeforeNeutralAmbiguity:
                ctx.resolveClassicalNahuatlCanonicalSourceStemRecord({
                    enteredStem: "cal",
                    basalUnit: "nnc",
                    valence: "not-applicable",
                })?.stem || "",
            copiedRequestWithAuthorityMetadata:
                ctx.resolveClassicalNahuatlCanonicalSourceStemRecord({
                    enteredStem: "imacaci",
                    basalUnit: "vnc",
                    valence: "transitive",
                    lesson: 25,
                }),
            legacyFieldShape: ctx.resolveClassicalNahuatlCanonicalSourceStemRecord({
                sourceStem: "imacaci",
                basalUnit: "vnc",
                valenceDisplay: "transitive",
            }),
        },
        {
            unrelated: null,
            wrongValence: null,
            ambiguousQuantityAndBoundaryNeutralMatch: null,
            exactMatchWinsBeforeNeutralAmbiguity: "cal",
            copiedRequestWithAuthorityMetadata: null,
            legacyFieldShape: null,
        }
    );

    s.eq(
        "owner-issued Source selection preserves entry observation without changing canonical lexical identity",
        (() => {
            const unsegmented =
                ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
                    enteredStem: "huāqui",
                    basalUnit: "vnc",
                    valence: "intransitive",
                });
            const segmented =
                ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
                    enteredStem: "huā-qui",
                    basalUnit: "vnc",
                    valence: "intransitive",
                });
            const shortChihua =
                ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
                    enteredStem: "chihua",
                    basalUnit: "vnc",
                    valence: "transitive",
                });
            const longChihua =
                ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
                    enteredStem: "chīhua",
                    basalUnit: "vnc",
                    valence: "transitive",
                });
            const poisoned =
                ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
                    enteredStem: "huāqui",
                    basalUnit: "vnc",
                    valence: "intransitive",
                    formula: "#FORGED#",
                });
            return {
                unsegmented: {
                    status: unsegmented.authorizationStatus,
                    canonical: ctx
                        .isClassicalNahuatlCanonicalSourceSelectionFrame(
                            unsegmented
                        ),
                    entered: unsegmented.enteredStem,
                    canonicalStem: unsegmented.canonicalStem,
                    boundaryObserved:
                        unsegmented.explicitBoundaryObserved,
                },
                segmented: {
                    status: segmented.authorizationStatus,
                    canonical: ctx
                        .isClassicalNahuatlCanonicalSourceSelectionFrame(
                            segmented
                        ),
                    entered: segmented.enteredStem,
                    canonicalStem: segmented.canonicalStem,
                    boundaryObserved:
                        segmented.explicitBoundaryObserved,
                    sameRecord:
                        segmented.canonicalRecord
                        === unsegmented.canonicalRecord,
                },
                chihua: {
                    shortCanonical: shortChihua.canonicalStem,
                    longCanonical: longChihua.canonicalStem,
                    sameRecord:
                        shortChihua.canonicalRecord
                        === longChihua.canonicalRecord,
                },
                hostile: {
                    spreadAccepted: ctx
                        .isClassicalNahuatlCanonicalSourceSelectionFrame({
                            ...unsegmented,
                        }),
                    structuredCloneAccepted: ctx
                        .isClassicalNahuatlCanonicalSourceSelectionFrame(
                            structuredClone(unsegmented)
                        ),
                    poisonStatus: poisoned.authorizationStatus,
                    poisonCanonical: ctx
                        .isClassicalNahuatlCanonicalSourceSelectionFrame(
                            poisoned
                        ),
                },
            };
        })(),
        {
            unsegmented: {
                status: "authorized",
                canonical: true,
                entered: "huāqui",
                canonicalStem: "huā-qui",
                boundaryObserved: false,
            },
            segmented: {
                status: "authorized",
                canonical: true,
                entered: "huā-qui",
                canonicalStem: "huā-qui",
                boundaryObserved: true,
                sameRecord: true,
            },
            chihua: {
                shortCanonical: "chīhua",
                longCanonical: "chīhua",
                sameRecord: true,
            },
            hostile: {
                spreadAccepted: false,
                structuredCloneAccepted: false,
                poisonStatus: "blocked",
                poisonCanonical: false,
            },
        }
    );

    s.eq(
        "an unlisted VNC uses explicit typed lexical analysis without entering the canonical UX inventory",
        (() => {
            const open =
                ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
                    enteredStem: "cā-hua",
                    basalUnit: "vnc",
                    valence: "transitive",
                    verbClass: "A",
                });
            const missingClass =
                ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
                    enteredStem: "cā-hua",
                    basalUnit: "vnc",
                    valence: "transitive",
                });
            const poisoned =
                ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
                    enteredStem: "cā-hua",
                    basalUnit: "vnc",
                    valence: "transitive",
                    verbClass: "A",
                    formula: "#FORGED#",
                });
            return {
                open: {
                    status: open.authorizationStatus,
                    issued: ctx
                        .isClassicalNahuatlCanonicalSourceSelectionFrame(open),
                    canonicalRecord: open.canonicalRecord,
                    stem: open.canonicalStem,
                    class: open.verbClass,
                    authority: open.lexicalSelectionAuthority,
                    openStemSource: open.openStemSource,
                    copiedAccepted: ctx
                        .isClassicalNahuatlCanonicalSourceSelectionFrame({
                            ...open,
                        }),
                },
                missingClass: [
                    missingClass.authorizationStatus,
                    missingClass.blockReason,
                ],
                poisoned: [
                    poisoned.authorizationStatus,
                    ctx.isClassicalNahuatlCanonicalSourceSelectionFrame(
                        poisoned
                    ),
                ],
                inventoryContainsOpenStem: ctx
                    .getClassicalNahuatlCanonicalSourceStemInventory("vnc")
                    .some(record => record.stem === "cā-hua"),
            };
        })(),
        {
            open: {
                status: "authorized",
                issued: true,
                canonicalRecord: null,
                stem: "cā-hua",
                class: "A",
                authority: "user-supplied-lexical-analysis",
                openStemSource: true,
                copiedAccepted: false,
            },
            missingClass: [
                "blocked",
                "classical-source-verbstem-class-selection-required",
            ],
            poisoned: ["blocked", false],
            inventoryContainsOpenStem: false,
        }
    );

    return s;
}

module.exports = { run };
