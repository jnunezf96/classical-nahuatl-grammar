"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function issueNnc(ctx, stem, subject = "3sg") {
    const nnc = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
        subject,
        nounClass: "zero",
        animacy: "animate",
        pluralConnector: subject.endsWith("pl") ? "0-h" : "",
    });
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:sentence-surface",
        outputKind: "scalar",
        args: [
            nnc.nncSlotFrame,
            { sentenceType: "assertion", polarity: "positive" },
        ],
    }).canonicalResult;
}

function issuePronominal(ctx, stem, subject = "3sg") {
    const source = ctx.buildClassicalNahuatlPronominalNncSourceFrame({ stem });
    const operation = ctx.buildClassicalNahuatlPronominalNncOperationFrame(
        source,
        {
            subject,
            clausePosition: "initial",
            adjunctorInMode: "none",
            sentenceType: "statement",
            polarity: "positive",
        },
    );
    return ctx.requestClassicalPronominalNncResult(source, operation);
}

function issuePersonalName(ctx, subject = "3sg") {
    const clause = ctx.buildPersonalNameInnerClauseFrame({
        sourceFamily: "preterit-agentive",
        subjectPrefix: "Ø",
        subjectConnector: "Ø",
        predicateMorphs: ["temō", "Ø"],
        numberPrefix: "c",
        numberSuffix: "Ø",
    });
    const sourceFrame = ctx.buildPersonalNameNncSourceFrame({
        sourceFamily: "preterit-agentive",
        clauses: [clause],
    });
    return ctx.requestClassicalPersonalNameNncResult({
        sourceFrame,
        outerSubject: subject,
    });
}

