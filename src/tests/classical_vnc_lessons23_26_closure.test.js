"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const { resolveLegacySupportPath } = require("./helpers/legacy_support_path");
const {
    CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES,
} = require(resolveLegacySupportPath("scripts/classical_lessons24_25_canvas_catalog.js"));
const {
    CLASSICAL_NAHUATL_LESSON26_CANVAS_EXAMPLES,
} = require(resolveLegacySupportPath("scripts/classical_lesson26_canvas_catalog.js"));

const ROOT = path.resolve(__dirname, "..", "..");
const CANVAS_LINES = fs.readFileSync(
    path.join(ROOT, "ANDREWS_TRANSCRIPTION_CANVAS.md"),
    "utf8"
).split(/\r?\n/u);

function clone(value) {
    return JSON.parse(JSON.stringify(value));
}

function buildTwoObjectCluster(ctx, overrides = {}) {
    return ctx.buildClassicalNahuatlObjectClusterFrame("pāca-l-tiā", {
        subject: "1sg",
        subjectCarrier: "ni",
        predicateStem: "pāca-l-tiā",
        tense: "present",
        objectRequests: [
            {
                objectId: "direct",
                objectKind: "specific-projective",
                objectPerson: "3sg",
                governor: "directive",
                derivationalLevel: 1,
            },
            {
                objectId: "caused",
                objectKind: "specific-projective",
                objectPerson: "2sg",
                governor: "causative",
                derivationalLevel: 2,
            },
        ],
        ...overrides,
    });
}

const LESSON23_COMBINATION_CARRIERS = Object.freeze([
    ["tla", "tla", "tla"],
    ["tē", "tla", "tla"],
    ["m-o", "tla", "tla"],
    ["tē", "tē", "tla"],
    ["m-o", "tē", "tla"],
    ["c-0", "m-o", "tla"],
    ["tē", "tē", "tē"],
    ["m-o", "tē", "tē"],
    ["c-0", "m-o", "tē"],
    ["c-0", "0-0", "tla"],
    ["c-0", "0-0", "tē"],
    ["c-0", "0-0", "m-o"],
    ["c-0", "0-0", "0-0"],
].map(row => Object.freeze(row)));

function buildLesson23CombinationRows(ctx) {
    const carrierKind = carrier => carrier === "tla"
        ? "nonspecific-nonhuman"
        : carrier === "tē"
            ? "nonspecific-human"
            : carrier === "m-o"
                ? "reflexive"
                : "specific-projective";
    return LESSON23_COMBINATION_CARRIERS.map((carriers, rowIndex) => {
        const kinds = carriers.map(carrierKind);
        const reflexiveIndex = kinds.indexOf("reflexive");
        const specificIndex = kinds.indexOf("specific-projective");
        const mainlineIndex = reflexiveIndex >= 0
            ? reflexiveIndex
            : specificIndex >= 0 ? specificIndex : kinds.length - 1;
        const remainingLevels = [1, 2];
        const levels = kinds.map((_kind, index) => (
            index === mainlineIndex ? 3 : remainingLevels.shift()
        ));
        return ctx.buildClassicalNahuatlObjectClusterFrame("combination-proof", {
            subject: "3sg",
            subjectCarrier: "0",
            predicateStem: "combination-proof",
            tense: "present",
            objectRequests: kinds.map((objectKind, index) => ({
                objectId: `row-${rowIndex + 1}-object-${index + 1}`,
                objectKind,
                objectPerson: objectKind === "specific-projective" || objectKind === "reflexive"
                    ? "3sg"
                    : "",
                governor: levels[index] === 1
                    ? "directive"
                    : levels[index] === 2 ? "causative" : "applicative",
                derivationalLevel: levels[index],
            })),
            minimumPositionCount: 3,
            maximumPositionCount: 3,
        });
    });
}

