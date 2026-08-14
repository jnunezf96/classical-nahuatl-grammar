"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");

const ROOT = path.resolve(__dirname, "..", "..");

function run(ctx = {}) {
    const s = createSuite("classical_lesson12_contradiction_audit");
    const audit = JSON.parse(fs.readFileSync(path.join(ROOT, "docs/canvas-progress/lesson12-contradiction-audit.json"), "utf8"));
    const ordinary = ctx.buildClassicalNahuatlAbsolutiveNncFrame("cal", {
        subject: "3common", nounClass: "tli", animacy: "nonanimate",
    });
    const blocked = ctx.buildClassicalNahuatlAbsolutiveNncFrame("chimalli", {
        subject: "3pl", nounClass: "tl", pluralConnector: "m-eh", animacy: "nonanimate",
    });
    const metaphorical = ctx.buildClassicalNahuatlAbsolutiveNncFrame("chimalli", {
        subject: "3pl", nounClass: "tl", pluralConnector: "m-eh", animacy: "nonanimate", metaphoricalOverride: true,
    });
    const ordinaryAbsolutive = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("cihua", { selectedState: "absolutive" });
    const ordinaryPossessive = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("cihua", { selectedState: "possessive" });
    const restrictedAuthority = ctx.buildClassicalNahuatlNncSourceAuthorityFrame("nān", {
        selectedState: "possessive",
        naturalPossessionPolicy: "naturally-possessed",
        policySelectionAuthority: "user-supplied-lexical-analysis",
    });
    const restricted = ctx.buildClassicalNahuatlPossessiveNncFrame("nān", {
        subject: "3sg", possessor: "1sg", singularConnector: "0", animacy: "animate",
        nncSourceAuthorityFrame: restrictedAuthority,
    });
    const restrictedCueLabels = ctx.getClassicalFormulaDerivedAnnotations(
        restricted.formulaRealization,
        restricted.nncSlotFrame,
        restricted,
    ).map((cue) => cue.label);

    s.eq("Lesson 12 contradiction report is closed", {
        status: audit.status,
        resolved: audit.resolvedCount,
        unresolved: audit.unresolvedCount,
        resolutions: audit.resolutions.length,
        authority: audit.reportAuthority,
    }, { status: "UNCONTRADICTED", resolved: 10, unresolved: 0, resolutions: 10, authority: false });
    s.eq("tenseless predication and contextual English wording agree", {
        tense: ordinary.predicateSemanticsFrame.tenseCategoryEncoded,
        time: ordinary.predicateSemanticsFrame.timeReferenceSource,
        definite: ordinary.predicateSemanticsFrame.definitenessEncoded,
        indefinite: ordinary.predicateSemanticsFrame.indefinitenessEncoded,
        article: ordinary.predicateSemanticsFrame.englishArticleSource,
    }, { tense: false, time: "discourse-context", definite: false, indefinite: false, article: "translation-context" });
    s.eq("reference, animacy, and number agree", {
        common: ordinary.authorizationStatus,
        blocked: blocked.blockReason,
        metaphorical: metaphorical.authorizationStatus,
        numberBelongsTo: ordinary.numberFrame.numberBelongsTo,
        nounInflection: ordinary.numberFrame.numberIsNounInflection,
    }, {
        common: "authorized",
        blocked: "nonanimate-plural-requires-metaphorical-override",
        metaphorical: "authorized",
        numberBelongsTo: "subject-personal-pronoun",
        nounInflection: false,
    });
    s.eq("ordinary nounstems allow both States while typed restrictions remain visible", {
        absolutive: ordinaryAbsolutive.authorizationStatus,
        possessive: ordinaryPossessive.authorizationStatus,
        availability: ordinaryAbsolutive.stateAvailability,
        restrictedAvailability: restrictedAuthority.stateAvailability,
        cue: restrictedCueLabels.includes("natural possession"),
    }, { absolutive: "authorized", possessive: "authorized", availability: "both", restrictedAvailability: "possessive-only", cue: true });
    return s;
}

module.exports = { run };
