"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_type_one_final_a_replacement_exact");
    const issueReceipt = (selection, facet) => {
        const source = ctx.buildClassicalTypeOneFinalAReplacementSource({
            analysisDomain: "classical-type-one-final-a-replacement",
            selection,
            requestedFacet: facet,
            participantChoice: `${selection}:${facet}`,
        });
        const result = ctx.evaluateClassicalTypeOneFinalAReplacement(source);
        return {
            source,
            result,
            evidence:
                ctx.getClassicalTypeOneFinalAReplacementExecutionEvidence(
                    result
                ),
        };
    };
    const onlyReplacementReceipt = issueReceipt(
        "claim-p2296",
        "aci-p200-l002-cc9101a25b-type-one-final-a-replacement-only"
    );
    const classPerfectiveReceipt = issueReceipt(
        "claim-p2297",
        "aci-p200-l003-77059cb930-homophonous-imperfective-distinct-perfective-a-to-b-contrast"
    );
    const procedureReceipt = issueReceipt(
        "claim-p2298",
        "aci-p200-l003-982e8acdea-ordinary-final-a-replacement-procedure"
    );
    const observation = (receipt) => ({
        status: receipt.result.authorizationStatus,
        canonicalPath: receipt.result.payload.effectiveCanonicalPath,
        sourceCanonicalPath: receipt.result.payload.sourceCanonicalPath,
        facetValue: receipt.result.payload.facetValue,
        observationKind: receipt.result.payload.proofObservationKind,
        observationStatus: receipt.result.payload.proofObservationStatus,
        resultCanonical:
            ctx.isClassicalTypeOneFinalAReplacementResult(receipt.result),
        evidenceCanonical:
            ctx.isClassicalTypeOneFinalAReplacementExecutionEvidence(
                receipt.evidence,
                receipt.result
            ),
    });

    s.eq("ACI-P200-L002-CC9101A25B owns Type 1 replacement-only", {
        ...observation(onlyReplacementReceipt),
    }, {
        status: "authorized",
        canonicalPath:
            "constraints.finalAReplacementMorphologicalContrast.typeOneReplacementOnly",
        sourceCanonicalPath:
            "constraints.finalAReplacementMorphologicalContrast.typeOneReplacementOnly",
        facetValue: true,
        observationKind: "direct-canonical-result-observation",
        observationStatus: "direct",
        resultCanonical: true,
        evidenceCanonical: true,
    });

    const classPerfectiveContrast = {
        homophonousImperfectives: true,
        morphologicallyDistinctImperfectives: true,
        sourceClass: "A",
        targetClass: "B",
        sourceImperfectiveStem: "ē-hua",
        targetImperfectiveStem: "ē-hu-a",
        sourcePerfectiveStem: "ē-hua",
        targetPerfectiveStem: "ē-uh",
        distinctPerfectives: true,
    };
    s.eq("ACI-P200-L003-77059CB930 owns the A-to-B perfective contrast", {
        ...observation(classPerfectiveReceipt),
    }, {
        status: "authorized",
        canonicalPath:
            "constraints.finalAReplacementMorphologicalContrast.classPerfectiveContrast",
        sourceCanonicalPath:
            "constraints.finalAReplacementMorphologicalContrast.classPerfectiveContrast",
        facetValue: classPerfectiveContrast,
        observationKind: "direct-canonical-result-observation",
        observationStatus: "direct",
        resultCanonical: true,
        evidenceCanonical: true,
    });

    s.eq("ACI-P200-L003-982E8ACDEA owns ordinary final-a replacement", {
        ...observation(procedureReceipt),
    }, {
        status: "authorized",
        canonicalPath:
            "constraints.finalAReplacementMorphologicalContrast.replacementProcedure",
        sourceCanonicalPath:
            "constraints.finalAReplacementMorphologicalContrast.replacementProcedure",
        facetValue:
            "replace-the-source-final-a-with-homophonous-causative-a-and-expose-the-hu-a-boundary",
        observationKind: "direct-canonical-result-observation",
        observationStatus: "direct",
        resultCanonical: true,
        evidenceCanonical: true,
    });

    const definition = onlyReplacementReceipt.result.payload.definition;
    const ownedDerivation = definition.derivations.ehua;
    const ownedOption = ownedDerivation.options.find(
        option => option.derivationSubtype === "type-one"
    );
    const ownedConstraint =
        definition.constraints.finalAReplacementMorphologicalContrast;
    s.eq("the receipts bind the exact signed homophonous replacement", {
        source: [
            ownedDerivation.sourceStem,
            ownedDerivation.sourceClass,
            ownedDerivation.sourceValence,
        ],
        option: {
            ruleId: ownedOption.ruleId,
            route: ownedOption.derivationRoute,
            procedure: ownedOption.procedure,
            targetStem: ownedOption.targetStem,
            targetClass: ownedOption.targetClass,
            stemRelation: ownedOption.stemRelation,
            callerSuppliedTargetAllowed:
                ownedOption.callerSuppliedTargetAllowed,
        },
        constraintStatus: ownedConstraint.authorizationStatus,
        constraintFrozen: Object.isFrozen(ownedConstraint),
        contrast: ownedConstraint.classPerfectiveContrast,
    }, {
        source: ["ē-hua", "A", "intransitive"],
        option: {
            ruleId: "cn-l24-2432a-ehua-e-hu-a",
            route: "type-one-final-a-morphological-replacement-exact",
            procedure:
                "replace-the-source-final-a-with-homophonous-causative-a-and-expose-the-hu-a-boundary",
            targetStem: "ē-hu-a",
            targetClass: "B",
            stemRelation: "surface-identical-morphological-replacement",
            callerSuppliedTargetAllowed: false,
        },
        constraintStatus: "authorized",
        constraintFrozen: true,
        contrast: classPerfectiveContrast,
    });

    const buildSource = (stem) =>
        ctx.buildClassicalNahuatlVerbstemClassFrame(stem, {
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            verbClass: "A",
            perfectiveClass: "A",
            valence: "intransitive",
            transitivity: "intransitive",
            objectKind: "none",
            objectPerson: "",
        });
    const inspectInventory = (stem) => {
        const inventory =
            ctx.getClassicalNahuatlVncDerivationOptionInventory(
                buildSource(stem),
                { derivationType: "causative" }
            );
        const typeOne = inventory.options.find(
            option => option.derivationSubtype === "type-one"
        );
        return {
            status: inventory.authorizationStatus,
            selectionRequired: inventory.selectionRequired,
            targets: inventory.options.map(option => option.targetStem),
            typeOneRoute: typeOne?.derivationRoute || "",
            typeOneOperation: typeOne?.targetConstruction?.operation || "",
            typeOneAddsInsteadOfReplacing:
                /append|addition/u.test([
                    typeOne?.derivationRoute,
                    typeOne?.procedure,
                    typeOne?.targetConstruction?.operation,
                ].join(" ")),
            labels: inventory.options.map(option => (
                ctx.getClassicalDerivationOptionLabel(option, "causative")
            )),
        };
    };
    s.eq("exact and unlisted matching Sources use normal Grammar choices", [
        inspectInventory("ē-hua"),
        inspectInventory("xep-ē-hua"),
    ], [{
        status: "authorized",
        selectionRequired: true,
        targets: ["ē-hu-a", "ē-tiā"],
        typeOneRoute: "type-one-final-a-morphological-replacement-exact",
        typeOneOperation: "morphological-replacement",
        typeOneAddsInsteadOfReplacing: false,
        labels: [
            "Type 1 · ē-hu-a · morphological replacement",
            "Type 2 · ē-tiā · nonactive replacement",
        ],
    }, {
        status: "authorized",
        selectionRequired: true,
        targets: ["xep-ē-hu-a", "xep-ē-tiā"],
        typeOneRoute: "type-one-destockal-hua-replacement",
        typeOneOperation: "replace-morpheme",
        typeOneAddsInsteadOfReplacing: false,
        labels: [
            "Type 1 · xep-ē-hu-a · morphological replacement",
            "Type 2 · xep-ē-tiā · nonactive replacement",
        ],
    }]);

    const request = {
        sourceStem: "ē-hua",
        verbClass: "A",
        sourceValence: "intransitive",
        sourceSubject: "3sg",
        subject: "1sg",
        objectKind: "none",
        objectPerson: "",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        sourceVoice: "active",
        requestedVoice: "active",
    };
    const preview = ctx.evaluateClassicalNahuatlVncApplication(request);
    const typeOne = preview.controlFrame.derivationOptionInventory.options.find(
        option => option.derivationSubtype === "type-one"
    );
    const applied = ctx.evaluateClassicalNahuatlVncApplication({
        ...request,
        derivationOptionId:
            typeOne?.optionId || "missing-final-a-type-one-option",
    });
    const cue = ctx.getClassicalFormulaDerivedAnnotations(
        applied.resultFrame?.formulaRealization || "",
        null,
        applied
    ).find(annotation => (
        annotation.role === "lesson24-final-a-and-ya-causatives"
    ));
    s.eq("normal Causative Grammar and Result agree about the selected formation", {
        previewStatus: preview.authorizationStatus,
        previewReason: preview.blockReason,
        selectionRequired:
            preview.controlFrame.derivationOptionInventory.selectionRequired,
        appliedStatus: applied.authorizationStatus,
        formula: applied.resultFrame?.formulaRealization || "",
        surface: applied.resultFrame?.surfaceRealization || "",
        resultCanonical: ctx.isClassicalNahuatlVncApplicationResultFrame(
            applied.resultFrame
        ),
        cueNamesReplacement:
            cue?.label.includes("remove source-a · add causative-a") === true,
        cueNamesSurfaceIdentity:
            cue?.label.includes(
                "morphological replacement with the same visible spelling"
            ) === true,
        cueNamesGrammarSelection:
            cue?.label.includes("Type 1 selected in Grammar") === true,
        cueFalselyClaimsFixed:
            cue?.label.includes("formation fixed by Source analysis") === true,
    }, {
        previewStatus: "blocked",
        previewReason: "classical-vnc-derivation-option-selection-required",
        selectionRequired: true,
        appliedStatus: "authorized",
        formula: "#ni-0+qu-0(ē-hu-a)0+0-0#",
        surface: "niquēhua",
        resultCanonical: true,
        cueNamesReplacement: true,
        cueNamesSurfaceIdentity: true,
        cueNamesGrammarSelection: true,
        cueFalselyClaimsFixed: false,
    });

    s.eq("copied requests cannot mint any final-a atom receipt", {
        onlyReplacementAuthentic:
            onlyReplacementReceipt.result.authorizationStatus,
        classPerfectiveAuthentic:
            classPerfectiveReceipt.result.authorizationStatus,
        procedureAuthentic: procedureReceipt.result.authorizationStatus,
        onlyReplacementCopied:
            ctx.evaluateClassicalTypeOneFinalAReplacement(
                JSON.parse(JSON.stringify(onlyReplacementReceipt.source))
            ).authorizationStatus,
        classPerfectiveCopied:
            ctx.evaluateClassicalTypeOneFinalAReplacement(
                JSON.parse(JSON.stringify(classPerfectiveReceipt.source))
            ).authorizationStatus,
        procedureCopied:
            ctx.evaluateClassicalTypeOneFinalAReplacement(
                JSON.parse(JSON.stringify(procedureReceipt.source))
            ).authorizationStatus,
    }, {
        onlyReplacementAuthentic: "authorized",
        classPerfectiveAuthentic: "authorized",
        procedureAuthentic: "authorized",
        onlyReplacementCopied: "blocked",
        classPerfectiveCopied: "blocked",
        procedureCopied: "blocked",
    });

    return s;
}

module.exports = { run };