function run(ctx = {}) {
    const s = createSuite("classical_vnc_lessons23_26_closure");

    s.eq(
        "Lessons 23-26 expose one canonical GCD and a zero-gap source-span LCM",
        (() => {
            const frame = ctx.buildClassicalNahuatlLessons2326ClosureFrame();
            return {
                status: frame.authorizationStatus,
                canonical: ctx.isClassicalNahuatlLessons2326ClosureFrame(frame),
                gcd: frame.gcd.identity,
                lessonCounts: Object.fromEntries([23, 24, 25, 26].map(lesson => [
                    lesson,
                    frame.inventory.filter(item => item.lesson === lesson).length,
                ])),
                sectionCount: frame.sectionInventory.length,
                subsectionCount: frame.subsectionInventory.length,
                coveredCount: frame.sectionsCovered.length,
                uncovered: frame.uncoveredSections,
                invalid: frame.invalidItemIds,
                blocked: frame.blockedItemIds,
                lcmComplete: frame.lcm.licensedDistinctionsComplete,
                authority: [
                    frame.lessonMetadataAuthority,
                    frame.evidenceAuthority,
                    frame.formulaStringAuthority,
                    frame.surfaceStringAuthority,
                ],
            };
        })(),
        {
            status: "authorized",
            canonical: true,
            gcd: "typed-vnc-source-operation-participant-boundary-result",
            lessonCounts: { 23: 17, 24: 22, 25: 18, 26: 28 },
            sectionCount: 53,
            subsectionCount: 126,
            coveredCount: 53,
            uncovered: [],
            invalid: [],
            blocked: ["l24-249-source-span-missing"],
            lcmComplete: true,
            authority: [false, false, false, false],
        }
    );

    s.eq(
        "Every explicit Canvas heading, note, remark, and exception marker has a classified source span",
        (() => {
            const inventory = ctx.getClassicalNahuatlLessons2326SourceSpanInventory();
            const source = CANVAS_LINES.slice(7455, 9004).join("\n");
            const foundSections = [...source.matchAll(/\b((?:23|24|25|26)\.\d+)\./gu)]
                .map(match => match[1]);
            const sectionSet = [...new Set(foundSections)].sort();
            const markerLines = [];
            CANVAS_LINES.slice(7455, 9004).forEach((line, offset) => {
                if (/^(?:Note|Remark|Exception|Exceptions):/u.test(line.trim())) {
                    markerLines.push(offset + 7456);
                }
            });
            const unclassifiedMarkers = markerLines.filter(lineNumber => !inventory.some(item => (
                item.transcriptionLineStart <= lineNumber && item.transcriptionLineEnd >= lineNumber
            )));
            const absentSections = sectionSet.filter(section => !inventory.some(item => item.section.startsWith(section)));
            const badTokens = inventory.flatMap(item => {
                const span = CANVAS_LINES.slice(
                    item.transcriptionLineStart - 1,
                    item.transcriptionLineEnd
                ).join("\n");
                return item.tokens
                    .filter(token => !span.includes(token))
                    .map(token => `${item.id}:${token}`);
            });
            return {
                sourceSectionCount: sectionSet.length,
                absentSections,
                markerCount: markerLines.length,
                unclassifiedMarkers,
                badTokens,
                everyDispositionExplicit: inventory.every(item => [
                    "existing-canonical-rule",
                    "new-canonical-rule",
                    "read-only-evidence",
                    "genuinely-blocked",
                ].includes(item.disposition)),
                everyPathExplicit: inventory.every(item => item.path.length > 0),
                everySubsectionExplicit: inventory.every(item => item.coveredSections.length > 0),
            };
        })(),
        {
            sourceSectionCount: 52,
            absentSections: [],
            markerCount: 16,
            unclassifiedMarkers: [],
            badTokens: [],
            everyDispositionExplicit: true,
            everyPathExplicit: true,
            everySubsectionExplicit: true,
        }
    );

    s.eq(
        "Every grammar-bearing ledger item points to an installed canonical capability",
        (() => {
            const inventory = ctx.getClassicalNahuatlLessons2326SourceSpanInventory();
            const grammarItems = inventory.filter(item => item.grammarAuthority);
            const unresolved = grammarItems.filter(item => !item.path.every(capability => (
                typeof ctx[capability] === "function" || ctx[capability] != null
            ))).map(item => [item.id, item.path]);
            return {
                grammarItemCount: grammarItems.length,
                unresolved,
                newRuleIds: grammarItems
                    .filter(item => item.disposition === "new-canonical-rule")
                    .map(item => item.id),
            };
        })(),
        {
            grammarItemCount: 79,
            unresolved: [],
            newRuleIds: [
                "l23-231-object-suffix-unit",
                "l23-235-thirteen-combinations",
                "l26-2623-object-suffix-unit",
            ],
        }
    );

    s.eq(
        "The runtime LCM owns every grammar-bearing source family and the GCD is the smallest typed generation invariant",
        (() => {
            const grammarItems = ctx.getClassicalNahuatlLessons2326SourceSpanInventory()
                .filter(item => item.grammarAuthority);
            const grammarFamilyIds = [...new Set(grammarItems.map(item => item.proofFamily))].sort();
            const axes = ctx.__TEST_CLASSICAL_NAHUATL_LESSONS23_26_LCM.axes;
            const axisIds = axes.map(axis => axis.axisId).sort();
            const axisById = new Map(axes.map(axis => [axis.axisId, axis]));
            return {
                gcdStages: ctx.__TEST_CLASSICAL_NAHUATL_LESSONS23_26_GCD.stageOrder,
                semanticAxisCount: axes.length,
                missingFamilies: grammarFamilyIds.filter(familyId => !axisById.has(familyId)),
                extraAxes: axisIds.filter(axisId => !grammarFamilyIds.includes(axisId)),
                pathMismatches: grammarItems
                    .filter(item => !item.path.every(capability => axisById.get(item.proofFamily)?.ownerCapabilities.includes(capability)))
                    .map(item => item.id),
                unavailableCapabilities: axes.flatMap(axis => axis.ownerCapabilities
                    .filter(capability => typeof ctx[capability] !== "function" && ctx[capability] == null)
                    .map(capability => `${axis.axisId}:${capability}`)),
            };
        })(),
        {
            gcdStages: [
                "source-analysis",
                "licensed-operation",
                "participant-history",
                "boundary-realization",
                "finite-result",
            ],
            semanticAxisCount: 51,
            missingFamilies: [],
            extraAxes: [],
            pathMismatches: [],
            unavailableCapabilities: [],
        }
    );

    s.eq(
        "Scalar generation has no lesson-specific result lane and rejects a caller-supplied lesson frame",
        (() => {
            const application = ctx.createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "direct",
                requestedVoice: "active",
            };
            const scalar = application.evaluate(request);
            const callerForgery = application.evaluate({
                ...request,
                lessons2326GrammarFrame: {
                    authorizationStatus: "authorized",
                    formulaRealization: "#forged#",
                    surfaceRealization: "forged",
                },
            });
            return {
                status: scalar.authorizationStatus,
                formula: scalar.resultFrame.formulaRealization,
                surface: scalar.resultFrame.surfaceRealization,
                resultHasLessonFrame:
                    Object.hasOwn(scalar.resultFrame, "lessons2326GrammarFrame"),
                productionLessonBuilderTypes: [
                    typeof ctx.buildClassicalNahuatlLessons2326GrammarFrame,
                    typeof ctx.isClassicalNahuatlLessons2326GrammarFrame,
                ],
                callerForgery: [
                    callerForgery.authorizationStatus,
                    callerForgery.rejectedAuthorityFields.includes("lessons2326GrammarFrame"),
                    Object.hasOwn(
                        callerForgery.resultFrame,
                        "lessons2326GrammarFrame"
                    ),
                    callerForgery.resultFrame.formulaRealization,
                    callerForgery.resultFrame.surfaceRealization,
                    callerForgery.resultFrame.callerSuppliedAuthorityAccepted,
                ],
            };
        })(),
        {
            status: "authorized",
            formula: "#ni-0(tomi)0+0-0#",
            surface: "nitomi",
            resultHasLessonFrame: false,
            productionLessonBuilderTypes: ["undefined", "undefined"],
            callerForgery: [
                "blocked",
                true,
                false,
                "",
                "",
                false,
            ],
        }
    );

    s.eq(
        "Full-paradigm coordinates are pointwise scalar results with no lesson-specific projection",
        (() => {
            const application = ctx.createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "causative",
                causativeObjectKind: "reflexive",
                requestedVoice: "active",
            };
            const preview = application.evaluate({ ...request, derivationOptionId: "" });
            const option = preview.controlFrame.derivationOptionInventory.options
                .find(candidate => candidate.targetStem === "tom-a");
            const plan = application.prepareParadigm({
                ...request,
                derivationOptionId: option.optionId,
                outputScope: "paradigm",
            });
            const rows = application.projectParadigmCoordinates(plan, [
                { subject: "1sg", mood: "indicative", tense: "present" },
                { subject: "3pl", mood: "optative", tense: "future" },
            ]);
            const rowText = JSON.stringify(rows);
            return {
                planStatus: plan.authorizationStatus,
                statuses: rows.map(row => row.authorizationStatus),
                canonical: rows.map(row => ctx.isClassicalNahuatlVncParadigmCoordinateFrame(row)),
                scalarEquivalent: rows.map(row => (
                    row.scalarEquivalent === true
                    && row.formulaRealization
                        === row.scalarApplicationFrame.resultFrame.formulaRealization
                    && row.surfaceRealization
                        === row.scalarApplicationFrame.resultFrame.surfaceRealization
                )),
                lessonProjectionFields: [...new Set(
                    rowText.match(/lessons2326GrammarFrame|lessons2326GrammarProjection/gu)
                    || []
                )],
            };
        })(),
        {
            planStatus: "authorized",
            statuses: ["authorized", "authorized"],
            canonical: [true, true],
            scalarEquivalent: [true, true],
            lessonProjectionFields: [],
        }
    );

    s.eq(
        "The corrupted §24.9 span is fail-closed and rejects a forged reconstruction",
        (() => {
            const frame = ctx.buildClassicalNahuatlLessons2326BlockedSourceSpanFrame("24.9");
            const forged = clone(frame);
            forged.authorizationStatus = "authorized";
            forged.grammarGenerationAllowed = true;
            forged.reconstruction = "caller-invented-rule";
            const unknown = ctx.buildClassicalNahuatlLessons2326BlockedSourceSpanFrame("24.99");
            return {
                frame: [
                    frame.authorizationStatus,
                    frame.blockReason,
                    frame.grammarGenerationAllowed,
                    frame.formulaOutputAllowed,
                    frame.surfaceGenerationAllowed,
                    ctx.isClassicalNahuatlLessons2326BlockedSourceSpanFrame(frame),
                ],
                forgedCanonical: ctx.isClassicalNahuatlLessons2326BlockedSourceSpanFrame(forged),
                unknown: [unknown.authorizationStatus, unknown.blockReason],
            };
        })(),
        {
            frame: [
                "blocked",
                "andrews-canvas-24.9-source-span-corrupted",
                false,
                false,
                false,
                true,
            ],
            forgedCanonical: false,
            unknown: ["blocked", "andrews-canvas-blocked-source-span-not-recognized"],
        }
    );

    s.eq(
        "The §23.5 thirteen-row evidence table is proved by thirteen scalar typed object clusters",
        (() => {
            const rows = buildLesson23CombinationRows(ctx);
            return {
                statuses: rows.map(row => row.authorizationStatus),
                canonical: rows.map(row => ctx.isClassicalNahuatlObjectClusterFrame(row)),
                rowCount: rows.length,
                exactCount: rows.filter((row, index) => (
                    JSON.stringify(row.linearCarriers.map(carrier => (
                        ["c-0", "qu-0", "qui-0"].includes(carrier) ? "c-0" : carrier
                    ))) === JSON.stringify(LESSON23_COMBINATION_CARRIERS[index])
                )).length,
                abstractRows: rows.map(row => row.linearCarriers.map(carrier => (
                    ["c-0", "qu-0", "qui-0"].includes(carrier) ? "c-0" : carrier
                ))),
                nestedGovernors: rows.every(row => row.positions.every(position => (
                    position.governorUnitFrame?.objectId === position.objectId
                    && position.governorUnitFrame?.governor === position.governor
                    && position.governorUnitFrame?.callerSuppliedGovernorAllowed === false
                ))),
                retiredBuilder: typeof ctx.buildClassicalNahuatlLesson23ObjectCombinationClosureFrame,
                retiredValidator: typeof ctx.isClassicalNahuatlLesson23ObjectCombinationClosureFrame,
            };
        })(),
        {
            statuses: Array(13).fill("authorized"),
            canonical: Array(13).fill(true),
            rowCount: 13,
            exactCount: 13,
            abstractRows: LESSON23_COMBINATION_CARRIERS,
            nestedGovernors: true,
            retiredBuilder: "undefined",
            retiredValidator: "undefined",
        }
    );

    s.eq(
        "Object governors are typed discontinuous units and cannot be replaced by carrier text",
        (() => {
            const cluster = buildTwoObjectCluster(ctx);
            const directive = cluster.positions.find(position => position.governor === "directive")?.governorUnitFrame;
            const causative = cluster.positions.find(position => position.governor === "causative")?.governorUnitFrame;
            const forgedCluster = clone(cluster);
            const forged = forgedCluster.positions.find(position => position.governor === "causative").governorUnitFrame;
            forged.governor = "applicative";
            forged.objectCarrierAuthority = true;
            return {
                cluster: [cluster.authorizationStatus, ctx.isClassicalNahuatlObjectClusterFrame(cluster)],
                directive: [
                    directive.objectFunction,
                    directive.requiredStemOperation,
                    directive.discontinuousUnit,
                    directive.governor === cluster.positions.find(position => position.governor === "directive").governor,
                ],
                causative: [
                    causative.objectFunction,
                    causative.requiredStemOperation,
                    causative.discontinuousUnit,
                    causative.governor === cluster.positions.find(position => position.governor === "causative").governor,
                ],
                forgedCanonical: ctx.isClassicalNahuatlObjectClusterFrame(forgedCluster),
                retiredStandaloneValidator: typeof ctx.isClassicalNahuatlObjectGovernorUnitFrame,
            };
        })(),
        {
            cluster: ["authorized", true],
            directive: ["direct", "lexical-directive-stem", false, true],
            causative: ["causative", "causative-derivational-suffix", true, true],
            forgedCanonical: false,
            retiredStandaloneValidator: "undefined",
        }
    );

    s.eq(
        "Noncontiguous histories, misplaced directives, duplicate identities, and a fourth object fail closed",
        (() => {
            const base = [
                { objectId: "a", objectKind: "specific-projective", objectPerson: "3sg", governor: "directive", derivationalLevel: 1 },
                { objectId: "b", objectKind: "nonspecific-human", objectPerson: "", governor: "causative", derivationalLevel: 2 },
            ];
            const build = objectRequests => buildTwoObjectCluster(ctx, {
                objectRequests,
                minimumPositionCount: 2,
                maximumPositionCount: 3,
            });
            return {
                noncontiguous: [build([
                    { ...base[0] },
                    { ...base[1], derivationalLevel: 3 },
                ]).authorizationStatus, build([
                    { ...base[0] },
                    { ...base[1], derivationalLevel: 3 },
                ]).blockReason],
                misplacedDirective: [build([
                    { ...base[0], governor: "causative" },
                    { ...base[1], governor: "directive" },
                ]).authorizationStatus, build([
                    { ...base[0], governor: "causative" },
                    { ...base[1], governor: "directive" },
                ]).blockReason],
                duplicate: build([
                    { ...base[0] },
                    { ...base[1], objectId: "a" },
                ]).authorizationStatus,
                fourth: build([
                    ...base,
                    { objectId: "c", objectKind: "nonspecific-nonhuman", objectPerson: "", governor: "applicative", derivationalLevel: 3 },
                    { objectId: "d", objectKind: "reflexive", objectPerson: "1sg", governor: "causative", derivationalLevel: 4 },
                ]).authorizationStatus,
            };
        })(),
        {
            noncontiguous: ["blocked", "lesson23-typed-object-request-inventory-invalid"],
            misplacedDirective: ["blocked", "lesson23-typed-object-request-inventory-invalid"],
            duplicate: "blocked",
            fourth: "blocked",
        }
    );

    s.eq(
        "Every specific-person substitution preserves one sounded §23 position and all silent positions",
        ["1sg", "2sg", "3sg", "1pl", "2pl", "3pl"].map(person => {
            const frame = ctx.buildClassicalNahuatlObjectClusterFrame("person-proof", {
                subject: "3sg",
                subjectCarrier: "0",
                predicateStem: "person-proof",
                tense: "present",
                objectRequests: [
                    { objectId: "first", objectKind: "specific-projective", objectPerson: person, governor: "directive", derivationalLevel: 1 },
                    { objectId: "second", objectKind: "specific-projective", objectPerson: "3sg", governor: "causative", derivationalLevel: 2 },
                    { objectId: "third", objectKind: "nonspecific-nonhuman", objectPerson: "", governor: "applicative", derivationalLevel: 3 },
                ],
                minimumPositionCount: 3,
                maximumPositionCount: 3,
            });
            return [
                person,
                frame.authorizationStatus,
                frame.positions.filter(position => position.objectKind === "specific-projective" && position.sounded).length,
                frame.positions.filter(position => position.objectKind === "specific-projective" && !position.sounded).length,
                frame.positions.every(position => (
                    position.governorUnitFrame?.objectId === position.objectId
                    && position.governorUnitFrame?.governor === position.governor
                )),
            ];
        }),
        [
            ["1sg", "authorized", 1, 1, true],
            ["2sg", "authorized", 1, 1, true],
            ["3sg", "authorized", 1, 1, true],
            ["1pl", "authorized", 1, 1, true],
            ["2pl", "authorized", 1, 1, true],
            ["3pl", "authorized", 1, 1, true],
        ]
    );

    s.eq(
        "Every Lessons 24-26 evidence row maps to a classified section without becoming authority",
        (() => {
            const inventory = ctx.getClassicalNahuatlLessons2326SourceSpanInventory();
            const evidence = [
                ...CLASSICAL_NAHUATL_LESSONS24_25_CANVAS_EXAMPLES,
                ...CLASSICAL_NAHUATL_LESSON26_CANVAS_EXAMPLES,
            ];
            const unclassified = evidence.filter(row => {
                return !inventory.some(item => item.coveredSections.some(section => (
                    section === row.section || section.startsWith(`${row.section}.`)
                )));
            });
            return {
                evidenceRows: evidence.length,
                unclassified: unclassified.map(row => [row.lesson, row.section, row.name]),
                authorityFieldsPresent: evidence.some(row => (
                    Object.hasOwn(row, "optionId")
                    || Object.hasOwn(row, "targetStem")
                    || Object.hasOwn(row, "grammarGenerationAllowed")
                )),
            };
        })(),
        {
            evidenceRows: 388,
            unclassified: [],
            authorityFieldsPresent: false,
        }
    );

    s.eq(
        "Source-audit metadata stays outside scalar and full-paradigm application frames",
        (() => {
            const application = ctx.createClassicalNahuatlVncApplication(ctx);
            const request = {
                sourceStem: "tomi",
                verbClass: "B",
                sourceValence: "intransitive",
                sourceSubject: "3sg",
                subject: "1sg",
                mood: "indicative",
                tense: "present",
                requestedDerivation: "direct",
                requestedVoice: "active",
            };
            const scalar = application.evaluate(request);
            const paradigm = application.evaluate({
                ...request,
                outputScope: "full-paradigm",
            });
            const auditToken = /lessons23To26ClosureFrame|source-span-closure-frame|sourceClaimId|sourceDisposition|closureReceipt/u;
            return {
                scalarStatus: scalar.authorizationStatus,
                scalarCanonical: ctx.isClassicalNahuatlVncApplicationFrame(scalar),
                scalarAuditMetadata: auditToken.test(JSON.stringify(scalar)),
                paradigmStatus: paradigm.authorizationStatus,
                paradigmCanonical: ctx.isClassicalNahuatlVncApplicationFrame(paradigm),
                paradigmAuditMetadata: auditToken.test(JSON.stringify(paradigm)),
            };
        })(),
        {
            scalarStatus: "authorized",
            scalarCanonical: true,
            scalarAuditMetadata: false,
            paradigmStatus: "authorized",
            paradigmCanonical: true,
            paradigmAuditMetadata: false,
        }
    );

    s.eq(
        "The audit ledger is test-only and has no browser-runtime or shell projection",
        (() => {
            const runtimeSource = fs.readFileSync(
                path.join(ROOT, "src", "runtime", "create_runtime.mjs"),
                "utf8"
            );
            const applicationSource = fs.readFileSync(
                path.join(ROOT, "src", "application", "classical", "vnc_application.mjs"),
                "utf8"
            );
            const renderingSource = fs.readFileSync(
                path.join(ROOT, "src", "ui", "rendering", "rendering.mjs"),
                "utf8"
            );
            const shellSource = fs.readFileSync(
                path.join(ROOT, "src", "ui", "shell", "classical_shell.mjs"),
                "utf8"
            );
            return {
                runtimeInstaller: runtimeSource.includes("VncLessons2326Closure"),
                applicationAttachment: applicationSource.includes("lessons23To26ClosureFrame"),
                rendererProjection: renderingSource.includes("syncClassicalLessons2326Closure"),
                shellProjection: shellSource.includes("data-classical-lessons23-26"),
                internalLedgerPresent: fs.existsSync(
                    resolveLegacySupportPath("scripts/lib/classical_lessons23_26_source_span_audit.mjs")
                ),
            };
        })(),
        {
            runtimeInstaller: false,
            applicationAttachment: false,
            rendererProjection: false,
            shellProjection: false,
            internalLedgerPresent: true,
        }
    );

    s.eq(
        "#3 Result contains generated output only and exposes no source-audit disclosure or hidden carrier",
        (() => {
            const rendering = fs.readFileSync(
                path.join(ROOT, "src", "ui", "rendering", "rendering.mjs"),
                "utf8"
            );
            const resultRenderer = rendering.slice(
                rendering.indexOf("function renderClassicalRuleLogicSurfaceBlock"),
                rendering.indexOf("function applyOutputPanelShellForTenseMode")
            );
            return {
                generatedOnlyOrder: resultRenderer.includes('classicalResultPresentationOrder = "generated-result-only"'),
                sourceAuditDisclosure: /How this was built|Why this form\\?|Canvas comparison records|comparison-evidence/u.test(resultRenderer),
                hiddenAuditCarrier: /classicalResultAuthorityReceipt|classicalVncSourceAnalysisCount|classicalVncReverseSourceAnalysisCount|classicalMachineAuthority/u.test(resultRenderer),
                resultAttachesWitnesses: /body\.append\([^)]*(?:proofDetails|witnessDetails)|block\.append\([^)]*authorityReceipt/u.test(resultRenderer),
            };
        })(),
        {
            generatedOnlyOrder: true,
            sourceAuditDisclosure: false,
            hiddenAuditCarrier: false,
            resultAttachesWitnesses: false,
        }
    );

    s.eq(
        "#1 Source and #2 Grammar expose no source spans, audit counts, or evidence carriers",
        (() => {
            const shell = fs.readFileSync(
                path.join(ROOT, "src", "ui", "shell", "classical_shell.mjs"),
                "utf8"
            );
            const composer = fs.readFileSync(
                path.join(ROOT, "src", "ui", "composer", "composer.mjs"),
                "utf8"
            );
            const rendering = fs.readFileSync(
                path.join(ROOT, "src", "ui", "rendering", "rendering.mjs"),
                "utf8"
            );
            return {
                shellSourceSpanAttributes: /data-transcription-line|data-pdf-page/u.test(shell),
                composerSourceSpanDatasets: /dataset\.transcriptionLine|classicalCanonicalInventoryCount/u.test(composer),
                grammarAuditDatasets: /classicalNncGrammar(?:LcmAxisCount|SourceSections|SourceClaimCount|UnclassifiedClaimCount)/u.test(rendering),
                renderingSourceSpanDatasets: /dataset\.transcriptionLine/u.test(rendering),
            };
        })(),
        {
            shellSourceSpanAttributes: false,
            composerSourceSpanDatasets: false,
            grammarAuditDatasets: false,
            renderingSourceSpanDatasets: false,
        }
    );

    return s;
}

module.exports = { run };
