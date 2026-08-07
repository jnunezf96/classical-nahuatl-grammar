"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_lesson11_borrowed_optative_projection");

    s.eq(
        "Lesson 11 suppletives reuse, rather than reject, Lesson 9 borrowed optative forms",
        [
            ["ye", "future"],
            ["yā", "future"],
            ["yā", "preterit"],
            ["huāl-lā", "future"],
            ["huāl-lā", "preterit"],
            ["ye", "preterit"]
        ].map(([stem, tense]) => {
            const plan = ctx.buildClassicalNahuatlIrregularVncParadigmPlan(stem, {
                subject: "1sg",
                mood: "optative",
                tense
            });
            return [stem, tense, plan.authorizationStatus, plan.selectedStemOverride, plan.blockReason];
        }),
        [
            ["ye", "future", "authorized", "ye", ""],
            ["yā", "future", "authorized", "yā", ""],
            ["yā", "preterit", "authorized", "yah", ""],
            ["huāl-lā", "future", "authorized", "huāl-lā", ""],
            ["huāl-lā", "preterit", "authorized", "huāl-lah", ""],
            ["ye", "preterit", "blocked", "", "be-suppletive-past-meanings-use-general-past-cell"]
        ]
    );

    return s;
}

module.exports = { run };
