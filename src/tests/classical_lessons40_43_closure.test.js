"use strict";

const { createSuite } = require("./runner");

function issueNnc(ctx, stem, subject = "3sg") {
    const nnc = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
        subject,
        nounClass: "zero",
        animacy: "animate",
        pluralConnector: subject.endsWith("pl") ? "0-h" : "",
    });
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:sentence-surface",
        outputKind: "scalar",
        args: [
            nnc.nncSlotFrame,
            { sentenceType: "assertion", polarity: "positive" },
        ],
    });
    if (!ctx.isClassicalGrammarApplicationResult(receipt)
        || receipt.authorizationStatus !== "authorized") {
        throw new Error(`failed to issue canonical NNC: ${stem}:${subject}`);
    }
    return receipt.canonicalResult;
}

function issueVnc(ctx, overrides = {}) {
    const receipt = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "vnc:application",
        outputKind: "scalar",
        args: [{
            sourceStem: "chihua",
            verbClass: "A",
            sourceValence: "specific-projective",
            subject: "1sg",
            objectKind: "specific-projective",
            objectPerson: "3sg",
            requestedDerivation: "direct",
            requestedVoice: "active",
            mood: "indicative",
            tense: "present",
            outputScope: "single",
            ...overrides,
        }],
    });
    if (!ctx.isClassicalGrammarApplicationResult(receipt)
        || receipt.authorizationStatus !== "authorized") {
        throw new Error("failed to issue canonical VNC");
    }
    return receipt.canonicalResult;
}

function issueOrdinaryNnc(ctx, stem, subject = "3sg") {
    const source = ctx.buildClassicalNahuatlOrdinaryNncSourceFrame({
        stem,
    });
    const operation =
        ctx.buildClassicalNahuatlOrdinaryNncOperationFrame(source, {
            state: "absolutive",
            subject,
            sentenceType: "statement",
            polarity: "positive",
        });
    return ctx.requestClassicalOrdinaryNncResult(source, operation);
}

function issuePronominalNnc(ctx, stem, subject = "3sg") {
    const source = ctx.buildClassicalNahuatlPronominalNncSourceFrame({
        stem,
    });
    const operation =
        ctx.buildClassicalNahuatlPronominalNncOperationFrame(source, {
            subject,
            clausePosition: "initial",
            adjunctorInMode: "none",
            sentenceType: "statement",
            polarity: "positive",
        });
    return ctx.requestClassicalPronominalNncResult(source, operation);
}

function issueCardinalNnc(ctx, value = 1, subject = "3common") {
    return ctx.requestClassicalNominalConstructionResult({
        constructionKind: "cardinal-numeral-nnc",
        value,
        classifier: "basic",
        countKind: "ordinary",
        subject,
        state: "absolutive",
        animacy: "nonanimate",
    });
}

function modify(ctx, head, modifier, choices = {}) {
    return ctx.requestClassicalAdjectivalModificationResult({
        operationKind: "adjectival-modification",
        topology: "ordinary",
        order: "head-modifier",
        adjunctor: "none",
        head,
        modifier,
        ...choices,
    });
}

function projection(result) {
    return {
        status: result.authorizationStatus,
        formula: result.formulaProjection?.result || "",
        written: result.writtenProjection?.result || "",
        unit: result.writtenProjection?.unitSurface || "",
        scope: result.derived?.compositionScope || "",
        valid: result.authorizationStatus === "authorized"
            ? true
            : Boolean(result.blockReason),
    };
}

