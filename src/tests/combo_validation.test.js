"use strict";

/**
 * Tests for src/core/agreement/combo_validation.mjs
 * Covers: valence-combo signature/display/validation helpers.
 */

const { createSuite } = require("./runner");

function run(ctx) {
    const s = createSuite("combo_validation");

    s.eq("getPers1Obj1Pers2Key joins pers1 obj1 pers2", ctx.getPers1Obj1Pers2Key("ni", "ki", ""), "ni|ki|");
    s.eq(
        "resolveComboValidationObj1 prefers person marker by derivation priority",
        ctx.resolveComboValidationObj1({
            obj1: "tla",
            obj2: "nēch",
            derivationType: "applicative",
        }),
        "nēch"
    );
    s.eq(
        "resolveComboValidationObj1 honors controller override",
        ctx.resolveComboValidationObj1({
            obj1: "tla",
            obj2: "nēch",
            derivationType: "applicative",
            controllerObj1: "mo",
        }),
        "mo"
    );

    s.eq("collapseProjectiveForSignature maps empty to 0", ctx.collapseProjectiveForSignature(""), "0");
    s.eq("collapseProjectiveForSignature maps a specific marker to projective", ctx.collapseProjectiveForSignature("tēch"), "projective");
    s.eq("collapseSilentSpecificForSignature hides a specific marker", ctx.collapseSilentSpecificForSignature("tēch"), "0");
    s.eq("collapseSilentSpecificForDisplay hides a specific marker", ctx.collapseSilentSpecificForDisplay("tēch"), "");
    s.eq("collapseSilentSpecificForDisplay keeps a nonspecific marker", ctx.collapseSilentSpecificForDisplay("tē"), "tē");

    s.eq(
        "getObj1Obj2Obj3Signature collapses specific obj2 marker",
        ctx.getObj1Obj2Obj3Signature({
            obj1: "qui",
            obj2: "tēch",
            obj3: "tla",
        }),
        "projective|0|tla"
    );
    s.ok(
        "isValidObj1Obj2Obj3Combo accepts canonical projective|mo|tla signature",
        ctx.isValidObj1Obj2Obj3Combo({
            obj1: "qui",
            obj2: "mo",
            obj3: "tla",
        })
    );
    s.ok(
        "isValidObj1Obj2Obj3Combo accepts collapsed specific obj2 marker",
        ctx.isValidObj1Obj2Obj3Combo({
            obj1: "qui",
            obj2: "tēch",
            obj3: "tla",
        })
    );
    s.no(
        "isValidObj1Obj2Obj3Combo rejects impossible obj1+obj2+obj3 pattern",
        ctx.isValidObj1Obj2Obj3Combo({
            obj1: "tla",
            obj2: "mo",
            obj3: "tē",
        })
    );

    return s;
}

module.exports = { run };
