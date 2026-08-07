"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function issueNnc(ctx, stem, subject = "3sg") {
    const source = ctx.buildClassicalNahuatlAbsolutiveNncFrame(stem, {
        subject,
        nounClass: "zero",
        animacy: "animate",
        pluralConnector: subject.endsWith("pl") ? "0-h" : "",
    });
    return ctx.executeClassicalGrammarApplicationRequest({
        operationId: "nnc:sentence-surface",
        outputKind: "scalar",
        args: [
            source.nncSlotFrame,
            { sentenceType: "assertion", polarity: "positive" },
        ],
    });
}

function issueVnc(ctx) {
    return ctx.executeClassicalGrammarApplicationRequest({
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
        }],
    });
}

function createHarness(ctx) {
    let requestCount = 0;
    let lastRequest = null;
    const target = Object.create(ctx);
    Object.defineProperty(
        target,
        "requestClassicalAdjectivalModificationResult",
        {
            configurable: true,
            enumerable: true,
            value(request) {
                requestCount += 1;
                lastRequest = request;
                return ctx.requestClassicalAdjectivalModificationResult(
                    request
                );
            },
        }
    );
    const controllerApi =
        ctx.createClassicalClauseRelationControllerGlobals(target);
    Object.defineProperties(
        target,
        Object.getOwnPropertyDescriptors(controllerApi)
    );
    return {
        controller: target.createClassicalClauseRelationController(),
        requestCount: () => requestCount,
        lastRequest: () => lastRequest,
    };
}

function capture(controller, role, applicationResult) {
    return controller.captureCurrentResult(
        role,
        applicationResult.canonicalResult
    );
}

function ordinaryChoices(overrides = {}) {
    return {
        relation: "adjectival-modification",
        topology: "ordinary",
        order: "head-modifier",
        modifierAdjunctor: "none",
        ...overrides,
    };
}

