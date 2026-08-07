"use strict";

const { createSuite } = require("./runner");

const EXACT_TYPE_TWO_CASES = Object.freeze([
    Object.freeze({
        section: "25.2.1",
        stem: "caqui",
        verbClass: "B",
        sourceValence: "specific-projective",
        bridgeStem: "caqui-hua",
        targetStem: "caqui-tiā",
        formulaTargetStem: "caqui-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-caqui-hua-internal-base",
        formula: "#ni-0+c-0+⎕-0(caqui-tia)0+0-0#",
        written: "niccaquitia",
    }),
    Object.freeze({
        section: "25.2",
        stem: "itqui",
        verbClass: "A",
        sourceValence: "specific-projective",
        bridgeStem: "itqui-hua",
        targetStem: "itqui-tiā",
        formulaTargetStem: "itqui-tiā",
        prerequisitePolicy: "independent-lesson20",
        route: "type-two-tia-from-itqui-hua-base",
        formula: "#ni-0+c-0+⎕-0(itqui-tia)0+0-0#",
        written: "niquitquitia",
    }),
    Object.freeze({
        section: "25.2.4",
        stem: "hue-tz-ca",
        verbClass: "A",
        sourceValence: "intransitive",
        bridgeStem: "hue-tz-quī-hua",
        targetStem: "hue-tz-quī-tiā",
        formulaTargetStem: "hue-tz-quī-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-huetzqui-hua-internal-base",
        formula: "#ni-0+c-0(hue-tz-quī-tia)0+0-0#",
        written: "nichuetzquītia",
    }),
    Object.freeze({
        section: "25.2.4",
        stem: "mīx-i-hui",
        verbClass: "B",
        sourceValence: "intransitive",
        bridgeStem: "mīx-i-huī-hua",
        targetStem: "mīx-i-huī-tiā",
        formulaTargetStem: "mīx-i-huī-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-exact-destockal-ihui-internal-hua-base",
        formula: "#ni-0+c-0(mīx-i-huī-tia)0+0-0#",
        written: "nicmīxihuītia",
    }),
    Object.freeze({
        section: "25.2.4",
        stem: "tlatz-i-hui",
        verbClass: "B",
        sourceValence: "intransitive",
        bridgeStem: "tlatz-i-huī-hua",
        targetStem: "tlatz-i-huī-tiā",
        formulaTargetStem: "tlatz-i-huī-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-exact-destockal-ihui-internal-hua-base",
        formula: "#ni-0+c-0(tlatz-i-huī-tia)0+0-0#",
        written: "nictlatzihuītia",
    }),
    Object.freeze({
        section: "25.2.4",
        stem: "pol-i-hui",
        verbClass: "B",
        sourceValence: "intransitive",
        bridgeStem: "pol-i-huī-hua",
        targetStem: "pol-i-huī-tiā",
        formulaTargetStem: "pol-i-huī-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-exact-destockal-ihui-internal-hua-base",
        formula: "#ni-0+c-0(pol-i-huī-tia)0+0-0#",
        written: "nicpolihuītia",
    }),
    Object.freeze({
        section: "25.2.4",
        stem: "pach-i-hui",
        verbClass: "B",
        sourceValence: "intransitive",
        sourceLexemeId: "cn-vnc-pachihui-satiated",
        bridgeStem: "pach-i-hui-hua",
        targetStem: "pach-i-hui-tiā",
        formulaTargetStem: "pach-i-hui-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-exact-destockal-ihui-internal-hua-base",
        formula: "#ni-0+c-0(pach-i-hui-tia)0+0-0#",
        written: "nicpachihuitia",
    }),
    Object.freeze({
        section: "25.2.4",
        stem: "ihc-i-hui",
        verbClass: "B",
        sourceValence: "intransitive",
        bridgeStem: "ihc-i-huī-hua",
        targetStem: "ihc-i-huī-tiā",
        formulaTargetStem: "ihc-i-huī-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-exact-destockal-ihui-internal-hua-base",
        formula: "#ni-0+qu-0(ihc-i-huī-tia)0+0-0#",
        written: "niquihcihuītia",
    }),
]);

