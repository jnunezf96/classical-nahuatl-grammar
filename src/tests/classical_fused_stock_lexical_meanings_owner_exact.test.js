"use strict";

const { createSuite } = require("./runner");
const OWNER = "classical-fused-stock-vowel-frequentative";
const PREFIX = "ClassicalFusedStockVowelFrequentative";
const ATOMS = [
    ["claim-p2702", "aci-p247-l037-76a99f08c2-popotza-causative-reading", "popotza", "p2702-tla-po-po-tz-a-to-makes-th-emit", "cause-something-to-emit-smoke"],
    ["claim-p2703", "aci-p247-l039-6dd10064fa-tototza-participant-alternation", "tototza", "p2703-te-tla-to-to-tz-a-to-spur-s", "spur-someone-or-something-on"],
    ["claim-p2704", "aci-p248-l003-3c6186d887-pipitza-causative-reading", "pipitza", "p2704-tla-pi-pi-tz-a-to-cause-s-th", "cause-something-to-dribble"],
];

function run(ctx = {}) {
    const s = createSuite("classical_fused_stock_lexical_meanings_owner_exact");
    const receipt = (selection, facet) => {
        const source = ctx[`build${PREFIX}Source`]({
            analysisDomain: OWNER, selection, requestedFacet: facet,
            participantChoice: `${selection}:${facet}`,
        });
        const result = ctx[`evaluate${PREFIX}`](source);
        return { source, result, evidence: ctx[`get${PREFIX}ExecutionEvidence`](result) };
    };
    const receipts = ATOMS.map(([selection, facet]) => receipt(selection, facet));
    ATOMS.forEach(([selection, facet, leaf, legacy, meaning], index) => {
        const { result, evidence } = receipts[index];
        const path = `constraints.fusedStockVowelFrequentativeSystem.lexicalCausatives.${leaf}`;
        s.eq(`${facet} observes its own canonical lexical relation`, [
            result.authorizationStatus, result.payload.effectiveCanonicalPath,
            result.payload.sourceCanonicalPath, result.payload.proofObservationKind,
            ctx[`is${PREFIX}Result`](result), ctx[`is${PREFIX}ExecutionEvidence`](evidence, result),
            result.payload.facetValue?.availableReadings?.map(reading => reading.meaning),
            result.payload.facetValue?.observations?.every(item => item.exact),
        ], ["authorized", path, path, "direct-canonical-result-observation", true, true, [meaning], true]);
        const old = receipt(selection, legacy).result;
        s.eq(`${selection} preserves the permanent alias without its old proxy`,
            [old.authorizationStatus, old.payload.effectiveCanonicalPath, old.payload.facetValue],
            ["authorized", path, result.payload.facetValue]);
    });
    s.eq("the spur-on atom preserves both actual cited participants", receipts[1].result.payload.facetValue?.observations.map(item =>
        item.participantSlots.map(slot => [slot.carrier, slot.objectKind])),
    [[["tē", "nonspecific-human"]], [["tla", "nonspecific-nonhuman"]]]);
    s.eq("both spur-on participants observe the same canonical lexical identity and reading",
        receipts[1].result.payload.facetValue?.observations.map(item => [
            item.lexicalMeaningRelation.lexicalIdentityFrame.targetIdentity,
            item.lexicalMeaningRelation.availableReadings.map(reading => reading.meaning),
        ]), Array.from({ length: 2 }, () => ["totōtza", [ATOMS[1][4]]]));
    s.eq("smoke and dribble independently preserve their actual tla objects", [receipts[0], receipts[2]].map(item =>
        item.result.payload.facetValue?.observations.map(observation => observation.participantSlots.map(slot => [slot.carrier, slot.objectKind]))),
    [[[["tla", "nonspecific-nonhuman"]]], [[["tla", "nonspecific-nonhuman"]]]]);

    const evaluate = (sourceStem, extra = {}) => ctx.evaluateClassicalNahuatlLateVncDerivation({
        sourceStem, verbClass: "B", sourceValence: "specific-projective",
        objectKind: "specific-projective", objectPerson: "3sg",
        subject: "3sg", mood: "indicative", tense: "present", derivationType: "direct", voice: "active",
        lateOperation: "frequentative", lateVariant: "destockal-lexicalized", ...extra,
    });
    const meanings = [ATOMS[0][4], ATOMS[1][4], ATOMS[2][4]];
    const completed = ["po-pō-tz-a", "to-tō-tz-a", "pi-pī-tza"].map(stem => evaluate(stem));
    completed.forEach((frame, index) => {
        const op = frame.operationFrame;
        const relation = op?.operationFacts.lexicalFrequentativeMeaningFrame;
        const binding = relation?.typedTargetBinding;
        s.eq(`${op?.targetStem}: meaning binds the actual final predicate and participant slots`, [
            frame.authorizationStatus, ctx.isClassicalNahuatlClosureFrame(frame), ctx.isClassicalNahuatlOperationFrame(op),
            relation?.availableReadings.map(reading => reading.meaning),
            binding?.targetTypedVncSlotFrame === frame.finalTypedVncSlotFrame,
            binding?.predicateSlot === op.targetTypedVncSlotFrame.slots.predicate,
            binding?.subjectSlot === op.targetTypedVncSlotFrame.slots.subject,
            binding?.objectSlots.length, binding?.objectSlots.every(slot => op.targetTypedVncSlotFrame.slots.prePredicate.includes(slot)),
            binding?.objectBindings.every((item, objectIndex) => item.slot === binding.objectSlots[objectIndex]
                && item.objectRequest === binding.objectRequests[objectIndex]),
            relation?.meaningAssertionStatus, relation?.lexicalIdentityMatchDoesNotForceReading,
            relation?.sourceAdmissionAuthority, relation?.formulaStringAuthority, relation?.surfaceStringAuthority,
            frame.finiteSurfaceFrame.formulaDerivedFromWrittenProjection, frame.finiteSurfaceFrame.writtenDerivedFromFormulaProjection,
        ], ["authorized", true, true, [meanings[index]], true, true, true, 1, true, true,
            "available-not-asserted", true, false, false, false, false, false]);
    });
    for (const [sourceStem, targetStem, meaning] of [
        ["po-ō-n-a", "po-pō-tz-a", meanings[0]],
        ["to-ō-n-a", "to-tō-tz-a", meanings[1]],
        ["pi-ī-n-a", "pi-pī-tz-a", meanings[2]],
    ]) {
        const frame = evaluate(sourceStem, { lateVariant: "destockal-causative" });
        const relation = frame.operationFrame?.operationFacts.lexicalFrequentativeMeaningFrame;
        s.eq(`${sourceStem}: productive formation exposes an available, not imposed, lexical reading`, [
            frame.authorizationStatus, frame.operationFrame?.targetStem,
            relation?.availableReadings.map(reading => reading.meaning),
            relation?.routeEvidence.generatedFromFusedStock, relation?.meaningAssertionStatus,
        ], ["authorized", targetStem, [meaning], true, "available-not-asserted"]);
    }
    s.eq("editorial segmentation does not change corrected long-i lexical identity", ["pi-pī-tza", "pi-pī-tz-a", "pipītza"].map(stem => {
        const frame = evaluate(stem);
        return [frame.authorizationStatus, frame.operationFrame?.operationFacts.lexicalFrequentativeMeaningFrame?.availableReadings[0]?.meaning,
            frame.surfaceRealization];
    }), Array.from({ length: 3 }, () => ["authorized", meanings[2], "quipipītza"]));
    s.eq("unknown and short-stock sources remain open without borrowing known meanings", ["xa-xā-tz-a", "pi-pi-tza", "po-po-tz-a"].map(stem => {
        const frame = evaluate(stem);
        return [frame.authorizationStatus, Boolean(frame.operationFrame?.operationFacts.lexicalFrequentativeMeaningFrame)];
    }), Array.from({ length: 3 }, () => ["authorized", false]));
    s.eq("an unlisted generated source remains productive with no invented lexical reading", (() => {
        const frame = evaluate("xa-ā-n-a", { lateVariant: "destockal-causative" });
        return [frame.authorizationStatus, frame.operationFrame?.targetStem, Boolean(frame.operationFrame?.operationFacts.lexicalFrequentativeMeaningFrame)];
    })(), ["authorized", "xa-xā-tz-a", false]);
    s.eq("lexical witnesses do not make cited human/nonhuman objects exhaustive", [
        evaluate("po-pō-tz-a", { sourceValence: "projective-human", objectKind: "nonspecific-human", objectPerson: "" }),
        completed[1], completed[2],
    ].map(frame => [frame.authorizationStatus, Boolean(frame.operationFrame?.operationFacts.lexicalFrequentativeMeaningFrame)]),
    Array.from({ length: 3 }, () => ["authorized", true]));
    s.eq("selected applicative force does not silently assert a causative lexical reading", (() => {
        const frame = evaluate("to-tō-tz-a", { lateVariant: "destockal-applicative-force" });
        return [frame.authorizationStatus, frame.operationFrame?.operationFacts.semanticForce,
            Boolean(frame.operationFrame?.operationFacts.lexicalFrequentativeMeaningFrame)];
    })(), ["authorized", "applicative", false]);
    s.eq("preterit conditioning preserves available meaning through the signed target application", [
        evaluate("pi-pī-tza", { tense: "preterit" }),
        evaluate("pi-ī-n-a", { lateVariant: "destockal-causative", tense: "preterit" }),
    ].map(frame => [frame.authorizationStatus, frame.surfaceRealization,
        frame.operationFrame?.operationFacts.lexicalFrequentativeMeaningFrame?.availableReadings[0]?.meaning,
        frame.operationFrame?.operationFacts.lexicalFrequentativeMeaningFrame?.typedTargetBinding.targetTypedVncSlotFrame === frame.finalTypedVncSlotFrame]),
    Array.from({ length: 2 }, () => ["authorized", "quipipītz", meanings[2], true]));
    const legitimate = completed[2];
    s.eq("each Result cue presents only its own atom and available, not forced, reading", completed.map((frame, index) => {
        const cue = ctx.getClassicalFormulaDerivedAnnotations(frame.formulaRealization,
            frame.finalTypedVncSlotFrame, frame)
            .find(item => item.role === "lesson27-fused-frequentative-lexical-reading");
        return [cue?.atomIds, cue?.label.includes(`available lexical reading: ${meanings[index].replaceAll("-", " ")}`),
            cue?.label.includes("available, not forced by spelling"),
            cue?.label.split(" · ")[0].includes("available lexical reading")];
    }), ["ACI-P247-L037-76A99F08C2", "ACI-P247-L039-6DD10064FA", "ACI-P248-L003-3C6186D887"]
        .map(atom => [[atom], true, true, true]));
    s.eq("unknown forms receive no borrowed lexical cue", (() => {
        const frame = evaluate("xa-xā-tz-a");
        return ctx.getClassicalFormulaDerivedAnnotations(frame.formulaRealization, frame.finalTypedVncSlotFrame, frame)
            .some(item => item.role === "lesson27-fused-frequentative-lexical-reading");
    })(), false);
    const injected = evaluate("xa-xā-tz-a", {
        lexicalFrequentativeMeaningFrame: legitimate.operationFrame.operationFacts.lexicalFrequentativeMeaningFrame,
        operationFacts: legitimate.operationFrame.operationFacts, meaning: meanings[2],
    });
    s.eq("copied and caller-supplied frames cannot confer lexical or owner authority", [
        injected.authorizationStatus, injected.operationFrame?.targetStem,
        Boolean(injected.operationFrame?.operationFacts?.lexicalFrequentativeMeaningFrame),
        ctx.isClassicalNahuatlOperationFrame(JSON.parse(JSON.stringify(legitimate.operationFrame))),
        ctx.isClassicalNahuatlClosureFrame(JSON.parse(JSON.stringify(legitimate))),
        ctx[`is${PREFIX}Result`](JSON.parse(JSON.stringify(receipts[2].result))),
        ctx[`evaluate${PREFIX}`](JSON.parse(JSON.stringify(receipts[2].source))).authorizationStatus,
    ], ["authorized", "xa-xā-tz-a", false, false, false, false, "blocked"]);
    s.eq("the three lexical witnesses neither restrict admission nor claim exhaustive citation objects",
        receipts.map(({ result }) => [result.payload.facetValue?.citationParticipantFramesAreExhaustive,
            result.payload.facetValue?.sourceAdmissionAuthority]), Array.from({ length: 3 }, () => [false, false]));
    return s;
}

module.exports = { run };
