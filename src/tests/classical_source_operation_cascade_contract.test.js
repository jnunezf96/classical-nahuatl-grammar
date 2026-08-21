"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const PROJECT_ROOT = path.resolve(__dirname, "..", "..");
const read = relativePath => fs.readFileSync(
    path.join(PROJECT_ROOT, relativePath),
    "utf8"
);

const CUSTOM_ROUTES = Object.freeze([
    ["nominal-embed-vnc", "classical-nominal-embed-role"],
    ["attitude-vnc", "classical-attitude-operation"],
    ["deverbal-nnc", "classical-deverbal-nnc-family"],
    ["compound-nnc", "classical-compound-nnc-structure"],
    ["affective-nnc", "classical-affective-matrix"],
    ["cardinal-numeral-nnc", "classical-cardinal-target-kind"],
    ["personal-name-nnc", "classical-personal-name-source-family"],
    ["place-gentilic-nnc", "classical-place-gentilic-result-kind"],
    ["denominal-vnc", "classical-denominal-vnc-operation"],
    ["adverbial-nuclear", "classical-adverbial-scope"],
]);

const EXPECTED_SOURCE_ANALYSIS_IDS = Object.freeze([
    "classical-attitude-source-analysis",
    "classical-personal-name-source-family",
    "classical-personal-name-derived-facts",
    "classical-denominal-vnc-operation-path",
    "classical-denominal-vnc-source-subject",
    "classical-denominal-vnc-source-possessor",
    "classical-deverbal-nnc-preterit-agentive-variant",
    "classical-deverbal-nnc-action-stem-variant",
    "classical-deverbal-nnc-root-stock-allomorph",
    "classical-deverbal-nnc-root-stock-source-analysis",
    "classical-compound-nnc-embed-source-class",
    "classical-compound-nnc-embed-analysis",
    "classical-compound-nnc-variant-stem",
    "classical-compound-nnc-unique-position",
    "classical-compound-nnc-unique-meaning",
    "classical-compound-nnc-yo-embed-history",
    "classical-affective-lexical-status",
    "classical-affective-irregular-embed-stem",
    "classical-affective-embed-affinity-requirement",
    "classical-affective-embed-affinity-target",
    "classical-affective-flawed-source-status",
    "classical-affective-flawed-class-strategy",
    "classical-affective-flawed-lexical-reading",
    "classical-affective-defect-analysis",
    "classical-gentilic-source-place-matrix",
    "classical-place-affective-analysis",
    "classical-place-gentilic-lexical-record",
    "classical-adverbial-lexical-facts",
    "classical-cardinal-measure-class",
    "classical-cardinal-measured-class",
]);

const EXPECTED_STATE_GRAMMAR_IDS = Object.freeze([
    "classical-denominal-vnc-included-family",
    "classical-nominal-embed-possession-kind",
    "classical-nominal-embed-possessor-reference",
    "classical-compound-nnc-possessor-orientation",
    "classical-affective-vocative-form",
    "classical-affective-possessive-affinity-plural",
    "classical-cardinal-gross-possessor-kind",
    "classical-cardinal-gross-number-variant",
]);

const EXPECTED_PREDICATE_GRAMMAR_IDS = Object.freeze([
    "classical-denominal-vnc-result-object-1",
    "classical-denominal-vnc-result-object-2",
    "classical-deverbal-nnc-activated-object-person",
    "classical-deverbal-nnc-passive-human-realization",
    "classical-deverbal-nnc-patientive-contrast",
    "classical-nominal-embed-role",
    "classical-nominal-embed-adverbial-route",
    "classical-nominal-embed-adverbial-role",
    "classical-nominal-embed-reference-orientation",
    "classical-nominal-embed-complement-relation",
    "classical-attitude-participant",
]);

