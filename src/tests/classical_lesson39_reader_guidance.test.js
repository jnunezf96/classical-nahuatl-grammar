"use strict";

const fs = require("fs");
const path = require("path");
const { createSuite } = require("./runner");
const {
    currentBrowserCacheKey,
    usesBrowserCacheKey,
} = require("./helpers/browser_cache_chain");

const ROOT = path.resolve(__dirname, "..", "..");
const GROUPS = [
    "lesson39-perfective-patientive-foundation",
    "lesson39-perfective-impersonal-model",
    "lesson39-perfective-compounds-and-ownerhood",
    "lesson39-imperfective-patientive-foundation",
    "lesson39-imperfective-impersonal-model",
    "lesson39-characteristic-patientive-foundation",
    "lesson39-characteristic-ownerhood-contrasts",
    "lesson39-characteristic-organic-possession",
    "lesson39-characteristic-adventitious-possession",
    "lesson39-characteristic-extended-notes",
    "lesson39-root-stock-foundation",
    "lesson39-root-stock-allomorphs",
    "lesson39-root-stock-extensions",
    "lesson39-patientive-use-and-reading",
    "lesson39-patientive-compound-embeds",
    "lesson39-patientive-compound-matrices",
    "lesson39-patientive-ownerhood-foundation",
    "lesson39-patientive-ownerhood-hua",
    "lesson39-patientive-ownerhood-yoa",
    "lesson39-patientive-ownerhood-continuation",
    "lesson39-patientive-ownerhood-extended",
    "lesson39-patientive-incorporated-objects",
    "lesson39-life-heart-embed-contrast",
];

