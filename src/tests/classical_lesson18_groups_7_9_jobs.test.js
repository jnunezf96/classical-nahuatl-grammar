"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson18_groups_7_9_jobs");
    const ledger = JSON.parse(fs.readFileSync(
        path.join(ROOT, "docs/canvas-progress/lesson18-review-ledger.json"),
        "utf8",
    ));
    const groupIds = [
        "lesson18-principal-deletion-and-command-subject",
        "lesson18-real-vocatives",
        "lesson18-free-order-and-complete-clauses",
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
                subject: options.subject || "3sg",
                requestedDerivation: "direct",
                requestedVoice: "active",
                mood: options.mood || "indicative",
                tense: options.tense || "present",
                outputScope: "single",
            }],
        })
    );
    const issueNnc = (
        stem,
        subject = "3sg",
        nounClass = "zero",
        pluralConnector = "",
    ) => {
        const frame = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
            subject,
            nounClass,
            animacy: "animate",
            ...(pluralConnector ? { pluralConnector } : {}),
        });
        return ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:sentence-surface",
            args: [
                frame.nncSlotFrame,
                { sentenceType: "assertion", polarity: "positive" },
            ],
        });
    };
    const makeController = () => {
        const target = Object.create(ctx);
        const api = ctx.createClassicalClauseRelationControllerGlobals(target);
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(api));
        return target.createClassicalClauseRelationController();
    };
    const sourceContext = (options) => {
        const controller = makeController();
        return controller.issueDiscourseSourceContextFrame(options);
    };
    const compose = ({
        relation,
        principal,
        adjoined = null,
        dependent = null,
        principalContext = null,
        selections = {},
    }) => {
        const controller = makeController();
        const principalCapture = controller.captureCurrentResult(
            "principal",
            principal.canonicalResult || principal,
            principalContext,
        );
        let adjoinedCapture = null;
        if (adjoined) {
            adjoinedCapture = controller.captureCurrentResult(
                "adjoined",
                adjoined.canonicalResult || adjoined,
            );
        }
        let dependentCapture = null;
        if (dependent) {
            dependentCapture = controller.captureCurrentResult(
                "dependent",
                dependent.canonicalResult || dependent,
            );
        }
        const request = { relation, ...selections };
        return {
            controller,
            captures: { principalCapture, adjoinedCapture, dependentCapture },
            contract: controller.buildDecisionContract(request),
            result: controller.compose(request),
        };
    };
    const cueLabels = (result) => ctx.getClassicalFormulaDerivedAnnotations(
        result.presentation.formula,
        null,
        result.canonicalResult,
    ).map((cue) => cue.label);
    const operation = (result, kind) => (
        result.canonicalResult?.operationFrames?.find((frame) => (
            frame.kind === kind
        )) || null
    );

    const locationRecord = ctx.listClassicalNahuatlLesson44SourceRecords()
        .find((record) => record.id === "44.4-cemilhuitl");
    const locationPotential = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:adverbial",
        outputKind: "source-preparation",
        args: [{
            stem: locationRecord.sourceForms[0],
            clauseKind: locationRecord.clauseKind,
        }],
    });
    const location = ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:adverbial",
        args: [{
            adverbialPotentialFrame: locationPotential.canonicalResult,
            degree: "first-degree",
            scope: "external-clause",
        }],
    });
    const cahDeletion = compose({
        relation: "deleted-principal",
        principal: location,
        dependent: issueVnc("ca-h"),
        adjoined: issueNnc("chān"),
        selections: { deletionKind: "saying" },
    });
    const ordinaryNncDeletion = compose({
        relation: "deleted-principal",
        principal: issueNnc("cāmpa"),
        dependent: issueVnc("ca-h"),
        adjoined: issueNnc("chān"),
    });
    const commandSubject = compose({
        relation: "supplementation",
        principal: issueVnc("cāhua", {
            subject: "2sg",
            mood: "optative",
            tense: "nonpast",
        }),
        adjoined: issueNnc("pil", "2sg", "tli"),
        selections: {
            supplementationReferenceMode: "shared",
            supplementationHeadRole: "subject",
            supplementationContactRole: "subject",
            supplementationOrder: "principal-first",
        },
    });

    const maleContext = sourceContext({ speakerGender: "male" });
    const femaleContext = sourceContext({ speakerGender: "female" });
    const maleVocative = compose({
        relation: "vocative",
        principal: issueNnc("pil", "3sg", "tli"),
        principalContext: maleContext,
    });
    const femaleVocative = compose({
        relation: "vocative",
        principal: issueNnc("pil", "3sg", "tli"),
        principalContext: femaleContext,
    });
    const glottalVocative = compose({
        relation: "vocative",
        principal: issueNnc("tēteoh"),
        principalContext: maleContext,
        selections: { glottalVariant: "glottal-e" },
    });
    const secondPersonVocative = compose({
        relation: "vocative",
        principal: issueNnc("pil", "2sg", "tli"),
        principalContext: maleContext,
    });

    const principal = issueVnc("cuīca");
    const firstSupplement = issueNnc("chichi");
    const secondSupplement = issueNnc("nehhuātl");
    const ordinaryOrder = compose({
        relation: "supplementation",
        principal,
        adjoined: firstSupplement,
        selections: {
            supplementationReferenceMode: "shared",
            supplementationHeadRole: "subject",
            supplementationContactRole: "subject",
            supplementationOrder: "principal-first",
        },
    });
    const reversedOrder = compose({
        relation: "supplementation",
        principal,
        adjoined: firstSupplement,
        selections: {
            supplementationReferenceMode: "shared",
            supplementationHeadRole: "subject",
            supplementationContactRole: "subject",
            supplementationOrder: "supplement-first",
        },
    });
    const recursive = compose({
        relation: "supplementation",
        principal: ordinaryOrder.result,
        adjoined: secondSupplement,
        selections: {
            supplementationReferenceMode: "shared",
            supplementationHeadRole: "subject",
            supplementationContactRole: "subject",
            supplementationOrder: "supplement-first",
        },
    });

    const observations = {
        "lesson18-principal-deletion-and-command-subject": Boolean(
            cahDeletion.contract.authorizationStatus === "authorized"
            && cahDeletion.contract.operationSelections.deletionKind === "cah-proxy"
            && !cahDeletion.contract.decisions.some((entry) => (
                entry.id === "deletion-kind"
            ))
            && cahDeletion.result.canonicalResult?.proxyPrincipalCreated === true
            && cueLabels(cahDeletion.result).includes(
                "deleted ca-h principal remains grammatically recoverable",
            )
            && operation(
                commandSubject.result,
                "classical-nahuatl-supplementation-command-subject-frame",
            )?.isRealVocative === false
            && cueLabels(commandSubject.result).includes(
                "second-person command subject · not a vocative",
            )
        ),
        "lesson18-real-vocatives": Boolean(
            maleVocative.result.authorizationStatus === "authorized"
            && maleVocative.result.canonicalResult?.operations.includes(
                "append-male-vocative-e",
            )
            && maleVocative.result.canonicalResult?.operations.includes(
                "absorb-final-supportive-i",
            )
            && femaleVocative.result.canonicalResult?.speakerGender === "female"
            && femaleVocative.result.canonicalResult?.operations.includes(
                "female-high-tone-affected-stress",
            )
            && glottalVocative.contract.decisions.some((entry) => (
                entry.id === "glottal-variant"
            ))
            && glottalVocative.result.canonicalResult?.operations.includes(
                "intervocalic-glottal-to-y",
            )
            && cueLabels(maleVocative.result).includes(
                "male vocative e · joined and exceptionally stressed",
            )
            && cueLabels(femaleVocative.result).includes(
                "female vocative · high final tone and affected stress",
            )
        ),
        "lesson18-free-order-and-complete-clauses": Boolean(
            ordinaryOrder.result.authorizationStatus === "authorized"
            && reversedOrder.result.authorizationStatus === "authorized"
            && ordinaryOrder.result.presentation.formula
                !== reversedOrder.result.presentation.formula
            && ordinaryOrder.result.canonicalResult?.principalClause
                ?.canonicalSignature
                === reversedOrder.result.canonicalResult?.principalClause
                    ?.canonicalSignature
            && recursive.result.authorizationStatus === "authorized"
            && operation(
                recursive.result,
                "classical-nahuatl-supplementation-recursive-clause-graph-frame",
            )?.acyclic === true
            && cueLabels(recursive.result).some((label) => (
                label.includes("shared referent")
            ))
        ),
    };
    const mutations = {
        "lesson18-principal-deletion-and-command-subject": Boolean(
            ordinaryNncDeletion.contract.authorizationStatus !== "authorized"
            && ordinaryNncDeletion.result.authorizationStatus !== "authorized"
            && secondPersonVocative.result.authorizationStatus !== "authorized"
        ),
        "lesson18-real-vocatives": Boolean(
            secondPersonVocative.result.authorizationStatus !== "authorized"
            && !maleVocative.contract.decisions.some((entry) => (
                entry.id === "speaker-gender"
            ))
        ),
        "lesson18-free-order-and-complete-clauses": Boolean(
            recursive.result.canonicalResult?.principalContinuationFrames
                ?.length === 1
            && recursive.result.canonicalResult?.referenceFrame?.headRole
                === "subject"
        ),
    };

    s.eq("accepted group atom counts are exact", {
        records: records.length,
        writing: writing.length,
        readingOnly: records.length - writing.length,
    }, { records: 72, writing: 36, readingOnly: 36 });
    s.eq("all three accepted jobs run through normal application paths", {
        deletion: observations[groupIds[0]],
        vocative: observations[groupIds[1]],
        freeOrder: observations[groupIds[2]],
    }, { deletion: true, vocative: true, freeOrder: true });
    for (const record of writing) {
        s.eq(
            `${record.atomId} has its accepted normal writing job`,
            observations[record.reviewGroupId],
            true,
        );
        s.eq(
            `mutation:${record.atomId} cannot replace its typed owner conditions`,
            mutations[record.reviewGroupId],
            true,
        );
    }
    return s;
}

module.exports = { run };