function run(ctx) {
    const s = createSuite(
        "classical_adjectival_modification_application"
    );

    s.eq(
        "the existing clause workflow exposes only genuine ordinary-modification choices and delegates once",
        (() => {
            const harness = createHarness(ctx);
            const head = issueNnc(ctx, "cueitl");
            const modifier = issueNnc(ctx, "canahuac");
            const captures = [
                capture(harness.controller, "principal", head),
                capture(harness.controller, "adjoined", modifier),
            ];
            const choices = ordinaryChoices();
            const contract =
                harness.controller.buildDecisionContract(choices);
            const result = harness.controller.compose(choices);
            const request = harness.lastRequest();
            return {
                captures: captures.map(item => item.authorizationStatus),
                contract: contract.authorizationStatus,
                selectable: contract.userSelectableFieldIds,
                derived: {
                    type: contract.derived.modifierClauseType,
                    scope: contract.derived.scope,
                    link: contract.derived.linkRole,
                    ambiguity: contract.derived.ambiguityType,
                    recursion: contract.derived.recursion,
                },
                requestCount: harness.requestCount(),
                requestKeys: Object.keys(request || {}).sort(),
                status: result.authorizationStatus,
                ownerIssued:
                    ctx.isClassicalNahuatlResultFrame(
                        result.canonicalResult
                    ),
                formula: result.presentation.formula,
                written: result.presentation.surface,
            };
        })(),
        {
            captures: ["authorized", "authorized"],
            contract: "authorized",
            selectable: [
                "relation",
                "topology",
                "order",
                "modifier-adjunctor",
            ],
            derived: {
                type: "adjectival-nnc",
                scope: "complete-sentence",
                link: "shared-subject",
                ambiguity: "structural-apposition",
                recursion: "zero",
            },
            requestCount: 1,
            requestKeys: [
                "adjunctor",
                "head",
                "modifier",
                "operationKind",
                "order",
                "topology",
            ],
            status: "authorized",
            ownerIssued: true,
            formula:
                "#0-0(cueitl)0-0# #0-0(canahuac)0-0#",
            written: "Cueitl canahuac.",
        }
    );

    s.eq(
        "changing order and marking remains in the same captured grammatical workflow",
        (() => {
            const harness = createHarness(ctx);
            capture(
                harness.controller,
                "principal",
                issueNnc(ctx, "cueitl")
            );
            capture(
                harness.controller,
                "adjoined",
                issueNnc(ctx, "canahuac")
            );
            const first = harness.controller.compose(ordinaryChoices());
            const changed = harness.controller.compose(ordinaryChoices({
                order: "modifier-head-preposed",
                modifierAdjunctor: "in",
            }));
            return {
                count: harness.requestCount(),
                first: [
                    first.authorizationStatus,
                    first.presentation.formula,
                    first.presentation.surface,
                ],
                changed: [
                    changed.authorizationStatus,
                    changed.presentation.formula,
                    changed.presentation.surface,
                    changed.decisionContract.derived.scope,
                ],
                roles:
                    Object.entries(
                        harness.controller.getState().captures
                    )
                        .filter(([, value]) => value.captured)
                        .map(([role]) => role)
                        .sort(),
                relation:
                    changed.decisionContract.relation,
            };
        })(),
        {
            count: 2,
            first: [
                "authorized",
                "#0-0(cueitl)0-0# #0-0(canahuac)0-0#",
                "Cueitl canahuac.",
            ],
            changed: [
                "authorized",
                "in #0-0(canahuac)0-0# #0-0(cueitl)0-0#",
                "in canahuac cueitl",
                "adjoined-unit",
            ],
            roles: ["adjoined", "principal"],
            relation: "adjectival-modification",
        }
    );

    s.eq(
        "cooperating and discontinuous arrangements reuse the same controller and scalar owner",
        (() => {
            const harness = createHarness(ctx);
            capture(
                harness.controller,
                "principal",
                issueNnc(ctx, "cueitl")
            );
            capture(
                harness.controller,
                "adjoined",
                issueNnc(ctx, "canahuac")
            );
            capture(
                harness.controller,
                "dependent",
                issueNnc(ctx, "tlazohtli")
            );
            const cooperatingChoices = {
                relation: "adjectival-modification",
                topology: "cooperating-preposed-nonpreposed",
                modifierAdjunctor: "both-in",
            };
            const cooperatingContract =
                harness.controller.buildDecisionContract(
                    cooperatingChoices
                );
            const cooperating =
                harness.controller.compose(cooperatingChoices);
            const discontinuousChoices = {
                relation: "adjectival-modification",
                topology: "discontinuous",
                order: "discontinuous-modifier-first",
                modifierAdjunctor: "none",
            };
            const discontinuousContract =
                harness.controller.buildDecisionContract(
                    discontinuousChoices
                );
            const discontinuous =
                harness.controller.compose(discontinuousChoices);
            return {
                cooperating: {
                    selectable:
                        cooperatingContract.userSelectableFieldIds,
                    adjunctors:
                        cooperatingContract.decisions.find(
                            (decision) =>
                                decision.id === "modifier-adjunctor"
                        ).values,
                    status: cooperating.authorizationStatus,
                    formula: cooperating.presentation.formula,
                    written: cooperating.presentation.surface,
                },
                discontinuous: {
                    selectable:
                        discontinuousContract.userSelectableFieldIds,
                    status: discontinuous.authorizationStatus,
                    formula: discontinuous.presentation.formula,
                    written: discontinuous.presentation.surface,
                },
                count: harness.requestCount(),
            };
        })(),
        {
            cooperating: {
                selectable: [
                    "relation",
                    "topology",
                    "modifier-adjunctor",
                ],
                adjunctors: [
                    "none",
                    "preposed-in",
                    "nonpreposed-in",
                    "both-in",
                ],
                status: "authorized",
                formula:
                    "in #0-0(canahuac)0-0# #0-0(cueitl)0-0#"
                    + " in #0-0(tlazohtli)0-0#",
                written: "in canahuac cueitl in tlazohtli",
            },
            discontinuous: {
                selectable: [
                    "relation",
                    "topology",
                    "order",
                    "modifier-adjunctor",
                ],
                status: "authorized",
                formula:
                    "#0-0(canahuac)0-0# #0-0(tlazohtli)0-0#"
                    + " #0-0(cueitl)0-0#",
                written: "Canahuac tlazohtli cueitl.",
            },
            count: 2,
        }
    );

    s.eq(
        "a cooperating transitive modifier receives its own contact choice in the same controller request",
        (() => {
            const harness = createHarness(ctx);
            capture(
                harness.controller,
                "principal",
                issueNnc(ctx, "cueitl")
            );
            capture(
                harness.controller,
                "adjoined",
                issueNnc(ctx, "canahuac")
            );
            capture(
                harness.controller,
                "dependent",
                issueVnc(ctx)
            );
            const choices = {
                relation: "adjectival-modification",
                topology: "cooperating-preposed-nonpreposed",
                modifierAdjunctor: "nonpreposed-in",
                dependentLinkKind: "vnc-object",
            };
            const contract =
                harness.controller.buildDecisionContract(choices);
            const result = harness.controller.compose(choices);
            return {
                selectable: contract.userSelectableFieldIds,
                status: result.authorizationStatus,
                request: {
                    adjunctor:
                        harness.lastRequest().adjunctor,
                    additionalLinkRoles:
                        harness.lastRequest().additionalLinkRoles,
                },
                contacts:
                    result.canonicalResult.modifierLinkRoles,
                formula: result.presentation.formula,
                written: result.presentation.surface,
            };
        })(),
        {
            selectable: [
                "relation",
                "topology",
                "modifier-adjunctor",
                "dependent-link-kind",
            ],
            status: "authorized",
            request: {
                adjunctor: "nonpreposed-in",
                additionalLinkRoles: ["vnc-object"],
            },
            contacts: ["shared-subject", "vnc-object"],
            formula:
                "#0-0(canahuac)0-0# #0-0(cueitl)0-0#"
                + " in #ni-0+c-0(chihua)0+0-0#",
            written: "Canahuac cueitl in nicchihua.",
        }
    );

    s.eq(
        "a transitive VNC modifier adds exactly the subject-or-object contact choice",
        (() => {
            const harness = createHarness(ctx);
            capture(
                harness.controller,
                "principal",
                issueNnc(ctx, "cueitl")
            );
            capture(
                harness.controller,
                "adjoined",
                issueVnc(ctx)
            );
            const choices = ordinaryChoices({
                linkKind: "vnc-object",
            });
            const contract =
                harness.controller.buildDecisionContract(choices);
            const result = harness.controller.compose(choices);
            return {
                selectable: contract.userSelectableFieldIds,
                type: contract.derived.modifierClauseType,
                link: contract.derived.linkRole,
                status: result.authorizationStatus,
                requestLink: harness.lastRequest()?.linkRole || "",
                requestHasDerived:
                    ["modifierClauseType", "scope", "ambiguityType"]
                        .some(key => Object.hasOwn(
                            harness.lastRequest() || {},
                            key
                        )),
                ownerIssued:
                    ctx.isClassicalNahuatlResultFrame(
                        result.canonicalResult
                    ),
            };
        })(),
        {
            selectable: [
                "relation",
                "topology",
                "order",
                "modifier-adjunctor",
                "link-kind",
            ],
            type: "transitive-vnc",
            link: "vnc-object",
            status: "authorized",
            requestLink: "vnc-object",
            requestHasDerived: false,
            ownerIssued: true,
        }
    );

    s.eq(
        "retired special topologies and derived-state inputs cannot reach the canonical owner",
        (() => {
            const harness = createHarness(ctx);
            capture(
                harness.controller,
                "principal",
                issueNnc(ctx, "cueitl")
            );
            capture(
                harness.controller,
                "adjoined",
                issueNnc(ctx, "canahuac")
            );
            const retired = harness.controller.compose({
                relation: "adjectival-modification",
                topology: "male-bonding",
                order: "head-modifier",
                modifierAdjunctor: "none",
            });
            const derivedInput = harness.controller.compose({
                ...ordinaryChoices(),
                ambiguityType: "none",
            });
            return {
                retired: [
                    retired.authorizationStatus,
                    retired.blockReason,
                ],
                derivedInput: [
                    derivedInput.authorizationStatus,
                    derivedInput.blockReason,
                ],
                requestCount: harness.requestCount(),
            };
        })(),
        {
            retired: [
                "blocked",
                "classical-adjectival-modification-topology-not-recognized",
            ],
            derivedInput: [
                "blocked",
                "classical-clause-relation-selection-not-recognized:ambiguityType",
            ],
            requestCount: 0,
        }
    );

    s.eq(
        "production sources contain no classifier builder or caller-derived modification request lane",
        (() => {
            const root = path.resolve(__dirname, "..");
            const core = fs.readFileSync(
                path.join(
                    root,
                    "core",
                    "classical",
                    "adjectival_modification.mjs"
                ),
                "utf8"
            );
            const controller = fs.readFileSync(
                path.join(
                    root,
                    "application",
                    "classical",
                    "clause_relation_controller.mjs"
                ),
                "utf8"
            );
            const retiredCoreNames = [
                "buildAdjectivalSourceClassification",
                "evaluateAdjectivalFunction",
                "LESSON40_FORMATION_FAMILIES",
                "LESSON41_FORMATION_FAMILIES",
            ];
            const requestBlock = controller.slice(
                controller.indexOf(
                    "const request = {",
                    controller.indexOf(
                        "contract.relation === ADJECTIVAL_MODIFICATION_RELATION"
                    )
                ),
                controller.indexOf(
                    "const canonicalResult =",
                    controller.indexOf(
                        "contract.relation === ADJECTIVAL_MODIFICATION_RELATION"
                    )
                )
            );
            return {
                retiredCoreNames:
                    retiredCoreNames.filter(name => core.includes(name)),
                callerDerivedFields:
                    ["modifierClauseType:", "scope:", "ambiguityType:"]
                        .filter(name => requestBlock.includes(name)),
            };
        })(),
        {
            retiredCoreNames: [],
            callerDerivedFields: [],
        }
    );

    return s;
}

module.exports = { run };