function modify(ctx, head, modifier, choices = {}) {
    return ctx.evaluateClassicalNahuatlAdjectivalModification({
        operationKind: "adjectival-modification",
        topology: "ordinary",
        order: "head-modifier",
        adjunctor: "none",
        head,
        modifier,
        ...choices,
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_lesson43_jobs");
    const atomLedger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/ANDREWS_ATOM_LEDGER.json"), "utf8"));
    const plan = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson43-review-plan.json"), "utf8"));
    const field = Object.fromEntries(
        atomLedger.codebook.atomTuple.map((name, index) => [name, index]),
    );
    const atoms = atomLedger.atoms.filter(atom => (
        /^§43(?:\.|$)/u.test(atom[field.canvasSection])
    ));
    const grammarAtoms = atoms.filter(atom => (
        atom[field.force] === "grammar-bearing"
    ));
    const writingRoles = new Set([
        "canonical-rule-or-alternation",
        "applicability-or-constraint",
        "derived-realization",
        "source-structure-schema",
        "result-projection",
    ]);
    const writing = grammarAtoms.filter(atom => (
        writingRoles.has(atom[field.projectRole])
    ));
    const groupBySection = new Map(plan.groups.flatMap(group => (
        group.sections.map(section => [section, group])
    )));

    s.eq("Lesson 43 partitions every Canvas atom into technical-proof groups", {
        atoms: atoms.length,
        grammar: grammarAtoms.length,
        writing: writing.length,
        readingOnly: atoms.length - writing.length,
        sections: [...new Set(atoms.map(atom => atom[field.canvasSection]))],
        unmapped: atoms.filter(atom => (
            !groupBySection.has(atom[field.canvasSection])
        )).map(atom => atom[field.atomId]),
    }, {
        atoms: 306,
        grammar: 216,
        writing: 175,
        readingOnly: 131,
        sections: plan.groups.flatMap(group => group.sections),
        unmapped: [],
    });

    const ownerIds = [...new Set(grammarAtoms.map(
        atom => atom[field.semanticOwnerId]
    ))].sort();
    const ownerObservations = ownerIds.map(ownerId => {
        const ownerAtoms = grammarAtoms.filter(atom => (
            atom[field.semanticOwnerId] === ownerId
        ));
        const ownerPath = ownerAtoms[0][field.semanticOwnerReference];
        const sourceText = fs.readFileSync(path.join(ROOT, ownerPath), "utf8");
        const spec = JSON.parse(sourceText.match(
            /const spec = (\{[\s\S]*\});\nexport default/u
        )[1]);
        const results = Object.keys(spec.coordinates).map(coordinateKey => {
            const [selection, requestedFacet] = coordinateKey.split("::");
            const sourceFrame = ctx[`build${spec.prefix}Source`]({
                analysisDomain: ownerId,
                selection,
                requestedFacet,
                participantChoice: `${selection}:${requestedFacet}`,
            });
            return ctx[`evaluate${spec.prefix}`](sourceFrame);
        });
        return {
            ownerId,
            atomCount: ownerAtoms.length,
            coordinateCount: results.length,
            pathOwnerExact: sourceText.includes(
                `"ownerId": "${ownerId}"`
            ),
            resultsExact: results.every(result => (
                ctx[`is${spec.prefix}Result`](result)
                && result.semanticOwnerId === ownerId
                && ["authorized", "blocked"].includes(
                    result.authorizationStatus
                )
                && (
                    result.authorizationStatus === "authorized"
                    || Boolean(result.blockReason)
                )
            )),
        };
    });
    s.eq(
        "all 216 grammar-bearing atoms retain exact proof through 21 owner-issued Results",
        {
            atoms: ownerObservations.reduce(
                (total, item) => total + item.atomCount, 0
            ),
            owners: ownerObservations.length,
            coordinates: ownerObservations.reduce(
                (total, item) => total + item.coordinateCount, 0
            ),
            invalid: ownerObservations.filter(item => (
                !item.pathOwnerExact
                || !item.resultsExact
            )),
        },
        {
            atoms: 216,
            owners: 21,
            coordinates: ownerObservations.reduce(
                (total, item) => total + item.coordinateCount, 0
            ),
            invalid: [],
        },
    );

    const head = issueNnc(ctx, "calli");
    const modifier = issueNnc(ctx, "cualli");
    const extra = issueNnc(ctx, "tlazohtli");
    const postposed = modify(ctx, head, modifier, { adjunctor: "in" });
    const cooperating = modify(ctx, head, modifier, {
        topology: "cooperating-preposed-nonpreposed",
        order: "cooperating-preposed-nonpreposed",
        adjunctor: "both-in",
        additionalModifiers: [extra],
    });
    const discontinuous = modify(ctx, head, modifier, {
        topology: "discontinuous",
        order: "discontinuous-head-first",
        interveningClauses: [extra],
    });
    s.eq(
        "postposed, cooperating, and discontinuous clauses use one modification owner",
        [postposed, cooperating, discontinuous].map(result => ({
            status: result.authorizationStatus,
            operation: result.operationKind,
            topology: result.topology,
            exact: ctx.isClassicalNahuatlResultFrame(result),
        })),
        [
            { status: "authorized", operation: "adjectival-modification", topology: "ordinary", exact: true },
            { status: "authorized", operation: "adjectival-modification", topology: "cooperating-preposed-nonpreposed", exact: true },
            { status: "authorized", operation: "adjectival-modification", topology: "discontinuous", exact: true },
        ],
    );

    const interrogative = modify(
        ctx,
        issueNnc(ctx, "āc"),
        issueNnc(ctx, "tlācatl"),
        { adjunctor: "in" },
    );
    s.eq("interrogative modification retains Source identity and derives ambiguity", {
        status: interrogative.authorizationStatus,
        head: interrogative.derived?.headClauseType || "",
        ambiguity: interrogative.derived?.ambiguityType || "",
        exact: ctx.isClassicalNahuatlResultFrame(interrogative),
    }, {
        status: "authorized",
        head: "ordinary",
        ambiguity: "supplementation-or-modification",
        exact: true,
    });

    const partitives = [
        ["cem", "tehhuāntin", "1pl"],
        ["acah", "amehhuāntin", "2pl"],
        ["ayāc", "cihuāh", "3pl"],
    ].map(([stem, groupStem, groupSubject]) => modify(
        ctx,
        issueNnc(ctx, stem, "3sg"),
        issueNnc(ctx, groupStem, groupSubject),
    ));
    s.eq(
        "cēm, acah, and ayāc license only their typed one-or-none group profile",
        partitives.map(result => [
            result.authorizationStatus,
            result.derived?.exceptionProfile || "",
            ctx.isClassicalNahuatlResultFrame(result),
        ]),
        [
            ["authorized", "one-or-none-of-group", true],
            ["authorized", "one-or-none-of-group", true],
            ["authorized", "one-or-none-of-group", true],
        ],
    );

    const maleContext = ctx.buildClassicalNahuatlDiscourseSourceContextFrame({
        speakerGender: "male",
        speakerGroupMembership: "member",
        namedPartnerKnownParticipant: "none",
    });
    const namedContext = ctx.buildClassicalNahuatlDiscourseSourceContextFrame({
        speakerGender: "unspecified",
        speakerGroupMembership: "unspecified",
        namedPartnerKnownParticipant: "speaker",
    });
    const maleBonding = modify(
        ctx,
        issueNnc(ctx, "oquich", "1pl"),
        issueNnc(ctx, "cualli", "3sg"),
        { discourseSourceContextFrame: maleContext },
    );
    const namedPartner = modify(
        ctx,
        issueNnc(ctx, "ōme", "3pl"),
        issuePersonalName(ctx, "3sg"),
        { discourseSourceContextFrame: namedContext },
    );
    const copiedContext = modify(
        ctx,
        issueNnc(ctx, "oquich", "1pl"),
        issueNnc(ctx, "cualli", "3sg"),
        { discourseSourceContextFrame: { ...maleContext } },
    );
    s.eq(
        "discourse-conditioned profiles require owner-issued context",
        {
            male: [
                maleBonding.authorizationStatus,
                maleBonding.derived.exceptionProfile,
            ],
            named: [
                namedPartner.authorizationStatus,
                namedPartner.derived.exceptionProfile,
            ],
            copy: [
                copiedContext.authorizationStatus,
                copiedContext.blockReason,
            ],
        },
        {
            male: ["authorized", "male-bonding"],
            named: ["authorized", "named-partner"],
            copy: [
                "blocked",
                "lessons40-43-issued-discourse-source-context-required",
            ],
        },
    );

    const copiedHead = modify(ctx, { ...head }, modifier);
    s.eq("copies and lesson metadata cannot authorize Lesson 43 grammar", {
        copy: [copiedHead.authorizationStatus, copiedHead.blockReason],
        axes: ctx.getClassicalNahuatlLcmAxes().map(axis => axis.id),
        lessonAuthority: postposed.lessonMetadataAuthority,
        formulaAuthority: postposed.formulaStringAuthority,
        surfaceAuthority: postposed.surfaceStringAuthority,
    }, {
        copy: [
            "blocked",
            "lessons40-43-canonical-head-result-required",
        ],
        axes: [
            "modification-topology",
            "modifier-head-order",
            "adjunctor",
            "transitive-reference-contact",
            "compound-head-target",
        ],
        lessonAuthority: false,
        formulaAuthority: false,
        surfaceAuthority: false,
    });

    return s;
}

module.exports = { run };
