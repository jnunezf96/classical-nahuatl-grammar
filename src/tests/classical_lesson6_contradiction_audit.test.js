"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson6_contradiction_audit");
    const audit = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson6-contradiction-audit.json"
    ), "utf8"));
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson6-review-ledger.json"
    ), "utf8"));
    const shell = fs.readFileSync(path.join(ROOT, "src/ui/shell/classical_shell.mjs"), "utf8");
    const monadic = ctx.buildClassicalNahuatlMonadicObjectSystemFrame();
    const projective = ctx.buildClassicalNahuatlProjectiveObjectSystemFrame();
    const reflexive = ctx.buildClassicalNahuatlMainlineReflexiveObjectSystemFrame();
    const reciprocal = (subject) => ctx.evaluateClassicalNahuatlVncApplication({
        sourceStem: "mati", verbClass: "B", sourceValence: "mainline-reflexive",
        subject, mood: "indicative", tense: "present",
        objectInterpretation: "reciprocal", requestedDerivation: "direct",
        requestedVoice: "active", outputScope: "single",
    });

    s.eq("every Lesson 6 atom has an accepted exact job", {
        total: ledger.records.length,
        accepted: ledger.records.filter((record) => record.reviewStatus === "ACCEPTED").length,
        exact: ledger.records.filter((record) => record.implementationCredit === "EXACTLY_OBSERVED").length,
    }, { total: 138, accepted: 138, exact: 138 });
    s.eq("the Lesson 6 contradiction record is complete and non-authorizing", {
        status: audit.status,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        reportAuthority: audit.reportAuthority,
    }, { status: "UNCONTRADICTED", resolved: 8, unresolved: 0, reportAuthority: false });
    s.eq("genuine object choices stay visible while raw carriers stay automatic", {
        valence: shell.includes('id="classical-rule-logic-valence"'),
        object: shell.includes('id="classical-rule-logic-object"'),
        interpretation: shell.includes('id="classical-rule-logic-object-interpretation"'),
        rawCarrierControl: /(?:id|name)="[^"]*(?:va1|va2|object-carrier|supportive-object-i)[^"]*"/iu.test(shell),
    }, { valence: true, object: true, interpretation: true, rawCarrierControl: false });
    s.eq("human versus nonhuman does not become an animacy distinction", {
        human: [monadic.humanClass, monadic.humanMorph],
        nonhuman: [monadic.nonhumanClass, monadic.nonhumanMorph],
        notAnimacy: monadic.humanNonhumanContrastIsNotAnimacy,
    }, { human: ["human", "tē"], nonhuman: ["nonhuman", "tla"], notAnimacy: true });
    s.eq("third-person spelling follows the boundary without stealing stem vowels", {
        spellings: projective.thirdVa1Variants,
        ca: projective.stemBoundaryCases.ca,
        tiqui: projective.stemBoundaryCases.tiqui,
        que: projective.stemBoundaryCases.que,
    }, {
        spellings: ["c", "qu", "qui"],
        ca: { objectCarrier: "c", stem: "ca" },
        tiqui: { objectCarrier: "c", stem: "tiqui" },
        que: { objectCarrier: "c", stem: "que" },
    });
    s.eq("English third-person readings remain context, not Nahuatl gender", projective.thirdCommonInterpretations, {
        singularHumanMale: "him", singularHumanFemale: "her",
        singularAnimateNonhuman: "it", singularNonanimate: "it", pluralNonanimate: "them",
    });
    s.eq("the reflexive object copies the subject and derives its boundary form", {
        reflectsSubject: reflexive.reflectsSubject,
        dyads: reflexive.personNumberDyads,
        beforeVowel: reflexive.vowelInitialVa2,
    }, { reflectsSubject: true, dyads: { firstSingular: "n-o", firstPlural: "t-o", nonfirst: "m-o" }, beforeVowel: "⎕" });
    s.eq("reciprocal meaning is blocked for singular and allowed for plural subjects", {
        singular: reciprocal("2sg").authorizationStatus,
        plural: reciprocal("2pl").authorizationStatus,
    }, { singular: "blocked", plural: "authorized" });
    return s;
}

module.exports = { run };
