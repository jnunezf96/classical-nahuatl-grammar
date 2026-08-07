"use strict";

const { createSuite } = require("./runner");

function buildSource(ctx, stem, verbClass, sourceValence) {
    const objectKind = sourceValence === "intransitive" ? "none" : "specific-projective";
    return ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
        subject: "3sg",
        mood: "indicative",
        tense: "present",
        verbClass,
        perfectiveClass: verbClass,
        valence: sourceValence,
        transitivity: sourceValence === "intransitive" ? "intransitive" : "transitive",
        objectKind,
        objectPerson: objectKind === "specific-projective" ? "3sg" : "",
    });
}

function summarizeDirect(ctx, stem) {
    const source = buildSource(ctx, stem, "C", "specific-projective");
    const inventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "applicative",
    });
    return {
        status: inventory.authorizationStatus,
        canonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
        selectorRequired: inventory.selectorRequired,
        options: inventory.options.map(option => ({
            target: option.targetStem,
            route: option.derivationRoute,
            tier: option.formationRuleTier,
            exact: option.exactWitness === true,
            history: option.sourceHistoryChoice || "",
            generatedConstruction: Boolean(option.targetConstruction?.operation),
            surfaceAuthority: option.surfaceArtifactAuthority === true,
            callerTargetAuthority: option.callerSuppliedTargetAllowed === true,
        })),
    };
}

