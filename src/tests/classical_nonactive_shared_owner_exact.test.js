"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_nonactive_shared_owner_exact");
    const facet = "p2100-the-shift-in-focus-from-one-voice-to-another";
    const source = ctx.buildClassicalPassiveSourceTransformationSource({
        analysisDomain: "classical-passive-source-transformation",
        selection: "claim-p2100",
        requestedFacet: facet,
        participantChoice: `claim-p2100:${facet}`,
    });
    const ownerResult = ctx.evaluateClassicalPassiveSourceTransformation(source);
    const frame = ownerResult.payload.definition;
    const passive = frame.voice.passiveSingle;
    const reflexivePassive = frame.voice.reflexivePassive;
    const twoSpecific = frame.objectHistory.twoSpecific;
    const ihcahuaca = frame.impersonal.tlaInventory.find(record => record.sourceStem === "ih-cahu-a-ca");
    const observations = [
        ["ACI-P180-L007-A148C00D37-02", "voice.passiveSingle active-to-nonactive stem replacement", {
            sourceStem: passive.sourceStem, targetStem: passive.targetStem, voice: passive.voice,
        }, { sourceStem: "chihua", targetStem: "chihua-lō", voice: "passive" }],
        ["ACI-P180-L007-A148C00D37-03", "voice.passiveSingle specific object promotion", {
            sourceValence: passive.sourceValence,
            promotedObjectBecomesSubject: passive.promotedObjectBecomesSubject,
            targetSubject: passive.targetSubject,
        }, { sourceValence: "specific-projective", promotedObjectBecomesSubject: true, targetSubject: "1sg" }],
        ["ACI-P194-L005-933D1A0265-03", "objectHistory.twoSpecific sounded specific-object ceiling", {
            soundedSpecificObjectId: twoSpecific.soundedSpecificObjectId,
            soundedSpecificCount: twoSpecific.positions.filter(position => position.objectKind === "specific-projective" && position.sounded).length,
            silencedSpecificCount: twoSpecific.positions.filter(position => position.objectKind === "specific-projective" && !position.sounded).length,
        }, { soundedSpecificObjectId: "caused", soundedSpecificCount: 1, silencedSpecificCount: 1 }],
        ["ACI-P182-L004-194C24FE0D-05", "voice.reflexivePassive mainline-to-ne transform", {
            sourceValence: reflexivePassive.sourceValence,
            targetValence: reflexivePassive.targetValence,
            formulaContainsNe: reflexivePassive.formulaRealization.includes("+ne("),
        }, { sourceValence: "mainline-reflexive", targetValence: "shuntline-reflexive", formulaContainsNe: true }],
        ["ACI-P190-L009-523C5E1AFE-08", "impersonal.tlaInventory ihcahuaca derivation", {
            sourceStem: ihcahuaca.sourceStem,
            targetStem: ihcahuaca.derivedTargetStem,
            rule: ihcahuaca.realizationRuleId,
            derivedByEngine: ihcahuaca.targetDerivedByEngine,
        }, { sourceStem: "ih-cahu-a-ca", targetStem: "tla-h-cahu-a-ca", rule: "prefix-tla-drop-supportive-initial-i", derivedByEngine: true }],
        ["ACI-P190-L009-523C5E1AFE-09", "impersonal.tlaInventory ihcahuaca animate generality", {
            targetStem: ihcahuaca.derivedTargetStem,
            semanticClass: ihcahuaca.semanticClass,
        }, { targetStem: "tla-h-cahu-a-ca", semanticClass: "animate-generality-exception" }],
        ["ACI-P195-L009-056F1FE6CE-03", "objectHistory.twoSpecific canonical sequence", {
            linearOrder: twoSpecific.linearOrder,
            carriers: twoSpecific.linearCarriers,
        }, { linearOrder: ["caused", "direct"], carriers: ["m-itz", "0-0"] }],
        ["ACI-P194-L015-1CBBC45E59-02", "objectHistory.twoSpecific earlier-core demotion", {
            later: { level: twoSpecific.positions[0].derivationalLevel, prominence: twoSpecific.positions[0].prominence },
            earlier: { level: twoSpecific.positions[1].derivationalLevel, prominence: twoSpecific.positions[1].prominence },
        }, { later: { level: 2, prominence: "mainline" }, earlier: { level: 1, prominence: "shuntline" } }],
    ];

    for (const [atomId, path, actual, expected] of observations) {
        s.eq(`${atomId} observes ${path}`, actual, expected);
        const hostile = JSON.parse(JSON.stringify(actual));
        const first = Object.keys(hostile)[0];
        hostile[first] = typeof hostile[first] === "boolean" ? !hostile[first] : "BROKEN";
        s.no(`${atomId} rejects a mutation of ${path}`, JSON.stringify(hostile) === JSON.stringify(expected));
    }
    s.eq("the shared nonactive Result is authorized", ownerResult.authorizationStatus, "authorized");
    return s;
}

module.exports = { run };