function getValenceDisplay(sourceValence = "") {
    return sourceValence === "intransitive" ? "intransitive" : "transitive";
}

function buildSource(ctx, {
    stem,
    verbClass,
    sourceValence,
    sourceLexemeId = "",
} = {}) {
    const valenceDisplay = getValenceDisplay(sourceValence);
    const canonicalSelection =
        ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
            enteredStem: stem,
            basalUnit: "vnc",
            valence: valenceDisplay,
            ...(sourceLexemeId ? { sourceLexemeId } : {}),
        });
    const canonicalStem = canonicalSelection.authorizationStatus === "authorized"
        ? canonicalSelection.canonicalStem
        : stem;
    const source = ctx.buildClassicalNahuatlVerbstemClassFrame(
        canonicalStem,
        {
            subject: "3sg",
            mood: "indicative",
            tense: "present",
            verbClass,
            perfectiveClass: verbClass,
            valence: sourceValence,
            requestedSourceValence: sourceValence,
            transitivity: valenceDisplay,
            objectKind: sourceValence === "intransitive"
                ? "none"
                : "specific-projective",
            objectPerson: sourceValence === "intransitive" ? "" : "3sg",
            ...(canonicalSelection.authorizationStatus === "authorized"
                ? { canonicalSourceSelectionFrame: canonicalSelection }
                : {}),
        }
    );
    return { canonicalSelection, source };
}

function getExactReceipt(ctx, specification) {
    const { canonicalSelection, source } = buildSource(ctx, specification);
    const inventory =
        ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
            derivationType: "causative",
        });
    const option = inventory.options.find(candidate => (
        candidate.targetStem === specification.targetStem
        && candidate.derivationRoute === specification.route
    )) || null;
    const bridge = option?.typeTwoInternalBridgeFrame || null;
    const operation =
        ctx.deriveClassicalNahuatlVncDerivationOperationFrame(source, {
            derivationType: "causative",
            optionId: option?.optionId
                || `missing-${specification.stem}-${specification.targetStem}`,
            targetSubject: "1sg",
            causativeObjectKind: "specific-projective",
        });
    const machinery = ctx.buildClassicalNahuatlDerivedVncMachineryFrame(
        source,
        operation,
        {
            mood: "indicative",
            tense: "present",
            targetSubject: "1sg",
        }
    );
    const copiedBridge = bridge ? { ...bridge } : null;
    const forgedOperation = bridge
        ? {
            ...operation,
            selectedOption: {
                ...operation.selectedOption,
                typeTwoInternalBridgeFrame: copiedBridge,
            },
        }
        : null;
    return {
        section: specification.section,
        stem: specification.stem,
        sourceSelectionCanonical:
            ctx.isClassicalNahuatlCanonicalSourceSelectionFrame(
                canonicalSelection
            ),
        sourceStem: source.stem || "",
        sourceStatus: source.authorizationStatus || "",
        inventoryCanonical:
            ctx.isClassicalNahuatlVncDerivationOptionInventory(inventory),
        exactOptionCount: inventory.options.filter(candidate => (
            candidate.targetStem === specification.targetStem
            && candidate.derivationRoute === specification.route
        )).length,
        targetStem: option?.targetStem || "",
        formulaTargetStem: option?.formulaTargetStem || "",
        route: option?.derivationRoute || "",
        bridge: bridge
            ? {
                kind: bridge.kind,
                status: bridge.authorizationStatus,
                sourceStem: bridge.sourceStem,
                nonactiveStem: bridge.nonactiveStem,
                targetStem: bridge.targetStem,
                formulaTargetStem: bridge.formulaTargetStem,
                prerequisitePolicy: bridge.lesson20PrerequisitePolicy,
                userSelectable: bridge.userSelectable,
                internalPrerequisiteOnly: bridge.internalPrerequisiteOnly,
                typedSourceAuthority: bridge.typedSourceAuthority,
                callerSuppliedAuthorityAccepted:
                    bridge.callerSuppliedAuthorityAccepted,
                lesson20OperationAuthority:
                    bridge.lesson20OperationAuthority,
                curriculumOrderAuthority:
                    bridge.curriculumOrderAuthority,
                lessonMetadataAuthority: bridge.lessonMetadataAuthority,
                formulaStringAuthority: bridge.formulaStringAuthority,
                surfaceStringAuthority: bridge.surfaceStringAuthority,
                frozen: Object.isFrozen(bridge),
            }
            : null,
        legacyParallelBridgePresent: Boolean(
            option
            && Object.prototype.hasOwnProperty.call(
                option,
                "exactNonactiveBridgeFrame"
            )
        ),
        hiddenLesson20RecordPresent:
            Boolean(option?.lesson20NonactiveStemRecord),
        operationStatus: operation.authorizationStatus || "",
        operationCanonical:
            ctx.isClassicalNahuatlVncDerivationOperationFrame(operation),
        operationTargetStem: operation.targetStem || "",
        optionSignaturePreserved: Boolean(
            option?.canonicalSignature
            && operation.selectedOption?.canonicalSignature
                === option.canonicalSignature
        ),
        bridgeIdentityPreserved:
            operation.selectedOption?.typeTwoInternalBridgeFrame === bridge,
        machineryStatus: machinery.authorizationStatus || "",
        machineryCanonical:
            ctx.isClassicalNahuatlDerivedVncMachineryFrame(machinery),
        machineryOperationIdentity:
            machinery.derivationOperationFrame === operation,
        copiedInventoryAccepted:
            ctx.isClassicalNahuatlVncDerivationOptionInventory({
                ...inventory,
            }),
        copiedOperationAccepted:
            ctx.isClassicalNahuatlVncDerivationOperationFrame({
                ...operation,
            }),
        forgedCopiedBridgeOperationAccepted:
            forgedOperation
                ? ctx.isClassicalNahuatlVncDerivationOperationFrame(
                    forgedOperation
                )
                : false,
    };
}

