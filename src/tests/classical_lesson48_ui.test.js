"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");
const RENDERING = fs.readFileSync(path.join(ROOT, "src", "ui", "rendering", "rendering.mjs"), "utf8");
const SHELL = fs.readFileSync(path.join(ROOT, "src", "ui", "shell", "classical_shell.mjs"), "utf8");

function run(ctx) {
    const s = createSuite("classical_lesson48_ui");
    const html = [
        typeof ctx.ClassicalSourcePanel === "function" ? ctx.ClassicalSourcePanel() : "",
        typeof ctx.ClassicalAuthorityPanel === "function" ? ctx.ClassicalAuthorityPanel() : "",
    ].join("");
    s.eq("Place and gentilic UI exposes semantic controls without documentary authority metadata", {
        operationControl: html.includes('id="classical-construction-operation"'),
        resultKindControl: html.includes('id="classical-place-gentilic-result-kind"'),
        formationControl: html.includes('id="classical-place-gentilic-formation"'),
        htmlTaggedCount: Array.from(html.matchAll(/data-classical-authority-option/gu)).length,
        exactWitnessCount: Array.from(html.matchAll(/data-exact-witness/gu)).length,
        evidenceOnlyOptionAbsent: !html.includes('value="tlillan-calqui"'),
        oldLessonControlAbsent: !html.includes("classical-lessons48-"),
    }, {
        operationControl: true,
        resultKindControl: true,
        formationControl: true,
        htmlTaggedCount: 0,
        exactWitnessCount: 0,
        evidenceOnlyOptionAbsent: true,
        oldLessonControlAbsent: true,
    });

    s.eq("Lesson 48 shell exposes every productive place and gentilic formation", {
        place: ctx.PLACE_GENTILIC_NNC_PLACE_FORMATIONS
            .filter(value => html.includes(`value="${value}"`)).length,
        placeExpected: ctx.PLACE_GENTILIC_NNC_PLACE_FORMATIONS.length,
        gentilic: ctx.PLACE_GENTILIC_NNC_GENTILIC_FORMATIONS
            .filter(value => html.includes(`value="${value}"`)).length,
        gentilicExpected: ctx.PLACE_GENTILIC_NNC_GENTILIC_FORMATIONS.length,
        kindCount: [
            "place-name",
            "gentilic",
            "gentilic-collective",
            "profession-place-association",
            "profession-pertinency",
            "gentilic-adjectival-use",
        ].filter(value => html.includes(`value="${value}"`)).length,
    }, {
        place: ctx.PLACE_GENTILIC_NNC_PLACE_FORMATIONS.length,
        placeExpected: ctx.PLACE_GENTILIC_NNC_PLACE_FORMATIONS.length,
        gentilic: ctx.PLACE_GENTILIC_NNC_GENTILIC_FORMATIONS.length,
        gentilicExpected: ctx.PLACE_GENTILIC_NNC_GENTILIC_FORMATIONS.length,
        kindCount: 6,
    });

    const request = {
        constructionKind: "gentilic",
        formation: "ca-pan-eca",
        source: { placeStem: "Izta-pan" },
        subject: "1sg",
        state: "absolutive",
        nounClass: "tl",
        pluralConnector: "0-h",
    };
    const direct = ctx.evaluatePlaceGentilicNnc(request);
    const application = ctx.requestClassicalPlaceGentilicResult(request);
    const paradigmRequest = {
        constructionKind: "place-name",
        formation: "co",
        source: { embedStem: "Tlach" },
        usage: "adverbial",
    };
    const paradigmScalar =
        ctx.requestClassicalPlaceGentilicResult(paradigmRequest);
    const plan =
        ctx.prepareClassicalPlaceGentilicParadigmPlan(paradigmRequest);
    const projected =
        ctx.projectClassicalPlaceGentilicParadigmCoordinates(plan);
    s.eq("UI application consumes the canonical finite frame without reconstructing grammar", {
        directSurface: direct.wordSurface,
        applicationSurface: application.wordSurface,
        formula: application.formulaRealization,
        derivedStem: application.formationFrame?.derivedStem
            || application.formationFrame?.stem,
        operation: application.formationFrame?.boundaryRule,
        formulaAuthority: application.formulaStringAuthority,
    }, {
        directSurface: "nIztapanēcatl",
        applicationSurface: "nIztapanēcatl",
        formula: "#n-0(Izta-pan-ē-ca)tl-0#",
        derivedStem: "Izta-pan-ē-ca",
        operation: "retain-pan-add-ē-before-ca",
        formulaAuthority: false,
    });
    s.eq(
        "Lesson 48 prepared coordinates are pointwise identical to the scalar application result",
        {
            planStatus: plan.authorizationStatus,
            coordinateCount: projected.length,
            coordinateStatus: projected[0]?.authorizationStatus,
            scalarParity: projected[0]?.scalarParity,
            formula: projected[0]?.formulaRealization,
            word: projected[0]?.wordSurface,
        },
        {
            planStatus: "authorized",
            coordinateCount: 1,
            coordinateStatus: "authorized",
            scalarParity: true,
            formula: paradigmScalar.formulaRealization,
            word: paradigmScalar.wordSurface,
        }
    );
    const copiedPlanReceipt =
        ctx.executeClassicalGrammarApplicationRequest({
            operationId: "nnc:place-gentilic",
            outputKind: "coordinate-projection",
            args: [Object.freeze({
                kind: plan.kind,
                version: plan.version,
                authorizationStatus: plan.authorizationStatus,
            })],
        });
    s.eq(
        "A copied Lesson 48 plan cannot authorize coordinate projection",
        [
            copiedPlanReceipt.authorizationStatus,
            copiedPlanReceipt.blockReason,
            copiedPlanReceipt.canonicalResult,
        ],
        [
            "blocked",
            "classical-grammar-application-request-invalid:issued-authorized-prepared-plan-required",
            null,
        ]
    );

    s.ok("Lesson 48 conditional controls surface only applicable genuine decisions",
        RENDERING.includes('placeGentilicResultKind === "gentilic" && placeGentilicFormation === "ca-co-c-silent"')
        && RENDERING.includes('placeGentilicResultKind === "place-name" && placeGentilicFormation === "co-place-affective"')
        && RENDERING.includes('stateKinds.includes(placeGentilicResultKind) && state === "possessive"')
        && RENDERING.includes('option.disabled = !visible')
        && !RENDERING.includes("evidenceOnly"));

    s.ok("Renderer calls the application boundary and the shell imports the shared UI contract",
        RENDERING.includes("requestClassicalPlaceGentilicResult(request)")
        && RENDERING.includes("prepareClassicalPlaceGentilicParadigmPlan(request)")
        && RENDERING.includes("projectClassicalPlaceGentilicParadigmCoordinates(plan)")
        && !RENDERING.includes("evaluatePlaceGentilicNnc(request)")
        && SHELL.includes("PLACE_GENTILIC_NNC_UI_CONTROL_CONTRACTS")
        && SHELL.includes('renderPlaceGentilicNncOptions("classical-place-gentilic-formation")'));

    return s;
}

module.exports = { run };