function run(ctx = {}) {
    const s = createSuite("classical_lesson39_reader_guidance");
    const ledger = JSON.parse(fs.readFileSync(path.join(
        ROOT, "docs/canvas-progress/lesson39-review-ledger.json"), "utf8"));
    const accepted = ledger.records.filter(record => (
        GROUPS.includes(record.reviewGroupId)
        && record.reviewStatus === "ACCEPTED"
    ));
    const ideas = ctx.LESSON39_READER_GUIDANCE_GROUPS;
    const ids = ideas.map(idea => idea.ideaId);
    const panel = ctx.ClassicalAuthorityPanel();
    const start = panel.indexOf(
        'data-classical-reader-guidance-lesson="39"');
    const end = panel.indexOf("</details>", start) + "</details>".length;
    const visible = panel.slice(start, end);
    s.eq("all 1024 accepted atoms point to twenty-three collapsed reading ideas", {
        accepted: accepted.length,
        groups: new Set(accepted.map(record => record.reviewGroupId)).size,
        ideas: ideas.length,
        exactIds: accepted.every(record => ids.includes(record.reviewGroupId)),
        sections: (panel.match(
            /data-classical-reader-guidance-lesson="39"/gu) || []).length,
        cards: (visible.match(
            /data-classical-reader-guidance-group=/gu) || []).length,
        open: /data-classical-reader-guidance-lesson="39"[^>]*\sopen/gu
            .test(panel),
    }, { accepted: 1024, groups: 23, ideas: 23, exactIds: true,
        sections: 1, cards: 23, open: false });
    s.ok("guidance separates owner identity, productive shape, and lexical facts",
        ideas[0].guidance.includes("exact owner-issued active preterit VNC Result")
        && ideas[0].guidance.includes("passive model is available only for a transitive Source")
        && ideas[0].guidance.includes("raw perfective-looking stem")
        && ideas[1].guidance.includes("reflexive, reciprocal")
        && ideas[1].guidance.includes("analogical tla")
        && ideas[1].guidance.includes("rather than example identity")
        && ideas[2].guidance.includes("exact compound active preterit VNC Result")
        && ideas[2].guidance.includes("narrower lexical facts")
        && ideas[2].guidance.includes("do not authorize or block the general route")
        && ideas[2].guidance.includes("not a spelling choice or an exact-stem gate")
        && ideas[3].guidance.includes("exact owner-issued active present VNC Result")
        && ideas[3].guidance.includes("Class C automatically uses the truncated stem")
        && ideas[3].guidance.includes("Class D automatically supplies final long ā")
        && ideas[3].guidance.includes("passive model is available only for a transitive Source")
        && ideas[3].guidance.includes("example identity cannot authorize")
        && ideas[4].guidance.includes("transitive and intransitive imperfective Sources")
        && ideas[4].guidance.includes("tla, tē, or ne alone decides neither")
        && ideas[4].guidance.includes("never productive route permission")
        && ideas[4].guidance.includes("later affective operation")
        && ideas[4].guidance.includes("without reconstructing that history from its visible prefix")
        && ideas[5].guidance.includes("exact owner-issued ordinary NNC Result")
        && ideas[5].guidance.includes("abundant-ownerhood yō-ā matrix")
        && ideas[5].guidance.includes("Final l, z, x, tz, and ch")
        && ideas[5].guidance.includes("Subclass 1-B tl")
        && ideas[5].guidance.includes("zero-zero")
        && ideas[5].guidance.includes("Compatible unlisted NNC Results remain productive")
        && ideas[5].guidance.includes("cannot authorize the route")
        && ideas[6].guidance.includes("pertaining to the incorporated nounstem")
        && ideas[6].guidance.includes("thing intrinsic to it")
        && ideas[6].guidance.includes("outer matrix remains abundant-ownerhood yō-ā")
        && ideas[6].guidance.includes("ordinary-ownerhood formation")
        && ideas[6].guidance.includes("neither Source shape nor an English translation")
        && ideas[6].guidance.includes("Compatible unlisted NNC Results remain productive")
        && ideas[7].guidance.includes("possessor identifies the whole")
        && ideas[7].guidance.includes("automatically possessive")
        && ideas[7].guidance.includes("living or nonliving")
        && ideas[7].guidance.includes("visible yō does not independently license")
        && ideas[7].guidance.includes("not universal")
        && ideas[7].guidance.includes("never form a stem whitelist")
        && ideas[7].guidance.includes("compatible unlisted Sources remain productive")
        && ideas[8].guidance.includes("exact preterit-agentive NNC Result")
        && ideas[8].guidance.includes("general-use stem")
        && ideas[8].guidance.includes("without turning the preterit-agentive embed into flesh")
        && ideas[8].guidance.includes("initial tō belongs to the verbstem tōna")
        && ideas[8].guidance.includes("Compatible unlisted preterit-agentive Sources remain productive")
        && ideas[8].guidance.includes("canonical supplementation owner")
        && ideas[9].guidance.includes("exact passive-action or active-action NNC Result")
        && ideas[9].guidance.includes("general-use action nounstem in ca")
        && ideas[9].guidance.includes("homophonous with a preterit-agentive")
        && ideas[9].guidance.includes("genuinely leaves both typed Sources possible")
        && ideas[9].guidance.includes("compatible unlisted action Result")
        && ideas[9].guidance.includes("reading evidence")
        && ideas[9].guidance.includes("cannot authorize a productive route")
        && ideas[10].guidance.includes("morphemic Source rather than checking a verb list")
        && ideas[10].guidance.includes("shortens a long stock-formative vowel")
        && ideas[10].guidance.includes("Irregular fused-root vowel quantity")
        && ideas[10].guidance.includes("compatible unlisted Source")
        && ideas[10].guidance.includes("genuinely unknown")
        && ideas[10].guidance.includes("not route permission or a stem whitelist")
        && ideas[11].guidance.includes("intransitive destockal hua Source")
        && ideas[11].guidance.includes("stock plus c")
        && ideas[11].guidance.includes("stock plus ch")
        && ideas[11].guidance.includes("stock itself as an NNC Source")
        && ideas[11].guidance.includes("a-to-e raising")
        && ideas[11].guidance.includes("tli class")
        && ideas[11].guidance.includes("tl class")
        && ideas[11].guidance.includes("downgraded nounstem")
        && ideas[11].guidance.includes("ā-tōy-a-hua")
        && ideas[11].guidance.includes("not free spellings")
        && ideas[11].guidance.includes("example list never gates")
        && ideas[11].guidance.includes("rather than meanings inferred from shape")
        && ideas[12].guidance.includes("i-hui or a-hui destockal Source")
        && ideas[12].guidance.includes("stock with x or c")
        && ideas[12].guidance.includes("root with zero")
        && ideas[12].guidance.includes("both directions open")
        && ideas[12].guidance.includes("causative o-ā Source")
        && ideas[12].guidance.includes("positively proves the deverbal history")
        && ideas[12].guidance.includes("cuetl-a-hui and cuetl-ā-ni remain distinct")
        && ideas[12].guidance.includes("conjectural evidence status")
        && ideas[12].guidance.includes("exact governing verbstems are unknown")
        && ideas[12].guidance.includes("Compatible unlisted i-hui and a-hui Sources remain productive")
        && ideas[12].guidance.includes("never authorize the general route")
        && ideas[13].guidance.includes("more than one of the five patientive procedures")
        && ideas[13].guidance.includes("not automatic for every Source")
        && ideas[13].guidance.includes("does not ask the user to choose a procedure from an English gloss")
        && ideas[13].guidance.includes("same broad translation")
        && ideas[13].guidance.includes("narrower idiomatic use")
        && ideas[13].guidance.includes("only where the text genuinely leaves more than one typed reading possible")
        && ideas[13].guidance.includes("never authorize a Source")
        && ideas[13].guidance.includes("compatible unlisted typed Sources remain productive")
        && ideas[14].guidance.includes("exact owner-issued patientive NNC Result")
        && ideas[14].guidance.includes("nominal or verbal matrix")
        && ideas[14].guidance.includes("never rebuilds them from a nounstem string")
        && ideas[14].guidance.includes("grammatical relation")
        && ideas[14].guidance.includes("Boundary realization then follows automatically")
        && ideas[14].guidance.includes("both constituents may themselves be patientives")
        && ideas[14].guidance.includes("Compatible unlisted owner-issued patientive Results remain productive")
        && ideas[14].guidance.includes("requires typed lexical or contextual evidence")
        && ideas[15].guidance.includes("exact owner-issued patientive NNC Result as the matrix")
        && ideas[15].guidance.includes("not reselected or rebuilt from surface spelling")
        && ideas[15].guidance.includes("Embed-before-matrix order")
        && ideas[15].guidance.includes("derivational history remains necessary")
        && ideas[15].guidance.includes("sound changes already licensed inside the typed Source")
        && ideas[15].guidance.includes("not route permission")
        && ideas[15].guidance.includes("Compatible unlisted exact patientive matrix Results remain productive")
        && ideas[16].guidance.includes("exact owner-issued patientive NNC Result")
        && ideas[16].guidance.includes("incorporated object complement")
        && ideas[16].guidance.includes("absolutive or possessive")
        && ideas[16].guidance.includes("same referent as the selected matrix object")
        && ideas[16].guidance.includes("derived automatically")
        && ideas[16].guidance.includes("rather than defining a stem list")
        && ideas[16].guidance.includes("Compatible unlisted perception matrices remain productive")
        && ideas[17].guidance.includes("exact owner-issued absolutive patientive NNC Result")
        && ideas[17].guidance.includes("complete VNC ancestry")
        && ideas[17].guidance.includes("ye-tl matrix")
        && ideas[17].guidance.includes("do not form a stem whitelist")
        && ideas[17].guidance.includes("compatible unlisted matrix")
        && ideas[17].guidance.includes("reflexive, human, nonhuman, or specific object pattern")
        && ideas[17].guidance.includes("basic or applicative object layer")
        && ideas[17].guidance.includes("shares the selected matrix-object referent automatically")
        && ideas[17].guidance.includes("require typed lexical Source or context")
        && ideas[17].guidance.includes("authorizes nothing")
        && ideas[18].guidance.includes("exact owner-issued absolutive patientive Result")
        && ideas[18].guidance.includes("short-a tlani")
        && ideas[18].guidance.includes("long-ā tlāni")
        && ideas[18].guidance.includes("only as the matrix subposition")
        && ideas[18].guidance.includes("m-o for a reflexive human")
        && ideas[18].guidance.includes("tē for a nonspecific human")
        && ideas[18].guidance.includes("tla for a nonspecific nonhuman")
        && ideas[18].guidance.includes("compatible unlisted patientive Results")
        && ideas[18].guidance.includes("authorize nothing")
        && ideas[19].guidance.includes("exact owner-issued possessive patientive Result")
        && ideas[19].guidance.includes("possessive case to an objective mainline applicative object")
        && ideas[19].guidance.includes("reflexive object")
        && ideas[19].guidance.includes("corresponding projective object")
        && ideas[19].guidance.includes("becomes double-object without any added suffix")
        && ideas[19].guidance.includes("not an extra user choice")
        && ideas[19].guidance.includes("inner patientive compound with the ye matrix")
        && ideas[19].guidance.includes("Compatible unlisted exact patientive Results remain productive")
        && ideas[19].guidance.includes("authorize nothing")
        && ideas[20].guidance.includes("exact owner-issued possessive patientive Result")
        && ideas[20].guidance.includes("objective mainline causative object")
        && ideas[20].guidance.includes("exact object history")
        && ideas[20].guidance.includes("reciprocal Source therefore keeps ne")
        && ideas[20].guidance.includes("l plus matrix-initial tl realizes automatically as l-l")
        && ideas[20].guidance.includes("canonical voice machinery")
        && ideas[20].guidance.includes("matrix verbstem here, not a causative suffix")
        && ideas[20].guidance.includes("Type-two tiā and type-three tlani")
        && ideas[20].guidance.includes("Compatible unlisted exact patientive Results remain productive")
        && ideas[20].guidance.includes("authorize nothing")
        && ideas[21].guidance.includes("exact owner-issued possessive patientive Result")
        && ideas[21].guidance.includes("typed restricted compound form")
        && ideas[21].guidance.includes("inside the verbstem")
        && ideas[21].guidance.includes("outside mainline applicative object")
        && ideas[21].guidance.includes("same valence")
        && ideas[21].guidance.includes("no applicative suffix")
        && ideas[21].guidance.includes("ih-tlani")
        && ideas[21].guidance.includes("tēm-o-ā")
        && ideas[21].guidance.includes("compatible unlisted typed matrices")
        && ideas[21].guidance.includes("authorize nothing")
        && ideas[22].guidance.includes("exact owner-issued characteristic-patientive Result")
        && ideas[22].guidance.includes("full characteristic formation")
        && ideas[22].guidance.includes("zero realization")
        && ideas[22].guidance.includes("keeps the full derived meaning")
        && ideas[22].guidance.includes("tō belongs to the typed verbstem tōna")
        && ideas[22].guidance.includes("frequency difference is reading guidance only")
        && ideas[22].guidance.includes("Compatible unlisted characteristic Results")
        && ideas[22].guidance.includes("authorize nothing"));
    for (const record of accepted) {
        const entry = ideas.find(idea => (
            idea.ideaId === record.reviewGroupId
        ));
        s.ok(record.atomId, Boolean(entry?.guidance));
        s.eq(`mutation:${record.atomId}`,
            ctx.isLesson39ReaderGuidanceExact(
                ideas.filter(idea => idea.ideaId !== record.reviewGroupId)
            ), false);
    }
    const rendering = fs.readFileSync(path.join(
        ROOT, "src/ui/rendering/rendering.mjs"), "utf8");
    s.eq("accepted Lesson 39 jobs have clickable formula cues", {
        roles: GROUPS.every(group => rendering.includes(`"${group}"`)),
        authorities: rendering.includes("LESSON39_FORMULA_HOVER_AUTHORITIES"),
        frame: rendering.includes("operation.perfectivePatientiveFrame")
            && rendering.includes("operation.imperfectivePatientiveFrame")
            && rendering.includes("operation.imperfectiveImpersonalPatientiveFrame")
            && rendering.includes("characteristicPatientiveFoundationFrame")
            && rendering.includes("characteristicOwnerhoodContrastFrame")
            && rendering.includes("characteristicOrganicPossessionFrame")
            && rendering.includes("characteristicPreteritAgentiveFrame")
            && rendering.includes("operation.actionCharacteristicFrame")
            && rendering.includes("operation.rootStockPatientiveFrame")
            && rendering.includes("rootStock.rootStockExtensionFrame")
            && rendering.includes("operation.patientiveUseFrame")
            && rendering.includes("patientiveEmbedCompoundFrame")
            && rendering.includes("patientiveMatrixCompoundFrame")
            && rendering.includes("patientiveOwnerhoodFoundationFrame")
            && rendering.includes("patientiveLicensedMatrixComplementFrame")
            && rendering.includes("patientiveTlaniDesiderativeFrame")
            && rendering.includes("patientivePossessiveTocaFrame")
            && rendering.includes("patientivePossessiveTlaniCausativeFrame")
            && rendering.includes("patientiveIncorporatedObjectFrame")
            && rendering.includes("characteristicMatrixRealization"),
    }, { roles: true, authorities: true, frame: true });

    const read = name => fs.readFileSync(path.join(ROOT, name), "utf8");
    const key = currentBrowserCacheKey(read("index.html"));
    s.eq("Lesson 39 advances the complete browser cache chain", {
        key: Boolean(key),
        index: usesBrowserCacheKey(
            read("index.html"), "src/browser/main.mjs", key),
        main: usesBrowserCacheKey(
            read("src/browser/main.mjs"), "bootstrap.mjs", key),
        bridge: usesBrowserCacheKey(
            read("src/bootstrap/runtime_bridge.mjs"),
            "create_runtime.mjs", key),
        bootstrap: ["runtime_bridge.mjs", "create_runtime.mjs", "composer.mjs",
            "rendering.mjs", "classical_shell.mjs"].every(name => (
            usesBrowserCacheKey(read("src/bootstrap/bootstrap.mjs"), name, key)
        )),
        runtime: ["nnc_lessons35_39_closure.mjs", "composer.mjs",
            "rendering.mjs", "classical_shell.mjs"].every(name => (
            usesBrowserCacheKey(read("src/runtime/create_runtime.mjs"), name, key)
        )),
        shellLeaf: usesBrowserCacheKey(
            read("src/ui/shell/classical_shell.mjs"),
            "lesson39_reader_guidance.mjs", key),
        renderingLeaf: usesBrowserCacheKey(
            read("src/ui/rendering/rendering.mjs"),
            "lesson39_reader_guidance.mjs", key),
    }, { key: true, index: true, main: true, bridge: true,
        bootstrap: true, runtime: true, shellLeaf: true,
        renderingLeaf: true });
    return s;
}

module.exports = { run };
