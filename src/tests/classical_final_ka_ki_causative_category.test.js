"use strict";

const { createSuite } = require("./runner");

const EXACT_TYPE_TWO_CASES = Object.freeze([
    Object.freeze({
        section: "25.2",
        stem: "cochi",
        verbClass: "B",
        sourceValence: "intransitive",
        bridgeStem: "cochī-hua",
        targetStem: "cochī-tiā",
        formulaTargetStem: "cochī-tiā",
        prerequisitePolicy: "independent-lesson20",
        lesson20RecordPresent: true,
        route: "type-two-tia-from-cochi-hua-base",
        formula: "#ni-0+c-0(cochī-tia)0+0-0#",
        written: "niccochītia",
    }),
    Object.freeze({
        section: "25.2.1",
        stem: "caqui",
        verbClass: "B",
        sourceValence: "specific-projective",
        bridgeStem: "caquī-hua",
        targetStem: "caquī-tiā",
        formulaTargetStem: "caquī-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-caqui-hua-internal-base",
        formula: "#ni-0+c-0+⎕-0(caquī-tia)0+0-0#",
        written: "niccaquītia",
    }),
    Object.freeze({
        section: "25.2.1",
        stem: "chōca",
        verbClass: "A",
        sourceValence: "intransitive",
        bridgeStem: "chōquī-hua",
        targetStem: "chōquī-tiā",
        formulaTargetStem: "chōquī-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-choqui-hua-internal-base",
        formula: "#ni-0+c-0(chōquī-tia)0+0-0#",
        written: "nicchōquītia",
    }),
    Object.freeze({
        section: "25.2.2",
        stem: "nēci",
        verbClass: "B",
        sourceValence: "intransitive",
        bridgeStem: "nēxī-hua",
        targetStem: "nēxī-tiā",
        formulaTargetStem: "nēxī-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-nexi-hua-internal-base",
        formula: "#ni-0+c-0(nēxī-tia)0+0-0#",
        written: "nicnēxītia",
    }),
    Object.freeze({
        section: "25.2.2",
        stem: "iuc-ci",
        verbClass: "A",
        sourceValence: "intransitive",
        bridgeStem: "iuc-xi-hua",
        targetStem: "iuc-xi-tiā",
        formulaTargetStem: "iuc-xi-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-iucxi-hua-internal-base",
        formula: "#ni-0+qu-0(iuc-xi-tia)0+0-0#",
        written: "niquiucxitia",
    }),
    Object.freeze({
        section: "25.2.2",
        stem: "ihza",
        verbClass: "A",
        sourceValence: "intransitive",
        bridgeStem: "ihxi-hua",
        targetStem: "ihxi-tiā",
        formulaTargetStem: "ihxi-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-ihxi-hua-internal-base",
        formula: "#ni-0+qu-0(ihxi-tia)0+0-0#",
        written: "niquihxitia",
    }),
    Object.freeze({
        section: "25.2.3",
        stem: "itt-a",
        verbClass: "A",
        sourceValence: "specific-projective",
        bridgeStem: "itt-ī-hua",
        targetStem: "itt-ī-tiā",
        formulaTargetStem: "itt-ī-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-itti-hua-internal-base",
        formula: "#ni-0+c-0+⎕-0(itt-ī-tia)0+0-0#",
        written: "niquittītia",
    }),
    Object.freeze({
        section: "25.2.3",
        stem: "mati",
        verbClass: "B",
        sourceValence: "specific-projective",
        bridgeStem: "machī-hua",
        targetStem: "machī-tiā",
        formulaTargetStem: "machī-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-machi-hua-internal-base",
        formula: "#ni-0+c-0+⎕-0(machī-tia)0+0-0#",
        written: "nicmachītia",
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
        stem: "hue-tz-ca",
        verbClass: "A",
        sourceValence: "specific-projective",
        bridgeStem: "hue-tz-quī-hua",
        targetStem: "hue-tz-quī-tiā",
        formulaTargetStem: "hue-tz-quī-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-huetzqui-hua-internal-base",
        formula: "#ni-0+c-0+⎕-0(hue-tz-quī-tia)0+0-0#",
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
        bridgeStem: "pach-i-huī-hua",
        targetStem: "pach-i-huī-tiā",
        formulaTargetStem: "pach-i-huī-tiā",
        prerequisitePolicy: "internal-only",
        route: "type-two-tia-from-exact-destockal-ihui-internal-hua-base",
        formula: "#ni-0+c-0(pach-i-huī-tia)0+0-0#",
        written: "nicpachihuītia",
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

const EXACT_GENERIC_HUA_CASES = Object.freeze([
    Object.freeze({
        section: "25.2",
        stem: "ī",
        verbClass: "A",
        sourceValence: "specific-projective",
        targetStem: "ī-tiā",
        route: "type-two-tia-from-hua-nonactive",
        formula: "#ni-0+c-0+⎕-0(ī-tia)0+0-0#",
        written: "niquītia",
    }),
]);

const SHORT_FINAL_I_AFTER_CLUSTER_CASES = new Set([
    "itqui:specific-projective",
    "iuc-ci:intransitive",
    "ihza:intransitive",
]);

function getExpectedQuantityOperation(specification) {
    const key = `${specification.stem}:${specification.sourceValence}`;
    if (specification.stem === "hue-tz-ca") {
        return "preserve-long-final-i";
    }
    if (specification.stem === "itt-a") {
        return "lengthen-final-i-apparent-geminate-single-phone";
    }
    return SHORT_FINAL_I_AFTER_CLUSTER_CASES.has(key)
        ? "preserve-short-final-i"
        : "lengthen-final-i";
}

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
    const initialVowelKind = ["real", "supportive"].includes(
        canonicalSelection.canonicalRecord?.initialIAnalysis?.kind
    )
        ? canonicalSelection.canonicalRecord.initialIAnalysis.kind
        : "";
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
            ...(initialVowelKind ? { initialVowelKind } : {}),
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
            hiddenLesson20RecordPresent:
                specification.lesson20RecordPresent === true,
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
        "Every exact §25.2 hua bridge derives final-i quantity from shape without a user choice",
        EXACT_TYPE_TWO_CASES.map(specification => {
            const { source } = buildSource(ctx, specification);
            const inventory =
                ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "causative",
                });
            const option = inventory.options.find(candidate => (
                candidate.targetStem === specification.targetStem
                && candidate.derivationRoute === specification.route
            ));
            const quantity = option?.typeTwoInternalBridgeFrame
                ?.baseFinalIQuantityRuleFrame || null;
            return {
                stem: specification.stem,
                sourceValence: specification.sourceValence,
                ruleId: quantity?.ruleId || "",
                quantityOverride: quantity?.quantityOverride || "",
                twoConsonantClusterBeforeFinalI:
                    quantity?.twoConsonantClusterBeforeFinalI === true,
                operation: quantity?.operation || "",
                outputStem: quantity?.outputStem || "",
                derivedFromShape: quantity?.derivedFromShape === true,
                userSelectable: quantity?.userSelectable === true,
            };
        }),
        EXACT_TYPE_TWO_CASES.map(specification => {
            const operation = getExpectedQuantityOperation(specification);
            return {
                stem: specification.stem,
                sourceValence: specification.sourceValence,
                ruleId:
                    "cn-l25-252-hua-long-i-with-two-consonant-shortening",
                quantityOverride: specification.stem === "itt-a"
                    ? "long-apparent-geminate-single-phone"
                    : "",
                twoConsonantClusterBeforeFinalI:
                    operation === "preserve-short-final-i",
                operation,
                outputStem: specification.bridgeStem.replace(/-hua$/u, ""),
                derivedFromShape: true,
                userSelectable: false,
            };
        })
    );

    s.eq(
        "The ordinary hua source in §25.2 uses the canonical shared Lesson 20 route",
        EXACT_GENERIC_HUA_CASES.map(specification => {
            const { canonicalSelection, source } = buildSource(
                ctx,
                specification
            );
            const inventory =
                ctx.getClassicalNahuatlVncDerivationOptionInventory(source, {
                    derivationType: "causative",
                });
            const options = inventory.options.filter(candidate => (
                candidate.targetStem === specification.targetStem
                && candidate.derivationRoute === specification.route
            ));
            return {
                section: specification.section,
                stem: specification.stem,
                sourceSelectionCanonical:
                    ctx.isClassicalNahuatlCanonicalSourceSelectionFrame(
                        canonicalSelection
                    ),
                sourceStatus: source.authorizationStatus || "",
                inventoryCanonical:
                    ctx.isClassicalNahuatlVncDerivationOptionInventory(
                        inventory
                    ),
                exactOptionCount: options.length,
                targetStem: options[0]?.targetStem || "",
                route: options[0]?.derivationRoute || "",
                internalBridgePresent:
                    Boolean(options[0]?.typeTwoInternalBridgeFrame),
            };
        }),
        EXACT_GENERIC_HUA_CASES.map(specification => ({
            section: specification.section,
            stem: specification.stem,
            sourceSelectionCanonical: true,
            sourceStatus: "authorized",
            inventoryCanonical: true,
            exactOptionCount: 1,
            targetStem: specification.targetStem,
            route: specification.route,
            internalBridgePresent: false,
        }))
    );

    s.eq(
        "The ordinary hua source independently projects its exact formula and written form",
        EXACT_GENERIC_HUA_CASES.map(specification =>
            getApplicationProjection(ctx, specification)
        ),
        EXACT_GENERIC_HUA_CASES.map(specification => ({
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
        "The accepted final-ca rule applies by typed Source structure rather than Canvas example membership",
        [
            {
                stem: "to-tō-ca",
                verbClass: "A",
                sourceValence: "intransitive",
                structuralTarget: "to-tō-quī-tiā",
            },
            {
                stem: "pā-tz-ca",
                verbClass: "A",
                sourceValence: "specific-projective",
                structuralTarget: "pā-tz-quī-tiā",
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
            const structuralOption = (
                evaluated.controlFrame?.derivationOptionInventory?.options
                || []
            ).find(option =>
                option.targetStem === specification.structuralTarget
            ) || null;
            return {
                stem: specification.stem,
                sourceSelectionCanonical:
                    ctx.isClassicalNahuatlCanonicalSourceSelectionFrame(
                        sourceSelection
                    ),
                structuralTargetPresent: Boolean(structuralOption),
                structuralInternalBridgePresent:
                    Boolean(structuralOption?.typeTwoInternalBridgeFrame),
                exampleAuthority:
                    structuralOption?.typeTwoInternalBridgeFrame
                        ?.sourceMatchAuthority || "",
                structuralResultSelectedByDefault:
                    evaluated.resultFrame?.derivationOperationFrame
                        ?.targetStem === specification.structuralTarget,
            };
        }),
        [
            {
                stem: "to-tō-ca",
                sourceSelectionCanonical: false,
                structuralTargetPresent: true,
                structuralInternalBridgePresent: true,
                exampleAuthority: "typed-morphemic-source-structure",
                structuralResultSelectedByDefault: false,
            },
            {
                stem: "pā-tz-ca",
                sourceSelectionCanonical: true,
                structuralTargetPresent: true,
                structuralInternalBridgePresent: true,
                exampleAuthority: "typed-morphemic-source-structure",
                structuralResultSelectedByDefault: false,
            },
        ]
    );

    return s;
}

module.exports = { run };