function getApplicationProjection(ctx, specification) {
    const application = ctx.createClassicalNahuatlVncApplication(ctx);
    const request = {
        sourceStem: specification.stem,
        verbClass: specification.verbClass,
        sourceValence: specification.sourceValence,
        sourceSubject: "3sg",
        objectPerson: specification.sourceValence === "intransitive"
            ? ""
            : "3sg",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        requestedDerivation: "causative",
        causativeObjectKind: "specific-projective",
        sourceVoice: "active",
        requestedVoice: "active",
        ...(specification.sourceLexemeId
            ? { sourceLexemeId: specification.sourceLexemeId }
            : {}),
    };
    const preview = application.evaluate(request);
    const option = (
        preview.controlFrame?.derivationOptionInventory?.options || []
    ).find(candidate => (
        candidate.targetStem === specification.targetStem
        && candidate.derivationRoute === specification.route
    )) || null;
    const resolved = application.evaluate({
        ...request,
        derivationOptionId: option?.optionId
            || `missing-${specification.stem}-${specification.targetStem}`,
    });
    return {
        section: specification.section,
        stem: specification.stem,
        status: resolved.authorizationStatus,
        targetStem:
            resolved.resultFrame?.derivationOperationFrame?.targetStem || "",
        formula: resolved.resultFrame?.formulaRealization || "",
        written: resolved.resultFrame?.surfaceRealization || "",
        formulaStringAuthority:
            resolved.resultFrame?.formulaStringAuthority === true,
        surfaceStringAuthority:
            resolved.resultFrame?.surfaceStringAuthority === true,
    };
}

