"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_tomi_class_b_owner_exact");
    const selection = "claim-p2293";
    const issueReceipt = (facet) => {
        const source = ctx.buildClassicalTypeOneFinalIReplacementSource({
            analysisDomain: "classical-type-one-final-i-replacement",
            selection,
            requestedFacet: facet,
            participantChoice: `${selection}:${facet}`,
        });
        const result = ctx.evaluateClassicalTypeOneFinalIReplacement(source);
        return {
            source,
            result,
            evidence:
                ctx.getClassicalTypeOneFinalIReplacementExecutionEvidence(
                    result
                ),
        };
    };
    const sourceFacet =
        "aci-p199-l017-e339f574a3-tomi-source-class-b";
    const targetFacet =
        "aci-p199-l017-e339f574a3-03-tomi-causative-target-class-b";
    const sourceReceipt = issueReceipt(sourceFacet);
    const targetReceipt = issueReceipt(targetFacet);

    const observation = (receipt) => ({
        status: receipt.result.authorizationStatus,
        canonicalPath: receipt.result.payload.effectiveCanonicalPath,
        sourceCanonicalPath: receipt.result.payload.sourceCanonicalPath,
        facetValue: receipt.result.payload.facetValue,
        observationKind: receipt.result.payload.proofObservationKind,
        observationStatus: receipt.result.payload.proofObservationStatus,
        broadProxyRetired:
            receipt.result.payload.broadCompletionProxyRetired,
        resultCanonical:
            ctx.isClassicalTypeOneFinalIReplacementResult(receipt.result),
        evidenceCanonical:
            ctx.isClassicalTypeOneFinalIReplacementExecutionEvidence(
                receipt.evidence,
                receipt.result
            ),
    });

    s.eq("ACI-P199-L017-E339F574A3 owns tomi as Class B exactly",
        observation(sourceReceipt), {
            status: "authorized",
            canonicalPath: "derivations.tomi.sourceClass",
            sourceCanonicalPath: "derivations.tomi.sourceClass",
            facetValue: "B",
            observationKind: "direct-canonical-result-observation",
            observationStatus: "direct",
            broadProxyRetired: false,
            resultCanonical: true,
            evidenceCanonical: true,
        });

    s.eq("ACI-P199-L017-E339F574A3-03 owns tom-a as Class B exactly",
        observation(targetReceipt), {
            status: "authorized",
            canonicalPath: "derivations.tomi.options.0.targetClass",
            sourceCanonicalPath: "derivations.tomi.options.0.targetClass",
            facetValue: "B",
            observationKind: "direct-canonical-result-observation",
            observationStatus: "direct",
            broadProxyRetired: false,
            resultCanonical: true,
            evidenceCanonical: true,
        });

    const sourceDerivation =
        sourceReceipt.result.payload.definition.derivations.tomi;
    const targetDerivation =
        targetReceipt.result.payload.definition.derivations.tomi;
    s.eq("both receipts resolve through the exact signed Type 1 derivation", {
        source: [
            sourceDerivation.sourceStem,
            sourceDerivation.sourceClass,
            sourceDerivation.sourceValence,
        ],
        sourceOption: [
            sourceDerivation.options[0].ruleId,
            sourceDerivation.options[0].derivationRoute,
            sourceDerivation.options[0].targetStem,
            sourceDerivation.options[0].targetClass,
        ],
        targetOption: [
            targetDerivation.options[0].ruleId,
            targetDerivation.options[0].derivationRoute,
            targetDerivation.options[0].targetStem,
            targetDerivation.options[0].targetClass,
        ],
    }, {
        source: ["tomi", "B", "intransitive"],
        sourceOption: [
            "cn-l24-2431a-tomi-tom-a",
            "type-one-replacement-exact",
            "tom-a",
            "B",
        ],
        targetOption: [
            "cn-l24-2431a-tomi-tom-a",
            "type-one-replacement-exact",
            "tom-a",
            "B",
        ],
    });

    const sourceSelections = ["tomi", "tēmi"].map(stem => {
        const profile = ctx.inferClassicalNahuatlLesson7ClassProfile(stem, {
            valence: "intransitive",
        });
        const selectionFrame =
            ctx.getClassicalRuleLogicCanvasClassSelection(stem, {
                valence: "intransitive",
            });
        return {
            stem,
            profile: [
                profile.classId,
                profile.classSelectionRequired,
                profile.classGuidelineRuleId,
                profile.classGuidelineAllowedClassIds,
                profile.classDeterminedByLexicalException,
            ],
            selection: [
                selectionFrame.determinate,
                selectionFrame.selectedClassId,
                selectionFrame.allowedClassIds,
                selectionFrame.dropdownLocked,
            ],
        };
    });
    const openSelection = ctx.getClassicalRuleLogicCanvasClassSelection(
        "zami",
        { valence: "intransitive" }
    );
    s.eq("exact Canvas sources resolve to B without closing open final-i input", {
        exact: sourceSelections,
        unidentified: [
            openSelection.determinate,
            openSelection.selectedClassId,
            openSelection.allowedClassIds,
            openSelection.dropdownLocked,
        ],
    }, {
        exact: [{
            stem: "tomi",
            profile: [
                "B",
                false,
                "cn-l24-243-class-b-source-causative-distinction",
                ["B"],
                true,
            ],
            selection: [true, "B", ["B"], true],
        }, {
            stem: "tēmi",
            profile: [
                "B",
                false,
                "cn-l24-243-class-b-source-causative-distinction",
                ["B"],
                true,
            ],
            selection: [true, "B", ["B"], true],
        }],
        unidentified: [false, "", ["A", "B"], false],
    });

    s.eq("copied requests cannot mint either Class B atom receipt", {
        sourceAuthentic: sourceReceipt.result.authorizationStatus,
        targetAuthentic: targetReceipt.result.authorizationStatus,
        sourceCopied: ctx.evaluateClassicalTypeOneFinalIReplacement(
            JSON.parse(JSON.stringify(sourceReceipt.source))
        ).authorizationStatus,
        targetCopied: ctx.evaluateClassicalTypeOneFinalIReplacement(
            JSON.parse(JSON.stringify(targetReceipt.source))
        ).authorizationStatus,
    }, {
        sourceAuthentic: "authorized",
        targetAuthentic: "authorized",
        sourceCopied: "blocked",
        targetCopied: "blocked",
    });

    return s;
}

module.exports = { run };
