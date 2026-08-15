"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson18_groups_1_3_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson18-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson18-integrated-and-short-pronominal",
        "lesson18-marked-supplementation",
        "lesson18-discontinuous-supplementation",
    ];
    const records = ledger.records.filter((record) => (
        groupIds.includes(record.reviewGroupId)
    ));
    const writing = records.filter((record) => (
        record.proposedDirection === "BOTH"
    ));

    const issueVnc = (sourceStem, options = {}) => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "vnc:application",
            args: [{
                sourceStem,
                verbClass: options.verbClass || "A",
                sourceValence: options.sourceValence || "intransitive",
                subject: options.subject || "1sg",
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: "indicative",
                tense: options.tense || "present",
                outputScope: "single",
                sentenceOptions: {
                    antecessive: options.antecessive === true,
                    sentenceAntecessive: options.antecessive === true,
                    outsidePrefixes: options.antecessive ? ["ō#"] : [],
                },
            }],
        })
    );
    const issueNnc = (stem, subject = "1sg") => {
        const frame = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
            subject,
            nounClass: "zero",
            animacy: "animate",
        });
        return ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:sentence-surface",
            args: [
                frame.nncSlotFrame,
                { sentenceType: "assertion", polarity: "positive" },
            ],
        });
    };
    const issuePronominal = (stem, subject = "3sg") => {
        const source = ctx.issueCanonicalNncSourceFrame({ stem });
        const selection = ctx.getCanonicalNncOperationSelectionFrame(
            source,
            { subject },
        );
        const operation = ctx.issueCanonicalNncOperationFrame(source, {
            subject,
            clausePosition: selection.selectedClausePosition || "initial",
            numberForm: selection.selectedNumberForm || "",
            predicatePluralization:
                selection.selectedPredicatePluralization || "",
            sentenceType: "statement",
            polarity: "positive",
        });
        return ctx.requestClassicalPronominalNncResult(source, operation);
    };
    const issueParticle = (particleId) => (
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "particle:result",
            args: [ctx.buildClassicalNahuatlParticleSourceFrame(particleId)],
        })
    );
    const makeController = () => {
        const target = Object.create(ctx);
        const api = ctx.createClassicalClauseRelationControllerGlobals(target);
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
        return target.createClassicalClauseRelationController();
    };
    const compose = ({
        principal,
        supplement,
        dependent = null,
        marker = null,
        selections = {},
    }) => {
        const controller = makeController();
        controller.captureCurrentResult(
            "principal",
            principal.canonicalResult || principal,
        );
        controller.captureCurrentResult(
            "adjoined",
            supplement.canonicalResult || supplement,
        );
        if (dependent) {
            controller.captureCurrentResult(
                "dependent",
                dependent.canonicalResult || dependent,
            );
        }
        if (marker) {
            controller.captureCurrentResult(
                "marker",
                marker.canonicalResult || marker,
            );
        }
        const request = {
            relation: "supplementation",
            supplementationReferenceMode: "shared",
            supplementationHeadRole: "subject",
            supplementationContactRole: "subject",
            supplementationOrder: "principal-first",
            ...selections,
        };
        return {
            controller,
            contract: controller.buildDecisionContract(request),
            result: controller.compose(request),
        };
    };
    const operationFrame = (result, kind) => (
        result.canonicalResult?.operationFrames?.find((frame) => (
            frame.kind === kind
        )) || null
    );
    const decision = (contract, id) => {
        const frame = contract.decisions.find((candidate) => candidate.id === id);
        return frame ? {
            values: frame.values,
            selected: frame.selectedValue,
        } : null;
    };
    const cues = (result) => ctx.getClassicalFormulaDerivedAnnotations(
        result.presentation.formula,
        null,
        result.canonicalResult,
    ).map((cue) => cue.label);

    const pastSinging = issueVnc("cuīca", {
        subject: "1sg",
        tense: "preterit",
        antecessive: true,
    });
    const peter = issueNnc("Petoloh", "1sg");
    const integrated = compose({
        principal: pastSinging,
        supplement: peter,
        selections: {
            supplementationOrder: "supplement-first",
            supplementationAntecessivePlacement: "integrate-with-supplement",
        },
    });
    const retained = compose({
        principal: pastSinging,
        supplement: peter,
        selections: {
            supplementationOrder: "supplement-first",
            supplementationAntecessivePlacement: "retain-with-vnc",
        },
    });
    const shortFrame = ctx.buildClassicalNahuatlPronominalNncFrame({
        subtype: "personal-simple",
        subject: "1sg",
    });
    const shortClause = ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
        shortFrame,
        { referenceId: "speaker", subjectReferenceId: "speaker" },
    );
    const principalClause = ctx.buildClassicalNahuatlSupplementationClauseEnvelope(
        issueVnc("cuīca", { subject: "1sg" }).canonicalResult,
        { referenceId: "speaker", subjectReferenceId: "speaker" },
    );
    const shortComposition = ctx.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause,
        supplementClause: shortClause,
        options: {
            referenceMode: "shared",
            headRole: "subject",
            supplementContactRole: "subject",
        },
    });
    const shortStandalone = ctx.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause,
        supplementClause: shortClause,
        options: {
            referenceMode: "shared",
            headRole: "subject",
            supplementContactRole: "subject",
            supplementActsAsStandaloneUtterance: true,
        },
    });

    const marked = compose({
        principal: issueVnc("itta", { subject: "1sg" }),
        supplement: peter,
        marker: issueParticle("l3-in"),
    });
    const demonstrative = issuePronominal("īn", "3sg");
    const markedDemonstrative = compose({
        principal: issueVnc("itta", { subject: "3sg" }),
        supplement: demonstrative,
        marker: issueParticle("l3-in"),
    });

    const intervener = issueNnc("icnīuh", "1sg");
    const discontinuous = compose({
        principal: issueVnc("huetzi", { subject: "1sg" }),
        supplement: peter,
        dependent: intervener,
        selections: { supplementationOrder: "discontinuous" },
    });

    const observations = {
        "lesson18-integrated-and-short-pronominal": {
            status: integrated.result.authorizationStatus,
            placement: decision(
                integrated.contract,
                "supplementation-antecessive-placement",
            ),
            carriers: [
                integrated.result.presentation.formula.startsWith("ō#"),
                retained.result.presentation.formula.startsWith("ō#"),
                operationFrame(
                    integrated.result,
                    "classical-nahuatl-supplementation-integrated-antecessive-frame",
                )?.logicalScope,
            ],
            short: [
                shortComposition.authorizationStatus,
                operationFrame(
                    { canonicalResult: shortComposition },
                    "classical-nahuatl-short-pronominal-boundary-frame",
                )?.standaloneUtteranceAllowed,
            ],
            cues: cues(integrated.result),
        },
        "lesson18-marked-supplementation": {
            status: marked.result.authorizationStatus,
            marker: operationFrame(
                marked.result,
                "classical-nahuatl-supplementation-adjunctor-frame",
            ),
            demonstrative: operationFrame(
                markedDemonstrative.result,
                "classical-nahuatl-supplementation-adjunctor-frame",
            )?.fusesWithDemonstrative,
            cues: cues(marked.result),
        },
        "lesson18-discontinuous-supplementation": {
            status: discontinuous.result.authorizationStatus,
            order: operationFrame(
                discontinuous.result,
                "classical-nahuatl-supplementation-order-frame",
            ),
            required: discontinuous.contract.derived.requiredCaptureRoles,
            cues: cues(discontinuous.result),
        },
    };
    const expected = {
        "lesson18-integrated-and-short-pronominal": {
            status: "authorized",
            placement: {
                values: ["retain-with-vnc", "integrate-with-supplement"],
                selected: "integrate-with-supplement",
            },
            carriers: [true, false, "principal-vnc"],
            short: ["authorized", false],
            cues: [
                "antecessive scope · principal VNC",
                "topic · supplementary subject",
                "shared referent",
                "comment · principal subject head",
            ],
        },
        "lesson18-marked-supplementation": {
            status: "authorized",
            marker: {
                kind: "classical-nahuatl-supplementation-adjunctor-frame",
                adjunctor: "in",
                fusesWithDemonstrative: false,
                affectsPredicateDeterminacy: false,
            },
            demonstrative: true,
            cues: [
                "principal subject head",
                "whole-unit adjunctor in",
                "supplementary subject",
            ],
        },
        "lesson18-discontinuous-supplementation": {
            status: "authorized",
            order: {
                kind: "classical-nahuatl-supplementation-order-frame",
                order: "discontinuous",
                topic: false,
                comment: false,
                discontinuous: true,
                interveningClauseCount: 1,
            },
            required: ["principal", "adjoined", "dependent"],
            cues: [
                "supplementary subject",
                "intervening complete clause",
                "supplement remains linked across distance",
                "principal subject head",
            ],
        },
    };

    const invalidIntegrated = ctx.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause: integrated.result.canonicalResult.principalClause,
        supplementClause: integrated.result.canonicalResult.supplementClause,
        options: {
            referenceMode: "shared",
            headRole: "subject",
            supplementContactRole: "subject",
            order: "principal-first",
            integratedAntecessive: true,
        },
    });
    const invalidAdjunctor = ctx.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause: marked.result.canonicalResult.principalClause,
        supplementClause: marked.result.canonicalResult.supplementClause,
        options: {
            referenceMode: "shared",
            headRole: "subject",
            supplementContactRole: "subject",
            adjunctor: "forged",
        },
    });
    const missingIntervener = ctx.evaluateClassicalNahuatlSupplementationOperation({
        operationKind: "relation",
        principalClause: discontinuous.result.canonicalResult.principalClause,
        supplementClause: discontinuous.result.canonicalResult.supplementClause,
        options: {
            referenceMode: "shared",
            headRole: "subject",
            supplementContactRole: "subject",
            order: "discontinuous",
        },
    });
    const mutations = {
        "lesson18-integrated-and-short-pronominal": [
            invalidIntegrated.blockReason,
            shortStandalone.blockReason,
        ],
        "lesson18-marked-supplementation": [invalidAdjunctor.blockReason],
        "lesson18-discontinuous-supplementation": [
            missingIntervener.blockReason,
            ctx.isClassicalNahuatlSupplementationFrame({
                ...discontinuous.result.canonicalResult,
            }),
        ],
    };
    const expectedMutations = {
        "lesson18-integrated-and-short-pronominal": [
            "integrated-antecessive-conditions-not-met",
            "short-personal-pronominal-nnc-cannot-stand-alone",
        ],
        "lesson18-marked-supplementation": [
            "unknown-supplementation-adjunctor",
        ],
        "lesson18-discontinuous-supplementation": [
            "discontinuous-order-requires-typed-intervening-clauses",
            false,
        ],
    };

    s.eq("accepted Lesson 18 Groups 1-3 cover every atom once", {
        atoms: records.length,
        unique: new Set(records.map((record) => record.atomId)).size,
        writing: writing.length,
        reading: records.length - writing.length,
    }, { atoms: 107, unique: 107, writing: 56, reading: 51 });
    groupIds.forEach((groupId) => {
        s.eq(
            `${groupId} works through the normal clause-composition path`,
            observations[groupId],
            expected[groupId],
        );
    });
    for (const record of writing) {
        s.eq(
            `${record.atomId} performs its accepted writing job`,
            observations[record.reviewGroupId],
            expected[record.reviewGroupId],
        );
        s.eq(
            `mutation:${record.atomId} fails when its accepted grammar behavior is broken`,
            mutations[record.reviewGroupId],
            expectedMutations[record.reviewGroupId],
        );
    }
    return s;
}

module.exports = { run };