function run(ctx = {}) {
    const s = createSuite("classical_final_ka_ki_causative_category");

    s.eq(
        "Canvas §§25.2–25.2.4 exact type-two routes consume owner-issued internal nonactive prerequisites",
        EXACT_TYPE_TWO_CASES.map(specification =>
            getExactReceipt(ctx, specification)
        ),
        EXACT_TYPE_TWO_CASES.map(specification => ({
            section: specification.section,
            stem: specification.stem,
            sourceSelectionCanonical: true,
            sourceStem: specification.stem,
            sourceStatus: "authorized",
            inventoryCanonical: true,
            exactOptionCount: 1,
            targetStem: specification.targetStem,
            formulaTargetStem: specification.formulaTargetStem,
            route: specification.route,
            bridge: {
                kind:
                    "classical-nahuatl-type-two-causative-internal-nonactive-bridge-frame",
                status: "authorized",
                sourceStem: specification.stem,
                nonactiveStem: specification.bridgeStem,
                targetStem: specification.targetStem,
                formulaTargetStem: specification.formulaTargetStem,
                prerequisitePolicy: specification.prerequisitePolicy,
                userSelectable: false,
                internalPrerequisiteOnly: true,
                typedSourceAuthority: true,
                callerSuppliedAuthorityAccepted: false,
                lesson20OperationAuthority: false,
                curriculumOrderAuthority: false,
                lessonMetadataAuthority: false,
                formulaStringAuthority: false,
                surfaceStringAuthority: false,
                frozen: true,
            },
            legacyParallelBridgePresent: false,
            hiddenLesson20RecordPresent: false,
            operationStatus: "authorized",
            operationCanonical: true,
            operationTargetStem: specification.targetStem,
            optionSignaturePreserved: true,
            bridgeIdentityPreserved: true,
            machineryStatus: "authorized",
            machineryCanonical: true,
            machineryOperationIdentity: true,
            copiedInventoryAccepted: false,
            copiedOperationAccepted: false,
            forgedCopiedBridgeOperationAccepted: false,
        }))
    );

    s.eq(
        "The same typed results independently project exact formula and written forms",
        EXACT_TYPE_TWO_CASES.map(specification =>
            getApplicationProjection(ctx, specification)
        ),
        EXACT_TYPE_TWO_CASES.map(specification => ({
            section: specification.section,
            stem: specification.stem,
            status: "authorized",
            targetStem: specification.targetStem,
            formula: specification.formula,
            written: specification.written,
            formulaStringAuthority: false,
            surfaceStringAuthority: false,
        }))
    );

    s.eq(
        "Unattested shape-derived ca/qui outputs cannot be recovered from old hidden Lesson 20 assumptions",
        [
            {
                stem: "to-tō-ca",
                verbClass: "A",
                sourceValence: "intransitive",
                forbiddenTarget: "to-tō-quī-tiā",
            },
            {
                stem: "pā-tz-ca",
                verbClass: "A",
                sourceValence: "specific-projective",
                forbiddenTarget: "pā-tz-qui-tiā",
            },
        ].map(specification => {
            const sourceSelection =
                ctx.buildClassicalNahuatlCanonicalSourceSelectionFrame({
                    enteredStem: specification.stem,
                    basalUnit: "vnc",
                    valence: getValenceDisplay(
                        specification.sourceValence
                    ),
                });
            const application =
                ctx.createClassicalNahuatlVncApplication(ctx);
            const evaluated = application.evaluate({
                sourceStem: specification.stem,
                verbClass: specification.verbClass,
                sourceValence: specification.sourceValence,
                sourceSubject: "3sg",
                objectPerson:
                    specification.sourceValence === "intransitive"
                        ? ""
                        : "3sg",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "causative",
                causativeObjectKind: "specific-projective",
                sourceVoice: "active",
                requestedVoice: "active",
            });
            const forbidden = (
                evaluated.controlFrame?.derivationOptionInventory?.options
                || []
            ).find(option =>
                option.targetStem === specification.forbiddenTarget
            ) || null;
            return {
                stem: specification.stem,
                sourceSelectionCanonical:
                    ctx.isClassicalNahuatlCanonicalSourceSelectionFrame(
                        sourceSelection
                    ),
                forbiddenTargetPresent: Boolean(forbidden),
                forbiddenInternalBridgePresent:
                    Boolean(forbidden?.typeTwoInternalBridgeFrame),
                forbiddenResultPresent:
                    evaluated.resultFrame?.derivationOperationFrame
                        ?.targetStem === specification.forbiddenTarget,
            };
        }),
        [
            {
                stem: "to-tō-ca",
                sourceSelectionCanonical: false,
                forbiddenTargetPresent: false,
                forbiddenInternalBridgePresent: false,
                forbiddenResultPresent: false,
            },
            {
                stem: "pā-tz-ca",
                sourceSelectionCanonical: true,
                forbiddenTargetPresent: false,
                forbiddenInternalBridgePresent: false,
                forbiddenResultPresent: false,
            },
        ]
    );

    return s;
}

module.exports = { run };