function deriveStack(ctx, sourceStem, sourceClass, expectedCausativeTarget) {
    const source = buildSource(ctx, sourceStem, sourceClass, "intransitive");
    const causativeInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
        derivationType: "causative",
    });
    const causativeOption = causativeInventory.options.find(option => (
        option.targetStem === expectedCausativeTarget
        && option.causativeOaHistory
    ));
    const causativeOperation = ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
        derivationType: "causative",
        optionId: causativeOption?.optionId || "missing-o-a-history",
        targetSubject: "1sg",
    });
    const causativeMachinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(source, causativeOperation, {
        mood: "indicative",
        tense: "present",
        targetSubject: "1sg",
    });
    const applicativeInventory = ctx.getClassicalNahuatlVncDerivationOptionInventory(causativeMachinery, {
        derivationType: "applicative",
    });
    return {
        causativeTarget: causativeOption?.targetStem || "",
        history: causativeOption?.causativeOaHistory?.underlyingDestockalVowel || "",
        causativeCanonical: ctx.isClassicalNahuatlVncDerivationOperationFrame(causativeOperation)
            && ctx.isClassicalNahuatlDerivedVncMachineryFrame(causativeMachinery),
        applicativeCanonical: ctx.isClassicalNahuatlVncDerivationOptionInventory(applicativeInventory),
        selectorRequired: applicativeInventory.selectorRequired,
        options: applicativeInventory.options.map(option => ({
            target: option.targetStem,
            route: option.derivationRoute,
            tier: option.formationRuleTier,
            exact: option.exactWitness === true,
        })),
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson26_oa_applicative_rule_logic");

    s.eq(
        "Root-final l is automatic, while an unknown consonant-final o-a history offers only generated history choices",
        {
            rootFinalL: summarizeDirect(ctx, "xel-o-ā"),
            unknownHistory: summarizeDirect(ctx, "pach-o-ā"),
            rootFinalOPlusA: summarizeDirect(ctx, "coco-a"),
        },
        {
            rootFinalL: {
                status: "authorized",
                canonical: true,
                selectorRequired: false,
                options: [{
                    target: "xel-huiā",
                    route: "type-two-huia-from-root-final-l-o-a",
                    tier: "typed-internal-morphology",
                    exact: false,
                    history: "",
                    generatedConstruction: true,
                    surfaceAuthority: false,
                    callerTargetAuthority: false,
                }],
            },
            unknownHistory: {
                status: "authorized",
                canonical: true,
                selectorRequired: true,
                options: [
                    { target: "pach-a-l-huiā", route: "type-two-huia-from-selected-a-hui-history", tier: "generated-source-history-choice", exact: false, history: "a-hui", generatedConstruction: true, surfaceAuthority: false, callerTargetAuthority: false },
                    { target: "pach-i-l-huiā", route: "type-two-huia-from-selected-i-hui-history", tier: "generated-source-history-choice", exact: false, history: "i-hui", generatedConstruction: true, surfaceAuthority: false, callerTargetAuthority: false },
                    { target: "pach-o-l-huiā", route: "type-two-huia-from-selected-root-final-o-history", tier: "generated-source-history-choice", exact: false, history: "root-final-o", generatedConstruction: true, surfaceAuthority: false, callerTargetAuthority: false },
                ],
            },
            rootFinalOPlusA: {
                status: "authorized",
                canonical: true,
                selectorRequired: false,
                options: [{
                    target: "coco-l-huiā",
                    route: "type-two-huia-from-root-final-o-plus-causative-a",
                    tier: "typed-internal-morphology",
                    exact: false,
                    history: "",
                    generatedConstruction: true,
                    surfaceAuthority: false,
                    callerTargetAuthority: false,
                }],
            },
        }
    );

    s.eq(
        "Signed earlier derivations eliminate the surface menu for every reusable 26.9 history",
        {
            iHui: deriveStack(ctx, "tep-i-hui", "B", "tep-o-ā"),
            aHui: deriveStack(ctx, "tep-a-hui", "B", "tep-o-ā"),
            oHui: deriveStack(ctx, "tlap-o-hui", "B", "tlap-o-ā"),
            rootPlusYa: deriveStack(ctx, "coco-ya", "A", "coco-ā"),
        },
        {
            iHui: {
                causativeTarget: "tep-o-ā", history: "i", causativeCanonical: true, applicativeCanonical: true, selectorRequired: false,
                options: [{ target: "tep-i-l-huiā", route: "type-two-huia-from-signed-causative-o-a-history", tier: "signed-prior-derivation-history", exact: false }],
            },
            aHui: {
                causativeTarget: "tep-o-ā", history: "a", causativeCanonical: true, applicativeCanonical: true, selectorRequired: false,
                options: [{ target: "tep-a-l-huiā", route: "type-two-huia-from-signed-causative-o-a-history", tier: "signed-prior-derivation-history", exact: false }],
            },
            oHui: {
                causativeTarget: "tlap-o-ā", history: "o", causativeCanonical: true, applicativeCanonical: true, selectorRequired: false,
                options: [{ target: "tlap-o-l-huiā", route: "type-two-huia-from-signed-causative-o-a-history", tier: "signed-prior-derivation-history", exact: false }],
            },
            rootPlusYa: {
                causativeTarget: "coco-ā", history: "root-plus-ya", causativeCanonical: true, applicativeCanonical: true, selectorRequired: false,
                options: [{ target: "coco-l-huiā", route: "type-two-huia-from-signed-causative-o-a-history", tier: "signed-prior-derivation-history", exact: false }],
            },
        }
    );

    s.eq(
        "Only genuine 26.9 exception and suppletion records remain exact",
        {
            exceptionalLia: summarizeDirect(ctx, "tēm-o-ā"),
            suppletive: summarizeDirect(ctx, "iht-o-ā").options.filter(option => option.exact),
        },
        {
            exceptionalLia: {
                status: "authorized",
                canonical: true,
                selectorRequired: false,
                options: [{
                    target: "tēm-o-liā",
                    route: "type-two-exceptional-final-o-a-to-o-lia",
                    tier: "exceptional-lexical-rule",
                    exact: true,
                    history: "",
                    generatedConstruction: true,
                    surfaceAuthority: false,
                    callerTargetAuthority: false,
                }],
            },
            suppletive: [{
                target: "il-huiā",
                route: "type-two-suppletive-ihtoa-to-il-huia-exact",
                tier: "suppletive-lexical-rule",
                exact: true,
                history: "",
                generatedConstruction: true,
                surfaceAuthority: false,
                callerTargetAuthority: false,
            }],
        }
    );

    return s;
}

module.exports = { run };