function run(ctx) {
    const s = createSuite("classical_lessons40_43_closure");
    const head = issueNnc(ctx, "cueitl");
    const modifier = issueNnc(ctx, "canahuac");
    const extra = issueNnc(ctx, "tlazohtli");

    s.eq(
        "Lessons 40-43 expose one modifier operation and no source-classifier lane",
        {
            evaluator: typeof ctx.evaluateClassicalNahuatlAdjectivalModification,
            validator: typeof ctx.isClassicalNahuatlResultFrame,
            classifierBuilder:
                typeof ctx
                    .buildClassicalNahuatlLessons4043AdjectivalSourceClassification,
            classifierValidator:
                typeof ctx
                    .isClassicalNahuatlLessons4043AdjectivalSourceClassification,
            operationKind:
                ctx.CLASSICAL_NAHUATL_LESSONS40_43_OPERATION_KIND,
            axes: ctx.getClassicalNahuatlLcmAxes()
                .map((axis) => axis.id),
        },
        {
            evaluator: "function",
            validator: "function",
            classifierBuilder: "undefined",
            classifierValidator: "undefined",
            operationKind: "adjectival-modification",
            axes: [
                "modification-topology",
                "modifier-head-order",
                "adjunctor",
                "transitive-reference-contact",
                "compound-head-target",
            ],
        }
    );

    const audit = ctx.auditClassicalNahuatlLessons4043SourceClosure();
    s.eq(
        "Canvas source audit traces all sections without reviving curriculum axes",
        {
            items: audit.itemCount,
            sections: audit.sectionCount,
            axes: audit.axisCount,
            missing: audit.missingAxisIds,
            anchors: audit.anchorFailures,
            invalid: audit.invalidItemIds,
            closed: audit.closureStatus,
        },
        {
            items: 35,
            sections: 35,
            axes: 5,
            missing: [],
            anchors: [],
            invalid: [],
            closed: true,
        }
    );

    const pronominalHead = issuePronominalNnc(ctx, "yeh");
    const ordinaryModifier = issueOrdinaryNnc(ctx, "mich");
    const cardinalHead = issueCardinalNnc(ctx);
    const pronominalModification = modify(
        ctx,
        pronominalHead,
        ordinaryModifier,
    );
    const cardinalModification = modify(
        ctx,
        cardinalHead,
        ordinaryModifier,
        { adjunctor: "in" },
    );
    s.eq(
        "existing pronominal, ordinary, and numeral Source owners enter the same modification operation without renamed Sources",
        {
            pronominal: [
                pronominalModification.authorizationStatus,
                pronominalModification.derived.headClauseType,
                pronominalModification.derived.modifierClauseType,
                pronominalModification.formulaProjection.result,
                pronominalModification.writtenProjection.result,
            ],
            cardinal: [
                cardinalModification.authorizationStatus,
                cardinalModification.derived.headClauseType,
                cardinalModification.formulaProjection.result,
                cardinalModification.writtenProjection.result,
            ],
        },
        {
            pronominal: [
                "authorized",
                "pronominal-nnc",
                "ordinary-nnc",
                "#0-0(yeh)0-0# #0-0(mich)in-0#",
                "Yeh michin.",
            ],
            cardinal: [
                "authorized",
                "cardinal-numeral-nnc",
                "#0-0(cē)0-0# in #0-0(mich)in-0#",
                "Cē in michin.",
            ],
        }
    );

    s.eq(
        "ordinary and preposed orders generate exact independent formula and written projections",
        [
            projection(modify(ctx, head, modifier)),
            projection(modify(ctx, head, modifier, {
                adjunctor: "in",
            })),
            projection(modify(ctx, head, modifier, {
                order: "modifier-head-preposed",
            })),
            projection(modify(ctx, head, modifier, {
                order: "modifier-head-preposed",
                adjunctor: "in",
            })),
        ],
        [
            {
                status: "authorized",
                formula:
                    "#0-0(cueitl)0-0# #0-0(canahuac)0-0#",
                written: "Cueitl canahuac.",
                unit: "cueitl canahuac",
                scope: "complete-sentence",
                valid: true,
            },
            {
                status: "authorized",
                formula:
                    "#0-0(cueitl)0-0# in #0-0(canahuac)0-0#",
                written: "Cueitl in canahuac.",
                unit: "cueitl in canahuac",
                scope: "complete-sentence",
                valid: true,
            },
            {
                status: "authorized",
                formula:
                    "#0-0(canahuac)0-0# #0-0(cueitl)0-0#",
                written: "Canahuac cueitl.",
                unit: "canahuac cueitl",
                scope: "complete-sentence",
                valid: true,
            },
            {
                status: "authorized",
                formula:
                    "in #0-0(canahuac)0-0# #0-0(cueitl)0-0#",
                written: "in canahuac cueitl",
                unit: "in canahuac cueitl",
                scope: "adjoined-unit",
                valid: true,
            },
        ]
    );

    const cooperating = modify(ctx, head, modifier, {
        topology: "cooperating-preposed-nonpreposed",
        order: "cooperating-preposed-nonpreposed",
        adjunctor: "both-in",
        additionalModifiers: [extra],
    });
    const cooperatingNonpreposedMarked = modify(ctx, head, modifier, {
        topology: "cooperating-preposed-nonpreposed",
        order: "cooperating-preposed-nonpreposed",
        adjunctor: "nonpreposed-in",
        additionalModifiers: [extra],
    });
    const discontinuous = modify(ctx, head, modifier, {
        topology: "discontinuous",
        order: "discontinuous-modifier-first",
        interveningClauses: [extra],
    });
    s.eq(
        "cooperation and discontinuity preserve semantic boundaries in both projections",
        [
            projection(cooperating),
            projection(cooperatingNonpreposedMarked),
            projection(discontinuous),
        ],
        [
            {
                status: "authorized",
                formula:
                    "in #0-0(canahuac)0-0# #0-0(cueitl)0-0#"
                    + " in #0-0(tlazohtli)0-0#",
                written: "in canahuac cueitl in tlazohtli",
                unit: "in canahuac cueitl in tlazohtli",
                scope: "adjoined-unit",
                valid: true,
            },
            {
                status: "authorized",
                formula:
                    "#0-0(canahuac)0-0# #0-0(cueitl)0-0#"
                    + " in #0-0(tlazohtli)0-0#",
                written: "Canahuac cueitl in tlazohtli.",
                unit: "canahuac cueitl in tlazohtli",
                scope: "complete-sentence",
                valid: true,
            },
            {
                status: "authorized",
                formula:
                    "#0-0(canahuac)0-0# #0-0(tlazohtli)0-0#"
                    + " #0-0(cueitl)0-0#",
                written: "Canahuac tlazohtli cueitl.",
                unit: "canahuac tlazohtli cueitl",
                scope: "complete-sentence",
                valid: true,
            },
        ]
    );

    const recursive = modify(ctx, modify(ctx, head, modifier), extra);
    s.eq(
        "an owner-issued modification Result is a typed recursive head, not a reparsed surface",
        {
            projection: projection(recursive),
            recursion: recursive.derived.recursionDepth,
            headIsComposition:
                recursive.selectedClauses[0].isComposition,
            independent:
                recursive.formulaAndWrittenGeneratedIndependently,
            formulaDoesNotParseWritten:
                recursive.formulaProjection
                    .derivedFromWrittenProjection,
            writtenDoesNotParseFormula:
                recursive.writtenProjection
                    .derivedFromFormulaProjection,
            valid:
                ctx.isClassicalNahuatlResultFrame(recursive),
        },
        {
            projection: {
                status: "authorized",
                formula:
                    "#0-0(cueitl)0-0# #0-0(canahuac)0-0#"
                    + " #0-0(tlazohtli)0-0#",
                written: "Cueitl canahuac tlazohtli.",
                unit: "cueitl canahuac tlazohtli",
                scope: "complete-sentence",
                valid: true,
            },
            recursion: "one-or-more",
            headIsComposition: true,
            independent: true,
            formulaDoesNotParseWritten: false,
            writtenDoesNotParseFormula: false,
            valid: true,
        }
    );

    const mismatched = modify(
        ctx,
        issueNnc(ctx, "cueitl", "3sg"),
        issueNnc(ctx, "canahuac", "1pl"),
    );
    const oneOf = modify(
        ctx,
        issueNnc(ctx, "cem", "3pl"),
        issueNnc(ctx, "tehhuantin", "1pl"),
    );
    s.eq(
        "shared-reference fails closed except for a typed source-conditioned Canvas exception",
        {
            mismatch: [
                mismatched.authorizationStatus,
                mismatched.blockReason,
            ],
            oneOf: [
                oneOf.authorizationStatus,
                oneOf.derived.exceptionProfile,
                oneOf.writtenProjection.result,
            ],
        },
        {
            mismatch: [
                "blocked",
                "lessons40-43-shared-referent-restriction-not-satisfied",
            ],
            oneOf: [
                "authorized",
                "one-or-none-of-group",
                "Cemh titehhuantinh.",
            ],
        }
    );

    const misplacedSinglingStem = modify(
        ctx,
        issueNnc(ctx, "oquich", "1pl"),
        issueNnc(ctx, "ce", "3sg"),
    );
    s.eq(
        "a singling stem in the modifier position cannot act as a broad agreement bypass",
        [
            misplacedSinglingStem.authorizationStatus,
            misplacedSinglingStem.blockReason,
        ],
        [
            "blocked",
            "lessons40-43-shared-referent-restriction-not-satisfied",
        ]
    );

    const cooperatingTransitive = issueVnc(ctx);
    const missingDependentContact = modify(
        ctx,
        issueNnc(ctx, "cueitl", "3sg"),
        issueNnc(ctx, "canahuac", "3sg"),
        {
            topology: "cooperating-preposed-nonpreposed",
            order: "cooperating-preposed-nonpreposed",
            adjunctor: "none",
            additionalModifiers: [cooperatingTransitive],
        },
    );
    const dependentObjectContact = modify(
        ctx,
        issueNnc(ctx, "cueitl", "3sg"),
        issueNnc(ctx, "canahuac", "3sg"),
        {
            topology: "cooperating-preposed-nonpreposed",
            order: "cooperating-preposed-nonpreposed",
            adjunctor: "nonpreposed-in",
            additionalModifiers: [cooperatingTransitive],
            additionalLinkRoles: ["vnc-object"],
        },
    );
    s.eq(
        "every cooperating modifier has an independently validated typed reference contact",
        {
            missing: [
                missingDependentContact.authorizationStatus,
                missingDependentContact.blockReason,
            ],
            objectContact: [
                dependentObjectContact.authorizationStatus,
                dependentObjectContact.modifierLinkRoles,
                dependentObjectContact.formulaProjection.result,
                dependentObjectContact.writtenProjection.result,
            ],
        },
        {
            missing: [
                "blocked",
                "lessons40-43-transitive-reference-contact-required",
            ],
            objectContact: [
                "authorized",
                ["shared-subject", "vnc-object"],
                "#0-0(canahuac)0-0# #0-0(cueitl)0-0#"
                    + " in #ni-0+c-0(chihua)0+0-0#",
                "Canahuac cueitl in nicchihua.",
            ],
        }
    );

    const maleBondingContext =
        ctx.buildClassicalNahuatlDiscourseSourceContextFrame({
            speakerGender: "male",
            speakerGroupMembership: "member",
            namedPartnerKnownParticipant: "none",
        });
    const maleBondingHead = issueNnc(ctx, "oquich", "1pl");
    const maleBondingModifier = issueNnc(ctx, "cualli", "3sg");
    const maleBondingWithoutContext = modify(
        ctx,
        maleBondingHead,
        maleBondingModifier,
    );
    const maleBonding = modify(
        ctx,
        maleBondingHead,
        maleBondingModifier,
        { discourseSourceContextFrame: maleBondingContext },
    );
    const copiedContext = ctx.evaluateClassicalNahuatlAdjectivalModification({
        operationKind: "adjectival-modification",
        topology: "ordinary",
        order: "head-modifier",
        adjunctor: "none",
        head: maleBondingHead,
        modifier: maleBondingModifier,
        discourseSourceContextFrame: { ...maleBondingContext },
    });
    s.eq(
        "male-bonding is licensed by an owner-issued Source context, never by a special topology or copied shape",
        {
            withoutContext: [
                maleBondingWithoutContext.authorizationStatus,
                maleBondingWithoutContext.blockReason,
            ],
            withContext: [
                maleBonding?.authorizationStatus,
                maleBonding?.derived?.exceptionProfile,
                maleBonding?.derived?.discourseSourceContextPresent,
            ],
            copiedContext: [
                copiedContext.authorizationStatus,
                copiedContext.blockReason,
            ],
        },
        {
            withoutContext: [
                "blocked",
                "lessons40-43-shared-referent-restriction-not-satisfied",
            ],
            withContext: [
                "authorized",
                "male-bonding",
                true,
            ],
            copiedContext: [
                "blocked",
                "lessons40-43-issued-discourse-source-context-required",
            ],
        }
    );

    const transitive = issueVnc(ctx);
    const subjectContact = modify(ctx, head, transitive, {
        linkRole: "vnc-subject",
    });
    const objectContact = modify(ctx, head, transitive, {
        linkRole: "vnc-object",
    });
    s.eq(
        "transitive VNC contact is the conditional user choice and is validated against typed participants",
        {
            subject: [
                subjectContact.authorizationStatus,
                subjectContact.blockReason,
            ],
            object: [
                objectContact.authorizationStatus,
                objectContact.selection.linkRole,
                objectContact.derived.modifierClauseType,
                ctx.isClassicalNahuatlResultFrame(
                    objectContact
                ),
            ],
        },
        {
            subject: [
                "blocked",
                "lessons40-43-shared-referent-restriction-not-satisfied",
            ],
            object: [
                "authorized",
                "vnc-object",
                "transitive-vnc",
                true,
            ],
        }
    );

    const copiedHead = JSON.parse(JSON.stringify(head));
    const copied = ctx.evaluateClassicalNahuatlAdjectivalModification({
        operationKind: "adjectival-modification",
        topology: "ordinary",
        order: "head-modifier",
        adjunctor: "none",
        head: copiedHead,
        modifier,
    });
    const retiredOperation = ctx.evaluateClassicalNahuatlAdjectivalModification({
        operationKind: "adjectival-function",
        source: modifier,
    });
    const retiredDerivedLane = ctx.evaluateClassicalNahuatlAdjectivalModification({
        operationKind: "adjectival-modification",
        topology: "ordinary",
        order: "head-modifier",
        adjunctor: "none",
        head,
        modifier,
        modifierClauseType: "adjectival-nnc",
    });
    const forgedResult = { ...modify(ctx, head, modifier) };
    s.eq(
        "copies, stored authority, retired classifiers, and shape-authorized Results are rejected",
        {
            copied: [copied.authorizationStatus, copied.blockReason],
            retiredOperation: [
                retiredOperation.authorizationStatus,
                retiredOperation.blockReason,
            ],
            retiredDerivedLane: [
                retiredDerivedLane.authorizationStatus,
                retiredDerivedLane.blockReason,
                retiredDerivedLane.rejectedAuthorityKey,
            ],
            forgedResult:
                ctx.isClassicalNahuatlResultFrame(
                    forgedResult
                ),
        },
        {
            copied: [
                "blocked",
                "lessons40-43-canonical-head-result-required",
            ],
            retiredOperation: [
                "blocked",
                "lessons40-43-request-field-not-licensed",
            ],
            retiredDerivedLane: [
                "blocked",
                "lessons40-43-caller-authority-forbidden",
                "modifierClauseType",
            ],
            forgedResult: false,
        }
    );

    const scalarCoordinates = [
        ["1sg", "ni"],
        ["2sg", "ti"],
        ["3sg", "0"],
        ["1pl", "ti"],
    ].map(([subject]) => {
        const coordinateHead = issueNnc(
            ctx,
            "cueitl",
            subject,
        );
        const coordinateModifier = issueNnc(
            ctx,
            "canahuac",
            subject,
        );
        const selected = modify(
            ctx,
            coordinateHead,
            coordinateModifier,
        );
        const repeatedScalar = modify(
            ctx,
            coordinateHead,
            coordinateModifier,
        );
        return [
            subject,
            selected.formulaProjection.result,
            selected.writtenProjection.result,
            repeatedScalar.formulaProjection.result,
            repeatedScalar.writtenProjection.result,
            selected.scalarEvaluatorIdentity,
        ];
    });
    s.eq(
        "pointwise coordinate generation is exactly the scalar evaluator",
        scalarCoordinates.map(row => [
            row[0],
            row[1] === row[3],
            row[2] === row[4],
            row[5],
        ]),
        [
            ["1sg", true, true, "evaluateClassicalNahuatlAdjectivalModification"],
            ["2sg", true, true, "evaluateClassicalNahuatlAdjectivalModification"],
            ["3sg", true, true, "evaluateClassicalNahuatlAdjectivalModification"],
            ["1pl", true, true, "evaluateClassicalNahuatlAdjectivalModification"],
        ]
    );

    return s;
}

module.exports = { run };
