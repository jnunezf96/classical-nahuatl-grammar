"use strict";

const { createSuite } = require("./runner");

function run(ctx = {}) {
    const s = createSuite("classical_directional_authority");

    s.eq(
        "directional parsing consumes one fixed Classical semantic inventory",
        {
            inventory: Array.from(ctx.getDirectionalPrefixesSource()),
            frozen: Object.isFrozen(ctx.getDirectionalPrefixesSource()),
            recognized: [
                ctx.isDirectionalPrefixToken("huāl"),
                ctx.isDirectionalPrefixToken("on"),
            ],
            rejected: [
                ctx.isDirectionalPrefixToken("wal"),
                ctx.isDirectionalPrefixToken("wāl"),
                ctx.isDirectionalPrefixToken("forged"),
            ],
            disambiguation: [
                ctx.getDisambiguationPrefixCandidates("huālnemi"),
                ctx.getDisambiguationPrefixCandidates("onchōca"),
            ],
        },
        {
            inventory: ["huāl", "on"],
            frozen: true,
            recognized: [true, true],
            rejected: [false, false, false],
            disambiguation: [["huāl"], ["on"]],
        }
    );

    const hadDirectional = Object.prototype.hasOwnProperty.call(
        ctx,
        "DIRECTIONAL_PREFIXES",
    );
    const hadFallback = Object.prototype.hasOwnProperty.call(
        ctx,
        "FALLBACK_DIRECTIONAL_PREFIXES",
    );
    const originalDirectional = ctx.DIRECTIONAL_PREFIXES;
    const originalFallback = ctx.FALLBACK_DIRECTIONAL_PREFIXES;
    try {
        Reflect.set(ctx, "DIRECTIONAL_PREFIXES", ["forged"]);
        Reflect.set(ctx, "FALLBACK_DIRECTIONAL_PREFIXES", ["forged"]);
        s.eq(
            "caller-installed runtime arrays cannot replace directional grammar",
            {
                forgedAccepted: ctx.isDirectionalPrefixToken("forged"),
                canonicalRetained: [
                    ctx.isDirectionalPrefixToken("huāl"),
                    ctx.isDirectionalPrefixToken("on"),
                ],
                inventory: Array.from(ctx.getDirectionalPrefixesSource()),
            },
            {
                forgedAccepted: false,
                canonicalRetained: [true, true],
                inventory: ["huāl", "on"],
            }
        );
    } finally {
        if (hadDirectional) {
            Reflect.set(ctx, "DIRECTIONAL_PREFIXES", originalDirectional);
        } else {
            Reflect.deleteProperty(ctx, "DIRECTIONAL_PREFIXES");
        }
        if (hadFallback) {
            Reflect.set(ctx, "FALLBACK_DIRECTIONAL_PREFIXES", originalFallback);
        } else {
            Reflect.deleteProperty(ctx, "FALLBACK_DIRECTIONAL_PREFIXES");
        }
    }

    return s;
}

module.exports = { run };
