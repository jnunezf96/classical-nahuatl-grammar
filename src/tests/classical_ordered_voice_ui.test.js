"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_ordered_voice_ui");
    const rendering = fs.readFileSync(
        path.join(__dirname, "../ui/rendering/rendering.mjs"),
        "utf8"
    );
    const request = {
        basalUnit: "vnc",
        stem: "yohua",
        verbClass: "A",
        valence: "intransitive",
        subject: "1sg",
        mood: "indicative",
        tense: "present",
        vncVoice: "impersonal",
        nonactiveOptionId: "inherent-impersonal",
        voiceLayer2Operation: "tla-impersonal",
        voiceLayer3Operation: "nonactive-lō",
    };
    const clean = ctx.buildClassicalRuleLogicSurfaceFrame(request);
    const poisoned = ctx.buildClassicalRuleLogicSurfaceFrame({
        ...request,
        hostileVoiceLayerTarget: "FORGED-TARGET",
        hostileVoiceLayers: [{ targetStem: "FORGED-LAYER" }],
        hostileFormulaArtifact: "FORGED-FORMULA",
        hostileSurfaceArtifact: "FORGED-SURFACE",
        hostileVoiceResultFrame: {
            formulaRealization: "FORGED-RESULT",
        },
        hostileVoiceStateCarrier: {
            selectedFormula: "FORGED-STATE",
        },
    });
    const ordered = clean.state?.vncOrderedVoiceApplicationFrame;
    const hostileOrdered =
        poisoned.state?.vncOrderedVoiceApplicationFrame;

    s.eq(
        "Result consumes the issued ordered Voice closure and the application firewall rejects hostile carriers",
        {
            status: clean.authorizationStatus,
            applicationStatus: ordered?.authorizationStatus,
            applicationCanonical:
                ctx.isClassicalNahuatlOrderedVoiceVncApplicationFrame(
                    ordered
                ),
            selectedIdentity:
                clean.machineryFrame === ordered?.selectedMachineryFrame,
            finiteIdentity:
                clean.finiteSurfaceFrame === ordered?.finiteSurfaceFrame,
            formula: clean.selectedFormula,
            surface: clean.finiteSurfaceFrame?.wordRealization,
            sentenceFormula: clean.sentenceFormulaDisplay,
            sentenceSurface: clean.sentenceSurfaceDisplay,
            target: ordered?.voiceLayerChainFrame?.targetStem,
            rendererConstructorAbsent:
                !rendering.includes(
                    "requestClassicalVerbstemClassFrame("
                )
                && !rendering.includes(
                    'kind: "classical-nahuatl-ordered-voice-layer-vnc-machinery-frame"'
                ),
            promptLabelParticipatesInDisplayCache:
                rendering.includes('`prompt=${keepLabel}`'),
            hostileStatus: poisoned.authorizationStatus,
            hostileReason: poisoned.blockReason,
            hostileRejected:
                hostileOrdered?.rejectedAuthorityFields || [],
            hostileStringsAbsent:
                !JSON.stringify(poisoned).includes("FORGED-"),
        },
        {
            status: "authorized",
            applicationStatus: "authorized",
            applicationCanonical: true,
            selectedIdentity: true,
            finiteIdentity: true,
            formula: "#0-0(tla-yohua-lo)0+0-0#",
            surface: "tlayohualo",
            sentenceFormula: "#0-0(tla-yohua-lo)0+0-0#.",
            sentenceSurface: "Tlayohualo.",
            target: "tla-yohua-lō",
            rendererConstructorAbsent: true,
            promptLabelParticipatesInDisplayCache: true,
            hostileStatus: "blocked",
            hostileReason:
                "classical-grammar-application-request-invalid:"
                + "forbidden-authority:formulaArtifact",
            hostileRejected: [],
            hostileStringsAbsent: true,
        }
    );

    return s;
}

module.exports = { run };