const EXPECTED_SENTENCE_GRAMMAR_IDS = Object.freeze([
    "classical-denominal-vnc-exclamatory",
    "classical-personal-name-reranking",
    "classical-personal-name-sentence-operation",
    "classical-personal-name-sentence-operation-status",
    "classical-cardinal-modifier",
    "classical-cardinal-measure-composition",
    "classical-adverbial-preceding-particle",
    "classical-adverbial-negative-particle",
    "classical-adverbial-stress-partner",
    "classical-adverbial-variant",
    "classical-adverbial-sentence-position",
    "classical-adverbial-clause-type",
    "classical-adverbial-negation-scope",
]);

function functionSlice(source, functionName, nextFunctionName) {
    const start = source.indexOf(`function ${functionName}`);
    const end = source.indexOf(`function ${nextFunctionName}`, start + 1);
    return start >= 0 && end > start ? source.slice(start, end) : "";
}

function constantSlice(source, constantName, nextConstantName) {
    const start = source.indexOf(`const ${constantName}`);
    const end = source.indexOf(`const ${nextConstantName}`, start + 1);
    return start >= 0 && end > start ? source.slice(start, end) : "";
}

function countLiteral(source, literal) {
    return source.split(literal).length - 1;
}

function quotedClassicalIds(source) {
    return Array.from(
        new Set(Array.from(
            String(source || "").matchAll(/"(classical-[^"]+)"/gu),
            match => match[1]
        ))
    );
}

function parseCustomGrammarPlacements(source) {
    const placements = new Map();
    const pattern = /"(classical-[^"]+)":\s*makeClassicalCustomFormationPlacement\(\s*"([^"]*)"(?:\s*,\s*"([^"]*)")?\s*\)/gu;
    Array.from(String(source || "").matchAll(pattern)).forEach(match => {
        const normalizedGroups = [match[2], match[3] || ""]
            .filter(Boolean)
            .map(group => (
                ["nounstem", "derivation", "verbstem"].includes(group)
                    ? "formation"
                    : group
            ));
        placements.set(match[1], Array.from(new Set(normalizedGroups)));
    });
    return placements;
}

function controlIsOwnedByRoute(shell, routeId, controlId) {
    const pattern = new RegExp(
        `data-construction-for=["'][^"']*\\b${routeId}\\b[^"']*["'][^>]*>`
        + `[\\s\\S]{0,2200}?id=["']${controlId}["']`,
        "u"
    );
    return pattern.test(shell);
}

function makeElement(tagName = "div", id = "") {
    const attributes = Object.create(null);
    return {
        tagName: tagName.toUpperCase(),
        id,
        hidden: false,
        disabled: false,
        value: "",
        textContent: "",
        dataset: {},
        children: [],
        parentElement: null,
        setAttribute(name, value) {
            attributes[name] = String(value);
        },
        getAttribute(name) {
            return attributes[name] ?? null;
        },
        appendChild(child) {
            child.parentElement = this;
            this.children.push(child);
            return child;
        },
        replaceChildren(...children) {
            this.children = [];
            children.forEach(child => this.appendChild(child));
        },
        querySelectorAll(selector) {
            return selector === "select, input, button"
                ? this.children.filter(child => ["SELECT", "INPUT", "BUTTON"].includes(child.tagName))
                : [];
        },
        closest() {
            return this.parentElement;
        },
        get options() {
            return this.children;
        },
    };
}

function makePersonalNameDocument() {
    const rerankingWrapper = makeElement("label", "reranking-wrapper");
    const sentenceWrapper = makeElement("label", "sentence-wrapper");
    const reranking = makeElement("select", "classical-personal-name-reranking");
    const sentence = makeElement("select", "classical-personal-name-sentence-operation");
    const status = makeElement("p", "classical-personal-name-sentence-operation-status");
    reranking.value = "personal-name";
    sentence.value = "sentence-name-use";
    rerankingWrapper.appendChild(reranking);
    sentenceWrapper.appendChild(sentence);
    const elements = new Map([
        [reranking.id, reranking],
        [sentence.id, sentence],
        [status.id, status],
    ]);
    return {
        document: {
            createElement(tagName) {
                return makeElement(tagName);
            },
            getElementById(id) {
                return elements.get(id) || null;
            },
        },
        reranking,
        rerankingWrapper,
        sentence,
        sentenceWrapper,
        status,
    };
}

function run(ctx = {}) {
    const suite = createSuite("classical_source_operation_cascade_contract");
    const shell = read("src/ui/shell/classical_shell.mjs");
    const rendering = read("src/ui/rendering/rendering.mjs");
    const composer = read("src/ui/composer/composer.mjs");
    const css = read("style.css");
    const handlers = constantSlice(
        rendering,
        "ClassicalNominalConstructionOperationHandlers",
        "CLASSICAL_CUSTOM_CONSTRUCTION_SOURCE_ANALYSIS_CONTROL_IDS"
    );
    const sourceAnalysisInventory = constantSlice(
        rendering,
        "CLASSICAL_CUSTOM_CONSTRUCTION_SOURCE_ANALYSIS_CONTROL_IDS",
        "makeClassicalCustomFormationPlacement"
    );
    const grammarPlacementInventory = constantSlice(
        rendering,
        "CLASSICAL_CUSTOM_CONSTRUCTION_GRAMMAR_CONTROL_PLACEMENTS",
        "CLASSICAL_CUSTOM_CONSTRUCTION_GRAMMAR_CONTROL_ORDERS"
    );
    const grammarOrderStart = rendering.indexOf(
        "const CLASSICAL_CUSTOM_CONSTRUCTION_GRAMMAR_CONTROL_ORDERS"
    );
    const grammarOrderEnd = rendering.indexOf(
        "function getClassicalCustomConstructionGrammarOrder",
        grammarOrderStart + 1
    );
    const grammarOrderInventory = grammarOrderStart >= 0
        && grammarOrderEnd > grammarOrderStart
        ? rendering.slice(grammarOrderStart, grammarOrderEnd)
        : "";
    const grammarDynamicOrder = functionSlice(
        rendering,
        "getClassicalCustomConstructionGrammarOrder",
        "getClassicalCustomConstructionWrapper"
    );
    const managedControlsStart = rendering.indexOf(
        "const CLASSICAL_CUSTOM_CONSTRUCTION_MANAGED_CONTROL_IDS"
    );
    const managedControlsEnd = rendering.indexOf(
        "function getClassicalNominalConstructionControlValue",
        managedControlsStart + 1
    );
    const managedControls = managedControlsStart >= 0
        && managedControlsEnd > managedControlsStart
        ? rendering.slice(managedControlsStart, managedControlsEnd)
        : "";
    const nncGroups = constantSlice(
        rendering,
        "CLASSICAL_NNC_GRAMMAR_CONTROL_GROUPS",
        "CLASSICAL_NNC_GRAMMAR_GROUP_LABELS"
    );
    const visibility = functionSlice(
        rendering,
        "syncClassicalNominalConstructionControlVisibility",
        "parseClassicalPersonalNamePredicateMorphs"
    );
    const denominalVisibility = functionSlice(
        rendering,
        "syncClassicalDenominalVncControls",
        "syncClassicalDeverbalNncControls"
    );
    const requestBuilder = functionSlice(
        rendering,
        "buildClassicalNominalConstructionUiRequest",
        "syncClassicalNominalConstructionPresentation"
    );
    const denominalRequestStart = requestBuilder.indexOf(
        'if (constructionKind === "denominal-vnc")'
    );
    const denominalRequestEnd = requestBuilder.indexOf(
        'if (constructionKind === "place-gentilic-nnc")',
        denominalRequestStart + 1
    );
    const denominalRequest = denominalRequestStart >= 0
        && denominalRequestEnd > denominalRequestStart
        ? requestBuilder.slice(denominalRequestStart, denominalRequestEnd)
        : "";
    const resultUnit = functionSlice(
        rendering,
        "getClassicalNominalConstructionResultUnit",
        "allowClassicalVisibleSurfaceAtRendererBoundary"
    );
    const attitudeRequest = functionSlice(
        rendering,
        "buildClassicalAttitudeVncOperationRequest",
        "appendClassicalNominalConstructionFact"
    );

    const handlerRouteIds = Array.from(
        handlers.matchAll(/^\s+"([^"]+)":/gmu),
        match => match[1]
    );
    suite.eq(
        "the cascade contract covers every custom Source operation rather than one example stem",
        handlerRouteIds.sort(),
        CUSTOM_ROUTES.map(([routeId]) => routeId).sort()
    );

    const sourceIds = quotedClassicalIds(sourceAnalysisInventory).sort();
    const grammarPlacements = parseCustomGrammarPlacements(
        grammarPlacementInventory
    );
    const grammarIds = Array.from(grammarPlacements.keys()).sort();
    const orderIds = quotedClassicalIds(grammarOrderInventory).sort();
    const classifiedIds = Array.from(new Set([
        ...sourceIds,
        ...grammarIds,
    ])).sort();
    const expectedSemanticGroup = id => (
        EXPECTED_STATE_GRAMMAR_IDS.includes(id)
            ? "state"
            : EXPECTED_PREDICATE_GRAMMAR_IDS.includes(id)
                ? "predicate"
                : EXPECTED_SENTENCE_GRAMMAR_IDS.includes(id)
                    ? "sentence"
                    : "formation"
    );
    const semanticCounts = Object.fromEntries(
        ["formation", "state", "predicate", "sentence", "subject"].map(
            group => [
                group,
                Array.from(grammarPlacements.entries()).filter(([, groups]) => (
                    groups.length === 1 && groups[0] === group
                )).length,
            ]
        )
    );
    suite.eq(
        "all route-emergent controls are exhaustively classified as Source analysis or under their Grammar section",
        {
            sourceIds,
            sourceKeyCount: sourceIds.length,
            grammarKeyCount: grammarIds.length,
            classifiedNodeCount: classifiedIds.length,
            overlap: sourceIds.filter(id => grammarPlacements.has(id)),
            missingShellNode: classifiedIds.filter(
                id => countLiteral(shell, `id="${id}"`) !== 1
            ),
            semanticCounts,
            semanticMismatches: Array.from(
                grammarPlacements.entries()
            ).filter(([id, groups]) => (
                groups.length !== 1 || groups[0] !== expectedSemanticGroup(id)
            )).map(([id, groups]) => ({ id, groups })),
            orderKeyCount: orderIds.length,
            missingOrder: grammarIds.filter(id => (
                !orderIds.includes(id)
                && id !== "classical-construction-reduplication"
            )),
            sharedOrderIsRouteAware:
                grammarDynamicOrder.includes(
                    'selectedConstruction === "cardinal-numeral-nnc" ? 50 : 40'
                ),
        },
        {
            sourceIds: [...EXPECTED_SOURCE_ANALYSIS_IDS].sort(),
            sourceKeyCount: 30,
            grammarKeyCount: 91,
            classifiedNodeCount: 121,
            overlap: [],
            missingShellNode: [],
            semanticCounts: {
                formation: 59,
                state: 8,
                predicate: 11,
                sentence: 13,
                subject: 0,
            },
            semanticMismatches: [],
            orderKeyCount: 90,
            missingOrder: [],
            sharedOrderIsRouteAware: true,
        }
    );

    suite.eq(
        "the complete classified inventory inherits one structural Source and Grammar layout contract",
        {
            sourceCount: sourceIds.length,
            grammarCount: grammarIds.length,
            sourceOperationUsesOneColumn:
                /\[data-classical-source-path-lane="operation"\][\s\S]*?\.classical-nnc-source-analysis__grid \{[\s\S]*?grid-template-columns: minmax\(0, 1fr\);/.test(css),
            sourceOperationUsesBodyFont:
                /\[data-classical-source-path-lane="operation"\][\s\S]*?\.classical-nnc-source-analysis__grid \{[\s\S]*?font-family: var\(--font-body\);/.test(css),
            grammarLaneUsesHalfColumns:
                /\[data-classical-construction-grammar-lane\][\s\S]*?> \.classical-rule-control \{[\s\S]*?grid-column: span 6 !important;/.test(css),
            grammarLaneUsesSharedMobileBreakpoint:
                /@media \(max-width: 820px\)[\s\S]*?\[data-classical-construction-grammar-lane\][\s\S]*?> \.classical-rule-control \{\s*grid-column: 1 \/ -1 !important;/.test(css),
            sourceClassAndValenceStayInSource:
                visibility.includes("const sourceOwnedControlPlacements = new Map([")
                && visibility.includes('"classical-vnc-source-guide"')
                && visibility.includes('"classical-source-identity-controls"')
                && visibility.includes("sourcePlacement?.destination"),
        },
        {
            sourceCount: 30,
            grammarCount: 91,
            sourceOperationUsesOneColumn: true,
            sourceOperationUsesBodyFont: true,
            grammarLaneUsesHalfColumns: true,
            grammarLaneUsesSharedMobileBreakpoint: true,
            sourceClassAndValenceStayInSource: true,
        }
    );

    suite.eq(
        "direct generation remains selectable for a Source operation that accepts any basal unit",
        composer.includes('sourceUnit === "any"'),
        true
    );

    suite.eq(
        "each custom Source operation retains one owned route control that its UI request consumes",
        CUSTOM_ROUTES.map(([routeId, controlId]) => ({
            routeId,
            controlId,
            shellCount: countLiteral(shell, `id="${controlId}"`),
            routeOwned: controlIsOwnedByRoute(shell, routeId, controlId),
            requestConsumed: requestBuilder.includes(`"${controlId}"`),
        })),
        CUSTOM_ROUTES.map(([routeId, controlId]) => ({
            routeId,
            controlId,
            shellCount: 1,
            routeOwned: true,
            requestConsumed: true,
        }))
    );

    const explicitControlStart = visibility.indexOf(
        "const explicitlyUsedControls = new Map("
    );
    const explicitControlEnd = visibility.indexOf(
        "explicitlyUsedControls.forEach",
        explicitControlStart
    );
    const explicitControlPolicy = explicitControlStart >= 0
        && explicitControlEnd > explicitControlStart
        ? visibility.slice(explicitControlStart, explicitControlEnd)
        : "";
    const objectStart = explicitControlPolicy.indexOf(
        'explicitlyUsedControls.set(\n          "classical-rule-logic-object"'
    );
    const objectEnd = explicitControlPolicy.indexOf(
        'explicitlyUsedControls.set(\n          "classical-rule-logic-mood"',
        objectStart + 1
    );
    const objectPolicy = objectStart >= 0 && objectEnd > objectStart
        ? explicitControlPolicy.slice(objectStart, objectEnd)
        : "";
    const voiceStart = explicitControlPolicy.indexOf(
        'explicitlyUsedControls.set(\n          "classical-rule-logic-vnc-voice"'
    );
    const voiceEnd = explicitControlPolicy.indexOf(
        'explicitlyUsedControls.set(\n          "classical-rule-logic-vnc-output-scope"',
        voiceStart + 1
    );
    const voicePolicy = voiceStart >= 0 && voiceEnd > voiceStart
        ? explicitControlPolicy.slice(voiceStart, voiceEnd)
        : "";
    suite.eq(
        "custom routes deny managed generic controls before explicitly enabling consumed controls",
        {
            managedInventoryPresent:
                managedControls.includes("...Object.keys(CLASSICAL_NNC_GRAMMAR_CONTROL_GROUPS)")
                && managedControls.includes('"classical-rule-logic-object"')
                && managedControls.includes('"classical-rule-logic-vnc-voice"'),
            genericStemAndEndingManaged:
                nncGroups.includes('"classical-rule-logic-nnc-stem-relation"')
                && nncGroups.includes('"classical-rule-logic-nnc-plural-connector"'),
            denyFirst:
                explicitControlPolicy.includes(
                    "CLASSICAL_CUSTOM_CONSTRUCTION_MANAGED_CONTROL_IDS.map(id => [id, false])"
                ),
            genericStemReenabled:
                explicitControlPolicy.includes("classical-rule-logic-nnc-stem-relation"),
            genericEndingReenabled:
                explicitControlPolicy.includes("classical-rule-logic-nnc-plural-connector"),
            combinedVncSubjectRemainsMirror:
                explicitControlPolicy.includes(
                    '"classical-rule-logic-subject",\n          false'
                ),
            splitVncSubjectControlsReused: [
                "classical-rule-logic-vnc-subject-person",
                "classical-rule-logic-vnc-subject-animacy",
                "classical-rule-logic-vnc-subject-humanness",
                "classical-rule-logic-vnc-subject-number",
            ].every(id => explicitControlPolicy.includes(`"${id}"`))
                && explicitControlPolicy.includes(
                    "vncResultSelected || adverbialVncMatrix"
                ),
        },
        {
            managedInventoryPresent: true,
            genericStemAndEndingManaged: true,
            denyFirst: true,
            genericStemReenabled: false,
            genericEndingReenabled: false,
            combinedVncSubjectRemainsMirror: true,
            splitVncSubjectControlsReused: true,
        }
    );

    suite.eq(
        "Object and Voice are not broadly leaked into custom cascades that ignore them",
        {
            objectPolicyFound: Boolean(objectPolicy),
            objectUsedByEmbed: objectPolicy.includes('selected === "nominal-embed-vnc"'),
            objectUsedByAttitude: objectPolicy.includes('selected === "attitude-vnc"'),
            genericObjectLeaksToDenominal:
                objectPolicy.includes('selected === "denominal-vnc"')
                || objectPolicy.includes("resultObjectPeople"),
            dedicatedObject1Count: countLiteral(
                shell,
                'id="classical-denominal-vnc-result-object-1"'
            ),
            dedicatedObject2Count: countLiteral(
                shell,
                'id="classical-denominal-vnc-result-object-2"'
            ),
            dedicatedObjectsOwnedByDenominal:
                controlIsOwnedByRoute(
                    shell,
                    "denominal-vnc",
                    "classical-denominal-vnc-result-object-1"
                )
                && controlIsOwnedByRoute(
                    shell,
                    "denominal-vnc",
                    "classical-denominal-vnc-result-object-2"
                ),
            dedicatedObjectsArePathRequired:
                denominalVisibility.includes(
                    '`[data-denominal-vnc-result-object="${index}"]`'
                )
                && denominalVisibility.includes(
                    "Number(controlRequirements.resultObjectPeople || 0) >= index"
                ),
            dedicatedObjectsConsumed:
                denominalRequest.includes(
                    "controlRequirements.resultObjectPeople"
                )
                && denominalRequest.includes(
                    '`classical-denominal-vnc-result-object-${index + 1}`'
                )
                && denominalRequest.includes("objectPeople,"),
            objectLeaksToCardinal: objectPolicy.includes("cardinalVncAdverb"),
            objectLeaksToAdverbial: objectPolicy.includes("adverbialVncMatrix"),
            objectLeaksToAffective: objectPolicy.includes("affective-nnc"),
            objectLeaksToDeverbal: objectPolicy.includes("deverbal-nnc"),
            voicePolicyFound: Boolean(voicePolicy),
            voiceUsedByEmbed: voicePolicy.includes('selected === "nominal-embed-vnc"'),
            voiceUsedByAttitude: voicePolicy.includes('selected === "attitude-vnc"'),
            voiceUsedByCardinalVnc: voicePolicy.includes("cardinalVncAdverb"),
            voiceUsedByIncorporatedAdverb: voicePolicy.includes("adverbialVncMatrix"),
            voiceLeaksToAffective: voicePolicy.includes("affective-nnc"),
            voiceLeaksToDenominal: voicePolicy.includes("denominal-vnc"),
            voiceLeaksToDeverbal: voicePolicy.includes("deverbal-nnc"),
        },
        {
            objectPolicyFound: true,
            objectUsedByEmbed: true,
            objectUsedByAttitude: true,
            genericObjectLeaksToDenominal: false,
            dedicatedObject1Count: 1,
            dedicatedObject2Count: 1,
            dedicatedObjectsOwnedByDenominal: true,
            dedicatedObjectsArePathRequired: true,
            dedicatedObjectsConsumed: true,
            objectLeaksToCardinal: false,
            objectLeaksToAdverbial: false,
            objectLeaksToAffective: false,
            objectLeaksToDeverbal: false,
            voicePolicyFound: true,
            voiceUsedByEmbed: true,
            voiceUsedByAttitude: true,
            voiceUsedByCardinalVnc: true,
            voiceUsedByIncorporatedAdverb: true,
            voiceLeaksToAffective: false,
            voiceLeaksToDenominal: false,
            voiceLeaksToDeverbal: false,
        }
    );

    const sharedStemRelationOwner = shell.match(
        /data-construction-for="([^"]+)"[^>]*data-nominal-stem-relation-control="true"/u
    )?.[1] || "";
    suite.eq(
        "compound and cardinal keep one dedicated Stem relation while the ordinary generic control remains denied",
        {
            dedicatedCount: countLiteral(
                shell,
                'id="classical-construction-reduplication"'
            ),
            dedicatedOwners: sharedStemRelationOwner,
            genericCount: countLiteral(
                shell,
                'id="classical-rule-logic-nnc-stem-relation"'
            ),
            compoundRequestConsumesDedicated:
                requestBuilder.includes("reduplication,")
                && requestBuilder.includes('if (constructionKind === "compound-nnc")'),
            cardinalRequestConsumesDedicated:
                requestBuilder.includes("const reduplication =")
                && requestBuilder.includes("numeralOutputKind"),
        },
        {
            dedicatedCount: 1,
            dedicatedOwners: "compound-nnc,cardinal-numeral-nnc",
            genericCount: 1,
            compoundRequestConsumesDedicated: true,
            cardinalRequestConsumesDedicated: true,
        }
    );

    const affectiveRouteOption = shell.match(
        /<option value="affective-nnc"([^>]*)>([^<]*)<\/option>/u
    );
    suite.eq(
        "the affective cascade cannot reopen a nested denominal-VNC shortcut",
        {
            targetSelectorInShell: shell.includes(
                'id="classical-affective-target-kind"'
            ),
            denominalSelectorInShell: shell.includes(
                'id="classical-affective-denominal-operation"'
            ),
            denominalWrapperInShell: shell.includes(
                "data-affective-denominal-only"
            ),
            targetSelectorReadByRenderer: rendering.includes(
                '"classical-affective-target-kind"'
            ),
            denominalSelectorReadByRenderer: rendering.includes(
                '"classical-affective-denominal-operation"'
            ),
            fixedRequestKind: requestBuilder.includes(
                'affectiveOutputKind: "nnc"'
            ),
            resultUnitCanReopenAffectiveVnc:
                resultUnit.includes("classical-affective-target-kind")
                || resultUnit.includes("affectiveDenominal"),
            routeResultUnit:
                /data-classical-result-unit="([^"]+)"/u.exec(
                    affectiveRouteOption?.[1] || ""
                )?.[1] || "",
            routeLabel: String(affectiveRouteOption?.[2] || "").trim(),
        },
        {
            targetSelectorInShell: false,
            denominalSelectorInShell: false,
            denominalWrapperInShell: false,
            targetSelectorReadByRenderer: false,
            denominalSelectorReadByRenderer: false,
            fixedRequestKind: true,
            resultUnitCanReopenAffectiveVnc: false,
            routeResultUnit: "nnc",
            routeLabel: "NNC Source → affective formation → NNC Result",
        }
    );

    suite.eq(
        "attitude choices are filtered by owner evidence and only reveal real dependent choices",
        {
            reverentialNeedsOwnerContinuation:
                visibility.includes("reverentialSourceAvailable")
                && visibility.includes("ActiveClassicalVncResultSourceContinuation"),
            singletonFormationIsReadOnly:
                visibility.includes("formationChoiceVisible = licensedFormations.size > 1"),
            participantNeedsObjectValence:
                visibility.includes("objectParticipantAvailable")
                && visibility.includes('attitude === "honorific"'),
            reverentialRequestCarriesOwnerFrame:
                attitudeRequest.includes("attitudeSourceClosureFrame:"),
        },
        {
            reverentialNeedsOwnerContinuation: true,
            singletonFormationIsReadOnly: true,
            participantNeedsObjectValence: true,
            reverentialRequestCarriesOwnerFrame: true,
        }
    );

    suite.eq(
        "forced personal-name reranking is a derived readout rather than a second clickable choice",
        typeof ctx.syncClassicalPersonalNameSentenceControls === "function"
            && typeof ctx.getClassicalPersonalNameSentenceSelection === "function"
            ? (() => {
                const harness = makePersonalNameDocument();
                const runtimeDocument = ctx.document;
                const previousCreateElement = runtimeDocument.createElement;
                const previousGetElementById = runtimeDocument.getElementById;
                runtimeDocument.createElement =
                    harness.document.createElement;
                runtimeDocument.getElementById =
                    harness.document.getElementById;
                try {
                    const ordinary = ctx.syncClassicalPersonalNameSentenceControls(true);
                    const ordinaryState = {
                        reranking: ordinary?.reranking || "",
                        operation: ordinary?.operation || "",
                        choiceVisible: harness.sentenceWrapper.hidden === false,
                        choiceEnabled: harness.sentence.disabled === false,
                    };
                    harness.reranking.value = "normal-nnc-with-plural-rights";
                    const forced = ctx.syncClassicalPersonalNameSentenceControls(true);
                    const selection = ctx.getClassicalPersonalNameSentenceSelection();
                    return {
                        ordinary: ordinaryState,
                        forced: {
                            reranking: forced?.reranking || "",
                            operation: forced?.operation || "",
                            selectionOperation: selection?.operation || "",
                            requiresGodSource: forced?.requiresGodSource === true,
                            choiceHidden: harness.sentenceWrapper.hidden === true,
                            choiceAriaHidden:
                                harness.sentenceWrapper.getAttribute("aria-hidden"),
                            choiceDisabled: harness.sentence.disabled === true,
                            choiceAriaDisabled:
                                harness.sentence.getAttribute("aria-disabled"),
                            statusText: harness.status.textContent,
                            statusHasControls: harness.status.children.length > 0,
                        },
                    };
                } finally {
                    runtimeDocument.createElement = previousCreateElement;
                    runtimeDocument.getElementById = previousGetElementById;
                }
            })()
            : "rendering-runtime-not-loaded",
        {
            ordinary: {
                reranking: "personal-name",
                operation: "sentence-name-use",
                choiceVisible: true,
                choiceEnabled: true,
            },
            forced: {
                reranking: "normal-nnc-with-plural-rights",
                operation: "god-name-to-normal-nnc",
                selectionOperation: "god-name-to-normal-nnc",
                requiresGodSource: true,
                choiceHidden: true,
                choiceAriaHidden: "true",
                choiceDisabled: true,
                choiceAriaDisabled: "true",
                statusText: "Derived sentence operation: god name to normal nnc. Place-name embedding remains unavailable until a typed locative-matrix Source exists.",
                statusHasControls: false,
            },
        }
    );

    return suite;
}

module.exports = { run };
